// Maps a raw entry from data/start/map.md (field names per docs/Format_Page.md
// > Inicio > Mapa) into the shape consumed by WorldMapSection's client script
// and DestinationsRedirectSection's region counts.
export interface RawDestination {
  id: string;
  nombrePais: string;
  flag: string;
  continente: string;
  ciudad: string;
  universidad: string;
  lat: number;
  lng: number;
  estado: "available" | "upcoming";
  semestre: string;
  carreras: string;
  cupos: string;
  idiomas: string;
  detalle: string;
  sitioOficial: string;
}

export interface Destination {
  id: string;
  country: string;
  flag: string;
  region: string;
  city: string;
  uni: string;
  lat: number;
  lng: number;
  status: "available" | "upcoming";
  semestres: string;
  carreras: string;
  cupos: string;
  idioma: string;
  notes: string;
  site: string;
}

export function normalizeDestination(raw: RawDestination): Destination {
  return {
    id: raw.id,
    country: raw.nombrePais,
    flag: raw.flag,
    region: raw.continente,
    city: raw.ciudad,
    uni: raw.universidad,
    lat: raw.lat,
    lng: raw.lng,
    status: raw.estado,
    semestres: raw.semestre,
    carreras: raw.carreras,
    cupos: raw.cupos,
    idioma: raw.idiomas,
    notes: raw.detalle,
    site: raw.sitioOficial,
  };
}
