import React from "react";
import Image from "next/image";
import { partnership } from "public";
import { Button } from "~/components/ui/button";
export const Driving: React.FC = () => {
    return (
        <section className=" flex items-center justify-center gap-6 overflow-hidden px-3 py-16 sm:gap-8 sm:px-12 sm:py-20 lg:px-15 lg:py-25">
            <div className="bg-black max-w-7xl mx-auto w-full rounded-2xl px-5 py-8 sm:px-8 sm:py-10 lg:p-12">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    <div className="lg:col-span-5 ">
                        <div className="relative w-full h-[260px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-xl">
                            <Image
                                src={partnership.digitalTelecom}
                                alt="Cdp"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-7 ">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-5 text-pink-500">
                            Driving the Digital Telecom Revolution
                        </h2>

                        <p className="text-white/90 mb-3 text-sm sm:text-base">
                            Founded with the vision to democratize AI in enterprise environments, Robusst has been at the forefront of artificial intelligence innovation for over 15 years.
                        </p>

                        <p className="text-white/90 mb-3 text-sm sm:text-base">
                            Starting as a small team of AI researchers, we've grown into a global company serving 200+ telecom operators and financial institutions across 50+ countries.
                        </p>

                        <p className="text-white/90 mb-6 text-sm sm:text-base">
                            Today, our platform processes billions of data points daily, helping our clients generate over €2.3 billion in additional revenue through intelligent automation and predictive analytics.
                        </p>

                        <Button
                            variant="outline"
                            className="text-sm sm:text-base font-medium border-pink-500 text-pink-500 hover:bg-pink-50 hover:text-pink-700 px-6 py-4 capitalize"
                        >
                            Explore Our Journey
                        </Button>
                    </div>



                </div>

            </div>


        </section>
    );
};