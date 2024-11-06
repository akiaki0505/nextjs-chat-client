"use client";
import React, { useState } from 'react'
import style from "@/app/components/login-form/style/style.module.css";
import { SignIn } from '@/app/components/GitHubAuth/signIn-button';
import { signIn } from 'next-auth/react';
import { Input } from '@/app/components/login-form/elements/input';
import { Button } from '@/app/components/login-form/elements/button';
import { useRouter } from "next/navigation";
import Link from 'next/link';

export function LoignForm() {
    const router = useRouter();
    const [error, setError] = useState(''); 
    const handleSubmit = async (value: any) => {
        value.preventDefault();
        setError(''); 
        const formData = new FormData(value.currentTarget);
        const formDataJson = Object.fromEntries(formData);
    
        const result = await signIn('credentials', {
          redirect: false,
          mailaddress: formDataJson.mailaddress,
          password: formDataJson.password,
        });
    

        if (result && result.error) {
            setError('Invalid email or password');
            console.error(result.error);
          } else {
            router.push("/room");
          }
      };
  return (
    <div className="flex-auto">
        <div className="flex justify-center mt-16">
            <div className="w-2/5 rounded-md border border-slate-100/50 bg-black/60 backdrop-blur-3xl mix-blend-luminosity shadow-xl shadow-white/10">
                <div className="my-12 text-center">
                    <h2 className="text-4xl font-bold text-emerald-400">SignIn</h2>
                    <p className="my-4">
                        <span className="font-semibold text-emerald-400">
                            Welcome back<br />
                            Sign in to your account
                        </span>
                    </p>
                    <form onSubmit={handleSubmit}>
                        {error && <span style={{ color: 'red' }}>{error}</span>}
                        <Input 
                            type="email" 
                            name="mailaddress" 
                            placeholder="MailAddress"
                            className="w-4 h-4 text-emerald-400"
                            width=""
                            height=""
                            viewBox="0 0 20 18"
                            path1_d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"
                            path2_d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"
                            />
                        <Input 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            className="w-5 h-5 text-emerald-400"
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 20"
                            path1_d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                            path2_d=""
                            />
                        <div className="pt-3"></div>
                        <Button type="submit" name="Login" />
                    </form>
                    <div className={style.sub_h}>
                        <span className={style.sub_s}>OR CONTINUE WITH</span>
                    </div>
                    <SignIn/>
                </div>
                <div className="text-center p-5 bg-black/40">
                    <div className="text-gray-300">Don&rsquo;t have an account? 
                        <Link href="/userCreate" className="font-semibold text-emerald-400 pl-3" >Sign up</Link> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
