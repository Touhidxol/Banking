"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"
import { authformSchema } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signUp, signIn, getLoggedInUser } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'


const AuthForm = ({ type }: { type: string }) => {
    const formSchema = authformSchema(type);
    const [user, setuser] = useState(null)
    const [Loading, setLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const loggedUser = await getLoggedInUser();
            if (loggedUser) setuser(loggedUser);
        };
        fetchUser();
    }, []);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            email: "",
            firstname: "",
            lastname: "",
            address1: "",
            state: "",
            postalCode: "",
            city: "",
            dateOfBirth: "",
            ssn: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);

        // Do something with the form values.
        try {
            //Sign up with Appwrite & create plaid token
            if (type == "sign-up") {
                const userData = {
                    firstName: data.firstname!,
                    lastName: data.lastname!,
                    address1: data.address1!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    city: data.city!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email,
                    password: data.password,
                }

                const newUser = await signUp(userData);
                setuser(newUser);
            }
            if (type == "sign-in") {
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                })

                if (response) router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className='!auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href='/' className=' flex cursor-pointer items-center gap-1 '>
                    <Image src='/icons/logo.svg' width={34} height={34} alt='LOGO' />
                    <div className='text-26 font-ibm-plex-serif font-bold text-black-1'>Umini</div>
                </Link>

                <div className='flex flex-col gap-1 md:gap-3'>
                    <div className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ? "link Account" :
                            type === "sign-in" ? "Sign In"
                                : "Sign Up"}
                        <p className='text-16 font-normal text-gray-600 '>
                            {user ? "Link Your Account to get started" : "please enter your details"}
                        </p>
                    </div>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    <PlaidLink user={user} variant='primary' />
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-8">
                            {type === "sign-up" &&
                                <>
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name='firstname'
                                            label="Firstname"
                                            placeholder='eg: John'
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name='lastname'
                                            label="Lastname"
                                            placeholder='eg: Wick'
                                        />
                                    </div>
                                    <CustomInput
                                        control={form.control}
                                        name='address1'
                                        label="Address"
                                        placeholder='Enter your Address'
                                    />
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name='state'
                                            label="State"
                                            placeholder='ex: WB'
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name='postalCode'
                                            label="Postal Code"
                                            placeholder='ex: 7000001'
                                        />
                                    </div>
                                    <CustomInput
                                        control={form.control}
                                        name='city'
                                        label="City"
                                        placeholder='Enter name of your City'
                                    />
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name='dateOfBirth'
                                            label="Date Of Birth"
                                            placeholder='YYYY-MM-DD'
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name='ssn'
                                            label="SSN"
                                            placeholder='ex: 1234'
                                        />
                                    </div>
                                </>
                            }
                            <CustomInput
                                control={form.control}
                                name='email'
                                label="Email"
                                placeholder='Enter your Email'
                            />
                            <CustomInput
                                control={form.control}
                                name='password'
                                label="Password"
                                placeholder='Enter your password'
                            />
                            <div className='flex flex-col gap-4'>
                                <Button type="submit" className='!form-btn' disabled={Loading}>
                                    {Loading ? (
                                        <>
                                            <Loader2 size={20} className='animate-spin ' /> &nbsp; Loading...
                                        </>
                                    ) : (type === "sign-in" ? "Sign In" : "Sign Up"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>{type == "sign-in" ? "Don't have account ? " : "Already have an account ? "}</p>
                        <Link href={type === "sign-in" ? '/sign-up' : 'sign-in'} className='!form-link'>
                            {type === "sign-in" ? '/Sign Up' : 'Sign In'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm
