"use client";
import React, { useEffect, useState } from 'react';
import style from "@/app/chat/styles/style.module.css";
import { useChatData } from '@/app/features/hooks/useChatData';
import { ChatMessages } from '@/app/components/chat/chatMessage';
import { ChatInput } from '@/app/components/chat/chatInput';

export function ChatList() {
    const { ChatData, room_id, handleSendMessage, message, setMessage, user_name, textAreaRef } = useChatData();

    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        // 初期ウィンドウサイズ設定
        setWindowHeight(window.innerHeight);

        // ウィンドウサイズ変更時に高さを更新
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

  return (
    <div className={style.wrapper}>
        <div className="p-4 sm:ml-64 overflow-y-scroll" style={{ height:`${windowHeight - 200}px`} }>
            <div className="p-4 border-gray-200 border-dashed rounded-lg">
                <ChatMessages chatData={ChatData} />
            </div>
        </div>
        <ChatInput
                message={message}
                setMessage={setMessage}
                handleSendMessage={handleSendMessage}
                room_id={room_id}
                user_name={user_name}
                textAreaRef={textAreaRef}
            />
    </div>
)}
