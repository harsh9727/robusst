import React from "react";
import Image from "next/image";
import { partnership } from "public";

export const Challenges: React.FC = () => {
    return (
        <div className="bg-primary relative flex w-full items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-15 lg:py-20 overflow-hidden">
            <div className="bg-brand-two absolute -top-60 -right-20 h-40 w-100 rotate-6 blur-[200px] sm:h-50 sm:w-180" />
            <div className="bg-brand-two absolute -bottom-30 left-1/2 size-40 -translate-x-1/2 rounded-full blur-[140px] sm:size-50" />
            <section className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-center ">
                    
                    {/* col-md-4 */}
                    <div className="md:col-span-12 lg:col-span-4 ">
                        <div className="flex lg:h-full md:h-[350px] sm:h-[350px] h-[300px] overflow-hidden rounded-xl">
                            <Image
                                src={partnership.challenge}
                                alt="Cdp"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                    <div className=" md:col-span-12 lg:col-span-8">
                        <h2 className="text-3xl font-bold my-5 pb-5 text-pink-500">Challenges and Considerations <span className="text-white">Navigating the Future</span></h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                            <li className="flex items-center gap-5 rounded-lg bg-white px-3 py-3">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-200 border border-pink-500 p-3">
                                    <Image
                                        src={partnership.privacy}
                                        alt="privacy"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h4 className="text-md lg:text-lg font-semibold text-pink-500">
                                    Privacy and security concerns.
                                </h4>
                            </li>

                            <li className="flex items-center gap-5 rounded-lg bg-white px-3 py-3">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-200 border border-pink-500 p-2">
                                    <Image
                                        src={partnership.ethics}
                                        alt="ethics"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h4 className="text-md lg:text-lg font-semibold text-pink-500">
                                    Ethical considerations and content moderation.
                                </h4>
                            </li>
                            <li className="flex items-center gap-5 rounded-lg bg-white px-3 py-3">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-200 border border-pink-500 p-2">
                                    <Image
                                        src={partnership.digitalization}
                                        alt="digitalization"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h4 className="text-md lg:text-lg font-semibold text-pink-500">
                                    Accessibility and digital divide.
                                </h4>
                            </li>

                            <li className="flex items-center gap-5 rounded-lg bg-white px-3 py-3">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-200 border border-pink-500 p-2">
                                    <Image
                                        src={partnership.technologyicon}
                                        alt="technology"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h4 className="text-md lg:text-lg font-semibold text-pink-500">
                                    Technological limitations and infrastructure.
                                </h4>
                            </li>
                        </ul>

                    </div>

                </div>

            </section>
        </div>
    );
}