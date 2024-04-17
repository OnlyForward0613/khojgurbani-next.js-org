'use client'

import { faGear, faPrint } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const SettingButton = ({ setSettingOpen, setPrintOpen }: { setSettingOpen: any; setPrintOpen: any; }) => {

    return (
        <div className="md:mr-4 flex items-center gap-6">
            <div className="cursor-pointer flex items-center gap-2 group" onClick={() => setSettingOpen(true)}>
                <span className="underline text-[20px] text-primary group-hover:text-blue-primary">Click for Translation Authors</span>
                <FontAwesomeIcon icon={faGear} className="text-blue-primary text-[18px]" />
            </div>
            <div className="hidden sm:block">
                <FontAwesomeIcon icon={faPrint} className="cursor-pointer text-primary hover:text-blue-primary text-[21px]" onClick={() => setPrintOpen(true)} />
            </div>
        </div>
    )
}