"use client";
import React from 'react';
import style from "@/app/chat/styles/style.module.css";
import { useChatData } from '@/app/features/hooks/useChatData';
import { ChatMessages } from '@/app/components/chat/chatMessage';
import { ChatInput } from '@/app/components/chat/chatInput';

export function ChatList() {
    const { ChatData, room_id, handleSendMessage, message, setMessage, user_name, textAreaRef } = useChatData();

  return (
    <div className={style.wrapper}>
        <div className="p-4 sm:ml-64 overflow-y-scroll" style={{height:'35rem'}}>
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
