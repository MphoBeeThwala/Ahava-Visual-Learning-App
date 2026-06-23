export const experiences = [
  { id: 1, title: "Serengeti Great Migration", category: "nature", subcategory: "wildlife", country: "Tanzania", grade: "4-9", duration: 900, rating: 4.8, reviews: 234, image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80", premium: false, vr: true, offline: true, description: "Witness one of Earth's greatest wildlife spectacles. Over 1.5 million wildebeest and zebras cross the Serengeti in search of fresh grazing.", learning: ["Animal migration patterns", "Ecosystem interdependence", "Predator-prey dynamics", "Conservation challenges"] },
  { id: 2, title: "The Grand Canyon Layers", category: "nature", subcategory: "canyons", country: "USA", grade: "6-12", duration: 1200, rating: 4.9, reviews: 412, image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=600&q=80", premium: false, vr: true, offline: true, description: "Explore 2 billion years of Earth's history carved into rock. Each colorful layer tells a different geological story.", learning: ["Rock stratification", "Geological time scales", "Erosion processes", "Color mineralogy"] },
  { id: 3, title: "Great Barrier Reef Dive", category: "nature", subcategory: "reefs", country: "Australia", grade: "5-10", duration: 600, rating: 4.7, reviews: 189, image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&q=80", premium: false, vr: true, offline: true, description: "Descend into the world's largest coral reef system. Discover marine biodiversity and the threats facing coral ecosystems.", learning: ["Coral biology and symbiosis", "Marine biodiversity", "Ocean acidification", "Conservation efforts"] },
  { id: 4, title: "Machu Picchu: Lost City", category: "history", subcategory: "monuments", country: "Peru", grade: "7-12", duration: 1500, rating: 4.9, reviews: 567, image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80", premium: true, vr: true, offline: false, description: "Walk through the Inca citadel abandoned in the 16th century. Discover advanced engineering, astronomy, and agricultural terraces.", learning: ["Inca engineering techniques", "Astronomical alignment", "Agricultural terraces", "Spanish colonization impact"] },
  { id: 5, title: "Amazon Rainforest Canopy", category: "nature", subcategory: "rainforests", country: "Brazil", grade: "3-8", duration: 800, rating: 4.6, reviews: 156, image: "https://images.unsplash.com/photo-1591086700348-d4f2a7406f81?w=600&q=80", premium: false, vr: true, offline: true, description: "Rise through the layers of the world's largest rainforest. From forest floor to emergent layer, discover biodiversity at every level.", learning: ["Rainforest layers", "Biodiversity hotspots", "Photosynthesis at scale", "Indigenous knowledge"] },
  { id: 6, title: "Antarctic Ice Sheets", category: "nature", subcategory: "glaciers", country: "Antarctica", grade: "8-12", duration: 1000, rating: 4.8, reviews: 98, image: "https://images.unsplash.com/photo-1520638023360-6def43369781?w=600&q=80", premium: true, vr: true, offline: false, description: "Stand on the edge of the world's largest ice sheet. Learn about glaciology, climate science, and the animals that survive extreme cold.", learning: ["Glacier formation", "Climate indicators", "Polar wildlife adaptation", "Sea level rise"] },
  { id: 7, title: "Victoria Falls Thunder", category: "nature", subcategory: "waterfalls", country: "Zambia/Zimbabwe", grade: "4-9", duration: 700, rating: 4.7, reviews: 178, image: "https://images.unsplash.com/photo-1603204077779-bed963ea3d0a?w=600&q=80", premium: false, vr: false, offline: true, description: "The largest curtain of falling water in the world. Local name: Mosi-oa-Tunya — 'The Smoke That Thunders.'", learning: ["Water erosion and geology", "Zambezi River ecology", "Hydroelectric power", "Local cultural significance"] },
  { id: 8, title: "Northern Lights Norway", category: "nature", subcategory: "space", country: "Norway", grade: "6-12", duration: 600, rating: 4.9, reviews: 312, image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80", premium: true, vr: true, offline: false, description: "Witness the aurora borealis from Tromsø. Understand the physics of charged particles colliding with Earth's atmosphere.", learning: ["Solar wind and magnetosphere", "Atmospheric chemistry", "Photography in low light", "Arctic ecology"] },
  { id: 9, title: "Petra: The Treasury", category: "history", subcategory: "monuments", country: "Jordan", grade: "7-12", duration: 1100, rating: 4.8, reviews: 245, image: "https://images.unsplash.com/photo-1579606038888-82c0f02f7f89?w=600&q=80", premium: true, vr: true, offline: false, description: "Enter the rose-red city through the Siq and behold the Treasury carved into solid rock 2,000 years ago.", learning: ["Nabataean engineering", "Water management in deserts", "Trade route significance", "Rock-cut architecture"] },
  { id: 10, title: "Yellowstone Geysers", category: "nature", subcategory: "volcanoes", country: "USA", grade: "5-10", duration: 800, rating: 4.7, reviews: 201, image: "https://images.unsplash.com/photo-1565619624098-e1a6c9a79a9e?w=600&q=80", premium: false, vr: true, offline: true, description: "Explore the world's first national park. Geysers, hot springs, and the largest supervolcano on the continent.", learning: ["Geothermal activity", "Supervolcanoes", "Hot spring ecosystems", "Conservation history"] },
  { id: 11, title: "ISS: Space Station Tour", category: "stem", subcategory: "space", country: "Low Earth Orbit", grade: "8-12", duration: 1800, rating: 4.9, reviews: 89, image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80", premium: true, vr: true, offline: false, description: "Float through the International Space Station. See where astronauts live, work, and conduct experiments in microgravity.", learning: ["Microgravity physics", "Space station engineering", "International cooperation", "Life support systems"] },
  { id: 12, title: "Angkor Wat Temples", category: "history", subcategory: "monuments", country: "Cambodia", grade: "6-12", duration: 1300, rating: 4.8, reviews: 276, image: "https://images.unsplash.com/photo-1600669906909-7b1f3c5b3b5c?w=600&q=80", premium: true, vr: true, offline: false, description: "The world's largest religious monument. Hindu architecture that later became Buddhist. Explore intricate carvings and massive moats.", learning: ["Khmer architecture", "Hindu-Buddhist syncretism", "Water management", "Jungle reclamation"] },
  // STEM
  { id: 13, title: "The Human Heart: Up Close", category: "stem", subcategory: "biology", country: "Human Body", grade: "6-12", duration: 900, rating: 4.9, reviews: 312, image: "https://images.unsplash.com/photo-1615461066842-32561977e3d8?w=600&q=80", premium: false, vr: false, offline: true, description: "Layer-by-layer interactive dissection of the human heart. From external anatomy to blood flow pathways — no scalpel required.", learning: ["Cardiac anatomy", "Blood circulation pathways", "Valve function", "Heart rate and exercise"] },
  { id: 14, title: "Plant Cell Explorer", category: "stem", subcategory: "biology", country: "Lab", grade: "4-8", duration: 600, rating: 4.7, reviews: 198, image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80", premium: false, vr: false, offline: true, description: "Journey inside a plant cell. Click on organelles to discover their functions — from chloroplasts to the nucleus.", learning: ["Cell structure and function", "Photosynthesis", "Organelle roles", "Cellular respiration"] },
  { id: 15, title: "DNA: The Code of Life", category: "stem", subcategory: "biology", country: "Lab", grade: "8-12", duration: 700, rating: 4.8, reviews: 245, image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=600&q=80", premium: false, vr: false, offline: true, description: "Explore the double helix structure of DNA. Understand base pairing, gene expression, and how 3 billion base pairs code for every protein.", learning: ["DNA structure", "Base pairing rules", "Gene expression", "Mutation and variation"] },
  { id: 16, title: "Acid-Base Titration Lab", category: "stem", subcategory: "chemistry", country: "Lab", grade: "9-12", duration: 800, rating: 4.6, reviews: 167, image: "https://images.unsplash.com/photo-1608037521240-15288b5fe5d8?w=600&q=80", premium: false, vr: false, offline: true, description: "Conduct a virtual titration experiment. Add base to acid and watch the pH change in real-time.", learning: ["Acid-base neutralization", "pH and indicators", "Titration technique", "Stoichiometry"] },
  { id: 17, title: "Periodic Table Explorer", category: "stem", subcategory: "chemistry", country: "Lab", grade: "6-12", duration: 600, rating: 4.8, reviews: 289, image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80", premium: false, vr: false, offline: true, description: "Interactive periodic table with element properties, electron configurations, and real-world applications.", learning: ["Element classification", "Periodic trends", "Electron configuration", "Chemical bonding"] },
  { id: 18, title: "Chemical Reaction Simulator", category: "stem", subcategory: "chemistry", country: "Lab", grade: "8-12", duration: 700, rating: 4.5, reviews: 134, image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80", premium: false, vr: false, offline: true, description: "Mix virtual chemicals and observe reactions. From combustion to precipitation, see chemical equations come to life.", learning: ["Balancing chemical equations", "Types of reactions", "Conservation of mass", "Energy changes"] },
  { id: 19, title: "Pendulum Physics Lab", category: "stem", subcategory: "physics", country: "Lab", grade: "7-12", duration: 800, rating: 4.7, reviews: 176, image: "https://images.unsplash.com/photo-1509228463848-7b2f4d8e6b1e?w=600&q=80", premium: false, vr: false, offline: true, description: "Adjust pendulum length, mass, and gravity to discover the period formula. Test on Earth, the Moon, and Jupiter.", learning: ["Simple harmonic motion", "Period and frequency", "Gravitational effects", "Energy conservation"] },
  { id: 20, title: "Wave Interference Simulator", category: "stem", subcategory: "physics", country: "Lab", grade: "9-12", duration: 700, rating: 4.6, reviews: 145, image: "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=600&q=80", premium: false, vr: false, offline: true, description: "Create two overlapping waves and observe constructive and destructive interference.", learning: ["Wave properties", "Constructive interference", "Destructive interference", "Superposition principle"] }
]

export const categories = [
  { id: 'all', label: 'All', icon: '🌍' },
  { id: 'nature', label: '🌿 Nature', icon: '🌿' },
  { id: 'history', label: '🏛️ History', icon: '🏛️' },
  { id: 'stem', label: '🔬 STEM', icon: '🔬' },
  { id: 'culture', label: '🎭 Culture', icon: '🎭' },
  { id: 'conservation', label: '🌱 Conservation', icon: '🌱' }
]

export const stemSubcategories = [
  { id: 'biology', label: 'Biology', color: '#E91E63' },
  { id: 'chemistry', label: 'Chemistry', color: '#7C4DFF' },
  { id: 'physics', label: 'Physics', color: '#00BCD4' },
  { id: 'space', label: 'Space', color: '#3F51B5' }
]

export const badges = [
  { id: 1, name: "First Safari", icon: "🦁", earned: true },
  { id: 2, name: "Deep Sea Diver", icon: "🤿", earned: true },
  { id: 3, name: "Mountain Climber", icon: "⛰️", earned: true },
  { id: 4, name: "Space Cadet", icon: "🚀", earned: true },
  { id: 5, name: "Historian", icon: "📜", earned: true },
  { id: 6, name: "Cave Explorer", icon: "🦇", earned: false },
  { id: 7, name: "Arctic Survivor", icon: "🐻‍❄️", earned: false },
  { id: 8, name: "Volcanologist", icon: "🌋", earned: false },
  { id: 9, name: "Rainforest Ranger", icon: "🐸", earned: true },
  { id: 10, name: "Desert Wanderer", icon: "🐪", earned: false },
  { id: 11, name: "Reef Guardian", icon: "🐠", earned: true },
  { id: 12, name: "Stargazer", icon: "🔭", earned: false },
  { id: 13, name: "Heart Surgeon", icon: "🫀", earned: true },
  { id: 14, name: "Cell Biologist", icon: "🧫", earned: true },
  { id: 15, name: "DNA Decoder", icon: "🧬", earned: false },
  { id: 16, name: "Chemist", icon: "⚗️", earned: true },
  { id: 17, name: "Physicist", icon: "🔭", earned: false },
  { id: 18, name: "Lab Master", icon: "🥼", earned: false }
]

export const cellData = {
  chloroplast: { name: "Chloroplast", func: "Where photosynthesis happens! Contains chlorophyll that captures light energy and converts CO₂ + H₂O into glucose and oxygen.", color: "#66bb6a" },
  nucleus: { name: "Nucleus", func: "The cell's control center. Contains DNA — the genetic blueprint that tells the cell what proteins to make and when to divide.", color: "#5d4037" },
  vacuole: { name: "Vacuole", func: "A large water-filled sac that maintains turgor pressure (keeps the cell rigid). Stores nutrients, waste, and pigments.", color: "#ce93d8" }
}

export const organLayerInfo = [
  { title: "External Anatomy", text: "The human heart is about the size of a fist, weighing 250-350g. It sits slightly left of center in the chest, protected by the rib cage. The pericardium is a double-walled sac that surrounds and protects the heart." },
  { title: "The Four Chambers", text: "The heart has 4 chambers: Right Atrium (receives deoxygenated blood), Right Ventricle (pumps to lungs), Left Atrium (receives oxygenated blood), and Left Ventricle (pumps to body). The left ventricle has the thickest wall because it pumps blood to the entire body." },
  { title: "Valves & Vessels", text: "Four valves prevent backflow: Tricuspid (RA→RV), Pulmonary (RV→lungs), Mitral (LA→LV), and Aortic (LV→body). Major vessels: Aorta (largest artery), Vena Cava (largest vein), Pulmonary arteries and veins." },
  { title: "Blood Flow Simulation", text: "Deoxygenated blood enters the right atrium → right ventricle → pulmonary artery → lungs (pick up O₂) → pulmonary veins → left atrium → left ventricle → aorta → body. The heart beats ~100,000 times per day!" }
]

export const periodicData = [
  {s:"H",n:1,nm:"Hydrogen",g:1,p:1},{s:"He",n:2,nm:"Helium",g:18,p:1},{s:"Li",n:3,nm:"Lithium",g:1,p:2},{s:"Be",n:4,nm:"Beryllium",g:2,p:2},{s:"B",n:5,nm:"Boron",g:13,p:2},{s:"C",n:6,nm:"Carbon",g:14,p:2},{s:"N",n:7,nm:"Nitrogen",g:15,p:2},{s:"O",n:8,nm:"Oxygen",g:16,p:2},{s:"F",n:9,nm:"Fluorine",g:17,p:2},{s:"Ne",n:10,nm:"Neon",g:18,p:2},
  {s:"Na",n:11,nm:"Sodium",g:1,p:3},{s:"Mg",n:12,nm:"Magnesium",g:2,p:3},{s:"Al",n:13,nm:"Aluminium",g:13,p:3},{s:"Si",n:14,nm:"Silicon",g:14,p:3},{s:"P",n:15,nm:"Phosphorus",g:15,p:3},{s:"S",n:16,nm:"Sulfur",g:16,p:3},{s:"Cl",n:17,nm:"Chlorine",g:17,p:3},{s:"Ar",n:18,nm:"Argon",g:18,p:3},
  {s:"K",n:19,nm:"Potassium",g:1,p:4},{s:"Ca",n:20,nm:"Calcium",g:2,p:4},{s:"Sc",n:21,nm:"Scandium",g:3,p:4},{s:"Ti",n:22,nm:"Titanium",g:4,p:4},{s:"V",n:23,nm:"Vanadium",g:5,p:4},{s:"Cr",n:24,nm:"Chromium",g:6,p:4},{s:"Mn",n:25,nm:"Manganese",g:7,p:4},{s:"Fe",n:26,nm:"Iron",g:8,p:4},{s:"Co",n:27,nm:"Cobalt",g:9,p:4},{s:"Ni",n:28,nm:"Nickel",g:10,p:4},{s:"Cu",n:29,nm:"Copper",g:11,p:4},{s:"Zn",n:30,nm:"Zinc",g:12,p:4},{s:"Ga",n:31,nm:"Gallium",g:13,p:4},{s:"Ge",n:32,nm:"Germanium",g:14,p:4},{s:"As",n:33,nm:"Arsenic",g:15,p:4},{s:"Se",n:34,nm:"Selenium",g:16,p:4},{s:"Br",n:35,nm:"Bromine",g:17,p:4},{s:"Kr",n:36,nm:"Krypton",g:18,p:4}
]

export const elementGroupColors = {
  1: '#ef5350', 2: '#ffa726', 13: '#ab47bc', 14: '#66bb6a', 15: '#42a5f5', 16: '#26c6da', 17: '#7e57c2', 18: '#ec407a'
}

export const elementDescriptions = {
  H: "The lightest element. Makes up 75% of the universe's mass. Essential for water and life.",
  He: "Second lightest element. Used in balloons, MRI machines, and as a cooling agent.",
  Li: "Lightest metal. Used in rechargeable batteries and some psychiatric medications.",
  C: "Basis of all organic life. Can form diamonds, graphite, and countless compounds.",
  O: "Essential for respiration. Makes up 21% of Earth's atmosphere and 65% of human body mass.",
  Fe: "Most common element on Earth by mass. Essential for blood (hemoglobin) and steel production.",
  Au: "Gold. One of the least reactive metals. Used in jewelry, electronics, and as a monetary standard."
}
