
"use client"
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Models } from "node-appwrite";

const features = [
  {
    icon: "/icons/anonymous-message.png",
    title: "Anonymous Message",
    href: "/anonymous-message",
    description:
      "Receive anonymous messages and feedback from people to know what they think about you.",
    gradient: "from-pink-100 to-primary/10 hover:to-primary/30",
  },
  {
    icon: "/icons/virtual-gift.png",
    title: "Send Virtual Gifts",
    href: "/anonymous-message",
    description:
      "Send and receive virtual gifts to express your feelings and appreciation.",
    gradient: "from-blue-300/30",
  },
  {
    icon: "/icons/gift-box.png",
    title: "Shop Love Packages",
    href: "/anonymous-message",
    description:
      "Shop for love packages and send to your loved ones to show them how much you care.",
    gradient: "from-green-300/30 to-primary/10 hover:to-primary/30",
  },
];


interface FeatureProps {
  user: Models.Document | null;
}

const Features = ({ user }: FeatureProps) => {

  return (
    <section className="">
      <h2 className="text-3xl font-bold text-center mb-12 text-primary">
        Discover Our Features
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${feature.gradient} to-primary/10 hover:to-primary/30 p-10 rounded-lg shadow-xl flex flex-col justify-start space-y-3 border border-primary/20`}
          >
            <div className="bg-gradient-to-br from-red-400 to-pink-400 rounded-full w-12 h-12 flex items-center justify-center mb-6 shadow-lg p-1.5">
              <Image
                src={feature.icon}
                width={30}
                height={30}
                alt={feature.title}
                priority
              />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-primary">
              {feature.title}
            </h3>
            <p className="text-primary/80">{feature.description}</p>
            <div className="flex justify-end ">
              <Link
                href={user ? feature.href : `/login?redirect=${feature.href}`}
              >
                <button className="mt-5 bg-gradient-to-r from-pink-400 to-primary/70 text-white px-5 py-2 rounded-full hover:from-pink-600 hover:to-primary transition transform hover:scale-105 inline-block shadow-lg">
                  Get Started Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
