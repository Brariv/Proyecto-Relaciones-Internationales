// Normalizes GeoJSON country names (as they come from the world-atlas
// topojson) to the Spanish country names used in data/start/map.md, so the
// world map can flag which countries have a UVG partner university.
export const COUNTRY_NAME_MAP = {
  "united states of america": "estados unidos",
  usa: "estados unidos",
  germany: "alemania",
  spain: "españa",
  japan: "japón",
  japon: "japón",
  canada: "canadá",
  canadá: "canadá",
  france: "francia",
  italy: "italia",
  ecuador: "ecuador",
  panama: "panamá",
  panamá: "panamá",
  norway: "noruega",
  "el salvador": "el salvador",
  "costa rica": "costa rica",
  colombia: "colombia",
  taiwan: "taiwán",
  taiwán: "taiwán",
};
