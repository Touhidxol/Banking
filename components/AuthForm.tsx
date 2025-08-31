"use client"
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

const AuthForm = ({ type }: { type: string }) => {
    const [user, setuser] = useState(null)
    return (
        <section className='!auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href='/' className=' flex !mb-12 cursor-pointer items-center gap-1 !px-4 '>
                    <Image src='/icons/logo.svg' width={34} height={34} alt='LOGO' />
                    <div className='text-26 font-ibm-plex-serif font-bold text-black-1'>Umini</div>
                </Link>

                <div className='flex flex-col gap-1 md:gap-3'>
                    <p className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ? "link Account" :
                            type === "sign-in" ? "Sign In"
                                : "Sign Up"}
                        <p className='text-16 font-normal text-gray-600 '>
                            {user ? "Link Your Account to get started" : "please enter your details"}
                        </p>
                    </p>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    {/* {Link account} */}
                </div>
            ) : (
                <>
                FORM
                </>
)}
        </section>
    )
}

export default AuthForm
