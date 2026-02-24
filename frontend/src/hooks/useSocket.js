import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function useSocket(username, room) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!username || !room) return;

    const socket = new SockJS(`${import.meta.env.VITE_BACKEND_URL}/ws`);

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: () => {},
    });

    stompClient.onConnect = () => {
      console.log("Connected to WebSocket");

      // ✅ Subscribe to room messages
      stompClient.subscribe(`/topic/room.${room}`, (message) => {
        const body = JSON.parse(message.body);
        setMessages((prev) => [...prev, body]);
      });

      // ✅ Subscribe to active users list
      stompClient.subscribe(`/topic/room.${room}.users`, (message) => {
        const body = JSON.parse(message.body);
        setUsers(body);
      });

      // ✅ Send JOIN message
      stompClient.publish({
        destination: "/app/chat.send",
        body: JSON.stringify({
          sender: username,
          room: room,
          type: "JOIN",
        }),
      });
    };

    stompClient.activate();
    clientRef.current = stompClient;

    const sendLeaveMessage = () => {
  if (clientRef.current && clientRef.current.connected) {
    clientRef.current.publish({
      destination: "/app/chat.send",
      body: JSON.stringify({
        sender: username,
        room: room,
        type: "LEAVE",
      }),
    });
  }
};

// 🔥 Send leave on tab close
window.addEventListener("beforeunload", sendLeaveMessage);

return () => {
  sendLeaveMessage();
  window.removeEventListener("beforeunload", sendLeaveMessage);

  if (clientRef.current) {
    clientRef.current.deactivate();
  }
};
  }, [username, room]);

  const sendMessage = (msg) => {
    if (!clientRef.current || !clientRef.current.connected) return;

    clientRef.current.publish({
      destination: "/app/chat.send",
      body: JSON.stringify({
        ...msg,
        type: "CHAT",
      }),
    });
  };

  return { messages, users, sendMessage };
}