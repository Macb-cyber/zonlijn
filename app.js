const months = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
const longMonths = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
const defaultInstallation = { name: "Installatie 1", panelCount: 10, panelWp: 430, orientation: 1, tilt: 35, shade: 1 };
const defaultSettings = { latitude: 52.09, longitude: 5.12, contractType: "vast", energyPrice: .30, installations: [defaultInstallation] };
// Historische Nederlandse dynamische marktprijzen per maand, gebruikt als referentieprofiel.
// Bedragen zijn euro per kWh en exclusief belastingen en leveranciersopslag.
const historicDynamicPrices = [.103,.111,.086,.064,.052,.058,.071,.079,.083,.092,.105,.098];
let installations = [];
let data = [];
let fixedEnergyPrice = defaultSettings.energyPrice;
let chartMonth = null;
let historicWeather = {};
let weatherLoading = false;
let selectedLocationName = "";

const $ = id => document.getElementById(id);
const formIds = ["latitude", "longitude", "contractType", "energyPrice"];

function daylightHours(dayOfYear, latitude) {
  const lat = latitude * Math.PI / 180;
  const declination = -23.44 * Math.cos((2 * Math.PI / 365) * (dayOfYear + 10)) * Math.PI / 180;
  return 24 * Math.acos(Math.max(-1, Math.min(1, -Math.tan(lat) * Math.tan(declination)))) / Math.PI;
}

function formatTime(decimalHour) {
  let h = Math.floor(decimalHour), m = Math.round((decimalHour - h) * 60);
  if (m === 60) { h++; m = 0; }
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function installationTemplate(item, index) {
  const options = values => values.map(([value, label]) => `<option value="${value}" ${String(item.orientation) === String(value) ? "selected" : ""}>${label}</option>`).join("");
  return `<article class="installation" data-index="${index}">
    <div class="installation-head">
      <strong>${item.name || `Installatie ${index + 1}`}</strong>
      ${installations.length > 1 ? `<button class="remove-installation" data-remove="${index}">Verwijderen</button>` : ""}
    </div>
    <div class="installation-grid">
      <label>Naam<input data-field="name" value="${item.name || `Installatie ${index + 1}`}"></label>
      <label>Aantal panelen<input type="number" min="1" max="500" data-field="panelCount" value="${item.panelCount}"></label>
      <label>Vermogen per paneel<div class="input-suffix"><input type="number" min="100" max="800" step="5" data-field="panelWp" value="${item.panelWp}"><span>Wp</span></div></label>
      <label>Richting van het dak<select data-field="orientation">${options([[1,"Zuid"],[.95,"Zuidoost / Zuidwest"],[.85,"Oost / West"],[.72,"Noord"]])}</select></label>
      <label>Hellingshoek panelen<div class="input-suffix"><input type="number" min="0" max="90" step="1" data-field="tilt" value="${item.tilt}"><span>°</span></div></label>
      <label>Schaduw<select data-field="shade">
        <option value="1" ${item.shade == 1 ? "selected" : ""}>Geen schaduw</option>
        <option value=".92" ${item.shade == .92 ? "selected" : ""}>Een beetje schaduw</option>
        <option value=".8" ${item.shade == .8 ? "selected" : ""}>Regelmatig schaduw</option>
        <option value=".65" ${item.shade == .65 ? "selected" : ""}>Veel schaduw</option>
      </select></label>
    </div>
  </article>`;
}

function renderInstallations() {
  $("installations").innerHTML = installations.map(installationTemplate).join("");
  $("installations").querySelectorAll("input, select").forEach(input => input.addEventListener("input", event => {
    const card = event.target.closest(".installation");
    const field = event.target.dataset.field;
    installations[+card.dataset.index][field] = field === "name" ? event.target.value : +event.target.value;
    if (field === "name") card.querySelector("strong").textContent = event.target.value;
    calculate();
  }));
  $("installations").querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => {
    installations.splice(+button.dataset.remove, 1);
    renderInstallations();
    calculate();
  }));
}

function getSettings() {
  return {
    latitude: +$("latitude").value,
    longitude: +$("longitude").value,
    contractType: $("contractType").value,
    energyPrice: fixedEnergyPrice,
    locationName: selectedLocationName,
    installations
  };
}

