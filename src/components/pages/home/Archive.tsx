'use client'

import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import 'swiper/css';
import { date_transform } from "@/utils/date_transform"
import { useAudioPlayer } from "@/contexts/AudioPlayerContext"

interface ArchiveProps {
    id: number,
    title: string,
    attachment_name: string,
    thumbnail: string,
    created_at: string
}

export const Archive = ({ archive }: { archive: ArchiveProps[] }) => {

    const [, setAudioDataProps] = useAudioPlayer();

    const swiperRef = useRef<SwiperRef>(null);

    const navigateToNextSlide = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slideNext();
    }, []);

    const navigateToPrevSlide = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slidePrev();
    }, []);

    const handleClick = (item: ArchiveProps) => {
        setAudioDataProps({
            audioId: item.id,
            audioTitle: item.title,
            audioUrl: item.attachment_name,
            isPlaying: true
        })
    }

    return (
        <div className="max-w-6xl px-4 py-[15px] mx-auto w-full">
            <h2 className="text-[26px] lg:bg-white font-bold mb-4 text-primary">Archive</h2>
            <div className="w-full relative">
                <button onClick={navigateToPrevSlide} className="absolute transition-all z-10 left-4 xl:-left-12 top-1/2 -translate-y-1/2 bg-button rounded-full w-8 h-8 flex justify-center items-center">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
                </button>
                <Swiper
                    ref={swiperRef}
                    spaceBetween={10}
                    slidesPerView={1}
                    breakpoints={{
                        1024: {
                            slidesPerView: 4,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        640: {
                            slidesPerView: 2,
                        }
                    }}
                >
                    {archive.map((item: ArchiveProps) => {
                        return (
                            <SwiperSlide key={item.id} onClick={() => handleClick(item)} className="group cursor-pointer">
                                <Image src={"https://apiprod.khojgurbani.org/uploads/thumbnail/" + item.thumbnail} width={345} height={232} alt="archive" className="aspect-[370/218] md:aspect-auto w-full" />
                                <div className="flex justify-between items-baseline mt-[10px]">
                                    <p className="text-primary text-sm font-bold group-hover:text-blue-primary">{item.title}</p>
                                    <p className="text-line-primary text-xs font-bold">{date_transform(item.created_at)}</p>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <button onClick={navigateToNextSlide} className="absolute transition-all z-10 right-4 xl:-right-12 top-1/2 -translate-y-1/2 bg-button rounded-full w-8 h-8 flex justify-center items-center">
                    <FontAwesomeIcon icon={faChevronRight} className="text-white" />
                </button>
            </div>
        </div>
    )
}