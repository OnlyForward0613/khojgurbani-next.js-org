"use client";
import React, { createContext } from "react";

interface MediaData {
    authorListData: any[];
    tagListData: any[];
    resourceListData: any[];
    subCategoryListData: any[];
    shabadListData: any[];
}

export const MediaDataContext = createContext<MediaData | null>(null);

export const useMediaData = () => {
    const mediaData = React.useContext(MediaDataContext);
    if (!mediaData) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return mediaData;
};

const MediaDataProvider = ({
    mediaData,
    children,
}: {
    mediaData: MediaData;
    children: React.ReactNode;
}) => {

    return (
        <MediaDataContext.Provider value={mediaData}>
            {children}
        </MediaDataContext.Provider>
    );
};

export default MediaDataProvider;