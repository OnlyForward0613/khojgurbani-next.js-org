'use client'

import { Select } from "@/components/ui/Select";
import { useMediaData } from "@/contexts/MediaDataContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import { toast } from "react-toastify";
import RevalidateSriguru from "../../../actions/Sriguru/RevalidateSriguru";
import Image from "next/image";

export const AddVideo = ({ videoOpen, setVideoOpen, mediaForm }: { videoOpen: boolean; setVideoOpen: any; mediaForm: FormData; }) => {

    function initMediaForm() {
        mediaForm.set('user_id', '15453');
        mediaForm.set('attachment_name', '');
        mediaForm.set('title', '');
        mediaForm.set('author_id', '1');
        mediaForm.set('type', 'YOUTUBE');
        mediaForm.set('youtube_url', '');
        mediaForm.set('podbean_url', '');
        mediaForm.set('category', '');
        mediaForm.set('new_category', '');
        mediaForm.set('sub_category', '');
        mediaForm.set('tag_id', '6');
        mediaForm.set('duration', '');
        mediaForm.set('shabad_id', '1');
    }

    useEffect(() => {
        initMediaForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoOpen])

    const mediaData = useMediaData();

    const [fileUrl, setFileUrl] = useState<string>("");
    const [fileTitle, setFileTitle] = useState<string>("");
    const [fileDuration, setFileDuration] = useState<string>("0");

    useEffect(() => {
        if (fileTitle) {
            mediaForm.set('title', fileTitle);
        }
    }, [mediaForm, fileTitle]);

    function handleUrl(url: string) {
        const newUrl = getYoutubeEmbedUrl(url);
        setFileUrl(newUrl);
        mediaForm.set('youtube_url', newUrl);
        setFileTitle(newUrl.split('/').findLast((item) => item !== "") || "");
    }

    function handleClose() {
        setVideoOpen(false);
    }

    const [onProgress, setOnProgress] = useState(false);
    const [progress, setProgress] = useState(0);

    function handleAdd() {

        setOnProgress(true);
        const config: AxiosRequestConfig = {
            onUploadProgress: progressEvent => {
                if (progressEvent.total !== null && progressEvent.total !== undefined) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                    // Update your UI with the upload progress percentage
                }
            }

        };

        axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/media/add', mediaForm, config)
            .then(res => {
                RevalidateSriguru()
                    .then(() => {
                        setTimeout(() => {
                            toast.info(res.data.message);
                            setVideoOpen(false);
                            setOnProgress(false);
                            setProgress(0);
                            initMediaForm();
                        }, 2000);
                    });
            })
            .catch(error => {
                toast.error(error)
                setOnProgress(false);
            });
    }

    function getYoutubeEmbedUrl(url: string) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        const videoId = (match && match[7].length == 11) ? match[7] : null;

        if (videoId) {
            return "https://www.youtube.com/embed/" + videoId;
        } else {
            return url;
        }
    }

    return (
        videoOpen ?
            <>
                <div className="fixed z-30 top-0 left-0 w-full min-h-screen bg-black bg-opacity-70 overflow-y-auto flex justify-center items-top" >

                    <div className="w-[500px] flex flex-col mt-10">
                        <h4 className="text-[21px] leading-[1.5] text-white p-[14px] bg-main rounded-t-md">Add video</h4>
                        <div className="text-sm p-[14px] bg-white text-primary flex flex-col">
                            <form className="">
                                <div className="flex justify-between w-full">
                                    <div className="flex flex-col">
                                        <label htmlFor="duration" className="">Duration (sec)</label>
                                        <input type="text" readOnly id="duration" name="duration" value={fileDuration} className="mb-6 px-[14px] py-[7px] border border-gray-secondary rounded outline-none" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="shabad_id" className="">Shabad</label>
                                        <Select list={mediaData.shabadListData} name={"id"} initial={1} className="w-56" mediaForm={mediaForm} it={"shabad_id"} val={"id"} />
                                        <Link href={`/sriguru/shabad/1`} className="text-blue-primary text-sm hover:underline">Find Shabad Id</Link>
                                    </div>
                                </div>
                                <label htmlFor="youtube_url" className="flex flex-col w-full">
                                    <input onChange={(e) => handleUrl(e.target.value)} type="text" id="youtube_url" name="youtube_url"
                                        value={fileUrl} placeholder="Enter Youtube URL" className="mb-6 px-[14px] py-[7px] border border-gray-secondary rounded outline-none" />
                                </label>
                                <label htmlFor="tag_id" className="">Select Video Type</label>
                                <Select list={mediaData.tagListData.filter((tag) => tag.id === 5 || tag.id === 6)} name={"name"} initial={1} className="mb-6 w-full" mediaForm={mediaForm} it={"tag_id"} val={"id"} />
                                <div className="flex flex-col w-full">
                                    <label htmlFor="title" className="">Title</label>
                                    <input onChange={(e) => setFileTitle(e.target.value)} type="text" id="title" name="title" value={fileTitle} className="mb-6 px-[14px] py-[7px] border border-gray-secondary rounded outline-none" />
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end items-center bg-white p-[14px] border-t rounded-b-md">
                            <button className="px-[10px] py-[5px] hover:bg-slate-200 text-sm rounded-sm transition-all"
                                onClick={handleClose}>
                                Close
                            </button>
                            <button className="px-[10px] py-[5px] ml-[18px] bg-blue-primary hover:bg-blue-secondary text-sm text-white rounded-sm transition-all"
                                onClick={handleAdd}>
                                Add
                            </button>

                        </div>
                    </div>
                </div>
                {
                    onProgress ?
                        <div className="fixed z-40 top-0 left-0 w-full min-h-screen bg-black bg-opacity-70 overflow-y-auto flex justify-center items-center" >
                            <div className="bg-white flex flex-col relative rounded-md overflow-hidden">
                                <Image src='/images/loading/loading.gif' width={100} height={100} alt="loading..." />
                                <div className="absolute bg-transparent w-[100px] h-[100px] top-0 left-0 flex justify-center items-center"><span>{progress}%</span></div>
                            </div>
                        </div>
                        :
                        <></>
                }

            </>
            : <></>
    )
}