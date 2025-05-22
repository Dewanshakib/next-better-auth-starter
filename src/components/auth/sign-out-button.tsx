"use client"
import { signOut } from "@/lib/auth/auth-client";
import { Icons } from "../icons";
import { useRouter } from "next/navigation";

export default function SignOutButton () {
    const router = useRouter()
    const handleClick = async () => {
        await signOut({
            fetchOptions:{
                onSuccess:()=>{
                   router.push("/login") 
                }
            }
        })
    }
    return (
        <div onClick={handleClick} className="flex justify-between items-center w-18 cursor-pointer">
            <Icons.logOut/>
            Log out
        </div>
    )
}