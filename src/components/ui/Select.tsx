'use client'

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { debounce } from 'lodash';

export const Select = ({ list, name, initial, className, mediaForm, it, val }: { list: any[]; name: string; initial: number; className: string; mediaForm: FormData; it: string; val: string }) => {

    const [selectedItem, setSelectedItem] = useState(list.find((item) => item.id === initial) || list[0] || {});
    const [isOpen, setIsOpen] = useState(false);
    const [filteredList, setFilteredList] = useState(list);

    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);

    function handleClick(id: number) {
        const selected = list.find((item) => item.id === id);
        if (selected) {
            setSelectedItem(selected);
            mediaForm.set(it, selected[val]);
        }
        setIsOpen(false);
        setFilteredList(list);
    }

    const debouncedFilter = debounce((term: string) => {
        const filtered = list.filter((item) =>
            item[name].toString().toLowerCase().includes(term.toLowerCase())
        );
        setFilteredList(filtered);
    }, 300); // 300ms debounce time

    function handleChange(term: string) {
        debouncedFilter(term);
    }

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
        else if (!isOpen && inputRef.current) {
            inputRef.current.value = '';
            setFilteredList(list);
        }
    }, [isOpen, list]);

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={selectRef} className={clsx(className, "relative text-sm")}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer w-full pl-[10px] pr-[20px] py-[7px] border border-gray-secondary rounded outline-none truncate peer"
            >
                {selectedItem[name]}
            </div>
            <FontAwesomeIcon icon={faCaretDown} onClick={() => setIsOpen(!isOpen)} className={clsx(isOpen ? "rotate-180" : "", "cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 transition-all text-gray-tertiary peer-hover:text-blue-primary hover:text-blue-primary")} />
            <div
                className={clsx(
                    isOpen ? "block" : "hidden",
                    "absolute z-10 top-10 w-full bg-white flex flex-col overflow-hidden"
                )}
            >
                <input
                    ref={inputRef}
                    type="text"
                    spellCheck={false}
                    onChange={(e) => handleChange(e.target.value)}
                    className="px-[10px] py-[5px] border border-gray-secondary rounded-md outline-none"
                />
                <div className={clsx(filteredList.length >= 5 ? "h-[182px]" : `h-[${filteredList.length * 30 + 2}px]`, "mt-1 bg-white border border-gray-secondary overflow-y-scroll")}>
                    {filteredList.map((item: any) => (
                        <div
                            key={item.id}
                            onClick={() => handleClick(item.id)}
                            className={clsx(
                                item === selectedItem ? "font-bold bg-slate-300" : "font-normal",
                                "cursor-pointer hover:bg-slate-200 px-[10px] py-[5px] truncate"
                            )}
                        >
                            {item[name]}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};