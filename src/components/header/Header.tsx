'use client'

import { useState } from "react";
import { Login } from "./Login";
import { Logo } from "./Logo"
import { NavItem } from "./NavItem";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

export const Header = () => {

    const { data: session } = useSession();

    const navigation = [
        { name: 'Home', href: '/home' },
        { name: 'Sri Guru Granth Sahib', href: '/sriguru' },
        { name: 'Commentary', href: '/commentary' },
        { name: 'Dictionary', href: '/dictionary' },
        { name: 'Glossary', href: '/glossary' },
        { name: 'Media', href: '/media' },
        { name: 'Gubani Search', href: '/gubanisearch' },
    ];

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky z-20 top-0 w-full bg-primary">
            <div className="max-w-6xl px-4 mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center">
                <div className="flex justify-between items-center w-full lg:w-auto">
                    <Logo setIsOpen={setIsOpen} />
                    <div onClick={() => setIsOpen(!isOpen)} className="lg:hidden cursor-pointer text-white border border-tertiary px-3 rounded-[4px]">
                        <FontAwesomeIcon icon={faBars} size="lg" />
                    </div>
                </div>
                <nav className={clsx(
                    "w-full lg:w-auto lg:h-auto transition-height",
                    isOpen ? (session ? "h-[544px]" : "h-[484px]") : "h-0"
                )}>
                    <ul className={clsx(
                        "list-none lg:flex lg:flex-row",
                        isOpen ? "flex flex-col" : "hidden"
                    )}>
                        {navigation.map((item) => (
                            <NavItem key={item.name} href={item.href} setIsOpen={setIsOpen}>
                                {item.name}
                            </NavItem>
                        ))}
                        <Login session={session} setIsOpen={setIsOpen} />
                    </ul>
                </nav>
            </div>
        </header >
    )
}