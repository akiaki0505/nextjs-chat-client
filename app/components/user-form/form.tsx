"use client";
import React from 'react'
import { Button } from '@/app/components/login-form/elements/button';
import { Input } from '@/app/components/user-form/elements/Input';
import { useRouter } from 'next/navigation';

export function UserForm() {
    const router = useRouter();
    async function onSubmit (value: any){
        value.preventDefault();
        const formData = new FormData(value.currentTarget)
        try{
            await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/signUp", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(Object.fromEntries(formData)),
            });
      
            router.push('/');
            router.refresh();
          }catch(err){
            console.log(err);
          }
    }
  return (
    <div className="flex-auto">
        <div className="flex justify-center mt-16">
            <div className="w-2/5 rounded-md border border-slate-100/50 bg-black/60 backdrop-blur-3xl mix-blend-luminosity shadow-xl shadow-white/10">
                <div className="my-12 text-center">
                    <h2 className="text-4xl font-bold text-emerald-400">Sign Up</h2>
                    <p className="my-4">
                        <span className="font-semibold text-emerald-400">
                            Get started<br />
                            Create a new account
                        </span>
                    </p>
                    <form onSubmit={onSubmit}>
                        <Input 
                            name="name"
                            id="name" 
                            type="text" 
                            placeholder="Name" 
                        />
                        <Input 
                            name="mailaddress" 
                            id="mailaddress" 
                            type="text" 
                            placeholder="MailAddress" 
                        />
                        <Input 
                            name="password" 
                            id="password" 
                            type="password" 
                            placeholder="Password" 
                        />
                        <div className="pt-3"></div>
                        <Button type="submit" name="Sign Up" />
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
