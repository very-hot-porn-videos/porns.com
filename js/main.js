// Sample JSON of Buildings
const buildings = [
  { id: 1, name: "Blonde", thumbnail: "images/buildings/blonde.jpg" },
  { id: 2, name: "Couples", thumbnail: "images/buildings/couples.jpg" },
  { id: 3, name: "Amateur", thumbnail: "images/buildings/amateur.jpg" },
  { id: 4, name: "MILF", thumbnail: "images/buildings/milf.jpg" },
  // Add as many categories as you want
];

const buildingsSection = document.getElementById("buildings");

buildings.forEach(building => {
  const card = document.createElement("div");
  card.className = "building-card rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition duration-300";

  card.innerHTML = `
    <img src="${building.thumbnail}" alt="${building.name}" class="w-full h-48 object-cover">
    <div class="p-4 bg-gray-800">
      <h3 class="text-xl font-bold text-red-500">${building.name}</h3>
      <p class="text-gray-300 mt-2">Click to explore vivid rooms</p>
    </div>
  `;

  card.onclick = () => {
    window.location.href = `building.html?category=${building.name}`;
  }

  buildingsSection.appendChild(card);
});

