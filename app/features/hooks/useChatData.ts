import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import io from "socket.io-client";

const socket = io("http://localhost:5000");

// チャットメッセージの型定義
interface ChatMessage {
    id: number;
    user_name: string;
    comment: string;
    created_at: string;
}

export const useChatData = () => {
    const { data: session } = useSession();
    const id = useParams();
    const [room_id] = useState(Number(id.chatId));
    const [message, setMessage] = useState("");
    const user_name = useMemo(() => session?.user?.name || "NoName", [session]);
    const [list, setList] = useState<any>("");
    const [ChatData, setChatData] = useState();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const getChat = async () => {
            const response = await fetch(`http://localhost:3000/api/whereSelect/${room_id}`, {
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
            setMessage(""); // メッセージをクリア
            if (textAreaRef.current) {
                textAreaRef.current.style.height = "auto"; // 送信後に高さをリセット
            }
            socket.emit("send_message", { message });
        }catch(err){
            console.log(err);
        }
    }

    // サーバーからメッセージを受信
    useEffect(() => {
        socket.on("received_message", (data: string) => {
            setList((prevList:any) => [...prevList, data]);
        });
    }, []);

    return { ChatData, room_id, handleSendMessage, message, setMessage, user_name, textAreaRef };
}