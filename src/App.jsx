import { useState, useEffect, useCallback, useRef } from 'react';

// ═══ CONFIG ═══
const OK="5d7725f468024e0572ed41f5e5f47558";
const E={nfl:"https://site.api.espn.com/apis/site/v2/sports/football/nfl",cfb:"https://site.api.espn.com/apis/site/v2/sports/football/college-football",cbb:"https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball",nba:"https://site.api.espn.com/apis/site/v2/sports/basketball/nba",mlb:"https://site.api.espn.com/apis/site/v2/sports/baseball/mlb",nhl:"https://site.api.espn.com/apis/site/v2/sports/hockey/nhl",clx:"https://site.api.espn.com/apis/site/v2/sports/lacrosse/mens-college-lacrosse"};
const SD={bg:"#0a0e14",sf:"#111820",cd:"#161d27",bd:"#1e2a38",bh:"#2a3a4e",tx:"#edf2f7",sub:"#7f8ea0",dm:"#475569",ac:"#3b82f6",gn:"#10b981",rd:"#ef4444",yl:"#eab308",or:"#f97316",pp:"#a855f7",pk:"#ec4899",tl:"#06b6d4"};
const SL={bg:"#f0f2f5",sf:"#ffffff",cd:"#ffffff",bd:"#e2e8f0",bh:"#cbd5e1",tx:"#1a202c",sub:"#4a5568",dm:"#94a3b8",ac:"#2563eb",gn:"#059669",rd:"#dc2626",yl:"#ca8a04",or:"#ea580c",pp:"#7c3aed",pk:"#db2777",tl:"#0891b2"};
let S={...SD};
const F="'Inter',system-ui,sans-serif";
const PC={QB:"#ef4444",RB:"#10b981",WR:"#3b82f6",TE:"#f59e0b",K:"#10b981",LB:"#f97316",CB:"#ec4899",S:"#10b981",DE:"#a855f7",DT:"#a855f7",PG:"#3b82f6",SG:"#ef4444",SF:"#10b981",PF:"#f59e0b",C:"#a855f7",G:"#3b82f6",F:"#10b981",SP:"#ef4444",RP:"#f97316","1B":"#10b981","2B":"#3b82f6","3B":"#f59e0b",SS:"#ec4899",LF:"#a855f7",CF:"#06b6d4",RF:"#10b981",DH:"#f97316",P:"#ef4444",LW:"#ef4444",RW:"#10b981",D:"#3b82f6",GK:"#f59e0b",A:"#ef4444",M:"#3b82f6",FO:"#f97316",LSM:"#a855f7",GOAL:"#f59e0b"};

// ═══ TEAMS ═══
const NFL=[{a:"ARI",f:"Arizona Cardinals",c:"NFC",d:"West",cl:"#97233F",eid:22},{a:"ATL",f:"Atlanta Falcons",c:"NFC",d:"South",cl:"#A71930",eid:1},{a:"BAL",f:"Baltimore Ravens",c:"AFC",d:"North",cl:"#241773",eid:33},{a:"BUF",f:"Buffalo Bills",c:"AFC",d:"East",cl:"#00338D",eid:2},{a:"CAR",f:"Carolina Panthers",c:"NFC",d:"South",cl:"#0085CA",eid:29},{a:"CHI",f:"Chicago Bears",c:"NFC",d:"North",cl:"#C83803",eid:3},{a:"CIN",f:"Cincinnati Bengals",c:"AFC",d:"North",cl:"#FB4F14",eid:4},{a:"CLE",f:"Cleveland Browns",c:"AFC",d:"North",cl:"#FF3C00",eid:5},{a:"DAL",f:"Dallas Cowboys",c:"NFC",d:"East",cl:"#003594",eid:6},{a:"DEN",f:"Denver Broncos",c:"AFC",d:"West",cl:"#FB4F14",eid:7},{a:"DET",f:"Detroit Lions",c:"NFC",d:"North",cl:"#0076B6",eid:8},{a:"GB",f:"Green Bay Packers",c:"NFC",d:"North",cl:"#203731",eid:9},{a:"HOU",f:"Houston Texans",c:"AFC",d:"South",cl:"#03202F",eid:34},{a:"IND",f:"Indianapolis Colts",c:"AFC",d:"South",cl:"#002C5F",eid:11},{a:"JAX",f:"Jacksonville Jaguars",c:"AFC",d:"South",cl:"#006778",eid:30},{a:"KC",f:"Kansas City Chiefs",c:"AFC",d:"West",cl:"#E31837",eid:12},{a:"LV",f:"Las Vegas Raiders",c:"AFC",d:"West",cl:"#A5ACAF",eid:13},{a:"LAC",f:"Los Angeles Chargers",c:"AFC",d:"West",cl:"#0080C6",eid:24},{a:"LAR",f:"Los Angeles Rams",c:"NFC",d:"West",cl:"#003594",eid:14},{a:"MIA",f:"Miami Dolphins",c:"AFC",d:"East",cl:"#008E97",eid:15},{a:"MIN",f:"Minnesota Vikings",c:"NFC",d:"North",cl:"#4F2683",eid:16},{a:"NE",f:"New England Patriots",c:"AFC",d:"East",cl:"#002244",eid:17},{a:"NO",f:"New Orleans Saints",c:"NFC",d:"South",cl:"#D3BC8D",eid:18},{a:"NYG",f:"New York Giants",c:"NFC",d:"East",cl:"#0B2265",eid:19},{a:"NYJ",f:"New York Jets",c:"AFC",d:"East",cl:"#125740",eid:20},{a:"PHI",f:"Philadelphia Eagles",c:"NFC",d:"East",cl:"#004C54",eid:21},{a:"PIT",f:"Pittsburgh Steelers",c:"AFC",d:"North",cl:"#FFB612",eid:23},{a:"SF",f:"San Francisco 49ers",c:"NFC",d:"West",cl:"#AA0000",eid:25},{a:"SEA",f:"Seattle Seahawks",c:"NFC",d:"West",cl:"#69BE28",eid:26},{a:"TB",f:"Tampa Bay Buccaneers",c:"NFC",d:"South",cl:"#D50A0A",eid:27},{a:"TEN",f:"Tennessee Titans",c:"AFC",d:"South",cl:"#4B92DB",eid:10},{a:"WAS",f:"Washington Commanders",c:"NFC",d:"East",cl:"#773141",eid:28}];
const CFB=[{n:"Alabama",cn:"SEC",cl:"#9E1B32",eid:333},{n:"Georgia",cn:"SEC",cl:"#BA0C2F",eid:61},{n:"Ohio State",cn:"Big Ten",cl:"#BB0000",eid:194},{n:"Michigan",cn:"Big Ten",cl:"#00274C",eid:130},{n:"Texas",cn:"SEC",cl:"#BF5700",eid:251},{n:"Oregon",cn:"Big Ten",cl:"#154733",eid:2483},{n:"Penn State",cn:"Big Ten",cl:"#041E42",eid:213},{n:"Notre Dame",cn:"Ind",cl:"#0C2340",eid:87},{n:"Clemson",cn:"ACC",cl:"#F66733",eid:228},{n:"LSU",cn:"SEC",cl:"#461D7C",eid:99},{n:"Tennessee",cn:"SEC",cl:"#FF8200",eid:2633},{n:"USC",cn:"Big Ten",cl:"#990000",eid:30},{n:"Miami",cn:"ACC",cl:"#005030",eid:2390},{n:"Florida State",cn:"ACC",cl:"#782F40",eid:52},{n:"Oklahoma",cn:"SEC",cl:"#841617",eid:201},{n:"Florida",cn:"SEC",cl:"#0021A5",eid:57},{n:"Colorado",cn:"Big 12",cl:"#CFB87C",eid:38},{n:"Ole Miss",cn:"SEC",cl:"#CE1126",eid:145},{n:"Kansas State",cn:"Big 12",cl:"#512888",eid:2306},{n:"Boise State",cn:"MWC",cl:"#0033A0",eid:68}];
const CBB=[{n:"UConn",cn:"Big East",cl:"#002868",eid:41},{n:"Purdue",cn:"Big Ten",cl:"#CEB888",eid:2509},{n:"Houston",cn:"Big 12",cl:"#C8102E",eid:248},{n:"Kansas",cn:"Big 12",cl:"#0051BA",eid:2305},{n:"Duke",cn:"ACC",cl:"#003087",eid:150},{n:"North Carolina",cn:"ACC",cl:"#7BAFD4",eid:153},{n:"Kentucky",cn:"SEC",cl:"#0033A0",eid:96},{n:"Arizona",cn:"Big 12",cl:"#CC0033",eid:12},{n:"Auburn",cn:"SEC",cl:"#F26522",eid:2},{n:"Tennessee",cn:"SEC",cl:"#FF8200",eid:2633},{n:"Gonzaga",cn:"WCC",cl:"#002967",eid:2250},{n:"Marquette",cn:"Big East",cl:"#003366",eid:269},{n:"Iowa State",cn:"Big 12",cl:"#C8102E",eid:66},{n:"Alabama",cn:"SEC",cl:"#9E1B32",eid:333},{n:"Michigan State",cn:"Big Ten",cl:"#18453B",eid:127},{n:"Illinois",cn:"Big Ten",cl:"#E84A27",eid:356},{n:"Florida",cn:"SEC",cl:"#0021A5",eid:57},{n:"St. John's",cn:"Big East",cl:"#C8102E",eid:2599},{n:"Wisconsin",cn:"Big Ten",cl:"#C5050C",eid:275},{n:"Oregon",cn:"Big Ten",cl:"#154733",eid:2483},{n:"Baylor",cn:"Big 12",cl:"#003015",eid:239},{n:"Creighton",cn:"Big East",cl:"#005CA9",eid:156},{n:"UCLA",cn:"Big Ten",cl:"#2D68C4",eid:26},{n:"Texas",cn:"SEC",cl:"#BF5700",eid:251}];
const CLX=[{n:"Syracuse",cn:"ACC",cl:"#F76900",eid:183},{n:"Virginia",cn:"ACC",cl:"#232D4B",eid:258},{n:"Duke",cn:"ACC",cl:"#003087",eid:150},{n:"Maryland",cn:"Big Ten",cl:"#E03A3E",eid:120},{n:"Notre Dame",cn:"ACC",cl:"#0C2340",eid:87},{n:"Johns Hopkins",cn:"Big Ten",cl:"#002D72",eid:2172},{n:"North Carolina",cn:"ACC",cl:"#7BAFD4",eid:153},{n:"Penn State",cn:"Big Ten",cl:"#041E42",eid:213},{n:"Denver",cn:"Big East",cl:"#8B2332",eid:2169},{n:"Georgetown",cn:"Big East",cl:"#041E42",eid:46},{n:"Cornell",cn:"Ivy",cl:"#B31B1B",eid:172},{n:"Yale",cn:"Ivy",cl:"#00356B",eid:43},{n:"Army",cn:"Patriot",cl:"#D3BC8D",eid:349},{n:"Navy",cn:"Patriot",cl:"#00205B",eid:2426},{n:"Loyola MD",cn:"Patriot",cl:"#006747",eid:2331},{n:"Albany",cn:"CAA",cl:"#461660",eid:399},{n:"Rutgers",cn:"Big Ten",cl:"#CC0033",eid:164},{n:"Ohio State",cn:"Big Ten",cl:"#BB0000",eid:194},{n:"Princeton",cn:"Ivy",cl:"#FF8F00",eid:163},{n:"Towson",cn:"CAA",cl:"#FFB81C",eid:119}];

const NBA=[{a:"ATL",f:"Atlanta Hawks",c:"East",d:"Southeast",cl:"#E03A3E",eid:1},{a:"BOS",f:"Boston Celtics",c:"East",d:"Atlantic",cl:"#007A33",eid:2},{a:"BKN",f:"Brooklyn Nets",c:"East",d:"Atlantic",cl:"#000000",eid:17},{a:"CHA",f:"Charlotte Hornets",c:"East",d:"Southeast",cl:"#1D1160",eid:30},{a:"CHI",f:"Chicago Bulls",c:"East",d:"Central",cl:"#CE1141",eid:4},{a:"CLE",f:"Cleveland Cavaliers",c:"East",d:"Central",cl:"#860038",eid:5},{a:"DAL",f:"Dallas Mavericks",c:"West",d:"Southwest",cl:"#00538C",eid:6},{a:"DEN",f:"Denver Nuggets",c:"West",d:"Northwest",cl:"#0E2240",eid:7},{a:"DET",f:"Detroit Pistons",c:"East",d:"Central",cl:"#C8102E",eid:8},{a:"GSW",f:"Golden State Warriors",c:"West",d:"Pacific",cl:"#1D428A",eid:9},{a:"HOU",f:"Houston Rockets",c:"West",d:"Southwest",cl:"#CE1141",eid:10},{a:"IND",f:"Indiana Pacers",c:"East",d:"Central",cl:"#002D62",eid:11},{a:"LAC",f:"LA Clippers",c:"West",d:"Pacific",cl:"#C8102E",eid:12},{a:"LAL",f:"Los Angeles Lakers",c:"West",d:"Pacific",cl:"#552583",eid:13},{a:"MEM",f:"Memphis Grizzlies",c:"West",d:"Southwest",cl:"#5D76A9",eid:29},{a:"MIA",f:"Miami Heat",c:"East",d:"Southeast",cl:"#98002E",eid:14},{a:"MIL",f:"Milwaukee Bucks",c:"East",d:"Central",cl:"#00471B",eid:15},{a:"MIN",f:"Minnesota Timberwolves",c:"West",d:"Northwest",cl:"#0C2340",eid:16},{a:"NOP",f:"New Orleans Pelicans",c:"West",d:"Southwest",cl:"#0C2340",eid:3},{a:"NYK",f:"New York Knicks",c:"East",d:"Atlantic",cl:"#006BB6",eid:18},{a:"OKC",f:"Oklahoma City Thunder",c:"West",d:"Northwest",cl:"#007AC1",eid:25},{a:"ORL",f:"Orlando Magic",c:"East",d:"Southeast",cl:"#0077C0",eid:19},{a:"PHI",f:"Philadelphia 76ers",c:"East",d:"Atlantic",cl:"#006BB6",eid:20},{a:"PHX",f:"Phoenix Suns",c:"West",d:"Pacific",cl:"#1D1160",eid:21},{a:"POR",f:"Portland Trail Blazers",c:"West",d:"Northwest",cl:"#E03A3E",eid:22},{a:"SAC",f:"Sacramento Kings",c:"West",d:"Pacific",cl:"#5A2D81",eid:23},{a:"SAS",f:"San Antonio Spurs",c:"West",d:"Southwest",cl:"#C4CED4",eid:24},{a:"TOR",f:"Toronto Raptors",c:"East",d:"Atlantic",cl:"#CE1141",eid:28},{a:"UTA",f:"Utah Jazz",c:"West",d:"Northwest",cl:"#002B5C",eid:26},{a:"WAS",f:"Washington Wizards",c:"East",d:"Southeast",cl:"#002B5C",eid:27}];
const MLB=[{a:"ARI",f:"Arizona Diamondbacks",c:"NL",d:"West",cl:"#A71930",eid:29},{a:"ATL",f:"Atlanta Braves",c:"NL",d:"East",cl:"#CE1141",eid:15},{a:"BAL",f:"Baltimore Orioles",c:"AL",d:"East",cl:"#DF4601",eid:1},{a:"BOS",f:"Boston Red Sox",c:"AL",d:"East",cl:"#BD3039",eid:2},{a:"CHC",f:"Chicago Cubs",c:"NL",d:"Central",cl:"#0E3386",eid:16},{a:"CWS",f:"Chicago White Sox",c:"AL",d:"Central",cl:"#27251F",eid:4},{a:"CIN",f:"Cincinnati Reds",c:"NL",d:"Central",cl:"#C6011F",eid:17},{a:"CLE",f:"Cleveland Guardians",c:"AL",d:"Central",cl:"#00385D",eid:5},{a:"COL",f:"Colorado Rockies",c:"NL",d:"West",cl:"#33006F",eid:27},{a:"DET",f:"Detroit Tigers",c:"AL",d:"Central",cl:"#0C2340",eid:6},{a:"HOU",f:"Houston Astros",c:"AL",d:"West",cl:"#002D62",eid:18},{a:"KC",f:"Kansas City Royals",c:"AL",d:"Central",cl:"#004687",eid:7},{a:"LAA",f:"Los Angeles Angels",c:"AL",d:"West",cl:"#BA0021",eid:3},{a:"LAD",f:"Los Angeles Dodgers",c:"NL",d:"West",cl:"#005A9C",eid:19},{a:"MIA",f:"Miami Marlins",c:"NL",d:"East",cl:"#00A3E0",eid:28},{a:"MIL",f:"Milwaukee Brewers",c:"NL",d:"Central",cl:"#FFC52F",eid:8},{a:"MIN",f:"Minnesota Twins",c:"AL",d:"Central",cl:"#002B5C",eid:9},{a:"NYM",f:"New York Mets",c:"NL",d:"East",cl:"#002D72",eid:21},{a:"NYY",f:"New York Yankees",c:"AL",d:"East",cl:"#003087",eid:10},{a:"OAK",f:"Oakland Athletics",c:"AL",d:"West",cl:"#003831",eid:11},{a:"PHI",f:"Philadelphia Phillies",c:"NL",d:"East",cl:"#E81828",eid:22},{a:"PIT",f:"Pittsburgh Pirates",c:"NL",d:"Central",cl:"#27251F",eid:23},{a:"SD",f:"San Diego Padres",c:"NL",d:"West",cl:"#2F241D",eid:25},{a:"SF",f:"San Francisco Giants",c:"NL",d:"West",cl:"#FD5A1E",eid:26},{a:"SEA",f:"Seattle Mariners",c:"AL",d:"West",cl:"#0C2C56",eid:12},{a:"STL",f:"St. Louis Cardinals",c:"NL",d:"Central",cl:"#C41E3A",eid:24},{a:"TB",f:"Tampa Bay Rays",c:"AL",d:"East",cl:"#092C5C",eid:30},{a:"TEX",f:"Texas Rangers",c:"AL",d:"West",cl:"#003278",eid:13},{a:"TOR",f:"Toronto Blue Jays",c:"AL",d:"East",cl:"#134A8E",eid:14},{a:"WAS",f:"Washington Nationals",c:"NL",d:"East",cl:"#AB0003",eid:20}];
const NHL=[{a:"ANA",f:"Anaheim Ducks",c:"West",d:"Pacific",cl:"#F47A38",eid:25},{a:"BOS",f:"Boston Bruins",c:"East",d:"Atlantic",cl:"#FFB81C",eid:1},{a:"BUF",f:"Buffalo Sabres",c:"East",d:"Atlantic",cl:"#003087",eid:2},{a:"CGY",f:"Calgary Flames",c:"West",d:"Pacific",cl:"#D2001C",eid:3},{a:"CAR",f:"Carolina Hurricanes",c:"East",d:"Metropolitan",cl:"#CC0000",eid:7},{a:"CHI",f:"Chicago Blackhawks",c:"West",d:"Central",cl:"#CF0A2C",eid:4},{a:"COL",f:"Colorado Avalanche",c:"West",d:"Central",cl:"#6F263D",eid:17},{a:"CBJ",f:"Columbus Blue Jackets",c:"East",d:"Metropolitan",cl:"#002654",eid:29},{a:"DAL",f:"Dallas Stars",c:"West",d:"Central",cl:"#006847",eid:9},{a:"DET",f:"Detroit Red Wings",c:"East",d:"Atlantic",cl:"#CE1126",eid:5},{a:"EDM",f:"Edmonton Oilers",c:"West",d:"Pacific",cl:"#041E42",eid:6},{a:"FLA",f:"Florida Panthers",c:"East",d:"Atlantic",cl:"#041E42",eid:26},{a:"LAK",f:"Los Angeles Kings",c:"West",d:"Pacific",cl:"#111111",eid:8},{a:"MIN",f:"Minnesota Wild",c:"West",d:"Central",cl:"#154734",eid:30},{a:"MTL",f:"Montreal Canadiens",c:"East",d:"Atlantic",cl:"#AF1E2D",eid:10},{a:"NSH",f:"Nashville Predators",c:"West",d:"Central",cl:"#FFB81C",eid:27},{a:"NJD",f:"New Jersey Devils",c:"East",d:"Metropolitan",cl:"#CE1126",eid:11},{a:"NYI",f:"New York Islanders",c:"East",d:"Metropolitan",cl:"#00539B",eid:12},{a:"NYR",f:"New York Rangers",c:"East",d:"Metropolitan",cl:"#0038A8",eid:13},{a:"OTT",f:"Ottawa Senators",c:"East",d:"Atlantic",cl:"#C52032",eid:14},{a:"PHI",f:"Philadelphia Flyers",c:"East",d:"Metropolitan",cl:"#F74902",eid:15},{a:"PIT",f:"Pittsburgh Penguins",c:"East",d:"Metropolitan",cl:"#FCB514",eid:16},{a:"SJS",f:"San Jose Sharks",c:"West",d:"Pacific",cl:"#006D75",eid:18},{a:"SEA",f:"Seattle Kraken",c:"West",d:"Pacific",cl:"#99D9D9",eid:36},{a:"STL",f:"St. Louis Blues",c:"West",d:"Central",cl:"#002F87",eid:19},{a:"TBL",f:"Tampa Bay Lightning",c:"East",d:"Atlantic",cl:"#002868",eid:20},{a:"TOR",f:"Toronto Maple Leafs",c:"East",d:"Atlantic",cl:"#00205B",eid:21},{a:"UTA",f:"Utah Hockey Club",c:"West",d:"Central",cl:"#69B3E7",eid:37},{a:"VAN",f:"Vancouver Canucks",c:"West",d:"Pacific",cl:"#00205B",eid:22},{a:"VGK",f:"Vegas Golden Knights",c:"West",d:"Pacific",cl:"#B4975A",eid:33},{a:"WAS",f:"Washington Capitals",c:"East",d:"Metropolitan",cl:"#C8102E",eid:23},{a:"WPG",f:"Winnipeg Jets",c:"West",d:"Central",cl:"#041E42",eid:24}];
const CONFS=["ALL","SEC","Big Ten","Big 12","ACC","Big East","WCC","MWC","AAC","Pac-12"];

