import style from "@/app/chat/styles/style.module.css";
import { RoomList } from "@/app/components/sidebar/roomList";
import { Header } from "@/app/components/header";
import { ChatList } from "@/app/components/chat/chatList";
import { SessionProvider } from "next-auth/react";


export default async function Chat() {
    const roomRes = await fetch("http://localhost:3000/api/select");
    const allRoomData = await roomRes.json();
    
    return (
        <>
        <RoomList allRoomData={allRoomData} />
        
        <main className="flex min-h-screen flex-col bg-neutral-900">
            <Header />
            <SessionProvider>
                <ChatList />
            </SessionProvider>
        </main>
        </>
    );
}
