"use client";
import useSWR from 'swr';

type Room = {
    id: number;
    created_at: Date;
    room_name: string;
    public: boolean;
}

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<Room | any | null>);
}

const testSelect = () => {
  
  const {data, error, isLoading} = useSWR('http://localhost:3000/api/whereSelect', fetcher);
  console.log(data);

  if(error) return <div>Load is Failed</div>;
  if(isLoading) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div>
        {data.map((data: Room) => (
          <li key={data.id}>{data.room_name}</li>
          ))}
      </div>
    </main>
  );
}

export default testSelect;