"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { forgetPassword } from '@/lib/auth/auth-client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

export default function page() {

  const params = useSearchParams()
  const emailFromQuery = params.get("email") ||   ""
  const [email,setEmail] = useState(emailFromQuery)
  const [message,setMessage] = useState("")

  const handleSearch = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const {error} = await forgetPassword({
      email,
      redirectTo:`${window.location.origin}/login/forgot-account/forgot-password/reset-password`
    })

    if (error){
      setMessage("Something went wrong please try again later.")
    } else {
      setMessage("Check your email for your reset link")
    }
    setEmail("")
  }

  return (
    <form onSubmit={handleSearch} className='p-6 max-w-md mx-auto space-y-4 mt-10 container'>
        <h1 className='text-xl font-semibold'>Forgot Your Password</h1>
        <Input
        className='w-full p-2 border rounded'
        type='email'
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <div className='grid grid-cols-3 gap-2'>
          <Button type='submit'>Send Reset Link</Button>
          <Button asChild variant={"outline"}>
            <Link href={'/login'}>Sign In</Link>
          </Button>
        </div>
        {message && <p>{message}</p>}
    </form>
  )
}
