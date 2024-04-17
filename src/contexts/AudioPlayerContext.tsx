"use client";

import React, { createContext, useState } from "react";

interface AudioDataProps {
    audioId: number;
    audioTitle: string;
    audioUrl: string;
    isPlaying: boolean;
}

const useAudioState = (initialData: AudioDataProps) => useState<AudioDataProps>(initialData);

export const AudioPlayerContext = createContext<ReturnType<typeof useAudioState> | null>(null);

export const useAudioPlayer = () => {
    const audioData = React.useContext(AudioPlayerContext);
    if (!audioData) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return audioData;
};

const AudioPlayerProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [audioDataProps, setAudioDataProps] = useAudioState({ audioId: 0, audioTitle: "", audioUrl: "", isPlaying: false });

    return (
        <AudioPlayerContext.Provider value={[audioDataProps, setAudioDataProps]}>
            {children}
        </AudioPlayerContext.Provider>
    );
};

export default AudioPlayerProvider;