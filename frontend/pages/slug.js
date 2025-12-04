import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RoomCard from "../../components/RoomCard";

export default function BuildingPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Shuffle helper
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // Fetch rooms from backend
  const fetchRooms = async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/rooms/${slug}`);
      const data = await res.json();
      setRooms(shuffleArray(data));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, [slug]);

  if (loading) return <p className="text-white text-center mt-20">Loading...</p>;
  if (!rooms.length) return <p className="text-red-500 text-center mt-20">Category not found.</p>;

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

      {/* Refresh Button */}
      <div className="max-w-6xl mx-auto px-4 mt-6 flex justify-end">
        <button
          onClick={fetchRooms}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          🔄 Refresh Rooms
        </button>
      </div>

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
            btcpayInvoice={room.btcpayInvoice}
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
