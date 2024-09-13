import React, { ChangeEvent, RefObject } from 'react';
import style from "@/app/chat/styles/style.module.css";

interface ChatInputProps {
    message: string;
    setMessage: (value: string) => void;
    handleSendMessage: () => void;
    room_id: number;
    user_name: string;
    textAreaRef: RefObject<HTMLTextAreaElement>;
}

export const ChatInput: React.FC<ChatInputProps> = ({
    message, setMessage, handleSendMessage, textAreaRef
}) => {

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div className={style['sp-fixed']}>
            <div className="bg-gray-700 sm:ml-64 px-4 pt-5 pb-5">
                <textarea
                    className="flex w-full border-2 border-slate-300/30 rounded-xl focus:outline-none focus:border-indigo-300 pl-4 bg-gray-600 text-gray-200 resize-none"
                    name="message"
                    onChange={handleInputChange}
                    value={message}
                    ref={textAreaRef}
                    style={{ overflow: 'hidden' }}
                />
                <div className={style.right}>
                    <button
                        className="flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-300 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 mt-5 flex-shrink-0"
                        onClick={handleSendMessage}
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
    );
};