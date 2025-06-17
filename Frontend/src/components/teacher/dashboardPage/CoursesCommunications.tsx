import React from "react";

export const CoursesCommunications = () => {
    return (
        <div className="flex flex-col mt-6 text-sm">
            <div className="flex font-semibold text-base border-y-2 [&>div]:p-1 text-center max-md:pr-5">
                <div className="w-1/3">Course</div>
                <div className="w-1/2 border-x">Latest communication</div>
                <div className="grow">Signer</div>
            </div>
            <div className="flex line-clamp-3 border-b [&>div]:p-1">
                <div className="w-1/3 flex justify-center items-center ">
                    lorem
                </div>
                <div className="border-x w-1/2 line-clamp-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nemo recusandae esse debitis illo perferendis quibusdam
                    maiores ex molestiae aliquam aliquid!
                </div>
                <div className="flex justify-center items-center grow">
                    Pincopallo
                </div>
            </div>
            <div className="flex line-clamp-3 border-b [&>div]:p-1">
                <div className="w-1/3 flex justify-center items-center">
                    lorem
                </div>
                <div className="border-x w-1/2 line-clamp-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nemo recusandae esse debitis illo perferendis quibusdam
                    maiores ex molestiae aliquam aliquid!
                </div>
                <div className="flex justify-center items-center grow">
                    Pincopallo
                </div>
            </div>
        </div>
    );
};
