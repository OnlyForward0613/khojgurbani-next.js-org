"use client"

import React, { useEffect, useMemo, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import keyboardLayout from "@/utils/keyboard_layout";
import { debounce } from "lodash";
import { getData } from "@/utils/fetch_client";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

interface WordDetail {
    ID: number;
    eng_dic_sri: string;
    eng_pos: string;
    engl_proun: string;
    pun_kosh: string;
    pun_mahankosh: string;
    word: string;
}

export const VirtualKeyboard = () => {

    const searchParams = useSearchParams();
    const lang = searchParams.get('lang');
    const query = searchParams.get('value');

    const [word, setWord] = useState<string>(query || "");
    const [language, setLanguage] = useState<string>(lang || "gurmukhi");
    const [layoutName, setLayoutName] = useState<string>("default")
    const [show, setShow] = useState<boolean>(false);
    const [wordList, setWordList] = useState<string[]>();
    const [wordDetail, setWordDetail] = useState<WordDetail>();

    const keyboard = useRef<any>();

    const router = useRouter();

    useEffect(() => {
        if (query) {
            setWord(query);
            setShow(false);
            keyboard.current.setInput(query);
            getData(`/get-dictionary-word-detail?lang=${language}&value=${query}`)
                .then((res) => {
                    setWordDetail(res.data);
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    }, [language, query])

    const debouncedFilter = useMemo(() => debounce((input: string) => {
        if (input) {
            getData(`/get-dictionary-words?lang=${language}&value=${input}`)
                .then((res) => {
                    setWordList(res.data);
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
        else {
            setWordList([]);
        }
    }, 500), [language]); // 500ms debounce time

    const handleShift = () => {
        const newLayoutName = layoutName === "default" ? "shift" : "default";
        setLayoutName(newLayoutName);
    }

    const onInputChange = (input: string) => {
        setWord(input);
        setShow(true);
        keyboard.current.setInput(input);
        debouncedFilter(input);
    }

    const wordClick = async (item: string) => {
        setShow(false);
        router.push(`/dictionary?lang=${language}&value=${item}`);
    }

    const onKeyboardChange = (input: string) => {
        setWord(input);
        setShow(true);
        debouncedFilter(input);
    }

    const onKeyboardKeyPress = (button: string) => {
        if (button === "{shift}" || button === "{lock}") handleShift();
    }

    return (
        <>
            <div className="max-w-2xl px-4 mx-auto mt-12">
                <div className="relative">
                    <input
                        value={word}
                        placeholder={"ਅਕਾਲ..."}
                        onChange={(e) => onInputChange(e.target.value)}
                        className="h-12 pl-8 pr-2 py-2 w-full border border-[#BBBBBB] rounded-full outline-none"
                    />
                    <div className="sm:absolute right-[2px] top-[2px] flex flex-col gap-3 sm:gap-0 mt-3 sm:mt-0 sm:flex-row">
                        <button
                            className={"h-10 sm:h-11 w-full sm:w-auto px-8 text-white text-sm sm:rounded-full outline-none " + (language === 'english' ? "bg-[#58ABDF]" : "bg-[#0C79BE]")}
                            onClick={() => {
                                setLanguage('english');
                            }}
                        >ENGLISH</button>
                        <button
                            className={"h-10 sm:h-11 w-full sm:w-auto px-8 text-white text-sm sm:rounded-full outline-none " + (language === 'gurmukhi' ? "bg-[#58ABDF]" : "bg-[#0C79BE]")}
                            onClick={() => {
                                setLanguage('gurmukhi');
                            }}
                        >GURMUKHI</button>
                    </div>
                </div>
                <div className="flex flex-col my-8">
                    {show &&
                        wordList?.map((item: string) => (
                            <div
                                key={item}
                                className="cursor-pointer hover:bg-gray-100 border-b border-gray-200"
                                onClick={() => wordClick(item)}
                            >
                                {item}
                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-center gap-4 mb-4">
                    <label className="items-center">
                        <input
                            type="radio"
                            className="form-radio"
                            value="gurmukhi"
                            checked={language === 'gurmukhi'}
                            onChange={(e) => {
                                setLanguage(e.target.value);
                            }}
                        />
                        <span className="ml-2">Gurmukhi</span>
                    </label>
                    <label className="items-center">
                        <input
                            type="radio"
                            className="form-radio"
                            value="english"
                            checked={language === 'english'}
                            onChange={(e) => {
                                setLanguage(e.target.value);
                            }}
                        />
                        <span className="ml-2">English Pronunciation</span>
                    </label>
                </div>
                <Keyboard
                    keyboardRef={(r: any) => (keyboard.current = r)}
                    layout={language === 'gurmukhi' ? keyboardLayout.gurmukhi : keyboardLayout.english}
                    layoutName={layoutName}
                    onChange={onKeyboardChange}
                    onKeyPress={onKeyboardKeyPress}
                />

            </div >

            {wordDetail &&
                <div className="max-w-6xl px-4 mx-auto">
                    {wordDetail.pun_mahankosh &&
                        <div className="my-4">
                            <h3 className="text-[26px] text-primary font-bold py-2">Mahan Kosh Encyclopedia</h3>
                            <div className="text-2xl text-primary">{wordDetail.pun_mahankosh}</div>
                        </div>
                    }
                    {wordDetail.pun_kosh &&
                        <div className="my-4">
                            <h3 className="text-[26px] text-primary font-bold py-2">SGGS Gurmukhi-Gurmukhi Dictionary</h3>
                            <div className="text-2xl text-primary">{wordDetail.pun_kosh}</div>
                        </div>
                    }
                    {wordDetail.word &&
                        <div className="my-4">
                            <h3 className="text-[26px] text-primary font-bold py-2">SGGS Gurmukhi-English Dictionary</h3>
                            <div className="text-2xl text-primary">Gurmukhi Pronunciation:{wordDetail.word}</div>
                        </div>
                    }
                    {wordDetail.eng_dic_sri &&
                        <div className="my-4">
                            <div className="text-2xl text-primary">{wordDetail.eng_dic_sri}</div>
                        </div>
                    }
                </div>
            }
        </>
    );
}