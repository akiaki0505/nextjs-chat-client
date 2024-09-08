import { SignOut } from '@/app/components/GitHubAuth/signOut-button';
import { auth } from '@/auth';
import React from 'react'

export async function Header() {
  const session = await auth();
  if(!session?.user) return (
    <header className="flex justify-between p-4 items-center text-white">
        <h1 className="font-semibold text-xl leading-tight">Clone</h1>
        <button className="py-1 px-4 border-2 border-white-100 rounded">User</button>
    </header>
  );

  return (
    <header className="flex justify-between p-4 border-b items-center bg-white">
        <h1 className="font-semibold text-xl leading-tight">Clone</h1>
        <SignOut />
    </header>
  );
}
