/* ============================================================
   UVG Global — Mapa mundial + datos de destinos
   ============================================================ */

// ---------- Destinations data (extracted from the CSVs) ----------
const DESTINATIONS = [
  // ---- DISPONIBLES (con convenio activo) ----
  { id:"ue-madrid", country:"España", flag:"🇪🇸", region:"Europa", city:"Madrid", uni:"Universidad Europea", lat:40.42, lng:-3.70, status:"available",
    semestres:"Sep–Ene · Feb–Jun", carreras:"Todas las facultades", cupos:"Sin límite", idioma:"Esp / Ing",
    notes:"166€ por crédito ECTS. Al regresar a UVG se paga 50% del curso a convalidar.", site:"https://universidadeuropea.com" },
  { id:"u-rosario", country:"Colombia", flag:"🇨🇴", region:"América Latina", city:"Bogotá", uni:"Universidad del Rosario", lat:4.71, lng:-74.07, status:"available",
    semestres:"Jul–Nov · Ene–May", carreras:"Pregrado y posgrado", cupos:"4 (2 por sem.)", idioma:"Español",
    notes:"Sin pago de tuition. Estudiante cubre alojamiento, transporte, seguro y visado.", site:"https://www.urosario.edu.co" },
  { id:"jmu", country:"Alemania", flag:"🇩🇪", region:"Europa", city:"Wurzburgo", uni:"Universität Würzburg (JMU)", lat:49.79, lng:9.93, status:"available",
    semestres:"Oct–Feb · Abr–Jul", carreras:"Todas las facultades", cupos:"Sin límite", idioma:"Alemán B1 / Inglés",
    notes:"Intercambio sin tuition. Máx. 3 semestres. Erasmus+ activo.", site:"https://www.uni-wuerzburg.de" },
  { id:"u-houston", country:"Estados Unidos", flag:"🇺🇸", region:"Norteamérica", city:"Houston, TX", uni:"University of Houston", lat:29.76, lng:-95.36, status:"available",
    semestres:"Otoño · Primavera", carreras:"Todas las facultades", cupos:"3 / año", idioma:"Inglés TOEFL 79 / IELTS 6.5",
    notes:"Intercambio recíproco. Sin pago de tuition en anfitriona.", site:"https://uh.edu" },
  { id:"komatsu", country:"Japón", flag:"🇯🇵", region:"Asia", city:"Komatsu", uni:"Universidad de Komatsu", lat:36.40, lng:136.45, status:"available",
    semestres:"Prácticas (hasta 10 meses)", carreras:"Internships académicos", cupos:"Sin límite", idioma:"Japonés / Inglés",
    notes:"Prácticas académicas con apoyo en alojamiento, visa y permisos.", site:"https://www.komatsu-u.ac.jp" },
  { id:"cmu-disney", country:"Estados Unidos", flag:"🇺🇸", region:"Norteamérica", city:"Mount Pleasant, MI", uni:"CMU · Disney Academic Exchange", lat:43.59, lng:-84.77, status:"available",
    semestres:"1 o 2 semestres", carreras:"Recreación, turismo, hospitalidad", cupos:"Selección Disney", idioma:"Inglés",
    notes:"Programa con compensación económica de Disney. Visado J-1.", site:"https://disneyprograms.com" },
  { id:"uclm", country:"España", flag:"🇪🇸", region:"Europa", city:"Castilla-La Mancha", uni:"Universidad de Castilla-La Mancha", lat:39.86, lng:-4.02, status:"available",
    semestres:"Sep–Ene · Feb–Jun", carreras:"Todas las facultades", cupos:"4 / año", idioma:"Español",
    notes:"Convenio marco + anexo de intercambio. Sin matrícula en destino.", site:"https://www.uclm.es/internacional" },
  { id:"tu-dresden", country:"Alemania", flag:"🇩🇪", region:"Europa", city:"Dresde", uni:"TU Dresden", lat:51.05, lng:13.74, status:"available",
    semestres:"Oct–Mar · Abr–Sep", carreras:"Ingeniería Civil", cupos:"1", idioma:"Inglés B1 / B2",
    notes:"Erasmus+ KA171 · Movilidad activa.", site:"https://tu-dresden.de" },
  { id:"u-manizales", country:"Colombia", flag:"🇨🇴", region:"América Latina", city:"Manizales", uni:"Universidad de Manizales", lat:5.07, lng:-75.52, status:"available",
    semestres:"Pendiente", carreras:"Todas las facultades", cupos:"2", idioma:"Español",
    notes:"Convenio marco firmado. Incluye investigación, innovación y proyección.", site:"https://www.umanizales.edu.co" },
  { id:"uqtr", country:"Canadá", flag:"🇨🇦", region:"Norteamérica", city:"Trois-Rivières", uni:"UQTR · Université du Québec", lat:46.34, lng:-72.54, status:"available",
    semestres:"Trimestre otoño · invierno", carreras:"Todas las facultades", cupos:"2", idioma:"Francés (DALF/DELF)",
    notes:"Estudiante asume matrícula, seguro, alojamiento y manutención.", site:"https://www.uqtr.ca" },
  { id:"emporia", country:"Estados Unidos", flag:"🇺🇸", region:"Norteamérica", city:"Emporia, KS", uni:"Emporia State University", lat:38.40, lng:-96.18, status:"available",
    semestres:"Otoño · Primavera · Verano", carreras:"Todas las facultades", cupos:"2", idioma:"Inglés",
    notes:"Out-of-state tuition asumida por el estudiante.", site:"https://www.emporia.edu" },
  { id:"kanazawa", country:"Japón", flag:"🇯🇵", region:"Asia", city:"Kanazawa", uni:"Kanazawa University", lat:36.56, lng:136.65, status:"available",
    semestres:"Otoño · Primavera", carreras:"Todas las facultades", cupos:"1 o 2", idioma:"Japonés / Inglés",
    notes:"Exención de matrícula por convenio.", site:"https://www.kanazawa-u.ac.jp" },
  { id:"nagoya", country:"Japón", flag:"🇯🇵", region:"Asia", city:"Nagoya", uni:"Nagoya University", lat:35.18, lng:136.91, status:"available",
    semestres:"Sep–Ene · Feb–Jun", carreras:"Ingeniería y CC. Sociales", cupos:"1 o 2", idioma:"Inglés IELTS 6.0 / TOEFL 80",
    notes:"Maestría en inglés. Exención MEXT. Contactar supervisor antes de aplicar.", site:"https://en.nagoya-u.ac.jp" },
  { id:"upv-ehu", country:"España", flag:"🇪🇸", region:"Europa", city:"País Vasco", uni:"Universidad del País Vasco", lat:43.26, lng:-2.93, status:"available",
    semestres:"Sep–Feb · Feb–Jul", carreras:"Todas las facultades", cupos:"4", idioma:"Español / Euskera",
    notes:"Convenio de movilidad 2016. Sin pago de tasas académicas.", site:"https://www.ehu.eus" },

  // ---- PRÓXIMAS OPORTUNIDADES (borrador / en gestión) ----
  { id:"ucr", country:"Costa Rica", flag:"🇨🇷", region:"América Latina", city:"San José", uni:"Universidad de Costa Rica", lat:9.93, lng:-84.08, status:"upcoming",
    semestres:"Feb–Jun · Ago–Dic", carreras:"Todas las facultades", cupos:"2", idioma:"Español",
    notes:"Estudiante paga matrícula en UVG, no en UCR.", site:"https://www.ucr.ac.cr" },
  { id:"uwyo", country:"Estados Unidos", flag:"🇺🇸", region:"Norteamérica", city:"Laramie, WY", uni:"University of Wyoming", lat:41.31, lng:-105.59, status:"upcoming",
    semestres:"Ago–Dic · Ene–May", carreras:"Múltiples áreas", cupos:"4", idioma:"Inglés",
    notes:"Exención de tuition (Home Payment B). Solicitud $50 + intercambio $75.", site:"https://www.uwyo.edu" },
  { id:"utp", country:"Panamá", flag:"🇵🇦", region:"América Latina", city:"Ciudad de Panamá", uni:"Universidad Tecnológica de Panamá", lat:8.97, lng:-79.53, status:"upcoming",
    semestres:"Pendiente", carreras:"Ingenierías y tecnologías", cupos:"1 o 2", idioma:"Español",
    notes:"Pendiente confirmar modalidad de intercambio activa 2026.", site:"https://www.utp.ac.pa" },
  { id:"ntut", country:"Taiwán", flag:"🇹🇼", region:"Asia", city:"Taipéi", uni:"National Taipei Univ. of Technology", lat:25.03, lng:121.56, status:"upcoming",
    semestres:"Sep–Dic · Feb–Jun", carreras:"Ingeniería, Tecnología, Diseño", cupos:"5", idioma:"Inglés / Chino",
    notes:"Exención de matrícula por convenio. Pendiente fechas 2026.", site:"https://www.ntut.edu.tw" },
  { id:"ugr", country:"España", flag:"🇪🇸", region:"Europa", city:"Granada", uni:"Universidad de Granada", lat:37.18, lng:-3.60, status:"upcoming",
    semestres:"Pendiente", carreras:"Todas las facultades", cupos:"4", idioma:"Español B2",
    notes:"Convenio permite exención de matrícula.", site:"https://www.ugr.es" },
  { id:"ull", country:"España", flag:"🇪🇸", region:"Europa", city:"La Laguna", uni:"Universidad de La Laguna", lat:28.48, lng:-16.32, status:"upcoming",
    semestres:"Sep–Feb · Feb–Jul", carreras:"Humanidades, CC., Ingenierías", cupos:"4", idioma:"Español B2",
    notes:"Exención de matrícula. Alojamiento Colegio Mayor €270-750/mes.", site:"https://www.ull.es" },
  { id:"umh", country:"España", flag:"🇪🇸", region:"Europa", city:"Elche", uni:"Universidad Miguel Hernández", lat:38.27, lng:-0.70, status:"upcoming",
    semestres:"Pendiente", carreras:"CC. Sociales, Salud, Ingenierías", cupos:"4", idioma:"Español B2",
    notes:"Pendiente confirmar exención de matrícula.", site:"https://www.umh.es" },
  { id:"tor-vergata", country:"Italia", flag:"🇮🇹", region:"Europa", city:"Roma", uni:"University of Rome Tor Vergata", lat:41.90, lng:12.49, status:"upcoming",
    semestres:"Sep–Ene · Feb–Jun", carreras:"Economía, Derecho, Ing., Medicina", cupos:"5", idioma:"Italiano / Inglés B2",
    notes:"Matrícula exenta. Primer plazo €156 + seguro de salud €150.", site:"https://web.uniroma2.it" },
  { id:"uazuay", country:"Ecuador", flag:"🇪🇨", region:"América Latina", city:"Cuenca", uni:"Universidad del Azuay", lat:-2.90, lng:-79.00, status:"upcoming",
    semestres:"Pendiente", carreras:"Arq., Diseño, Ingenierías, Salud", cupos:"Pendiente", idioma:"Español",
    notes:"Costo de alojamiento mensual estimado: $250–400 USD.", site:"https://www.uazuay.edu.ec" },
  { id:"sorbonne", country:"Francia", flag:"🇫🇷", region:"Europa", city:"París", uni:"Université Sorbonne Nouvelle", lat:48.85, lng:2.35, status:"upcoming",
    semestres:"Sep–Ene · Ene–Jun", carreras:"Artes, Letras, CC. Humanas", cupos:"Pendiente", idioma:"Francés B2/C1",
    notes:"Postulación directa como visitante. Costo vida París €1,000–1,500/mes.", site:"https://www.sorbonne-nouvelle.fr" },
  { id:"kriete", country:"El Salvador", flag:"🇸🇻", region:"América Latina", city:"San Salvador", uni:"Instituto Kriete de Ingeniería", lat:13.69, lng:-89.21, status:"upcoming",
    semestres:"Pendiente", carreras:"Ingeniería y Ciencias", cupos:"1 o 2", idioma:"Español",
    notes:"Postulación como visitante. Alojamiento estimado $300–500 USD/mes.", site:"https://www.kriete.edu.sv" },
  { id:"utt", country:"Francia", flag:"🇫🇷", region:"Europa", city:"Troyes", uni:"Université de Technologie de Troyes", lat:48.30, lng:4.08, status:"upcoming",
    semestres:"Sep–Ene · Feb–Jun", carreras:"Ingeniería, Tecnología", cupos:"Pendiente", idioma:"Francés B2",
    notes:"Postulación directa. Matrícula internacional €3,000–5,000/año.", site:"https://www.utt.fr" },
  { id:"usn-norway", country:"Noruega", flag:"🇳🇴", region:"Europa", city:"Notodden", uni:"University of South-Eastern Norway", lat:59.56, lng:9.26, status:"upcoming",
    semestres:"Ago–Dic · Ene–Jun", carreras:"Gestión Ambiental y Sostenibilidad", cupos:"Pendiente", idioma:"Inglés",
    notes:"Líder en Gestión Sostenible y Ecología.", site:"https://www.usn.no" },
];

