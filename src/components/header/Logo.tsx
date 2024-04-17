import Image from "next/image";
import Link from "next/link";

export const Logo = ({ setIsOpen }: { setIsOpen: any }) => {

    return (
        <Link onClick={() => setIsOpen(false)} href='/home' className="h-16 flex justify-center items-center">
            <Image
                src='/images/logo/logo.png'
                alt="logo"
                width={135}
                height={42}
                priority={true}
            />
        </Link>
    );
}