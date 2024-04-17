'use client'

import Link from "next/link";
import Image from "next/image";
import FeaturedTheme from "./FeaturedTheme";
import { SearchBar } from "@/components/ui/SearchBar";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useRef } from "react";

export const FeaturedThemes = ({ cat_result }: { cat_result: any }) => {

    const swiperRef = useRef<SwiperRef>(null);

    const navigateToNextSlide = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slideNext();
    }, []);

    const navigateToPrevSlide = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slidePrev();
    }, []);

    return (
        <div className="mx-auto max-w-6xl px-4 py-[15px] mb-0 sm:mb-[40px] w-full">
            <div className="mb-[14px] flex sm:flex-row flex-col-reverse items-start sm:items-center justify-between">
                <h2 className="mt-[14px] mb-[7px] text-[26px] font-bold text-primary">Featured Themes</h2>
                <SearchBar />
            </div>
            <div className="hidden md:grid grid-cols-2 gap-8">
                {cat_result.map((item: { id: string; category_image: string; title: string; description: string; }) => (
                    <Link key={item.id} href={`/home/${item.id}`}>
                        <FeaturedTheme
                            imgURL={item.category_image}
                            title={item.title}
                            description={item.description}
                        />
                    </Link>
                ))}
            </div>
            <div className="w-full relative md:hidden">
                <button onClick={() => navigateToPrevSlide()} className="absolute transition-all z-10 left-4 xl:-left-12 top-1/2 -translate-y-1/2 bg-button rounded-full w-8 h-8 flex justify-center items-center">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
                </button>
                <Swiper
                    ref={swiperRef}
                    spaceBetween={10}
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        }
                    }}
                >
                    {cat_result.map((item: { id: number; category_image: string; title: string; }) => {
                        return (
                            <SwiperSlide key={item.id} className="shadow-common">
                                <Image src={item.category_image} width={545} height={300} alt="featured theme" className="aspect-[370/218] w-full" />
                                <p className="text-primary text-sm font-bold p-2">{item.title}</p>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <button onClick={() => navigateToNextSlide()} className="absolute transition-all z-10 right-4 xl:-right-12 top-1/2 -translate-y-1/2 bg-button rounded-full w-8 h-8 flex justify-center items-center">
                    <FontAwesomeIcon icon={faChevronRight} className="text-white" />
                </button>
            </div>
        </div>
    )
}