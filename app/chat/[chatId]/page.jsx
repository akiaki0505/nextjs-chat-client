"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import style from "../styles/style.module.css";
import icon from "@/public/icon.jpeg";
import { RoomList } from "@/app/components/sidebar/roomList";
import axios from "axios";
import { Header } from "@/app/components/header";

const socket = io("http://localhost:5000");

async function fetcher(key) {
    return fetch(key).then((res) => res.json());
}

export default function Chat(props) {
    const [ value, setValue ] = useState('');
    const [ height, setHeight ] = useState(0);
    const textAreaRef = useRef(null);
    useEffect(() => {
        if (textAreaRef.current) {
            setHeight(0); // テキストエリアの高さを初期値に戻す
        }
    }, [value]);
    useEffect(() => {
        // 高さが初期値の場合にscrollHeightを高さに設定する
        if (!height && textAreaRef.current) {
            setHeight(textAreaRef.current.scrollHeight);
        }
    }, [height]);
    
    function handleChangeValue(value) {
        setValue(value);
    }

    //サーバーサイドコンポーネント
    /*const {params, searchParams } = props;
    const roomRes = await fetch("http://localhost:3000/api/select", {
        cache: "force-cache",
      });
      const allRoomData = await roomRes.json();
    
      const chatRes = await fetch(`http://localhost:3000/api/whereSelect/${params.chatId}`, {
        cache: "force-cache",
      });
      const ChatData = await chatRes.json();*/
      
      //クライアントサイドコンポーネント
      const id = useParams();
      const [message, setMessage] = useState("");
      const [room_id, setRoom_id] = useState(Number(id.chatId));
      const [user_name, setUser_name] = useState("テストユーザー");
      const [list, setList] = useState([]);
      const [api, setApi] = useState([]);
      const [room, setRoom] = useState([]);
      
      /*useEffect(() => {
        const getRoom = async () => {
            const response = await fetch( "http://localhost:3000/api/select");
            const allRoomData = await response.json();
            console.log(allRoomData);
            setRoom(allRoomData);
            };
            getRoom();
        }, []);*/

        useEffect(() => {
           (async () => {
            const allRoomData = await axios('http://localhost:3000/api/select');
            console.log(allRoomData.data);
            setRoom(allRoomData.data);
           })()
        }, []);

        useEffect(() => {
            (async () => {
             const chatData = await axios(`http://localhost:3000/api/whereSelect/${Number(id.chatId)}`);
             console.log(chatData.data);
             setApi(chatData.data);
            })()
         }, [list]);

         const handleSendMessage = async () => {
            const comment = String(message);
            try {
                await fetch("http://localhost:3000/api/create", {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({comment, room_id}),
                })
            }catch(err){
                console.log(err);
            }
            
            //serverへの送信
            socket.emit("send_message", { message: message });
            setMessage("");
        }
        //サーバーから受信
        socket.on("received_message", (data) => {
            setList([...list, data]);
        });


  //const {data, error, isLoading} = useSWR('http://localhost:3000/api/whereSelect', fetcher);
  /*useEffect(() => {
    const getChat = async () => {
      const response = await fetch(
        `http://localhost:3000/api/whereSelect/${Number(id.chatId)}`
      );
      const data = await response.json();
      console.log(data);
      setApi(data);
    };
    getChat();

  }, [list]);*/

  useEffect(() => {
    var innerHeight = document.body.clientHeight + 50;
    let element = document.querySelector('#wrapper');
    element.style['min-height'] = innerHeight+'px';
  }, [list]);


  return (
    <>
    <RoomList allRoomData={room} />
    
    <main className="flex min-h-screen flex-col bg-neutral-900">
        <div className={style.wrapper} id="wrapper">
            {/*<Header />*/}
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-gray-200 border-dashed rounded-lg">
                    <div className="grid grid-cols-1 gap-4 mb-4">
                    <div className="grid lg:grid-cols-1 px-4 py-4 gap-4">

                        {api && api.map((value) => (
                            <div key={value.id}>
                                <div className="flex justify-left pb-3">
                                    <div className={style.circle}>
                                        <Image 
                                            width={180}
                                            height={180} 
                                            src={icon} alt="icon" 
                                        />
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
                    <div className="pt-5"></div>
                    <input type="hidden" 
                        id="room_id"
                        onChange={(e) => setRoom_id(e.target.value)}
                        value={room_id} 
                    />
                    <input type="hidden" 
                        id="user_name"
                        onChange={(e) => setUser_name()}
                        value={user_name} 
                    />
                </div>
            </div>
        </div>
    </main>
    <div className={style['sp-fixed']}>
        <div className="bg-gray-700 sm:ml-64 px-4 pt-5 pb-5">
            <textarea 
                type="text" className="flex w-full border-2 border-slate-300/30 rounded-xl focus:outline-none focus:border-indigo-300 pl-4 bg-gray-600 text-gray-200 resize-none"
                onChange={(e) => setMessage(e.target.value)}
                value={message} 
                onInput={ (evt) => handleChangeValue(evt.target.value) }
                style={{ height: height ? `${ height }px` : 'auto' }}
                ref={ textAreaRef }
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
    </>
  );
}
