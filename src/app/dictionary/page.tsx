import { VirtualKeyboard } from "@/components/pages/dictionary/VirtualKeyboard";

// export const dynamic = 'force-dynamic';

export default function DictionaryPage() {

    return (
        <div>
            <div className="w-full bg-bottom bg-cover bg-[url('/images/dictionary/top.jpg')]">
                <h1 className="mx-auto max-w-6xl px-4 py-[27px] sm:py-16 md:py-20 lg:py-[100px] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-white">Encyclopedia & Dictionaries</h1>
            </div>
            <VirtualKeyboard />
        </div>
    )
}