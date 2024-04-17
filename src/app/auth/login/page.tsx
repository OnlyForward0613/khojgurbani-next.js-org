"use client"

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {

    return (
        <div className="max-w-[500px] grow bg-white rounded-lg shadow-double px-[30px] sm:px-[55px] py-[30px] flex flex-col items-center">
            <h2 className="text-[20px] text-[#212529] font-bold mb-[30px]">Sign In</h2>
            <div className="w-full flex flex-col gap-[15px] justify-between items-center">
                <button
                    onClick={() => signIn('google')}
                    className="cursor-pointer w-full flex gap-2 justify-center items-center h-[44px] rounded-md border-2 border-[#518EF8] bg-white hover:bg-[#518EF8]/10 transition-all"
                >
                    <Image src="/images/svg/google.svg" alt="google" width={24} height={24} />
                    <span className="text-[16px] text-[#518EF8]">Sign in with Google</span>
                </button>
                <button
                    className="cursor-pointer w-full flex gap-2 justify-center items-center h-[44px] rounded-md border-2 border-[#4E71A8] bg-white hover:bg-[#4E71A8]/10 transition-all"
                >
                    <Image src="/images/svg/facebook.svg" alt="facebook" width={24} height={24} />
                    <span className="text-[16px] text-[#4E71A8]">Sign in with Facebook</span>
                </button>
                <button
                    className="cursor-pointer w-full flex gap-2 justify-center items-center h-[44px] rounded-md border-2 border-black bg-white hover:bg-black/10 transition-all"
                >
                    <Image src="/images/svg/apple.svg" alt="apple" width={24} height={24} />
                    <span className="text-[16px] text-black">Sign in with Apple</span>
                </button>
            </div>
            <p className="text-[15px] text-[#8F8F8F] my-[14px]">OR</p>
            <form className="w-full flex flex-col justify-between items-center grow" >
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="peer w-full px-[15px] py-[9px] mb-[14px] outline-none rounded-md border border-[#D1D1D1]"
                />
                <button
                    className="w-full h-[44px] mb-[14px] rounded bg-blue-primary hover:bg-blue-secondary text-white transition-all"
                >
                    Continue
                </button>
                <div className="flex flex-col sm:flex-row items-center justify-center text-blue-primary">
                    <Link className="text-[15px] hover:underline cursor-pointer" href={"/auth/forgotpassword"}>Can&apos;t log in?</Link>
                    <span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
                    <Link className="text-[15px] hover:underline cursor-pointer" href={"/auth/register"}>Sign up for an account</Link>
                </div>
            </form>
        </div>
    )
}