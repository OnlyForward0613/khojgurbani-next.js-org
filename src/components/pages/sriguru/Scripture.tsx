'use client'

import { getData } from "@/utils/fetch_client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface DicData {
    ID: number;
    eng_dic_sri: string;
    eng_pos: string;
    engl_proun: string;
    pun_kosh: string;
    pun_mahankosh: string;
    word: string;
}

export const Scripture = ({ scripture, setting }: { scripture: any; setting: any; }) => {

    const [dicData, setDicData] = useState<DicData>();
    const [dicOpen, setDicOpen] = useState(false);
    const [dicLoading, setDicLoading] = useState(true);

    const [wordPosition, setWordPosition] = useState({ x: 0, y: 0 });

    const router = useRouter();

    function handleWordClick(event: any) {
        const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = event.target;
        setWordPosition({ x: offsetLeft + offsetWidth / 2, y: offsetTop + offsetHeight });
        const word = event.target.innerText.trim();
        const searchParam = new URLSearchParams();
        searchParam.append('lang', 'gurmukhi');
        searchParam.append('value', word);
        setDicOpen(true);
        setDicLoading(true);
        getData(`/get-dictionary-word-detail?${searchParam}`)
            .then((data) => {
                if (data.status === "success") {
                    setDicData(data.data);
                    setDicLoading(false);
                }
                else {
                    toast.error(data.message);
                    setDicOpen(false);
                }
            })
            .catch((error) => {
                toast.error(error);
                setDicOpen(false);
            })
    }

    return (
        <div
            className="mt-4"
        >
            <h3 className="text-[26px] md:text-[32px] leading-[1.5] text-black font-bold sm:font-normal flex flex-wrap">
                {scripture.Scripture.split(' ').map((word: string, index: number) =>
                    <span key={index} className="cursor-help hover:bg-[#F4E5A8]" onClick={handleWordClick}>
                        {word}&nbsp;
                    </span>
                )}
                {dicOpen &&
                    (dicLoading ?
                        <>
                            <div style={{ left: `${wordPosition.x - 80 > 0 ? wordPosition.x - 80 : 0}px`, top: `${wordPosition.y}px` }} className={`absolute mx-4 rounded-md shadow-common z-10 p-[14px] bg-main/90`}>
                                <Image src='/images/loading/loadingwhite.svg' width={100} height={100} alt="loading..." />
                            </div>
                            <div style={{ left: `${wordPosition.x}px`, top: `${wordPosition.y - 7}px` }} className="absolute -translate-x-1/2 z-10 border-transparent border-r-8 border-l-8 border-b-8 border-b-main"></div>
                        </>
                        :
                        <>
                            <div id="popup" style={{ left: `${wordPosition.x - 330 > 0 ? wordPosition.x - 330 : 0}px`, top: `${wordPosition.y}px` }} className={`absolute mx-4 max-w-[600px] rounded-md shadow-common z-10 p-[14px] bg-main text-white flex flex-col`}>
                                <h5 className="text-2xl font-bold">{dicData?.word}</h5>
                                {dicData?.pun_mahankosh &&
                                    <div className="text-base mb-[10px]">
                                        <p className="">Mahan Kosh Encyclopedia</p>
                                        <p className="">{dicData?.pun_mahankosh}</p>
                                    </div>
                                }
                                {dicData?.pun_kosh &&
                                    <div className="text-base mb-[10px]">
                                        <p className="">SGGS Gurmukhi-Gurmukhi Dictionary</p>
                                        <p className="">{dicData?.pun_kosh}</p>
                                    </div>
                                }
                                {dicData?.eng_dic_sri &&
                                    <div className="text-base mb-[10px]">
                                        <p className="">SGGS Gurmukhi-English Dictionary</p>
                                        <p className="">{dicData?.eng_dic_sri}</p>
                                    </div>
                                }
                                <div className="flex justify-end">
                                    <button onClick={() => setDicOpen(false)} className="px-[10px] py-[5px] hover:bg-white/20 text-sm rounded-sm transition-all text-white">Close</button>
                                    <button onClick={() => router.push(`/dictionary?lang=gurmukhi&value=${dicData?.word}`)} className="px-[10px] py-[5px] ml-[18px] bg-blue-primary hover:bg-blue-secondary text-sm text-white rounded-sm transition-all">View</button>
                                    <button className="px-[10px] py-[5px] ml-[18px] bg-blue-primary hover:bg-blue-secondary text-sm text-white rounded-sm transition-all">Search</button>
                                </div>
                            </div>
                            <div style={{ left: `${wordPosition.x}px`, top: `${wordPosition.y - 7}px` }} className="absolute -translate-x-1/2 z-10 border-transparent border-r-8 border-l-8 border-b-8 border-b-main"></div>
                        </>
                    )
                }
            </h3>
            {setting.option1 &&
                <p className="text-[22px] leading-[1.3] text-[#212529]">
                    {scripture.ScriptureOriginal}
                </p>
            }
            {setting.option2 &&
                <p className="text-[18px] md:text-[20px] leading-[1.3] text-[#212529]">
                    {scripture.ScriptureRoman}
                </p>
            }
            {scripture.translation.KhojgurbaaniEnglish && setting.option3 &&
                <div className="flex gap-2 leading-[1.7]">
                    <div className="text-[20px] font-bold text-blue-primary">KG</div>
                    <div className="text-[20px] text-[#212529]">{scripture.translation.KhojgurbaaniEnglish}</div>
                </div>
            }
            {scripture.translation.ManmohanSinghEnglish && setting.option4 &&
                <div className="flex gap-2 leading-[1.7]">
                    <div className="text-[20px] font-bold text-blue-primary">MS</div>
                    <div className="text-[20px] text-[#212529]">{scripture.translation.ManmohanSinghEnglish}</div>
                </div>
            }
            {scripture.translation.SantSinghKhalsaEnglish && setting.option5 &&
                <div className="flex gap-2 leading-[1.7]">
                    <div className="text-[20px] font-bold text-blue-primary">SK</div>
                    <div className="text-[20px] text-[#212529]">{scripture.translation.SantSinghKhalsaEnglish}</div>
                </div>
            }
            {scripture.translation.HarbansSinghPunjabi && setting.option6 &&
                <div className="flex gap-2 leading-[1.7]">
                    <div className="text-[20px] font-bold text-blue-primary">HS</div>
                    <div className="text-[22px] text-[#212529]">{scripture.translation.HarbansSinghPunjabi}</div>
                </div>
            }
            {scripture.translation.ManmohanSinghPunjabi && setting.option7 &&
                <div className="flex gap-2 leading-[1.7]">
                    <div className="text-[20px] font-bold text-blue-primary">MS</div>
                    <div className="text-[22px] text-[#212529]">{scripture.translation.ManmohanSinghPunjabi}</div>
                </div>
            }
            {scripture.translation.SahibSinghPunjabi && setting.option8 &&
                <div className="flex gap-2 leading-[1.7]">
                    <div className="text-[20px] font-bold text-blue-primary">SS</div>
                    <div className="text-[22px] text-[#212529]">{scripture.translation.SahibSinghPunjabi}</div>
                </div>
            }
        </div>
    )
}