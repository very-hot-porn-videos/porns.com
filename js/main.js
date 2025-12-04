// Get category from URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "All";

// Fetch rooms
fetch("data/rooms.json")
  .then(res => res.json())
  .then(data => {
    // Filter by category (optional: match first tag)
    let rooms = data.filter(room => category === "All" || room.tags.includes(category));

    // Shuffle rooms
    rooms = rooms.sort(() => Math.random() - 0.5);

    // Populate tag filter dropdown
    const tagSet = new Set();
    rooms.forEach(r => r.tags.forEach(t => tagSet.add(t)));
    const tagFilter = document.getElementById("tagFilter");
    tagSet.forEach(tag => {
      const option = document.createElement("option");
      option.value = tag;
      option.textContent = tag;
      tagFilter.appendChild(option);
    });

    const roomsGrid = document.getElementById("roomsGrid");

    function displayRooms(filteredRooms) {
      roomsGrid.innerHTML = "";
      filteredRooms.forEach(room => {
        const card = document.createElement("div");
        card.className = "room-card rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition duration-300 border " + (room.hotPick ? "border-yellow-400" : "border-gray-700");
        card.innerHTML = `
          <img src="${room.thumbnail}" alt="${room.title}" class="w-full h-48 object-cover">
          <div class="p-4 bg-gray-800">
            <h3 class="text-xl font-bold ${room.hotPick ? "text-yellow-400" : "text-red-500"}">${room.title}</h3>
            <p class="text-gray-300 mt-2">${room.description}</p>
            ${room.hotPick ? `<span class="inline-block mt-2 bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold">🔥 Hot Pick</span>` : ""}
          </div>
        `;
        card.onclick = () => openModal(room);
        roomsGrid.appendChild(card);
      });
    }

    // Initial display
    displayRooms(rooms);

    // Search & Tag Filter
    document.getElementById("search").addEventListener("input", e => {
      const term = e.target.value.toLowerCase();
      const filtered = rooms.filter(r => r.title.toLowerCase().includes(term) || r.description.toLowerCase().includes(term));
      const tag = tagFilter.value;
      const finalFiltered = filtered.filter(r => tag === "All" || r.tags.includes(tag));
      displayRooms(finalFiltered);
    });

    tagFilter.addEventListener("change", e => {
      const tag = e.target.value;
      const term = document.getElementById("search").value.toLowerCase();
      const filtered = rooms.filter(r => r.title.toLowerCase().includes(term) || r.description.toLowerCase().includes(term));
      const finalFiltered = filtered.filter(r => tag === "All" || r.tags.includes(tag));
      displayRooms(finalFiltered);
    });
  });

// Modal Functions
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalThumbnail = document.getElementById("modalThumbnail");
const modalTelegram = document.getElementById("modalTelegram");

function openModal(room) {
  modalTitle.textContent = room.title;
  modalDescription.textContent = room.description;
  modalThumbnail.src = room.thumbnail;
  modalTelegram.href = "https://t.me/YourTelegram";
  modal.classList.remove("hidden");
}

modalClose.onclick = () => modal.classList.add("hidden");
window.onclick = (e) => { if (e.target === modal) modal.classList.add("hidden"); }
