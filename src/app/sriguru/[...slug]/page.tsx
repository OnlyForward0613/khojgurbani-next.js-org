import { Sriguru } from "@/components/pages/sriguru/Sriguru";
import MediaDataProvider from "@/contexts/MediaDataContext";
import { getData } from "@/utils/fetch_server";
import { redirect } from "next/navigation";

export default async function SriGuruSubPage({ params: { slug } }: { params: { slug: string[] } }) {

    const route = slug[0];
    const item = slug[1];

    if (!item) {
        const data = await getData(`/shabad/${route}`);
        const shabadPages = data.pages;
        redirect(`/sriguru/${route}/${shabadPages[0]}`);
    }

    const shabadData = await getData(`/shabad/${route}/${item}`);
    const commentaryList = await getData(`/commentary/list/${item}`);
    const shabadMedias = await getData(`/shabad-data/get-shabad-media/${item}`, "sriguru");

    const authorListData = await getData("/media-authors/list").then((data) => data.result);
    const tagListData = await getData("/resource-tag/list").then((data) => data.result);
    const resourceListData = await getData("/categories/resources-list").then((data) => data.result);
    const subCategoryListData = await getData("/categories/resources-subcategory-list").then((data) => data.result);
    const shabadListData = await getData("/shabad-data/list").then((data) => data.result);

    const mediaData = { authorListData, tagListData, resourceListData, subCategoryListData, shabadListData }

    return (
        <MediaDataProvider mediaData={mediaData}>
            <div className="max-w-6xl px-4 mx-auto">
                <Sriguru route={route} item={item} shabadData={shabadData} commentaryList={commentaryList} shabadMedias={shabadMedias} />
            </div>
        </MediaDataProvider>
    );
}