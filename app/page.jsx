import Link from "next/link";

export default async function Home() {

  const response = await fetch("http://localhost:3000/api/select", {
    cache: "force-cache",
  });
  const allRoomData = await response.json();

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div>
        <h2 className="border-b border-zinc-950 pl-5">ルーム一覧</h2>
        <div className="pt-1"></div>
          {allRoomData.map((value) => (
            <div className="pt-5 pl-5" key={value.id}>
              <li>
                <Link href={`/chat/${value.id}`}>{value.room_name}</Link>
              </li>
            </div>
            ))}
      </div>
    </main>
  );
}
