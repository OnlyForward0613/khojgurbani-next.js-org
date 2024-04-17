'use client'

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tinos } from "next/font/google";

const tinos = Tinos({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: 'swap',
});

export const CommentaryList = ({ commentaryList }: { commentaryList: any }) => {
    if (commentaryList.result[0]) {
        return (
            <div className="mt-[35px]">
                <h3 className="text-[26px] text-primary font-bold mb-[16px]">Commentary</h3>
                <div className="h-[335px] py-[23px] px-[15px] shadow-common flex flex-col">
                    <div
                        dangerouslySetInnerHTML={{ __html: commentaryList.result[0]?.commentary }}
                        className={`${tinos.className} text-[20px] !font-medium h-full overflow-hidden [&_h3]:text-primary [&_h3]:mb-[10px] [&_p]:text-commentary [&_p]:mb-[14px] mb-[14px]`}
                    />
                    <div className="flex justify-end">
                        <button className="cursor-pointer flex bg-blue-primary hover:bg-blue-secondary items-center text-white px-[20px] py-[5px] text-[12px] gap-2 rounded transition-all">
                            Read more
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}