// ═══ UTILS ═══
const fd=d=>{try{return new Date(d).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});}catch{return"TBD";}};
const ft=d=>{try{return new Date(d).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});}catch{return"";}};
const fo=v=>v==null?"—":v>0?"+"+v:""+v;
const nL=a=>`https://a.espncdn.com/i/teamlogos/nfl/500/${(a||"").toLowerCase()}.png`;
const nbL=eid=>`https://a.espncdn.com/i/teamlogos/nba/500/${eid}.png`;
const mlL=eid=>`https://a.espncdn.com/i/teamlogos/mlb/500/${eid}.png`;
const nhL=eid=>`https://a.espncdn.com/i/teamlogos/nhl/500/${eid}.png`;
const cL=eid=>`https://a.espncdn.com/i/teamlogos/ncaa/500/${eid}.png`;
function ds(off=0){const d=new Date();d.setDate(d.getDate()+off);return d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0");}
async function ef(url){try{const r=await fetch(url);if(!r.ok)return null;return await r.json();}catch{return null;}}
// Parse ESPN leader displayValue: "22-34, 251 YDS, 3 TD" → 251, "18 CAR, 112 YDS, 1 TD" → 112
function parseYds(v){if(!v)return 0;const m=String(v).match(/(\d+)\s*YDS/i);if(m)return parseInt(m[1],10);const m2=String(v).match(/(\d+)\s*(?:REC|CAR|PTS|PT)/i);if(m2)return parseInt(m2[1],10);const nums=String(v).match(/\d+/g);return nums?parseInt(nums[nums.length>1?1:0],10):0;}
// Get headshot URL from either string or {href:""} object
function hsUrl(hs){if(!hs)return null;if(typeof hs==="string")return hs;return hs.href||null;}

// ═══ BET STATE — window global so it persists across tab switches ═══
if(!window._ghqB)window._ghqB=[];
if(!window._ghqFav)window._ghqFav=[];
if(!window._ghqTheme)window._ghqTheme='dark';
if(!window._ghqV)window._ghqV=0;
function useBets(){
  const[b,sB]=useState([...window._ghqB]);
  const vRef=useRef(window._ghqV);
  const upd=useCallback(fn=>{const n=typeof fn==="function"?fn(window._ghqB):fn;window._ghqB=n;window._ghqV++;sB([...n]);},[]);
  useEffect(()=>{const i=setInterval(()=>{if(window._ghqV!==vRef.current){vRef.current=window._ghqV;sB([...window._ghqB]);}},200);return()=>clearInterval(i);},[]);
  return[b,upd];
}
function addBet(game,pick,type,odds){
  window._ghqB=[...window._ghqB,{id:Date.now(),game,pick,type,odds:String(odds),amount:"10",result:"pending",ts:Date.now()}];
  window._ghqV++;
  let t=document.getElementById("_ghqt");
  if(!t){t=document.createElement("div");t.id="_ghqt";t.style.cssText="position:fixed;bottom:20px;right:20px;background:#10b981;color:#fff;padding:10px 18px;border-radius:10px;font-family:Inter,sans-serif;font-size:13px;font-weight:700;z-index:9999;opacity:0;transition:opacity .3s;pointer-events:none;box-shadow:0 4px 20px rgba(16,185,129,.4);";document.body.appendChild(t);}
  t.textContent="✓ "+pick+" → Bet Tracker";t.style.opacity="1";setTimeout(()=>t.style.opacity="0",1800);
}

// ═══ UI COMPONENTS ═══
const Badge=({p})=>{const c=PC[p?.toUpperCase()]||S.sub;return<span style={{background:c+"20",color:c,padding:"2px 7px",borderRadius:4,fontSize:10,fontWeight:700,fontFamily:F}}>{p||"—"}</span>;};
const Pill=({l,a,c=S.ac,onClick,sm})=><button onClick={onClick} style={{padding:sm?"3px 8px":"5px 12px",borderRadius:6,cursor:"pointer",border:"1px solid "+(a?c+"55":S.bd),background:a?c+"15":"transparent",color:a?c:S.sub,fontFamily:F,fontWeight:a?700:500,fontSize:sm?10:11,transition:"all .15s",whiteSpace:"nowrap"}}>{l}</button>;
const Spin=({t})=><div style={{padding:50,textAlign:"center"}}><div style={{width:26,height:26,border:"3px solid "+S.bd,borderTopColor:S.ac,borderRadius:"50%",margin:"0 auto 12px",animation:"spin .6s linear infinite"}}/><div style={{fontFamily:F,fontSize:12,color:S.dm}}>{t||"Loading..."}</div></div>;
const Emp=({t,ic})=><div style={{padding:50,textAlign:"center"}}>{ic&&<div style={{fontSize:32,marginBottom:10}}>{ic}</div>}<div style={{color:S.dm,fontFamily:F,fontSize:13}}>{t}</div></div>;
const Err=({m})=>m?<div style={{padding:"10px 14px",margin:"0 0 12px",background:S.rd+"0c",border:"1px solid "+S.rd+"20",borderRadius:8,fontFamily:F,fontSize:12,color:S.rd}}>⚠️ {m}</div>:null;
const Logo=({size=28})=>{const uid="lg"+size;return<svg width={size} height={size} viewBox="0 0 100 100" style={{borderRadius:size*.22,flexShrink:0}}>
  <defs><linearGradient id={uid} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0d1520"/><stop offset="100%" stopColor="#0a1628"/></linearGradient></defs>
  <rect width="100" height="100" rx="22" fill={`url(#${uid})`}/>
  <path d="M65,30 C55,30 47,33 42,38 C37,43 34,50 34,58 C34,66 37,72 42,77 C47,82 55,85 65,85 L65,62 L52,62 L52,53 L75,53 L75,85 C70,87 65,88 58,88 C47,88 38,84 32,78 C26,72 22,63 22,54 C22,44 26,36 32,30 C38,24 47,20 58,20 C65,20 71,21 76,24 L72,34 C68,32 65,30 65,30 Z" fill="#10b981" opacity="0.95"/>
  <line x1="20" y1="52" x2="35" y2="48" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
  <line x1="20" y1="58" x2="33" y2="55" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
  <line x1="22" y1="64" x2="33" y2="62" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
</svg>;};

function Card({children,style,hover,onClick}){const[h,setH]=useState(false);return<div onClick={onClick} onMouseEnter={()=>(hover||onClick)&&setH(true)} onMouseLeave={()=>setH(false)} style={{background:S.cd,border:"1px solid "+(h?S.bh:S.bd),borderRadius:10,overflow:"hidden",transition:"all .15s",cursor:onClick?"pointer":"default",...(style||{})}}>{children}</div>;}
const SB=({l,v,c})=><Card style={{padding:12,textAlign:"center"}}><div style={{fontFamily:F,fontSize:9,color:S.dm,marginBottom:3,fontWeight:700,letterSpacing:.5}}>{l}</div><div style={{fontFamily:F,fontSize:20,fontWeight:800,color:c||S.ac}}>{v}</div></Card>;

// ═══ RICH PLAYER MODAL — bio, stats, news, game log, ESPN link ═══
function PM({pid,info,sport,onClose}){
  const[prof,setProf]=useState(null);const[news,setNews]=useState([]);const[games,setGames]=useState([]);const[ld,setLd]=useState(true);const[tab,setTab]=useState("overview");
  const sp=sport==="nfl"?"football/nfl":sport==="cfb"?"football/college-football":"basketball/mens-college-basketball";
  const spShort=sport==="nfl"?"nfl":sport==="cfb"?"college-football":"mens-college-basketball";
  useEffect(()=>{if(!pid)return;setLd(true);setProf(null);setNews([]);setGames([]);(async()=>{
    // 1. Try profile endpoint
    let p=null;
    for(const u of[
      `https://site.api.espn.com/apis/site/v2/sports/${sp}/players/${pid}`,
      `https://site.web.api.espn.com/apis/site/v2/sports/${sp}/players/${pid}`,
    ]){try{const r=await fetch(u);if(!r.ok)continue;const j=await r.json();p=j.athlete||j;if(p?.displayName)break;}catch{}}
    setProf(p);
    // 2. Fetch player news — general endpoint works, player/team endpoints CORS blocked
    try{
      const nm=info?.name||info?.dn||p?.displayName||"";
      if(nm){
        const allArts=[];
        const parts=nm.toLowerCase().split(" ").filter(w=>w.length>1);
        const lastName=parts[parts.length-1]||"";
        const firstName=parts[0]||"";
        // Fetch general news (works, ~40-80 articles)
        const nd=await ef(`${E[sport]}/news?limit=80`);
        (nd?.articles||[]).forEach(a=>{
          const txt=((a.headline||"")+" "+(a.description||"")).toLowerCase();
          // Match: full last name AND first name, or full display name
          if((lastName.length>2&&txt.includes(lastName)&&firstName.length>1&&txt.includes(firstName))||txt.includes(nm.toLowerCase()))
            allArts.push(a);
        });
        // Also try other sport news feeds for cross-sport coverage
        if(allArts.length<3&&sport==="nfl"){
          for(const alt of[E.cfb]){
            const nd2=await ef(`${alt}/news?limit=40`);
            (nd2?.articles||[]).forEach(a=>{
              const txt=((a.headline||"")+" "+(a.description||"")).toLowerCase();
              if(lastName.length>2&&txt.includes(lastName)&&firstName.length>1&&txt.includes(firstName))allArts.push(a);
            });
          }
        }
        // Deduplicate
        const seen=new Set();const unique=[];
        allArts.forEach(a=>{const k=a.headline||"";if(!seen.has(k)){seen.add(k);unique.push(a);}});
        setNews(unique.slice(0,8));
      }
    }catch{}
    // 3. Game log — find team games & extract player box score
    const teamId=info?.team?.id||p?.team?.id||info?.teamId;
    if(teamId){
      const gameIds=[];const extra=sport==="cfb"?"&groups=80":sport==="cbb"?"&groups=50":"";
      const yr=sport==="cbb"?2026:2025;
      if(sport!=="cbb"){
        for(const w of[18,17,16,15,14,13,12,11,10]){
          const sb=await ef(`${E[sport]}/scoreboard?dates=${yr}&seasontype=2&week=${w}&limit=200${extra}`);
          (sb?.events||[]).forEach(ev=>{const comp=ev.competitions?.[0];
            if(comp?.competitors?.some(x=>String(x.team?.id)===String(teamId)))gameIds.push({id:ev.id,name:ev.shortName||ev.name,date:comp.date,week:w});
          });if(gameIds.length>=6)break;
        }
      } else {
        for(let m=2;m>=0;m--){for(let d=28;d>=1;d-=4){
          const ds2=`${yr}${String(m+1).padStart(2,"0")}${String(d).padStart(2,"0")}`;
          const sb=await ef(`${E[sport]}/scoreboard?dates=${ds2}&limit=200&groups=50`);
          (sb?.events||[]).forEach(ev=>{const comp=ev.competitions?.[0];
            if(comp?.competitors?.some(x=>String(x.team?.id)===String(teamId)))gameIds.push({id:ev.id,name:ev.shortName||ev.name,date:comp.date,week:0});
          });if(gameIds.length>=6)break;}if(gameIds.length>=6)break;}
      }
      const gStats=[];
      for(const g of gameIds.slice(0,6)){
        const sum=await ef(`${E[sport]}/summary?event=${g.id}`);
        if(!sum?.boxscore?.players)continue;
        for(const tm of sum.boxscore.players){
          for(const sc of(tm.statistics||[])){
            for(const ath of(sc.athletes||[])){
              if(String(ath.athlete?.id)===String(pid)){
                gStats.push({week:g.week,game:g.name,date:g.date,cat:sc.name||sc.displayName,labels:sc.labels||[],stats:ath.stats||[]});
              }
            }
          }
        }
      }
      setGames(gStats);
    }
    setLd(false);
  })();},[pid]);
  if(!pid)return null;
  const p=prof;
  const name=String(p?.displayName||p?.fullName||info?.name||info?.dn||"Unknown");
  const img=hsUrl(p?.headshot)||info?.img||null;
  const pos=String(p?.position?.abbreviation||info?.pos||"");
  const jersey=String(p?.jersey||info?.num||"");
  const ht=String(p?.displayHeight||info?.ht||"");
  const wt=String(p?.displayWeight||info?.wt||"");
  const age=p?.age;const college=String(p?.college?.name||info?.college||"");const exp=String(p?.experience?.displayValue||"");
  const bp=p?.birthPlace;const draft=p?.draft;
  const teamName=String(p?.team?.displayName||(typeof info?.team==="string"?info.team:info?.team?.displayName||info?.team?.abbreviation||info?.team?.shortDisplayName||""));
  const teamLogo=p?.team?.logos?.[0]?.href||info?.team?.logos?.[0]?.href||info?.teamLogo||null;
  const espnLink=`https://www.espn.com/${spShort}/player/_/id/${pid}`;
  const stats=(p?.statistics||[]).filter(st=>(st.labels||st.statistics?.labels||[]).length>0);
  const byCat={};games.forEach(g=>{if(!byCat[g.cat])byCat[g.cat]={labels:g.labels,games:[]};byCat[g.cat].games.push(g);});
  const PTABS=[["overview","Overview"],["gamelog","Game Log"],["news","News"]];
  return<div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.8)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:12}}>
    <div onClick={e=>e.stopPropagation()} style={{background:S.cd,border:"1px solid "+S.bd,borderRadius:14,maxWidth:620,width:"100%",maxHeight:"88vh",overflow:"auto"}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${S.sf},${S.cd})`,padding:20,borderBottom:"1px solid "+S.bd,position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:12,right:12,background:S.bd,border:"none",color:S.tx,borderRadius:6,padding:"4px 10px",cursor:"pointer",fontFamily:F,fontWeight:600}}>✕</button>
        <div style={{display:"flex",gap:16,alignItems:"center"}}>
          {img?<img src={img} alt="" style={{width:85,height:85,borderRadius:12,objectFit:"cover",border:"2px solid "+S.bd}} onError={e=>{e.target.style.display="none"}}/>:<div style={{width:85,height:85,borderRadius:12,background:S.sf,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34}}>👤</div>}
          <div style={{flex:1}}>
            <div style={{fontFamily:F,fontSize:22,fontWeight:900,color:S.tx}}>{name}</div>
            <div style={{display:"flex",gap:8,marginTop:4,alignItems:"center",flexWrap:"wrap"}}>{teamLogo&&<img src={teamLogo} alt="" style={{width:20,height:20}}/>}<span style={{fontFamily:F,fontSize:13,color:S.sub}}>{teamName}</span><Badge p={pos}/></div>
            <div style={{fontFamily:F,fontSize:11,color:S.dm,marginTop:4}}>
              {jersey&&"#"+jersey}{ht&&" · "+ht}{wt&&" · "+wt}{age&&" · Age "+age}{college&&" · "+college}
            </div>
            {(exp||draft||bp)&&<div style={{fontFamily:F,fontSize:10,color:S.dm,marginTop:2}}>
              {exp&&"Exp: "+exp}{draft?.year&&" · Draft: "+draft.year+(draft.round?" Rd "+draft.round:"")+(draft.selection?" Pk "+draft.selection:"")}{bp?.city&&" · "+bp.city+(bp.state?", "+bp.state:"")}
            </div>}
            <a href={espnLink} target="_blank" rel="noopener noreferrer" style={{fontFamily:F,fontSize:10,color:S.ac,textDecoration:"none",fontWeight:600,marginTop:4,display:"inline-block"}}>View on ESPN →</a>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div style={{display:"flex",borderBottom:"1px solid "+S.bd}}>{PTABS.map(([k,l])=><button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"8px 0",fontFamily:F,fontSize:11,fontWeight:tab===k?700:500,color:tab===k?S.ac:S.dm,background:tab===k?S.ac+"08":"transparent",border:"none",borderBottom:"2px solid "+(tab===k?S.ac:"transparent"),cursor:"pointer"}}>{l}{k==="news"&&news.length>0?" ("+news.length+")":""}{k==="gamelog"&&games.length>0?" ("+games.length+")":""}</button>)}</div>
      <div style={{padding:16,minHeight:120}}>
        {ld?<Spin t="Loading player data..."/>:<>
          {tab==="overview"&&<>
            {/* Season Stats */}
            {stats.length>0?stats.slice(0,3).map((st,si)=>{
              const lbs=st.labels||st.statistics?.labels||[];const vs=st.displayValues||st.statistics?.displayValues||[];
              return<div key={si} style={{marginBottom:14}}>
                <div style={{fontFamily:F,fontSize:11,fontWeight:700,color:S.ac,marginBottom:6}}>{st.displayName||st.name||"Season Stats"}</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(58px,1fr))",gap:3}}>{lbs.map((lb,li)=><div key={li} style={{background:S.sf,borderRadius:6,padding:"5px 3px",textAlign:"center"}}><div style={{fontFamily:F,fontSize:7,color:S.dm,fontWeight:600}}>{lb}</div><div style={{fontFamily:F,fontSize:13,fontWeight:700,color:S.tx}}>{vs[li]||"—"}</div></div>)}</div></div>})
            :<div style={{padding:20,textAlign:"center"}}><div style={{fontFamily:F,fontSize:12,color:S.dm}}>Season stats not available via API</div><div style={{fontFamily:F,fontSize:10,color:S.dm,marginTop:4}}>Check the Game Log tab or <a href={espnLink} target="_blank" rel="noopener noreferrer" style={{color:S.ac}}>view on ESPN</a></div></div>}
          </>}
          {tab==="gamelog"&&<>
            {Object.keys(byCat).length>0?Object.entries(byCat).map(([catName,catData])=><div key={catName} style={{marginBottom:16}}>
              <div style={{fontFamily:F,fontSize:11,fontWeight:700,color:S.or,marginBottom:6}}>{catName.toUpperCase()}</div>
              <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:300}}><thead><tr style={{background:S.sf}}>
                <th style={{padding:"5px 6px",textAlign:"left",fontFamily:F,fontSize:8,color:S.dm,fontWeight:700,borderBottom:"1px solid "+S.bd}}>WK</th>
                <th style={{padding:"5px 6px",textAlign:"left",fontFamily:F,fontSize:8,color:S.dm,fontWeight:700,borderBottom:"1px solid "+S.bd}}>OPP</th>
                {catData.labels.map((lb,i)=><th key={i} style={{padding:"5px 4px",textAlign:"center",fontFamily:F,fontSize:7,color:S.dm,fontWeight:700,borderBottom:"1px solid "+S.bd,whiteSpace:"nowrap"}}>{lb}</th>)}
              </tr></thead><tbody>{catData.games.map((g,gi)=><tr key={gi} style={{borderBottom:"1px solid "+S.bd+"20"}}>
                <td style={{padding:"5px 6px",fontFamily:F,fontSize:11,fontWeight:700,color:S.tl}}>{g.week?"W"+g.week:fd(g.date)}</td>
                <td style={{padding:"5px 6px",fontFamily:F,fontSize:10,color:S.sub,maxWidth:80,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{g.game}</td>
                {g.stats.map((v,vi)=><td key={vi} style={{padding:"5px 4px",textAlign:"center",fontFamily:F,fontSize:11,fontWeight:600,color:S.tx}}>{v}</td>)}
              </tr>)}</tbody></table></div>
            </div>):<div style={{padding:20,textAlign:"center"}}><div style={{fontFamily:F,fontSize:12,color:S.dm}}>No game log data found</div><div style={{fontFamily:F,fontSize:10,color:S.dm,marginTop:4}}><a href={espnLink} target="_blank" rel="noopener noreferrer" style={{color:S.ac}}>View full game log on ESPN →</a></div></div>}
          </>}
          {tab==="news"&&<>
            {news.length>0?news.map((n,ni)=><div key={ni} style={{padding:"10px 0",borderBottom:"1px solid "+S.bd+"30",display:"flex",gap:10}}>
              {n.images?.[0]?.url&&<img src={n.images[0].url} alt="" style={{width:70,height:48,borderRadius:6,objectFit:"cover",flexShrink:0}}/>}
              <div style={{flex:1}}><div style={{fontFamily:F,fontSize:12,fontWeight:700,color:S.tx,lineHeight:1.3}}>{n.headline}</div>
                {n.description&&<div style={{fontFamily:F,fontSize:10,color:S.sub,marginTop:3,lineHeight:1.4}}>{n.description.slice(0,120)}...</div>}
                <div style={{display:"flex",gap:8,marginTop:4}}>{n.published&&<span style={{fontFamily:F,fontSize:9,color:S.dm}}>{fd(n.published)}</span>}{n.links?.web?.href&&<a href={n.links.web.href} target="_blank" rel="noopener noreferrer" style={{fontFamily:F,fontSize:9,color:S.ac,textDecoration:"none",fontWeight:600}}>Read →</a>}</div>
              </div>
            </div>):<div style={{padding:20,textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:8}}>📰</div>
              <div style={{fontFamily:F,fontSize:13,color:S.sub,marginBottom:12}}>News for {name}</div>
              <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"center"}}>
                <a href={espnLink} target="_blank" rel="noopener noreferrer" style={{fontFamily:F,fontSize:12,color:S.ac,textDecoration:"none",fontWeight:600,padding:"8px 16px",background:S.ac+"10",borderRadius:8,border:"1px solid "+S.ac+"30"}}>📺 View on ESPN →</a>
                <a href={`https://www.google.com/search?q=${encodeURIComponent(name+" "+teamName+" NFL news")}&tbm=nws`} target="_blank" rel="noopener noreferrer" style={{fontFamily:F,fontSize:12,color:S.or,textDecoration:"none",fontWeight:600,padding:"8px 16px",background:S.or+"10",borderRadius:8,border:"1px solid "+S.or+"30"}}>🔍 Google News →</a>
                <a href={`https://twitter.com/search?q=${encodeURIComponent(name)}&f=live`} target="_blank" rel="noopener noreferrer" style={{fontFamily:F,fontSize:12,color:S.tl,textDecoration:"none",fontWeight:600,padding:"8px 16px",background:S.tl+"10",borderRadius:8,border:"1px solid "+S.tl+"30"}}>🐦 Latest on X →</a>
              </div>
            </div>}
          </>}
        </>}
      </div>
    </div></div>;
}


// ═══ GAME DETAIL MODAL — full box score from /summary ═══
function GD({eid,sport,onClose}){
  const[d,setD]=useState(null);const[ld,setLd]=useState(true);const[selP,setSelP]=useState(null);
  useEffect(()=>{if(!eid)return;(async()=>{const r=await ef(`${E[sport]}/summary?event=${eid}`);setD(r);setLd(false);})();},[eid]);
  if(!eid)return null;
  const hdr=d?.header;const comp=hdr?.competitions?.[0];const box=d?.boxscore;const pred=d?.predictor;const gi=d?.gameInfo;const art=d?.article;
  return<div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div onClick={e=>e.stopPropagation()} style={{background:S.cd,border:"1px solid "+S.bd,borderRadius:14,maxWidth:650,width:"100%",maxHeight:"85vh",overflow:"auto"}}>
      {ld?<Spin t="Loading game details..."/>:!d?<Emp t="Game data unavailable"/>:<>
        {/* Score Header */}
        <div style={{padding:16,borderBottom:"1px solid "+S.bd,position:"relative"}}>
          <button onClick={onClose} style={{position:"absolute",top:10,right:10,background:S.bd,border:"none",color:S.tx,borderRadius:6,padding:"4px 10px",cursor:"pointer",fontFamily:F,fontWeight:600}}>✕</button>
          <div style={{fontFamily:F,fontSize:10,color:S.sub,marginBottom:10}}>{comp?.status?.type?.detail||""}{comp?.broadcasts?.[0]?.media?.shortName?" · 📺 "+comp.broadcasts[0].media.shortName:""}</div>
          {(comp?.competitors||[]).map((c,i)=>{const w=comp?.status?.type?.completed&&c.winner;return<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:i===0?"1px solid "+S.bd+"40":""}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>{c.team?.logos?.[0]?.href&&<img src={c.team.logos[0].href} alt="" style={{width:40,height:40}}/>}<div><div style={{fontFamily:F,fontWeight:800,fontSize:17,color:w?S.tx:S.sub}}>{c.team?.displayName||"TBD"}</div><div style={{fontFamily:F,fontSize:10,color:S.dm}}>{c.record?.[0]?.displayValue||""}</div></div></div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>{c.linescores?.map((ls,li)=><span key={li} style={{fontFamily:F,fontSize:11,color:S.dm,minWidth:18,textAlign:"center"}}>{ls.displayValue}</span>)}<span style={{fontFamily:F,fontSize:28,fontWeight:900,color:w?S.tx:S.sub,minWidth:40,textAlign:"right"}}>{c.score||"-"}</span></div></div>;})}
        </div>
        {/* Win Probability */}
        {pred&&<div style={{padding:"10px 16px",borderBottom:"1px solid "+S.bd}}><div style={{fontFamily:F,fontSize:10,fontWeight:700,color:S.pp,marginBottom:6}}>WIN PROBABILITY</div><div style={{display:"flex",gap:8}}>{(comp?.competitors||[]).map((c,i)=>{const ih=c.homeAway==="home";const raw=ih?pred.homeTeam:pred.awayTeam;const pct=raw?.gameProjection??raw?.winPercentage;const v=pct?Math.round(+pct):null;return<div key={i} style={{flex:1,background:S.sf,borderRadius:8,padding:10}}><div style={{fontFamily:F,fontSize:11,color:S.sub,fontWeight:600}}>{c.team?.abbreviation}</div><div style={{fontFamily:F,fontSize:24,fontWeight:900,color:v&&v>50?S.gn:S.sub}}>{v!=null?v+"%":"—"}</div>{v!=null&&<div style={{height:4,borderRadius:2,background:S.bd,marginTop:5}}><div style={{height:4,borderRadius:2,background:v>50?S.gn:S.rd,width:Math.max(v,3)+"%",transition:"width .3s"}}/></div>}</div>})}</div></div>}
        {/* Team Stats */}
        {(box?.teams||[]).length>=2&&<div style={{padding:"10px 16px",borderBottom:"1px solid "+S.bd}}><div style={{fontFamily:F,fontSize:10,fontWeight:700,color:S.or,marginBottom:8}}>TEAM STATS</div><div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"4px 0"}}>{(box.teams[0]?.statistics||[]).slice(0,10).map((st,si)=>{const v2=box.teams[1]?.statistics?.[si]?.displayValue||"—";return[<div key={si+"a"} style={{fontFamily:F,fontSize:12,fontWeight:700,color:S.tx,textAlign:"right",padding:"3px 8px"}}>{st.displayValue||"—"}</div>,<div key={si+"l"} style={{fontFamily:F,fontSize:9,color:S.dm,textAlign:"center",padding:"3px 10px",whiteSpace:"nowrap"}}>{st.label||st.name}</div>,<div key={si+"b"} style={{fontFamily:F,fontSize:12,fontWeight:700,color:S.tx,padding:"3px 8px"}}>{v2}</div>];}).flat()}</div></div>}
        {/* Player Stats */}
        {(box?.players||[]).length>0&&<div style={{padding:"10px 16px",borderBottom:"1px solid "+S.bd}}><div style={{fontFamily:F,fontSize:10,fontWeight:700,color:S.gn,marginBottom:6}}>PLAYER LEADERS</div>{(box.players||[]).map((tm,ti)=><div key={ti} style={{marginBottom:10}}><div style={{fontFamily:F,fontSize:12,fontWeight:700,color:S.ac,marginBottom:4}}>{tm.team?.displayName}</div>{(tm.statistics||[]).slice(0,3).map((cat,ci)=><div key={ci} style={{marginBottom:5}}><div style={{fontFamily:F,fontSize:9,color:S.dm,fontWeight:600,marginBottom:2}}>{cat.name?.toUpperCase()}</div>{(cat.athletes||[]).slice(0,2).map((a,ai)=><div key={ai} onClick={()=>a.athlete?.id&&setSelP({id:a.athlete.id,name:a.athlete.shortName||a.athlete.displayName,img:hsUrl(a.athlete?.headshot)})} style={{display:"flex",alignItems:"center",gap:8,padding:"3px 0",cursor:a.athlete?.id?"pointer":"default"}}>{hsUrl(a.athlete?.headshot)&&<img src={hsUrl(a.athlete?.headshot)} alt="" style={{width:22,height:22,borderRadius:5,objectFit:"cover"}}/>}<span style={{fontFamily:F,fontSize:12,fontWeight:600,color:S.tl,textDecoration:"underline",textDecorationColor:S.tl+"40",flex:1}}>{a.athlete?.shortName||a.athlete?.displayName||a.athlete?.lastName||"—"}</span><span style={{fontFamily:F,fontSize:10,color:S.yl,fontWeight:600}}>{a.stats?.slice(0,4).join(" / ")}</span></div>)}</div>)}</div>)}</div>}
        {/* Venue & Article */}
        {gi?.venue&&<div style={{padding:"8px 16px",borderBottom:"1px solid "+S.bd,fontFamily:F,fontSize:11,color:S.sub}}>📍 {gi.venue.fullName}{gi.venue.address?.city?", "+gi.venue.address.city:""}{gi.weather?" · 🌤 "+gi.weather.displayValue:""}</div>}
        {art&&<div style={{padding:"10px 16px"}}><div style={{fontFamily:F,fontSize:13,fontWeight:700,color:S.tx,marginBottom:4}}>{art.headline}</div>{art.story&&<div style={{fontFamily:F,fontSize:11,color:S.dm,lineHeight:1.5}}>{art.story.replace(/<[^>]+>/g,"").slice(0,300)}...</div>}</div>}
        {/* Key Plays / Scoring */}
        {(d?.scoringPlays||d?.keyEvents||[]).length>0&&<div style={{padding:"10px 16px"}}><div style={{fontFamily:F,fontSize:10,fontWeight:700,color:S.tl,marginBottom:8}}>SCORING PLAYS</div>
          {(d.scoringPlays||d.keyEvents||[]).slice(0,12).map((p,pi)=><div key={pi} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:"1px solid "+S.bd+"20"}}>
            {p.team?.logo&&<img src={p.team.logo} alt="" style={{width:18,height:18,marginTop:2}}/>}
            <div style={{flex:1}}><div style={{fontFamily:F,fontSize:11,fontWeight:600,color:S.tx}}>{p.text||p.shortText||p.type?.text||""}</div>
              <div style={{fontFamily:F,fontSize:9,color:S.dm,marginTop:2}}>{p.clock?.displayValue||""} {p.period?.number?"Q"+p.period.number:""} {p.awayScore&&p.homeScore?"· "+p.awayScore+"-"+p.homeScore:""}</div></div>
          </div>)}</div>}
      </>}</div>
    {selP&&<PM pid={selP?.id||selP} info={typeof selP==="object"?selP:null} sport={sport} onClose={()=>setSelP(null)}/>}
  </div>;
}

