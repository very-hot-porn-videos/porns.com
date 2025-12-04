import React, { useState } from "react";

export default function RoomCard({ title, description, thumbnail, embedUrl, priceBTC }) {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden transition duration-300 hover:bg-gray-600">
      {!showEmbed ? (
        <div onClick={() => setShowEmbed(true)} className="cursor-pointer">
          <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold text-red-500">{title}</h3>
            <p className="text-gray-300">{description}</p>
            <p className="mt-2 text-yellow-400 font-semibold">Price: {priceBTC} BTC</p>
            <p className="mt-2 text-sm text-gray-400">Click to preview video</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-48">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            allowFullScreen
            className="rounded-lg"
            title={title}
          ></iframe>
        </div>
      )}
    </div>
  );
}

