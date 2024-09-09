import { Header } from '@/app/components/header'
import { UserForm } from '@/app/components/user-form/form'
import React from 'react'

export default function UserCreate() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-gradient-to-r from-teal-800 to-teal-600">

        <div className="flex flex-col h-screen">
            <Header />
            <UserForm />
        </div>

    </main>
  )
}
