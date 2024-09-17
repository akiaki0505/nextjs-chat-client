import { RoomList } from "@/app/components/sidebar/roomList";
import { Header } from "@/app/components/header";
import { ChatList } from "@/app/components/chat/chatList";
import { SessionProvider } from "next-auth/react";


export default async function Chat() {
    const roomRes = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/room/select",{
        cache: "no-store",
    });
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
