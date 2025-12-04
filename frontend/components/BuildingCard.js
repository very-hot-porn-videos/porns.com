import React from "react";
import Link from "next/link";

export default function BuildingCard({ title, slug, description }) {
  return (
    <Link href={`/building/${slug}`}>
      <a className="block bg-gray-700 hover:bg-gray-600 rounded-lg shadow-lg p-6 transition duration-300">
        <h3 className="text-xl font-bold text-red-500 mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </a>
    </Link>
  );
}

