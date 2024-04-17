"use client"

import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {

    return (
        <div className="w-[500px] bg-white rounded-lg shadow-double px-[55px] py-[30px] flex flex-col items-center my-[50px]">
            <h2 className="text-[20px] text-[#212529] font-bold mb-[30px]">Register</h2>
            <div className="w-full flex flex-col justify-between items-center grow">
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full Name*"
                    className="peer w-full h-[44px] px-[15px] py-[9px] outline-none rounded-md border border-[#D1D1D1] text-[#919191]"
                />
                <p className="hidden peer-invalid:block text-[12px] text-[#FF0000] w-full text-left">Email must be a valid email address</p>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email*"
                    className="peer w-full h-[44px] px-[15px] py-[9px] outline-none rounded-md border border-[#D1D1D1] text-[#919191]"
                />
                <p className="hidden peer-invalid:block text-[12px] text-[#FF0000] w-full text-left">Email must be a valid email address</p>
                <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="Password*"
                    className="peer w-full h-[44px] px-[15px] py-[9px] outline-none rounded-md border border-[#D1D1D1] text-[#919191]"
                />
                <p className="hidden peer-invalid:block text-[12px] text-[#FF0000] w-full text-left">Email must be a valid email address</p>
                <input
                    type="text"
                    id="confirmpassword"
                    name="confirmpassword"
                    placeholder="Confirm Password*"
                    className="peer w-full h-[44px] px-[15px] py-[9px] outline-none rounded-md border border-[#D1D1D1] text-[#919191]"
                />
                <p className="hidden peer-invalid:block text-[12px] text-[#FF0000] w-full text-left">Email must be a valid email address</p>
                <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    className="peer w-full h-[44px] px-[15px] py-[9px] outline-none rounded-md border border-[#D1D1D1] text-[#919191]"
                />
                <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="State"
                    className="peer w-full h-[44px] px-[15px] py-[9px] outline-none rounded-md border border-[#D1D1D1] text-[#919191]"
                />
                <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Country"
                    className="peer w-full h-[44px] px-[15px] py-[9px] outline-none rounded-md border border-[#D1D1D1] text-[#919191]"
                />
                {/* <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_ID as string}
                    onChange={onChange}
                /> */}
                <button
                    className="w-full h-[44px] rounded bg-blue-primary text-white"
                >
                    Sign Up
                </button>
                <div className="flex justify-center text-blue-primary">
                    <p className="text-[15px] hover:underline cursor-pointer">Can&apos;t log in?</p>
                    <span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
                    <Link className="text-[15px] hover:underline cursor-pointer" href={"/auth/login"}>Sign up for an account</Link>
                </div>
            </div>
        </div>
    )
}