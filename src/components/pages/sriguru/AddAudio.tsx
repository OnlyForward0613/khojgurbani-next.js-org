'use client'

import { MultiSelect } from "@/components/ui/MultiSelect";
import { Select } from "@/components/ui/Select";
import { useMediaData } from "@/contexts/MediaDataContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import { toast } from "react-toastify";
import RevalidateSriguru from "../../../actions/Sriguru/RevalidateSriguru";
import Image from "next/image";

export const AddAudio = ({ audioOpen, setAudioOpen, mediaForm }: { audioOpen: boolean; setAudioOpen: any; mediaForm: FormData; }) => {

    mediaForm.set('user_id', '15453');
    mediaForm.set('attachment_name', '');
    mediaForm.set('title', '');
    mediaForm.set("author_id", "1");
    mediaForm.set('type', '');
    mediaForm.set("type", "AUDIO");
    mediaForm.set('youtube_url', '');
    mediaForm.set('podbean_url', '');
    mediaForm.set('category', '');
    mediaForm.set('new_category', '');
    mediaForm.set('sub_category', '');
    mediaForm.set("tag_id", "1");
    mediaForm.set('duration', '');
    mediaForm.set('shabad_id', '1');

    const mediaData = useMediaData();

    const types = [{ id: 0, name: "S3" }, { id: 1, name: "Audio" }, { id: 2, name: "External URL" }];

    const [fileName, setFileName] = useState<string>("Choose audio file");
    const [fileTitle, setFileTitle] = useState<string>("");
    const [fileDuration, setFileDuration] = useState<string>("0");

    useEffect(() => {
        if (fileTitle) {
            mediaForm.set('title', fileTitle);
        }
    }, [mediaForm, fileTitle]);

    const handleAudioFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value.split('\\').findLast((item) => item !== "") || "Choose audio file");
        setFileTitle(e.target.value.split('\\').findLast((item) => item !== "")?.split('.').slice(0, -1).join("") || "");

        const file = e.target.files?.[0];
        if (file) {
            mediaForm.set('attachment_name', file);
            const audio = new Audio();
            audio.src = URL.createObjectURL(file);

            audio.onloadedmetadata = () => {
                const totalSeconds = Math.floor(audio.duration);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                const formattedDuration = totalSeconds < 60 ? `${seconds.toString()}` : `${minutes.toString()}:${seconds.toString()}`;
                setFileDuration(formattedDuration);

                console.log(fileTitle);
                mediaForm.set('duration', formattedDuration);
            }

        };
    }

    function handleClose() {
        setAudioOpen(false);
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
                RevalidateSriguru();
                setTimeout(() => {
                    toast.info(res.data.message);
                    setAudioOpen(false);
                    setOnProgress(false);
                    setProgress(0);
                }, 2000);
            })
            .catch(error => {
                toast.error(error)
                setOnProgress(false);
            });
    }

    return (
        audioOpen ?
            <>
                <div className="fixed z-30 top-0 left-0 w-full min-h-screen bg-black bg-opacity-70 overflow-y-auto flex justify-center items-top" >

                    <div className="w-[500px] flex flex-col mt-10">
                        <h4 className="text-[21px] leading-[1.5] text-white p-[14px] bg-main rounded-t-md">Add audio</h4>
                        <div className="text-sm p-[14px] bg-white text-primary flex flex-col">
                            <form className="">
                                <label htmlFor="type" className="">Select Source</label>
                                <Select list={types} name={"name"} initial={1} className="mb-6 w-full" mediaForm={mediaForm} it={"type"} val={"name"} />
                                <label htmlFor="fileInput" className="">
                                    <div className="mb-6 flex justify-between border border-gray-secondary rounded overflow-hidden">
                                        <div className="bg-white px-[10px] py-[5px]">{fileName}</div>
                                        <div className="bg-gray-primary hover:bg-gray-tertiary px-[10px] py-[5px] border-l border-gray-secondary">Browse</div>
                                    </div>
                                    <input onChange={handleAudioFile} type="file" id="fileInput" name="fileInput" className="hidden" accept="" />
                                </label>
                                <div className="flex justify-between w-full">
                                    <div className="flex flex-col">
                                        <label htmlFor="duration" className="">Duration (sec)</label>
                                        <input type="text" readOnly id="duration" name="duration" value={fileDuration} className="mb-6  px-[10px] py-[5px] border border-gray-secondary rounded outline-none" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="shabad_id" className="">Shabad</label>
                                        <Select list={mediaData.shabadListData} name={"id"} initial={1} className="w-56" mediaForm={mediaForm} it={"shabad_id"} val={"id"} />
                                        <Link href={`/sriguru/shabad/1`} className="text-blue-primary text-sm hover:underline">Find Shabad Id</Link>
                                    </div>
                                </div>
                                <label htmlFor="author_id" className="">
                                    <Select list={mediaData.authorListData} name={"name"} initial={1} className="my-6 w-full" mediaForm={mediaForm} it={"author_id"} val={"id"} />
                                </label>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="title" className="">Title</label>
                                    <input onChange={(e) => setFileTitle(e.target.value)} type="text" id="title" name="title" value={fileTitle} className="mb-6  px-[10px] py-[5px] border border-gray-secondary rounded outline-none" />
                                </div>
                                <label htmlFor="tag_id" className="">Select shabad_id</label>
                                <Select list={mediaData.tagListData} name={"name"} initial={1} className="mb-6 w-full" mediaForm={mediaForm} it={"tag_id"} val={"id"} />
                                <div className="flex justify-between w-full">
                                    <div className="flex flex-col">
                                        <label htmlFor="category" className="">Select Categories</label>
                                        <MultiSelect list={mediaData.resourceListData} name={"name"} className="mb-6 w-56" mediaForm={mediaForm} it={"category"} />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="sub_category" className="">Select Sub Categories</label>
                                        <MultiSelect list={mediaData.subCategoryListData} name={"name"} className="mb-6 w-56" mediaForm={mediaForm} it={"sub_category"} />
                                    </div>
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