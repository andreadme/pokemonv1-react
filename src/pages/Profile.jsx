import React from "react" 

const Profile = () => { 
    return (
        <>
        <div className="w-full my-32">
            <div className="max-w-[1200px] w-[90%] h-[600px] flex flex-row mx-auto p-5 border-[#919191] rounded-2xl bg-[#D5092B]">

                <div className=" bg-[#D5092B] flex flex-col items-center justify-center px-5 mx-auto my-8 ">
                    <div className="max-w-md text-center ">
                        <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                            <span className="sr-only text-[#FFFFFF]"></span>Coming Soon
                        </h2>
                        <a rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Back to homepage</a>
                    </div>
                </div>
                <div className=" bg-[#D5092B] h-[550px] flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center ">
                        <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                            <span className="sr-only text-[#FFFFFF]"></span>Coming Soon
                        </h2>
                        <a rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Back to homepage</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
} 

export default Profile;