'use client'

import { faCaretDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { debounce } from 'lodash';

export const MultiSelect = ({ list, name, className, mediaForm, it }: { list: any[]; name: string; className: string; mediaForm: FormData; it: string; }) => {

    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [filteredList, setFilteredList] = useState(list);

    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (it === "category") {
            const category: { "cat_id": any; }[] = [];
            selectedItems.forEach((item) => {
                category.push({ "cat_id": item.id });
            });
            mediaForm.set(it, JSON.stringify(category));
        }
        if (it === "sub_category") {
            const sub_category: { "sub_cat_id": any; }[] = [];
            selectedItems.forEach((item) => {
                sub_category.push({ "sub_cat_id": item.id });
            });
            mediaForm.set(it, JSON.stringify(sub_category));
        }
    }, [it, selectedItems, mediaForm])

    function handleClick(id: number) {
        const selected = list.find((item) => item.id === id);
        if (selected) {
            if (selectedItems.some((item) => item.id === id)) {
                setSelectedItems(selectedItems.filter((item) => item.id !== id));
            }
            else {
                setSelectedItems([...selectedItems, selected]);
            }
        }
    }

    const debouncedFilter = debounce((term: string) => {
        const filtered = list.filter((item) =>
            item[name].toString().toLowerCase().includes(term.toLowerCase())
        );
        setFilteredList(filtered);
    }, 300); // 1000ms debounce time

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
                onClick={() => setIsOpen(true)}
                className={clsx(isOpen ? "" : "", "cursor-pointer min-h-9 w-full flex flex-col gap-1 pl-[10px] pr-[20px] py-[7px] border border-gray-secondary rounded outline-none peer")}
            >
                {selectedItems.map((item: any) => (
                    <div key={item.id} className="flex items-center bg-sky-primary rounded overflow-hidden">
                        <FontAwesomeIcon onClick={() => handleClick(item.id)} icon={faXmark} className="p-1" />
                        <span className="p-1 truncate border-l border-sky-secondary">{item[name]}</span>
                    </div>
                ))}
            </div>
            <FontAwesomeIcon icon={faCaretDown} onClick={() => setIsOpen(!isOpen)} className={clsx(isOpen ? "rotate-180" : "", "cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 transition-all text-gray-tertiary peer-hover:text-blue-primary hover:text-blue-primary")} />
            <div
                className={clsx(
                    isOpen ? "block" : "hidden",
                    "absolute z-10 top-full translate-y-1 w-full bg-white flex flex-col overflow-hidden"
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
                                selectedItems.includes(item) ? "font-bold bg-slate-300" : "font-normal",
                                "cursor-pointer hover:bg-slate-200 px-[10px] py-[5px] truncate"
                            )}
                        >
                            {item[name]}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};