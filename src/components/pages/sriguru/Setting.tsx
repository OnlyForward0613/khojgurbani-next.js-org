'use client'

export const Setting = ({ settingOpen, setSettingOpen, setting, setSetting }: { settingOpen: boolean; setSettingOpen: any; setting: any; setSetting: any }) => {

    const handleClose = () => setSettingOpen(false);
    const handleReset = () => setSetting({
        option1: false,
        option2: true,
        option3: true,
        option4: false,
        option5: false,
        option6: true,
        option7: false,
        option8: false,
    });

    return (
        <div className={`relative z-20 ${settingOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"></div>

            <div className="fixed top-[50px] left-1/2 -translate-x-1/2 w-[300px] flex flex-col rounded-md overflow-hidden">
                <h4 className="text-[21px] leading-[1.5] text-white p-[14px] bg-main">Setting</h4>
                <div className="p-[14px] bg-white text-primary flex flex-col">
                    <div className="flex items-center">
                        <input type="checkbox" checked={setting.option1} id="option1" name="option1" onChange={(e) => { setSetting((pre: any) => ({ ...pre, option1: e.target.checked })) }} />
                        <label htmlFor="option1" className="text-[16px] leading-[1.5] ml-2">Larivaar</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" checked={setting.option2} id="option2" name="option2" onChange={(e) => { setSetting((pre: any) => ({ ...pre, option2: e.target.checked })) }} />
                        <label htmlFor="option2" className="text-[16px] leading-[1.5]  ml-2">Roman Script</label>
                    </div>
                    <h5 className="text-[18px] mt-[26px] mb-[7px]">English Translation</h5>
                    <div className="ml-[20px]">
                        <div className="flex items-center">
                            <input type="checkbox" checked={setting.option3} id="option3" name="option3" onChange={(e) => { setSetting((pre: any) => ({ ...pre, option3: e.target.checked })) }} />
                            <label htmlFor="option3" className="text-[16px] leading-[1.5] ml-2">KhojGurbani (KG)</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked={setting.option4} id="option4" name="option4" onChange={(e) => { setSetting((pre: any) => ({ ...pre, option4: e.target.checked })) }} />
                            <label htmlFor="option4" className="text-[16px] leading-[1.5] ml-2">Bhai Manmohan Singh (MS)</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked={setting.option5} id="option5" name="option5" onChange={(e) => { setSetting((pre: any) => ({ ...pre, option5: e.target.checked })) }} />
                            <label htmlFor="option5" className="text-[16px] leading-[1.5] ml-2">Dr. Sant Singh Khalsa (SK)</label>
                        </div>
                    </div>
                    <h5 className="text-[18px] mt-[26px] mb-[7px]">Teeka</h5>
                    <div className="ml-[20px]">
                        <div className="flex items-center">
                            <input type="checkbox" checked={setting.option6} id="option6" name="option6" onChange={(e) => { setSetting((pre: any) => ({ ...pre, option6: e.target.checked })) }} />
                            <label htmlFor="option6" className="text-[16px] leading-[1.5] ml-2">Giani Harbans Singh (HS)</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked={setting.option7} id="option7" name="option7" onChange={(e) => { setSetting((pre: any) => ({ ...pre, option7: e.target.checked })) }} />
                            <label htmlFor="option7" className="text-[16px] leading-[1.5] ml-2">Bhai Manmohan Singh (MS)</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked={setting.option8} id="option8" name="option8" onChange={(e) => { setSetting((pre: any) => ({ ...pre, option8: e.target.checked })) }} />
                            <label htmlFor="option8" className="text-[16px] leading-[1.5] ml-2">Prof. Sahib Singh (SS)</label>
                        </div>
                    </div>
                    <h5 className="text-[18px] mt-[26px] mb-[7px]">Hindi Translation</h5>
                </div>
                <div className="flex justify-end items-center bg-white p-[14px] border-t">
                    <button className="px-[10px] py-[5px] hover:bg-slate-200 text-sm rounded-sm transition-all"
                        onClick={handleClose}>
                        Close
                    </button>
                    <button className="px-[10px] py-[5px] ml-[18px] bg-blue-primary hover:bg-blue-secondary text-sm text-white rounded-sm transition-all"
                        onClick={handleReset}>
                        Reset
                    </button>
                    <button className="px-[10px] py-[5px] ml-[18px] bg-blue-primary hover:bg-blue-secondary text-sm text-white rounded-sm transition-all"
                        onClick={handleClose}>
                        Save
                    </button>

                </div>
            </div>
        </div>
    )
}