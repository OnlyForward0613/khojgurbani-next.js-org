'use client'

import clsx from "clsx";
import Link from "next/link";

export const Pagination = ({pages, currentRoute, currentItem} :{pages: string[]; currentRoute: string; currentItem: string}) => {
    return (
        <div className="bg-main flex items-center gap-6 w-full h-[70px] px-4 rounded-md">
            <p className="text-[16px] text-white">SABAD</p>
            <div className="flex gap-2">
                {pages.map((page: string) => (
                    <Link
                        key={page}
                        href={`/sriguru/${currentRoute}/${page}`}
                        className={clsx(
                            "cursor-pointer w-8 h-8 rounded-full text-[11px] text-white hover:underline flex items-center justify-center",
                            {
                                "bg-[#0B79BE]": currentItem === page.toString(),
                                "bg-[#2E596F]": currentItem != page.toString(),
                            }
                        )}
                    >
                        {page}
                    </Link>
                ))}
            </div>
        </div>
    );
}