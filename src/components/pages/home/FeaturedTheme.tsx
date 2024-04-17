import Image from "next/image";

export default function FeaturedTheme(props: { imgURL: string; title: string; description: string; }) {
    return (
        <div className="shadow-common cursor-pointer h-full">
            <Image
                src={props.imgURL}
                alt="Featuredsample"
                width={545}
                height={300}
                className='aspect-[545/300]'
            />
            <div className="p-4">
                <h3 className="text-lg font-bold text-primary">
                    {props.title}
                </h3>
                <p className="text-line-primary">
                    {props.description}
                </p>
            </div>
        </div>
    );
}