// ═══ GAME CARD — clickable odds strip ═══
function GC({ev,sport,onClick}){
  const comp=ev.competitions?.[0];if(!comp)return null;
  const{toggle,isFav}=useFavs();
  const away=comp.competitors?.find(x=>x.homeAway==="away");const home=comp.competitors?.find(x=>x.homeAway==="home");
  const st=comp.status?.type;const fin=st?.completed;const live=st?.state==="in";const pre=st?.state==="pre";
  const aw=fin&&+(away?.score||0)>+(home?.score||0);const hw=fin&&+(home?.score||0)>+(away?.score||0);
  const odds=comp.odds?.[0];const gn=(away?.team?.abbreviation||"?")+" @ "+(home?.team?.abbreviation||"?");
  const mkFav=(d)=>({abbr:d?.team?.abbreviation||"",name:d?.team?.shortDisplayName||d?.team?.displayName||"",sport,logo:d?.team?.logo||"",eid:d?.team?.id||""});
  // Win probability from ESPN situation data
  const sit=comp.situation;const awWp=sit?.lastPlay?.probability?.awayWinPercentage;const hmWp=sit?.lastPlay?.probability?.homeWinPercentage;
  const hasWp=live&&typeof awWp==="number"&&typeof hmWp==="number";
  return<Card hover onClick={onClick}><div style={{height:3,background:live?"linear-gradient(90deg,"+S.rd+","+S.yl+")":fin?S.gn:S.ac+"40"}}/><div style={{padding:"8px 10px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
      <span style={{fontFamily:F,fontSize:9,fontWeight:700,color:live?S.rd:fin?S.gn:S.ac}}>{live?"🔴 "+(st?.shortDetail||"LIVE"):fin?st?.detail||"Final":""}</span>
      {pre&&<span style={{fontFamily:F,fontSize:9,color:S.sub}}>{fd(comp.date)} · {ft(comp.date)}</span>}
    </div>
    {[{d:away,w:aw},{d:home,w:hw}].map((x,i)=>{const rk=x.d?.curatedRank?.current;const faved=isFav(x.d?.team?.abbreviation||"",sport);return<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:i===0?"1px solid "+S.bd+"40":""}}>
      <div style={{display:"flex",alignItems:"center",gap:5,flex:1,minWidth:0}}>
        <button onClick={e=>{e.stopPropagation();toggle(mkFav(x.d));}} style={{background:faved?S.yl+"20":"transparent",border:"1px solid "+(faved?S.yl+"50":S.bd),cursor:"pointer",fontSize:12,padding:"1px 3px",lineHeight:1,borderRadius:4,transition:"all .15s",color:faved?S.yl:S.dm}} title={faved?"Remove":"Favorite"}>{faved?"★":"☆"}</button>
        {rk&&rk<=25&&<span style={{fontFamily:F,fontSize:9,fontWeight:800,color:S.yl,minWidth:14}}>{rk}</span>}{x.d?.team?.logo&&<img src={x.d.team.logo} alt="" style={{width:20,height:20,objectFit:"contain"}} onError={e=>{e.target.style.display="none"}}/>}<div style={{fontFamily:F,fontWeight:700,fontSize:12,color:fin?(x.w?S.tx:S.dm):S.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{x.d?.team?.shortDisplayName||x.d?.team?.displayName||"TBD"}</div></div>
      <span style={{fontFamily:F,fontSize:pre?12:20,fontWeight:800,color:fin?(x.w?S.tx:S.dm):S.sub,marginLeft:8}}>{pre?"":x.d?.score??"-"}</span>
    </div>;})}
    {/* Win Probability Bar */}
    {hasWp&&<div style={{marginTop:6}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontFamily:F,fontSize:8,fontWeight:700,color:awWp>hmWp?S.gn:S.dm}}>{(awWp*100).toFixed(0)}%</span><span style={{fontFamily:F,fontSize:7,color:S.dm}}>WIN PROB</span><span style={{fontFamily:F,fontSize:8,fontWeight:700,color:hmWp>awWp?S.gn:S.dm}}>{(hmWp*100).toFixed(0)}%</span></div>
      <div style={{height:5,borderRadius:3,background:S.bd,overflow:"hidden",display:"flex"}}><div style={{width:(awWp*100)+"%",background:awWp>hmWp?"linear-gradient(90deg,"+S.gn+","+S.tl+")":S.rd+"80",transition:"width .5s"}}/><div style={{flex:1,background:hmWp>awWp?"linear-gradient(90deg,"+S.tl+","+S.gn+")":S.rd+"80",transition:"width .5s"}}/></div>
    </div>}
    {/* Clickable odds strip */}
    {odds&&pre&&<div style={{display:"flex",gap:4,marginTop:8}}>
      {odds.details&&<button onClick={e=>{e.stopPropagation();addBet(gn,(odds.details||"").split(" ")[0],"spread","-110");}} style={{flex:1,padding:"5px 4px",background:S.ac+"0a",border:"1px solid "+S.ac+"20",borderRadius:6,cursor:"pointer",textAlign:"center",transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.background=S.ac+"18";e.currentTarget.style.borderColor=S.ac+"50";}} onMouseLeave={e=>{e.currentTarget.style.background=S.ac+"0a";e.currentTarget.style.borderColor=S.ac+"20";}}><div style={{fontFamily:F,fontSize:8,color:S.dm,fontWeight:600}}>SPREAD</div><div style={{fontFamily:F,fontSize:11,color:S.ac,fontWeight:700}}>{odds.details}</div></button>}
      {odds.overUnder&&<button onClick={e=>{e.stopPropagation();addBet(gn,"Over "+odds.overUnder,"O/U","-110");}} style={{flex:1,padding:"5px 4px",background:S.gn+"0a",border:"1px solid "+S.gn+"20",borderRadius:6,cursor:"pointer",textAlign:"center",transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.background=S.gn+"18";e.currentTarget.style.borderColor=S.gn+"50";}} onMouseLeave={e=>{e.currentTarget.style.background=S.gn+"0a";e.currentTarget.style.borderColor=S.gn+"20";}}><div style={{fontFamily:F,fontSize:8,color:S.dm,fontWeight:600}}>O/U</div><div style={{fontFamily:F,fontSize:11,color:S.gn,fontWeight:700}}>O {odds.overUnder}</div></button>}
    </div>}
    {!odds&&comp.broadcasts?.[0]?.names?.[0]&&<div style={{marginTop:4,fontFamily:F,fontSize:9,color:S.dm}}>📺 {comp.broadcasts[0].names[0]}</div>}
  </div></Card>;
}

// ═══ SCORES ═══
function Scores({sport,title,yearRange,hasWeeks,weekCount,defYear,color,extra,showConf}){
  const[yr,setYr]=useState(defYear||yearRange[0]);const[wk,setWk]=useState(1);const[st,setSt]=useState(2);
  const[view,setView]=useState("today");const[games,setGames]=useState([]);const[ld,setLd]=useState(false);
  const[err,setErr]=useState(null);const[conf,setConf]=useState("ALL");const[selEv,setSelEv]=useState(null);
  useEffect(()=>{setLd(true);setErr(null);setGames([]);(async()=>{
    if(view==="today"||view==="upcoming"){const days=view==="today"?3:7;const all=[];const seen=new Set();
      for(let i=0;i<days;i++){const d=await ef(`${E[sport]}/scoreboard?dates=${ds(i)}&limit=200${extra?"&"+extra:""}`);(d?.events||[]).forEach(ev=>{if(!seen.has(ev.id)){seen.add(ev.id);all.push(ev);}});}
      setGames(all);if(!all.length)setErr("No games today — try 'By Week' view");setLd(false);return;}
    if(view==="yesterday"){const d=await ef(`${E[sport]}/scoreboard?dates=${ds(-1)}&limit=200${extra?"&"+extra:""}`);setGames(d?.events||[]);setLd(false);return;}
    // By week
    for(const u of[
      `${E[sport]}/scoreboard?dates=${yr}&seasontype=${st}&week=${wk}&limit=200`,
      `${E[sport]}/scoreboard?season=${yr}&seasontype=${st}&week=${wk}&limit=200`,
      `${E[sport]}/scoreboard?dates=${yr}&seasontype=2&limit=200`
    ]){const d=await ef(u+(extra?"&"+extra:""));if(d?.events?.length>0){setGames(d.events);setLd(false);return;}}
    setErr("No games for Week "+wk);setLd(false);
  })();},[yr,wk,st,view]);
  const stT=sport==="nfl"?[{v:1,l:"Pre"},{v:2,l:"Reg"},{v:3,l:"Post"}]:[{v:2,l:"Reg"},{v:3,l:"Post"}];
  const mxW=sport==="nfl"?(st===3?5:st===1?4:18):(weekCount||15);
  const filt=conf==="ALL"?games:games.filter(ev=>{const cs=ev.competitions?.[0]?.competitors||[];return cs.some(c=>{const dn=(c.team?.displayName||"")+" "+(c.team?.shortDisplayName||"");const tm=[...CFB,...CBB].find(t=>dn.includes(t.n));return tm?.cn===conf;});});
  const live=filt.filter(e=>e.competitions?.[0]?.status?.type?.state==="in");
  const up=filt.filter(e=>e.competitions?.[0]?.status?.type?.state==="pre");
  const fn=filt.filter(e=>e.competitions?.[0]?.status?.type?.completed);
  return<div>
    <h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>{title}</h2>
    <p style={{fontFamily:F,fontSize:10,color:S.dm,margin:"0 0 10px"}}>{games.length} games{live.length?" · "+live.length+" live":""} — tap for details</p>
    <div style={{display:"flex",gap:4,marginBottom:10,flexWrap:"wrap"}}>{[["today","📌 Today"],["upcoming","🔜 Week"],["yesterday","⏪ Yesterday"],["week","📅 By Season"]].map(([v,l])=><Pill key={v} l={l} a={view===v} c={S.tl} onClick={()=>setView(v)} sm/>)}</div>
    {view==="week"&&<><div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:6}}>{yearRange.map(y=><Pill key={y} l={y} a={yr===y} c={color} onClick={()=>{setYr(y);setWk(1);}} sm/>)}</div>
      {hasWeeks&&<><div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:5}}>{stT.map(s=><Pill key={s.v} l={s.l} a={st===s.v} c={S.yl} onClick={()=>{setSt(s.v);setWk(1);}} sm/>)}</div>
      <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:10}}>{Array.from({length:mxW},(_,i)=>i+1).map(w=><Pill key={w} l={"W"+w} a={wk===w} onClick={()=>setWk(w)} sm/>)}</div></>}</>}
    {showConf&&<div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:12}}>{CONFS.map(c=><Pill key={c} l={c} a={conf===c} c={S.or} onClick={()=>setConf(c)} sm/>)}</div>}
    <Err m={err}/>{ld?<Spin t={"Loading "+sport.toUpperCase()+"..."}/>:filt.length===0?<Emp t="No games found" ic="🏟️"/>:
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(280px,100%),1fr))",gap:8}}>{[...live,...up,...fn].map(ev=><GC key={ev.id} ev={ev} sport={sport} onClick={()=>setSelEv(ev.id)}/>)}</div>}
    {selEv&&<GD eid={selEv} sport={sport} onClose={()=>setSelEv(null)}/>}
  </div>;
}

// ═══ STANDINGS — 100% BULLETPROOF — builds from /teams endpoint ═══
function Standings({sport="nfl"}){
  const sportConfs={nfl:["ALL","AFC","NFC"],nba:["ALL","East","West"],mlb:["ALL","AL","NL"],nhl:["ALL","East","West"]};
  const sportTeams={nfl:NFL,nba:NBA,mlb:MLB,nhl:NHL};
  const confList=sportConfs[sport]||["ALL"];
  const refTeams=sportTeams[sport]||[];
  const[yr,setYr]=useState(2024);const[teams,setTeams]=useState([]);const[ld,setLd]=useState(false);const[err,setErr]=useState(null);const[conf,setConf]=useState("ALL");
  useEffect(()=>{setLd(true);setErr(null);setTeams([]);(async()=>{
    const d=await ef(`${E[sport]}/teams?limit=50`);
    const allT=d?.sports?.[0]?.leagues?.[0]?.teams||[];
    if(!allT.length){setErr("Cannot load teams");setLd(false);return;}
    const results=await Promise.allSettled(allT.map(t=>{
      const tm=t.team;if(!tm)return Promise.resolve(null);
      return ef(`${E[sport]}/teams/${tm.id}?enable=record`).then(td=>({tm,td}));
    }));
    const rows=[];
    results.forEach(r=>{
      if(r.status!=="fulfilled"||!r.value)return;
      const{tm,td}=r.value;
      const ref=refTeams.find(n=>n.eid===+tm.id||n.a===tm.abbreviation);
      const rec=td?.team?.record?.items?.find(i=>i.type==="total")||td?.team?.record?.items?.[0]||null;
      const summary=rec?.summary||"";const pts=summary.split("-").map(Number);
      rows.push({name:tm.displayName||"",logo:tm.logos?.[0]?.href||"",abbr:tm.abbreviation||ref?.a||"",
        w:pts[0]||0,l:pts[1]||0,t:pts[2]||0,
        pf:rec?.stats?.find(s=>s.name==="pointsFor"||s.name==="runsScored"||s.name==="goalsFor")?.value||0,
        pa:rec?.stats?.find(s=>s.name==="pointsAgainst"||s.name==="runsAllowed"||s.name==="goalsAgainst")?.value||0,
        conf:ref?.c||"?",div:ref?.d||"?",cl:ref?.cl||S.ac});
    });
    if(rows.length>0){rows.forEach(r=>{r.pct=r.w+r.l>0?(r.w/(r.w+r.l)).toFixed(3):".000";});setTeams(rows);}
    else setErr("No team records available");
    setLd(false);
  })();},[yr,sport]);
  const divs={};teams.forEach(t=>{const k=t.conf+" "+t.div;if(!divs[k])divs[k]={label:k,conf:t.conf,teams:[]};divs[k].teams.push(t);});
  Object.values(divs).forEach(d=>d.teams.sort((a,b)=>b.w!==a.w?b.w-a.w:a.l-b.l));
  const filt=conf==="ALL"?Object.values(divs):Object.values(divs).filter(g=>g.conf===conf);
  const sportName=sport.toUpperCase();
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>📊 {sportName} Standings</h2>
    <p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 12px"}}>Division standings with W-L records</p>
    <div style={{display:"flex",gap:4,marginBottom:14}}>{confList.map(c=><Pill key={c} l={c} a={conf===c} c={S.ac} onClick={()=>setConf(c)}/>)}</div>
    <Err m={err}/>{ld?<Spin t={"Loading "+sportName+" teams..."}/>:filt.length===0?<Emp t="No standings data"/>:
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(380px,100%),1fr))",gap:10}}>{filt.sort((a,b)=>a.label.localeCompare(b.label)).map(g=><Card key={g.label}>
      <div style={{padding:"8px 12px",background:S.sf,borderBottom:"1px solid "+S.bd}}><span style={{fontFamily:F,fontSize:12,fontWeight:800,color:S.ac}}>{g.label}</span></div>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>{["","TEAM","W","L","PCT","PF","PA"].map(h=><th key={h} style={{padding:"6px 8px",textAlign:h==="TEAM"||h===""?"left":"right",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,borderBottom:"1px solid "+S.bd}}>{h}</th>)}</tr></thead>
      <tbody>{g.teams.map((t,i)=><tr key={i} style={{borderBottom:"1px solid "+S.bd+"25"}}><td style={{padding:"6px 8px",width:26}}>{t.logo&&<img src={t.logo} alt="" style={{width:22,height:22,objectFit:"contain"}} onError={e=>{e.target.style.display="none"}}/>}</td><td style={{padding:"6px 8px"}}><span style={{fontFamily:F,fontWeight:700,fontSize:12,color:i===0?S.gn:S.tx}}>{t.name}</span></td><td style={{textAlign:"right",fontFamily:F,fontSize:13,fontWeight:800,color:S.tx,padding:"6px 8px"}}>{t.w}</td><td style={{textAlign:"right",fontFamily:F,fontSize:13,color:S.sub,padding:"6px 8px"}}>{t.l}</td><td style={{textAlign:"right",fontFamily:F,fontSize:11,color:parseFloat(t.pct)>=.5?S.gn:S.rd,fontWeight:600,padding:"6px 8px"}}>{t.pct}</td><td style={{textAlign:"right",fontFamily:F,fontSize:11,color:S.sub,padding:"6px 8px"}}>{Math.round(t.pf)}</td><td style={{textAlign:"right",fontFamily:F,fontSize:11,color:S.sub,padding:"6px 8px"}}>{Math.round(t.pa)}</td></tr>)}</tbody></table>
    </Card>)}</div>}</div>;
}

