"use client"

import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export const Ang = ({ currentPage }: { currentPage: string }) => {

    const router = useRouter();

    const page = [];
    let i = 1;
    while (i <= 1430) {
        page.push(<option key={i}>{i}</option>);
        i++;
    }

    function nextPage() {
        if (parseInt(currentPage) < 1430) router.push(`/sriguru/${parseInt(currentPage) + 1}`);
    }

    function prevPage() {
        if (parseInt(currentPage) > 1) router.push(`/sriguru/${parseInt(currentPage) - 1}`);
    }

    return (
        <div className="md:ml-4 flex items-center justify-between w-[240px]">
            <FontAwesomeIcon onClick={prevPage} icon={faAngleLeft} size="2x" className={clsx(parseInt(currentPage) <= 1 ? "text-disable cursor-not-allowed" : "text-black cursor-pointer")} />
            <div className="text-[28px]">
                Ang
            </div>
            <select
                value={currentPage}
                // size={0}
                className='outline-none border border-[#C5C5C5] text-[#42403F] text-sm rounded-[3px] bg-white'
                onChange={(e) => router.push(`/sriguru/${e.target.value}`)}
            >
                {page}
            </select>
            <FontAwesomeIcon onClick={nextPage} icon={faAngleRight} size="2x" className={clsx(parseInt(currentPage) >= 1430 ? "text-disable cursor-not-allowed" : "text-black cursor-pointer")} />
        </div>
    );
}