function parseDutchNumber(value) {
  const parsed = Number(String(value).trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function tiltFactor(tilt) {
  const safeTilt = Math.max(0, Math.min(90, Number(tilt) || 0));
  const difference = Math.abs(safeTilt - 35);
  return Math.max(.72, 1 - Math.pow(difference / 90, 1.55) * .38);
}

function calculate() {
  const s = getSettings();
  const systemKwp = installations.reduce((sum, item) => sum + item.panelCount * item.panelWp / 1000, 0);
  const annual = installations.reduce((sum, item) => sum + item.panelCount * item.panelWp / 1000 * 875 * item.orientation * tiltFactor(item.tilt) * item.shade, 0);
  const monthlyWeights = [.025,.045,.085,.115,.14,.145,.14,.125,.09,.055,.025,.01];
  const middleDays = [15,46,74,105,135,166,196,227,258,288,319,349];
  data = months.map((month, i) => ({ month, daylight: daylightHours(middleDays[i], s.latitude), production: annual * monthlyWeights[i] }));

  const today = new Date(), start = new Date(today.getFullYear(), 0, 0);
  const dayNumber = Math.floor((today - start) / 86400000);
  const todayLight = daylightHours(dayNumber, s.latitude);
  const todayYield = annual / 365 * Math.max(.05, Math.sin((Math.PI * (dayNumber - 20)) / 365) * .72 + .43);
  const best = data.reduce((max, item, i) => item.production > data[max].production ? i : max, 0);
  const peak = systemKwp * .92;
  const dynamicSavings = data.reduce((sum, item, i) => sum + item.production * historicDynamicPrices[i], 0);
  const dynamicAverage = annual ? dynamicSavings / annual : 0;
  const isDynamic = s.contractType === "dynamisch";
  const energyValue = isDynamic ? dynamicSavings : annual * fixedEnergyPrice;

  $("energyPrice").disabled = isDynamic;
  if (isDynamic) $("energyPrice").value = dynamicAverage.toFixed(3).replace(".", ",");
  $("energyPriceHelp").textContent = isDynamic
    ? "Automatisch berekend met historische maandprijzen; exclusief belasting en leveranciersopslag."
    : "Vul je eigen stroomprijs in.";

  $("annualProduction").textContent = Math.round(annual).toLocaleString("nl-NL");
  $("peakPower").textContent = peak.toLocaleString("nl-NL", { maximumFractionDigits: 1 });
  $("longestDay").textContent = Math.max(...data.map(item => item.daylight)).toLocaleString("nl-NL", { maximumFractionDigits: 1 });
  $("annualSavings").textContent = `€ ${Math.round(energyValue).toLocaleString("nl-NL")}`;
  $("priceSummary").textContent = isDynamic
    ? `Dynamisch historisch gemiddelde: € ${dynamicAverage.toFixed(3).replace(".", ",")} per kWh`
    : `Vast / variabel: € ${fixedEnergyPrice.toFixed(2).replace(".", ",")} per kWh`;
  $("homeCoverage").textContent = `Goed voor ${Math.round(annual / 35)}% van een gemiddeld huis`;
  $("todayProduction").textContent = `${todayYield.toLocaleString("nl-NL", { maximumFractionDigits: 1 })} kWh`;
  $("todayProgress").style.width = `${Math.min(100, todayYield / (annual / 365 * 1.3) * 100)}%`;
  $("sunriseToday").textContent = `↑ ${formatTime(12 - todayLight / 2)}`;
  $("sunsetToday").textContent = `↓ ${formatTime(12 + todayLight / 2)}`;
  $("bestMonth").textContent = longMonths[best];
  $("bestMonthYield").textContent = `${Math.round(data[best].production)} kWh`;
  $("locationLabel").textContent = selectedLocationName || `${s.latitude.toFixed(2)}°, ${s.longitude.toFixed(2)}°`;
  $("powerBars").innerHTML = data.map(item => `<i style="height:${Math.round(item.production / data[best].production * 100)}%"></i>`).join("");
  localStorage.setItem("zonlijnSettingsV2", JSON.stringify(s));
  drawChart();
}

function getChartData() {
  if (chartMonth === null) return data.map((item, index) => ({ ...item, label: months[index], title: longMonths[index], priceIndex: index }));
  const year = new Date().getFullYear();
  const days = new Date(year, chartMonth + 1, 0).getDate();
  const firstDayNumber = Math.floor((new Date(year, chartMonth, 1) - new Date(year, 0, 0)) / 86400000);
  const monthProduction = data[chartMonth].production;
  const factors = Array.from({ length: days }, (_, i) => .82 + .22 * Math.sin((i + 1) * 1.7) + .12 * Math.cos((i + 1) * .63));
  const factorTotal = factors.reduce((sum, factor) => sum + factor, 0);
  return factors.map((factor, i) => ({
    label: String(i + 1),
    title: `${i + 1} ${longMonths[chartMonth]}`,
    daylight: daylightHours(firstDayNumber + i, +$("latitude").value),
    production: monthProduction * factor / factorTotal,
    priceIndex: chartMonth,
    sunshine: historicWeather[chartMonth]?.[i]?.sunshine ?? null,
    cloudCover: historicWeather[chartMonth]?.[i]?.cloudCover ?? null,
    weatherYear: historicWeather[chartMonth]?.[i]?.year ?? null
  }));
}

function drawChart() {
  const chartData = getChartData();
  const canvas = $("yearChart"), ratio = window.devicePixelRatio || 1, rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * ratio; canvas.height = rect.height * ratio;
  const ctx = canvas.getContext("2d"); ctx.scale(ratio, ratio);
  const w = rect.width, h = rect.height, pad = { top:15, right:18, bottom:35, left:25 }, cw = w-pad.left-pad.right, ch = h-pad.top-pad.bottom;
  const maxProduction = Math.max(...chartData.map(d => d.production)) * 1.12 || 1;
  ctx.strokeStyle = "rgba(255,255,255,.07)";
  for (let i=0;i<5;i++) { const y=pad.top+ch/4*i; ctx.beginPath();ctx.moveTo(pad.left,y);ctx.lineTo(w-pad.right,y);ctx.stroke(); }
  ctx.font="11px DM Sans";ctx.fillStyle="#718b7e";ctx.textAlign="center";
  const denominator = Math.max(1, chartData.length - 1);
  chartData.forEach((d,i)=>{if(chartMonth===null||i===0||i===chartData.length-1||(i+1)%5===0)ctx.fillText(d.label,pad.left+cw/denominator*i,h-10);});
  const line=(key,max,color,fill)=>{const points=chartData.map((d,i)=>({x:pad.left+cw/denominator*i,y:pad.top+ch-d[key]/max*ch}));ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.stroke();if(fill){const g=ctx.createLinearGradient(0,pad.top,0,h);g.addColorStop(0,"rgba(201,244,103,.18)");g.addColorStop(1,"rgba(201,244,103,0)");ctx.lineTo(points.at(-1).x,pad.top+ch);ctx.lineTo(points[0].x,pad.top+ch);ctx.closePath();ctx.fillStyle=g;ctx.fill();}points.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,chartMonth===null?3:2,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();});};
  line("production",maxProduction,"#c9f467",true);line("daylight",18,"#ffd55c",false);
  if (chartMonth !== null && chartData.some(item => item.sunshine !== null)) line("sunshine",18,"#ff9b5e",false);
}

