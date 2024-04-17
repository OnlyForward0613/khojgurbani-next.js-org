import Image from "next/image";

export default function Loading() {
    return (
        <div className="h-full grow flex justify-center items-center">
            <Image src='/images/loading/loading.svg' width={100} height={100} alt="loading..." />
        </div>
    )
}