window.DESTINATIONS = DESTINATIONS;

// ---------- World map rendering ----------
// We use d3 + topojson loaded from CDN. The map renders inside #world-map.
async function renderWorldMap() {
  const stage = document.getElementById("world-map");
  if (!stage) return;

  // Wait for d3 + topojson to be available
  if (!window.d3 || !window.topojson) {
    setTimeout(renderWorldMap, 80);
    return;
  }

  const width = 1000;
  const height = 540;

  const svg = d3.select(stage)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("role", "img")
    .attr("aria-label", "Mapa mundial con destinos UVG Global");

  const projection = d3.geoNaturalEarth1()
    .scale(190)
    .translate([width / 2, height / 2 + 10]);

  const pathGen = d3.geoPath(projection);

  // Set of countries that have UVG presence (ISO name match)
  const presentCountries = new Set(DESTINATIONS.map(d => d.country.toLowerCase()));
  const countryNameMap = {
    "united states of america": "estados unidos",
    "usa": "estados unidos",
    "germany": "alemania",
    "spain": "españa",
    "japan": "japón",
    "japon": "japón",
    "canada": "canadá",
    "canadá": "canadá",
    "france": "francia",
    "italy": "italia",
    "ecuador": "ecuador",
    "panama": "panamá",
    "panamá": "panamá",
    "norway": "noruega",
    "el salvador": "el salvador",
    "costa rica": "costa rica",
    "colombia": "colombia",
    "taiwan": "taiwán",
    "taiwán": "taiwán",
  };

  let world;
  try {
    world = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(r => r.json());
  } catch (e) {
    console.error("Could not load world atlas:", e);
    return;
  }

  const countries = topojson.feature(world, world.objects.countries).features;

  // Land
  svg.append("g")
    .attr("class", "land-layer")
    .selectAll("path")
    .data(countries)
    .join("path")
    .attr("d", pathGen)
    .attr("class", d => {
      const name = (d.properties.name || "").toLowerCase();
      const norm = countryNameMap[name] || name;
      return "country-shape" + (presentCountries.has(norm) ? " has-uvg" : "");
    });

  // Markers
  const markerGroup = svg.append("g").attr("class", "markers");

  const markers = markerGroup.selectAll("g.marker")
    .data(DESTINATIONS)
    .join("g")
    .attr("class", d => "marker" + (d.status === "upcoming" ? " is-upcoming" : ""))
    .attr("transform", d => {
      const p = projection([d.lng, d.lat]);
      return p ? `translate(${p[0]}, ${p[1]})` : null;
    })
    .attr("data-id", d => d.id)
    .style("display", d => projection([d.lng, d.lat]) ? null : "none");

  markers.append("circle").attr("class", "pulse").attr("r", 4)
    .style("fill", d => d.status === "upcoming" ? "rgba(255,255,255,0.5)" : null);
  markers.append("circle").attr("class", "core").attr("r", 5)
    .style("fill", d => d.status === "upcoming" ? "#fff" : null)
    .style("opacity", d => d.status === "upcoming" ? 0.85 : 1);

  // Hover tooltip
  const tooltip = d3.select(stage).append("div")
    .attr("class", "map-tooltip")
    .style("position", "absolute")
    .style("pointer-events", "none")
    .style("opacity", 0);

  markers
    .on("mouseenter", function(e, d) {
      tooltip.html(`<strong>${d.flag} ${d.country}</strong><br/><span>${d.uni}</span>`)
        .style("opacity", 1);
      d3.select(this).classed("is-active", true);
    })
    .on("mousemove", function(e) {
      const rect = stage.getBoundingClientRect();
      tooltip
        .style("left", (e.clientX - rect.left + 14) + "px")
        .style("top", (e.clientY - rect.top - 12) + "px");
    })
    .on("mouseleave", function() {
      tooltip.style("opacity", 0);
      d3.select(this).classed("is-active", false);
    })
    .on("click", function(e, d) {
      e.stopPropagation();
      selectDestination(d.id);
      markers.classed("is-active", false);
      d3.select(this).classed("is-active", true);
    });

  // Filter buttons
  const filterButtons = document.querySelectorAll("[data-map-filter]");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.mapFilter;
      markers.style("opacity", d => {
        if (f === "all") return 1;
        if (f === "available") return d.status === "available" ? 1 : 0.18;
        if (f === "upcoming") return d.status === "upcoming" ? 1 : 0.18;
        return d.region === f ? 1 : 0.18;
      });
    });
  });
}

