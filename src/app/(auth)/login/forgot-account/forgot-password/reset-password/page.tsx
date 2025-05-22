"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { resetPassword } from '@/lib/auth/auth-client'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'

export default function page() {

    const [password,setPassword] = useState('')
    const [message,setMessage] = useState('')
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const router = useRouter()
     

    useEffect(() =>{
        if (!token) {
            setMessage("Invaild or missing token")
        }
    },[token])

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!token)return;
        const {error} = await resetPassword({
            token,
            newPassword:password
        })
        
        if(error){
            setMessage("Failed to reset password")
        } else{
            setMessage("Password reset! You can sign in")
            setTimeout(() => {
                router.push("/login")
            }, 3000);
        }
    }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-md mx-auto space-y-4 container"
    >
      <h1 className="text-xl font-bold">Reset Password</h1>
      {message && <p>{message}</p>}
      <Input
        type="password"
        placeholder="New password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2"
      />
      <Button type="submit">Reset Password</Button>
    </form>
  )
}
