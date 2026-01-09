import React from "react";
import Image from "next/image";
import { partnership } from "public";
import { Button } from "~/components/ui/button";
export const Purpose: React.FC = () => {
    return (
        <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-15">
            <h2 className="pb-10 sm:pb-14 text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
                Our Purpose: <span className="text-pink-500 block sm:inline-block">We Monetize AI</span>
            </h2>

            <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-6 sm:gap-8 lg:gap-10">

                <div className="order-1 col-span-12 md:order-2 md:col-span-6 lg:col-span-4 rounded-xl overflow-hidden">
                    <div className="h-[300px] sm:h-[400px] md:h-full">
                        <Image
                            src={partnership.monetize}
                            alt="CDP"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                <div className="order-2 col-span-12 md:order-1 md:col-span-6 lg:col-span-8">
                    <h5 className="mb-4 text-lg sm:text-xl font-bold text-black">
                        Turning intelligence into impact.
                    </h5>

                    <p className="mb-3 text-sm sm:text-md font-medium text-gray-600">
                        Our purpose is simple yet powerful — to help enterprises unlock the true value of artificial intelligence. At Robusst, we transform data into actionable insights, automate complex processes, and enable organizations to generate measurable revenue through intelligent systems. By integrating AI into business operations, we empower companies to make smarter decisions, reduce inefficiencies, and discover new sources of growth.
                    </p>

                    <p className="mb-3 text-sm sm:text-md font-medium text-gray-600">
                        We don’t just build technology — we build outcomes that monetize intelligence and strengthen competitive advantage.
                    </p>

                    <Button
                        variant="outline"
                        className="mt-4 border-pink-500 px-5 py-4 text-pink-500 hover:bg-pink-50"
                    >
                        Join Robusst Careers
                    </Button>
                </div>
            </div>


            <div className="mx-auto mt-10 md:mt-10 grid max-w-7xl grid-cols-12 items-center gap-6 sm:gap-8 lg:gap-10">
                <div className="col-span-12 md:col-span-12 lg:col-span-4 rounded-xl overflow-hidden ">
                    <div className="h-[300px] sm:h-[400px] md:h-[400px] lg:h-full">
                        <Image
                            src={partnership.monetize2}
                            alt="CDP"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                <div className="col-span-12 md:col-span-12 lg:col-span-8">
                    <h5 className="mb-5 mt-3 md:mt-0 text-lg sm:text-xl font-bold text-black">
                        To simplify, scale, and transform telecom operations
                        through cloud-native, AI-powered technologies that blend
                        human insight with digital intelligence.
                    </h5>
                    <h6 className="mb-5 md:mt-0 text-lg sm:text-xl font-bold text-pink-500">Our Core Values </h6>
                    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-2">
                        <div className="flex items-center sm:flex-row gap-4 rounded-lg border p-4 sm:p-5">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-200 border border-pink-500 p-3">
                                <Image src={partnership.innovation} alt="Innovation" />
                            </div>
                            <div>
                                <h3 className="mb-1 text-lg font-semibold text-pink-600">
                                    Innovation
                                </h3>
                                <p className="text-sm sm:text-md text-black">
                                    Continuously redefining
                                    what’s next in telecom
                                    technology
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center sm:flex-row gap-4 rounded-lg border p-4 sm:p-5">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-200 border border-pink-500 p-2">
                                <Image src={partnership.trust} alt="Trust" />
                            </div>
                            <div>
                                <h3 className="mb-1 text-lg font-semibold text-pink-600">
                                    Trust
                                </h3>
                                <p className="text-sm sm:text-md text-black">
                                    Building reliable, secure, and
                                    compliant ecosystems
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center sm:flex-row gap-4 rounded-lg border p-4 sm:p-5">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-200 border border-pink-500 p-2">
                                <Image src={partnership.excellence} alt="Excellence" />
                            </div>
                            <div>
                                <h3 className="mb-1 text-lg font-semibold text-pink-600">
                                    Excellence
                                </h3>
                                <p className="text-sm sm:text-md text-black">
                                    Delivering measurable
                                    business outcomes across
                                    global networks
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center sm:flex-row gap-4 rounded-lg border p-4 sm:p-5">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-200 border border-pink-500 p-2">
                                <Image src={partnership.partnershipicon} alt="Partnership" />
                            </div>
                            <div>
                                <h3 className="mb-1 text-lg font-semibold text-pink-600">
                                    Partnership
                                </h3>
                                <p className="text-sm sm:text-md text-black">
                                    Working hand-in-hand with
                                    clients for lasting success
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};