import React from "react";
import Link from "next/link";
import BuildingCard from "../components/BuildingCard";

const buildings = [
  { id: 1, title: "Amateur", slug: "amateur", description: "Curated top amateur videos." },
  { id: 2, title: "Blondes", slug: "blondes", description: "All your favorite blondes." },
  { id: 3, title: "Anal", slug: "anal", description: "Hot anal content, shuffled daily." },
  { id: 4, title: "Threesome", slug: "threesome", description: "Curated threesomes playlists." },
  // Add more categories as needed
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-red-500">🔥 Very Hot Porn Videos</h1>
          <nav>
            <Link href="/"><a className="px-3 py-1 hover:text-red-400">Home</a></Link>
            <Link href="#contact"><a className="px-3 py-1 hover:text-red-400">Contact</a></Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-gray-800">
        <h2 className="text-4xl font-bold mb-4">Explore Thousands of Curated Videos</h2>
        <p className="text-lg max-w-2xl mx-auto text-gray-300">
          Browse our dynamic categories, find your favorite videos, and get exclusive curated playlists by requesting access.
        </p>
      </section>

      {/* Buildings / Categories */}
      <section className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {buildings.map((building) => (
          <BuildingCard key={building.id} title={building.title} slug={building.slug} description={building.description} />
        ))}
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 p-6 text-center text-gray-400">
        <p>Contact me on <a href="https://t.me/YourTelegram" className="text-red-500">Telegram</a> for access and payments.</p>
        <p>© 2025 Very Hot Porn Videos. All rights reserved.</p>
      </footer>
    </div>
  );
}