// Stats - NFL uses Sleeper (real stats), CFB/CBB uses scoreboard leaders
function Stats({sport="nfl",title="Stats",color}){
  const[leaders,setLeaders]=useState({});const[ld,setLd]=useState(true);const[err,setErr]=useState(null);const[cat,setCat]=useState("");const[selP,setSelP]=useState(null);
  const isNfl=sport==="nfl";const isCfb=sport==="cfb";const isCbb=sport==="cbb";const isNba=sport==="nba";const isMlb=sport==="mlb";const isNhl=sport==="nhl";
  const defYr=(isCbb||isNba||isNhl)?2026:2025;const years=(isCbb||isNba||isNhl)?[2026,2025,2024,2023]:[2025,2024,2023,2022];
  const maxW=isNfl?18:isCfb?15:isNba?25:isMlb?30:isNhl?25:20;const hasWeeks=isNfl||isCfb;
  const[yr,setYr]=useState(defYr);const[mode,setMode]=useState("season");const[wk,setWk]=useState(isNfl?1:isCfb?15:12);
  const ep=E[sport];const clr=color||(isNfl?S.gn:isCfb?S.ac:S.or);
  useEffect(()=>{setLd(true);setErr(null);setLeaders({});setCat("");(async()=>{
    if(isNfl){
      // NFL: Use Sleeper API for REAL per-player stats
      const[pd]=await Promise.all([fetch("https://api.sleeper.app/v1/players/nfl").then(r=>r.ok?r.json():null).catch(()=>null)]);
      if(!pd){setErr("Sleeper API unavailable");setLd(false);return;}
      if(mode==="season"){
        // Aggregate all weeks
        const weekNums=Array.from({length:maxW},(_,i)=>i+1);
        const results=await Promise.allSettled(weekNums.map(w=>fetch(`https://api.sleeper.app/v1/stats/nfl/regular/${yr}/${w}`).then(r=>r.ok?r.json():null).catch(()=>null)));
        const totals={};
        results.forEach(r=>{if(r.status!=="fulfilled"||!r.value)return;
          Object.entries(r.value).forEach(([pid,st])=>{const p=pd[pid];if(!p||!p.position)return;
            if(!totals[pid])totals[pid]={id:pid,name:(p.first_name||"")+" "+(p.last_name||""),pos:p.position,team:p.team||"FA",espnId:p.espn_id,
              pass_yd:0,pass_td:0,pass_int:0,pass_att:0,rush_yd:0,rush_td:0,rush_att:0,rec:0,rec_yd:0,rec_td:0,fum_lost:0,pts_ppr:0};
            const t=totals[pid];
            t.pass_yd+=(st.pass_yd||0);t.pass_td+=(st.pass_td||0);t.pass_int+=(st.pass_int||0);t.pass_att+=(st.pass_att||0);
            t.rush_yd+=(st.rush_yd||0);t.rush_td+=(st.rush_td||0);t.rush_att+=(st.rush_att||0);
            t.rec+=(st.rec||0);t.rec_yd+=(st.rec_yd||0);t.rec_td+=(st.rec_td||0);t.fum_lost+=(st.fum_lost||0);
          });
        });
        // Calculate PPR
        Object.values(totals).forEach(t=>{t.pts_ppr=Math.round(((t.pass_yd||0)*.04+(t.pass_td||0)*4-(t.pass_int||0)+(t.rush_yd||0)*.1+(t.rush_td||0)*6+(t.rec||0)+(t.rec_yd||0)*.1+(t.rec_td||0)*6-(t.fum_lost||0)*2)*10)/10;});
        const all=Object.values(totals).filter(t=>["QB","RB","WR","TE","K","LB","CB","S","DE","DT"].includes(t.pos));
        const cats={"Passing":all.filter(p=>p.pass_yd>100).map(p=>({...p,value:Math.round(p.pass_yd).toLocaleString()+" YDS · "+p.pass_td+" TD",numVal:p.pass_yd})).sort((a,b)=>b.numVal-a.numVal),
          "Rushing":all.filter(p=>p.rush_yd>20).map(p=>({...p,value:Math.round(p.rush_yd).toLocaleString()+" YDS · "+p.rush_td+" TD",numVal:p.rush_yd})).sort((a,b)=>b.numVal-a.numVal),
          "Receiving":all.filter(p=>p.rec>5).map(p=>({...p,value:p.rec+" REC · "+Math.round(p.rec_yd).toLocaleString()+" YDS",numVal:p.rec_yd})).sort((a,b)=>b.numVal-a.numVal),
          "Fantasy PPR":all.filter(p=>p.pts_ppr>10).map(p=>({...p,value:p.pts_ppr.toFixed(1)+" PTS",numVal:p.pts_ppr})).sort((a,b)=>b.numVal-a.numVal),
          "Touchdowns":all.filter(p=>(p.pass_td+p.rush_td+p.rec_td)>0).map(p=>{const td=p.pass_td+p.rush_td+p.rec_td;return{...p,value:td+" TD ("+p.pass_td+"P/"+p.rush_td+"R/"+p.rec_td+"Rec)",numVal:td};}).sort((a,b)=>b.numVal-a.numVal)};
        if(Object.values(cats).some(v=>v.length>0)){setLeaders(cats);setCat(Object.keys(cats)[0]);}
        else setErr("No stats found for "+yr);
      } else {
        // Single week from Sleeper
        const st=await fetch(`https://api.sleeper.app/v1/stats/nfl/regular/${yr}/${wk}`).then(r=>r.ok?r.json():null).catch(()=>null);
        if(!st){setErr("No data for week "+wk);setLd(false);return;}
        const all=[];Object.entries(st).forEach(([pid,s])=>{const p=pd[pid];if(!p||!p.position)return;
          const ppr=Math.round(((s.pass_yd||0)*.04+(s.pass_td||0)*4-(s.pass_int||0)+(s.rush_yd||0)*.1+(s.rush_td||0)*6+(s.rec||0)+(s.rec_yd||0)*.1+(s.rec_td||0)*6-(s.fum_lost||0)*2)*10)/10;
          all.push({id:pid,name:(p.first_name||"")+" "+(p.last_name||""),pos:p.position,team:p.team||"FA",espnId:p.espn_id,
            pass_yd:s.pass_yd||0,pass_td:s.pass_td||0,rush_yd:s.rush_yd||0,rush_td:s.rush_td||0,rec:s.rec||0,rec_yd:s.rec_yd||0,rec_td:s.rec_td||0,pts_ppr:ppr});});
        const cats={"Passing":all.filter(p=>p.pass_yd>50).map(p=>({...p,value:Math.round(p.pass_yd)+" YDS · "+p.pass_td+" TD",numVal:p.pass_yd})).sort((a,b)=>b.numVal-a.numVal),
          "Rushing":all.filter(p=>p.rush_yd>10).map(p=>({...p,value:Math.round(p.rush_yd)+" YDS · "+p.rush_td+" TD",numVal:p.rush_yd})).sort((a,b)=>b.numVal-a.numVal),
          "Receiving":all.filter(p=>p.rec>0).map(p=>({...p,value:p.rec+" REC · "+Math.round(p.rec_yd)+" YDS",numVal:p.rec_yd})).sort((a,b)=>b.numVal-a.numVal),
          "Fantasy PPR":all.filter(p=>p.pts_ppr>1).map(p=>({...p,value:p.pts_ppr.toFixed(1)+" PTS",numVal:p.pts_ppr})).sort((a,b)=>b.numVal-a.numVal)};
        if(Object.values(cats).some(v=>v.length>0)){setLeaders(cats);setCat(Object.keys(cats)[0]);}
        else setErr("No data for week "+wk);
      }
    } else {
      // CFB/CBB: scoreboard leaders (only source available)
      const cats={};const extra=isCfb?"&groups=80":"&groups=50";
      const fetchWk=async w=>ef(`${ep}/scoreboard?dates=${yr}&seasontype=2&week=${w}&limit=200${extra}`);
      const fetchDt=async ds=>ef(`${ep}/scoreboard?dates=${ds}&limit=200&groups=50`);
      const process=events=>{(events||[]).forEach(ev=>{const comp=ev.competitions?.[0];if(!comp)return;
        (comp.leaders||[]).forEach(ldr=>{const cn=ldr.displayName||ldr.name||"Other";if(!cats[cn])cats[cn]=[];
          (ldr.leaders||[]).forEach(l=>{const at=l.athlete||{};
            cats[cn].push({id:at.id,name:at.displayName||at.shortName||at.fullName,pos:at.position?.abbreviation,espnId:at.id,
              headshot:at.headshot,value:l.displayValue||"",numVal:parseYds(l.displayValue),
              team:l.team?.abbreviation||"",teamObj:l.team||comp.competitors?.find(x=>String(x.team?.id)===String(at.teamId))?.team||{}});
          });});});};
      if(mode==="season"){
        if(hasWeeks){const wks=Array.from({length:maxW},(_,i)=>i+1);const res=await Promise.allSettled(wks.map(w=>fetchWk(w)));
          res.forEach(r=>{if(r.status==="fulfilled"&&r.value?.events)process(r.value.events);});
        } else {const by=yr-1;const dates=[];
          for(let m=10;m<12;m++)for(let d=1;d<=28;d+=3)dates.push(`${by}${String(m+1).padStart(2,"0")}${String(d).padStart(2,"0")}`);
          for(let m=0;m<4;m++)for(let d=1;d<=28;d+=3)dates.push(`${yr}${String(m+1).padStart(2,"0")}${String(d).padStart(2,"0")}`);
          const res=await Promise.allSettled(dates.map(d=>fetchDt(d)));res.forEach(r=>{if(r.status==="fulfilled"&&r.value?.events)process(r.value.events);});}
        Object.keys(cats).forEach(k=>{const byP={};
          cats[k].forEach(r=>{const key=r.id;if(!key)return;if(!byP[key])byP[key]={...r,totalVal:r.numVal};
            else{byP[key].totalVal+=r.numVal;if(!byP[key].headshot&&r.headshot)byP[key].headshot=r.headshot;}});
          cats[k]=Object.values(byP).map(r=>({...r,value:Math.round(r.totalVal).toLocaleString(),numVal:r.totalVal})).sort((a,b)=>b.numVal-a.numVal);});
      } else {
        if(hasWeeks){const sb=await fetchWk(wk);if(sb?.events)process(sb.events);}
        else{const by=yr-1;const st2=new Date(by,10,4);st2.setDate(st2.getDate()+(wk-1)*7);
          for(let i=0;i<7;i++){const d=new Date(st2);d.setDate(d.getDate()+i);const ds=d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0");const sb=await fetchDt(ds);if(sb?.events)process(sb.events);}}
        Object.keys(cats).forEach(k=>{const best={};cats[k].forEach(r=>{const key=r.id;if(!key)return;if(!best[key]||r.numVal>best[key].numVal)best[key]=r;});cats[k]=Object.values(best).sort((a,b)=>b.numVal-a.numVal);});
      }
      if(Object.keys(cats).length>0){setLeaders(cats);setCat(Object.keys(cats)[0]);}
      else setErr("No stats found");
    }
    setLd(false);
  })();},[yr,mode,wk]);
  const catKeys=Object.keys(leaders);const rows=(leaders[cat]||[]).slice(0,50);
  // ESPN headshot URL from espnId or Sleeper player
  const getImg=r=>{const eid=r.espnId||r.id;if(!eid)return null;return hsUrl(r.headshot)||`https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${eid}.png&w=96&h=70&cb=1`;};
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>{title}</h2>
    <p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 8px"}}>{isNfl?"Real stats via Sleeper API":mode==="season"?"Aggregated from game leaders":"Weekly game leaders"}</p>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>{years.map(y=><Pill key={y} l={""+y} a={yr===y} c={S.yl} onClick={()=>setYr(y)}/>)}</div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}><Pill l="Full Season" a={mode==="season"} c={S.gn} onClick={()=>setMode("season")}/><Pill l="By Week" a={mode==="week"} c={S.tl} onClick={()=>setMode("week")}/></div>
    {mode==="week"&&<div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:8}}>{Array.from({length:hasWeeks?maxW:20},(_,i)=>i+1).map(w=><Pill key={w} l={"W"+w} a={wk===w} c={S.tl} onClick={()=>setWk(w)} sm/>)}</div>}
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:14}}>{catKeys.map(k=><Pill key={k} l={k} a={cat===k} c={clr} onClick={()=>setCat(k)} sm/>)}</div>
    <Err m={err}/>{ld?<Spin t={"Loading "+sport.toUpperCase()+" stats..."}/>:rows.length===0?<Emp t="Select a category" ic="📊"/>:
    <Card style={{overflow:"auto",maxHeight:620}}>
      {rows.map((r,i)=>{const himg=getImg(r);return<div key={r.id||i} onClick={()=>{if(r.id||r.espnId)setSelP({id:r.espnId||r.id,name:r.name,img:himg,pos:r.pos,team:r.teamObj||{abbreviation:r.team},teamId:r.teamObj?.id});}} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",borderBottom:"1px solid "+S.bd+"25",cursor:"pointer"}}>
        <div style={{fontFamily:F,fontSize:i<3?20:14,fontWeight:800,color:i===0?S.yl:i<3?clr:S.dm,width:30,textAlign:"center"}}>{i+1}</div>
        {himg?<img src={himg} alt="" style={{width:42,height:42,borderRadius:8,objectFit:"cover",background:S.sf}} onError={e=>{e.target.style.display="none"}}/>:<div style={{width:42,height:42,borderRadius:8,background:S.sf,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>👤</div>}
        <div style={{flex:1}}><div style={{fontFamily:F,fontWeight:700,fontSize:14,color:S.tx}}>{r.name||"—"}</div>
          <div style={{display:"flex",gap:6,alignItems:"center",marginTop:2}}>{r.teamObj?.logos?.[0]?.href&&<img src={r.teamObj.logos[0].href} alt="" style={{width:16,height:16}}/>}<span style={{fontFamily:F,fontSize:11,color:S.sub}}>{r.team||""}</span><Badge p={r.pos}/></div></div>
        <div style={{textAlign:"right"}}><div style={{fontFamily:F,fontSize:16,fontWeight:800,color:i===0?S.yl:clr}}>{r.value}</div>{mode==="week"&&!isNfl&&<div style={{fontFamily:F,fontSize:9,color:S.dm}}>game leader</div>}</div>
      </div>;})}
    </Card>}
    {selP&&<PM pid={selP.id} info={selP} sport={sport} onClose={()=>setSelP(null)}/>}
  </div>;
}

// ═══ RANKINGS — built purely from scoreboard curatedRank (always works) ═══
function Rankings({title,sport,yearRange,defYear,color,mw,defWk}){
  const[yr,setYr]=useState(defYear||yearRange[0]);const[wk,setWk]=useState(defWk||1);const[ranks,setRanks]=useState([]);const[ld,setLd]=useState(false);const[err,setErr]=useState(null);
  const maxWk=mw||16;
  useEffect(()=>{setLd(true);setErr(null);setRanks([]);(async()=>{
    const ranked={};
    if(sport==="cfb"){
      // CFB: fetch multiple weeks by week number
      for(const w of[wk,Math.max(1,wk-1),Math.max(1,wk-2)]){
        const sb=await ef(`${E.cfb}/scoreboard?dates=${yr}&seasontype=2&week=${w}&limit=200&groups=80`);
        (sb?.events||[]).forEach(ev=>{(ev.competitions?.[0]?.competitors||[]).forEach(c=>{
          const rk=c.curatedRank?.current;
          if(rk&&rk<=25&&!ranked[c.team?.id])ranked[c.team?.id]={rank:rk,name:c.team?.displayName||"",logo:c.team?.logo||"",record:c.records?.[0]?.summary||"—",id:c.team?.id};
        });});
        if(Object.keys(ranked).length>=20)break;
      }
    } else {
      // CBB: fetch by actual dates (season spans Nov-March)
      // Generate dates around current week of the season
      // CBB season 2025 = Nov 2024 - Apr 2025
      const baseYear=yr<=2024?yr-1:yr-1; // season 2025 starts Nov 2024
      const startMonth=10; // November (0-indexed)
      const weekStart=new Date(baseYear,startMonth,4); // ~first week of Nov
      weekStart.setDate(weekStart.getDate()+(wk-1)*7);
      // Fetch 10 days around that week to catch enough ranked teams
      for(let i=0;i<10;i++){
        const d=new Date(weekStart);d.setDate(d.getDate()+i);
        const ds2=d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0");
        const sb=await ef(`${E.cbb}/scoreboard?dates=${ds2}&limit=200&groups=50`);
        (sb?.events||[]).forEach(ev=>{(ev.competitions?.[0]?.competitors||[]).forEach(c=>{
          const rk=c.curatedRank?.current;
          if(rk&&rk<=25&&!ranked[c.team?.id])ranked[c.team?.id]={rank:rk,name:c.team?.displayName||"",logo:c.team?.logo||"",record:c.records?.[0]?.summary||"—",id:c.team?.id};
        });});
        if(Object.keys(ranked).length>=22)break;
      }
    }
    const sorted=Object.values(ranked).sort((a,b)=>a.rank-b.rank);
    if(sorted.length>0)setRanks(sorted);
    else setErr("No ranked teams found — try a different week (ranked teams must have played)");
    setLd(false);
  })();},[yr,wk]);
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>{title}</h2>
    <p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 12px"}}>Change year + week for historical rankings</p>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>{yearRange.map(y=><Pill key={y} l={""+y} a={yr===y} c={color} onClick={()=>{setYr(y);setWk(1);}}/>)}</div>
    <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:12,alignItems:"center"}}><span style={{fontFamily:F,fontSize:10,color:S.dm,fontWeight:700,marginRight:4}}>WEEK</span>{Array.from({length:maxWk},(_,i)=>i+1).map(w=><Pill key={w} l={""+w} a={wk===w} c={S.yl} onClick={()=>setWk(w)} sm/>)}</div>
    <Err m={err}/>{ld?<Spin t={"Loading "+sport.toUpperCase()+" rankings..."}/>:ranks.length===0?<Emp t="No rankings for this week — try another week" ic="🏆"/>:
    <Card style={{overflow:"auto",maxHeight:640}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:S.sf,position:"sticky",top:0,zIndex:1}}>{["RK","","TEAM","RECORD"].map(h=><th key={h} style={{padding:"7px 10px",textAlign:h==="TEAM"?"left":"center",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,borderBottom:"1px solid "+S.bd}}>{h}</th>)}</tr></thead><tbody>{ranks.map((r,i)=>{
      return<tr key={r.id||i} style={{borderBottom:"1px solid "+S.bd+"20"}}>
        <td style={{padding:"8px 10px",textAlign:"center",fontFamily:F,fontSize:i<3?18:14,fontWeight:800,color:i===0?S.yl:i<3?color:S.sub}}>{r.rank}</td>
        <td style={{padding:"4px 6px",width:30}}>{r.logo&&<img src={r.logo} alt="" style={{width:26,height:26}} onError={e=>{e.target.style.display="none"}}/>}</td>
        <td style={{padding:"8px 6px",fontFamily:F,fontWeight:700,fontSize:13,color:S.tx}}>{r.name}</td>
        <td style={{textAlign:"center",fontFamily:F,fontSize:12,color:S.sub}}>{r.record}</td>
      </tr>})}</tbody></table></Card>}</div>;
}

// ═══ ROSTERS ═══
function Rosters({title,teams,sport,nf,cf,lf}){
  const[sel,setSel]=useState(null);const[players,setPlayers]=useState([]);const[ld,setLd]=useState(false);const[posF,setPosF]=useState("ALL");const[srch,setSrch]=useState("");const[selP,setSelP]=useState(null);
  const sp=sport==="nfl"?"football/nfl":sport==="cfb"?"football/college-football":"basketball/mens-college-basketball";
  useEffect(()=>{if(!sel)return;setLd(true);setPlayers([]);setPosF("ALL");setSrch("");(async()=>{
    // Try multiple roster URL patterns — college teams sometimes need different paths
    let all=[];
    for(const u of[
      `https://site.api.espn.com/apis/site/v2/sports/${sp}/teams/${sel.eid}/roster`,
      `https://site.api.espn.com/apis/site/v2/sports/${sp}/teams/${sel.eid}?enable=roster`,
    ]){
      const d=await ef(u);
      // Standard roster response: {athletes: [{items: [...]}]}
      if(d?.athletes?.length){
        d.athletes.forEach(g=>(g.items||[]).forEach(a=>{all.push({id:a.id,fn:a.firstName||"",ln:a.lastName||"",dn:a.displayName||((a.firstName||"")+" "+(a.lastName||"")),pos:a.position?.abbreviation||"—",num:a.jersey||"—",ht:a.displayHeight||"—",wt:a.displayWeight||"—",img:a.headshot?.href||null});}));
      }
      // Alternate: team.athletes is flat array
      if(!all.length&&d?.team?.athletes){
        (d.team.athletes||[]).forEach(a=>{all.push({id:a.id,fn:a.firstName||"",ln:a.lastName||"",dn:a.displayName||a.fullName||"",pos:a.position?.abbreviation||"—",num:a.jersey||"—",ht:a.displayHeight||"—",wt:a.displayWeight||"—",img:a.headshot?.href||null});});
      }
      if(all.length>0)break;
    }
    setPlayers(all);setLd(false);})();},[sel]);
  const posSet=["ALL",...[...new Set(players.map(p=>p.pos).filter(Boolean))].sort()];
  const filt=players.filter(p=>(posF==="ALL"||p.pos===posF)&&(!srch||p.dn.toLowerCase().includes(srch.toLowerCase())));
  const tc=sel?.[cf]||S.ac;
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 14px"}}>{title}</h2>
    <div style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:12,alignItems:"start"}}>
      <Card style={{maxHeight:600,overflowY:"auto"}}>{teams.map(t=>{const ac=sel?.eid===t.eid;return<div key={t.eid} onClick={()=>setSel(t)} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",cursor:"pointer",borderBottom:"1px solid "+S.bd+"20",background:ac?t[cf]+"12":"transparent",borderLeft:"3px solid "+(ac?t[cf]:"transparent"),transition:"all .1s"}}><img src={lf(t)} alt="" style={{width:20,height:20,objectFit:"contain"}} onError={e=>{e.target.style.display="none"}}/><span style={{fontFamily:F,fontSize:11,fontWeight:ac?700:500,color:ac?S.tx:S.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t[nf]||t.n}</span></div>;})}</Card>
      <Card>{!sel?<Emp t="← Pick a team to view roster" ic="👈"/>:<>
        <div style={{padding:"10px 14px",borderBottom:"1px solid "+S.bd,borderTop:"3px solid "+tc,background:tc+"06"}}><div style={{fontFamily:F,fontSize:16,fontWeight:800,color:tc}}>{sel[nf]||sel.n}</div><div style={{fontFamily:F,fontSize:10,color:S.dm}}>{players.length} players</div></div>
        <div style={{display:"flex",gap:3,padding:"8px 10px",flexWrap:"wrap",borderBottom:"1px solid "+S.bd,alignItems:"center"}}>{posSet.slice(0,14).map(p=><Pill key={p} l={p} a={posF===p} c={tc} onClick={()=>setPosF(p)} sm/>)}<input value={srch} onChange={e=>setSrch(e.target.value)} placeholder="Search..." style={{padding:"4px 8px",background:S.sf,border:"1px solid "+S.bd,color:S.tx,borderRadius:6,fontFamily:F,fontSize:11,outline:"none",width:90,marginLeft:"auto"}}/></div>
        {ld?<Spin t="Loading roster..."/>:<div style={{overflowY:"auto",maxHeight:460}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:S.sf}}>{["","#","PLAYER","POS","HT","WT"].map(h=><th key={h} style={{padding:"6px 8px",textAlign:"left",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,borderBottom:"1px solid "+S.bd}}>{h}</th>)}</tr></thead><tbody>{filt.length===0?<tr><td colSpan={6} style={{padding:30,textAlign:"center",fontFamily:F,fontSize:12,color:S.dm}}>No players match filter</td></tr>:filt.map(p=><tr key={p.id} onClick={()=>p.id&&setSelP({...p,name:p.dn,team:sel?.[nf]||sel?.n||"",teamId:sel?.eid})} style={{borderBottom:"1px solid "+S.bd+"15",cursor:"pointer",transition:"background .1s"}} onMouseEnter={e=>e.currentTarget.style.background=S.sf} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><td style={{padding:"5px 8px"}}>{p.img?<img src={p.img} alt="" style={{width:32,height:32,borderRadius:7,objectFit:"cover"}} onError={e=>{e.target.style.display="none"}}/>:<div style={{width:32,height:32,borderRadius:7,background:tc+"10",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F,fontSize:10,fontWeight:700,color:tc}}>{(p.fn[0]||"")+(p.ln[0]||"")}</div>}</td><td style={{fontFamily:F,fontSize:13,color:S.yl,fontWeight:700,padding:"5px 8px"}}>{p.num}</td><td style={{fontFamily:F,fontWeight:700,fontSize:12,color:S.tx,padding:"5px 8px"}}>{p.dn}</td><td style={{padding:"5px 8px"}}><Badge p={p.pos}/></td><td style={{fontFamily:F,fontSize:11,color:S.sub,padding:"5px 8px"}}>{p.ht}</td><td style={{fontFamily:F,fontSize:11,color:S.sub,padding:"5px 8px"}}>{p.wt}</td></tr>)}</tbody></table></div>}</>}</Card>
    </div>{selP&&<PM pid={selP.id||selP} info={typeof selP==="object"?selP:null} sport={sport} onClose={()=>setSelP(null)}/>}</div>;
}

// ═══ FANTASY ═══
function Fantasy(){
  const[players,setPlayers]=useState([]);const[ld,setLd]=useState(true);const[posF,setPosF]=useState("ALL");const[sortK,setSortK]=useState("pts_ppr");const[wk,setWk]=useState(1);const[yr,setYr]=useState(2025);const[mode,setMode]=useState("projections");const[err,setErr]=useState(null);
  useEffect(()=>{setLd(true);setErr(null);const typ=mode==="stats"?"stats":"projections";Promise.all([fetch(`https://api.sleeper.app/v1/${typ}/nfl/regular/${yr}/${wk}`).then(r=>r.ok?r.json():null).catch(()=>null),fetch("https://api.sleeper.app/v1/players/nfl").then(r=>r.ok?r.json():null).catch(()=>null)]).then(([stats,pd])=>{if(!stats||!pd){setErr("Sleeper API unavailable");setLd(false);return;}const rows=[];Object.entries(stats).forEach(([pid,st])=>{const p=pd[pid];if(!p||!["QB","RB","WR","TE","K"].includes(p.position))return;const ppr=(st.pass_yd||0)*.04+(st.pass_td||0)*4-(st.pass_int||0)+(st.rush_yd||0)*.1+(st.rush_td||0)*6+(st.rec||0)+(st.rec_yd||0)*.1+(st.rec_td||0)*6-(st.fum_lost||0)*2;rows.push({id:pid,name:(p.first_name||"")+" "+(p.last_name||""),pos:p.position,team:p.team||"FA",espnId:p.espn_id,pass_yd:st.pass_yd||0,pass_td:st.pass_td||0,rush_yd:st.rush_yd||0,rush_td:st.rush_td||0,rec:st.rec||0,rec_yd:st.rec_yd||0,rec_td:st.rec_td||0,pts_ppr:Math.round(ppr*10)/10});});setPlayers(rows);setLd(false);});},[yr,wk,mode]);
  const COLS=[["pts_ppr","PPR"],["pass_yd","PASS"],["pass_td","PTD"],["rush_yd","RUSH"],["rec","REC"],["rec_yd","RECY"]];
  const filt=players.filter(p=>posF==="ALL"||p.pos===posF).sort((a,b)=>(b[sortK]||0)-(a[sortK]||0)).slice(0,80);
  const getImg=p=>p.espnId?`https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${p.espnId}.png&w=96&h=70&cb=1`:null;
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>⚡ Fantasy</h2>
    <p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 12px"}}>PPR scoring from Sleeper</p>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>{[2025,2024,2023].map(y=><Pill key={y} l={""+y} a={yr===y} c={S.yl} onClick={()=>setYr(y)} sm/>)}<div style={{width:1,height:18,background:S.bd,alignSelf:"center"}}/>{[{v:"projections",l:"Proj"},{v:"stats",l:"Actual"}].map(m=><Pill key={m.v} l={m.l} a={mode===m.v} c={S.pp} onClick={()=>setMode(m.v)} sm/>)}</div>
    <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:8}}>{Array.from({length:18},(_,i)=>i+1).map(w=><Pill key={w} l={"W"+w} a={wk===w} onClick={()=>setWk(w)} sm/>)}</div>
    <div style={{display:"flex",gap:3,marginBottom:14}}>{["ALL","QB","RB","WR","TE","K"].map(p=><Pill key={p} l={p} a={posF===p} c={S.pp} onClick={()=>setPosF(p)} sm/>)}</div>
    <Err m={err}/>{ld?<Spin/>:filt.length===0?<Emp t="No data" ic="⚡"/>:
    <Card style={{overflow:"auto",maxHeight:580}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:S.sf,position:"sticky",top:0,zIndex:1}}><th style={{padding:6,fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,borderBottom:"1px solid "+S.bd}}>#</th><th style={{padding:6,textAlign:"left",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,borderBottom:"1px solid "+S.bd}}>PLAYER</th>{COLS.map(([k,l])=><th key={k} onClick={()=>setSortK(k)} style={{padding:6,textAlign:"right",fontFamily:F,fontSize:9,fontWeight:700,color:sortK===k?S.pp:S.dm,borderBottom:"1px solid "+S.bd,cursor:"pointer"}}>{l}{sortK===k?" ↓":""}</th>)}</tr></thead><tbody>{filt.map((p,i)=>{const himg=getImg(p);return<tr key={p.id} style={{borderBottom:"1px solid "+S.bd+"15"}}><td style={{padding:"4px 6px",fontFamily:F,fontSize:10,color:i<3?S.yl:S.dm,fontWeight:700,textAlign:"center"}}>{i+1}</td><td style={{padding:"4px 6px"}}><div style={{display:"flex",alignItems:"center",gap:8}}>{himg?<img src={himg} alt="" style={{width:30,height:30,borderRadius:6,objectFit:"cover",background:S.sf}} onError={e=>{e.target.style.display="none"}}/>:<div style={{width:30,height:30,borderRadius:6,background:S.sf,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>👤</div>}<div><div style={{fontFamily:F,fontWeight:700,fontSize:12,color:S.tx}}>{p.name}</div><div style={{display:"flex",gap:4}}><Badge p={p.pos}/><span style={{fontFamily:F,fontSize:9,color:S.dm}}>{p.team}</span></div></div></div></td>{COLS.map(([k])=><td key={k} style={{padding:"4px 6px",textAlign:"right",fontFamily:F,fontSize:12,fontWeight:sortK===k?700:400,color:sortK===k?S.pp:S.tx}}>{typeof p[k]==="number"&&!Number.isInteger(p[k])?p[k].toFixed(1):p[k]}</td>)}</tr>})}</tbody></table></Card>}</div>;
}

