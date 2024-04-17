export default function SriGuruLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="w-full bg-center bg-cover bg-[url('/images/sriguru/top.png')]">
                <h1 className="mx-auto max-w-6xl px-4 py-[27px] sm:py-16 md:py-20 lg:py-[100px] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-white">Sri Guru Granth Sahib</h1>
            </div>
            {children}
        </>
    )
}