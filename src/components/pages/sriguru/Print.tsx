'use client'

import { faClose, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Print = ({ printOpen, setPrintOpen, print, setPrint, exportData }: { printOpen: boolean; setPrintOpen: any; print: any; setPrint: any, exportData: any; }) => {

    const handleClose = () => {
        setPrintOpen(false);
    }

    return (
        <div className={`relative z-20 ${printOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"></div>

            <div className="fixed top-[50px] left-1/2 -translate-x-1/2 w-[300px] flex flex-col rounded-md overflow-hidden">
                <div className="p-[14px] bg-main flex items-center justify-between">
                    <h4 className="text-[21px] leading-[1.5] text-white">Export</h4>
                    <FontAwesomeIcon icon={faClose} className="cursor-pointer text-white text-[21px]" onClick={handleClose} />
                </div>
                <div className="p-[14px] bg-white text-primary flex flex-col">
                    <div className="flex items-center">
                        <input type="checkbox" checked={print.print_opt1} id="print_opt1" name="print_opt1" onChange={(e) => { setPrint((pre: any) => ({ ...pre, print_opt1: e.target.checked })) }} />
                        <label htmlFor="print_opt1" className="text-[16px] leading-[1.5] ml-2">Gurmukhi-Pad Ched</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" checked={print.print_opt2} id="print_opt2" name="print_opt2" onChange={(e) => { setPrint((pre: any) => ({ ...pre, print_opt2: e.target.checked })) }} />
                        <label htmlFor="print_opt2" className="text-[16px] leading-[1.5] ml-2">Gurmukhi-Lareevaar</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" checked={print.print_opt3} id="print_opt3" name="print_opt3" onChange={(e) => { setPrint((pre: any) => ({ ...pre, print_opt3: e.target.checked })) }} />
                        <label htmlFor="print_opt3" className="text-[16px] leading-[1.5]  ml-2">Roman Script</label>
                    </div>
                    <h5 className="text-[18px] mt-[26px] mb-[7px]">English Translation</h5>
                    <div className="ml-[20px]">
                        <div className="flex items-center">
                            <input type="checkbox" checked={print.print_opt4} id="print_opt4" name="print_opt4" onChange={(e) => { setPrint((pre: any) => ({ ...pre, print_opt4: e.target.checked })) }} />
                            <label htmlFor="print_opt4" className="text-[16px] leading-[1.5] ml-2">KhojGurbani</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked={print.print_opt5} id="print_opt5" name="print_opt5" onChange={(e) => { setPrint((pre: any) => ({ ...pre, print_opt5: e.target.checked })) }} />
                            <label htmlFor="print_opt5" className="text-[16px] leading-[1.5] ml-2">Bhai Manmohan Singh</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked={print.print_opt6} id="print_opt6" name="print_opt6" onChange={(e) => { setPrint((pre: any) => ({ ...pre, print_opt6: e.target.checked })) }} />
                            <label htmlFor="print_opt6" className="text-[16px] leading-[1.5] ml-2">Dr. Sant Singh Khalsa</label>
                        </div>
                    </div>
                    <h5 className="text-[18px] mt-[26px] mb-[7px]">Teeka</h5>
                    <div className="ml-[20px]">
                        <div className="flex items-center">
                            <input type="checkbox" checked={print.print_opt7} id="print_opt7" name="print_opt7" onChange={(e) => { setPrint((pre: any) => ({ ...pre, print_opt7: e.target.checked })) }} />
                            <label htmlFor="print_opt7" className="text-[16px] leading-[1.5] ml-2">Giani Harbans Singh</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked={print.print_opt8} id="print_opt8" name="print_opt8" onChange={(e) => { setPrint((pre: any) => ({ ...pre, print_opt8: e.target.checked })) }} />
                            <label htmlFor="print_opt8" className="text-[16px] leading-[1.5] ml-2">Bhai Manmohan Singh</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked={print.print_opt9} id="print_opt9" name="print_opt9" onChange={(e) => { setPrint((pre: any) => ({ ...pre, print_opt9: e.target.checked })) }} />
                            <label htmlFor="print_opt9" className="text-[16px] leading-[1.5] ml-2">Prof. Sahib Singh</label>
                        </div>
                    </div>
                    <h5 className="text-[18px] mt-[26px] mb-[7px]">Hindi Translation</h5>
                    <select name="format" id="format" value={print.print_opt10} onChange={(e) => { setPrint((pre: any) => ({ ...pre, print_opt10: e.target.value })) }}>
                        <option value="section">Section</option>
                        <option value="line">Line</option>
                    </select>
                </div>
                <div className="bg-white p-[14px] border-t">
                    <button className="w-full px-[10px] py-[5px] bg-blue-primary hover:bg-blue-secondary text-sm text-white rounded-sm transition-all"
                        onClick={() => exportData()}
                    >
                        <FontAwesomeIcon icon={faPrint} className="" />
                        &nbsp;
                        Export
                    </button>
                </div>
            </div>
        </div>
    );
}