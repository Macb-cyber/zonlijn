const $=id=>document.getElementById(id);
let hasSolar=true,contract="fixed";
const contractIndications={
  dynamic:{buy:.29,feed:.07,cheap:.18,text:"Dynamisch: rekenaannames voor dure en goedkope uren. Zonder gekoppelde historische uurdata zijn dit geen gemeten gemiddelden."},
  variable:{buy:.247,feed:.08,cheap:.18,text:"Variabel: vul jouw contractgegevens in. De startwaarde van €0,247/kWh is het CBS-gemiddelde voor Nederlandse huishoudens over 2025, inclusief btw, belastingen en netwerkprijs."},
  fixed:{buy:.247,feed:.08,cheap:.18,text:"Vast: vul jouw contractgegevens in. De startwaarde van €0,247/kWh is het CBS-gemiddelde voor Nederlandse huishoudens over 2025, inclusief btw, belastingen en netwerkprijs."}
};
// Referentieprofiel voor circa 4.500 kWh jaaropwek: geschat aantal dagen
// waarop een batterij tot ieder percentage gevuld kan worden.
const fillProfile=[[0,51.8],[.1,39.1],[.2,19],[.3,15.2],[.4,12.7],[.5,11.3],[.6,11.1],[.7,9.4],[.8,9.1],[.9,9.3],[1,176.6]];
const ids=["capacity","purchasePrice","solarYield","directUse","buyPrice","feedInPriceSimple","feedInCost","rte","nightUse"];
const value=id=>+$(`${id}`).value||0;
const money=v=>`€ ${Math.round(v).toLocaleString("nl-NL")}`;
const number=(v,d=1)=>v.toLocaleString("nl-NL",{maximumFractionDigits:d});

function calculate(){
  const capacity=value("capacity"),cost=value("purchasePrice"),rte=value("rte")/100;
  const solarSurplus=hasSolar?value("solarYield")*(1-value("directUse")/100):0;
  const referenceSurplus=4500*.70;
  const fillScale=hasSolar?Math.max(0,Math.min(1.5,solarSurplus/referenceSurplus)):0;
  const solarStored=fillProfile.reduce((sum,[fill,days])=>{
    const output=Math.min(value("nightUse"),fill*fillScale*capacity*Math.sqrt(Math.max(rte,0)));
    return sum+days*output;
  },0);
  const solarValue=solarStored*value("buyPrice");
  const yearly=solarValue;
  const payback=yearly>0?cost/yearly:Infinity;

  $("simplePayback").textContent=Number.isFinite(payback)?`${number(payback)} jaar`:"Niet berekenbaar";
  $("simpleYearSaving").textContent=money(yearly);
  $("simpleExplanation").innerHTML=`Benadering met een vulpercentageprofiel van <b>364,6 dagen</b>: per groep wordt berekend hoeveel stroom 's nachts bruikbaar is, beperkt door nachtverbruik, capaciteit en rendement.<br>Geschat via batterij gebruikte zonnestroom: <b>${Math.round(solarStored).toLocaleString("nl-NL")} kWh</b>.<br>Waarde zelfverbruik: <b>${money(solarValue)}</b> op basis van de ingevulde all-in stroomprijs.${contract==="dynamic"?" Handelen met goedkope en dure uren is niet meegerekend.":""}<br><small>Om vergelijkbaar met de genoemde methode te rekenen, worden gemiste terugleververgoeding en terugleverkosten niet in deze hoofdschatting verwerkt.</small>`;
  $("resultWarning").textContent=Number.isFinite(payback)&&payback>15?"Let op: deze terugverdientijd is langer dan een veelgebruikte rekenlevensduur van ongeveer 15 jaar.":"";
  const indication=contractIndications[contract];
  $("priceIndication").innerHTML=contract==="dynamic"
    ? `<strong>Dynamische rekenaannames</strong><br>${indication.text} Controleer deze bedragen met jouw eigen historische data.`
    : `<strong>Gebruik jouw eigen contractgegevens</strong><br>${indication.text}`;
  $("buyPrice").disabled=false;$("feedInPriceSimple").disabled=false;
  $("buyPriceHelp").textContent=contract==="dynamic"?"Gemiddelde dure all-in prijs":"Overnemen van jouw contract";
  $("feedInPriceHelp").textContent="Overnemen van jouw contract of leverancier";
  localStorage.setItem("zonlijnSimpleBattery",JSON.stringify({hasSolar,contract,values:Object.fromEntries(ids.map(id=>[id,$(id).value]))}));
}
function selectButtons(container,button){container.querySelectorAll("button").forEach(item=>item.classList.toggle("selected",item===button));}
document.querySelectorAll("[data-capacity]").forEach(button=>button.addEventListener("click",()=>{selectButtons($("capacityButtons"),button);$("capacity").value=button.dataset.capacity;calculate()}));
document.querySelectorAll("#solarButtons button").forEach(button=>button.addEventListener("click",()=>{selectButtons($("solarButtons"),button);hasSolar=button.dataset.value==="yes";$("solarYieldLabel").style.display=hasSolar?"grid":"none";$("directUseLabel").style.display=hasSolar?"grid":"none";calculate()}));
document.querySelectorAll("#contractButtons button").forEach(button=>button.addEventListener("click",()=>{
  selectButtons($("contractButtons"),button);contract=button.dataset.value;const indication=contractIndications[contract];
  if(contract==="dynamic"){$("buyPrice").value=indication.buy;$("feedInPriceSimple").value=indication.feed;}
  document.querySelectorAll(".dynamic-only").forEach(el=>el.style.display=contract==="dynamic"?"grid":"none");$("feedInCostLabel").style.display=contract==="dynamic"?"none":"grid";calculate()
}));
$("advancedToggle").addEventListener("click",()=>{const open=$("advancedFields").classList.toggle("visible");$("advancedToggle").innerHTML=`Meer instellingen ${open?"verbergen":"tonen"} <span>${open?"−":"+"}</span>`});
ids.forEach(id=>$(id).addEventListener("input",calculate));
function restore(){
  const s=JSON.parse(localStorage.getItem("zonlijnSimpleBattery")||"null");if(!s)return;
  hasSolar=s.hasSolar;contract=s.contract;Object.entries(s.values||{}).forEach(([id,v])=>{if($(id))$(id).value=v});
  document.querySelectorAll("#solarButtons button").forEach(button=>button.classList.toggle("selected",(button.dataset.value==="yes")===hasSolar));
  document.querySelectorAll("#contractButtons button").forEach(button=>button.classList.toggle("selected",button.dataset.value===contract));
  $("solarYieldLabel").style.display=hasSolar?"grid":"none";$("directUseLabel").style.display=hasSolar?"grid":"none";
  document.querySelectorAll(".dynamic-only").forEach(el=>el.style.display=contract==="dynamic"?"grid":"none");$("feedInCostLabel").style.display=contract==="dynamic"?"none":"grid";
}
restore();calculate();
