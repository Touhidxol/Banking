"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Section } from 'lucide-react'
import Image from 'next/image'


const MobileNav = ({ user }: MobileNavProps) => {
    const pathname = usePathname();

    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <Image src='/icons/hamburger.svg' width={30} height={30} alt='menu' className='cursor-pointer' />
                </SheetTrigger>
                <SheetContent side='left' className='border-none bg-white'>
                    <SheetTitle>
                        <div className='hidden'>Navigation Menu</div>
                    </SheetTitle>

                    <Link href='/' className=' flex !mb-12 cursor-pointer items-center gap-1 !px-4 '>
                        <Image src='/icons/logo.svg' width={34} height={34} alt='LOGO' />
                        <div className='text-26 font-ibm-plex-serif font-bold text-black-1'>Umini</div>
                    </Link>

                    <div className='mobilenav-sheet'>
                        <SheetClose asChild>
                            <nav className='flex h-full flex-col gap-6 pt-16 !px-4 text-white'>
                                {sidebarLinks.map((item) => {
                                    const isActive = pathname == item.route || pathname.startsWith(`${item.route}/`)
                                    return (
                                        <SheetClose asChild key={item.route}>
                                            <Link href={item.route} key={item.label} className={cn('!mobilenav-sheet-close w-full', { 'bg-bankGradient !text-white': isActive })}>
                                                <Image
                                                    src={item.imgURL}
                                                    alt={item.label}
                                                    height={24}
                                                    width={24}
                                                    className={cn({ 'brightness-[3] invert-0': isActive })}>
                                                </Image>
                                                <p className={cn('text-16 font-semibold text-black-2', { "!text-white": isActive })}>
                                                    {item.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </nav>
                        </SheetClose>
                    </div>
                    FOOTER
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav
