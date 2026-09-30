export interface PlanetSubClassDef {
  id: string;
  name: string;
  code: string;
  temperatureMin: number;
  temperatureMax: number;
  gravity: number; // G
  baseDiameterKm: number;
  maxFields: number;
  metalBonus: number; // %
  crystalBonus: number; // %
  deuteriumBonus: number; // %
  powerEfficiency: number; // %
  description: string;
}

export interface PlanetClassCategory {
  classId: string;
  className: string;
  categoryCode: string;
  description: string;
  subClasses: PlanetSubClassDef[];
}

export const PLANETARY_CLASSES_42: PlanetClassCategory[] = [
  {
  classId: 'terrestrial',
  className: "Class I: Crownlands & River Realms",
  categoryCode: 'TER',
  description: "Fertile river kingdoms, rolling green vales, and temperate lands beneath mild skies.",
  subClasses: [
    { id: 'ter-01', name: "Valewyn Crownland Vale", code: 'TER-A1', temperatureMin: -10, temperatureMax: 40, gravity: 1.0, baseDiameterKm: 12742, maxFields: 165, metalBonus: 0, crystalBonus: 0, deuteriumBonus: 0, powerEfficiency: 100, description: "A mild green valley of clear rivers, rich soil, orchard hamlets, and defensible hilltops." },
    { id: 'ter-02', name: "Sapphire Isles & Tide-Coast", code: 'TER-A2', temperatureMin: 10, temperatureMax: 55, gravity: 0.92, baseDiameterKm: 13200, maxFields: 180, metalBonus: -10, crystalBonus: +15, deuteriumBonus: +20, powerEfficiency: 95, description: "A sea-woven realm of bright islands, sheltered harbors, and volcanic shores." },
    { id: 'ter-03', name: "Frostpine Taiga March", code: 'TER-B1', temperatureMin: -45, temperatureMax: 15, gravity: 1.05, baseDiameterKm: 12100, maxFields: 150, metalBonus: +10, crystalBonus: -5, deuteriumBonus: +10, powerEfficiency: 90, description: "Dense evergreen woods and permafrost hills, rich in timber, iron, and winter herbs." },
    { id: 'ter-04', name: "Ambergrass Savanna", code: 'TER-B2', temperatureMin: 15, temperatureMax: 65, gravity: 0.98, baseDiameterKm: 11900, maxFields: 140, metalBonus: +15, crystalBonus: +10, deuteriumBonus: -15, powerEfficiency: 110, description: "Wide golden grasslands where herds roam between scattered groves and iron-rich ridges." },
    { id: 'ter-05', name: "Skyreach Alpine Plateau", code: 'TER-C1', temperatureMin: -30, temperatureMax: 25, gravity: 1.12, baseDiameterKm: 11500, maxFields: 130, metalBonus: +25, crystalBonus: +5, deuteriumBonus: 0, powerEfficiency: 105, description: "High mountain shelves and wind-carved passes dotted with watchtowers and crystal caves." },
    { id: 'ter-06', name: "Moonstone Deepdelve", code: 'TER-C2', temperatureMin: -5, temperatureMax: 35, gravity: 1.18, baseDiameterKm: 12800, maxFields: 190, metalBonus: +30, crystalBonus: +20, deuteriumBonus: -10, powerEfficiency: 100, description: "A honeycombed mountain realm of underground halls, glowing seams, and forge-cities." },
    { id: 'ter-07', name: "Crownwall Citylands", code: 'TER-D1', temperatureMin: 5, temperatureMax: 35, gravity: 1.0, baseDiameterKm: 14000, maxFields: 210, metalBonus: +10, crystalBonus: +10, deuteriumBonus: 0, powerEfficiency: 120, description: "A great walled city realm of gardens, guildhalls, markets, and towering keeps." },
  ],
},
{
  classId: 'desert',
  className: "Class II: Sunscar Deserts & Badlands",
  categoryCode: 'DES',
  description: "Scorching dunes, sun-split plateaus, red canyons, and rare oasis strongholds.",
  subClasses: [
    { id: 'des-01', name: "Sunscar Dune Sea", code: 'DES-A1', temperatureMin: 30, temperatureMax: 95, gravity: 0.88, baseDiameterKm: 10800, maxFields: 125, metalBonus: +15, crystalBonus: +25, deuteriumBonus: -25, powerEfficiency: 135, description: "Endless warm dunes of pale glass-sand beneath an unrelenting sun." },
    { id: 'des-02', name: "Saltwind White Flats", code: 'DES-A2', temperatureMin: 20, temperatureMax: 85, gravity: 0.95, baseDiameterKm: 11200, maxFields: 135, metalBonus: +20, crystalBonus: +20, deuteriumBonus: -20, powerEfficiency: 130, description: "Bright salt plains and dry basins crossed by caravans and windmills." },
    { id: 'des-03', name: "Redstone Badlands", code: 'DES-B1', temperatureMin: 25, temperatureMax: 105, gravity: 1.02, baseDiameterKm: 10500, maxFields: 120, metalBonus: +35, crystalBonus: +10, deuteriumBonus: -30, powerEfficiency: 140, description: "Rust-red canyons and hoodoo spires sheltering ore, outlaws, and forgotten shrines." },
    { id: 'des-04', name: "Emberglass Caldera", code: 'DES-B2', temperatureMin: 40, temperatureMax: 130, gravity: 1.1, baseDiameterKm: 11800, maxFields: 145, metalBonus: +40, crystalBonus: +15, deuteriumBonus: -10, powerEfficiency: 145, description: "Black basalt flows and fire-lit vents surround a vast volcanic bowl." },
    { id: 'des-05', name: "Gravelmark Wastes", code: 'DES-C1', temperatureMin: 15, temperatureMax: 80, gravity: 0.9, baseDiameterKm: 9900, maxFields: 110, metalBonus: +10, crystalBonus: +5, deuteriumBonus: -35, powerEfficiency: 125, description: "Rocky barrens, scattered cairns, and sparse scrub beneath a hard open sky." },
    { id: 'des-06', name: "Whispering Sand Erg", code: 'DES-C2', temperatureMin: 35, temperatureMax: 115, gravity: 0.85, baseDiameterKm: 10200, maxFields: 115, metalBonus: +12, crystalBonus: +30, deuteriumBonus: -25, powerEfficiency: 150, description: "Shifting dunes and wind-carved arches hide old roads beneath the sand." },
    { id: 'des-07', name: "Hiddenwell Oasis Trench", code: 'DES-D1', temperatureMin: 10, temperatureMax: 60, gravity: 1.0, baseDiameterKm: 12000, maxFields: 160, metalBonus: +5, crystalBonus: +20, deuteriumBonus: +10, powerEfficiency: 120, description: "A deep desert basin where hidden springs feed a chain of green sanctuaries." },
  ],
},
{
  classId: 'ice_frozen',
  className: "Class III: Frostfang Glaciers & Tundra",
  categoryCode: 'ICE',
  description: "Glacial frontiers and frozen holds where the northern lights shimmer over ancient ruins.",
  subClasses: [
    { id: 'ice-01', name: "Frostfang Glacier", code: 'ICE-A1', temperatureMin: -190, temperatureMax: -110, gravity: 0.82, baseDiameterKm: 9500, maxFields: 100, metalBonus: -10, crystalBonus: -20, deuteriumBonus: +40, powerEfficiency: 60, description: "A pale icebound frontier of crevasses, blue glaciers, and blizzard-swept peaks." },
    { id: 'ice-02', name: "Silvermoon Deepmere", code: 'ICE-A2', temperatureMin: -150, temperatureMax: -80, gravity: 0.78, baseDiameterKm: 10200, maxFields: 115, metalBonus: -5, crystalBonus: +10, deuteriumBonus: +50, powerEfficiency: 70, description: "A frozen lake-country whose warm hidden waters shelter luminous caverns." },
    { id: 'ice-03', name: "Wyrm-Breath Frozen Flats", code: 'ICE-B1', temperatureMin: -170, temperatureMax: -95, gravity: 0.85, baseDiameterKm: 9800, maxFields: 105, metalBonus: 0, crystalBonus: 0, deuteriumBonus: +60, powerEfficiency: 65, description: "A bitter plain of frost, blue fire, and strange crystals prized by alchemists." },
    { id: 'ice-04', name: "Icefire Geyserlands", code: 'ICE-B2', temperatureMin: -160, temperatureMax: -70, gravity: 1.25, baseDiameterKm: 15000, maxFields: 190, metalBonus: +20, crystalBonus: +15, deuteriumBonus: +45, powerEfficiency: 75, description: "Snowbound highlands broken by steaming springs and frost-rimed geysers." },
    { id: 'ice-05', name: "Snowbound Ironheart", code: 'ICE-C1', temperatureMin: -130, temperatureMax: -50, gravity: 0.95, baseDiameterKm: 11000, maxFields: 130, metalBonus: +15, crystalBonus: +10, deuteriumBonus: +30, powerEfficiency: 80, description: "A frozen realm whose dark stone core yields iron beneath the ice." },
    { id: 'ice-06', name: "Starfall Comet Cairn", code: 'ICE-C2', temperatureMin: -180, temperatureMax: -100, gravity: 0.65, baseDiameterKm: 8500, maxFields: 90, metalBonus: -15, crystalBonus: -10, deuteriumBonus: +55, powerEfficiency: 55, description: "A lonely ice-stone wilderness scattered with fallen sky-rocks and rare salts." },
    { id: 'ice-07', name: "Glacial Abyss March", code: 'ICE-D1', temperatureMin: -140, temperatureMax: -60, gravity: 1.05, baseDiameterKm: 12500, maxFields: 165, metalBonus: +25, crystalBonus: +20, deuteriumBonus: +35, powerEfficiency: 85, description: "Deep ice rifts warmed by hot springs and threaded with hidden passages." },
  ],
},
{
  classId: 'volcanic_magma',
  className: "Class IV: Emberfall Volcanoes & Cinderlands",
  categoryCode: 'VOL',
  description: "Volcanic marches of ember peaks, ashfall, molten rivers, and master-smiths’ deep forges.",
  subClasses: [
    { id: 'vol-01', name: "Emberfall Lava Sea", code: 'VOL-A1', temperatureMin: 200, temperatureMax: 650, gravity: 1.15, baseDiameterKm: 11000, maxFields: 140, metalBonus: +50, crystalBonus: +40, deuteriumBonus: +10, powerEfficiency: 180, description: "A fire realm of molten rivers, obsidian cliffs, and smoke-veiled peaks." },
    { id: 'vol-02', name: "Sulfur Crown Caldera", code: 'VOL-A2', temperatureMin: 150, temperatureMax: 480, gravity: 0.9, baseDiameterKm: 10400, maxFields: 120, metalBonus: +35, crystalBonus: +50, deuteriumBonus: 0, powerEfficiency: 160, description: "Sulfurous vents and steaming highlands ring a smoldering crown-shaped crater." },
    { id: 'vol-03', name: "Thunder Rift March", code: 'VOL-B1', temperatureMin: 120, temperatureMax: 400, gravity: 1.2, baseDiameterKm: 12200, maxFields: 170, metalBonus: +60, crystalBonus: +30, deuteriumBonus: +15, powerEfficiency: 170, description: "A broken land split by deep ravines, rich veins, and storm-lit cliffs." },
    { id: 'vol-04', name: "Ashen Basalt Reach", code: 'VOL-B2', temperatureMin: 180, temperatureMax: 550, gravity: 0.98, baseDiameterKm: 9900, maxFields: 110, metalBonus: +45, crystalBonus: +35, deuteriumBonus: +5, powerEfficiency: 190, description: "A dark volcanic realm where black stone plains meet towering fire mountains." },
    { id: 'vol-05', name: "Pyrefall Ash March", code: 'VOL-C1', temperatureMin: 100, temperatureMax: 350, gravity: 1.05, baseDiameterKm: 11500, maxFields: 150, metalBonus: +40, crystalBonus: +20, deuteriumBonus: +20, powerEfficiency: 150, description: "Thick ash clouds drift above fertile dark-soil basins and ember-lit hills." },
    { id: 'vol-06', name: "Ironheart Magma Reach", code: 'VOL-C2', temperatureMin: 250, temperatureMax: 720, gravity: 1.35, baseDiameterKm: 11800, maxFields: 160, metalBonus: +75, crystalBonus: +25, deuteriumBonus: 0, powerEfficiency: 200, description: "A mighty iron-rich mountain heart glows with deep heat and forge-fire." },
    { id: 'vol-07', name: "Cinderdeep Springs", code: 'VOL-D1', temperatureMin: 140, temperatureMax: 450, gravity: 1.08, baseDiameterKm: 12800, maxFields: 175, metalBonus: +55, crystalBonus: +45, deuteriumBonus: +25, powerEfficiency: 165, description: "Warm hidden springs rise through cinder fields and glowing cavern mouths." },
  ],
},
{
  classId: 'gas_giant',
  className: "Class V: Cloudreaches & Sky-Isles",
  categoryCode: 'GAS',
  description: "Enchanted cloud realms and impossible sky-isles circling beneath towering storm crowns.",
  subClasses: [
    { id: 'gas-01', name: "Cloudreach Sky-Sea", code: 'GAS-A1', temperatureMin: -140, temperatureMax: -30, gravity: 2.5, baseDiameterKm: 142000, maxFields: 350, metalBonus: -50, crystalBonus: -50, deuteriumBonus: +200, powerEfficiency: 80, description: "A vast sky realm of pale cloud oceans and lofty floating strongholds." },
    { id: 'gas-02', name: "Jovian Storm Crown", code: 'GAS-A2', temperatureMin: 400, temperatureMax: 1400, gravity: 3.1, baseDiameterKm: 180000, maxFields: 400, metalBonus: -40, crystalBonus: -30, deuteriumBonus: +250, powerEfficiency: 220, description: "A colossal cloud kingdom crowned by mighty winds and bright stormfire." },
    { id: 'gas-03', name: "Frostcloud High Reach", code: 'GAS-B1', temperatureMin: -180, temperatureMax: -90, gravity: 1.8, baseDiameterKm: 49000, maxFields: 250, metalBonus: -20, crystalBonus: 0, deuteriumBonus: +150, powerEfficiency: 90, description: "Cold cloudlands with icy rain, deep blue mists, and hidden aerial keeps." },
    { id: 'gas-04', name: "Stormglass Cloudlands", code: 'GAS-B2', temperatureMin: -110, temperatureMax: -20, gravity: 2.1, baseDiameterKm: 95000, maxFields: 300, metalBonus: -45, crystalBonus: -40, deuteriumBonus: +300, powerEfficiency: 100, description: "A sky realm of brilliant stormlight, rare star-metal, and charged winds." },
    { id: 'gas-05', name: "Ringcrown Sky-Holds", code: 'GAS-C1', temperatureMin: -130, temperatureMax: -40, gravity: 2.3, baseDiameterKm: 120000, maxFields: 320, metalBonus: -30, crystalBonus: +50, deuteriumBonus: +180, powerEfficiency: 95, description: "A chain of high citadels and frozen sky-stones encircling a vast cloud realm." },
    { id: 'gas-06', name: "Emberstar Wyrm-Nest", code: 'GAS-C2', temperatureMin: 500, temperatureMax: 1800, gravity: 4.5, baseDiameterKm: 85000, maxFields: 280, metalBonus: 0, crystalBonus: +20, deuteriumBonus: +400, powerEfficiency: 300, description: "A fiery upper sky where ancient wyrms nest among burning clouds." },
    { id: 'gas-07', name: "Thunderhead Sky March", code: 'GAS-D1', temperatureMin: -90, temperatureMax: 10, gravity: 2.8, baseDiameterKm: 155000, maxFields: 380, metalBonus: -50, crystalBonus: -20, deuteriumBonus: +280, powerEfficiency: 140, description: "A storm-wracked skyland whose lightning crowns the far horizon." },
  ],
},
{
  classId: 'exotic_moon',
  className: "Class VI: Moonholds, Sky-Stones & Ley Beacons",
  categoryCode: 'MOON',
  description: "Small moon-realms and sky-stones marked by old runes, hidden keeps, and leyline shrines.",
  subClasses: [
    { id: 'mon-01', name: "Wayward Stone Moon", code: 'MON-A1', temperatureMin: -100, temperatureMax: 80, gravity: 0.35, baseDiameterKm: 450, maxFields: 75, metalBonus: +30, crystalBonus: +40, deuteriumBonus: -10, powerEfficiency: 110, description: "A small wandering moon rich in ore, gemstones, and ancient cairns." },
    { id: 'mon-02', name: "Moonshadow Twinlight", code: 'MON-A2', temperatureMin: -120, temperatureMax: 110, gravity: 0.42, baseDiameterKm: 1200, maxFields: 95, metalBonus: +40, crystalBonus: +30, deuteriumBonus: 0, powerEfficiency: 120, description: "A tidally divided moon of bright daylands and cold shadowed valleys." },
    { id: 'mon-03', name: "Skyforge Ringholds", code: 'MON-B1', temperatureMin: -50, temperatureMax: 50, gravity: 0.1, baseDiameterKm: 100, maxFields: 120, metalBonus: +50, crystalBonus: +60, deuteriumBonus: +50, powerEfficiency: 400, description: "Tiny rune-forged keeps among a circle of bright sky-stones." },
    { id: 'mon-04', name: "Moonstone Resonance Vale", code: 'MON-B2', temperatureMin: -60, temperatureMax: 40, gravity: 0.5, baseDiameterKm: 2100, maxFields: 110, metalBonus: +10, crystalBonus: +90, deuteriumBonus: +10, powerEfficiency: 130, description: "A crystalline hollow whose ancient stones hum with the leyline’s power." },
    { id: 'mon-05', name: "Ironheart Cairn", code: 'MON-C1', temperatureMin: -40, temperatureMax: 120, gravity: 0.58, baseDiameterKm: 1800, maxFields: 100, metalBonus: +90, crystalBonus: 0, deuteriumBonus: -20, powerEfficiency: 125, description: "A compact iron-rich moon scarred by old mines and meteor falls." },
    { id: 'mon-06', name: "Dragonflame Ember Moon", code: 'MON-C2', temperatureMin: 20, temperatureMax: 150, gravity: 0.48, baseDiameterKm: 1500, maxFields: 90, metalBonus: +20, crystalBonus: +20, deuteriumBonus: +80, powerEfficiency: 250, description: "A warm, ember-lit moon threaded with rare fire-stones and hot springs." },
    { id: 'mon-07', name: "Leyline Beacon Cairn", code: 'MON-D1', temperatureMin: -20, temperatureMax: 20, gravity: 0.2, baseDiameterKm: 300, maxFields: 150, metalBonus: +50, crystalBonus: +100, deuteriumBonus: +100, powerEfficiency: 500, description: "An ancient rune beacon on a lonely moon, guiding travelers across the dark." },
  ],
},
];
