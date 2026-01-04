import React from "react";
import Image from "next/image";
import { partnership } from "public";
import { Button } from "~/components/ui/button";
export const Future: React.FC = () => {
    return (
        <section className=" flex items-center justify-center gap-6 overflow-hidden px-3 py-16 sm:gap-8 sm:px-12 sm:py-20 lg:px-15 lg:py-25">
            <div className="bg-black max-w-7xl mx-auto w-full rounded-2xl px-5 py-8 sm:px-8 sm:py-10 lg:p-12">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

                    <div className="lg:col-span-7 order-2 lg:order-1">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-5 text-pink-500">
                            Let’s Build the Future of AI Together
                        </h2>

                        <h5 className="text-white text-lg sm:text-xl font-semibold mb-3">
                            Partner with Robusst to transform your business through resilient innovation.
                        </h5>

                        <p className="text-white/90 mb-3 text-sm sm:text-base">
                            We believe collaboration drives transformation. Whether you’re exploring AI integration,
                            cloud-native modernization, or automation at scale, Robusst is here to partner with you.
                        </p>

                        <p className="text-white/90 mb-3 text-sm sm:text-base">
                            Together, we can co-create digital ecosystems that empower your organization to lead
                            with confidence in a data-driven future.
                        </p>

                        <h5 className="text-pink-500 text-base sm:text-lg font-medium mb-4">
                            Let’s start the conversation that transforms potential into performance.
                        </h5>

                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="outline"
                                className="text-sm sm:text-base font-medium border-pink-500 text-pink-500 hover:bg-pink-50 hover:text-pink-700 px-6 py-4 capitalize"
                            >
                                Join Robusst Careers
                            </Button>

                            <Button
                                variant="outline"
                                className="text-sm sm:text-base font-medium border-pink-500 text-pink-500 hover:bg-pink-50 hover:text-pink-700 px-6 py-4 capitalize"
                            >
                                Contact Us
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-5 order-1 lg:order-2">
                        <div className="relative w-full h-[240px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-xl">
                            <Image
                                src={partnership.future}
                                alt="Cdp"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};