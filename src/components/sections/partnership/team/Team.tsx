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
        <div className="text-center mb-12">
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
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Social Icons */}
              <div className="absolute inset-0 flex items-center justify-center gap-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <a
                  href={member.socials.twitter}
                  className="p-3 rounded-full bg-white text-black hover:bg-primary hover:text-white transition"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href={member.socials.linkedin}
                  className="p-3 rounded-full bg-white text-black hover:bg-primary hover:text-white transition"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={member.socials.instagram}
                  className="p-3 rounded-full bg-white text-black hover:bg-primary hover:text-white transition"
                >
                  <Instagram size={18} />
                </a>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 w-full bg-background/90 text-center py-4">
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
