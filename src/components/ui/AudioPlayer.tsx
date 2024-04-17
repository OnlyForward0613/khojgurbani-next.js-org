'use client'

import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from "react-player";
import { PlayPauseButton } from './PlayPauseButton';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export const AudioPlayer: React.FC = () => {

    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    const playerRef = useRef<ReactPlayer>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [audioDataProps, setAudioDataProps] = useAudioPlayer();

    const [isShow, setIsShow] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);
    const [duration, setDuration] = useState(0);
    const [playedSec, setPlayedSec] = useState(0);
    const [loadedSec, setLoadedSec] = useState(0);

    useEffect(() => {
        if (audioDataProps.audioUrl) {
            setIsLoaded(true);
            setIsShow(true);
            setIsBuffering(true);
            setDuration(0);
            setPlayedSec(0);
            setLoadedSec(0);
        }
    }, [audioDataProps.audioUrl]);

    const onDuration = (duration: number) => {
        setDuration(duration);
    }

    const onReady = () => {
        setIsLoaded(true);
        setIsBuffering(false);
    }

    const onProgress = ({ playedSeconds, loadedSeconds }: { playedSeconds: number, loadedSeconds: number }) => {
        setPlayedSec(playedSeconds);
        setLoadedSec(loadedSeconds);
    }

    const onBuffer = () => {
        setIsBuffering(true);
    }

    const onError = () => {
        toast.error("Error while playing audio");
        setAudioDataProps({ audioId: 0, audioTitle: "", audioUrl: "", isPlaying: false });
        setIsShow(false);
        setIsLoaded(false);
    }

    function convertStoMs(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const extraSeconds = Math.round(seconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(extraSeconds).padStart(2, '0')}`;
    }

    const [isDragging, setIsDragging] = useState(false);

    const handlemouseDown = (e: { clientX: number }) => {
        setIsDragging(true);
        if (playerRef.current && progressRef.current) {
            const rect = progressRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = x / rect.width;
            playerRef.current.seekTo(percent * duration);
        }
    }


    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            if (playerRef.current && progressRef.current) {
                const rect = progressRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = x / rect.width;
                playerRef.current.seekTo(percent * duration);
            }
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false);
    }

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    })

    return (
        <div className={clsx(isShow ? "md:mt-20 mt-28" : "mt-0", "transition-all")}>
            {hasWindow &&
                <ReactPlayer
                    ref={playerRef}
                    url={audioDataProps.audioUrl}
                    playing={audioDataProps.isPlaying}
                    progressInterval={100}
                    controls={false}
                    onDuration={onDuration}
                    onReady={onReady}
                    onProgress={onProgress}
                    onBuffer={onBuffer}
                    onError={onError}
                    className="hidden"
                />
            }

            <button onClick={() => setIsShow(!isShow)}
                className={clsx(isLoaded ? "block" : "hidden", isShow ? 'md:bottom-20 bottom-28' : 'bottom-0',
                    'transition-all fixed right-0 z-50 backdrop-blur-sm w-8 h-8 bg-black/30 p-1 group')}
            >
                <FontAwesomeIcon icon={isShow ? faChevronDown : faChevronUp} className='text-white group-hover:text-blue-primary transition-all' />
            </button>

            <div className={clsx(isShow ? "bottom-0" : "md:-bottom-20 -bottom-28", "fixed left-0 w-full h-28 md:h-20 z-50 bg-white transition-all border-t-2 border-[#607D8B]")}>
                {(duration > 0 && duration != Infinity) ?
                    <div className='flex flex-col-reverse md:flex-row md:gap-4 h-full px-4 py-1 transition-all'>
                        <div className='flex gap-3 items-center justify-center md:justify-between'>
                            <Image className='cursor-pointer' src='/images/svg/backward-15-seconds.svg' alt="backword-15-seconds" width={32} height={32} />
                            {isBuffering ?
                                <Image src='/images/svg/buffering.svg' alt="buffering" width={64} height={64} className='cursor-wait' />
                                :
                                <PlayPauseButton onClick={() => setAudioDataProps({ ...audioDataProps, isPlaying: !audioDataProps.isPlaying })} isPlaying={audioDataProps.isPlaying} isSelected={true} size={2} />
                            }
                            <Image className='cursor-pointer' src='/images/svg/forward-15-seconds.svg' alt="backword-15-seconds" width={32} height={32} />
                        </div>
                        <div className='relative grow'>
                            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full text-center text-nowrap text-clip'>
                                {audioDataProps.audioTitle}
                            </div>
                            <div className='flex h-full grow items-center translate-y-3 md:translate-y-0'>
                                <div className='w-16 text-left'>{convertStoMs(playedSec)}</div>
                                <div ref={progressRef} onMouseDown={handlemouseDown} className='relative grow h-6 group transition-all cursor-pointer'>
                                    <div className='absolute left-0 top-2 w-full h-2 rounded-full bg-gray-primary transition-all'></div>
                                    <div className='absolute left-0 top-2 h-2 rounded-full bg-gray-secondary transition-all' style={{ width: `${loadedSec * 100 / (duration || 1)}%` }} ></div>
                                    <div className='absolute left-0 top-2 h-2 rounded-full bg-blue-primary transition-all' style={{ width: `${playedSec * 100 / (duration || 1)}%` }}></div>
                                </div>
                                <div className='w-16 text-right'>-{convertStoMs(duration - playedSec)}</div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='flex h-full gap-2 items-center justify-center transition-all'>
                        {isBuffering ?
                            <Image src='/images/svg/buffering.svg' alt="buffering" width={64} height={64} className='cursor-wait' />
                            :
                            <PlayPauseButton onClick={() => setAudioDataProps({ ...audioDataProps, isPlaying: !audioDataProps.isPlaying })} isPlaying={audioDataProps.isPlaying} isSelected={true} size={2} />
                        }
                        <div className=''>
                            {audioDataProps.audioTitle}
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}