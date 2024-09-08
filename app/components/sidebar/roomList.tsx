import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export function RoomList(allRoomData: any) {
    let roomList: any = Object.values(allRoomData);
    roomList = [...roomList[0]];
    /*const [ room, setRoom ] = useState([]);
    useEffect(() => {
        const getRoom = async () => {
            const response = await fetch("http://localhost:3000/api/select");
            const allRoomData = await response.json();
            setRoom(allRoomData);
        }
        getRoom();
    }, []);*/

    return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group pb-10">
                <span className="ms-3">Clone</span>
            </a>
            <ul className="space-y-2 font-medium">
                {roomList && roomList.map((value: any) => (
                    <li key={value.id}>
                        <Link href={`/chat/${value.id}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="flex-1 ms-3 whitespace-nowrap">{value.room_name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </aside>
  )
}
