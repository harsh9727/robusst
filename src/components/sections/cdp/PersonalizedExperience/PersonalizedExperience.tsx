"use client";

import Image from "next/image";
import { Card, CardContent } from "~/components/ui/card";
import {
  Globe,
  RefreshCcw,
  TrendingUp,
  Gift,
  ShoppingBag,
  MessageSquare,
} from "lucide-react";
import { platform } from "public";

const useCases = [
  { icon: Globe, text: "International Roaming Promotions" },
  { icon: RefreshCcw, text: "Contract Renewal Reminders" },
  { icon: TrendingUp, text: "Up-sell & Cross-sell Campaigns" },
  { icon: Gift, text: "Festival & Seasonal Offers" },
  { icon: ShoppingBag, text: "E-store & Loyalty Engagement" },
  { icon: MessageSquare, text: "Customer Feedback & Surveys" },
];

export const PersonalizedExperience = () => {
  return (
    <section className="relative bg-white py-20 px-6">
      <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT – Image */}
        <div className="group">
          <div className=" overflow-hidden rounded-xl bg-white h-[550px] w-full border border-slate-200 transition-all duration-300 group-hover:border-pink-300 group-hover:shadow-lg">

            {/* Image */}
            <Image
              src={platform.cmp}
              alt="Telecom Use Cases"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        </div>

        {/* RIGHT – Content */}
        <div>
          <p className="text-md font-semibold w-fit py-2 px-6 rounded-xl bg-pink-50 border border-pink-500 text-black mb-3">
            From Data to Personalized Experience
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Turn Customer Data Into <br />
            <span className="text-pink-500">
              Personalized Engagement
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {useCases.map((item, i) => {
              const Icon = item.icon;
              return (
                <Card
                  key={i}
                  className="group border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
                >
                  <CardContent className="flex items-center gap-4">

                    <div className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-purple-500 text-white group-hover:scale-110 transition">
                      <Icon size={18} />
                    </div>

                    <p className="text-gray-800 text-md font-semibold">
                      {item.text}
                    </p>

                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
