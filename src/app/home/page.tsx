import { Archive } from "@/components/pages/home/Archive";
import { Banner } from "@/components/pages/home/Banner";
import { FeaturedPodcasts } from "@/components/pages/home/FeaturedPodcasts";
import { FeaturedThemes } from "@/components/pages/home/FeaturedThemes";
import { Subscribe } from "@/components/pages/home/Subscribe";
import { Welcome } from "@/components/pages/home/Welcome";
import { getData } from "@/utils/fetch_server";

export default async function Home() {

    const podcast_index = await getData("/media/podcast-index?time=1234567890");
    const podcast_listing = await getData("/featured-api/podcast-listing");
    const archive_latest = await getData("/media/archive-latest");

    const cat_result = podcast_listing.result.cat_result;
    const featured_podcasts = podcast_listing.result.media_result.filter(
        (item: { featured: number; }) => item.featured === 1
    ).sort(
        (a: { featured_display_order: number; }, b: { featured_display_order: number; }) => {
            return a.featured_display_order - b.featured_display_order;
        }
    );
    const archive = archive_latest.result;

    return (
        <div className="flex flex-col w-full">
            <Banner podcast_index={podcast_index.result[0]} />
            <Welcome />
            <FeaturedThemes cat_result={cat_result} />
            <FeaturedPodcasts featured_podcasts={featured_podcasts} />
            <Archive archive={archive} />
            <Subscribe />
        </div>
    )
}