/* ============================================================
   MAIN.JS — Handles:
   - Load Buildings on index.html
   - Load Rooms on building.html
   - Shuffle Rooms
   - Search & Filter
   - Modal View
   ============================================================ */

/* ============ UTILITY FUNCTIONS ============ */

// Shuffle array (Fisher-Yates)
function shuffleArray(array) {
  let i = array.length;
  while (i !== 0) {
    let r = Math.floor(Math.random() * i);
    i--;
    [array[i], array[r]] = [array[r], array[i]];
  }
  return array;
}

// Get URL parameter
function getParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

/* ============================================================
   LOAD BUILDINGS (index.html)
   ============================================================ */
if (document.body.classList.contains("index-page")) {
  fetch("data/buildings.json")
    .then(res => res.json())
    .then(buildings => {
      const container = document.getElementById("buildingsGrid");

      buildings.forEach(b => {
        container.innerHTML += `
          <div class="card" onclick="location.href='building.html?category=${encodeURIComponent(b.slug)}'">
            <img src="${b.thumbnail}" class="card-img" alt="${b.name}">
            <div class="card-body">
              <h3 class="card-title">${b.name}</h3>
              <p class="card-desc">${b.description}</p>
            </div>
          </div>
        `;
      });
    });
}

/* ============================================================
   LOAD ROOMS (building.html)
   ============================================================ */
if (document.body.classList.contains("building-page")) {
  const category = getParam("category");

  fetch("data/rooms.json")
    .then(res => res.json())
    .then(rooms => {
      // Filter by category
      let filtered = rooms.filter(r => r.category === category);

      // Shuffle every page load
      filtered = shuffleArray(filtered);

      const roomsGrid = document.getElementById("roomsGrid");
      const tagFilter = document.getElementById("tagFilter");
      const searchInput = document.getElementById("search");

      // Unique tags for filter
      let tags = new Set();
      filtered.forEach(r => r.tags.forEach(t => tags.add(t)));

      // Insert filter options
      tags.forEach(tag => {
        tagFilter.innerHTML += `<option value="${tag}">${tag}</option>`;
      });

      // Render Rooms
      function displayRooms(list) {
        roomsGrid.innerHTML = "";
        list.forEach(r => {
          roomsGrid.innerHTML += `
            <div class="room-card" data-title="${r.title}" data-tags="${r.tags.join(',')}">
              <img src="${r.thumbnail}" class="room-img" alt="${r.title}" onclick="openModal('${r.title}', '${r.thumbnail}', \`${r.description}\`)">
              <div class="room-body">
                <h3 class="room-title">${r.title}</h3>
                <p class="room-price text-red-400 font-bold">${r.price}</p>
              </div>
            </div>
          `;
        });
      }

      displayRooms(filtered);

      /* ============ SEARCH ============ */
      searchInput.addEventListener("input", () => {
        const text = searchInput.value.toLowerCase();
        const result = filtered.filter(r =>
          r.title.toLowerCase().includes(text) ||
          r.description.toLowerCase().includes(text)
        );
        displayRooms(result);
      });

      /* ============ TAG FILTER ============ */
      tagFilter.addEventListener("change", () => {
        const tag = tagFilter.value;

        if (tag === "All") {
          displayRooms(filtered);
        } else {
          const result = filtered.filter(r => r.tags.includes(tag));
          displayRooms(result);
        }
      });

    });
}

/* ============================================================
   MODAL HANDLING
   ============================================================ */
function openModal(title, thumbnail, description) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalThumbnail").src = thumbnail;
  document.getElementById("modalDescription").textContent = description;

  document.getElementById("modal").classList.remove("hidden");
}

document.getElementById("modalClose")?.addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

// Close modal when clicking outside
document.getElementById("modal")?.addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    document.getElementById("modal").classList.add("hidden");
  }
});
