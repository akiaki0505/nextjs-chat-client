"use client";
import React, { useMemo, useEffect, useRef, useState } from 'react';
import Image from "next/image";
import style from "@/app/chat/styles/style.module.css";
import icon from "@/public/icon.jpeg";
import { useParams } from 'next/navigation';
import { useSession } from "next-auth/react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export function ChatList() {
    const { data: session, status } = useSession();
    const id = useParams();
    const [room_id] = useState(Number(id.chatId));
    const [message, setMessage] = useState("");
    const user_name = useMemo(() => session?.user.name || "NoName", [session]);
    const [list, setList] = useState([]);
    const [ChatData, setChatData] = useState();
    const textAreaRef = useRef(null);
    
    // テキストエリアの高さを調整する
    const adjustTextareaHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto"; // 高さをリセット
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // 新しい高さを設定
        }
    };

    // テキストの変更時に高さを調整
    const handleInputChange = (e) => {
        setMessage(e.target.value);
        adjustTextareaHeight();
    };

    useEffect(() => {
        var innerHeight = document.body.clientHeight + 50;
        let element = document.querySelector('#wrapper');
        element.style['min-height'] = innerHeight+'px';
      }, [list]);
      
      useEffect(() => {
        const getChat = async () => {
            const response = await fetch(`http://localhost:3000/api/whereSelect/${Number(id.chatId)}`, {
                cache: "no-store",
            });
            const data = await response.json();
            setChatData(data);
        };
        getChat();
    }, [list]);
    
    const handleSendMessage = async () => {
        if (!message.trim()) return; // メッセージが空なら送信しない

        try {
            await fetch("http://localhost:3000/api/create", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment: message, room_id, user_name }),
            });
            socket.emit("send_message", { message });
            setMessage(""); // メッセージをクリア
            if (textAreaRef.current) {
                textAreaRef.current.style.height = "auto"; // 送信後に高さをリセット
            }
        }catch(err){
            console.log(err);
        }
    }
    // サーバーからメッセージを受信
    useEffect(() => {
        socket.on("received_message", (data) => {
            setList((prevList) => [...prevList, data]);
        });
    }, []);

  return (
    <div className={style.wrapper} id="wrapper">
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-gray-200 border-dashed rounded-lg">
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div className="grid lg:grid-cols-1 px-4 py-4 gap-4">
                        {ChatData && ChatData.map((value) => (
                            <div key={value.id}>
                                <div className="flex justify-left pb-3">
                                    <div className={style.circle}>
                                        <Image width={180} height={180} src={icon} alt="icon" />
                                    </div>
                                    <div>
                                        <span className="text-white">{value.user_name?value.user_name:"NoName"}</span><br />
                                        <span className="text-white/50 text-xs mt-0">{new Date(value.created_at).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className={style.text}>{value.comment}</div>
                                <div className="border-b-2 border-slate-300/30 pt-3"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className={style['sp-fixed']}>
            <div className="bg-gray-700 sm:ml-64 px-4 pt-5 pb-5">
                <textarea
                        className="flex w-full border-2 border-slate-300/30 rounded-xl focus:outline-none focus:border-indigo-300 pl-4 bg-gray-600 text-gray-200 resize-none"
                        name="message"
                        onChange={handleInputChange}
                        value={message}
                        ref={textAreaRef}
                        style={{ overflow: 'hidden' }} // 高さが自動で変わるようにする
                    />
                    <input type="hidden" 
                        name="room_id"
                        value={room_id} 
                    />
                    <input type="hidden" 
                        name="user_name"
                        value={user_name} 
                    />
                    <div className={style.right}>
                        <button 
                            className="flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-300 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 mt-5 flex-shrink-0 " 
                            onClick={(() => handleSendMessage())}
                        >
                            <span>Send</span>
                            <span className="ml-2">
                                <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
