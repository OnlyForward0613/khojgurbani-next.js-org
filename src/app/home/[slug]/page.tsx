import PodMedia from "@/components/ui/PodMedia";
import { getData } from "@/utils/fetch_server";
import Link from "next/link";

export default async function HomeSubPage({ params: { slug } }: { params: { slug: string } }) {

    const pod_media = await getData(`/media/resource-category-podmedia-new/${slug}`);
    const slug_data = pod_media.result;
    const slugInfo = slug_data[0].title.split(" ")[0];

    return (
        <div className="flex flex-col w-full">
            <div className="w-full h-24 sm:h-36 md:h-48 lg:h-64 bg-top bg-cover bg-[url('/Images/Home/nitnem.jpg')]">
                <h1 className="mx-auto max-w-6xl p-4 pt-8 sm:pt-16 md:pt-20 lg:pt-24 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">{slugInfo.title}</h1>
            </div>
            <div className="mx-auto max-w-6xl p-4">
                <div className="my-6 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="">
                        <Link href="/home" className="hover:text-blue-primary hover:underline text-primary text-base inline">
                            Home
                        </Link>
                        <span className=" text-subtitle"> &gt; {slugInfo} </span>
                    </div>
                </div>

                {slug_data.map((item: {
                    created_at: string; id: number; thumbnail: string; title: string; description: string; attachment_name: string
                }) => (
                    <div key={item.id} className="py-4">
                        <PodMedia imgURL={item.thumbnail} title={item.title} description={item.description} query={""} media={item.attachment_name} created_at='' id={item.id} />
                    </div>
                ))}

            </div>
        </div>
    );
}