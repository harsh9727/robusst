"use client";

import Image from "next/image";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import { partnership } from "public";

export const Team = () => {
  // data/team.js
  const teamMembers = [
    {
      name: "Harsh Jambekar",
      role: "Front-End Developer",
      image: partnership.teamimage1,
      socials: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "Amit Patel",
      role: "UI/UX Designer",
      image: partnership.teamimage1,
      socials: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "Amit Patel",
      role: "UI/UX Designer",
      image: partnership.teamimage1,
      socials: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "Amit Patel",
      role: "UI/UX Designer",
      image: partnership.teamimage1,
      socials: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
  ];

  return (
    <section className="px-4 pt-10 pb-15 sm:gap-8 sm:px-12 sm:py-15 lg:px-15 lg:py-15">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">Meet Our Team</h2>
          <p className="text-muted-foreground mt-2">
            Passionate people behind our success
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              {/* Image */}
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={450}
                className="h-[450px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Social Icons */}
              <div className="absolute inset-0 flex translate-y-10 items-center justify-center gap-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <a
                  href={member.socials.twitter}
                  className="hover:bg-primary rounded-full bg-white p-3 text-black transition hover:text-white"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href={member.socials.linkedin}
                  className="hover:bg-primary rounded-full bg-white p-3 text-black transition hover:text-white"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={member.socials.instagram}
                  className="hover:bg-primary rounded-full bg-white p-3 text-black transition hover:text-white"
                >
                  <Instagram size={18} />
                </a>
              </div>

              {/* Info */}
              <div className="bg-background/90 absolute bottom-0 w-full py-4 text-center">
                <h4 className="text-lg font-semibold">{member.name}</h4>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
