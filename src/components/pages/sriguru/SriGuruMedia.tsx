'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubAudios } from "./SubAudios";
import { SubVideos } from "./SubVideos";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getData, postData } from "@/utils/fetch_client";
import { toast } from "react-toastify";
import RevalidateSriguru from "../../../actions/Sriguru/RevalidateSriguru";
import { useSession } from "next-auth/react";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";

interface Audio {
    id: number;
    title: string;
    media_approve: number;
    author_name: string;
    attachment_name: string;
    duration: string;
}

interface Video {
    id: number;
    type: string;
    media_approve: number;
    author_name: string;
    attachment_name: string;
}

interface ShabadMedias {
    katha_data: Audio[];
    Santhiya_data: Audio[];
    Kirtan_data: Audio[];
    podcast_media: Audio[];
    Featured_data: Video[];
    Discussion_data: Video[];
}

export const SriGuruMedia = ({ shabadMedias, setAudioOpen, setVideoOpen }: { shabadMedias: ShabadMedias; setAudioOpen: any; setVideoOpen: any }) => {

    const { data: session } = useSession();
    const [audioDataProps, setAudioDataProps] = useAudioPlayer();

    function handleDownload(id: number) {
        console.log("download");
    }

    function handleDelete(id: number) {
        confirm(`Are you sure you want to delete ${id}?`) &&
            getData(`/media/delete-media/${id}`)
                .then((res) => {
                    if (res.success === "200")
                        RevalidateSriguru()
                            .then(() => {
                                toast.success(res.message);
                            })
                })
                .catch((err) => {
                    toast.error(err);
                })
    }

    function handleApprove(id: number) {
        confirm(`Are you sure you want to approve ${id}?`) &&
            postData(`/media/update-approval-status`, { media_id: id, status: 1 })
                .then((res) => {
                    if (res.success === "200")
                        RevalidateSriguru()
                            .then(() => {
                                toast.success(res.message);
                            })
                })
                .catch((err) => {
                    toast.error(err);
                })
    }

    function handleReject(id: number) {
        confirm(`Are you sure you want to reject ${id}?`) &&
            getData(`/media/delete-media/${id}`)
                .then((res) => {
                    if (res.success === "200")
                        RevalidateSriguru()
                            .then(() => {
                                toast.success(res.message);
                            })
                })
                .catch((err) => {
                    toast.error(err);
                })
    }

    return (
        <>
            <div className="mb-[42px] mt-[30px]">
                <h3 className="text-primary text-[26px] font-bold mb-[14px]">Audio</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-[21px]">
                    {shabadMedias?.Santhiya_data.length > 0 &&
                        <div className="flex flex-col items-baseline gap-[14px]">
                            <h4 className="text-[21px] text-title">Santhiya</h4>
                            <SubAudios audios={shabadMedias?.Santhiya_data} handleApprove={handleApprove} handleReject={handleReject} handleDelete={handleDelete} handleDownload={handleDownload} />
                        </div>
                    }
                    {shabadMedias?.Kirtan_data.length > 0 &&
                        <div className="flex flex-col items-baseline gap-[14px]">
                            <h4 className="text-[21px] text-title">Kirtan</h4>
                            <SubAudios audios={shabadMedias?.Kirtan_data} handleApprove={handleApprove} handleReject={handleReject} handleDelete={handleDelete} handleDownload={handleDownload} />
                        </div>
                    }
                    {shabadMedias?.katha_data.length > 0 &&
                        <div className="flex flex-col items-baseline gap-[14px]">
                            <h4 className="text-[21px] text-title">Katha</h4>
                            <SubAudios audios={shabadMedias?.katha_data} handleApprove={handleApprove} handleReject={handleReject} handleDelete={handleDelete} handleDownload={handleDownload} />
                        </div>
                    }
                    {shabadMedias?.podcast_media.length > 0 &&
                        <div className="flex flex-col items-baseline gap-[14px]">
                            <h4 className="text-[21px] text-title">Podcast</h4>
                            <SubAudios audios={shabadMedias?.podcast_media} handleApprove={handleApprove} handleReject={handleReject} handleDelete={handleDelete} handleDownload={handleDownload} />
                        </div>
                    }
                </div>
                {session?.resData.user.role_id >= 2 &&
                    <button onClick={() => setAudioOpen(true)} className="flex gap-1 items-center text-xs px-[24px] py-[8px] text-white bg-blue-primary hover:bg-blue-secondary rounded transition-all">
                        <FontAwesomeIcon icon={faPlus} />
                        <p>Add Audio</p>
                    </button>
                }
            </div>
            <div className="mb-[42px]">
                <h3 className="text-primary text-[26px] font-bold mb-[14px]">Video</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[21px]">
                    {shabadMedias?.Discussion_data.length > 0 &&
                        <div className="flex flex-col items-baseline relative">
                            <h4 className="text-[21px] text-title mb-[14px]">Discussion Video</h4>
                            <SubVideos videos={shabadMedias?.Discussion_data} handleApprove={handleApprove} handleReject={handleReject} handleDelete={handleDelete} />
                        </div>
                    }
                    {shabadMedias?.Featured_data.length > 0 &&
                        <div className="flex flex-col items-baseline relative">
                            <h4 className="text-[21px] text-title mb-[14px]">Featured Video</h4>
                            <SubVideos videos={shabadMedias?.Featured_data} handleApprove={handleApprove} handleReject={handleReject} handleDelete={handleDelete} />
                        </div>
                    }
                </div>
                {session?.resData.user.role_id >= 2 &&
                    <button onClick={() => setVideoOpen(true)} className="flex gap-1 items-center text-xs px-[24px] py-[8px] text-white bg-blue-primary hover:bg-blue-secondary rounded transition-all">
                        <FontAwesomeIcon icon={faPlus} />
                        <p>Add Video</p>
                    </button>
                }
            </div>
        </>
    );
};