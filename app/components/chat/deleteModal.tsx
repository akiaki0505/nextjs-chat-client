import { useRouter } from 'next/navigation';
import React from 'react'

export type ModalProps = {
    open: boolean;
    onCancel: () => void;
    onOk: () => void;
    chatId: number;
  };

export default function DeleteModal(props: ModalProps) {
    const router = useRouter();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            await fetch("http://localhost:3000/api/delete", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data),
            });
      
            //props.onOk(); // モーダルを閉じる
            window.location.reload();
            router.refresh();
          } catch (err) {
            console.log(err);
          }
    }

    return props.open ? (
        <form onSubmit={onSubmit}>
            <div className="bg-white  top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-48 p-5 flex flex-col items-start absolute z-20">
                <div className="flex justify-between">
                    <h1 className="text-xl font-bold mb-5">Delete this message</h1>
                    <div className="pt-1 pl-14" onClick={() => props.onCancel()}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                    </div>
                </div>
                <p className="text-lg mb-5">Can I delete it?</p>
                <div className="flex mt-auto w-full">
                    <button 
                        className="py-1 px-4 border-2 border-red-400 rounded text-red-400 mx-auto hover:bg-red-700 hover:text-white hover:text-white hover:border-red-700" 
                        type="submit" 
                        >Delete
                    </button>
                </div>
                <input type="hidden" name="id" value={props.chatId} />
            </div>
          
        </form>
      ) : (
        <></>
      );
    };
