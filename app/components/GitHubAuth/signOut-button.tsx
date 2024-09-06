import React from 'react'
import { signIn, signOut } from '@/auth';

export function SignOut() {
  return (
    <form action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
        }}>
        <button type="submit" className="py-1 px-4 border-2 border-green-800 rounded">SignOut</button>
    </form>
  )
}
