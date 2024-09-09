import { SignOut } from '@/app/components/GitHubAuth/signOut-button';
import { auth } from '@/auth';
import Link from 'next/link';
import React from 'react'

export async function Header() {
  const session = await auth();
  if(!session?.user) return (
    <header className="flex justify-between p-4 items-center text-white">
        <Link href="/" className="font-semibold text-xl leading-tight">Clone</Link>
        <Link href="/userCreate" className="py-1 px-4 border-2 border-white-100 rounded">Sign Up</Link>
    </header>
  );

  return (
    <header className="flex justify-between p-4 sm:ml-64 border-b-2 border-slate-300/30 items-center bg-gradient-to-r bg-black/90 text-white">
        <span className="font-semibold text-xl leading-tight">Room</span>
        <SignOut />
    </header>
  );
}
