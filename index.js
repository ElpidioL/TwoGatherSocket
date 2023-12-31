const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "*" ,
	},
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const generateID = () => Math.random().toString(36).substring(2, 18);
let chatRooms = [];

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on("createRoom", (id, name) => {
		let result = chatRooms.filter((room) => room.id == id);
		if(result.length === 0){
			chatRooms.unshift({ id: id, name, messages: [] });
			socket.emit("roomsList", chatRooms);
		}
		socket.join(id, name);
	});

	socket.on("findRoom", (id) => {
		let result = chatRooms.filter((room) => room.id == id);
		if (result && Array.isArray(result) && result.length > 0) {
			if (result[0]) {
				if (result[0].messages) {
					socket.emit("foundRoom", result[0].messages);
				}
			}
		}
	});

	socket.on("newMessage", (data) => {
		const { room_id, message, user, timestamp, pkeSentBy, pkeReceiver, idSentBy, many, dbId} = data;
		let result = chatRooms.filter((room) => room.id == room_id);
		const newMessage = {
			id: `${idSentBy}-${generateID()}`,
			text: message,
			user,
			time: `${timestamp.hour}:${timestamp.mins}`,
			pkeSentBy: pkeSentBy,
			pkeReceiver: pkeReceiver,
			idSentBy: idSentBy,
			bySocket: true,
			many: many,
			dbId: dbId
		};
		if (result && Array.isArray(result) && result.length > 0) {
			if (result[0]) {
				if (result[0].messages) {
					result[0].messages.push(newMessage);
					socket.to(room_id).emit("roomMessage", newMessage);
					socket.emit("roomMessage", newMessage);
				}
			}
		}
	});
	socket.on("disconnect", () => {
		socket.disconnect();
		console.log("🔥: A user disconnected");
	});

	socket.on("messageReaded", (data) => {
		const { room_id, message_id, dbMessage_id} = data;
		message = {
			id: message_id,
			dbId: dbMessage_id
		}
		socket.to(room_id).emit("messageReaded", message);
		socket.emit("messageReaded", message);
	})
});

app.get("/api", (req, res) => {
	res.json(chatRooms);
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});