function showChartTooltip(event) {
  const chartData = getChartData();
  const canvas = $("yearChart"), tooltip = $("chartTooltip"), rect = canvas.getBoundingClientRect();
  const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
  const chartLeft = 25, chartRight = rect.width - 18;
  const index = Math.max(0, Math.min(chartData.length - 1, Math.round((x - chartLeft) / (chartRight - chartLeft) * (chartData.length - 1))));
  const item = chartData[index];
  const isDynamic = $("contractType").value === "dynamisch";
  const price = isDynamic ? historicDynamicPrices[item.priceIndex] : fixedEnergyPrice;
  const value = item.production * price;

  tooltip.innerHTML = `
    <strong>${item.title}</strong>
    <span>Daglicht <b>${item.daylight.toLocaleString("nl-NL", { maximumFractionDigits: 1 })} uur</b></span>
    ${item.sunshine !== null ? `<span>Zonuren in ${item.weatherYear} <b>${item.sunshine.toLocaleString("nl-NL", { maximumFractionDigits: 1 })} uur</b></span>
    <span>Bewolking in ${item.weatherYear} <b>${Math.round(item.cloudCover)}%</b></span>` : chartMonth !== null ? `<span>Weerhistorie <b>${weatherLoading ? "laden..." : "niet beschikbaar"}</b></span>` : ""}
    <span>Productie <b>${Math.round(item.production).toLocaleString("nl-NL")} kWh</b></span>
    <span>${isDynamic ? "Historische prijs" : "Ingestelde prijs"} <b>€ ${price.toFixed(3).replace(".", ",")}</b></span>
    <span>Waarde <b>€ ${Math.round(value).toLocaleString("nl-NL")}</b></span>`;
  tooltip.classList.add("visible");

  const tooltipWidth = 190;
  tooltip.style.left = `${Math.max(5, Math.min(rect.width - tooltipWidth, x + 14))}px`;
  tooltip.style.top = `${Math.max(5, event.clientY - rect.top - 95)}px`;
}

