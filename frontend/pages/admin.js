import React, { useState } from "react";

export default function AdminPage() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [priceBTC, setPriceBTC] = useState("");
  const [btcpayInvoice, setBtcpayInvoice] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, title, description, thumbnail, embedUrl, priceBTC, btcpayInvoice })
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Admin Dashboard</h1>
      {message && <p className="mb-4 text-green-400">{message}</p>}
      <form className="max-w-lg space-y-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 rounded text-black" required />
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 rounded text-black" required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 rounded text-black" />
        <input type="text" placeholder="Thumbnail URL" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className="w-full p-2 rounded text-black" />
        <input type="text" placeholder="Embed URL" value={embedUrl} onChange={(e) => setEmbedUrl(e.target.value)} className="w-full p-2 rounded text-black" required />
        <input type="number" placeholder="Price (BTC)" step="0.0001" value={priceBTC} onChange={(e) => setPriceBTC(e.target.value)} className="w-full p-2 rounded text-black" required />
        <input type="text" placeholder="BTCPay Invoice URL" value={btcpayInvoice} onChange={(e) => setBtcpayInvoice(e.target.value)} className="w-full p-2 rounded text-black" />
        <button type="submit" className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded font-bold w-full">Add Room</button>
      </form>
    </div>
  );
}
