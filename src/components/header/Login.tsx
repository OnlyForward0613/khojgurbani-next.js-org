'use client'

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faRightFromBracket, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { postData } from "@/utils/fetch_client";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

export const Login = ({ session, setIsOpen }: { session: any; setIsOpen: any; }) => {

    const [dropOpen, setDropOpen] = useState(false);

    const pathname = usePathname();
    const isActive = pathname === '/auth/login';

    const listRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (listRef.current && !listRef.current.contains(event.target as Node)) {
            setDropOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (session) return (
        <div ref={listRef} className="flex flex-col lg:flex-row items-center cursor-pointer group relative">
            <div onClick={() => setDropOpen(!dropOpen)} className="hidden lg:flex gap-2 items-center">
                <Image src={session.user?.image || ""} alt="avatar" width={45} height={45} />
                <FontAwesomeIcon icon={faCaretDown} className="text-white group-hover:text-blue-primary" />
            </div>
            {dropOpen &&
                <div className="absolute top-14 right-0 z-10 w-40 py-2 flex flex-col bg-white shadow-common rounded">
                    <li className="px-[14px] py-[7px] hover:bg-gray-primary">
                        <Link href={'/myaccount'} className="flex gap-2 items-center text-sm text-primary">
                            <FontAwesomeIcon icon={faUserGear} className="w-[18px]" />
                            <span>My Account</span>
                        </Link>
                    </li>
                    <li className="px-[14px] py-[7px] hover:bg-gray-primary">
                        <div
                            onClick={() => signOut()}
                            className="flex gap-2 items-center text-sm text-primary"
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} className="w-[18px]" />
                            <span>Logout</span>
                        </div>
                    </li>
                </div>
            }
            <li
                onClick={() => setIsOpen(false)}
                className={clsx(isActive ? 'border-b-4 border-blue-primary' : 'border-none', "flex w-full lg:hidden")}
            >
                <Link
                    href={'/myaccount'}
                    className='w-full hover:bg-secondary px-[15px] py-[20px] text-white text-sm'
                >
                    My account
                </Link>
            </li>
            <li
                onClick={() => setIsOpen(false)}
                className={clsx(isActive ? 'border-b-4 border-blue-primary' : 'border-none', "flex w-full lg:hidden")}
            >
                <div
                    onClick={() => signOut()}
                    className='w-full hover:bg-secondary px-[15px] py-[20px] text-white text-sm text-left'
                >
                    Logout
                </div>
            </li>
        </div>
    );

    return (
        <li
            onClick={() => setIsOpen(false)}
            className="flex w-full lg:w-auto"
        >
            <Link
                href='/auth/login'
                className={clsx(
                    isActive ? 'border-b-4 border-blue-primary' : 'border-none',
                    'w-full px-[15px] py-[20px] hover:bg-secondary text-white text-sm'
                )}
            >
                Login
            </Link>
        </li>
    );
}