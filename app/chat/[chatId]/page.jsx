"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import style from "../styles/style.module.css";
import icon from "@/public/icon.jpeg";
import { RoomList } from "@/app/components/sidebar/roomList";
import axios from "axios";

const socket = io("http://localhost:5000");

async function fetcher(key) {
    return fetch(key).then((res) => res.json());
}

export default function Chat(props) {
    //サーバーサイドコンポーネント
    /*const {params, searchParams } = props;
    const roomRes = await fetch("http://localhost:3000/api/select", {
        cache: "force-cache",
      });
      const allRoomData = await roomRes.json();
    
      const chatRes = await fetch(`http://localhost:3000/api/whereSelect/${params.chatId}`, {
        cache: "force-cache",
      });
      const ChatData = await chatRes.json();*/
      
      //クライアントサイドコンポーネント
      const id = useParams();
      const [message, setMessage] = useState("");
      const [room_id, setRoom_id] = useState(Number(id.chatId));
      const [user_name, setUser_name] = useState("");
      const [list, setList] = useState([]);
      const [api, setApi] = useState([]);
      const [room, setRoom] = useState([]);
      
      /*useEffect(() => {
        const getRoom = async () => {
            const response = await fetch( "http://localhost:3000/api/select");
            const allRoomData = await response.json();
            console.log(allRoomData);
            setRoom(allRoomData);
            };
            getRoom();
        }, []);*/

        useEffect(() => {
           (async () => {
            const allRoomData = await axios('http://localhost:3000/api/select');
            console.log(allRoomData.data);
            setRoom(allRoomData.data);
           })()
        }, []);

        useEffect(() => {
            (async () => {
             const chatData = await axios(`http://localhost:3000/api/whereSelect/${Number(id.chatId)}`);
             console.log(chatData.data);
             setApi(chatData.data);
            })()
         }, [list]);

         const handleSendMessage = async () => {
            const comment = String(message);
            try {
                await fetch("http://localhost:3000/api/create", {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({comment, room_id}),
                })
            }catch(err){
                console.log(err);
            }
            
            //serverへの送信
            socket.emit("send_message", { message: message });
            setMessage("");
        }
        //サーバーから受信
        socket.on("received_message", (data) => {
            setList([...list, data]);
        });


  //const {data, error, isLoading} = useSWR('http://localhost:3000/api/whereSelect', fetcher);
  /*useEffect(() => {
    const getChat = async () => {
      const response = await fetch(
        `http://localhost:3000/api/whereSelect/${Number(id.chatId)}`
      );
      const data = await response.json();
      console.log(data);
      setApi(data);
    };
    getChat();

  }, [list]);*/


  return (
    <>
    <RoomList allRoomData={room} />
    
    <main className="flex min-h-screen flex-col">
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <h2 className="border-b border-zinc-950 pl-5">チャット</h2>
                    <div className="pt-5"></div>
                    <div className="grid lg:grid-cols-1 border border-zinc-950 px-4 py-4 gap-4">
                        
                    {api && api.map((value) => (
                        <div key={value.id}>
                            <div className="flex justify-left pb-3">
                                <div className={style.circle}>
                                    <Image 
                                        width={180}
                                        height={180} 
                                        src={icon} alt="icon" 
                                    />
                                </div>
                                <div>
                                    <span>{value.user_name?value.user_name:"NoName"}</span><br />
                                    <span className="text-black/50 text-xs mt-0">{new Date(value.created_at).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className={style.text}>{value.comment}</div>
                            <div className="border-b border-zinc-950 pt-3"></div>
                        </div>
                        ))}

                    </div>
                </div>
                <div className="pt-5"></div>
                <textarea 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message} /><br />
                <input type="hidden" 
                    id="room_id"
                    onChange={(e) => setRoom_id(e.target.value)}
                    value={room_id} />
                <input type="hidden" 
                    id="user_name"
                    onChange={(e) => setRoom_id(e.target.value)}
                    value={user_name} />
                <div className="pt-3"></div>
                <div>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={(() => handleSendMessage())}>送信</button>
                </div>
            </div>
        </div>
    </main>
    </>
    /*<main className="flex min-h-screen flex-col justify-between p-24">
      <div>
        <h2 className="border-b border-zinc-950 pl-5">チャット</h2>
        <div className="pt-5"></div>
        <div className="grid lg:grid-cols-1 border border-zinc-950 px-4 py-4 gap-4">
        {api ? api.map((value) => (
            <div key={value.id}>
              <div className="flex justify-left pb-3">
                <div className={style.circle}>
                  <Image 
                    width={180}
                    height={180} 
                    src={icon} alt="icon" />
                  </div>
                <div>
                  <span>ユーザー名</span><br />
                  <span className="text-black/50 text-xs mt-0">{new Date(value.created_at).toLocaleString()}</span>
                </div>
              </div>
              <div className={style.text}>{value.comment}</div>
              <div className="border-b border-zinc-950 pt-3"></div>
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setMessage(e.target.value)}
          value={message} />
        <br />
        <input type="hidden" 
          id="room_id"
          onChange={(e) => setRoom_id(e.target.value)}
          value={room_id} />
        <div className="pt-3"></div>
        <div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={(() => handleSendMessage())}>送信</button>
        </div>
        <br />
        <div>
        <Link href={"/room"} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">戻る</Link>
        </div>
      </div>
    </main>*/
  );
}
