"use client";
import { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000")


export default function Home() {
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);

  const handleSendMessage = () => {
    //serverへの送信
    socket.emit("send_message", { message: message });
    setMessage("");
  }

  //サーバーから受信
  socket.on("received_message", (data) => {
    console.log(data);
    setList([...list, data]);
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2 className="text-center">チャットアプリ</h2>
        <input 
          type="text" 
          onChange={(e) => setMessage(e.target.value)}
          value={message} />
          <br />
        <div className="text-center">
          <button onClick={(() => handleSendMessage())}>チャット送信</button>
        </div>
        {list.map((chat) => (
          <div key={chat.message}>
            {chat.message}
          </div>
        ))}
      </div>
    </main>
  );
}
