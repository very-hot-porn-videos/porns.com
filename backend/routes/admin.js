const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Path to JSON file storing Rooms (replace with DB in production)
const roomsFilePath = path.join(__dirname, "../../data/rooms.json");

// Helper: Read Rooms
const readRooms = () => {
  if (!fs.existsSync(roomsFilePath)) return {};
  return JSON.parse(fs.readFileSync(roomsFilePath, "utf-8"));
};

// Helper: Write Rooms
const writeRooms = (data) => {
  fs.writeFileSync(roomsFilePath, JSON.stringify(data, null, 2));
};

// Add new Room
router.post("/add", (req, res) => {
  const { category, title, description, thumbnail, embedUrl, priceBTC, btcpayInvoice } = req.body;
  if (!category || !title || !embedUrl || !priceBTC) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const roomsData = readRooms();
  if (!roomsData[category]) roomsData[category] = [];

  const newRoom = {
    id: Date.now(),
    title,
    description: description || "",
    thumbnail: thumbnail || "",
    embedUrl,
    priceBTC,
    btcpayInvoice: btcpayInvoice || ""
  };

  roomsData[category].push(newRoom);
  writeRooms(roomsData);

  res.json({ message: "Room added successfully", room: newRoom });
});

// Optional: Delete Room
router.delete("/delete/:category/:id", (req, res) => {
  const { category, id } = req.params;
  const roomsData = readRooms();
  if (!roomsData[category]) return res.status(404).json({ message: "Category not found" });

  roomsData[category] = roomsData[category].filter((room) => room.id != id);
  writeRooms(roomsData);
  res.json({ message: "Room deleted successfully" });
});
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

module.exports = router;
