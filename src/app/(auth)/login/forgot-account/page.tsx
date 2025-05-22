"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { searchAccount } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

export default function page() {

    const [email,setEmail] = useState("")
    const router = useRouter()
    const handleSearch = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const found = await searchAccount(email)
        
        if(found){
          router.push(`/login/forgot-account/forgot-password?email=${encodeURIComponent(email)}`)
        } else {
          router.push("/sign-up")
        }
    }

  return (
    <form onSubmit={handleSearch} className='p-6 max-w-md mx-auto space-y-4 mt-10 container'>
        <h1 className='text-xl font-semibold'>Find Your Account</h1>
        <Input
        className='w-full p-2 border rounded'
        type='email'
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Button type='submit'>Search</Button>
    </form>
  )
}
