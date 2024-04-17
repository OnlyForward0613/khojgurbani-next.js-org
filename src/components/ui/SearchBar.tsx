"use client"

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export const SearchBar = () => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const [word, setWord] = useState("");

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        router.push(`/home/podcastlist?${params.toString()}`);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (word.length < 2) {
                toast.warn("You must type more than 1 letter!");
                return;
            }
            handleSearch(word);
        }
    }

    return (
        <div className="relative w-full sm:w-80 mb-[7px] sm:mb-0 h-10">
            <input
                className="w-full rounded-md shadow-common py-2 pl-4 pr-6 text-base outline-none placeholder:text-[#BDBDBD]"
                placeholder="Search Podcast"
                onChange={(e) => setWord(e.target.value)}
                onKeyDown={handleKeyDown}
                minLength={2}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute right-3 top-3 text-line-primary" />
        </div>
    );
}