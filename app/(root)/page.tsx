// import Link from "next/link";
// import Features from "../../components/Features";
// import Hero from "@/components/Hero";
// import { getUser } from "@/lib/appwrite/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // const user = await getUser();

  redirect("/anonymous-message");

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 space-y-20 px-4 pt-24">
        {/* Hero Section */}
        {/* <Hero /> */}

        {/* <Features user={user} /> */}

        {/* Virtual Gifts Showcase */}

        {/* How It Works */}

        {/* Testimonials */}
        {/* <section className="bg-white bg-opacity-80 py-16 rounded-lg shadow-xl">
          <h2 className="text-4xl font-semibold text-center mb-12 text-red-700">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-100 to-pink-100 p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
              <p className="italic mb-4 text-red-700">
                &quot;This platform helped me express my feelings to my crush.
                It&apos;s amazing!&quot;
              </p>
              <p className="font-semibold text-red-600">- Anonymous User</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
              <p className="italic mb-4 text-purple-700">
                &quot;The virtual gifts are so cute! I love surprising my
                friends with them.&quot;
              </p>
              <p className="font-semibold text-purple-600">- Happy Sender</p>
            </div>
          </div>
        </section> */}

        {/* Footer */}
        {/* <footer className="bg-gradient-to-r from-red-800 to-pink-800 text-white py-12 rounded-t-lg shadow-inner">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h3 className="font-semibold text-xl mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-pink-300 transition"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="hover:text-pink-300 transition"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-pink-300 transition"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/terms"
                      className="hover:text-pink-300 transition"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="hover:text-pink-300 transition"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-pink-300 transition">
                    Facebook
                  </a>
                  <a href="#" className="hover:text-pink-300 transition">
                    Twitter
                  </a>
                  <a href="#" className="hover:text-pink-300 transition">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center text-pink-200">
              © 2023 FairLove. All rights reserved.
            </div>
          </div>
        </footer> */}
      </div>
    </div>
  );
}