async function loadHistoricWeather(month) {
  if (historicWeather[month] || weatherLoading) return;
  weatherLoading = true;
  const year = new Date().getFullYear() - 1;
  const start = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  const lastDay = new Date(year, month + 1, 0).getDate();
  const end = `${year}-${String(month + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  const url = new URL("https://archive-api.open-meteo.com/v1/archive");
  url.search = new URLSearchParams({
    latitude: $("latitude").value,
    longitude: $("longitude").value,
    start_date: start,
    end_date: end,
    daily: "sunshine_duration,cloud_cover_mean",
    timezone: "auto"
  });
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weerhistorie niet beschikbaar");
    const result = await response.json();
    historicWeather[month] = result.daily.time.map((_, i) => ({
      sunshine: (result.daily.sunshine_duration[i] || 0) / 3600,
      cloudCover: result.daily.cloud_cover_mean[i] || 0,
      year
    }));
  } catch (_) {
    historicWeather[month] = [];
  } finally {
    weatherLoading = false;
    if (chartMonth === month) drawChart();
  }
}

async function searchLocation() {
  const query = $("locationSearch").value.trim();
  const message = $("locationSearchMessage");
  if (query.length < 2) {
    message.textContent = "Vul minimaal twee letters of cijfers in.";
    return;
  }

  message.textContent = "Adres of plaats zoeken...";
  try {
    const addressUrl = new URL("https://nominatim.openstreetmap.org/search");
    addressUrl.search = new URLSearchParams({
      q: query,
      format: "jsonv2",
      addressdetails: "1",
      limit: "1",
      countrycodes: "nl",
      "accept-language": "nl"
    });
    const addressResponse = await fetch(addressUrl);
    const addressResults = addressResponse.ok ? await addressResponse.json() : [];
    let latitude, longitude;

    if (addressResults[0]) {
      const result = addressResults[0];
      const address = result.address || {};
      const street = address.road || address.pedestrian || address.residential || address.footway;
      const city = address.city || address.town || address.village || address.municipality;
      selectedLocationName = [
        [street, address.house_number].filter(Boolean).join(" "),
        address.postcode,
        city
      ].filter(Boolean).join(", ") || result.display_name;
      latitude = +result.lat;
      longitude = +result.lon;
    } else {
      const placeUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
      placeUrl.search = new URLSearchParams({ name: query, count: "1", language: "nl", format: "json" });
      const placeResponse = await fetch(placeUrl);
      const placeData = placeResponse.ok ? await placeResponse.json() : {};
      const place = placeData.results?.[0];
      if (!place) throw new Error("Geen adres of plaats gevonden. Voeg eventueel een huisnummer en woonplaats toe.");
      selectedLocationName = [place.name, place.admin1, place.country].filter(Boolean).join(", ");
      latitude = place.latitude;
      longitude = place.longitude;
    }

    $("latitude").value = latitude.toFixed(5);
    $("longitude").value = longitude.toFixed(5);
    historicWeather = {};
    message.textContent = `Actieve locatie: ${selectedLocationName}`;
    calculate();
    if (chartMonth !== null) await loadHistoricWeather(chartMonth);
  } catch (error) {
    message.textContent = error.message;
  }
}

async function zoomChart(event) {
  if (chartMonth !== null) return;
  const rect = $("yearChart").getBoundingClientRect();
  const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
  chartMonth = Math.max(0, Math.min(11, Math.round((x - 25) / (rect.width - 43) * 11)));
  $("chartEyebrow").textContent = `DAGEN · WEERHISTORIE ${new Date().getFullYear() - 1}`;
  $("chartTitle").textContent = `Dagoverzicht van ${longMonths[chartMonth]}`;
  $("chartBackButton").classList.add("visible");
  $("weatherLegend").classList.add("visible");
  $("chartTooltip").classList.remove("visible");
  drawChart();
  await loadHistoricWeather(chartMonth);
}

function restoreSettings() {
  const saved = JSON.parse(localStorage.getItem("zonlijnSettingsV2") || "null") || defaultSettings;
  selectedLocationName = saved.locationName || "";
  fixedEnergyPrice = saved.energyPrice ?? defaultSettings.energyPrice;
  installations = saved.installations.map(item => ({ ...defaultInstallation, ...item }));
  formIds.forEach(id => $(id).value = saved[id]);
  $("energyPrice").value = fixedEnergyPrice.toFixed(2).replace(".", ",");
  renderInstallations();
}

formIds.forEach(id => $(id).addEventListener("input", event => {
  if (event.target.id === "energyPrice" && $("contractType").value !== "dynamisch") {
    const parsed = parseDutchNumber(event.target.value);
    if (parsed !== null && parsed >= 0 && parsed <= 5) fixedEnergyPrice = parsed;
  }
  if (event.target.id === "latitude" || event.target.id === "longitude") { historicWeather = {}; selectedLocationName = ""; }
  calculate();
}));
$("contractType").addEventListener("change", () => {
  if ($("contractType").value !== "dynamisch") $("energyPrice").value = fixedEnergyPrice.toFixed(2).replace(".", ",");
});
$("energyPrice").addEventListener("blur", () => {
  if ($("contractType").value !== "dynamisch") $("energyPrice").value = fixedEnergyPrice.toFixed(2).replace(".", ",");
});
$("addInstallationButton").addEventListener("click", () => {
  installations.push({ ...defaultInstallation, name: `Installatie ${installations.length + 1}` });
  renderInstallations(); calculate();
});
$("resetButton").addEventListener("click", () => { localStorage.removeItem("zonlijnSettingsV2"); fixedEnergyPrice=defaultSettings.energyPrice;selectedLocationName="";historicWeather={};$("locationSearch").value="";$("locationSearchMessage").textContent="Vul een adres met huisnummer in om ook de straatnaam te zien.";installations = [{...defaultInstallation}]; formIds.forEach(id => $(id).value = defaultSettings[id]); renderInstallations(); calculate(); });
$("settingsButton").addEventListener("click", () => $("settings").scrollIntoView({ behavior:"smooth", block:"center" }));
$("locationButton").addEventListener("click", () => navigator.geolocation?.getCurrentPosition(pos => { selectedLocationName="Mijn huidige locatie";historicWeather={};$("latitude").value=pos.coords.latitude.toFixed(2);$("longitude").value=pos.coords.longitude.toFixed(2);calculate(); }, () => $("locationLabel").textContent="Locatie niet toegestaan"));
$("locationSearchButton").addEventListener("click", searchLocation);
$("locationSearch").addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); searchLocation(); } });
$("yearChart").addEventListener("pointermove", showChartTooltip);
$("yearChart").addEventListener("click", zoomChart);
$("yearChart").addEventListener("pointerleave", () => $("chartTooltip").classList.remove("visible"));
$("chartBackButton").addEventListener("click", () => {
  chartMonth = null;
  $("chartEyebrow").textContent = "12 MAANDEN";
  $("chartTitle").textContent = "Licht en opbrengst door het jaar";
  $("chartBackButton").classList.remove("visible");
  $("weatherLegend").classList.remove("visible");
  drawChart();
});
window.addEventListener("resize",drawChart);
restoreSettings();calculate();
