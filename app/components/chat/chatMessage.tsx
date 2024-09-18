import React, { useState } from 'react';
import Image from "next/image";
import style from "@/app/chat/styles/style.module.css";
import icon from "@/public/favicon.ico";
import DeleteModal from "@/app/components/chat/deleteModal";

// メッセージの型定義
interface ChatMessage {
    id: number;
    user_name: string;
    comment: string;
    created_at: string;
}

interface ChatMessagesProps {
    chatData: ChatMessage[];  // チャットデータの型
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ chatData }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="grid lg:grid-cols-1 px-4 py-4 gap-4">
                {chatData && chatData.map((value) => (
                    <div key={value.id}>
                        <div className="flex justify-between pb-3">
                            <div className="flex justify-left pb-3">
                                <div className={style.circle}>
                                    <Image width={180} height={180} src={icon} alt="icon" />
                                </div>
                                <div>
                                    <span className="text-white pl-3">{value.user_name || "NoName"}</span><br />
                                    <span className="text-white/50 text-xs mt-0 pl-3">{new Date(value.created_at).toLocaleString()}</span>
                                </div>
                            </div>

                            <button onClick={() => setIsOpen(true)}>
                                <svg className="w-6 h-6 text-red-800 dark:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                </svg>
                            </button>

                         </div>
                            
                        <div className={style.text}>{value.comment}</div>
                        <div className="border-b-2 border-slate-300/30 pt-3"></div>
                        <DeleteModal
                            open={isOpen}
                            onCancel={() => setIsOpen(false)}
                            onOk={() => setIsOpen(false)}
                            chatId={value.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};