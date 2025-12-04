const express = require("express");
const router = express.Router();

// Example data (replace with DB call)
const roomsData = {
  amateur: [
    {
      id: 1,
      title: "Hot Amateur 1",
      description: "Intense amateur video.",
      thumbnail: "https://via.placeholder.com/320x180",
      embedUrl: "https://www.xvideos.com/embedvideo/12345",
      priceBTC: 0.001,
      btcpayInvoice: "https://your-btcpay-link.com/invoice1"
    },
    {
      id: 2,
      title: "Hot Amateur 2",
      description: "Shocking amateur moments.",
      thumbnail: "https://via.placeholder.com/320x180",
      embedUrl: "https://www.xvideos.com/embedvideo/12346",
      priceBTC: 0.002,
      btcpayInvoice: "https://your-btcpay-link.com/invoice2"
    }
  ],
  blondes: [
    {
      id: 3,
      title: "Blonde Beauty 1",
      description: "Alluring blonde video.",
      thumbnail: "https://via.placeholder.com/320x180",
      embedUrl: "https://www.xvideos.com/embedvideo/22345",
      priceBTC: 0.0015,
      btcpayInvoice: "https://your-btcpay-link.com/invoice3"
    }
  ]
};

router.get("/:slug", (req, res) => {
  const { slug } = req.params;
  if (!roomsData[slug]) return res.status(404).json({ message: "Category not found" });

  // Shuffle rooms before sending
  const shuffled = roomsData[slug].sort(() => Math.random() - 0.5);
  res.json(shuffled);
});

module.exports = router;