// ---------- Map panel updater ----------
function selectDestination(id) {
  const d = DESTINATIONS.find(x => x.id === id);
  if (!d) return;
  const panel = document.getElementById("map-panel");
  if (!panel) return;
  panel.innerHTML = `
    <div class="panel-label">${d.region}</div>
    <h3>${d.uni}</h3>
    <div class="city">${d.flag} ${d.city}, ${d.country}</div>
    <dl class="rows">
      <div class="row"><dt>Semestres</dt><dd>${d.semestres}</dd></div>
      <div class="row"><dt>Carreras</dt><dd>${d.carreras}</dd></div>
      <div class="row"><dt>Cupos</dt><dd>${d.cupos}</dd></div>
      <div class="row"><dt>Idioma</dt><dd>${d.idioma}</dd></div>
      <div class="row"><dt>Detalle</dt><dd>${d.notes}</dd></div>
    </dl>
    <a class="panel-cta" href="${d.site}" target="_blank" rel="noopener">
      Sitio oficial
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg>
    </a>
  `;

  // Highlight marker in the map
  document.querySelectorAll(".map-canvas .marker").forEach(m => m.classList.remove("is-active"));
  const target = document.querySelector(`.map-canvas .marker[data-id="${id}"]`);
  if (target) target.classList.add("is-active");
}
window.selectDestination = selectDestination;

