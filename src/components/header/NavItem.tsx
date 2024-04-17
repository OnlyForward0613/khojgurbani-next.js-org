'use client'

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavItem = ({ href, children, setIsOpen }: { href: string; children: JSX.Element | string; setIsOpen: any; }) => {
    const pathname = usePathname();
    const isActive = `/${pathname.split("/")[1]}` === href;
    return (
        <li onClick={() => setIsOpen(false)} className={clsx(
            isActive ? 'border-b-4 border-blue-primary' : 'border-none', "flex w-full lg:w-auto")}>
            <Link
                href={href}
                className='w-full hover:bg-secondary px-[15px] py-[20px] text-white text-sm'
            >
                {children}
            </Link>
        </li>
    );
}