import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const DeleteButton = ({ onClick }: { onClick: () => void; }) => {
    return (
        <button
            onClick={onClick}
            className="flex gap-1 items-center text-xs px-[24px] py-[8px] text-white bg-red-primary hover:bg-red-secondary rounded transition-all"
        >
            <p>Delete</p>
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
    )
}