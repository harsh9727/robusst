import { Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { platform } from "public";
import React from "react";
export const Team: React.FC = () => {
    return (
        <section className="overflow-hidden px-6 pb-16 sm:px-12 lg:px-15">
            <h2 className="pb-15 text-center text-4xl font-bold text-pink-500">
                Management Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-20 md:gap-y-24 lg:gap-7">
                <div className="group relative rounded-3xl bg-gradient-to-r from-indigo-950 to-slate-300 h-72 md:h-64 lg:h-72 flex flex-col items-center pt-16">

                    <div className="absolute top-6 z-10 transition-all duration-500 group-hover:-top-13">
                        <div className="flex h-24 w-24 overflow-hidden items-center justify-center rounded-full bg-sky-100 shadow-lg">
                            <Image
                                src={platform.cdp1}
                                alt="profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="mt-20 text-center transition-all duration-500 group-hover:translate-y-[-20px] md:group-hover:translate-y-[-25px] lg:group-hover:translate-y-[-20px]">
                        <h5 className="text-xl font-semibold text-white">
                            John Doe
                        </h5>
                        <p className="mt-1 text-sm text-white/80">
                            CEO & Founder
                        </p>
                    </div>

                    <div className="absolute bottom-6 flex gap-4 opacity-0 translate-y-6 transition-all duration-500
                  group-hover:opacity-100 group-hover:translate-y-0">
                        <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                            <Instagram />
                        </a>
                        <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                            <Twitter />
                        </a>
                        <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                            <Linkedin />
                        </a>
                    </div>

                </div>
                <div className="group relative rounded-3xl bg-gradient-to-r from-indigo-950 to-slate-300 h-72 md:h-64 lg:h-72 flex flex-col items-center pt-16">

                    {/* Image */}
                    <div className="absolute top-6 z-10 transition-all duration-500 group-hover:-top-13">
                        <div className="flex h-24 w-24 overflow-hidden items-center justify-center rounded-full bg-sky-100 shadow-lg">
                            <Image
                                src={platform.cdp1}
                                alt="profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Text */}
                    <div className="mt-20 text-center transition-all duration-500 group-hover:translate-y-[-20px] md:group-hover:translate-y-[-25px] lg:group-hover:translate-y-[-20px]">
                        <h5 className="text-xl font-semibold text-white">
                            John Doe
                        </h5>
                        <p className="mt-1 text-sm text-white/80">
                            CEO & Founder
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="absolute bottom-6 flex gap-4 opacity-0 translate-y-6 transition-all duration-500
                  group-hover:opacity-100 group-hover:translate-y-0">
                        <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                            <Instagram />
                        </a>
                        <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                            <Twitter />
                        </a>
                        <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                            <Linkedin />
                        </a>
                    </div>

                </div>
                <div className="group relative rounded-3xl bg-gradient-to-r from-indigo-950 to-slate-300 h-72 md:h-64 lg:h-72 flex flex-col items-center pt-16">

                    {/* Image */}
                    <div className="absolute top-6 z-10 transition-all duration-500 group-hover:-top-13">
                        <div className="flex h-24 w-24 overflow-hidden items-center justify-center rounded-full bg-sky-100 shadow-lg">
                            <Image
                                src={platform.cdp1}
                                alt="profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Text */}
                    <div className="mt-20 text-center transition-all duration-500 group-hover:translate-y-[-20px] md:group-hover:translate-y-[-25px] lg:group-hover:translate-y-[-20px]">
                        <h5 className="text-xl font-semibold text-white">
                            John Doe
                        </h5>
                        <p className="mt-1 text-sm text-white/80">
                            CEO & Founder
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="absolute bottom-6 flex gap-4 opacity-0 translate-y-6 transition-all duration-500
                  group-hover:opacity-100 group-hover:translate-y-0">
                        <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                            <Instagram />
                        </a>
                        <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                            <Twitter />
                        </a>
                        <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                            <Linkedin />
                        </a>
                    </div>

                </div>
                <div className="group relative rounded-3xl bg-gradient-to-r from-indigo-950 to-slate-300 h-72 md:h-64 lg:h-72 flex flex-col items-center pt-16group relative rounded-3xl bg-gradient-to-r from-indigo-950 to-slate-300
                h-72 md:h-64 lg:h-72 flex flex-col items-center pt-16 ">

                    {/* Image */}
                    <div className="absolute top-6 z-10 transition-all duration-500 group-hover:-top-13">
                        <div className="flex h-24 w-24 overflow-hidden items-center justify-center rounded-full bg-sky-100 shadow-lg">
                            <Image
                                src={platform.cdp1}
                                alt="profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Text */}
                    <div className="mt-20 text-center transition-all duration-500 group-hover:translate-y-[-20px] md:group-hover:translate-y-[-25px] lg:group-hover:translate-y-[-20px]">
                        <h5 className="text-xl font-semibold text-white">
                            John Doe
                        </h5>
                        <p className="mt-1 text-sm text-white/80">
                            CEO & Founder
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="absolute bottom-6 flex gap-4 opacity-0 translate-y-6 transition-all duration-500
                  group-hover:opacity-100 group-hover:translate-y-0">
                        <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                            <Instagram />
                        </a>
                        <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                            <Twitter />
                        </a>
                        <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                            <Linkedin />
                        </a>
                    </div>

                </div>
            </div>
        </section>

    );
};