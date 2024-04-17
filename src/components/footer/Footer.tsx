'use client'
import Link from 'next/link'
import Image from 'next/image';
interface NavigationItem {
    name: string;
    href: string;
}

const navigation: NavigationItem[] = [
    { name: 'Home', href: '/Home' },
    { name: 'Sri Guru Granth Sahib', href: '/SriGuruGranthSahib' },
    { name: 'Commentary', href: '/Commentary' },
    { name: 'Glossary', href: '/Glossary' },
    { name: 'Media', href: '/Media' },
    { name: 'Dictionary', href: '/Dictionary' },
    { name: 'Terms & Conditions', href: '/GubaniSearch' },
    { name: 'Privacy policy', href: '/Login' },
];

export const Footer = () => {
    return (
        <footer className="w-full pt-8 pb-4 bg-primary text flex-shrink-0">
            <div className="mx-auto max-w-6xl px-4 md:divide-y divide-line-tertiary">
                <div className='hidden md:block'>
                    <Image
                        src="/images/logo/logo.png"
                        alt="Logo"
                        width={193}
                        height={60}
                        priority
                        className="mx-auto h-auto"
                    />

                    <div className="flex justify-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={`${item.href}`}
                                className="flex h-16 text-white text-xs items-center text-center"
                            >
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-32 md:pt-8 pt-4'>
                    <div className='flex flex-col items-center gap-2'>

                        <h4 className='text-sm tracking-[4px] text-white'>
                            FOLLOW US
                        </h4>
                        <div className='flex gap-2'>
                            <Image
                                src='/images/svg/soc_1.svg'
                                alt=''
                                width={25}
                                height={25}

                            />
                            <Image
                                src='/images/svg/soc_2.svg'
                                alt=''
                                width={25}
                                height={25}

                            />
                            <Image
                                src='/images/svg/soc_3.svg'
                                alt=''
                                width={25}
                                height={25}

                            />
                            <Image
                                src='/images/svg/soc_4.svg'
                                alt=''
                                width={25}
                                height={25}

                            />
                            <Image
                                src='/images/svg/soc_1.svg'
                                alt=''
                                width={25}
                                height={25}

                            />
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-2'>

                        <h4 className='text-sm tracking-[4px] text-white'>
                            CONTACT US
                        </h4>
                        <h4 className='text-sm text-white'>
                            khojgurbani@gmail.com
                        </h4>
                    </div>
                </div>
                <div className='flex items-center gap-6 justify-center md:hidden pt-8'>
                    <h4 className='text-sm text-white'>
                        Terms & Conditions
                    </h4>
                    <h4 className='text-sm text-white'>
                        Privacy Policy
                    </h4>
                </div>

            </div>
            <div className='mx-auto block w-fit mt-8 text-white text-xs'>
                Copyright © 2023 KhojGurbani
            </div>

        </footer>
    );
}