'use client'

import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useCallback, useRef } from "react"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import 'swiper/css';
import { useAudioPlayer } from "@/contexts/AudioPlayerContext"
import { Autoplay } from "swiper/modules"

interface Featured_Podcast {
    id: number,
    title: string,
    media: string,
    thumbnail: string
}

export const FeaturedPodcasts = ({ featured_podcasts }: { featured_podcasts: Featured_Podcast[] }) => {

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

    const handleClick = (item: Featured_Podcast) => {
        setAudioDataProps({
            audioId: item.id,
            audioTitle: item.title,
            audioUrl: item.media,
            isPlaying: true
        })
    }

    return (
        <div className="w-full md:py-16 bg-left-top bg-cover md:bg-[url('/images/home/homebottom.png')]">
            <div className="max-w-6xl px-4 mx-auto">
                <h2 className="text-[26px] font-bold mb-4 text-primary md:text-white">Featured Podcasts</h2>
                <div className="w-full relative">
                    <button onClick={navigateToPrevSlide} className="absolute transition-all z-10 left-4 xl:-left-12 top-1/2 -translate-y-1/2 bg-button rounded-full w-8 h-8 flex justify-center items-center">
                        <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
                    </button>
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={10}
                        slidesPerView={1}
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                            },
                            640: {
                                slidesPerView: 2,
                            }
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        speed={500}
                        loop={true}
                        modules={[Autoplay]}
                    >
                        {featured_podcasts.map((item: Featured_Podcast) => {
                            return (
                                <SwiperSlide key={item.id} onClick={() => handleClick(item)} className="cursor-pointer">
                                    <Image src={item.thumbnail} width={571} height={382} alt="featured podcast" className="aspect-[370/218] md:aspect-auto w-full" />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <button onClick={navigateToNextSlide} className="absolute transition-all z-10 right-4 xl:-right-12 top-1/2 -translate-y-1/2 bg-button rounded-full w-8 h-8 flex justify-center items-center">
                        <FontAwesomeIcon icon={faChevronRight} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}