import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RoomCard from "../../components/RoomCard";

// Example Rooms Data (replace with API call or backend data)
const allRooms = {
  amateur: [
    { id: 1, title: "Hot Amateur 1", description: "Intense amateur video.", thumbnail: "https://via.placeholder.com/320x180", embedUrl: "https://www.xvideos.com/embedvideo/12345", priceBTC: 0.001 },
    { id: 2, title: "Hot Amateur 2", description: "Shocking amateur moments.", thumbnail: "https://via.placeholder.com/320x180", embedUrl: "https://www.xvideos.com/embedvideo/12346", priceBTC: 0.002 },
    // Add more rooms
  ],
  blondes: [
    { id: 3, title: "Blonde Beauty 1", description: "Alluring blonde video.", thumbnail: "https://via.placeholder.com/320x180", embedUrl: "https://www.xvideos.com/embedvideo/22345", priceBTC: 0.0015 },
    { id: 4, title: "Blonde Beauty 2", description: "Vivid blonde moments.", thumbnail: "https://via.placeholder.com/320x180", embedUrl: "https://www.xvideos.com/embedvideo/22346", priceBTC: 0.0025 },
  ],
  // Add more categories
};

// Utility function to shuffle array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function BuildingPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (slug && allRooms[slug]) {
      setRooms(shuffleArray(allRooms[slug]));
    }
  }, [slug]);

  if (!slug || !allRooms[slug]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <h2 className="text-2xl text-red-500">Category not found.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-red-500">🔥 {slug.toUpperCase()}</h1>
          <nav>
            <a href="/" className="px-3 py-1 hover:text-red-400">Home</a>
            <a href="#contact" className="px-3 py-1 hover:text-red-400">Contact</a>
          </nav>
        </div>
      </header>

      {/* Rooms Grid */}
      <section className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            title={room.title}
            description={room.description}
            thumbnail={room.thumbnail}
            embedUrl={room.embedUrl}
            priceBTC={room.priceBTC}
          />
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

