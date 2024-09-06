import React from 'react'
import style from "@/app/style/style.module.css";
import { SignIn } from '@/app/components/GitHubAuth/signIn-button';
import { Input } from '@/app/components/login-form/elements/input';
import { Button } from '@/app/components/login-form/elements/button';

export function LoignForm() {
  return (
    <div className="flex-auto">
        <div className="flex justify-center mt-16">
            <div className="w-2/5 border bg-white">
                <div className="my-12 text-center">
                    <h2 className="text-4xl font-bold">SignIn</h2>
                    <p className="my-4">
                        <span className="font-semibold">MailAddress</span>と
                        <span className="font-semibold">Password</span>を入力してください。
                    </p>
                    <form>
                        <Input type="email" placeholder="MailAddress" />
                        <Input type="password" placeholder="Password" />
                        <Button type="submit" name="Login" />
                    </form>
                    <div className={style.sub_h}>
                        <span className={style.sub_s}>OR CONTINUE WITH</span>
                    </div>
                    <SignIn/>
                </div>
            </div>
        </div>
    </div>
  )
}
