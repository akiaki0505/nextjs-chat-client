"use client"; 
import Image from 'next/image';
import React from 'react';
import githubMark from "@/public/github-mark.png";
import { signIn } from "next-auth/react"; 

export function SignIn() {
  const handleSignIn = async () => {
    await signIn("github");
  };

  return (
    <button
      onClick={handleSignIn} 
      type="button"
      className="w-3/5 mt-5 inline-flex items-center justify-center h-9 mr-3 px-3 text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      <Image width={30} height={30} src={githubMark} alt="githubMark" className="mr-3" />
      GitHub
    </button>
  );
}