// ═══ PARLAY BUILDER ═══
function ParlayBuilder(){
  const[bets]=useBets();const[legs,setLegs]=useState([]);const[stake,setStake]=useState("10");
  const pending=bets.filter(b=>b.result==="pending");
  function toggle(b){setLegs(p=>p.find(l=>l.id===b.id)?p.filter(l=>l.id!==b.id):[...p,b]);}
  const po=legs.length<2?0:legs.reduce((d,l)=>{const o=+l.odds;return d*(o>0?(o/100+1):(100/Math.abs(o)+1));},1);
  const payout=po*(+stake||0);const amOdds=po>2?"+"+Math.round((po-1)*100):po>0?"-"+Math.round(100/(po-1)):"—";
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>🎯 Parlay Builder</h2>
    <p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 14px"}}>Select 2+ bets to build a parlay — click bets from Scores or Betting tabs first</p>
    {pending.length===0?<Emp t="No pending bets — add some from Scores or Betting!" ic="💰"/>:<>
      <div style={{fontFamily:F,fontSize:10,fontWeight:700,color:S.dm,marginBottom:8}}>TAP TO ADD/REMOVE ({legs.length} selected)</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:8,marginBottom:16}}>{pending.map(b=>{const sel=legs.find(l=>l.id===b.id);return<Card key={b.id} hover onClick={()=>toggle(b)} style={{border:"2px solid "+(sel?S.gn:S.bd),cursor:"pointer"}}><div style={{padding:"10px 12px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:F,fontSize:12,fontWeight:700,color:S.tx}}>{b.pick}</span>{sel&&<span style={{color:S.gn,fontSize:18,fontWeight:900}}>✓</span>}</div><div style={{fontFamily:F,fontSize:10,color:S.sub,marginTop:2}}>{b.game} · {b.type}</div><div style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.yl,marginTop:4}}>{fo(+b.odds)}</div></div></Card>})}</div>
      {legs.length>=2&&<Card style={{padding:20,border:"2px solid "+S.pp+"60",background:S.pp+"06"}}><div style={{fontFamily:F,fontSize:16,fontWeight:800,color:S.pp,marginBottom:12}}>🎯 {legs.length}-Leg Parlay</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>{legs.map(l=><span key={l.id} style={{fontFamily:F,fontSize:11,fontWeight:600,color:S.tx,background:S.sf,padding:"5px 10px",borderRadius:6,border:"1px solid "+S.bd}}>{l.pick} <span style={{color:S.yl}}>({fo(+l.odds)})</span></span>)}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          <div style={{background:S.sf,borderRadius:10,padding:14,textAlign:"center"}}><div style={{fontFamily:F,fontSize:9,color:S.dm,fontWeight:700,marginBottom:4}}>COMBINED ODDS</div><div style={{fontFamily:F,fontSize:26,fontWeight:900,color:S.yl}}>{amOdds}</div></div>
          <div style={{background:S.sf,borderRadius:10,padding:14,textAlign:"center"}}><div style={{fontFamily:F,fontSize:9,color:S.dm,fontWeight:700,marginBottom:4}}>STAKE</div><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:2}}><span style={{fontFamily:F,fontSize:18,color:S.dm}}>$</span><input value={stake} onChange={e=>setStake(e.target.value)} style={{width:60,fontFamily:F,fontSize:26,fontWeight:900,color:S.tx,background:"transparent",border:"none",outline:"none",textAlign:"center"}}/></div></div>
          <div style={{background:S.gn+"10",borderRadius:10,padding:14,textAlign:"center",border:"1px solid "+S.gn+"25"}}><div style={{fontFamily:F,fontSize:9,color:S.gn,fontWeight:700,marginBottom:4}}>PAYOUT</div><div style={{fontFamily:F,fontSize:26,fontWeight:900,color:S.gn}}>${payout.toFixed(2)}</div></div>
        </div>
        <div style={{fontFamily:F,fontSize:11,color:S.dm,textAlign:"center",marginTop:10}}>Multiplier: {po.toFixed(2)}x — All legs must win</div>
      </Card>}
      {legs.length===1&&<div style={{fontFamily:F,fontSize:13,color:S.yl,textAlign:"center",padding:24,background:S.sf,borderRadius:10}}>⚡ Select 1 more bet to build your parlay</div>}
    </>}
  </div>;
}

// ═══ BETTING + TRACKER ═══
function Betting(){
  const[nflG,setNflG]=useState([]);const[cfbG,setCfbG]=useState([]);const[cbbG,setCbbG]=useState([]);const[nbaG,setNbaG]=useState([]);const[mlbG,setMlbG]=useState([]);const[nhlG,setNhlG]=useState([]);const[futures,setFutures]=useState([]);const[ld,setLd]=useState(true);const[tab,setTab]=useState("nba");const[err,setErr]=useState(null);const[bets,setBets]=useBets();
  useEffect(()=>{(async()=>{const m="spreads,h2h,totals";const base="https://api.the-odds-api.com/v4";
    const rs=await Promise.allSettled([
      fetch(`${base}/sports/americanfootball_nfl/odds/?apiKey=${OK}&regions=us&markets=${m}&oddsFormat=american`).then(r=>r.ok?r.json():[]),
      fetch(`${base}/sports/americanfootball_ncaaf/odds/?apiKey=${OK}&regions=us&markets=${m}&oddsFormat=american`).then(r=>r.ok?r.json():[]),
      fetch(`${base}/sports/basketball_ncaab/odds/?apiKey=${OK}&regions=us&markets=${m}&oddsFormat=american`).then(r=>r.ok?r.json():[]),
      fetch(`${base}/sports/basketball_nba/odds/?apiKey=${OK}&regions=us&markets=${m}&oddsFormat=american`).then(r=>r.ok?r.json():[]),
      fetch(`${base}/sports/baseball_mlb/odds/?apiKey=${OK}&regions=us&markets=${m}&oddsFormat=american`).then(r=>r.ok?r.json():[]),
      fetch(`${base}/sports/icehockey_nhl/odds/?apiKey=${OK}&regions=us&markets=${m}&oddsFormat=american`).then(r=>r.ok?r.json():[]),
      fetch(`${base}/sports/americanfootball_nfl_super_bowl_winner/odds/?apiKey=${OK}&regions=us&markets=outrights&oddsFormat=american`).then(r=>r.ok?r.json():[])
    ]);
    const[nfl,cfb,cbb,nba,mlb,nhl,fut]=rs.map(r=>r.status==="fulfilled"?r.value:[]);
    setNflG(nfl||[]);setCfbG(cfb||[]);setCbbG(cbb||[]);setNbaG(nba||[]);setMlbG(mlb||[]);setNhlG(nhl||[]);
    if(!nfl?.length&&!cfb?.length&&!cbb?.length&&!nba?.length&&!mlb?.length&&!nhl?.length)setErr("Odds API returned no data — key may be rate-limited.");
    setFutures((fut?.[0]?.bookmakers?.[0]?.markets?.[0]?.outcomes||[]).sort((a,b)=>Math.abs(a.price)-Math.abs(b.price)).slice(0,24));
    setLd(false);
  })();},[]);
  function gb(g,k){return g.bookmakers?.[0]?.markets?.find(m=>m.key===k);}
  function qb(game,pick,type,odds){setBets(p=>[...p,{id:Date.now(),game,pick,type,odds:String(odds),amount:"10",result:"pending"}]);}
  const tw=bets.reduce((s,b)=>s+(+b.amount||0),0);
  const wonC=bets.filter(b=>b.result==="won").length;const lostC=bets.filter(b=>b.result==="lost").length;const pendC=bets.filter(b=>b.result==="pending").length;
  const won=bets.filter(b=>b.result==="won").reduce((s,b)=>{const o=+b.odds,a=+b.amount;return s+(o>0?a*(o/100):a*(100/Math.abs(o)));},0);
  const lost=bets.filter(b=>b.result==="lost").reduce((s,b)=>s+(+b.amount||0),0);
  const profit=won-lost;
  function markResult(id,result){setBets(p=>p.map(b=>b.id===id?{...b,result}:b));}
  function OddsGrid({games,sp}){if(!games?.length)return<Emp t={"No "+sp+" odds available — try game card odds in Scores"} ic="🎲"/>;
    return<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:10}}>{games.map((g,i)=>{
      const spd=gb(g,"spreads"),ml=gb(g,"h2h"),tot=gb(g,"totals");const sides=[g.away_team,g.home_team].map(n=>({n,ml:ml?.outcomes?.find(o=>o.name===n),sp:spd?.outcomes?.find(o=>o.name===n)}));
      const ov=tot?.outcomes?.find(o=>o.name==="Over");const gn=(g.away_team||"").split(" ").pop()+" @ "+(g.home_team||"").split(" ").pop();
      return<Card key={g.id||i}><div style={{height:3,background:S.ac+"40"}}/><div style={{padding:"10px 12px"}}>
        <div style={{fontFamily:F,fontSize:10,color:S.ac,fontWeight:600,marginBottom:6}}>🕐 {new Date(g.commence_time).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div>
        {sides.map((x,xi)=><div key={xi} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:xi===0?"1px solid "+S.bd+"40":""}}>
          <div style={{flex:1}}><div style={{fontFamily:F,fontWeight:700,fontSize:13,color:S.tx}}>{x.n}</div>{x.sp&&<div style={{fontFamily:F,fontSize:10,color:S.dm}}>Spread: {(x.sp.point>0?"+":"")+x.sp.point}</div>}</div>
          <button onClick={()=>x.ml?.price&&qb(gn,x.n?.split(" ").pop(),"ML",x.ml.price)} style={{fontFamily:F,fontSize:17,fontWeight:800,color:S.yl,background:"transparent",border:"1px solid transparent",borderRadius:6,padding:"2px 10px",cursor:"pointer",transition:"all .15s"}} onMouseEnter={e=>{e.target.style.background=S.yl+"12";e.target.style.borderColor=S.yl+"30";}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.borderColor="transparent";}}>{fo(x.ml?.price)}</button>
        </div>)}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginTop:8}}>
          {sides[0]?.sp&&<button onClick={()=>qb(gn,sides[0].n?.split(" ").pop()+" "+((sides[0].sp.point>0?"+":"")+sides[0].sp.point),"spread",sides[0].sp.price)} style={{background:S.ac+"08",border:"1px solid "+S.ac+"18",borderRadius:6,padding:6,textAlign:"center",cursor:"pointer",transition:"all .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=S.ac+"50"} onMouseLeave={e=>e.currentTarget.style.borderColor=S.ac+"18"}><div style={{fontFamily:F,fontSize:8,color:S.dm,fontWeight:600}}>SPREAD</div><div style={{fontFamily:F,fontSize:11,color:S.ac,fontWeight:700}}>{(sides[0].sp.point>0?"+":"")+sides[0].sp.point} ({fo(sides[0].sp.price)})</div></button>}
          {ov&&<button onClick={()=>qb(gn,"Over "+ov.point,"over",ov.price)} style={{background:S.gn+"08",border:"1px solid "+S.gn+"18",borderRadius:6,padding:6,textAlign:"center",cursor:"pointer",transition:"all .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=S.gn+"50"} onMouseLeave={e=>e.currentTarget.style.borderColor=S.gn+"18"}><div style={{fontFamily:F,fontSize:8,color:S.dm,fontWeight:600}}>O/U</div><div style={{fontFamily:F,fontSize:11,color:S.gn,fontWeight:700}}>O {ov.point} ({fo(ov.price)})</div></button>}
        </div>
      </div></Card>})}</div>;}
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>💰 Betting</h2><p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 14px"}}>Click any odds to add to tracker · Build parlays in Parlay tab</p>
    <div style={{display:"flex",gap:4,marginBottom:16,flexWrap:"wrap"}}>{[["nfl","🏈 NFL"],["nba","🏀 NBA"],["mlb","⚾ MLB"],["nhl","🏒 NHL"],["cfb","🏈 CFB"],["cbb","🏀 CBB"],["futures","🏆 Futures"],["tracker","📝 Tracker"+(bets.length?" ("+bets.length+")":"")]].map(([k,l])=><Pill key={k} l={l} a={tab===k} c={k==="tracker"?S.gn:S.yl} onClick={()=>setTab(k)}/>)}</div>
    <Err m={err}/>{ld&&tab!=="tracker"?<Spin/>:<>
      {tab==="nfl"&&<OddsGrid games={nflG} sp="NFL"/>}
      {tab==="cfb"&&<OddsGrid games={cfbG} sp="CFB"/>}
      {tab==="cbb"&&<OddsGrid games={cbbG} sp="CBB"/>}
      {tab==="nba"&&<OddsGrid games={nbaG} sp="NBA"/>}
      {tab==="mlb"&&<OddsGrid games={mlbG} sp="MLB"/>}
      {tab==="nhl"&&<OddsGrid games={nhlG} sp="NHL"/>}
      {tab==="futures"&&(futures.length===0?<Emp t="No futures" ic="🏆"/>:<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:8}}>{futures.map((f,i)=>{const inf=NFL.find(t=>f.name?.includes(t.f?.split(" ").pop()));return<Card key={i} hover onClick={()=>qb("Super Bowl",f.name,"futures",f.price)} style={{cursor:"pointer"}}><div style={{padding:10}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>{inf&&<img src={nL(inf.a)} alt="" style={{width:22,height:22}} onError={e=>{e.target.style.display="none"}}/>}<span style={{fontFamily:F,fontWeight:700,fontSize:12,color:S.tx}}>{f.name}</span></div><div style={{fontFamily:F,fontSize:20,fontWeight:800,color:inf?.cl||S.yl}}>{fo(f.price)}</div></div></Card>})}</div>)}
      {tab==="tracker"&&<div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:14}}><SB l="RECORD" v={wonC+"-"+lostC} c={wonC>=lostC?S.gn:S.rd}/><SB l="PENDING" v={pendC} c={S.yl}/><SB l="WAGERED" v={"$"+tw.toFixed(0)} c={S.ac}/><SB l="WON" v={"+$"+won.toFixed(0)} c={S.gn}/><SB l="PROFIT" v={(profit>=0?"+":"")+"$"+profit.toFixed(0)} c={profit>=0?S.gn:S.rd}/></div>
        {bets.length===0?<Emp t="Click any odds to add bets" ic="👆"/>:<Card style={{overflow:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:S.sf}}>{["GAME","PICK","TYPE","ODDS","$","WIN","RESULT",""].map((h,i)=><th key={i} style={{padding:"7px 8px",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,borderBottom:"1px solid "+S.bd,textAlign:"left"}}>{h}</th>)}</tr></thead><tbody>{bets.map(b=>{const o=+b.odds,a=+b.amount,pay=o>0?a*(o/100):a*(100/Math.abs(o));return<tr key={b.id} style={{borderBottom:"1px solid "+S.bd+"20"}}><td style={{padding:"7px 8px",fontFamily:F,fontSize:11,fontWeight:600,color:S.tx,maxWidth:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.game}</td><td style={{padding:"7px 8px",fontFamily:F,fontSize:11,color:S.sub}}>{b.pick}</td><td style={{padding:"7px 8px"}}><span style={{fontFamily:F,fontSize:9,fontWeight:600,color:S.ac,background:S.ac+"12",padding:"2px 6px",borderRadius:4}}>{b.type}</span></td><td style={{padding:"7px 8px",fontFamily:F,fontSize:13,fontWeight:700,color:S.yl}}>{fo(o)}</td><td style={{padding:"7px 8px"}}><input value={b.amount} onChange={e=>setBets(p=>p.map(x=>x.id===b.id?{...x,amount:e.target.value}:x))} style={{width:45,padding:"3px 5px",background:S.sf,border:"1px solid "+S.bd,color:S.tx,borderRadius:4,fontFamily:F,fontSize:11,outline:"none",textAlign:"right"}}/></td><td style={{padding:"7px 8px",fontFamily:F,fontSize:12,fontWeight:600,color:S.gn}}>${pay.toFixed(0)}</td><td style={{padding:"7px 8px"}}>{b.result==="pending"?<div style={{display:"flex",gap:2}}>{[["W","won",S.gn],["L","lost",S.rd],["P","push",S.sub]].map(([l,r,c])=><button key={l} onClick={()=>setBets(p=>p.map(x=>x.id===b.id?{...x,result:r}:x))} style={{padding:"2px 7px",background:c+"12",border:"1px solid "+c+"25",borderRadius:4,color:c,fontSize:9,fontWeight:700,cursor:"pointer",fontFamily:F}}>{l}</button>)}</div>:<span style={{fontFamily:F,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:4,color:b.result==="won"?S.gn:b.result==="lost"?S.rd:S.yl,background:(b.result==="won"?S.gn:b.result==="lost"?S.rd:S.yl)+"12"}}>{b.result.toUpperCase()}</span>}</td><td style={{padding:"7px 8px"}}><button onClick={()=>setBets(p=>p.filter(x=>x.id!==b.id))} style={{background:"transparent",border:"none",color:S.dm,cursor:"pointer",fontFamily:F,fontSize:14}}>✕</button></td></tr>})}</tbody></table></Card>}
      </div>}
    </>}</div>;
}

// ═══ NEWS ═══
function News(){
  const[news,setNews]=useState([]);const[ld,setLd]=useState(true);const[sport,setSport]=useState("nfl");
  const P={nfl:"football/nfl",nba:"basketball/nba",mlb:"baseball/mlb",nhl:"hockey/nhl",cfb:"football/college-football",cbb:"basketball/mens-college-basketball",clx:"lacrosse/mens-college-lacrosse"};
  useEffect(()=>{setLd(true);ef(`https://site.api.espn.com/apis/site/v2/sports/${P[sport]}/news?limit=40`).then(d=>{setNews(d?.articles||[]);setLd(false);});},[sport]);
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 14px"}}>📰 News</h2>
    <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>{[["nfl","🏈 NFL"],["nba","🏀 NBA"],["mlb","⚾ MLB"],["nhl","🏒 NHL"],["cfb","🏈 CFB"],["cbb","🏀 CBB"],["clx","🥍 LAX"]].map(([k,l])=><Pill key={k} l={l} a={sport===k} c={S.ac} onClick={()=>setSport(k)}/>)}</div>
    {ld?<Spin/>:<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:10}}>{news.map((n,i)=><Card key={i} hover>{n.images?.[0]?.url&&<div style={{height:150,overflow:"hidden"}}><img src={n.images[0].url} alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:.85}}/></div>}<div style={{padding:"10px 12px"}}><div style={{fontFamily:F,fontWeight:700,fontSize:13,color:S.tx,lineHeight:1.3,marginBottom:4}}>{n.headline}</div>{n.description&&<div style={{fontFamily:F,fontSize:11,color:S.sub,lineHeight:1.5,marginBottom:6}}>{n.description.slice(0,140)}...</div>}<div style={{display:"flex",justifyContent:"space-between"}}>{n.published&&<span style={{fontFamily:F,fontSize:9,color:S.dm}}>{fd(n.published)}</span>}{n.links?.web?.href&&<a href={n.links.web.href} target="_blank" rel="noopener noreferrer" style={{fontFamily:F,fontSize:10,color:S.ac,textDecoration:"none",fontWeight:600}}>Read →</a>}</div></div></Card>)}</div>}</div>;
}


// ═══ GLOBAL SEARCH ═══
function SearchBar({onSelect}){
  const[q,setQ]=useState("");const[res,setRes]=useState([]);const[show,setShow]=useState(false);const[ld,setLd]=useState(false);const ref=useRef(null);
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setShow(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[]);
  const search=useCallback(async(query)=>{
    if(!query||query.length<2){setRes([]);return;}
    setLd(true);const results=[];
    const ql=query.toLowerCase();
    // Local teams
    NFL.forEach(t=>{if(t.f.toLowerCase().includes(ql)||t.a.toLowerCase().includes(ql))results.push({type:"team",name:t.f,sub:t.c+" "+t.d,sport:"nfl",img:nL(t.a),data:t});});
    CFB.forEach(t=>{if(t.n.toLowerCase().includes(ql))results.push({type:"team",name:t.n,sub:t.cn+" · Football",sport:"cfb",img:cL(t.eid),data:t});});
    CBB.forEach(t=>{if(t.n.toLowerCase().includes(ql))results.push({type:"team",name:t.n,sub:t.cn+" · Basketball",sport:"cbb",img:cL(t.eid),data:t});});
    CLX.forEach(t=>{if(t.n.toLowerCase().includes(ql))results.push({type:"team",name:t.n,sub:t.cn+" · Lacrosse",sport:"clx",img:cL(t.eid),data:t});});
    // Sleeper player search (works well, no CORS)
    try{
      const pd=await fetch("https://api.sleeper.app/v1/players/nfl").then(r=>r.ok?r.json():null).catch(()=>null);
      if(pd){Object.entries(pd).forEach(([pid,p])=>{
        if(!p.first_name||!p.last_name)return;
        const fn=((p.first_name||"")+" "+(p.last_name||"")).toLowerCase();
        if(fn.includes(ql)&&p.active&&["QB","RB","WR","TE","K","LB","CB","S","DE","DT"].includes(p.position)){
          results.push({type:"player",name:p.first_name+" "+p.last_name,sub:(p.position||"")+" · "+(p.team||"FA"),sport:"nfl",
            img:p.espn_id?`https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${p.espn_id}.png&w=96&h=70&cb=1`:null,
            id:p.espn_id||pid,pos:p.position,team:p.team||"FA",college:p.college||""});}
      });}
    }catch{}
    // ESPN athlete search for college sports
    for(const sp of["football/college-football","basketball/mens-college-basketball"]){
      try{const d=await ef(`https://site.api.espn.com/apis/site/v2/sports/${sp}/athletes?search=${encodeURIComponent(query)}&limit=5`);
        (d?.items||d?.athletes||[]).forEach(a=>{const at=a.athlete||a;
          results.push({type:"player",name:at.displayName||at.fullName,sub:(at.position?.abbreviation||"")+" · "+(at.team?.displayName||""),
            sport:sp.includes("college-football")?"cfb":"cbb",img:hsUrl(at.headshot),id:at.id,pos:at.position?.abbreviation,team:at.team?.displayName||"",teamId:at.team?.id});
        });}catch{}}
    setRes(results.slice(0,15));setLd(false);setShow(true);
  },[]);
  useEffect(()=>{const t=setTimeout(()=>search(q),350);return()=>clearTimeout(t);},[q]);
  return<div ref={ref} style={{position:"relative"}}>
    <div style={{display:"flex",alignItems:"center",background:S.sf,border:"1px solid "+S.bd,borderRadius:8,padding:"5px 10px",gap:6}}>
      <span style={{fontSize:13,opacity:.5}}>🔍</span>
      <input value={q} onChange={e=>{setQ(e.target.value);if(!e.target.value)setShow(false);}} onFocus={()=>res.length>0&&setShow(true)} placeholder="Search players, teams..." style={{background:"transparent",border:"none",color:S.tx,fontFamily:F,fontSize:12,outline:"none",width:170}}/>
      {q&&<button onClick={()=>{setQ("");setRes([]);setShow(false);}} style={{background:"none",border:"none",color:S.dm,cursor:"pointer",fontSize:12,padding:0}}>✕</button>}
    </div>
    {show&&(res.length>0||ld)&&<div style={{position:"absolute",top:"100%",right:0,marginTop:4,background:S.cd,border:"1px solid "+S.bd,borderRadius:10,width:340,maxHeight:420,overflowY:"auto",zIndex:500,boxShadow:"0 8px 32px rgba(0,0,0,.5)"}}>
      {ld&&<div style={{padding:12,textAlign:"center",fontFamily:F,fontSize:11,color:S.dm}}>Searching...</div>}
      {res.map((r,i)=><div key={i} onClick={()=>{onSelect(r);setShow(false);setQ("");}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",cursor:"pointer",borderBottom:"1px solid "+S.bd+"30",transition:"background .1s"}} onMouseEnter={e=>e.currentTarget.style.background=S.sf} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        {r.img?<img src={r.img} alt="" style={{width:32,height:32,borderRadius:r.type==="team"?6:16,objectFit:"cover",background:S.sf}} onError={e=>{e.target.style.display="none"}}/>:<div style={{width:32,height:32,borderRadius:r.type==="team"?6:16,background:S.sf,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{r.type==="team"?"🏟":"👤"}</div>}
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:F,fontSize:12,fontWeight:700,color:S.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.name}</div>
          <div style={{fontFamily:F,fontSize:10,color:S.dm}}>{r.sub}</div>
        </div>
        <span style={{fontFamily:F,fontSize:8,fontWeight:700,color:r.sport==="nfl"?S.gn:r.sport==="cfb"?S.ac:S.or,padding:"2px 5px",background:(r.sport==="nfl"?S.gn:r.sport==="cfb"?S.ac:S.or)+"15",borderRadius:4}}>{r.sport.toUpperCase()}</span>
      </div>)}
    </div>}
    {show&&res.length===0&&q.length>=2&&!ld&&<div style={{position:"absolute",top:"100%",right:0,marginTop:4,background:S.cd,border:"1px solid "+S.bd,borderRadius:10,width:280,padding:16,zIndex:500,boxShadow:"0 8px 32px rgba(0,0,0,.5)"}}><div style={{fontFamily:F,fontSize:12,color:S.dm,textAlign:"center"}}>No results for "{q}"</div></div>}
  </div>;
}



// ═══ TRENDING / WAIVER WIRE (Sleeper) ═══
function Trending(){
  const[adds,setAdds]=useState([]);const[drops,setDrops]=useState([]);const[pd,setPd]=useState(null);const[ld,setLd]=useState(true);const[mode,setMode]=useState("add");
  useEffect(()=>{setLd(true);Promise.all([
    fetch("https://api.sleeper.app/v1/players/nfl").then(r=>r.ok?r.json():null).catch(()=>null),
    fetch("https://api.sleeper.app/v1/players/nfl/trending/add?limit=30").then(r=>r.ok?r.json():null).catch(()=>null),
    fetch("https://api.sleeper.app/v1/players/nfl/trending/drop?limit=30").then(r=>r.ok?r.json():null).catch(()=>null)
  ]).then(([p,a,d])=>{setPd(p);setAdds(a||[]);setDrops(d||[]);setLd(false);});},[]);
  const list=mode==="add"?adds:drops;
  const getP=id=>pd?.[id]||{};
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>🔥 Waiver Wire</h2>
    <p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 12px"}}>Trending adds & drops across Sleeper fantasy leagues (24hr)</p>
    <div style={{display:"flex",gap:4,marginBottom:14}}><Pill l="🔼 Most Added" a={mode==="add"} c={S.gn} onClick={()=>setMode("add")}/><Pill l="🔽 Most Dropped" a={mode==="drop"} c={S.rd} onClick={()=>setMode("drop")}/></div>
    {ld?<Spin/>:<Card style={{overflow:"auto",maxHeight:600}}>
      {list.map((t,i)=>{const p=getP(t.player_id);const clr=mode==="add"?S.gn:S.rd;const img=p.espn_id?`https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${p.espn_id}.png&w=96&h=70&cb=1`:null;
        return<div key={t.player_id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",borderBottom:"1px solid "+S.bd+"25"}}>
          <div style={{fontFamily:F,fontSize:i<3?18:13,fontWeight:800,color:i<3?clr:S.dm,width:28,textAlign:"center"}}>{i+1}</div>
          {img?<img src={img} alt="" style={{width:38,height:38,borderRadius:8,objectFit:"cover",background:S.sf}} onError={e=>{e.target.style.display="none"}}/>:<div style={{width:38,height:38,borderRadius:8,background:S.sf,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>👤</div>}
          <div style={{flex:1}}><div style={{fontFamily:F,fontWeight:700,fontSize:13,color:S.tx}}>{p.first_name||""} {p.last_name||t.player_id}</div>
            <div style={{display:"flex",gap:6,marginTop:2}}><Badge p={p.position}/><span style={{fontFamily:F,fontSize:10,color:S.dm}}>{p.team||"FA"}</span>
              {p.injury_status&&<span style={{fontFamily:F,fontSize:9,fontWeight:700,color:S.rd,background:S.rd+"15",padding:"1px 5px",borderRadius:3}}>{p.injury_status}</span>}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontFamily:F,fontSize:16,fontWeight:800,color:clr}}>{mode==="add"?"+":"-"}{t.count}</div>
            <div style={{fontFamily:F,fontSize:9,color:S.dm}}>leagues</div></div>
        </div>;})}
    </Card>}</div>;
}

// ═══ INJURIES (from Sleeper) ═══
function Injuries(){
  const[players,setPlayers]=useState([]);const[ld,setLd]=useState(true);const[posF,setPosF]=useState("ALL");const[teamF,setTeamF]=useState("ALL");
  useEffect(()=>{setLd(true);fetch("https://api.sleeper.app/v1/players/nfl").then(r=>r.ok?r.json():null).then(pd=>{
    if(!pd){setLd(false);return;}
    const inj=[];Object.entries(pd).forEach(([pid,p])=>{
      if(p.injury_status&&p.active&&p.team&&["QB","RB","WR","TE","K","LB","CB","S","DE","DT","OL","OT","OG"].includes(p.position)){
        inj.push({id:pid,name:(p.first_name||"")+" "+(p.last_name||""),pos:p.position,team:p.team,status:p.injury_status,
          body:p.injury_body_part||"",start:p.injury_start_date||"",notes:p.injury_notes||"",espnId:p.espn_id});}
    });
    inj.sort((a,b)=>{const o={Out:0,IR:1,Doubtful:2,Questionable:3,Probable:4};return(o[a.status]??5)-(o[b.status]??5);});
    setPlayers(inj);setLd(false);}).catch(()=>setLd(false));},[]);
  const teams=[...new Set(players.map(p=>p.team))].sort();
  const filt=players.filter(p=>(posF==="ALL"||p.pos===posF)&&(teamF==="ALL"||p.team===teamF));
  const stClr=s=>s==="Out"||s==="IR"?S.rd:s==="Doubtful"?S.or:s==="Questionable"?S.yl:S.gn;
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>🏥 Injury Report</h2>
    <p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 12px"}}>{filt.length} players with injury designations</p>
    <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:8}}>{["ALL","QB","RB","WR","TE","K","LB","CB","S","DE","DT"].map(p=><Pill key={p} l={p} a={posF===p} c={S.rd} onClick={()=>setPosF(p)} sm/>)}</div>
    <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:14}}><Pill l="ALL" a={teamF==="ALL"} c={S.ac} onClick={()=>setTeamF("ALL")} sm/>{teams.map(t=><Pill key={t} l={t} a={teamF===t} c={S.ac} onClick={()=>setTeamF(t)} sm/>)}</div>
    {ld?<Spin/>:<Card style={{overflow:"auto",maxHeight:600}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:S.sf}}>{["","PLAYER","POS","TEAM","STATUS","INJURY"].map(h=><th key={h} style={{padding:"6px 8px",textAlign:"left",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,borderBottom:"1px solid "+S.bd}}>{h}</th>)}</tr></thead>
      <tbody>{filt.slice(0,100).map((p,i)=>{const img=p.espnId?`https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${p.espnId}.png&w=96&h=70&cb=1`:null;
        return<tr key={p.id} style={{borderBottom:"1px solid "+S.bd+"20"}}>
          <td style={{padding:"4px 8px",width:36}}>{img?<img src={img} alt="" style={{width:30,height:30,borderRadius:6,objectFit:"cover",background:S.sf}} onError={e=>{e.target.style.display="none"}}/>:<div style={{width:30,height:30,borderRadius:6,background:S.sf,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>👤</div>}</td>
          <td style={{padding:"4px 8px",fontFamily:F,fontWeight:700,fontSize:12,color:S.tx}}>{p.name}</td>
          <td style={{padding:"4px 8px"}}><Badge p={p.pos}/></td>
          <td style={{padding:"4px 8px",fontFamily:F,fontSize:11,color:S.sub}}>{p.team}</td>
          <td style={{padding:"4px 8px"}}><span style={{fontFamily:F,fontSize:10,fontWeight:700,color:stClr(p.status),background:stClr(p.status)+"15",padding:"2px 8px",borderRadius:4}}>{p.status}</span></td>
          <td style={{padding:"4px 8px",fontFamily:F,fontSize:10,color:S.dm}}>{p.body}{p.notes?" — "+p.notes:""}</td>
        </tr>;})}</tbody></table></Card>}</div>;
}

