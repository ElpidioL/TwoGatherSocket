# TwoGatherSocket

A WebSocket server for real-time chat functionality built with Node.js, Express, and Socket.IO for educational purposes.

## 📝 About

This is the backend WebSocket server component that was developed and used as part of a college project. It provided the real-time communication infrastructure for a chat application, demonstrating Socket.IO implementation and event-driven architecture. This project is no longer actively used but remains as a reference implementation.

## 🚀 Features

- **WebSocket server** - Handles real-time bidirectional communication
- **Room management** - Create and manage chat rooms
- **Message broadcasting** - Distribute messages to room participants
- **Read receipts** - Track message read status
- **In-memory storage** - Temporary storage for rooms and messages

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Real-time**: Socket.IO
- **CORS**: Cross-origin resource sharing enabled

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd TwoGatherSocket
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The server will run on `http://localhost:4000` (or the port specified in your environment variables).

## 🔧 API Endpoints

- `GET /api` - Returns all chat rooms and their messages

## 📡 Socket Events

### Client to Server:

- `createRoom` - Create a new chat room
- `findRoom` - Find and join an existing room
- `newMessage` - Send a new message
- `messageReaded` - Mark a message as read

### Server to Client:

- `roomsList` - List of all available rooms
- `foundRoom` - Messages from a specific room
- `roomMessage` - New message broadcast
- `messageReaded` - Message read confirmation

## ⚠️ Important Notes

- This is **only the WebSocket server** - no frontend/client code included
- This is an **archived educational project** - no longer actively maintained or used
- This is an **educational project** with no production-ready features
- Data is stored in memory and will be lost when the server restarts
- CORS is set to allow all origins (not suitable for production)
- No authentication or user management system
- No database persistence
- Requires a separate client application to connect and use the chat functionality

## 🎓 Educational Value

This server component demonstrates:

- WebSocket server implementation with Socket.IO
- Real-time bidirectional communication
- Event-driven architecture
- Basic Express.js server setup
- Server-side message handling and broadcasting
- Room-based communication patterns
