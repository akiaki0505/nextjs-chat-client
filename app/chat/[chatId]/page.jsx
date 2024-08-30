"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import useSWR from 'swr';

const socket = io("http://localhost:5000");

async function fetcher(key) {
return fetch(key).then((res) => res.json());
}

export default function chat() {

  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const [api, setApi] = useState([]);

  //const {data, error, isLoading} = useSWR('http://localhost:3000/api/whereSelect', fetcher);
  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch(
        'http://localhost:3000/api/whereSelect'
      );
      const data = await response.json();
      setApi(data);
    };
    getTodos();
  },[]);


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
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div>
        <h2 className="border-b border-zinc-950 pl-5">チャット</h2>
        <div className="pt-5"></div>
        <div className="grid lg:grid-cols-1 border border-zinc-950 px-4 py-4 gap-4">
        {api ? api.map((value) => (
            <div key={value.id}>
              {value.comment}
            </div>
          )): <div></div>}
          {list.map((chat) => (
            <div key={chat.message}>
              {chat.message}
            </div>
          ))}
        </div>

        <div className="pt-5"></div>

        <textarea 
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setMessage(e.target.value)}
          value={message} />
          <br />
        <div className="pt-3"></div>
        <div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={(() => handleSendMessage())}>送信</button>
        </div>
      </div>
    </main>
  );
}
