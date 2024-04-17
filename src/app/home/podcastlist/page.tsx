import PodMedia from "@/components/ui/PodMedia";
import { SearchBar } from "@/components/ui/SearchBar";
import { getData } from "@/utils/fetch_server";
import Link from "next/link";

export default async function PodcastlistPage({
    searchParams,
}: {
    searchParams: {
        query: string;
        page: string;
    };
}) {

    const searchResult = await getData(`/media/podcast-list?search=${searchParams.query}`).then((data) => data.result);

    return (
        <div className="flex flex-col w-full">
            <div className="w-full h-24 sm:h-36 md:h-48 lg:h-64 bg-top bg-cover bg-[url('/images/home/nitnem.jpg')]">
                <h1 className="mx-auto max-w-6xl p-4 pt-8 sm:pt-16 md:pt-20 lg:pt-24 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">{searchParams.query}</h1>
            </div>
            <div className="mx-auto max-w-6xl p-4 w-full">
                <div className="my-6 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="">
                        <Link href="/home">
                            <div className="hover:text-blue-primary hover:underline text-primary inline">
                                Home
                            </div>
                        </Link>
                        <span className=" text-subtitle"> &gt; Search </span>
                    </div>
                    <SearchBar />
                </div>
                {
                    searchResult.length === 0 &&
                    <h1 className="text-base text-primary text-center">No Result Found</h1>
                }
                {searchResult.map((item: { id: number; thumbnail_pod: string; title: string; description: string; attachment_name: string }) => (
                    <div key={item.id} className="py-4">
                        <PodMedia id={item.id} imgURL={item.thumbnail_pod} title={item.title} description={item.description} query={searchParams.query} media={item.attachment_name} created_at='' />
                    </div>
                ))}
            </div>
        </div>
    )
}