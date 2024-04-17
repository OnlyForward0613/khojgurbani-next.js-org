export const Subscribe = () => {
    return (
        <div className="w-full bg-right-top bg-cover bg-[url('/Images/Home/homesub.jpg')]">
            <div className="mx-auto max-w-6xl p-4">
                <h2 className="text-lg sm:text-3xl py-4 font-bold text-title text-center">
                    SUBSCRIBE TO OUR NEWSLETTER
                </h2>
                <form className="sm:relative sm:mx-auto sm:max-w-3xl sm:h-16 sm:bg-white sm:rounded-[50px] sm:border-[1px] sm:border-[#929292]">
                    <input
                        id="search_val"
                        name="searchval"
                        placeholder="Enter Email Address"
                        type="email"
                        className="sm:absolute sm:border-none sm:left-10 sm:top-4 sm:w-3/5 outline-none text-xl border-[1px] border-[#929292] p-2 sm:p-0 w-full"
                    />
                    <span>
                        <button className="sm:absolute bg-primary sm:rounded-[50px] text-white text-center sm:h-14 w-full sm:w-40 sm:right-[3px] sm:top-[3px] sm:line-clamp-2 px-6 py-2 sm:pt-1 mt-2 sm:mt-0">
                            SUBSCRIBE NOW
                        </button>
                    </span>
                </form>
            </div>
        </div>
    );
}