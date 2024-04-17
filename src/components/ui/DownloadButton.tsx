import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const DownloadButton = ({ onClick, size }: { onClick: () => void; size: number; }) => {
    if (size === 1) {
        return (
            <button
                onClick={onClick}
                className="bg-gray-primary hover:bg-gray-secondary w-6 h-6 rounded-full relative">
                <FontAwesomeIcon icon={faDownload} className="text-blue-primary text-sm absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] transition-all" />
            </button>
        )
    }
}