// ═══ H2H MATCHUP ═══
function H2H(){
  const[sp,setSp]=useState("nfl");const[t1,setT1]=useState(null);const[t2,setT2]=useState(null);const[d1,setD1]=useState(null);const[d2,setD2]=useState(null);const[ld,setLd]=useState(false);
  const allTeams={nfl:NFL,nba:NBA,mlb:MLB,nhl:NHL};const teams=allTeams[sp]||NFL;
  const logoFn={nfl:t=>nL(t.a),nba:t=>nbL(t.eid),mlb:t=>mlL(t.eid),nhl:t=>nhL(t.eid)};
  const statNames={nfl:[["pointsFor","Points For"],["pointsAgainst","Points Against"]],nba:[["pointsFor","Points/Game"],["pointsAgainst","Opp Pts/Game"]],mlb:[["runsScored","Runs Scored"],["runsAllowed","Runs Allowed"]],nhl:[["goalsFor","Goals For"],["goalsAgainst","Goals Against"]]};
  useEffect(()=>{setT1(null);setT2(null);setD1(null);setD2(null);},[sp]);
  useEffect(()=>{if(!t1||!t2){setD1(null);setD2(null);return;}setLd(true);
    Promise.all([ef(`${E[sp]}/teams/${t1.eid}?enable=record`),ef(`${E[sp]}/teams/${t2.eid}?enable=record`)]).then(([a,b])=>{setD1(a);setD2(b);setLd(false);}).catch(()=>setLd(false));},[t1?.eid,t2?.eid,sp]);
  const getStat=(d,name)=>{const rec=d?.team?.record?.items?.find(i=>i.type==="total");return rec?.stats?.find(s=>s.name===name)?.value||0;};
  const getW=(d)=>{const s=(d?.team?.record?.items?.find(i=>i.type==="total")?.summary||"").split("-").map(Number);return{w:s[0]||0,l:s[1]||0};};
  const getLogo=(t)=>(logoFn[sp]||logoFn.nfl)(t);
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>⚔️ Head-to-Head</h2>
    <p style={{fontFamily:F,fontSize:10,color:S.dm,margin:"0 0 10px"}}>Compare two teams across any sport</p>
    <div style={{display:"flex",gap:4,marginBottom:12}}>{["nfl","nba","mlb","nhl"].map(s=><Pill key={s} l={s.toUpperCase()} a={sp===s} c={s==="nfl"?S.gn:s==="nba"?S.pp:s==="mlb"?S.rd:S.tl} onClick={()=>setSp(s)}/>)}</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:10,marginBottom:16}}>
      <div><div style={{fontFamily:F,fontSize:9,color:S.dm,fontWeight:700,marginBottom:4}}>TEAM 1</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:3,maxHeight:280,overflowY:"auto"}}>{teams.map(t=><button key={t.eid} onClick={()=>setT1(t)} style={{padding:"5px 2px",border:"2px solid "+(t1?.eid===t.eid?t.cl:S.bd),background:t1?.eid===t.eid?t.cl+"15":"transparent",borderRadius:5,cursor:"pointer",textAlign:"center"}}><img src={getLogo(t)} alt="" style={{width:18,height:18}} onError={e=>{e.target.style.display="none"}}/><div style={{fontFamily:F,fontSize:7,color:S.tx,fontWeight:600}}>{t.a}</div></button>)}</div></div>
      <div style={{display:"flex",alignItems:"center",fontFamily:F,fontSize:20,fontWeight:900,color:S.dm}}>VS</div>
      <div><div style={{fontFamily:F,fontSize:9,color:S.dm,fontWeight:700,marginBottom:4}}>TEAM 2</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:3,maxHeight:280,overflowY:"auto"}}>{teams.map(t=><button key={t.eid} onClick={()=>setT2(t)} style={{padding:"5px 2px",border:"2px solid "+(t2?.eid===t.eid?t.cl:S.bd),background:t2?.eid===t.eid?t.cl+"15":"transparent",borderRadius:5,cursor:"pointer",textAlign:"center"}}><img src={getLogo(t)} alt="" style={{width:18,height:18}} onError={e=>{e.target.style.display="none"}}/><div style={{fontFamily:F,fontSize:7,color:S.tx,fontWeight:600}}>{t.a}</div></button>)}</div></div>
    </div>
    {t1&&t2&&(ld?<Spin t="Loading comparison..."/>:d1&&d2&&<Card style={{padding:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{textAlign:"center"}}><img src={getLogo(t1)} alt="" style={{width:44,height:44}} onError={e=>{e.target.style.display="none"}}/><div style={{fontFamily:F,fontSize:12,fontWeight:800,color:t1.cl,marginTop:3}}>{t1.f||t1.n}</div><div style={{fontFamily:F,fontSize:18,fontWeight:900,color:S.tx}}>{getW(d1).w}-{getW(d1).l}</div></div>
        <div style={{fontFamily:F,fontSize:24,fontWeight:900,color:S.bd}}>VS</div>
        <div style={{textAlign:"center"}}><img src={getLogo(t2)} alt="" style={{width:44,height:44}} onError={e=>{e.target.style.display="none"}}/><div style={{fontFamily:F,fontSize:12,fontWeight:800,color:t2.cl,marginTop:3}}>{t2.f||t2.n}</div><div style={{fontFamily:F,fontSize:18,fontWeight:900,color:S.tx}}>{getW(d2).w}-{getW(d2).l}</div></div>
      </div>
      {(statNames[sp]||statNames.nfl).map(([k,l])=>{const v1=Math.round(getStat(d1,k));const v2=Math.round(getStat(d2,k));const better=k.includes("Against")||k.includes("Allowed")?v1<v2:v1>v2;
        return<div key={k} style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,padding:"7px 0",borderBottom:"1px solid "+S.bd+"30"}}>
          <div style={{textAlign:"right",fontFamily:F,fontSize:15,fontWeight:800,color:better?S.gn:S.sub}}>{v1}</div>
          <div style={{fontFamily:F,fontSize:9,color:S.dm,textAlign:"center",minWidth:80}}>{l}</div>
          <div style={{fontFamily:F,fontSize:15,fontWeight:800,color:!better?S.gn:S.sub}}>{v2}</div>
        </div>;})}
    </Card>)}</div>;
}

// ═══ FAVORITES ═══
if(!window._ghqFavV)window._ghqFavV=0;

// ═══ PLAYER COMPARISON ═══
function PlayerCompare(){
  const[p1,setP1]=useState(null);const[p2,setP2]=useState(null);const[d1,setD1]=useState(null);const[d2,setD2]=useState(null);
  const[q1,setQ1]=useState("");const[q2,setQ2]=useState("");const[r1,setR1]=useState([]);const[r2,setR2]=useState([]);const[ld,setLd]=useState(false);
  const[pd,setPd]=useState(null);
  useEffect(()=>{fetch("https://api.sleeper.app/v1/players/nfl").then(r=>r.ok?r.json():null).then(setPd).catch(()=>{});},[]);
  const search=(q,setR)=>{if(!pd||q.length<2){setR([]);return;}const ql=q.toLowerCase();const res=[];
    Object.entries(pd).forEach(([pid,p])=>{const fn=((p.first_name||"")+" "+(p.last_name||"")).toLowerCase();
      if(fn.includes(ql)&&p.active&&["QB","RB","WR","TE","K"].includes(p.position)){
        res.push({id:pid,name:p.first_name+" "+p.last_name,pos:p.position,team:p.team||"FA",espnId:p.espn_id,
          img:p.espn_id?`https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${p.espn_id}.png&w=96&h=70&cb=1`:null});}
    });setR(res.slice(0,8));};
  useEffect(()=>{const t=setTimeout(()=>search(q1,setR1),300);return()=>clearTimeout(t);},[q1,pd]);
  useEffect(()=>{const t=setTimeout(()=>search(q2,setR2),300);return()=>clearTimeout(t);},[q2,pd]);
  // Load stats for selected players
  useEffect(()=>{if(!p1)return;setLd(true);
    const yr=2025;const weeks=Array.from({length:18},(_,i)=>i+1);
    Promise.allSettled(weeks.map(w=>fetch(`https://api.sleeper.app/v1/stats/nfl/regular/${yr}/${w}`).then(r=>r.ok?r.json():null))).then(rs=>{
      const t={pass_yd:0,pass_td:0,pass_int:0,rush_yd:0,rush_td:0,rec:0,rec_yd:0,rec_td:0,gp:0,pts_ppr:0};
      rs.forEach(r=>{if(r.status!=="fulfilled"||!r.value)return;const s=r.value[p1.id];if(s){t.pass_yd+=(s.pass_yd||0);t.pass_td+=(s.pass_td||0);t.pass_int+=(s.pass_int||0);t.rush_yd+=(s.rush_yd||0);t.rush_td+=(s.rush_td||0);t.rec+=(s.rec||0);t.rec_yd+=(s.rec_yd||0);t.rec_td+=(s.rec_td||0);t.gp+=(s.gp||0);t.pts_ppr+=(s.pts_ppr||0);}});
      setD1(t);setLd(false);});},[p1?.id]);
  useEffect(()=>{if(!p2)return;setLd(true);
    const yr=2025;const weeks=Array.from({length:18},(_,i)=>i+1);
    Promise.allSettled(weeks.map(w=>fetch(`https://api.sleeper.app/v1/stats/nfl/regular/${yr}/${w}`).then(r=>r.ok?r.json():null))).then(rs=>{
      const t={pass_yd:0,pass_td:0,pass_int:0,rush_yd:0,rush_td:0,rec:0,rec_yd:0,rec_td:0,gp:0,pts_ppr:0};
      rs.forEach(r=>{if(r.status!=="fulfilled"||!r.value)return;const s=r.value[p2.id];if(s){t.pass_yd+=(s.pass_yd||0);t.pass_td+=(s.pass_td||0);t.pass_int+=(s.pass_int||0);t.rush_yd+=(s.rush_yd||0);t.rush_td+=(s.rush_td||0);t.rec+=(s.rec||0);t.rec_yd+=(s.rec_yd||0);t.rec_td+=(s.rec_td||0);t.gp+=(s.gp||0);t.pts_ppr+=(s.pts_ppr||0);}});
      setD2(t);setLd(false);});},[p2?.id]);
  const StatBar=({label,v1,v2,better="high"})=>{const max=Math.max(v1||1,v2||1);const b1=better==="high"?v1>=v2:v1<=v2;const b2=better==="high"?v2>=v1:v2<=v1;
    return<div style={{marginBottom:10}}><div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,alignItems:"center"}}>
      <div style={{textAlign:"right"}}><span style={{fontFamily:F,fontSize:16,fontWeight:800,color:b1?S.gn:S.sub}}>{typeof v1==="number"?v1.toLocaleString():"—"}</span></div>
      <div style={{fontFamily:F,fontSize:9,color:S.dm,fontWeight:700,textAlign:"center",minWidth:70}}>{label}</div>
      <div><span style={{fontFamily:F,fontSize:16,fontWeight:800,color:b2?S.gn:S.sub}}>{typeof v2==="number"?v2.toLocaleString():"—"}</span></div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 4px 1fr",gap:0,marginTop:3}}>
        <div style={{height:4,borderRadius:2,background:S.bd,overflow:"hidden",direction:"rtl"}}><div style={{height:"100%",width:((v1||0)/max*100)+"%",background:b1?S.gn:S.bd,borderRadius:2,transition:"width .5s"}}/></div>
        <div/>
        <div style={{height:4,borderRadius:2,background:S.bd,overflow:"hidden"}}><div style={{height:"100%",width:((v2||0)/max*100)+"%",background:b2?S.gn:S.bd,borderRadius:2,transition:"width .5s"}}/></div></div>
    </div>;};
  const PSearch=({q,setQ,res,onPick,sel,side})=><div style={{flex:1}}>
    <div style={{fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,marginBottom:4}}>PLAYER {side}</div>
    {sel?<Card style={{padding:12,textAlign:"center"}}>{sel.img&&<img src={sel.img} alt="" style={{width:56,height:56,borderRadius:28,objectFit:"cover",margin:"0 auto 6px",display:"block",background:S.sf}}/>}<div style={{fontFamily:F,fontSize:14,fontWeight:800,color:S.tx}}>{sel.name}</div><div style={{display:"flex",justifyContent:"center",gap:6,marginTop:4}}><Badge p={sel.pos}/><span style={{fontFamily:F,fontSize:10,color:S.dm}}>{sel.team}</span></div><button onClick={()=>{onPick(null);setQ("");}} style={{marginTop:8,padding:"3px 10px",background:S.rd+"15",border:"1px solid "+S.rd+"30",borderRadius:4,color:S.rd,fontFamily:F,fontSize:9,fontWeight:700,cursor:"pointer"}}>Change</button></Card>
    :<div style={{position:"relative"}}><input value={q} onChange={e=>setQ(e.target.value)} placeholder={"Search player "+side+"..."} style={{width:"100%",padding:"8px 12px",background:S.sf,border:"1px solid "+S.bd,borderRadius:8,color:S.tx,fontFamily:F,fontSize:12,outline:"none"}}/>
      {res.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,marginTop:4,background:S.cd,border:"1px solid "+S.bd,borderRadius:8,maxHeight:250,overflowY:"auto",zIndex:50}}>
        {res.map((r,i)=><div key={i} onClick={()=>{onPick(r);setQ("");}} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",cursor:"pointer",borderBottom:"1px solid "+S.bd+"30"}} onMouseEnter={e=>e.currentTarget.style.background=S.sf} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          {r.img?<img src={r.img} alt="" style={{width:28,height:28,borderRadius:14,objectFit:"cover",background:S.sf}}/>:<div style={{width:28,height:28,borderRadius:14,background:S.sf,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>👤</div>}
          <div><div style={{fontFamily:F,fontSize:11,fontWeight:700,color:S.tx}}>{r.name}</div><div style={{fontFamily:F,fontSize:9,color:S.dm}}>{r.pos} · {r.team}</div></div>
        </div>)}</div>}</div>}
  </div>;
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>🔄 Player Comparison</h2>
    <p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 14px"}}>Compare two NFL players side-by-side (2025 season)</p>
    <div style={{display:"flex",gap:16,marginBottom:20}}><PSearch q={q1} setQ={setQ1} res={r1} onPick={p=>{setP1(p);setD1(null);}} sel={p1} side="1"/><div style={{display:"flex",alignItems:"center",fontFamily:F,fontSize:20,fontWeight:900,color:S.bd}}>VS</div><PSearch q={q2} setQ={setQ2} res={r2} onPick={p=>{setP2(p);setD2(null);}} sel={p2} side="2"/></div>
    {p1&&p2&&(ld?<Spin t="Loading season stats..."/>:d1&&d2&&<Card style={{padding:16}}>
      <StatBar label="PASS YDS" v1={d1.pass_yd} v2={d2.pass_yd}/><StatBar label="PASS TD" v1={d1.pass_td} v2={d2.pass_td}/><StatBar label="INT" v1={d1.pass_int} v2={d2.pass_int} better="low"/>
      <StatBar label="RUSH YDS" v1={d1.rush_yd} v2={d2.rush_yd}/><StatBar label="RUSH TD" v1={d1.rush_td} v2={d2.rush_td}/><StatBar label="REC" v1={d1.rec} v2={d2.rec}/>
      <StatBar label="REC YDS" v1={d1.rec_yd} v2={d2.rec_yd}/><StatBar label="REC TD" v1={d1.rec_td} v2={d2.rec_td}/><StatBar label="GAMES" v1={d1.gp} v2={d2.gp}/>
      <div style={{borderTop:"2px solid "+S.yl+"30",paddingTop:10,marginTop:6}}><StatBar label="FANTASY (PPR)" v1={Math.round(d1.pts_ppr)} v2={Math.round(d2.pts_ppr)}/></div>
    </Card>)}</div>;
}

// ═══ TEAM PAGE ═══
function TeamPage(){
  const[selId,setSelId]=useState(null);const[data,setData]=useState(null);const[sched,setSched]=useState([]);const[rost,setRost]=useState([]);const[phase,setPhase]=useState("pick");const[tab,setTab]=useState("overview");const[err,setErr]=useState(null);
  const team=selId?NFL.find(t=>t.eid===selId):null;
  const pick=(t)=>{setSelId(t.eid);setPhase("loading");setData(null);setSched([]);setRost([]);setErr(null);setTab("overview");
    Promise.all([ef(`${E.nfl}/teams/${t.eid}?enable=record`),ef(`${E.nfl}/teams/${t.eid}/roster`)]).then(([d,ro])=>{
      setData(d||null);
      try{setRost((ro?.athletes||[]).flatMap(g=>(g.items||[]).map(a=>({...a,grp:String(g.position||"")}))));}catch{setRost([]);}
      return ef(`${E.nfl}/scoreboard?limit=200&season=2025`);
    }).then(sb=>{
      if(sb?.events){const tGames=sb.events.filter(e=>{const c=e.competitions?.[0];return c?.competitors?.some(x=>String(x.team?.id)===String(t.eid));});setSched(tGames);}
      setPhase("ready");
    }).catch(e=>{console.error("TeamPage:",e);setErr(String(e));setPhase("ready");});
  };
  const rec=data?.team?.record?.items?.find(i=>i.type==="total")?.summary||"—";
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>🏟️ Team Hub</h2>
    <p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 12px"}}>Select a team to see everything in one place</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(80px,1fr))",gap:4,marginBottom:16}}>{NFL.map(t=><button key={t.eid} onClick={()=>pick(t)} style={{padding:"8px 4px",border:"2px solid "+(selId===t.eid?t.cl:S.bd),background:selId===t.eid?t.cl+"15":"transparent",borderRadius:8,cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
      <img src={nL(t.a)} alt="" style={{width:28,height:28}}/><div style={{fontFamily:F,fontSize:9,fontWeight:700,color:S.tx,marginTop:2}}>{t.a}</div></button>)}</div>
    {err&&<Err m={err}/>}
    {phase==="loading"&&<Spin t={team?"Loading "+team.f+"...":"Loading..."}/>}
    {phase==="ready"&&team&&<>
      <Card style={{padding:16,marginBottom:16}}><div style={{display:"flex",alignItems:"center",gap:14}}>
        <img src={nL(team.a)} alt="" style={{width:56,height:56}}/>
        <div><div style={{fontFamily:F,fontSize:20,fontWeight:900,color:team.cl}}>{team.f}</div>
          <div style={{fontFamily:F,fontSize:14,fontWeight:700,color:S.tx,marginTop:2}}>{rec}</div>
          <div style={{fontFamily:F,fontSize:10,color:S.dm}}>{team.c} {team.d}</div></div></div></Card>
      <div style={{display:"flex",gap:4,marginBottom:14}}>{[["overview","Overview"],["schedule","Schedule"],["roster","Roster"]].map(([k,l])=><Pill key={k} l={l} a={tab===k} c={team.cl||S.ac} onClick={()=>setTab(k)}/>)}</div>
      {tab==="overview"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
        <Card style={{padding:12}}><div style={{fontFamily:F,fontSize:10,fontWeight:700,color:S.dm,marginBottom:8}}>UPCOMING</div>
          {(()=>{const up=sched.filter(e=>{try{return !e.competitions[0].status.type.completed;}catch{return true;}});
            return up.length>0?up.slice(0,5).map((e,i)=>{try{const c=e.competitions[0];const opp=c.competitors.find(x=>String(x.team?.id)!==String(team.eid));const isH=c.competitors.find(x=>String(x.team?.id)===String(team.eid))?.homeAway==="home";
              return<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:"1px solid "+S.bd+"20"}}>
                {opp?.team?.logo&&<img src={opp.team.logo} alt="" style={{width:22,height:22}} onError={e=>{e.target.style.display="none"}}/>}
                <div style={{flex:1,fontFamily:F,fontSize:12,fontWeight:700,color:S.tx}}>{isH?"vs":"@"} {opp?.team?.shortDisplayName||"TBD"}</div>
                <span style={{fontFamily:F,fontSize:10,color:S.dm}}>{fd(e.date)}</span></div>;}catch{return null;}})
            :<div style={{fontFamily:F,fontSize:11,color:S.dm,padding:8}}>Season complete</div>;})()}
        </Card>
        <Card style={{padding:12}}><div style={{fontFamily:F,fontSize:10,fontWeight:700,color:S.dm,marginBottom:8}}>RECENT RESULTS</div>
          {(()=>{const dn=sched.filter(e=>{try{return e.competitions[0].status.type.completed;}catch{return false;}});
            return dn.length>0?dn.slice(-5).reverse().map((e,i)=>{try{const c=e.competitions[0];const us=c.competitors.find(x=>String(x.team?.id)===String(team.eid));const them=c.competitors.find(x=>String(x.team?.id)!==String(team.eid));const w=+(us?.score||0)>+(them?.score||0);
              return<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:"1px solid "+S.bd+"20"}}>
                <span style={{fontFamily:F,fontSize:10,fontWeight:800,color:w?S.gn:S.rd,width:14}}>{w?"W":"L"}</span>
                {them?.team?.logo&&<img src={them.team.logo} alt="" style={{width:20,height:20}} onError={e=>{e.target.style.display="none"}}/>}
                <div style={{flex:1,fontFamily:F,fontSize:11,fontWeight:600,color:S.tx}}>{us?.homeAway==="home"?"vs":"@"} {them?.team?.shortDisplayName||"TBD"}</div>
                <span style={{fontFamily:F,fontSize:13,fontWeight:800,color:S.tx}}>{us?.score||0}-{them?.score||0}</span></div>;}catch{return null;}})
            :<div style={{fontFamily:F,fontSize:11,color:S.dm,padding:8}}>No results yet</div>;})()}
        </Card></div>}
      {tab==="schedule"&&<Card style={{overflow:"auto"}}>{sched.length===0?<Emp t="No schedule data" ic="📅"/>:<table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:S.sf}}>{["WK","DATE","OPP","RESULT"].map(h=><th key={h} style={{padding:"6px 10px",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,textAlign:"left",borderBottom:"1px solid "+S.bd}}>{h}</th>)}</tr></thead>
        <tbody>{sched.map((e,i)=>{try{const c=e.competitions[0];const us=c.competitors.find(x=>String(x.team?.id)===String(team.eid));const them=c.competitors.find(x=>String(x.team?.id)!==String(team.eid));const fin=c.status?.type?.completed;const w=fin&&+(us?.score||0)>+(them?.score||0);
          return<tr key={i} style={{borderBottom:"1px solid "+S.bd+"20"}}>
            <td style={{padding:"6px 10px",fontFamily:F,fontSize:11,fontWeight:700,color:S.tl}}>{e.week?.number||i+1}</td>
            <td style={{padding:"6px 10px",fontFamily:F,fontSize:10,color:S.sub}}>{fd(e.date)}</td>
            <td style={{padding:"6px 10px"}}><div style={{display:"flex",alignItems:"center",gap:6}}>{them?.team?.logo&&<img src={them.team.logo} alt="" style={{width:18,height:18}} onError={e=>{e.target.style.display="none"}}/>}<span style={{fontFamily:F,fontSize:11,fontWeight:600,color:S.tx}}>{us?.homeAway==="home"?"vs":"@"} {them?.team?.shortDisplayName||"TBD"}</span></div></td>
            <td style={{padding:"6px 10px"}}>{fin?<span style={{fontFamily:F,fontSize:12,fontWeight:700,color:w?S.gn:S.rd}}>{w?"W":"L"} {us?.score||0}-{them?.score||0}</span>:<span style={{fontFamily:F,fontSize:10,color:S.dm}}>{ft(e.date)}</span>}</td>
          </tr>;}catch{return null;}})}</tbody></table>}</Card>}
      {tab==="roster"&&<Card style={{overflow:"auto"}}>{rost.length===0?<Emp t="Roster not available" ic="👥"/>:<table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:S.sf}}>{["","PLAYER","POS","#","HT","WT","COLLEGE"].map(h=><th key={h} style={{padding:"5px 8px",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,textAlign:"left",borderBottom:"1px solid "+S.bd}}>{h}</th>)}</tr></thead>
        <tbody>{rost.map((p,i)=>{try{const img=hsUrl(p.headshot);return<tr key={i} style={{borderBottom:"1px solid "+S.bd+"20"}}>
          <td style={{padding:"4px 8px",width:34}}>{img?<img src={img} alt="" style={{width:28,height:28,borderRadius:6,objectFit:"cover",background:S.sf}} onError={e=>{e.target.style.display="none"}}/>:<div style={{width:28,height:28,borderRadius:6,background:S.sf,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center"}}>👤</div>}</td>
          <td style={{padding:"4px 8px",fontFamily:F,fontSize:11,fontWeight:700,color:S.tx}}>{String(p.displayName||p.fullName||"")}</td>
          <td style={{padding:"4px 8px"}}><Badge p={p.position?.abbreviation}/></td>
          <td style={{padding:"4px 8px",fontFamily:F,fontSize:11,color:S.sub}}>#{String(p.jersey||"—")}</td>
          <td style={{padding:"4px 8px",fontFamily:F,fontSize:10,color:S.dm}}>{String(p.displayHeight||"—")}</td>
          <td style={{padding:"4px 8px",fontFamily:F,fontSize:10,color:S.dm}}>{String(p.displayWeight||"—")}</td>
          <td style={{padding:"4px 8px",fontFamily:F,fontSize:10,color:S.dm}}>{String(p.college?.name||p.college?.shortName||"—")}</td>
        </tr>;}catch{return null;}})}</tbody></table>}</Card>}
    </>}</div>;
}

