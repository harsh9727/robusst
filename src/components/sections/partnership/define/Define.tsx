import React from "react";
import Image from "next/image";
import { partnership } from "public";
export const Define: React.FC = () => {
    return (
        <section className=" overflow-hidden px-4 pt-10 pb-15 sm:gap-8 sm:px-12 sm:py-15 lg:px-15 lg:py-15">
            <div className="bg-black max-w-7xl mx-auto w-full  px-5 pt-5 pb-8 lg:p-10 rounded-2xl ">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-10 items-center">
                    <div className="lg:order-1 order-2">
                        <h2 className="text-4xl font-bold mb-5 text-pink-500">What Defines Us</h2>
                        <h5 className="mb-5 text-xl font-bold text-white">
                            Building strength through innovation, integrity, and impact
                        </h5>
                        <p className="text-white mb-3">At Robusst, our identity is shaped by values that drive every decision we make. We believe in the power of innovation to transform industries, the strength of partnerships to achieve long-term success, and the agility to adapt in a rapidly changing digital world. Every project we take on reflects our commitment to excellence, transparency, and measurable impact. These pillars define who we are and how we deliver enduring value to our clients.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-5 mt-5 pt-5">
                            <div className="text-white text-center px-3 py-4 xl:p-5 rounded-lg w-full max-w-md mx-auto border border-white">
                                <h5 className="text-lg font-bold mb-2 text-pink-500">Innovation </h5>
                                <p className="text-md  mb-2">We challenge the ordinary to create extraordinary solutions.</p>
                            </div>
                            <div className="text-white text-center px-3 py-4 xl:p-5 rounded-lg w-full max-w-md mx-auto border border-white">
                                <h5 className="text-lg font-bold mb-2 text-pink-500">Partnership</h5>
                                <p className="text-md  mb-2">Collaboration is the foundation of every success story.</p>
                            </div>
                            <div className="text-white text-center px-3 py-4 xl:p-5 rounded-lg w-full max-w-md mx-auto border border-white">
                                <h5 className="text-lg font-bold mb-2 text-pink-500">Agility</h5>
                                <p className="text-md  mb-2">We move fast, adapt quickly, and deliver reliably.</p>
                            </div>
                            <div className="text-white text-center px-3 py-4 xl:p-5 rounded-lg w-full max-w-md mx-auto border border-white">
                                <h5 className="text-lg font-bold mb-2 text-pink-500">Global Vision</h5>
                                <p className="text-md  mb-2">Local understanding, global reach, and sustainable growth.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-full w-full md:h-[400px] lg:h-full overflow-hidden rounded-xl lg:order-2 order-1">
                        <Image
                            src={partnership.define}
                            alt="Cdp"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>

        </section>
    );
};