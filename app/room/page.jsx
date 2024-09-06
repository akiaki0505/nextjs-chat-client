import Link from "next/link";
import { auth } from "@/auth";
import { SignOut } from "@/app/components/GitHubAuth/signOut-button";
import { Header } from "@/app/components/header";

export default async function Room() {
  const session = await auth();
  const response = await fetch("http://localhost:3000/api/select", {
    cache: "force-cache",
  });
  const allRoomData = await response.json();

  return (
    <main className="flex min-h-screen flex-col justify-between">
        <div className="flex flex-col h-screen">
            <Header />
            <h2 className="border-b border-zinc-950 pl-5 pt-10">ルーム一覧</h2>
            <div className="pt-1"></div>
            {allRoomData.map((value) => (
                <div className="pt-5 pl-5" key={value.id}>
                    <li>
                        <Link href={`/chat/${value.id}`}>{value.room_name}</Link>
                    </li>
                </div>
            ))}

            <div className="pt-10"></div>
            <div className="flex flex-col rounded-md bg-neutral-100">
                <div className="p-4 font-bold rounded-t-md bg-neutral-200">
                    Current Session
                </div>
                <pre className="py-6 px-4 whitespace-pre-wrap break-all">
                    {JSON.stringify(session, null, 2)}
                </pre>
            </div>
        </div>
    </main>
  );
}