// ---------- Destinations grid + filter ----------
function renderDestinations() {
  const grid = document.getElementById("dest-grid");
  if (!grid) return;
  const available = DESTINATIONS.filter(d => d.status === "available");

  grid.innerHTML = available.map(d => `
    <article class="dest-card" data-region="${d.region}" data-country="${d.country.toLowerCase()}">
      <div class="photo">
        <span class="flag-row"><span class="flag">${d.flag}</span> ${d.country}</span>
        <image-slot id="dest-${d.id}" shape="rect" placeholder="Foto de ${d.city}"></image-slot>
      </div>
      <div class="body">
        <div class="city">${d.city}</div>
        <h3>${d.uni}</h3>
        <div class="meta">
          <span class="pill green">${d.region}</span>
          <span class="pill">${d.idioma.split('/')[0].trim()}</span>
        </div>
        <div class="foot">
          <span>${d.cupos} · cupos</span>
          <a class="arrow" href="#" onclick="event.preventDefault(); selectDestination('${d.id}'); document.getElementById('mapa').scrollIntoView({behavior:'smooth'});" aria-label="Ver detalles de ${d.uni}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg>
          </a>
        </div>
      </div>
    </article>
  `).join("");

  // Count
  const countEl = document.querySelector("[data-dest-count]");
  if (countEl) countEl.textContent = available.length + " destinos activos";

  // Filter buttons
  document.querySelectorAll("[data-dest-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-dest-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.destFilter;
      let visible = 0;
      grid.querySelectorAll(".dest-card").forEach(card => {
        const show = f === "all" || card.dataset.region === f;
        card.style.display = show ? "" : "none";
        if (show) visible++;
      });
      if (countEl) countEl.textContent = visible + " destinos";
    });
  });
}

// ---------- Upcoming list ----------
function renderUpcoming() {
  const grid = document.getElementById("upcoming-grid");
  if (!grid) return;
  const upcoming = DESTINATIONS.filter(d => d.status === "upcoming");
  grid.innerHTML = upcoming.map(d => `
    <a class="up-row" href="${d.site}" target="_blank" rel="noopener">
      <span class="flag-big">${d.flag}</span>
      <div class="info">
        <h4>${d.uni}</h4>
        <div class="sub">${d.city}, ${d.country} · ${d.region}</div>
      </div>
      <span class="status"><span class="pulse"></span>Próximo</span>
    </a>
  `).join("");
}

// ---------- Boot ----------
document.addEventListener("DOMContentLoaded", () => {
  renderWorldMap();
  renderDestinations();
  renderUpcoming();
  // Default selection
  setTimeout(() => selectDestination("ue-madrid"), 300);
});
