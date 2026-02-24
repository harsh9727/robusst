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
    <section className="relative bg-white px-6 py-20">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        {/* LEFT – Image */}
        <div className="group">
          <div className="shadow-brand-one relative h-[550px] w-full overflow-hidden rounded-xl bg-white shadow-[0px_0px_10px] transition-all duration-300 hover:shadow-[0px_0px_50px]">
            {/* Image */}
            <Image
              src="/solutions/cdp/8.webp"
              fill
              alt="Telecom Use Cases"
              className="h-full w-full object-cover transition-transform ease-out group-hover:scale-105"
            />
          </div>
        </div>

        {/* RIGHT – Content */}
        <div>
          <p className="text-md mb-3 w-fit rounded-xl border border-pink-500 bg-pink-50 px-6 py-2 font-semibold text-black">
            From Data to Personalized Experience
          </p>

          <h2 className="mb-6 text-4xl leading-tight font-extrabold text-gray-900 md:text-5xl">
            Turn Customer Data Into <br />
            <span className="text-pink-500">Personalized Engagement</span>
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {useCases.map((item, i) => {
              const Icon = item.icon;
              return (
                <Card
                  key={i}
                  className="group border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <CardContent className="flex items-center gap-4">
                    <div className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-purple-500 text-white transition group-hover:scale-110">
                      <Icon size={18} />
                    </div>

                    <p className="text-md font-semibold text-gray-800">
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