function DraftBoard(){
  const[pd,setPd]=useState(null);const[players,setPlayers]=useState([]);const[ld,setLd]=useState(true);const[posF,setPosF]=useState("ALL");const[fmt,setFmt]=useState("ppr");
  useEffect(()=>{setLd(true);Promise.all([
    fetch("https://api.sleeper.app/v1/players/nfl").then(r=>r.ok?r.json():null),
    ...Array.from({length:18},(_,i)=>fetch(`https://api.sleeper.app/v1/projections/nfl/regular/2025/${i+1}`).then(r=>r.ok?r.json():null).catch(()=>null))
  ]).then(([pdata,...weeks])=>{if(!pdata){setLd(false);return;}
    const agg={};weeks.forEach(w=>{if(!w)return;Object.entries(w).forEach(([pid,proj])=>{
      if(!agg[pid])agg[pid]={pts_ppr:0,pts_half:0,pts_std:0};
      agg[pid].pts_ppr+=(proj.pts_ppr||0);agg[pid].pts_half+=(proj.pts_half_ppr||proj.pts_ppr*.9||0);agg[pid].pts_std+=(proj.pts_std||proj.pts_ppr*.8||0);});});
    const list=[];Object.entries(agg).forEach(([pid,s])=>{const p=pdata[pid];
      if(p&&p.active&&["QB","RB","WR","TE","K"].includes(p.position)){
        list.push({id:pid,name:(p.first_name||"")+" "+(p.last_name||""),pos:p.position,team:p.team||"FA",
          ppr:Math.round(s.pts_ppr),half:Math.round(s.pts_half),std:Math.round(s.pts_std),
          img:p.espn_id?`https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${p.espn_id}.png&w=96&h=70&cb=1`:null,
          bye:p.metadata?.bye_week||"—",age:p.age||"—"});}});
    list.sort((a,b)=>(fmt==="ppr"?b.ppr-a.ppr:fmt==="half"?b.half-a.half:b.std-a.std));
    setPlayers(list);setPd(pdata);setLd(false);});
  },[]);
  const sorted=[...players].sort((a,b)=>(fmt==="ppr"?b.ppr-a.ppr:fmt==="half"?b.half-a.half:b.std-a.std)).filter(p=>posF==="ALL"||p.pos===posF);
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>📋 Draft Rankings</h2>
    <p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 12px"}}>2025 projected fantasy points — your draft cheat sheet</p>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>{["ALL","QB","RB","WR","TE","K"].map(p=><Pill key={p} l={p} a={posF===p} c={S.ac} onClick={()=>setPosF(p)} sm/>)}</div>
    <div style={{display:"flex",gap:4,marginBottom:14}}>{[["ppr","PPR"],["half","Half PPR"],["std","Standard"]].map(([k,l])=><Pill key={k} l={l} a={fmt===k} c={S.gn} onClick={()=>setFmt(k)} sm/>)}</div>
    {ld?<Spin t="Building rankings from projections..."/>:<Card style={{overflow:"auto",maxHeight:650}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:S.sf}}>{["RK","","PLAYER","POS","TEAM","BYE","PROJ PTS"].map(h=><th key={h} style={{padding:"6px 8px",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,textAlign:"left",borderBottom:"1px solid "+S.bd,position:"sticky",top:0,background:S.sf}}>{h}</th>)}</tr></thead>
      <tbody>{sorted.slice(0,200).map((p,i)=><tr key={p.id} style={{borderBottom:"1px solid "+S.bd+"20",background:i<10?S.yl+"06":"transparent"}}>
        <td style={{padding:"5px 8px",fontFamily:F,fontSize:i<10?14:11,fontWeight:800,color:i<3?S.yl:i<10?S.ac:S.dm,width:28}}>{i+1}</td>
        <td style={{padding:"4px 6px",width:34}}>{p.img?<img src={p.img} alt="" style={{width:28,height:28,borderRadius:6,objectFit:"cover",background:S.sf}} onError={e=>{e.target.style.display="none"}}/>:<div style={{width:28,height:28,borderRadius:6,background:S.sf}}/>}</td>
        <td style={{padding:"5px 8px",fontFamily:F,fontSize:12,fontWeight:700,color:S.tx}}>{p.name}</td>
        <td style={{padding:"5px 8px"}}><Badge p={p.pos}/></td>
        <td style={{padding:"5px 8px",fontFamily:F,fontSize:10,color:S.sub}}>{p.team}</td>
        <td style={{padding:"5px 8px",fontFamily:F,fontSize:10,color:S.dm}}>{p.bye}</td>
        <td style={{padding:"5px 8px",fontFamily:F,fontSize:14,fontWeight:800,color:S.gn}}>{fmt==="ppr"?p.ppr:fmt==="half"?p.half:p.std}</td>
      </tr>)}</tbody></table></Card>}</div>;
}

// ═══ TRADE ANALYZER ═══
function TradeAnalyzer(){
  const[pd,setPd]=useState(null);const[give,setGive]=useState([]);const[get,setGet]=useState([]);const[q,setQ]=useState("");const[res,setRes]=useState([]);const[side,setSide]=useState("give");
  useEffect(()=>{fetch("https://api.sleeper.app/v1/players/nfl").then(r=>r.ok?r.json():null).then(setPd).catch(()=>{});},[]);
  const search=useCallback((q)=>{if(!pd||q.length<2){setRes([]);return;}const ql=q.toLowerCase();const r=[];
    Object.entries(pd).forEach(([pid,p])=>{const fn=((p.first_name||"")+" "+(p.last_name||"")).toLowerCase();
      if(fn.includes(ql)&&p.active&&["QB","RB","WR","TE","K"].includes(p.position)){
        r.push({id:pid,name:p.first_name+" "+p.last_name,pos:p.position,team:p.team||"FA",
          val:p.search_rank?Math.max(1,200-p.search_rank):50,
          img:p.espn_id?`https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${p.espn_id}.png&w=96&h=70&cb=1`:null});}
    });setRes(r.slice(0,6));},[pd]);
  useEffect(()=>{const t=setTimeout(()=>search(q),300);return()=>clearTimeout(t);},[q,search]);
  const addP=(p)=>{if(side==="give")setGive(prev=>[...prev,p]);else setGet(prev=>[...prev,p]);setQ("");setRes([]);};
  const giveVal=give.reduce((s,p)=>s+p.val,0);const getVal=get.reduce((s,p)=>s+p.val,0);
  const diff=getVal-giveVal;const verdict=Math.abs(diff)<15?"Fair trade":diff>0?"You win this trade":"Other side wins";
  const vColor=Math.abs(diff)<15?S.yl:diff>0?S.gn:S.rd;
  const SideCol=({items,remove,label,clr})=><div style={{flex:1}}>
    <div style={{fontFamily:F,fontSize:10,fontWeight:700,color:clr,marginBottom:6}}>{label}</div>
    {items.map((p,i)=><div key={p.id+i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",background:S.sf,borderRadius:6,marginBottom:4}}>
      {p.img?<img src={p.img} alt="" style={{width:26,height:26,borderRadius:6,objectFit:"cover",background:S.bd}}/>:<div style={{width:26,height:26,borderRadius:6,background:S.bd}}/>}
      <div style={{flex:1}}><div style={{fontFamily:F,fontSize:11,fontWeight:700,color:S.tx}}>{p.name}</div><div style={{fontFamily:F,fontSize:9,color:S.dm}}>{p.pos} · {p.team}</div></div>
      <div style={{fontFamily:F,fontSize:11,fontWeight:700,color:S.ac}}>{p.val}</div>
      <button onClick={()=>remove(i)} style={{background:"none",border:"none",color:S.dm,cursor:"pointer",fontSize:12}}>✕</button>
    </div>)}
    <div style={{fontFamily:F,fontSize:11,fontWeight:800,color:clr,textAlign:"right",marginTop:6}}>Total: {items.reduce((s,p)=>s+p.val,0)}</div>
  </div>;
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>⚖️ Trade Analyzer</h2>
    <p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 14px"}}>Compare trade value based on Sleeper rankings</p>
    <div style={{display:"flex",gap:4,marginBottom:12}}><Pill l="➕ Add to Give" a={side==="give"} c={S.rd} onClick={()=>setSide("give")}/><Pill l="➕ Add to Get" a={side==="get"} c={S.gn} onClick={()=>setSide("get")}/></div>
    <div style={{position:"relative",marginBottom:16}}><input value={q} onChange={e=>setQ(e.target.value)} placeholder={"Search player to add to "+side+"..."} style={{width:"100%",padding:"8px 12px",background:S.sf,border:"1px solid "+S.bd,borderRadius:8,color:S.tx,fontFamily:F,fontSize:12,outline:"none"}}/>
      {res.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,marginTop:4,background:S.cd,border:"1px solid "+S.bd,borderRadius:8,maxHeight:200,overflowY:"auto",zIndex:50}}>
        {res.map((r,i)=><div key={i} onClick={()=>addP(r)} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",cursor:"pointer",borderBottom:"1px solid "+S.bd+"30"}} onMouseEnter={e=>e.currentTarget.style.background=S.sf} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          {r.img?<img src={r.img} alt="" style={{width:24,height:24,borderRadius:6,objectFit:"cover",background:S.sf}}/>:<div style={{width:24,height:24,borderRadius:6,background:S.sf}}/>}
          <div style={{flex:1,fontFamily:F,fontSize:11,fontWeight:700,color:S.tx}}>{r.name}</div><Badge p={r.pos}/><span style={{fontFamily:F,fontSize:10,color:S.dm}}>{r.team}</span><span style={{fontFamily:F,fontSize:11,fontWeight:700,color:S.ac}}>{r.val}</span>
        </div>)}</div>}</div>
    <div style={{display:"flex",gap:16,marginBottom:16}}>
      <SideCol items={give} remove={i=>setGive(p=>p.filter((_,j)=>j!==i))} label="📤 YOU GIVE" clr={S.rd}/>
      <SideCol items={get} remove={i=>setGet(p=>p.filter((_,j)=>j!==i))} label="📥 YOU GET" clr={S.gn}/>
    </div>
    {(give.length>0||get.length>0)&&<Card style={{padding:16,textAlign:"center",border:"2px solid "+vColor+"40"}}>
      <div style={{fontFamily:F,fontSize:28,fontWeight:900,color:vColor}}>{verdict}</div>
      <div style={{fontFamily:F,fontSize:12,color:S.dm,marginTop:4}}>Value difference: <span style={{color:vColor,fontWeight:700}}>{diff>0?"+":""}{diff} points</span></div>
      <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:10}}>
        <div><div style={{fontFamily:F,fontSize:9,color:S.dm}}>GIVING</div><div style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.rd}}>{giveVal}</div></div>
        <div><div style={{fontFamily:F,fontSize:9,color:S.dm}}>GETTING</div><div style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.gn}}>{getVal}</div></div>
      </div></Card>}
    {give.length===0&&get.length===0&&<Emp t="Search and add players to each side to analyze" ic="⚖️"/>}
  </div>;
}

// ═══ PROP BETS (Player Props from Odds API) ═══
function PropBets(){
  const[games,setGames]=useState([]);const[futures,setFutures]=useState([]);const[ld,setLd]=useState(true);const[sport,setSport]=useState("nfl");const[tab,setTab]=useState("props");
  const allProps="player_pass_tds,player_pass_yds,player_pass_completions,player_pass_attempts,player_pass_interceptions,player_rush_yds,player_rush_attempts,player_receptions,player_reception_yds,player_anytime_td,player_first_td,player_last_td,player_tackles_assists,player_kicking_points,player_field_goals";
  const bbProps="player_points,player_rebounds,player_assists,player_threes,player_blocks,player_steals,player_points_rebounds_assists,player_points_rebounds,player_points_assists,player_rebounds_assists,player_double_double,player_triple_double";
  const futuresSports={nfl:["americanfootball_nfl_super_bowl_winner","americanfootball_nfl_mvp"],cfb:["americanfootball_ncaaf_championship_winner"],cbb:["basketball_ncaab_championship_winner"]};
  useEffect(()=>{setLd(true);const sp=sport==="nfl"?"americanfootball_nfl":sport==="cfb"?"americanfootball_ncaaf":"basketball_ncaab";
    const mkts=sport==="cbb"?bbProps:allProps;
    const prom=[fetch(`https://api.the-odds-api.com/v4/sports/${sp}/odds/?apiKey=${OK}&regions=us&markets=${mkts}&oddsFormat=american`).then(r=>r.ok?r.json():[]).catch(()=>[])];
    (futuresSports[sport]||[]).forEach(fs=>{prom.push(fetch(`https://api.the-odds-api.com/v4/sports/${fs}/odds/?apiKey=${OK}&regions=us&markets=outrights&oddsFormat=american`).then(r=>r.ok?r.json():[]).catch(()=>[]));});
    Promise.all(prom).then(([g,...futs])=>{setGames(g||[]);
      const allFuts=[];futs.forEach(f=>{(f||[]).forEach(ev=>{const bk=ev.bookmakers?.[0];if(!bk)return;(bk.markets||[]).forEach(m=>{(m.outcomes||[]).forEach(o=>{allFuts.push({sport:ev.sport_title||"",name:o.name,price:o.price,book:bk.title});});});});});
      allFuts.sort((a,b)=>Math.abs(a.price)-Math.abs(b.price));setFutures(allFuts);setLd(false);});
  },[sport]);
  const fmtMkt=k=>(k||"").replace(/player_/g,"").replace(/_/g," ").toUpperCase();
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>🎯 Props & Futures</h2>
    <p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 12px"}}>All player props + championship & award futures</p>
    <div style={{display:"flex",gap:4,marginBottom:8}}>{[["nfl","🏈 NFL"],["cfb","🏈 CFB"],["cbb","🏀 CBB"]].map(([k,l])=><Pill key={k} l={l} a={sport===k} c={S.yl} onClick={()=>setSport(k)}/>)}</div>
    <div style={{display:"flex",gap:4,marginBottom:14}}><Pill l="🎲 Player Props" a={tab==="props"} c={S.pp} onClick={()=>setTab("props")}/><Pill l="🏆 Futures" a={tab==="futures"} c={S.or} onClick={()=>setTab("futures")}/></div>
    {ld?<Spin t="Loading all markets..."/>:tab==="futures"?<>{futures.length===0?<Emp t="No futures available right now" ic="🏆"/>:
      <Card style={{overflow:"auto",maxHeight:600}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:S.sf}}>{["RK","","ODDS","BOOK"].map(h=><th key={h} style={{padding:"6px 8px",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,textAlign:"left",borderBottom:"1px solid "+S.bd}}>{h}</th>)}</tr></thead>
        <tbody>{futures.slice(0,60).map((f,i)=><tr key={i} style={{borderBottom:"1px solid "+S.bd+"20",background:i<3?S.yl+"08":"transparent"}}>
          <td style={{padding:"5px 8px",fontFamily:F,fontSize:i<3?14:11,fontWeight:800,color:i<3?S.yl:S.dm,width:28}}>{i+1}</td>
          <td style={{padding:"5px 8px",fontFamily:F,fontSize:12,fontWeight:700,color:S.tx}}>{f.name}</td>
          <td style={{padding:"5px 8px"}}><button onClick={()=>addBet(f.sport,f.name,"futures",f.price)} style={{fontFamily:F,fontSize:14,fontWeight:800,color:f.price>0?S.gn:S.yl,background:"transparent",border:"1px solid transparent",borderRadius:4,padding:"2px 8px",cursor:"pointer"}} onMouseEnter={e=>{e.target.style.background=S.yl+"12";e.target.style.borderColor=S.yl+"30";}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.borderColor="transparent";}}>{fo(f.price)}</button></td>
          <td style={{padding:"5px 8px",fontFamily:F,fontSize:9,color:S.dm}}>{f.book}</td>
        </tr>)}</tbody></table></Card>}</>
    :games.length===0?<Emp t="No player props available right now" ic="🎯"/>:
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:10}}>{games.map((g,gi)=>{
      const bk=g.bookmakers?.[0];if(!bk)return null;const props=bk.markets||[];if(props.length===0)return null;
      const gn=(g.away_team||"").split(" ").pop()+" @ "+(g.home_team||"").split(" ").pop();
      return<Card key={g.id||gi}><div style={{height:3,background:S.yl+"60"}}/><div style={{padding:"10px 12px"}}>
        <div style={{fontFamily:F,fontSize:12,fontWeight:800,color:S.tx,marginBottom:2}}>{g.away_team} @ {g.home_team}</div>
        <div style={{fontFamily:F,fontSize:9,color:S.dm,marginBottom:8}}>{new Date(g.commence_time).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})} · {bk.title}</div>
        {props.map((mk,mi)=><div key={mi} style={{marginBottom:10}}>
          <div style={{fontFamily:F,fontSize:9,fontWeight:700,color:S.pp,marginBottom:4,padding:"2px 6px",background:S.pp+"10",borderRadius:4,display:"inline-block"}}>{fmtMkt(mk.key)}</div>
          {(mk.outcomes||[]).slice(0,8).map((o,oi)=><div key={oi} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:"1px solid "+S.bd+"15"}}>
            <div style={{fontFamily:F,fontSize:11,color:S.tx,flex:1}}>{o.description||o.name} {o.point!=null&&<span style={{color:S.dm,fontSize:9}}>{o.name} {o.point}</span>}</div>
            <button onClick={()=>addBet(gn,(o.description||"")+" "+(o.name||""),fmtMkt(mk.key),o.price)} style={{fontFamily:F,fontSize:13,fontWeight:700,color:S.yl,background:"transparent",border:"1px solid transparent",borderRadius:4,padding:"1px 8px",cursor:"pointer",flexShrink:0}} onMouseEnter={e=>{e.target.style.background=S.yl+"12";e.target.style.borderColor=S.yl+"30";}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.borderColor="transparent";}}>{fo(o.price)}</button>
          </div>)}
        </div>)}
        <div style={{fontFamily:F,fontSize:9,color:S.dm,marginTop:4}}>{props.length} prop markets available</div>
      </div></Card>;})}</div>}</div>;
}

// ═══ ODDS COMPARISON (Multiple Books) ═══
function OddsCompare(){
  const[games,setGames]=useState([]);const[ld,setLd]=useState(true);const[sport,setSport]=useState("nfl");
  useEffect(()=>{setLd(true);const sp=sport==="nfl"?"americanfootball_nfl":sport==="cfb"?"americanfootball_ncaaf":"basketball_ncaab";
    fetch(`https://api.the-odds-api.com/v4/sports/${sp}/odds/?apiKey=${OK}&regions=us&markets=h2h,spreads,totals&oddsFormat=american&bookmakers=draftkings,fanduel,betmgm,caesars,pointsbet`).then(r=>r.ok?r.json():[]).then(d=>{setGames(d||[]);setLd(false);}).catch(()=>setLd(false));
  },[sport]);
  const bkColors={draftkings:"#53d769",fanduel:"#1493ff",betmgm:"#c8a96e",caesars:"#00833e",pointsbet:"#e44d2e"};
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>📊 Odds Comparison</h2>
    <p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 12px"}}>Compare lines across sportsbooks — find the best value</p>
    <div style={{display:"flex",gap:4,marginBottom:14}}>{[["nfl","🏈 NFL"],["cfb","🏈 CFB"],["cbb","🏀 CBB"]].map(([k,l])=><Pill key={k} l={l} a={sport===k} c={S.pp} onClick={()=>setSport(k)}/>)}</div>
    {ld?<Spin t="Loading odds from books..."/>:games.length===0?<Emp t="No odds available right now" ic="📊"/>:
    games.map((g,gi)=>{const gn=(g.away_team||"").split(" ").pop()+" vs "+(g.home_team||"").split(" ").pop();const books=g.bookmakers||[];
      return<Card key={g.id||gi} style={{marginBottom:12}}><div style={{height:3,background:S.pp+"50"}}/><div style={{padding:"12px 14px"}}>
        <div style={{fontFamily:F,fontSize:13,fontWeight:800,color:S.tx,marginBottom:2}}>{g.away_team} @ {g.home_team}</div>
        <div style={{fontFamily:F,fontSize:9,color:S.dm,marginBottom:10}}>{new Date(g.commence_time).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div>
        <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:400}}><thead><tr style={{background:S.sf}}>
          <th style={{padding:"5px 8px",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,textAlign:"left",borderBottom:"1px solid "+S.bd}}>BOOK</th>
          <th style={{padding:"5px 8px",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,textAlign:"center",borderBottom:"1px solid "+S.bd}}>{(g.away_team||"").split(" ").pop()} ML</th>
          <th style={{padding:"5px 8px",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,textAlign:"center",borderBottom:"1px solid "+S.bd}}>{(g.home_team||"").split(" ").pop()} ML</th>
          <th style={{padding:"5px 8px",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,textAlign:"center",borderBottom:"1px solid "+S.bd}}>SPREAD</th>
          <th style={{padding:"5px 8px",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,textAlign:"center",borderBottom:"1px solid "+S.bd}}>TOTAL</th>
        </tr></thead><tbody>{books.map((bk,bi)=>{
          const ml=bk.markets?.find(m=>m.key==="h2h");const sp=bk.markets?.find(m=>m.key==="spreads");const tot=bk.markets?.find(m=>m.key==="totals");
          const awML=ml?.outcomes?.find(o=>o.name===g.away_team);const hmML=ml?.outcomes?.find(o=>o.name===g.home_team);
          const awSp=sp?.outcomes?.find(o=>o.name===g.away_team);const ov=tot?.outcomes?.find(o=>o.name==="Over");
          const bColor=bkColors[bk.key]||S.ac;
          // Find best ML across all books for highlighting
          const allAwML=books.map(b=>b.markets?.find(m=>m.key==="h2h")?.outcomes?.find(o=>o.name===g.away_team)?.price).filter(Boolean);
          const allHmML=books.map(b=>b.markets?.find(m=>m.key==="h2h")?.outcomes?.find(o=>o.name===g.home_team)?.price).filter(Boolean);
          const bestAw=Math.max(...allAwML);const bestHm=Math.max(...allHmML);
          return<tr key={bi} style={{borderBottom:"1px solid "+S.bd+"20"}}>
            <td style={{padding:"5px 8px"}}><div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:6,height:6,borderRadius:3,background:bColor}}/><span style={{fontFamily:F,fontSize:10,fontWeight:700,color:S.tx}}>{(bk.title||bk.key||"").replace("_"," ")}</span></div></td>
            <td style={{padding:"5px 8px",textAlign:"center",fontFamily:F,fontSize:12,fontWeight:700,color:awML?.price===bestAw?S.gn:S.sub}}>{awML?fo(awML.price):"—"}</td>
            <td style={{padding:"5px 8px",textAlign:"center",fontFamily:F,fontSize:12,fontWeight:700,color:hmML?.price===bestHm?S.gn:S.sub}}>{hmML?fo(hmML.price):"—"}</td>
            <td style={{padding:"5px 8px",textAlign:"center",fontFamily:F,fontSize:11,color:S.ac}}>{awSp?(awSp.point>0?"+":"")+awSp.point:"—"}</td>
            <td style={{padding:"5px 8px",textAlign:"center",fontFamily:F,fontSize:11,color:S.or}}>{ov?"O/U "+ov.point:"—"}</td>
          </tr>;})}</tbody></table></div>
      </div></Card>;})}</div>;
}
function useFavs(){
  const[f,sF]=useState([...window._ghqFav]);
  const vRef=useRef(window._ghqFavV);
  useEffect(()=>{const i=setInterval(()=>{if(window._ghqFavV!==vRef.current){vRef.current=window._ghqFavV;sF([...window._ghqFav]);}},200);return()=>clearInterval(i);},[]);
  const toggle=(team)=>{
    // team: {abbr, name, sport, logo, eid}
    const idx=window._ghqFav.findIndex(x=>x.abbr===team.abbr&&x.sport===team.sport);
    if(idx>=0)window._ghqFav.splice(idx,1);else window._ghqFav.push(team);
    window._ghqFavV++;sF([...window._ghqFav]);
  };
  const isFav=(abbr,sport)=>window._ghqFav.some(x=>x.abbr===abbr&&x.sport===sport);
  return{favs:f,toggle,isFav};
}



