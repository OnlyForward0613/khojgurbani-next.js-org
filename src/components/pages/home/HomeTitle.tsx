'use client'

import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const HomeTitle_1 = ({ podcast_index }: { podcast_index: any }) => {

    const [, setAudioDataProps] = useAudioPlayer();

    const handleEnglish = () => {
        setAudioDataProps({
            audioId: podcast_index.id,
            audioTitle: podcast_index.title,
            audioUrl: podcast_index.englishPodcastSrc,
            isPlaying: true
        })
    }

    const handlePujabi = () => {
        setAudioDataProps({
            audioId: podcast_index.id,
            audioTitle: podcast_index.title,
            audioUrl: podcast_index.punjabiPodcardSrc,
            isPlaying: true
        })
    }

    return (
        <div className="mt-[21px] flex gap-4 items-center">
            <button
                onClick={handleEnglish}
                className="text-sm text-white px-6 py-1 rounded-lg border border-line-primary bg-blue-primary hover:bg-blue-secondary transition-all"
            >
                English - ਅੰਗਰੇਜ਼ੀ
            </button>
            <button
                onClick={handlePujabi}
                className="text-sm text-white px-6 py-1 rounded-lg border border-line-primary bg-primary hover:bg-secondary transition-all"
            >
                Punjabi- ਪੰਜਾਬੀ
            </button>
            <FontAwesomeIcon icon={faCircleInfo} className="text-line-primary" />
        </div>
    )
}

export const HomeTitle_2 = ({ podcast_index }: { podcast_index: any }) => {

    const [, setAudioDataProps] = useAudioPlayer();

    const handleEnglish = () => {
        setAudioDataProps({
            audioId: podcast_index.id,
            audioTitle: podcast_index.title,
            audioUrl: podcast_index.englishPodcastSrc,
            isPlaying: true
        })
    }

    const handlePujabi = () => {
        setAudioDataProps({
            audioId: podcast_index.id,
            audioTitle: podcast_index.title,
            audioUrl: podcast_index.punjabiPodcardSrc,
            isPlaying: true
        })
    }

    return (
        <div className="flex gap-1 items-center">
            <button
                onClick={handleEnglish}
                className="text-sm text-white px-[10px] py-[5px] rounded-full border border-line-primary bg-blue-primary hover:bg-blue-secondary transition-all"
            >
                English
            </button>
            <button
                onClick={handlePujabi}
                className="text-sm text-white px-[10px] py-[5px] rounded-full border border-line-primary bg-primary hover:bg-secondary transition-all"
            >
                Punjabi
            </button>
        </div>
    )
}
