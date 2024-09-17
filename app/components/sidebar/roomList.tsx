"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Room = {
    id: number;
    room_name: string;
  }

export function RoomList(allRoomData: { rooms: Room[] }) {
    let ssrRoomList: Room[] = Object.values(allRoomData)[0];

    const [roomList, setRoomList] = useState(ssrRoomList);
    const [roomInput, setRoomInput] = useState("");
    const [list, setList] = useState(false);

    
    const getRoom = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/room/select", {
            cache: "no-store",
        });
        const data = await response.json();
        setRoomList(data);
    };

    const handleRoomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {{
        setRoomInput(e.target.value);
        }
    };

    async function onSubmit (event: React.FormEvent<HTMLFormElement>){
        if (!roomInput.trim()) return; //room nameの入力がない場合は登録しない
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        try{
            await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/room/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data),
            });
            setList(true);
            setRoomInput("");
            getRoom();
          }catch(err){
            console.log(err);
          }
    }

    return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r-2 border-slate-300/30" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-800">
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group pb-10 font-semibold text-xl leading-tight">
                <span className="ms-3 text-xl text-emerald-400">Clone</span>
            </a>
            
            <form onSubmit={onSubmit}>
                <div className="flex pb-3">
                    <div className="relative w-full">
                        <input 
                            type="text" 
                            className="block p-2.5 w-full z-20 bg-black/20 text-sm text-white rounded rounded-s-gray-100 border-2 border-slate-300/30 hover:bg-gray-700/90" 
                            name="room_name"
                            onChange={handleRoomInputChange}
                            value={roomInput}
                            placeholder="Room name" 
                        />
                        <button 
                            type="submit" 
                            className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-black/50 border-2 border-slate-300/30 hover:bg-gray-700/90">
                            <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
            
            <ul className="space-y-2 font-medium">
                {roomList && roomList.map((value: any) => (
                    <li key={value.id}>
                        <Link href={`/chat/${value.id}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700/90 group text-white">
                            <span className="flex-1 ms-3 whitespace-nowrap">{value.room_name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </aside>
  )
}