// ═══ NFL DRAFT ═══
function NFLDraft(){
  const[picks,setPicks]=useState([]);const[ld,setLd]=useState(true);const[yr,setYr]=useState(2025);const[rd,setRd]=useState(0);
  useEffect(()=>{setLd(true);
    ef(`${E.nfl}/draft?season=${yr}`).then(d=>{
      const allPicks=[];
      (d?.rounds||[]).forEach((round,ri)=>{(round.picks||[]).forEach(p=>{
        allPicks.push({round:ri+1,pick:p.overall||p.pickNumber,name:p.athlete?.displayName||"TBD",pos:p.athlete?.position?.abbreviation||"",
          college:p.athlete?.college?.name||p.athlete?.college?.shortName||"",
          team:p.team?.abbreviation||"",teamLogo:p.team?.logo||"",teamColor:p.team?.color?"#"+p.team.color:S.ac,
          img:p.athlete?.headshot?.href||null,analysis:p.analysis||""});});});
      if(allPicks.length===0){
        // Try Sleeper draft data as fallback
        fetch("https://api.sleeper.app/v1/draft/nfl/"+yr).then(r=>r.ok?r.json():null).then(sd=>{
          if(sd&&Array.isArray(sd)){sd.forEach((p,i)=>{allPicks.push({round:p.round||Math.floor(i/32)+1,pick:i+1,name:(p.metadata?.first_name||"")+" "+(p.metadata?.last_name||"TBD"),pos:p.metadata?.position||"",college:p.metadata?.college||"",team:p.metadata?.team||"",teamLogo:"",teamColor:S.ac,img:null,analysis:""});});}
          setPicks(allPicks);setLd(false);}).catch(()=>{setPicks(allPicks);setLd(false);});
      } else{setPicks(allPicks);setLd(false);}
    }).catch(()=>setLd(false));
  },[yr]);
  const filt=rd===0?picks:picks.filter(p=>p.round===rd);
  const rounds=[...new Set(picks.map(p=>p.round))].sort((a,b)=>a-b);
  return<div><h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>🏈 NFL Draft</h2>
    <p style={{fontFamily:F,fontSize:11,color:S.dm,margin:"0 0 12px"}}>Draft picks and results</p>
    <div style={{display:"flex",gap:4,marginBottom:8}}>{[2025,2024,2023,2022].map(y=><Pill key={y} l={String(y)} a={yr===y} c={S.ac} onClick={()=>setYr(y)}/>)}</div>
    <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:14}}><Pill l="All Rounds" a={rd===0} c={S.gn} onClick={()=>setRd(0)} sm/>{rounds.map(r=><Pill key={r} l={"Rd "+r} a={rd===r} c={S.gn} onClick={()=>setRd(r)} sm/>)}</div>
    {ld?<Spin t={"Loading "+yr+" draft..."}/>:filt.length===0?<Emp t={"No draft data for "+yr} ic="🏈"/>:
    <Card style={{overflow:"auto",maxHeight:700}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:S.sf}}>{["PK","","PLAYER","POS","COLLEGE","TEAM"].map(h=><th key={h} style={{padding:"6px 8px",fontFamily:F,fontSize:9,fontWeight:700,color:S.dm,textAlign:"left",borderBottom:"1px solid "+S.bd,position:"sticky",top:0,background:S.sf}}>{h}</th>)}</tr></thead>
      <tbody>{filt.map((p,i)=>{const isRd1=p.round===1;return<tr key={i} style={{borderBottom:"1px solid "+S.bd+"20",background:isRd1&&p.pick<=10?S.yl+"06":"transparent"}}>
        <td style={{padding:"5px 8px"}}><div style={{fontFamily:F,fontSize:isRd1?14:11,fontWeight:800,color:isRd1&&p.pick<=3?S.yl:isRd1?S.ac:S.dm}}>{p.pick}</div><div style={{fontFamily:F,fontSize:8,color:S.dm}}>R{p.round}</div></td>
        <td style={{padding:"4px 6px",width:34}}>{p.img?<img src={p.img} alt="" style={{width:30,height:30,borderRadius:6,objectFit:"cover",background:S.sf}} onError={e=>{e.target.style.display="none"}}/>:p.teamLogo?<img src={p.teamLogo} alt="" style={{width:24,height:24}} onError={e=>{e.target.style.display="none"}}/>:<div style={{width:30,height:30,borderRadius:6,background:S.sf}}/>}</td>
        <td style={{padding:"5px 8px",fontFamily:F,fontSize:12,fontWeight:700,color:S.tx}}>{p.name}</td>
        <td style={{padding:"5px 8px"}}><Badge p={p.pos}/></td>
        <td style={{padding:"5px 8px",fontFamily:F,fontSize:10,color:S.dm}}>{p.college}</td>
        <td style={{padding:"5px 8px"}}><div style={{display:"flex",alignItems:"center",gap:4}}>{p.teamLogo&&<img src={p.teamLogo} alt="" style={{width:16,height:16}} onError={e=>{e.target.style.display="none"}}/>}<span style={{fontFamily:F,fontSize:11,fontWeight:700,color:p.teamColor}}>{p.team}</span></div></td>
      </tr>;})}</tbody></table></Card>}</div>;
}


// ═══ SPORTSBOOK PROMOS — monetization ═══
function Promos(){
  const books=[
    {name:"DraftKings",bonus:"Bet $5, Get $150 in Bonus Bets",color:"#53d337",url:"https://www.draftkings.com"},
    {name:"FanDuel",bonus:"Bet $5, Get $200 in Bonus Bets",color:"#1493ff",url:"https://www.fanduel.com"},
    {name:"BetMGM",bonus:"Up to $1,500 in Bonus Bets",color:"#b8966c",url:"https://www.betmgm.com"},
    {name:"Caesars",bonus:"$1,000 First Bet on Caesars",color:"#1a4731",url:"https://www.caesars.com/sportsbook-and-casino"},
    {name:"ESPN BET",bonus:"Bet $10, Get $150 in Bonus Bets",color:"#d00",url:"https://www.espnbet.com"},
    {name:"Fanatics",bonus:"Get Up To $1,000 in Bonus Bets",color:"#1d1160",url:"https://sportsbook.fanatics.com"}
  ];
  return<div>
    <h2 style={{fontFamily:F,fontSize:18,fontWeight:800,color:S.tx,margin:"0 0 4px"}}>🎁 Sportsbook Promos</h2>
    <p style={{fontFamily:F,fontSize:10,color:S.dm,margin:"0 0 12px"}}>New user sign-up bonuses — support GameDay by signing up through our links</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(280px,100%),1fr))",gap:8}}>
      {books.map(b=><Card key={b.name} hover><div style={{padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:44,height:44,borderRadius:10,background:b.color,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F,fontSize:14,fontWeight:900,color:"#fff",flexShrink:0}}>{b.name[0]}{b.name[1]}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:F,fontSize:13,fontWeight:800,color:S.tx}}>{b.name}</div>
          <div style={{fontFamily:F,fontSize:11,color:S.gn,fontWeight:600,marginTop:2}}>{b.bonus}</div>
          <div style={{fontFamily:F,fontSize:9,color:S.dm,marginTop:3}}>21+ | Terms apply | Gambling problem? Call 1-800-GAMBLER</div>
        </div>
        <div style={{background:b.color,borderRadius:6,padding:"6px 10px",fontFamily:F,fontSize:10,fontWeight:700,color:"#fff",cursor:"pointer",flexShrink:0}}>CLAIM</div>
      </div></Card>)}
    </div>
    <Card style={{marginTop:12,padding:14}}>
      <div style={{fontFamily:F,fontSize:12,fontWeight:700,color:S.yl,marginBottom:6}}>💰 Support GameDay</div>
      <div style={{fontFamily:F,fontSize:11,color:S.dm,lineHeight:1.5}}>GameDay is free to use. When you sign up for a sportsbook through our links, we earn a referral bonus at no extra cost to you. This helps us keep building new features and keeping the app free.</div>
    </Card>
  </div>;
}

// ═══ MAIN APP ═══
const TABS=[
  {id:"sc",i:"🏈",l:"Scores",g:"NFL"},{id:"st",i:"📊",l:"Standings",g:"NFL"},{id:"ro",i:"👥",l:"Rosters",g:"NFL"},{id:"stat",i:"📈",l:"Stats",g:"NFL"},{id:"tp",i:"🏟️",l:"Teams",g:"NFL"},{id:"h2h",i:"⚔️",l:"H2H",g:"NFL"},{id:"ndr",i:"📝",l:"Draft",g:"NFL"},
  {id:"nbsc",i:"🏀",l:"Scores",g:"NBA"},{id:"nbst",i:"📊",l:"Standings",g:"NBA"},{id:"nbro",i:"👥",l:"Rosters",g:"NBA"},{id:"nbsa",i:"📈",l:"Stats",g:"NBA"},
  {id:"mlsc",i:"⚾",l:"Scores",g:"MLB"},{id:"mlst",i:"📊",l:"Standings",g:"MLB"},{id:"mlro",i:"👥",l:"Rosters",g:"MLB"},{id:"mlsa",i:"📈",l:"Stats",g:"MLB"},
  {id:"hlsc",i:"🏒",l:"Scores",g:"NHL"},{id:"hlst",i:"📊",l:"Standings",g:"NHL"},{id:"hlro",i:"👥",l:"Rosters",g:"NHL"},{id:"hlsa",i:"📈",l:"Stats",g:"NHL"},
  {id:"csc",i:"🏈",l:"Scores",g:"CFB"},{id:"crk",i:"🏆",l:"Rankings",g:"CFB"},{id:"cro",i:"📋",l:"Rosters",g:"CFB"},{id:"cst",i:"📈",l:"Stats",g:"CFB"},
  {id:"bsc",i:"🏀",l:"Scores",g:"CBB"},{id:"brk",i:"🏆",l:"Rankings",g:"CBB"},{id:"bro",i:"📋",l:"Rosters",g:"CBB"},{id:"bst",i:"📈",l:"Stats",g:"CBB"},
  {id:"fan",i:"⚡",l:"Fantasy",g:"FAN"},{id:"trn",i:"🔥",l:"Waivers",g:"FAN"},{id:"drft",i:"📋",l:"Draft",g:"FAN"},{id:"trd",i:"⚖️",l:"Trade",g:"FAN"},{id:"cmp",i:"🔄",l:"Compare",g:"FAN"},
  {id:"bet",i:"💰",l:"Betting",g:"ODDS"},{id:"par",i:"🎯",l:"Parlay",g:"ODDS"},{id:"prop",i:"🎲",l:"Props",g:"ODDS"},{id:"ocp",i:"📊",l:"Compare",g:"ODDS"},
  {id:"inj",i:"🏥",l:"Injuries",g:"MORE"},{id:"nw",i:"📰",l:"News",g:"MORE"}
];
const GS=["NFL","NBA","MLB","NHL","CFB","CBB","FAN","ODDS","MORE"];
function GCol(){return{NFL:S.gn,NBA:S.pp,MLB:S.rd,NHL:S.tl,CFB:S.ac,CBB:S.or,FAN:"#14b8a6",ODDS:S.yl,MORE:S.pk};}

export default function App(){
  const[splash,setSplash]=useState(true);const[sport,setSport]=useState("NFL");const[sub,setSub]=useState("sc");const[srchP,setSrchP]=useState(null);const[theme,setTheme]=useState(window._ghqTheme||"dark");const[srchOpen,setSrchOpen]=useState(false);
  const{favs}=useFavs();
  const toggleTheme=()=>{const n=theme==="dark"?"light":"dark";setTheme(n);window._ghqTheme=n;};
  Object.assign(S, theme==="dark"?SD:SL);
  const sportTabs={
    NFL:[{id:"sc",i:"🏈",l:"Scores"},{id:"st",i:"📊",l:"Standings"},{id:"ro",i:"👥",l:"Rosters"},{id:"stat",i:"📈",l:"Stats"},{id:"tp",i:"🏟",l:"Teams"},{id:"h2h",i:"⚔️",l:"H2H"},{id:"ndr",i:"📝",l:"Draft"}],
    NBA:[{id:"nbsc",i:"🏀",l:"Scores"},{id:"nbst",i:"📊",l:"Standings"},{id:"nbro",i:"👥",l:"Rosters"},{id:"nbsa",i:"📈",l:"Stats"},{id:"nbh2h",i:"⚔️",l:"H2H"}],
    MLB:[{id:"mlsc",i:"⚾",l:"Scores"},{id:"mlst",i:"📊",l:"Standings"},{id:"mlro",i:"👥",l:"Rosters"},{id:"mlsa",i:"📈",l:"Stats"},{id:"mlh2h",i:"⚔️",l:"H2H"}],
    NHL:[{id:"hlsc",i:"🏒",l:"Scores"},{id:"hlst",i:"📊",l:"Standings"},{id:"hlro",i:"👥",l:"Rosters"},{id:"hlsa",i:"📈",l:"Stats"},{id:"hlh2h",i:"⚔️",l:"H2H"}],
    CFB:[{id:"csc",i:"🏈",l:"Scores"},{id:"crk",i:"🏆",l:"Rankings"},{id:"cro",i:"📋",l:"Rosters"},{id:"cst",i:"📈",l:"Stats"}],
    CBB:[{id:"bsc",i:"🏀",l:"Scores"},{id:"brk",i:"🏆",l:"Rankings"},{id:"bro",i:"📋",l:"Rosters"},{id:"bst",i:"📈",l:"Stats"}],
    LAX:[{id:"lxsc",i:"🥍",l:"Scores"},{id:"lxrk",i:"🏆",l:"Rankings"},{id:"lxro",i:"📋",l:"Rosters"},{id:"lxst",i:"📈",l:"Stats"}],
    FAN:[{id:"fan",i:"⚡",l:"Fantasy"},{id:"trn",i:"🔥",l:"Waivers"},{id:"drft",i:"📋",l:"Draft"},{id:"trd",i:"⚖️",l:"Trade"},{id:"cmp",i:"🔄",l:"Compare"}],
    ODDS:[{id:"bet",i:"💰",l:"Betting"},{id:"par",i:"🎯",l:"Parlay"},{id:"prop",i:"🎲",l:"Props"},{id:"ocp",i:"📊",l:"Compare"}],
    MORE:[{id:"inj",i:"🏥",l:"Injuries"},{id:"nw",i:"📰",l:"News"},{id:"promo",i:"🎁",l:"Promos"}]
  };
  const sportIcons={NFL:"🏈",NBA:"🏀",MLB:"⚾",NHL:"🏒",CFB:"🏈",CBB:"🏀",LAX:"🥍",FAN:"⚡",ODDS:"💰",MORE:"📰"};
  const sportColors={NFL:S.gn,NBA:S.pp,MLB:S.rd,NHL:S.tl,CFB:S.ac,CBB:S.or,LAX:"#7c3aed",FAN:"#14b8a6",ODDS:S.yl,MORE:S.pk};
  const currentSubs=sportTabs[sport]||[];
  const currentColor=sportColors[sport]||S.ac;
  useEffect(()=>{const t=setTimeout(()=>setSplash(false),2000);return()=>clearTimeout(t);},[]);
  const switchSport=(s)=>{setSport(s);const first=sportTabs[s]?.[0];if(first)setSub(first.id);};
  if(splash)return<div style={{position:"fixed",inset:0,background:"#0a0f1a",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:9999}}>
    <div style={{animation:"logoIn 1.5s ease-in-out"}}><Logo size={80}/></div>
    <div style={{fontFamily:"'Inter',sans-serif",fontSize:28,fontWeight:900,color:"#fff",marginTop:16,letterSpacing:-1}}>GameDay</div>
    <div style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"#10b981",marginTop:6,letterSpacing:2,fontWeight:600}}>EVERY SPORT · EVERY SCORE · EVERY EDGE</div>
    <style>{"@keyframes logoIn{0%{transform:scale(0) rotate(-180deg);opacity:0}60%{transform:scale(1.1) rotate(10deg);opacity:1}100%{transform:scale(1) rotate(0deg);opacity:1}}"}</style>
  </div>;
  return<><style key={theme}>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}body{background:${S.bg};color:${S.tx};overflow-x:hidden}::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:${S.bg}}::-webkit-scrollbar-thumb{background:${S.bd};border-radius:3px}button{font-family:${F}}input{font-family:${F}}`}</style>
    <header style={{background:S.bg+"ee",backdropFilter:"blur(12px)",borderBottom:"1px solid "+S.bd,position:"sticky",top:0,zIndex:200}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 12px"}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <Logo size={28}/>
          <div style={{fontFamily:F,fontSize:15,fontWeight:900,color:S.tx,letterSpacing:-.3}}>GameDay</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <button onClick={toggleTheme} style={{background:S.sf,border:"1px solid "+S.bd,borderRadius:7,padding:"4px 8px",cursor:"pointer",fontSize:11}}>{theme==="dark"?"☀️":"🌙"}</button>
          <button onClick={()=>setSrchOpen(!srchOpen)} style={{background:srchOpen?S.ac+"20":S.sf,border:"1px solid "+(srchOpen?S.ac+"50":S.bd),borderRadius:7,padding:"4px 8px",cursor:"pointer",fontSize:11}}>🔍</button>
        </div>
      </div>
      {srchOpen&&<div style={{padding:"0 12px 8px"}}><SearchBar onSelect={r=>{if(r.type==="player"&&r.id){setSrchP(r);setSrchOpen(false);}}} /></div>}
      <div style={{display:"flex",overflowX:"auto",padding:"0 6px",gap:1,borderTop:"1px solid "+S.bd}}>
        {Object.keys(sportTabs).map(s=><button key={s} onClick={()=>switchSport(s)} style={{padding:"7px 10px",fontSize:10,fontWeight:sport===s?800:500,cursor:"pointer",border:"none",borderBottom:"2px solid "+(sport===s?sportColors[s]:"transparent"),background:sport===s?sportColors[s]+"0c":"transparent",color:sport===s?S.tx:S.dm,whiteSpace:"nowrap",transition:"all .15s",flexShrink:0}}>{sportIcons[s]} {s}</button>)}
      </div>
      <div style={{display:"flex",overflowX:"auto",padding:"0 6px",gap:1,borderTop:"1px solid "+S.bd+"60",background:S.sf+"30"}}>
        {currentSubs.map(t=><button key={t.id} onClick={()=>setSub(t.id)} style={{padding:"6px 10px",fontSize:10,fontWeight:sub===t.id?700:400,cursor:"pointer",border:"none",borderBottom:"2px solid "+(sub===t.id?currentColor:"transparent"),background:"transparent",color:sub===t.id?S.tx:S.dm,whiteSpace:"nowrap",transition:"all .15s",flexShrink:0}}>{t.i} {t.l}</button>)}
      </div>
    </header>
    {favs.length>0&&<div style={{background:S.sf,borderBottom:"1px solid "+S.bd,padding:"5px 10px",display:"flex",alignItems:"center",gap:5,overflowX:"auto"}}>
      <span style={{fontFamily:F,fontSize:8,fontWeight:700,color:S.yl,flexShrink:0}}>⭐</span>
      {favs.map((f,i)=><button key={f.abbr+f.sport+i} onClick={()=>{
        const sm={nfl:"NFL",nba:"NBA",mlb:"MLB",nhl:"NHL",cfb:"CFB",cbb:"CBB",clx:"LAX"};const st={nfl:"sc",nba:"nbsc",mlb:"mlsc",nhl:"hlsc",cfb:"csc",cbb:"bsc",clx:"lxsc"};
        setSport(sm[f.sport]||"NFL");setSub(st[f.sport]||"sc");
      }} style={{display:"flex",alignItems:"center",gap:3,padding:"2px 6px",background:S.cd,border:"1px solid "+S.bd,borderRadius:5,cursor:"pointer",flexShrink:0}}>
        {f.logo&&<img src={f.logo} alt="" style={{width:14,height:14,objectFit:"contain"}} onError={e=>{e.target.style.display="none"}}/>}
        <span style={{fontFamily:F,fontSize:9,fontWeight:700,color:S.tx}}>{f.abbr}</span>
      </button>)}
    </div>}
    <main className="gd-main" style={{padding:"16px 14px",maxWidth:1440,margin:"0 auto"}}>
      {sub==="sc"&&<Scores sport="nfl" title="NFL Scores" yearRange={[2025,2024,2023,2022]} defYear={2025} hasWeeks weekCount={18} color={S.gn}/>}
      {sub==="st"&&<Standings sport="nfl"/>}
      {sub==="ro"&&<Rosters title="NFL Rosters" teams={NFL} sport="nfl" nf="f" cf="cl" lf={t=>nL(t.a)}/>}
      {sub==="stat"&&<Stats sport="nfl" title="NFL Stat Leaders" color={S.gn}/>}
      {sub==="tp"&&<TeamPage/>}
      {sub==="fan"&&<Fantasy/>}
      {sub==="csc"&&<Scores sport="cfb" title="CFB Scores" yearRange={[2025,2024,2023,2022]} defYear={2025} hasWeeks weekCount={15} color={S.ac} extra="groups=80" showConf/>}
      {sub==="crk"&&<Rankings title="CFB Rankings" sport="cfb" yearRange={[2025,2024,2023,2022]} defYear={2025} color={S.gn} mw={16} defWk={14}/>}
      {sub==="cro"&&<Rosters title="CFB Rosters" teams={CFB} sport="cfb" nf="n" cf="cl" lf={t=>cL(t.eid)}/>}
      {sub==="cst"&&<Stats sport="cfb" title="CFB Stat Leaders" color={S.ac}/>}
      {sub==="bsc"&&<Scores sport="cbb" title="CBB Scores" yearRange={[2026,2025,2024,2023]} defYear={2025} color={S.or} showConf/>}
      {sub==="brk"&&<Rankings title="CBB Rankings" sport="cbb" yearRange={[2026,2025,2024,2023]} defYear={2025} color={S.or} mw={20} defWk={16}/>}
      {sub==="bro"&&<Rosters title="CBB Rosters" teams={CBB} sport="cbb" nf="n" cf="cl" lf={t=>cL(t.eid)}/>}
      {sub==="bst"&&<Stats sport="cbb" title="CBB Stat Leaders" color={S.or}/>}
      {sub==="lxsc"&&<Scores sport="clx" title="🥍 Lacrosse Scores" yearRange={[2026,2025,2024,2023]} defYear={2025} color={"#7c3aed"}/>}
      {sub==="lxrk"&&<Rankings title="🥍 Lacrosse Rankings" sport="clx" yearRange={[2026,2025,2024,2023]} defYear={2025} color={"#7c3aed"} mw={18} defWk={14}/>}
      {sub==="lxro"&&<Rosters title="🥍 Lacrosse Rosters" teams={CLX} sport="clx" nf="n" cf="cl" lf={t=>cL(t.eid)}/>}
      {sub==="lxst"&&<Stats sport="clx" title="🥍 Lacrosse Stat Leaders" color={"#7c3aed"}/>}
      {sub==="nbsc"&&<Scores sport="nba" title="NBA Scores" yearRange={[2026,2025,2024,2023]} defYear={2025} color={S.pp}/>}
      {sub==="nbst"&&<Standings sport="nba"/>}
      {sub==="nbro"&&<Rosters title="NBA Rosters" teams={NBA} sport="nba" nf="f" cf="cl" lf={t=>nbL(t.eid)}/>}
      {sub==="nbsa"&&<Stats sport="nba" title="NBA Stat Leaders" color={S.pp}/>}
      {sub==="mlsc"&&<Scores sport="mlb" title="MLB Scores" yearRange={[2025,2024,2023,2022]} defYear={2025} color={S.rd}/>}
      {sub==="mlst"&&<Standings sport="mlb"/>}
      {sub==="mlro"&&<Rosters title="MLB Rosters" teams={MLB} sport="mlb" nf="f" cf="cl" lf={t=>mlL(t.eid)}/>}
      {sub==="mlsa"&&<Stats sport="mlb" title="MLB Stat Leaders" color={S.rd}/>}
      {sub==="hlsc"&&<Scores sport="nhl" title="NHL Scores" yearRange={[2026,2025,2024,2023]} defYear={2025} color={S.tl}/>}
      {sub==="hlst"&&<Standings sport="nhl"/>}
      {sub==="hlro"&&<Rosters title="NHL Rosters" teams={NHL} sport="nhl" nf="f" cf="cl" lf={t=>nhL(t.eid)}/>}
      {sub==="hlsa"&&<Stats sport="nhl" title="NHL Stat Leaders" color={S.tl}/>}
      {sub==="ndr"&&<NFLDraft/>}
      {sub==="nbh2h"&&<H2H/>}
      {sub==="mlh2h"&&<H2H/>}
      {sub==="hlh2h"&&<H2H/>}
      {sub==="bet"&&<Betting/>}
      {sub==="par"&&<ParlayBuilder/>}
      {sub==="prop"&&<PropBets/>}
      {sub==="ocp"&&<OddsCompare/>}
      {sub==="h2h"&&<H2H/>}
      {sub==="trn"&&<Trending/>}
      {sub==="drft"&&<DraftBoard/>}
      {sub==="trd"&&<TradeAnalyzer/>}
      {sub==="cmp"&&<PlayerCompare/>}
      {sub==="inj"&&<Injuries/>}
      {sub==="nw"&&<News/>}
      {sub==="promo"&&<Promos/>}
    </main>
    {srchP&&<PM pid={srchP.id} info={srchP} sport={srchP.sport||"nfl"} onClose={()=>setSrchP(null)}/>}
  </>;
}
