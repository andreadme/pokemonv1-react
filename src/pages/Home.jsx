import React from "react" 

const Home = () => { 
    return (
        <>
        <div className="w-full my-32">
            <div className="max-w-[500px] mx-auto p-5">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                            <span className="sr-only"></span>Coming Soon
                        </h2>
                        <a rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Back to homepage</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
} 

export default Home;