"use client"

import { FC } from 'react'

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { sidebarLinks } from "@/constants";
import Logout from './Logout';
import { useSession } from 'next-auth/react';
import { buttonVariants } from '../ui/button';

interface LeftsidebarProps {
    // title?: string
}

const Leftsidebar: FC<LeftsidebarProps> = ({ }) => {
    const { data: session } = useSession();

    const router = useRouter();
    const pathname = usePathname();

    // const { userId } = useAuth();
    return (
        <section className='custom-scrollbar leftsidebar'>
            <div className='flex w-full flex-1 flex-col gap-6 px-6'>
                {sidebarLinks.map((link) => {
                    const isActive =
                        (pathname?.includes(link.route) && link.route.length > 1) ||
                        pathname === link.route;

                    // if (link.route === "/profile") link.route = `${link.route}/${userId}`;

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                            />

                            <p className='text-light-1 max-lg:hidden'>{link.label}</p>
                        </Link>
                    );
                })}
            </div>

            <div className='mt-10 px-6'>
                {
                    session?.user ? (
                        <Logout />
                    ) : (
                        <Link className={buttonVariants()} href='/api/auth/signin'>
                            Sign in
                        </Link>
                    )
                }
            </div>
        </section>
    )
}

export default Leftsidebar