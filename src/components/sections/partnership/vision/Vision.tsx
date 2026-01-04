import React from "react";
import { partnership } from "public";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export const Vision: React.FC = () => {
    return (
        <div className="bg-primary relative flex w-full items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-15 lg:py-20 overflow-hidden">
            <div className="bg-brand-two absolute -top-40 -right-20 h-32 w-72 rotate-6 blur-[160px] sm:h-50 sm:w-180" />
            <div className="bg-brand-two absolute -bottom-20 left-1/2 size-32 -translate-x-1/2 rounded-full blur-[120px] sm:size-50" />

            <section className="relative z-10 grid w-full max-w-7xl grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
                <div className="col-span-12 md:col-span-6">
                    {/* Vision */}
                    <div className="mb-4 w-full h-64 sm:h-64 md:h-[400px] rounded-lg overflow-hidden bg-brand-two">
                        <Image
                            src={partnership.vision}
                            alt="Vision"
                            className="h-full w-full object-cover object-top"
                        />
                    </div>

                    <h2 className="my-4 text-2xl sm:text-3xl font-bold text-pink-500">
                        Our Vision
                    </h2>

                    <ul className="space-y-2 text-sm sm:text-md text-white">
                        <li className="flex items-start">
                            <CheckCircle className="mr-2 mt-1 h-4 w-4 shrink-0 text-pink-600" />
                            To inspire global transformation through resilient innovation and meaningful partnerships.
                        </li>

                        <li className="flex items-start">
                            <CheckCircle className="mr-2 mt-1 h-4 w-4 shrink-0 text-pink-600" />
                            To redefine innovation by creating resilient digital ecosystems that shape the future of businesses
                        </li>

                        <li className="flex items-start">
                            <CheckCircle className="mr-2 mt-1 h-4 w-4 shrink-0 text-pink-600" />
                            To build a world where technology and people work in harmony for sustainable progress.
                        </li>

                        <li className="flex items-start">
                            <CheckCircle className="mr-2 mt-1 h-4 w-4 shrink-0 text-pink-600" />
                            To be the most trusted technology partner known for robust, secure, and scalable solutions.
                        </li>

                        <li className="flex items-start">
                            <CheckCircle className="mr-2 mt-1 h-4 w-4 shrink-0 text-pink-600" />
                            To empower enterprises to achieve accelerated growth through innovation, intelligence, and impact.
                        </li>
                    </ul>

                </div>

                {/* Mission */}
                <div className="col-span-12 md:col-span-6">
                    <div className="mb-4 w-full h-64 sm:h-64 md:h-[400px] rounded-lg overflow-hidden bg-brand-two">
                        <Image
                            src={partnership.mission}
                            alt="Mission"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <h2 className="my-4 text-2xl sm:text-3xl font-bold text-pink-500">
                        Our Mission
                    </h2>

                    <p className="text-sm sm:text-md text-white leading-relaxed">
                        At Robusst, our mission is to empower businesses with resilient and innovative digital solutions that drive measurable growth. We blend creativity, technology, and strategy to design impactful experiences that help our clients stay ahead in an ever-evolving world.
                    </p>

                    <p className="mt-3 text-sm sm:text-md text-white leading-relaxed">
                        Our commitment lies in building lasting partnerships based on trust, transparency, and performance—helping organizations unlock their true potential and thrive with strength, stability, and innovation.
                    </p>
                </div>

            </section>
        </div>

    );
};