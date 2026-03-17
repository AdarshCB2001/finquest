/* ── DATA CONSTANTS ───────────────────────────────────── */
const LEVELS=[
  {name:'Shishya',min:0,max:500},{name:'Vyapari',min:500,max:1200},
  {name:'Sanchayak',min:1200,max:2500},{name:'Arthik',min:2500,max:5000},
  {name:'Dhanvaan',min:5000,max:10000},{name:'Kuber',min:10000,max:Infinity}
];
const CATS={
  food:{icon:'🍛',color:'#FF6B00',bg:'#FFF3E8'},
  transport:{icon:'🚌',color:'#0050A0',bg:'#E8F0FB'},
  shopping:{icon:'🛒',color:'#8E24AA',bg:'#F3E5F5'},
  entertainment:{icon:'🎬',color:'#E53935',bg:'#FFEBEE'},
  bills:{icon:'💡',color:'#F9A825',bg:'#FFFDE7'},
  health:{icon:'🏥',color:'#00897B',bg:'#E0F2F1'},
  education:{icon:'📚',color:'#1565C0',bg:'#E3F2FD'},
  investment:{icon:'📈',color:'#2E7D32',bg:'#E8F5E9'},
  income:{icon:'💰',color:'#138808',bg:'#E8F5E9'},
  other:{icon:'📦',color:'#546E7A',bg:'#ECEFF1'}
};
const TM_TYPES={bank:'Bank account',cash:'Cash wallet',credit:'Credit card',upi:'UPI wallet',savings:'Savings',invest:'Investment'};

/* ── BUILDING SYSTEM ──────────────────────────────────── */
const BUILDING_CATS={
  house:    {icon:'🏠',color:'#E65100',bg:'#FFF3E8',label:'House',       desc:'Personal savings goals (car, trip, gadget, wedding, etc.)'},
  apartment:{icon:'🏢',color:'#1565C0',bg:'#E3F2FD',label:'Apartment',   desc:'SIPs, mutual funds, stocks, gold, crypto, bonds, PPF etc.'},
  school:   {icon:'🏫',color:'#6A1B9A',bg:'#F3E5F5',label:'School',      desc:'Education investments — courses, certificates, college fees, coaching'},
  hospital: {icon:'🏥',color:'#00897B',bg:'#E0F2F1',label:'Hospital',    desc:'Medical expenses — doctor, surgery, medicine, insurance, therapy'},
  gym:      {icon:'🏋️',color:'#2E7D32',bg:'#E8F5E9',label:'Gym',         desc:'Health & fitness — gym memberships, sports gear, yoga, fitness apps'},
  restaurant:{icon:'🍽️',color:'#FF6B00',bg:'#FFF3E8',label:'Restaurant', desc:'Food & dining expenses — eating out, Swiggy, Zomato, cafes'},
  mall:     {icon:'🛍️',color:'#8E24AA',bg:'#F3E5F5',label:'Mall',        desc:'Lifestyle & retail — clothes, electronics, subscriptions, impulse buys'},
  bank:     {icon:'🏦',color:'#D4AF37',bg:'#FFFDE7',label:'Bank',         desc:'Emergency fund, FDs, liquid savings — your financial security tower'},
};

/* Tier thresholds and names */
const BUILDING_TIERS=[
  {min:0,       max:4999,   name:'Empty Plot', emoji:'🟫', height:20},
  {min:5000,    max:9999,   name:'Hut',        emoji:'🛖', height:36},
  {min:10000,   max:24999,  name:'Basic House',emoji:'🏚️', height:52},
  {min:25000,   max:49999,  name:'House',      emoji:'🏠', height:68},
  {min:50000,   max:99999,  name:'Bungalow',   emoji:'🏡', height:86},
  {min:100000,  max:499999, name:'Villa',      emoji:'🏘️', height:106},
  {min:500000,  max:Infinity,name:'Mansion',   emoji:'🏰', height:130},
];

const CITY_LEVELS=[
  {name:'Empty Land',min:0},
  {name:'Village',min:1},
  {name:'Town',min:5},
  {name:'City',min:10},
  {name:'Metropolis',min:20},
  {name:'Megacity',min:35},
];

function getBuildingTier(amount){
  for(let i=BUILDING_TIERS.length-1;i>=0;i--)
    if(amount>=BUILDING_TIERS[i].min)return{tierIdx:i,...BUILDING_TIERS[i]};
  return{tierIdx:0,...BUILDING_TIERS[0]};
}
function getNextTier(amount){
  const t=getBuildingTier(amount);
  return t.tierIdx<BUILDING_TIERS.length-1?BUILDING_TIERS[t.tierIdx+1]:null;
}
function getCityLevel(count){
  for(let i=CITY_LEVELS.length-1;i>=0;i--)
    if(count>=CITY_LEVELS[i].min)return CITY_LEVELS[i];
  return CITY_LEVELS[0];
}

const BADGES_DEF=[
  {id:'first_tx',icon:'🌱',name:'First step',desc:'Log first transaction'},
  {id:'scan_1',icon:'📷',name:'Scanner',desc:'Scan first invoice'},
  {id:'first_building',icon:'🏗️',name:'First brick',desc:'Build your first building'},
  {id:'building_5',icon:'🏘️',name:'Neighbourhood',desc:'Have 5 buildings'},
  {id:'building_upgrade',icon:'⬆️',name:'Level up!',desc:'Upgrade any building once'},
  {id:'mansion',icon:'🏰',name:'Mansion owner',desc:'Reach Mansion tier'},
  {id:'city_level',icon:'🏙️',name:'City builder',desc:'Reach City level (10 buildings)'},
  {id:'first_tm',icon:'🏦',name:'First account',desc:'Add a teammate'},
  {id:'team_3',icon:'👥',name:'Full team',desc:'Add 3 teammates'},
  {id:'streak_7',icon:'🔥',name:'Week warrior',desc:'7-day streak'},
  {id:'streak_30',icon:'⚡',name:'Month master',desc:'30-day streak'},
  {id:'save_10k',icon:'💎',name:'Lakhpati jr.',desc:'Save ₹10,000 net'},
  {id:'invest_1',icon:'📈',name:'Niveshak',desc:'Log an investment'},
  {id:'transfer_1',icon:'🔄',name:'Mover',desc:'Make a transfer'},
  {id:'edited_tx',icon:'✏️',name:'Corrector',desc:'Edit a transaction'},
  {id:'quests_3',icon:'🗡️',name:'Quest hero',desc:'Complete 3 quests'},
];

const QUESTS_DEF=[
  {id:'q1',icon:'📝',name:'Track ₹5,000 in expenses',xp:100,type:'spend_total',target:5000},
  {id:'q2',icon:'🔥',name:'Log 7 days in a row',xp:150,type:'streak',target:7},
  {id:'q3',icon:'📷',name:'Scan 3 invoices',xp:80,type:'scan_count',target:3},
  {id:'q4',icon:'🍛',name:'Keep food spend under ₹3,000',xp:120,type:'cat_limit',cat:'food',limit:3000},
  {id:'q5',icon:'🏗️',name:'Build your first building',xp:80,type:'buildings',target:1},
  {id:'q6',icon:'🏘️',name:'Build 5 buildings',xp:150,type:'buildings',target:5},
  {id:'q7',icon:'👥',name:'Add 2 teammates',xp:60,type:'teammates',target:2},
];

/* ── STATE ────────────────────────────────────────────── */
let S={
  xp:0, transactions:[], teammates:[], buildings:[],
  earnedBadges:[], completedQuests:[],
  streak:0, streakDays:[],
  scanCount:0,
  currentTxType:'expense', expenseMode:'manual',
  editingTxId:null, selectedBuildingCat:'house',
  fundingBuildingId:null,
  selectedTmIcon:'🏦',
  budgets:{}, recurringTx:[], hasOnboarded:false,
  txFilter:'all', recurringDismissedDate:null,
};

/* ── CHART REGISTRY ─────────────────────────────────── */
const _charts={};
function destroyChart(key){_charts[key]?.destroy();delete _charts[key];}
function createChart(key,ctx,config){destroyChart(key);_charts[key]=new Chart(ctx,config);return _charts[key];}

/* ── STORAGE / PERSISTENCE ─────────────────────────── */
const STORAGE_KEY='aq_v3';
let _persistTimer=null; // FIX #3: declare before use (was implicit global)

function persist(){
  clearTimeout(_persistTimer);
  _persistTimer=setTimeout(()=>{
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(S));}catch(e){console.warn('persist failed',e);}
  },500);
}
function hydrate(){
  try{
    const d=localStorage.getItem(STORAGE_KEY);
    if(d)S=Object.assign({},S,JSON.parse(d));
  }catch(e){console.warn('hydrate failed',e);}
}

function exportStateJSON(){
  const exportObj={
    meta:{version:1,exportedAt:nowISO()},
    state:S,
  };
  const blob=new Blob([JSON.stringify(exportObj,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download='arthquest_backup_'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
  toast('Backup exported (JSON)');
}

function mergeState(incoming){
  if(!incoming||typeof incoming !== 'object')return;
  const ins=incoming;
  const unionArr=(existing, incoming, idKey='id')=>{
    if(!Array.isArray(existing))existing=[];
    if(!Array.isArray(incoming))return existing;
    const map=new Map();
    existing.forEach(item=>{if(item&&item[idKey]!=null)map.set(item[idKey],item);});
    incoming.forEach(item=>{
      if(item&&item[idKey]!=null){
        if(map.has(item[idKey]))map.set(item[idKey],Object.assign({},map.get(item[idKey]),item));
        else map.set(item[idKey],item);
      }
    });
    return Array.from(map.values());
  };

  S.transactions=unionArr(S.transactions,ins.transactions,'id');
  S.teammates=unionArr(S.teammates,ins.teammates,'id');
  S.buildings=unionArr(S.buildings,ins.buildings,'id');
  S.recurringTx=unionArr(S.recurringTx,ins.recurringTx,'id');

  // union simple arrays
  const unionSimple=(a,b)=>Array.from(new Set([...(Array.isArray(a)?a:[]),...(Array.isArray(b)?b:[])]));
  S.streakDays=unionSimple(S.streakDays,ins.streakDays);
  S.earnedBadges=unionSimple(S.earnedBadges,ins.earnedBadges);
  S.completedQuests=unionSimple(S.completedQuests,ins.completedQuests);

  // merge scalar values conservatively
  S.xp=Math.max(S.xp||0,ins.xp||0);
  S.streak=Math.max(S.streak||0,ins.streak||0);
  S.scanCount=Math.max(S.scanCount||0,ins.scanCount||0);
  S.hasOnboarded=!!(S.hasOnboarded||ins.hasOnboarded);

  // budgets merge (incoming overrides)
  S.budgets=Object.assign({},S.budgets||{},ins.budgets||{});

  // other fields
  if(typeof ins.txFilter==='string')S.txFilter=ins.txFilter;
  if(typeof ins.recurringDismissedDate==='string')S.recurringDismissedDate=ins.recurringDismissedDate;

  toast('Data merged successfully');
  persist();
}

function importStateJSON(file){
  if(!file)return;
  const r=new FileReader();
  r.onload=()=>{
    try{
      const parsed=JSON.parse(r.result);
      const incoming=parsed.state||parsed;
      mergeState(incoming);
      renderPage(currentPage);
      checkBadges();
      renderDashboard();
    }catch(e){toast('Failed to import: '+e.message);}
  };
  r.onerror=()=>toast('Failed to read file');
  r.readAsText(file);
}

/* ── UTILS ─────────────────────────────────────────── */
const fmt=n=>'₹'+Math.round(n).toLocaleString('en-IN');
function todayStr(){return new Date().toISOString().split('T')[0];}
function nowISO(){return new Date().toISOString();}
function fmtDate(iso){return new Date(iso).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});}
function getLevel(xp){for(let i=LEVELS.length-1;i>=0;i--)if(xp>=LEVELS[i].min)return{level:i+1,...LEVELS[i]};return{level:1,...LEVELS[0]};}
function toast(msg){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2800);}
// FIX #19: collision-safe unique ID
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2);}
// FIX #20: XSS-safe HTML escaping for user-supplied strings inserted via innerHTML
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

/* ── STREAK HELPERS ──────────────────────────────── */
// FIX #6: recalculate streak from streakDays on every hydrate/render
// so gaps in logging correctly reset the count
function recalcStreak(){
  if(!S.streakDays.length){S.streak=0;return;}
  const sorted=[...new Set(S.streakDays)].sort();
  let count=1;
  const today=todayStr();
  const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
  const yStr=yesterday.toISOString().split('T')[0];
  // streak is only alive if last logged day is today or yesterday
  const last=sorted[sorted.length-1];
  if(last!==today&&last!==yStr){S.streak=0;return;}
  for(let i=sorted.length-1;i>0;i--){
    const a=new Date(sorted[i]);const b=new Date(sorted[i-1]);
    const diff=(a-b)/(864e5);
    if(Math.round(diff)===1)count++;else break;
  }
  S.streak=count;
}
function onboard(loadDemo){
  if(loadDemo)seedDemoData();
  S.hasOnboarded=true;recalcStreak();persist();
  document.getElementById('onboard-overlay').style.display='none';
  renderPage(currentPage);
}

/* ── XP & LEVEL ─────────────────────────────────── */
function addXP(n,reason){
  S.xp+=n;updateXPDisplay();
  toast('+'+n+' XP — '+reason+'!');
  checkBadges();checkQuests();persist();
}
function updateXPDisplay(){
  const lv=getLevel(S.xp);
  document.getElementById('hdr-xp').textContent=S.xp.toLocaleString('en-IN');
  document.getElementById('hdr-level').textContent='Level '+lv.level+' · '+lv.name;
  const pct=lv.max===Infinity?100:Math.min(100,Math.round(((S.xp-lv.min)/(lv.max-lv.min))*100));
  document.getElementById('xp-fill').style.width=pct+'%';
  document.getElementById('xp-bar-label').textContent=S.xp.toLocaleString('en-IN')+' / '+(lv.max===Infinity?'MAX':lv.max.toLocaleString('en-IN'))+' XP';
}

/* ── NAVIGATION ─────────────────────────────────── */
let currentPage='dashboard';
function showPage(page,navEl){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
  const el=document.getElementById('page-'+page);
  if(el)el.classList.add('active');
  if(navEl)navEl.classList.add('active');
  else{const nb=document.getElementById('nav-'+page);if(nb)nb.classList.add('active');}
  currentPage=page;
  renderPage(page);
  window.scrollTo(0,0);
}
function renderPage(page){
  if(page==='dashboard')renderDashboard();
  else if(page==='transactions')renderTxPage();
  else if(page==='teammates')renderTeammates();
  else if(page==='city')renderCity();
  else if(page==='achievements')renderAchievements();
  else if(page==='reports')renderReports();
  else if(page==='settings')renderSettings();
  updateXPDisplay();
}

/* ── SETTINGS ─────────────────────────────────── */
function renderSettings(){
  const el=document.getElementById('settings-content');
  if(!el)return;
  const storedKey=localStorage.getItem('grok_api_key')||'';
  el.innerHTML=`
    <div class="card">
      <div class="card-head"><div class="card-icon">💾</div><div class="card-title">Backup & restore</div></div>
      <div style="font-size:12px;color:var(--text2);margin-bottom:10px">Export your whole app state, or import it again later.</div>
      <div class="fr" style="align-items:center;gap:8px;margin-bottom:10px">
        <select id="export-format" class="fs" style="max-width:150px">
          <option value="csv">Transactions (CSV)</option>
          <option value="json">Full app (JSON)</option>
        </select>
        <button class="btn btn-primary" onclick="exportDataSelected()">Export</button>
      </div>
      <div class="fr" style="align-items:center;gap:8px">
        <input type="file" id="import-json-input" accept="application/json" style="display:none" onchange="importJsonFile(event)">
        <button class="btn btn-green" onclick="document.getElementById('import-json-input').click()">Import JSON</button>
        <button class="btn btn-danger" onclick="resetData()">Reset data</button>
      </div>
      <div style="margin-top:10px;font-size:11px;color:var(--text2)">Import merges data with existing entries (by ID). No cloud involved.</div>
    </div>
    <div class="card">
      <div class="card-head"><div class="card-icon">🔐</div><div class="card-title">Scan API key</div></div>
      <div style="font-size:12px;color:var(--text2);margin-bottom:10px">Paste your Grok (or Anthropic) API key to enable invoice scanning.</div>
      <div class="fr" style="align-items:center;gap:8px">
        <input class="fi" id="grok-api-key" placeholder="Enter API key" value="${storedKey}" style="flex:1">
        <button class="btn btn-primary" onclick="saveGrokKey()">Save</button>
      </div>
      <div id="grok-key-hint" style="font-size:11px;color:var(--text2);margin-top:8px">Key is stored locally only.</div>
    </div>
  `;
}

function exportDataSelected(){
  const exportFmt=document.getElementById('export-format')?.value; // FIX #5: was 'fmt', shadowed global formatter
  if(exportFmt==='json')exportStateJSON();
  else exportCSV();
}

function importJsonFile(event){
  const file=event.target.files[0];
  if(!file)return;
  importStateJSON(file);
  event.target.value='';
}

function saveGrokKey(){
  const key=document.getElementById('grok-api-key')?.value.trim();
  if(!key){toast('Enter an API key');return;}
  localStorage.setItem('grok_api_key',key);
  toast('API key saved');
}

function resetData(){
  if(!confirm('Reset all app data? This cannot be undone.'))return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('grok_api_key');
  location.reload();
}

/* ── TEAMMATES ───────────────────────────────────── */
function pickTmIcon(el,icon){
  document.querySelectorAll('.tm-icon-opt').forEach(e=>e.classList.remove('sel'));
  el.classList.add('sel');S.selectedTmIcon=icon;
}
function addTeammate(){
  const name=document.getElementById('tm-name').value.trim();
  const type=document.getElementById('tm-type').value;
  const bal=parseFloat(document.getElementById('tm-balance').value)||0;
  const color=document.getElementById('tm-color').value;
  const icon=S.selectedTmIcon||'🏦';
  if(!name){toast('Enter account name');return;}
  S.teammates.push({id:Date.now(),name,type,balance:bal,initialBalance:bal,color,icon});
  document.getElementById('tm-name').value='';document.getElementById('tm-balance').value='';
  addXP(25,'New teammate added!');renderTeammates();persist();
}
function deleteTeammate(id){
  if(!confirm('Remove this teammate?'))return;
  S.teammates=S.teammates.filter(t=>t.id!==id);
  renderTeammates();renderDashboard();persist();toast('Teammate removed');
}
function getTmBalance(tm){
  let bal=tm.initialBalance||0;
  S.transactions.forEach(tx=>{
    if(tx.type==='expense'&&tx.teammateId===tm.id)bal-=tx.amount;
    else if(tx.type==='income'&&tx.teammateId===tm.id)bal+=tx.amount;
    else if(tx.type==='transfer'){
      if(tx.teammateId===tm.id)bal-=tx.amount;
      if(tx.teammateToId===tm.id)bal+=tx.amount;
    }
  });
  return bal;
}
function renderTeammates(){
  const grid=document.getElementById('teammate-grid');
  if(!grid)return;
  if(!S.teammates.length){grid.innerHTML='<div class="empty" style="grid-column:1/-1"><div class="empty-icon">🏦</div><div class="empty-text">No teammates yet. Add a bank account or cash wallet below!</div></div>';return;}
  grid.innerHTML=S.teammates.map(tm=>{
    const bal=getTmBalance(tm);
    const cnt=S.transactions.filter(t=>t.teammateId===tm.id||t.teammateToId===tm.id).length;
    return`<div class="tm-card" onclick="openTmDetail(${tm.id})">
      <button class="tm-del-btn" onclick="event.stopPropagation();deleteTeammate(${tm.id})">✕</button>
      <div class="tm-avatar" style="background:${tm.color}22">${tm.icon}</div>
      <div class="tm-name">${tm.name}</div>
      <div class="tm-type" style="color:${tm.color}">${TM_TYPES[tm.type]||tm.type}</div>
      <div class="tm-balance" style="color:${bal>=0?'var(--green-d)':'var(--ruby)'}">${fmt(bal)}</div>
      <div class="tm-tx-count">${cnt} transactions</div>
    </div>`;
  }).join('');
}
function openTmDetail(id){
  const tm=S.teammates.find(t=>t.id===id);if(!tm)return;
  const bal=getTmBalance(tm);
  const tmTx=S.transactions.filter(t=>t.teammateId===id||t.teammateToId===id).slice(0,8);
  document.getElementById('tm-modal-title').textContent=tm.icon+' '+tm.name;
  document.getElementById('tm-modal-body').innerHTML=`
    <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--bg2);border-radius:var(--radius-sm);margin-bottom:14px">
      <div style="width:46px;height:46px;border-radius:12px;background:${tm.color}22;display:flex;align-items:center;justify-content:center;font-size:22px">${tm.icon}</div>
      <div style="flex:1"><div style="font-size:15px;font-weight:700;font-family:var(--fh)">${tm.name}</div><div style="font-size:11px;color:var(--text2)">${TM_TYPES[tm.type]||tm.type}</div></div>
      <div style="text-align:right"><div style="font-family:var(--fh);font-size:20px;font-weight:800;color:${bal>=0?'var(--green-d)':'var(--ruby)'}">${fmt(bal)}</div><div style="font-size:10px;color:var(--text2)">current balance</div></div>
    </div>
    <div style="font-size:11px;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px">Recent activity</div>
    ${tmTx.length?tmTx.map(tx=>{const c=CATS[tx.cat]||CATS.other;const isOut=(tx.type==='expense')||(tx.type==='transfer'&&tx.teammateId===id);return`<div style="display:flex;align-items:center;gap:9px;padding:8px 0;border-bottom:0.5px solid var(--border)"><div style="width:30px;height:30px;border-radius:8px;background:${c.bg};display:flex;align-items:center;justify-content:center;font-size:13px">${c.icon}</div><div style="flex:1"><div style="font-size:12px;font-weight:500">${tx.title}</div><div style="font-size:10px;color:var(--text2)">${fmtDate(tx.date)}</div></div><div style="font-size:13px;font-weight:700;color:${isOut?'var(--ruby)':'var(--green-d)'}">${isOut?'-':'+'}${fmt(tx.amount)}</div></div>`;}).join(''):'<div class="empty" style="padding:12px 0"><div class="empty-text">No transactions yet</div></div>'}
    <div style="display:flex;gap:8px;margin-top:14px">
      <button class="btn btn-primary" style="flex:1" onclick="closeTmModal();openTxModal(${id})">+ Add transaction</button>
      <button class="btn btn-danger btn-sm" onclick="closeTmModal();deleteTeammate(${id})">Remove</button>
    </div>`;
  document.getElementById('tm-overlay').classList.add('open');
}
function closeTmModal(){document.getElementById('tm-overlay').classList.remove('open');}

/* ── TRANSACTIONS ────────────────────────────────── */
function populateTmSelects(selId,selToId){
  const opts=S.teammates.length?S.teammates.map(tm=>`<option value="${tm.id}">${tm.icon} ${tm.name}</option>`).join(''):'<option value="">No accounts</option>';
  ['m-teammate','m-teammate-to','modal-s-teammate','page-s-teammate'].forEach(id=>{
    const el=document.getElementById(id);if(el)el.innerHTML=opts;
  });
  if(selId){const el=document.getElementById('m-teammate');if(el)el.value=selId;}
  if(selToId){const el=document.getElementById('m-teammate-to');if(el)el.value=selToId;}
}
function openTxModal(preselTm){
  S.editingTxId=null;
  document.getElementById('tx-modal-title').textContent='Add transaction';
  document.getElementById('m-save-btn').textContent='Add transaction';
  document.getElementById('m-del-btn').style.display='none';
  document.getElementById('m-title').value='';
  document.getElementById('m-amount').value='';
  document.getElementById('m-date').value=new Date().toISOString().split('T')[0];
  document.getElementById('m-cat').value='food';
  document.getElementById('m-recurring').checked=false;
  setTxType('expense');
  S.expenseMode='manual';
  setExpenseMode('manual');
  populateTmSelects(preselTm||null);
  document.getElementById('tx-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('m-title').focus(),280);
}
function openEditTxModal(id){
  const tx=S.transactions.find(t=>t.id===id);if(!tx)return;
  S.editingTxId=id;
  document.getElementById('tx-modal-title').textContent='Edit transaction';
  document.getElementById('m-save-btn').textContent='Save changes';
  document.getElementById('m-del-btn').style.display='block';
  document.getElementById('m-title').value=tx.title||'';
  document.getElementById('m-amount').value=tx.amount||'';
  document.getElementById('m-date').value=tx.date?tx.date.split('T')[0]:new Date().toISOString().split('T')[0];
  document.getElementById('m-cat').value=tx.cat||'food';
  document.getElementById('m-recurring').checked=!!tx.recurring;
  setTxType(tx.type||'expense');
  setExpenseMode('manual');
  populateTmSelects(tx.teammateId,tx.teammateToId);
  document.getElementById('tx-overlay').classList.add('open');
}
function closeTxModal(){document.getElementById('tx-overlay').classList.remove('open');S.editingTxId=null;}

function setTxType(t){
  S.currentTxType=t;
  document.getElementById('m-exp').className='type-btn';
  document.getElementById('m-inc').className='type-btn';
  document.getElementById('m-tr').className='type-btn';
  const classMap={expense:'t-exp',income:'t-inc',transfer:'t-tr'};
  const idMap={expense:'m-exp',income:'m-inc',transfer:'m-tr'};
  document.getElementById(idMap[t]).className='type-btn '+classMap[t];
  document.getElementById('m-tm-to-wrap').style.display=t==='transfer'?'block':'none';
  document.getElementById('expense-sub').style.display=t==='expense'?'block':'none';
  if(t!=='expense'){document.getElementById('tx-form').style.display='block';document.getElementById('scan-form').style.display='none';}
  const labels={expense:'Add expense',income:'Add income',transfer:'Add transfer'};
  if(!S.editingTxId)document.getElementById('m-save-btn').textContent=labels[t];
  if(t==='income')document.getElementById('m-cat').value='income';
  else if(t!=='transfer'&&document.getElementById('m-cat').value==='income')document.getElementById('m-cat').value='food';
}
function setExpenseMode(mode){
  S.expenseMode=mode;
  document.getElementById('exp-manual').className=mode==='manual'?'type-btn t-exp':'type-btn';
  document.getElementById('exp-scan').className=mode==='scan'?'type-btn t-exp':'type-btn';
  document.getElementById('tx-form').style.display=mode==='manual'?'block':'none';
  document.getElementById('scan-form').style.display=mode==='scan'?'block':'none';
}
function saveTx(){
  const title=document.getElementById('m-title').value.trim();
  const amount=parseFloat(document.getElementById('m-amount').value)||0;
  const type=S.currentTxType;
  const cat=document.getElementById('m-cat').value;
  const date=document.getElementById('m-date').value;
  const recurring=document.getElementById('m-recurring').checked;
  const teammateId=parseInt(document.getElementById('m-teammate').value)||null;
  const teammateToId=(type==='transfer'&&document.getElementById('m-teammate-to').value)?parseInt(document.getElementById('m-teammate-to').value):null;
  if(!title){toast('Enter a title');return;}
  if(amount<=0){toast('Enter a valid amount');return;}
  if(type==='transfer'&&teammateId===teammateToId){toast('Transfer must be between different accounts');return;}
  if(S.editingTxId){
    const idx=S.transactions.findIndex(t=>t.id===S.editingTxId);
    if(idx>=0)S.transactions[idx]={...S.transactions[idx],title,amount,type,cat,date:date+'T00:00:00.000Z',teammateId,teammateToId,recurring};
    addXP(5,'Transaction edited');
    if(!S.earnedBadges.includes('edited_tx')){S.earnedBadges.push('edited_tx');}
  } else {
    const td=todayStr();
    if(!S.streakDays.includes(td))S.streakDays.push(td);
    recalcStreak(); // FIX #6: proper streak recalculation instead of raw S.streak++
    S.transactions.unshift({id:uid(),title,amount,type,cat,date:date+'T00:00:00.000Z',teammateId,teammateToId,fromScan:false,recurring}); // FIX #19: uid()
    if(recurring&&!S.recurringTx.find(r=>r.title===title)){
      S.recurringTx.push({id:uid(),title,amount,type,cat,teammateId,day:new Date().getDate()}); // FIX #19: uid()
    }
    addXP(type==='income'?20:type==='transfer'?5:10,type==='income'?'Income logged':type==='transfer'?'Transfer recorded':'Expense logged');
  }
  checkBudgets();
  closeTxModal();renderPage(currentPage);persist();
}
function deleteTx(){
  if(!S.editingTxId||!confirm('Delete this transaction?'))return;
  S.transactions=S.transactions.filter(t=>t.id!==S.editingTxId);
  closeTxModal();toast('Transaction deleted');renderPage(currentPage);persist();
}

/* ── SEARCH & FILTER ─────────────────────────────── */
let _txFilterType='all';
let _txSearchQuery='';
let _searchDebounce=null;
function setTxFilter(type,el){
  _txFilterType=type;
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  renderTxList('all-txns-list',null);
}
function debouncedFilterTx(){
  clearTimeout(_searchDebounce);
  _searchDebounce=setTimeout(()=>{
    _txSearchQuery=document.getElementById('tx-search')?.value.toLowerCase()||'';
    renderTxList('all-txns-list',null);
  },300);
}
function getFilteredTx(){
  return S.transactions.filter(tx=>{
    const matchType=_txFilterType==='all'||tx.type===_txFilterType;
    const matchSearch=!_txSearchQuery||tx.title.toLowerCase().includes(_txSearchQuery);
    return matchType&&matchSearch;
  });
}
function renderTxPage(){renderTxList('all-txns-list',null);}
function renderTxList(containerId,limit){
  const el=document.getElementById(containerId);if(!el)return;
  const list=containerId==='all-txns-list'?getFilteredTx():S.transactions.slice(0,limit||6);
  if(!list.length){el.innerHTML='<div class="empty"><div class="empty-icon">💸</div><div class="empty-text">No transactions found.</div></div>';return;}
  el.innerHTML=list.map(tx=>{
    const c=CATS[tx.cat]||CATS.other;
    const tm=S.teammates.find(t=>t.id===tx.teammateId);
    const sign=tx.type==='income'?'+':tx.type==='transfer'?'⇄':'-';
    const amtColor=tx.type==='income'?'var(--green-d)':tx.type==='transfer'?'var(--blue)':'var(--ruby)';
    const tmChip=tm?`<span class="tm-chip" style="background:${tm.color}18;color:${tm.color};border:0.5px solid ${tm.color}44">${tm.icon} ${esc(tm.name)}</span>`:''; // FIX #20
    const recChip=tx.recurring?`<span class="tm-chip" style="background:#E3F2FD;color:#1565C0;border:0.5px solid #90CAF9">🔄 recurring</span>`:'';
    return`<div class="tx-item" onclick="openEditTxModal(${tx.id})">
      <div class="tx-color-bar" style="background:${tm?.color||c.color}"></div>
      <div class="tx-icon-wrap" style="background:${c.bg}">${c.icon}</div>
      <div class="tx-content">
        <div class="tx-title">${esc(tx.title)}</div>
        <div class="tx-meta">${fmtDate(tx.date)} ${tmChip}${recChip}</div>
      </div>
      <div class="tx-right">
        <div class="tx-amount" style="color:${amtColor}">${sign}${fmt(tx.amount)}</div>
        <div class="tx-hint">tap to edit</div>
      </div>
    </div>`;
  }).join('');
}

/* ── CSV EXPORT ─────────────────────────────────── */
function exportCSV(){
  if(!S.transactions.length){toast('No transactions to export');return;}
  const headers=['Date','Title','Type','Category','Amount','Account'];
  const rows=S.transactions.map(tx=>{
    const tm=S.teammates.find(t=>t.id===tx.teammateId);
    return[tx.date.split('T')[0],'"'+tx.title.replace(/"/g,'""')+'"',tx.type,tx.cat,tx.amount,tm?'"'+tm.name+'"':''].join(',');
  });
  const csv=[headers.join(','),...rows].join('\n');
  const blob=new Blob([csv],{type:'text/csv'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download='arthquest_transactions.csv';
  document.body.appendChild(a);a.click();
  document.body.removeChild(a);URL.revokeObjectURL(url);
  toast('CSV exported!');
}

/* ── TOAST QUEUE ─────────────────────────────────── */
// FIX #9: queue toasts so multiple budget alerts don't overwrite each other
let _toastQueue=[];let _toastRunning=false;
function toastQueue(msg){
  _toastQueue.push(msg);
  if(!_toastRunning)drainToastQueue();
}
function drainToastQueue(){
  if(!_toastQueue.length){_toastRunning=false;return;}
  _toastRunning=true;
  toast(_toastQueue.shift());
  setTimeout(drainToastQueue,3000);
}

/* ── BUDGETS ─────────────────────────────────────── */
function renderBudgetSettings(){
  const el=document.getElementById('budget-settings');if(!el)return;
  const cats=['food','transport','shopping','entertainment','bills','health','education'];
  el.innerHTML=cats.map(c=>{
    const cat=CATS[c];
    return`<div class="fr" style="align-items:center">
      <div style="font-size:16px;width:24px">${cat.icon}</div>
      <div class="fg"><label class="fl" style="margin:0">${c}</label></div>
      <div style="max-width:120px"><input class="fi" id="budget-${c}" type="number" placeholder="No limit" value="${S.budgets[c]||''}"></div>
    </div>`;
  }).join('');
}
function saveBudgets(){
  ['food','transport','shopping','entertainment','bills','health','education'].forEach(c=>{
    const val=parseFloat(document.getElementById('budget-'+c)?.value)||0;
    if(val>0)S.budgets[c]=val;else delete S.budgets[c];
  });
  persist();toast('Budgets saved!');renderDashboard();
}
function checkBudgets(){
  const now=new Date();
  Object.entries(S.budgets).forEach(([cat,limit])=>{
    const spent=S.transactions.filter(t=>t.type==='expense'&&t.cat===cat&&new Date(t.date).getMonth()===now.getMonth()&&new Date(t.date).getFullYear()===now.getFullYear()).reduce((s,t)=>s+t.amount,0);
    if(spent>limit)toastQueue(`⚠️ Over ${cat} budget! Spent ${fmt(spent)} of ${fmt(limit)}`); // FIX #9: queued
    else if(spent>limit*0.8)toastQueue(`⚠️ 80%+ of ${cat} budget used (${fmt(spent)} / ${fmt(limit)})`); // FIX #9: queued
  });
}

/* ── RECURRING TRANSACTIONS ──────────────────────── */
function addRecurring(){
  const title=document.getElementById('rec-title').value.trim();
  const amount=parseFloat(document.getElementById('rec-amount').value)||0;
  const cat=document.getElementById('rec-cat').value;
  const type=document.getElementById('rec-type').value;
  const day=parseInt(document.getElementById('rec-day').value)||1;
  if(!title||amount<=0){toast('Enter title and amount');return;}
  S.recurringTx.push({id:Date.now(),title,amount,cat,type,day,teammateId:S.teammates[0]?.id||null});
  document.getElementById('rec-title').value='';document.getElementById('rec-amount').value='';
  renderRecurringList();persist();toast('Recurring added!');
}
function deleteRecurring(id){
  S.recurringTx=S.recurringTx.filter(r=>r.id!==id);
  renderRecurringList();persist();
}
function renderRecurringList(){
  const el=document.getElementById('recurring-list');if(!el)return;
  if(!S.recurringTx.length){el.innerHTML='<div style="font-size:12px;color:var(--text2)">No recurring transactions yet.</div>';return;}
  el.innerHTML=S.recurringTx.map(r=>{
    const c=CATS[r.cat]||CATS.other;
    return`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:0.5px solid var(--border)">
      <div style="width:32px;height:32px;border-radius:8px;background:${c.bg};display:flex;align-items:center;justify-content:center;font-size:14px">${c.icon}</div>
      <div style="flex:1"><div style="font-size:13px;font-weight:600">${r.title}</div><div style="font-size:10px;color:var(--text2)">${fmt(r.amount)} · ${r.type} · day ${r.day} of month</div></div>
      <button class="btn btn-sm btn-danger" onclick="deleteRecurring(${r.id})">✕</button>
    </div>`;
  }).join('');
}
function checkRecurring(){
  if(!S.recurringTx.length)return;
  const today=new Date();
  const todayISO=todayStr();
  if(S.recurringDismissedDate===todayISO)return;
  const due=S.recurringTx.filter(r=>{
    const isDue=today.getDate()>=r.day;
    const alreadyLogged=S.transactions.some(t=>t.title===r.title&&new Date(t.date).getMonth()===today.getMonth()&&new Date(t.date).getFullYear()===today.getFullYear());
    return isDue&&!alreadyLogged;
  });
  const banner=document.getElementById('recurring-banner');
  const listEl=document.getElementById('recurring-list-text');
  if(due.length&&banner&&listEl){
    banner.classList.add('show');
    listEl.textContent=due.map(r=>r.title+' ('+fmt(r.amount)+')').join(', ');
    S._pendingRecurring=due; // FIX #7: store on S, not on DOM node
  }
}
function logAllRecurring(){
  const due=S._pendingRecurring||[]; // FIX #7: read from S, not banner._due
  const td=todayStr();
  due.forEach(r=>{
    if(!S.streakDays.includes(td)){S.streakDays.push(td);}
    S.transactions.unshift({id:uid(),title:r.title,amount:r.amount,type:r.type,cat:r.cat,date:nowISO(),teammateId:r.teammateId,fromScan:false,recurring:true});
  });
  recalcStreak(); // FIX #6: recalc streak properly
  addXP(due.length*10,'Recurring transactions logged!');
  S._pendingRecurring=[];
  dismissRecurring();renderPage(currentPage);
}
function dismissRecurring(){
  S.recurringDismissedDate=todayStr();
  document.getElementById('recurring-banner').classList.remove('show');
  persist();
}

/* ══════════════════════════════════════════════════
   CITY BUILDER
══════════════════════════════════════════════════ */

const BUILDING_CAT_DESCS={
  house:    '🏠 House — Personal savings goals (car, trip, gadget, wedding, etc.)',
  apartment:'🏢 Apartment — SIPs, mutual funds, stocks, gold, crypto, bonds, PPF etc.',
  school:   '🏫 School — Education investments: courses, certificates, college fees',
  hospital: '🏥 Hospital — Medical expenses: doctor, surgery, medicine, insurance',
  gym:      '🏋️ Gym — Health & fitness: memberships, sports gear, yoga, apps',
  restaurant:'🍽️ Restaurant — Food & dining: eating out, Swiggy, Zomato, cafes',
  mall:     '🛍️ Mall — Lifestyle & retail: clothes, electronics, subscriptions',
  bank:     '🏦 Bank — Emergency fund, FDs, liquid savings — your security tower',
};
function pickBuildingCat(el,cat){
  document.querySelectorAll('.cat-type-opt').forEach(e=>e.classList.remove('sel'));
  el.classList.add('sel');
  S.selectedBuildingCat=cat;
  const desc=document.getElementById('building-cat-desc');
  if(desc)desc.textContent=BUILDING_CAT_DESCS[cat]||'';
}

function drawBuilding(cat,amount,w,h){
  const tier=getBuildingTier(amount);
  const catDef=BUILDING_CATS[cat]||BUILDING_CATS.house;
  const color=catDef.color;
  const tierH=Math.round((tier.height/130)*h);
  const bw=Math.round(w*0.72);
  const bx=(w-bw)/2;
  const by=h-tierH-4;

  const wallC=color;
  const roofC=shadeColor(color,-20);
  const winC='#B3E5FC';
  const doorC=shadeColor(color,-30);

  let svg=`<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">`;

  if(tier.tierIdx===0){
    svg+=`<rect x="${bx}" y="${h-8}" width="${bw}" height="8" rx="2" fill="#A1887F" opacity=".6"/>`;
    svg+=`<text x="${w/2}" y="${h-10}" text-anchor="middle" font-size="9" fill="#795548" opacity=".7">empty plot</text>`;
  } else if(tier.tierIdx===1){
    const hw=bw*0.8,hh=tierH;const hx=(w-hw)/2;
    svg+=`<rect x="${hx}" y="${by+hh*0.45}" width="${hw}" height="${hh*0.55}" rx="2" fill="${wallC}"/>`;
    svg+=`<polygon points="${w/2},${by} ${hx},${by+hh*0.5} ${hx+hw},${by+hh*0.5}" fill="${roofC}"/>`;
    svg+=`<rect x="${w/2-5}" y="${by+hh*0.65}" width="10" height="${hh*0.35}" rx="1" fill="${doorC}"/>`;
  } else if(tier.tierIdx===2){
    svg+=`<rect x="${bx}" y="${by+tierH*0.35}" width="${bw}" height="${tierH*0.65}" rx="2" fill="${wallC}"/>`;
    svg+=`<polygon points="${w/2},${by} ${bx-4},${by+tierH*0.5} ${bx+bw+4},${by+tierH*0.5}" fill="${roofC}"/>`;
    svg+=`<rect x="${bx+bw*0.15}" y="${by+tierH*0.5}" width="${bw*0.2}" height="${tierH*0.22}" rx="1" fill="${winC}"/>`;
    svg+=`<rect x="${bx+bw*0.65}" y="${by+tierH*0.5}" width="${bw*0.2}" height="${tierH*0.22}" rx="1" fill="${winC}"/>`;
    svg+=`<rect x="${w/2-6}" y="${by+tierH*0.68}" width="12" height="${tierH*0.32}" rx="1" fill="${doorC}"/>`;
  } else if(tier.tierIdx===3){
    svg+=`<rect x="${bx}" y="${by+tierH*0.28}" width="${bw}" height="${tierH*0.72}" rx="2" fill="${wallC}"/>`;
    svg+=`<polygon points="${w/2},${by} ${bx-5},${by+tierH*0.32} ${bx+bw+5},${by+tierH*0.32}" fill="${roofC}"/>`;
    for(let i=0;i<3;i++){svg+=`<rect x="${bx+bw*(0.12+i*0.29)}" y="${by+tierH*0.38}" width="${bw*0.18}" height="${tierH*0.18}" rx="1" fill="${winC}"/>`;}
    for(let i=0;i<2;i++){svg+=`<rect x="${bx+bw*(0.2+i*0.38)}" y="${by+tierH*0.6}" width="${bw*0.18}" height="${tierH*0.16}" rx="1" fill="${winC}"/>`;}
    svg+=`<rect x="${w/2-7}" y="${by+tierH*0.75}" width="14" height="${tierH*0.25}" rx="1" fill="${doorC}"/>`;
    svg+=`<rect x="${bx+bw*0.72}" y="${by+tierH*0.1}" width="8" height="${tierH*0.22}" rx="1" fill="${roofC}"/>`;
  } else if(tier.tierIdx===4){
    svg+=`<rect x="${bx}" y="${by+tierH*0.22}" width="${bw}" height="${tierH*0.78}" rx="3" fill="${wallC}"/>`;
    svg+=`<polygon points="${bx},${by+tierH*0.26} ${bx+bw},${by+tierH*0.26} ${bx+bw+4},${by+tierH*0.18} ${bx-4},${by+tierH*0.18}" fill="${roofC}"/>`;
    svg+=`<polygon points="${w/2},${by} ${bx-4},${by+tierH*0.2} ${bx+bw+4},${by+tierH*0.2}" fill="${shadeColor(roofC,-10)}"/>`;
    for(let i=0;i<4;i++){svg+=`<rect x="${bx+bw*(0.08+i*0.23)}" y="${by+tierH*0.38}" width="${bw*0.14}" height="${tierH*0.2}" rx="1" fill="${winC}"/>`;}
    svg+=`<rect x="${bx+bw*0.35}" y="${by+tierH*0.65}" width="${bw*0.3}" height="${tierH*0.35}" rx="1" fill="${doorC}"/>`;
    svg+=`<rect x="${bx}" y="${by+tierH*0.65}" width="${bw*0.28}" height="${tierH*0.35}" rx="1" fill="${shadeColor(wallC,-10)}"/>`;
  } else if(tier.tierIdx===5){
    svg+=`<rect x="${bx}" y="${by+tierH*0.15}" width="${bw}" height="${tierH*0.85}" rx="3" fill="${wallC}"/>`;
    svg+=`<rect x="${bx-bw*0.2}" y="${by+tierH*0.35}" width="${bw*0.25}" height="${tierH*0.65}" rx="2" fill="${shadeColor(wallC,10)}"/>`;
    svg+=`<rect x="${bx+bw*0.95}" y="${by+tierH*0.35}" width="${bw*0.25}" height="${tierH*0.65}" rx="2" fill="${shadeColor(wallC,10)}"/>`;
    svg+=`<polygon points="${w/2},${by} ${bx-4},${by+tierH*0.2} ${bx+bw+4},${by+tierH*0.2}" fill="${roofC}"/>`;
    svg+=`<polygon points="${bx-bw*0.07},${by+tierH*0.28} ${bx-bw*0.2-4},${by+tierH*0.38} ${bx+bw*0.07},${by+tierH*0.38}" fill="${shadeColor(roofC,10)}"/>`;
    svg+=`<polygon points="${bx+bw*0.93},${by+tierH*0.28} ${bx+bw},${by+tierH*0.38} ${bx+bw*1.22},${by+tierH*0.38}" fill="${shadeColor(roofC,10)}"/>`;
    for(let r=0;r<2;r++){for(let c2=0;c2<4;c2++){svg+=`<rect x="${bx+bw*(0.1+c2*0.22)}" y="${by+tierH*(0.28+r*0.28)}" width="${bw*0.14}" height="${tierH*0.18}" rx="1" fill="${winC}"/>`;}}
    svg+=`<rect x="${w/2-8}" y="${by+tierH*0.75}" width="16" height="${tierH*0.25}" rx="2" fill="${doorC}"/>`;
    for(let i=0;i<3;i++){svg+=`<rect x="${bx+bw*(0.22+i*0.28)-3}" y="${by+tierH*0.7}" width="6" height="${tierH*0.3}" rx="1" fill="${shadeColor(wallC,-15)}"/>`;}
  } else {
    svg+=`<rect x="${bx}" y="${by}" width="${bw}" height="${tierH}" rx="3" fill="${wallC}"/>`;
    svg+=`<rect x="${bx-bw*0.18}" y="${by+tierH*0.2}" width="${bw*0.22}" height="${tierH*0.8}" rx="2" fill="${shadeColor(wallC,8)}"/>`;
    svg+=`<rect x="${bx+bw*0.96}" y="${by+tierH*0.2}" width="${bw*0.22}" height="${tierH*0.8}" rx="2" fill="${shadeColor(wallC,8)}"/>`;
    for(let i=0;i<7;i++){svg+=`<rect x="${bx+bw*(0.04+i*0.135)}" y="${by-6}" width="${bw*0.08}" height="10" rx="1" fill="${roofC}"/>`;}
    for(let r=0;r<3;r++){for(let c2=0;c2<5;c2++){svg+=`<rect x="${bx+bw*(0.08+c2*0.18)}" y="${by+tierH*(0.1+r*0.26)}" width="${bw*0.11}" height="${tierH*0.18}" rx="1" fill="${winC}"/>`;}}
    svg+=`<rect x="${w/2-10}" y="${by+tierH*0.75}" width="20" height="${tierH*0.25}" rx="1" fill="${doorC}"/>`;
    svg+=`<path d="M${w/2-10},${by+tierH*0.75} a10,10 0 0,1 20,0" fill="${shadeColor(doorC,15)}"/>`;
    svg+=`<polygon points="${w/2-10},${by+tierH*0.15} ${w/2-14},${by+tierH*0.22} ${w/2+10},${by+tierH*0.22}" fill="${roofC}"/>`;
    svg+=`<line x1="${w/2}" y1="${by-6}" x2="${w/2}" y2="${by-18}" stroke="${roofC}" stroke-width="1.5"/>`;
    svg+=`<polygon points="${w/2},${by-18} ${w/2+10},${by-14} ${w/2},${by-10}" fill="#F44336"/>`;
  }
  svg+='</svg>';
  return svg;
}

function shadeColor(hex,pct){
  try{
    let c=hex.replace('#','');
    if(c.length===3)c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    const n=parseInt(c,16);
    let r=(n>>16)&255,g=(n>>8)&255,b=n&255;
    r=Math.min(255,Math.max(0,r+Math.round(r*pct/100)));
    g=Math.min(255,Math.max(0,g+Math.round(g*pct/100)));
    b=Math.min(255,Math.max(0,b+Math.round(b*pct/100)));
    return'#'+(1<<24|r<<16|g<<8|b).toString(16).slice(1);
  }catch(e){return hex;}
}

let _buildingAdding=false; // FIX #18: guard against double-tap
function addBuilding(){
  if(_buildingAdding)return;
  const name=document.getElementById('b-bldg-name').value.trim();
  const amount=parseFloat(document.getElementById('b-bldg-amount').value)||0;
  const cat=S.selectedBuildingCat||'house';
  if(!name){toast('Enter a building name');return;}
  if(amount<=0){toast('Enter an amount greater than ₹0');return;} // FIX #8: was amount<0, allowed 0
  _buildingAdding=true;
  S.buildings.push({id:uid(),name,cat,amount,createdAt:nowISO()}); // FIX #19: uid() instead of Date.now()
  document.getElementById('b-bldg-name').value='';
  document.getElementById('b-bldg-amount').value='';
  const tier=getBuildingTier(amount); // FIX #4: removed unused prevTier
  addXP(30+(tier.tierIdx*10),'New building constructed!');
  renderCity();persist();
  toast('🏗️ '+esc(tier.name)+' constructed!'); // FIX #20: escape tier name
  _buildingAdding=false;
}

function deleteBuilding(id){
  if(!confirm('Demolish this building?'))return;
  S.buildings=S.buildings.filter(b=>b.id!==id);
  renderCity();persist();toast('Building demolished');
}

function openBuildingModal(id){
  const b=S.buildings.find(x=>x.id===id);if(!b)return;
  const catDef=BUILDING_CATS[b.cat]||BUILDING_CATS.house;
  const tier=getBuildingTier(b.amount);
  const next=getNextTier(b.amount);
  S.fundingBuildingId=id;
  document.getElementById('building-modal-title').textContent='Add funds to building';
  document.getElementById('building-modal-icon').textContent=catDef.icon;
  document.getElementById('building-modal-name').textContent=b.name;
  document.getElementById('building-modal-tier').textContent=catDef.label+' · Currently: '+tier.name;
  document.getElementById('building-modal-current').textContent='Current: '+fmt(b.amount);
  document.getElementById('building-modal-next').textContent=next?'Next tier at '+fmt(next.min):'MAX TIER 🏆';
  const pct=next?Math.min(100,Math.round(((b.amount-tier.min)/(next.min-tier.min))*100)):100;
  document.getElementById('building-modal-bar').style.width=pct+'%';
  document.getElementById('building-add-amount').value='';
  document.getElementById('building-overlay').classList.add('open');
}
function closeBuildingModal(){document.getElementById('building-overlay').classList.remove('open');S.fundingBuildingId=null;}

function confirmAddFunds(){
  const b=S.buildings.find(x=>x.id===S.fundingBuildingId);if(!b)return;
  const amt=parseFloat(document.getElementById('building-add-amount').value)||0;
  if(amt<=0){toast('Enter an amount');return;}
  const oldTier=getBuildingTier(b.amount);
  b.amount+=amt;
  const newTier=getBuildingTier(b.amount);
  const upgraded=newTier.tierIdx>oldTier.tierIdx;
  if(upgraded){
    addXP(50+(newTier.tierIdx*15),'Building upgraded to '+newTier.name+'!');
    toast('🎉 UPGRADE! '+oldTier.name+' → '+newTier.name);
  } else {
    addXP(15,'Funds added to building!');
  }
  closeBuildingModal();renderCity();persist();
}

function renderCity(){
  renderCitySkyline();
  renderCityStats();
  renderBuildingsList();
}

function renderCitySkyline(){
  const row=document.getElementById('city-buildings-row');if(!row)return;
  if(!S.buildings.length){
    // FIX #14: friendly empty state instead of plain text
    row.innerHTML=`<div style="text-align:center;padding:36px 16px;width:100%">
      <div style="font-size:40px;margin-bottom:8px">🏗️</div>
      <div style="font-family:var(--fh);font-size:14px;font-weight:700;color:#1565C0">Your city plot is ready!</div>
      <div style="font-size:11px;color:#5085c8;margin-top:4px">Add your first building below to break ground</div>
    </div>`;
    return;
  }
  const sorted=[...S.buildings].sort((a,b)=>b.amount-a.amount);
  const count=sorted.length;
  const bw=count<=4?56:count<=7?48:40;
  const bh=Math.round(bw*2.8);
  row.innerHTML=sorted.map(b=>{
    const tier=getBuildingTier(b.amount);
    const catDef=BUILDING_CATS[b.cat]||BUILDING_CATS.house;
    return`<div class="building-wrap" onclick="openBuildingModal(${b.id})" title="${b.name}">
      <div style="width:${bw}px;height:${bh}px">${drawBuilding(b.cat,b.amount,bw,bh)}</div>
      <div class="building-label">${b.name}</div>
      <div class="building-tier-badge">${tier.name}</div>
    </div>`;
  }).join('');
}

function renderCityStats(){
  const count=S.buildings.length;
  const cityLvl=getCityLevel(count);
  const totalInvested=S.buildings.reduce((s,b)=>s+b.amount,0);
  const upgraded=S.buildings.filter(b=>getBuildingTier(b.amount).tierIdx>=3).length;
  if(document.getElementById('city-level-val'))document.getElementById('city-level-val').textContent=cityLvl.name;
  if(document.getElementById('city-bldg-count'))document.getElementById('city-bldg-count').textContent=count;
  if(document.getElementById('city-total-invested'))document.getElementById('city-total-invested').textContent=fmt(totalInvested);
  if(document.getElementById('city-upgraded-count'))document.getElementById('city-upgraded-count').textContent=upgraded;
}

function renderBuildingsList(){
  const el=document.getElementById('city-buildings-list');if(!el)return;
  if(!S.buildings.length){el.innerHTML='';return;}
  const bycat={};
  S.buildings.forEach(b=>{if(!bycat[b.cat])bycat[b.cat]=[];bycat[b.cat].push(b);});
  el.innerHTML=Object.entries(bycat).map(([cat,buildings])=>{
    const catDef=BUILDING_CATS[cat]||BUILDING_CATS.house;
    const catTotal=buildings.reduce((s,b)=>s+b.amount,0);
    const cards=buildings.map(b=>{
      const tier=getBuildingTier(b.amount);
      const next=getNextTier(b.amount);
      const pct=next?Math.min(100,Math.round(((b.amount-tier.min)/(next.min-tier.min))*100)):100;
      const tierColors=['#9E9E9E','#795548','#607D8B','#FF6B00','#6A1B9A','#1565C0','#D4AF37'];
      const tierColor=tierColors[tier.tierIdx]||'#FF6B00';
      return`<div class="building-card" onclick="openBuildingModal(${b.id})">
        <button class="building-del-btn" onclick="event.stopPropagation();deleteBuilding(${b.id})">✕</button>
        <div class="building-card-hdr">
          <div class="building-avatar" style="background:${catDef.bg}">${catDef.icon}</div>
          <div style="flex:1;min-width:0">
            <div class="building-name">${esc(b.name)}</div>
            <div class="building-meta">${catDef.label} · Tap to add funds</div>
            <div class="building-amount" style="color:${catDef.color}">${fmt(b.amount)}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
          <div class="building-tier-label" style="background:${tierColor}22;color:${tierColor}">${tier.emoji} ${tier.name}</div>
          <div style="font-size:10px;color:var(--text2)">${next?'Next: '+tier.name+' → '+next.name:'MAX TIER 🏆'}</div>
        </div>
        <div class="building-progress-track"><div class="building-progress-fill" style="width:${pct}%;background:${catDef.color}"></div></div>
        <div style="font-size:9px;color:var(--text2);margin-top:3px;text-align:right">${next?pct+'% to '+next.name:'Fully upgraded!'}</div>
      </div>`;
    }).join('');
    return`<div style="margin-bottom:14px">
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:8px">
        <div style="font-size:18px">${catDef.icon}</div>
        <div style="font-family:var(--fh);font-size:14px;font-weight:700">${catDef.label}s</div>
        <div style="margin-left:auto;font-size:11px;font-weight:600;color:${catDef.color}">${fmt(catTotal)}</div>
      </div>
      ${cards}
    </div>`;
  }).join('');
}

/* ── QUESTS ──────────────────────────────────────── */
function checkQuests(){
  QUESTS_DEF.forEach(q=>{
    if(S.completedQuests.includes(q.id))return;
    let done=false;
    if(q.type==='spend_total')done=S.transactions.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0)>=q.target;
    else if(q.type==='streak')done=S.streak>=q.target;
    else if(q.type==='scan_count')done=S.scanCount>=q.target;
    else if(q.type==='cat_limit'){const now=new Date();const spent=S.transactions.filter(t=>t.type==='expense'&&t.cat===q.cat&&new Date(t.date).getMonth()===now.getMonth()).reduce((s,t)=>s+t.amount,0);done=spent>0&&spent<=q.limit;}
    else if(q.type==='buildings')done=S.buildings.length>=q.target;
    else if(q.type==='teammates')done=S.teammates.length>=q.target;
    if(done){S.completedQuests.push(q.id);addXP(q.xp,'Quest complete: '+q.name);}  
  });
}
function renderQuests(prefix){
  const pre=prefix||'ach';
  const qActive=document.getElementById(pre+'-quests-active');
  const qDone=document.getElementById(pre+'-quests-done');
  if(!qActive||!qDone)return;
  const active=QUESTS_DEF.filter(q=>!S.completedQuests.includes(q.id));
  const done=QUESTS_DEF.filter(q=>S.completedQuests.includes(q.id));
  if(!active.length){qActive.innerHTML='<div class="empty" style="padding:10px 0"><div class="empty-text">All quests complete! 🎉</div></div>';} 
  else qActive.innerHTML=active.map(q=>{
    let prog=0,max=q.target||1,label='';
    if(q.type==='spend_total'){prog=S.transactions.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);label=fmt(Math.min(prog,max))+' / '+fmt(max);} 
    else if(q.type==='streak'){prog=S.streak;label=prog+' / '+max+' days';} 
    else if(q.type==='scan_count'){prog=S.scanCount;label=prog+' / '+max+' scans';} 
    else if(q.type==='cat_limit'){const now=new Date();prog=S.transactions.filter(t=>t.type==='expense'&&t.cat===q.cat&&new Date(t.date).getMonth()===now.getMonth()).reduce((s,t)=>s+t.amount,0);label=(prog<=q.limit?'On track: ':'Over: ')+fmt(prog);prog=prog<=q.limit?q.limit:0;max=q.limit;} 
    else if(q.type==='buildings'){prog=S.buildings.length;label=prog+' / '+max+' buildings';} 
    else if(q.type==='teammates'){prog=S.teammates.length;label=prog+' / '+max+' teammates';} 
    const pct=Math.min(100,Math.round((prog/max)*100));
    return`<div class="quest-item"><div class="quest-icon-wrap" style="background:var(--saffron-l)">${q.icon}</div><div style="flex:1;min-width:0"><div class="quest-name">${q.name}</div><div class="quest-desc">${label}</div><div class="quest-bar"><div class="quest-bar-fill" style="width:${pct}%"></div></div></div><div class="quest-xp">+${q.xp} XP</div></div>`;
  }).join('');
  qDone.innerHTML=done.length?done.map(q=>`<div class="quest-item"><div class="quest-icon-wrap" style="background:var(--green-l)">${q.icon}</div><div style="flex:1"><div class="quest-name">${q.name}</div><div class="quest-desc" style="color:var(--green-d)">Completed! ✓</div></div><div class="quest-xp" style="color:var(--green-d)">+${q.xp} XP</div></div>`).join(''):'<div class="empty" style="padding:10px 0"><div class="empty-text">Complete quests to see them here</div></div>';
}

/* ── BADGES ──────────────────────────────────────── */
function checkBadges(){
  const chk=(id,cond)=>{if(!S.earnedBadges.includes(id)&&cond){S.earnedBadges.push(id);toast('Badge unlocked: '+BADGES_DEF.find(b=>b.id===id)?.name||id);persist();}};
  chk('first_tx',S.transactions.length>=1);
  chk('scan_1',S.scanCount>=1);
  chk('first_building',S.buildings.length>=1);
  chk('building_5',S.buildings.length>=5);
  chk('building_upgrade',S.buildings.some(b=>getBuildingTier(b.amount).tierIdx>=3));
  chk('mansion',S.buildings.some(b=>getBuildingTier(b.amount).tierIdx===6));
  chk('city_level',S.buildings.length>=10);
  chk('first_tm',S.teammates.length>=1);
  chk('team_3',S.teammates.length>=3);
  chk('streak_7',S.streak>=7);chk('streak_30',S.streak>=30);
  chk('invest_1',S.transactions.some(t=>t.cat==='investment'));
  chk('transfer_1',S.transactions.some(t=>t.type==='transfer'));
  chk('quests_3',S.completedQuests.length>=3);
  const net=S.transactions.reduce((s,t)=>t.type==='income'?s+t.amount:t.type==='expense'?s-t.amount:s,0);
  chk('save_10k',net>=10000);
}
function renderBadges(containerId){
  const id=containerId||'ach-badge-grid';
  const el=document.getElementById(id);if(!el)return;
  el.innerHTML=BADGES_DEF.map(b=>{const e=S.earnedBadges.includes(b.id);return`<div class="badge ${e?'earned':''}" title="${b.desc||''}">${e?'<div class="badge-earned-dot"></div>':''}<div class="badge-icon-b">${b.icon}</div><div class="badge-name-b">${b.name}</div></div>`;}).join('');
}

/* ── ACHIEVEMENTS ──────────────────────────────── */
function renderAchievements(){
  renderQuests('ach');
  renderBadges('ach-badge-grid');
}

/* ── REPORTS ─────────────────────────────────────── */
function renderReports(){
  if(!document.getElementById('page-reports')?.classList.contains('active'))return;
  renderBudgetSettings();
  renderRecurringList();
  const now=new Date();
  const catTotals={};
  S.transactions.filter(t=>t.type==='expense').forEach(t=>{catTotals[t.cat]=(catTotals[t.cat]||0)+t.amount;});
  const pieCtx=document.getElementById('expense-pie');
  if(pieCtx&&Object.keys(catTotals).length){
    const labels=Object.keys(catTotals);
    const data=Object.values(catTotals);
    createChart('expense-pie',pieCtx.getContext('2d'),{
      type:'pie',
      data:{labels,datasets:[{data,backgroundColor:labels.map(l=>CATS[l]?.color||'#546E7A')}]},
      options:{plugins:{legend:{position:'bottom',labels:{font:{size:10}}}}}
    });
  }
  const lineCtx=document.getElementById('income-expense-line');
  if(lineCtx){
    const monthly={};
    S.transactions.forEach(t=>{
      const d=new Date(t.date);const m=d.getFullYear()+'-'+(d.getMonth()+1).toString().padStart(2,'0');
      if(!monthly[m])monthly[m]={income:0,expense:0};
      if(t.type==='income')monthly[m].income+=t.amount;
      else if(t.type==='expense')monthly[m].expense+=t.amount;
    });
    const labels2=Object.keys(monthly).sort();
    createChart('income-expense-line',lineCtx.getContext('2d'),{
      type:'line',
      data:{labels:labels2,datasets:[
        {label:'Income',data:labels2.map(m=>monthly[m].income),borderColor:'#138808',backgroundColor:'rgba(19,136,8,0.1)',fill:true,tension:0.3},
        {label:'Expense',data:labels2.map(m=>monthly[m].expense),borderColor:'#C62828',backgroundColor:'rgba(198,40,40,0.1)',fill:true,tension:0.3}
      ]},
      options:{plugins:{legend:{position:'bottom'}},scales:{y:{beginAtZero:true}}}
    });
  }
  let alerts='';
  Object.entries(S.budgets).forEach(([cat,limit])=>{
    const spent=S.transactions.filter(t=>t.type==='expense'&&t.cat===cat&&new Date(t.date).getMonth()===now.getMonth()).reduce((s,t)=>s+t.amount,0);
    if(spent>limit)alerts+=`<div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:0.5px solid var(--border)"><span style="font-size:16px">${CATS[cat]?.icon||'📦'}</span><span style="font-size:12px;flex:1">${cat}</span><span style="font-size:12px;font-weight:700;color:var(--ruby)">Overspent: ${fmt(spent)} / ${fmt(limit)}</span></div>`;
  });
  document.getElementById('spending-alerts').innerHTML=alerts||'<div style="font-size:12px;color:var(--text2);padding:8px 0">No budget alerts. 🎉 You\'re on track!</div>';
}

/* ── DASHBOARD ───────────────────────────────────── */
function renderDashboard(){
  const now=new Date();
  const mTx=S.transactions.filter(t=>{const d=new Date(t.date);return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();});
  const inc=mTx.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
  const spd=mTx.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  // FIX #10: clamp savings rate to 0% minimum (negative values are confusing)
  const sav=inc>0?Math.max(0,Math.round(((inc-spd)/inc)*100)):0;
  // FIX #11: compute all balances in ONE pass over transactions instead of O(n) per teammate
  const balMap={};
  S.teammates.forEach(tm=>{balMap[tm.id]=tm.initialBalance||0;});
  S.transactions.forEach(tx=>{
    if(tx.type==='expense'&&balMap[tx.teammateId]!=null)balMap[tx.teammateId]-=tx.amount;
    else if(tx.type==='income'&&balMap[tx.teammateId]!=null)balMap[tx.teammateId]+=tx.amount;
    else if(tx.type==='transfer'){
      if(balMap[tx.teammateId]!=null)balMap[tx.teammateId]-=tx.amount;
      if(balMap[tx.teammateToId]!=null)balMap[tx.teammateToId]+=tx.amount;
    }
  });
  const netWorth=Object.values(balMap).reduce((s,v)=>s+v,0);
  document.getElementById('d-networth').textContent=fmt(netWorth);
  document.getElementById('d-networth').style.color=netWorth>=0?'var(--green-d)':'var(--ruby)';
  document.getElementById('d-income').textContent=fmt(inc);
  document.getElementById('d-expenses').textContent=fmt(spd);
  document.getElementById('d-savings').textContent=sav+'%';
  document.getElementById('d-savings').style.color=sav>=30?'var(--green-d)':sav>=15?'var(--saffron)':'var(--ruby)';

  const today=new Date();
  const monday=new Date(today);monday.setDate(today.getDate()-((today.getDay()+6)%7));
  const dayL=['M','T','W','T','F','S','S'];
  document.getElementById('streak-row').innerHTML=dayL.map((_,i)=>{
    const d=new Date(monday);d.setDate(monday.getDate()+i);
    const ds=d.toISOString().split('T')[0];
    const td=today.toISOString().split('T')[0];
    const isDone=S.streakDays.includes(ds);
    const isTod=ds===td;
    return`<div class="streak-day ${isDone?'done':''} ${isTod&&!isDone?'today':''}">${dayL[i]}</div>`;
  }).join('');
  document.getElementById('streak-count').textContent=S.streak+' days';

  const ts=document.getElementById('d-team-snapshot');
  if(!S.teammates.length)ts.innerHTML='<div class="empty" style="padding:10px 0"><div class="empty-text">No accounts yet.</div></div>';
  // FIX #11: reuse balMap computed above — no extra O(n) pass per teammate
  else ts.innerHTML=S.teammates.map(tm=>{const bal=balMap[tm.id]||0;return`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:0.5px solid var(--border)"><div style="width:30px;height:30px;border-radius:8px;background:${tm.color}22;display:flex;align-items:center;justify-content:center;font-size:14px">${tm.icon}</div><div style="flex:1"><div style="font-size:13px;font-weight:600">${esc(tm.name)}</div><div style="font-size:10px;color:var(--text2)">${TM_TYPES[tm.type]||tm.type}</div></div><div style="font-family:var(--fh);font-size:14px;font-weight:700;color:${bal>=0?'var(--green-d)':'var(--ruby)'}">${fmt(bal)}</div></div>`;}).join('');

  const catTotals={};mTx.filter(t=>t.type==='expense').forEach(t=>{catTotals[t.cat]=(catTotals[t.cat]||0)+t.amount;});
  const total=Object.values(catTotals).reduce((s,v)=>s+v,0);
  const cb=document.getElementById('d-cat-breakdown');
  if(!total)cb.innerHTML='<div class="empty" style="padding:8px 0"><div class="empty-text">Add expenses to see breakdown</div></div>';
  else cb.innerHTML=Object.entries(catTotals).sort((a,b)=>b[1]-a[1]).map(([cat,amt])=>{
    const c=CATS[cat]||CATS.other;const pct=Math.round((amt/total)*100);
    const budget=S.budgets[cat];
    const budgetPct=budget?Math.min(100,Math.round((amt/budget)*100)):null;
    const barColor=budgetPct?(budgetPct>=100?'#C62828':budgetPct>=80?'#E65100':c.color):c.color;
    const overChip=budget&&amt>budget?`<span class="budget-over">Over budget!</span>`:'';
    return`<div style="margin-bottom:9px">
      <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px">
        <span>${c.icon} ${cat}${overChip}</span>
        <span style="font-weight:600">${fmt(amt)} <span style="color:var(--text2);font-weight:400">(${pct}%)</span>${budget?` of ${fmt(budget)} budget`:''}</span>
      </div>
      <div class="budget-bar"><div class="budget-bar-fill" style="width:${budgetPct||pct}%;background:${barColor}"></div></div>
    </div>`;
  }).join('');

  renderTxList('d-recent-txns',6);
  checkRecurring();
}

/* ── SCAN ────────────────────────────────────────── */
function scanEl(ctx,id){return document.getElementById(ctx+'-'+id);}

async function getScanAIResult({type,base64,mediaType}){
  const key=localStorage.getItem('grok_api_key')||window.GROK_API_KEY||window.ANTHROPIC_API_KEY;
  if(!key)throw new Error('No API key set. Set it in Settings.');

  if(window.GROK_API_KEY||localStorage.getItem('grok_api_key')){
    const url='https://api.grok.com/v1/completions';
    const body={
      model:'grok-1.5',
      messages:[{role:'user',content:'Extract merchant, amount, category (food|transport|shopping|entertainment|bills|health|education|investment|income|other), type (expense|income) and notes from this bill. Respond ONLY with JSON.'}],
      // NOTE: you're responsible for sending the invoice data; adjust to Grok specs.
    };
    // Grok payload may require different structure; this is a starting point.
    const resp=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},body:JSON.stringify(body)});
    if(!resp.ok){const e=await resp.json().catch(()=>({}));throw new Error(e.error?.message||'API error '+resp.status);}
    const json=await resp.json();
    const text=json.choices?.[0]?.message?.content||json.choices?.[0]?.text||'';
    return text;
  }
  // Fallback to Anthropic style if user set ANTHROPIC_API_KEY
  const anthKey=window.ANTHROPIC_API_KEY;
  if(anthKey){
    const block=type==='pdf'?{type:'document',source:{type:'base64',media_type:'application/pdf',data:base64}}:{type:'image',source:{type:'base64',media_type:mediaType,data:base64}};
    const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':anthKey},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:800,messages:[{role:'user',content:[block,{type:'text',text:'Analyze this Indian bill/receipt/invoice. Respond ONLY in JSON (no markdown, no backticks):\n{"merchant":"name","amount":number,"category":"food|transport|shopping|entertainment|bills|health|education|investment|income|other","type":"expense|income","notes":"one friendly insight"}\nRules: amount is a plain number. Use grand total.'}]}]})});
    if(!resp.ok){const e=await resp.json().catch(()=>({}));throw new Error(e.error?.message||'API error '+resp.status);}
    const data=await resp.json();
    const raw=data.content.filter(c=>c.type==='text').map(c=>c.text).join('');
    return raw;
  }
  throw new Error('No supported API key found (Grok or Anthropic)');
}

async function handleScan(event,ctx){
  const file=event.target.files[0];if(!file)return;
  if(file.size>5*1024*1024){toast('File too large (max 5MB)');event.target.value='';return;}
  const loading=scanEl(ctx,'scan-loading');
  const result=scanEl(ctx,'scan-result');
  const errorEl=scanEl(ctx,'scan-error');
  loading.style.display='block';
  result.style.display='none';
  errorEl.style.display='none';
  try{
    const base64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=()=>rej(new Error('File read failed'));r.readAsDataURL(file);});
    const isImg=file.type.startsWith('image/');
    const isPdf=file.type==='application/pdf';
    const bodyType=isPdf?'pdf':'image';
    const output=await getScanAIResult({type:bodyType,base64,mediaType:file.type});
    let parsed;
    try{parsed=JSON.parse(output.replace(/```json|```/g,'').trim());}
    catch(e){const m=output.match(/\{[\s\S]*\}/);if(m)parsed=JSON.parse(m[0]);else throw new Error('Could not parse response');}
    loading.style.display='none';
    result.style.display='block';
    scanEl(ctx,'s-title').value=parsed.merchant||'';
    scanEl(ctx,'s-amount').value=parsed.amount||'';
    if(parsed.category)scanEl(ctx,'s-cat').value=parsed.category;
    scanEl(ctx,'s-type').value=parsed.type||'expense';
    populateTmSelects();
    const notes=scanEl(ctx,'s-notes');
    if(parsed.notes){notes.textContent='💡 '+parsed.notes;notes.style.display='block';}else notes.style.display='none';
    S.scanCount++;checkBadges();persist();
  }catch(e){
    loading.style.display='none';
    const err=scanEl(ctx,'scan-error');err.textContent='Could not read: '+e.message;err.style.display='block';
  }
  event.target.value='';
}
function saveScan(ctx){
  const title=scanEl(ctx,'s-title').value.trim();
  const amount=parseFloat(scanEl(ctx,'s-amount').value)||0;
  const cat=scanEl(ctx,'s-cat').value;
  const type=scanEl(ctx,'s-type').value;
  const tmSel=scanEl(ctx,'s-teammate');
  const teammateId=tmSel&&tmSel.value?parseInt(tmSel.value):null;
  if(!title||amount<=0){toast('Fill in title and amount');return;}
  const td=todayStr();if(!S.streakDays.includes(td))S.streakDays.push(td);
  recalcStreak(); // FIX #6: proper streak recalc
  S.transactions.unshift({id:uid(),title,amount,type,cat,date:nowISO(),teammateId,fromScan:true}); // FIX #19: uid()
  addXP(25,'Invoice scanned & saved!');cancelScan(ctx);
  if(ctx==='modal')closeTxModal();
  showPage('transactions');persist();
}
function cancelScan(ctx){
  scanEl(ctx,'scan-result').style.display='none';
  scanEl(ctx,'scan-error').style.display='none';
  scanEl(ctx,'scan-loading').style.display='none';
}

/* ── SEED DATA ───────────────────────────────────── */
function seedDemoData(){
  S.teammates=[
    {id:1001,name:'SBI Savings',type:'bank',balance:80000,initialBalance:80000,color:'#1565C0',icon:'🏦'},
    {id:1002,name:'Cash wallet',type:'cash',balance:5000,initialBalance:5000,color:'#2E7D32',icon:'💵'},
    {id:1003,name:'HDFC Credit',type:'credit',balance:0,initialBalance:0,color:'#C62828',icon:'💳'},
  ];
  S.buildings=[
    {id:6001,name:'Goa Trip Fund',       cat:'house',     amount:18000, createdAt:nowISO()},
    {id:6002,name:'Zerodha Portfolio',   cat:'apartment', amount:85000, createdAt:nowISO()},
    {id:6003,name:'AWS Course',          cat:'school',    amount:12000, createdAt:nowISO()},
    {id:6004,name:'Emergency Fund',      cat:'bank',      amount:120000,createdAt:nowISO()},
    {id:6005,name:'Gym Membership',      cat:'gym',       amount:7500,  createdAt:nowISO()},
  ];
  const n=nowISO();
  S.transactions=[
    {id:2001,title:'Monthly salary',    amount:75000,type:'income', cat:'income',      date:n,teammateId:1001},
    {id:2002,title:'Swiggy dinner',     amount:480,  type:'expense',cat:'food',        date:n,teammateId:1003},
    {id:2003,title:'Petrol fill',       amount:1200, type:'expense',cat:'transport',   date:n,teammateId:1002},
    {id:2004,title:'Transfer to cash',  amount:3000, type:'transfer',cat:'other',      date:n,teammateId:1001,teammateToId:1002},
    {id:2005,title:'Electricity bill',  amount:1800, type:'expense',cat:'bills',       date:n,teammateId:1001},
    {id:2006,title:'Blinkit groceries', amount:2200, type:'expense',cat:'food',        date:n,teammateId:1003},
  ];
  S.recurringTx=[
    {id:5001,title:'Netflix',       amount:649,  cat:'entertainment',type:'expense',day:5, teammateId:1003},
    {id:5002,title:'SIP investment',amount:5000, cat:'investment',   type:'expense',day:1, teammateId:1001},
  ];
  S.budgets={food:5000,transport:2000,entertainment:1500};
  S.xp=180;S.streak=3;S.streakDays=[todayStr()];
}

/* ── BOOT ─────────────────────────────────────────── */
hydrate();
recalcStreak(); // FIX #6: recalculate streak from streakDays on every load so gaps reset it
if(!S.hasOnboarded){
  document.getElementById('onboard-overlay').style.display='flex';
} else {
  renderDashboard();
  checkBadges();
}
updateXPDisplay();

setInterval(()=>{
  const now=new Date();
  const el=document.getElementById('header-time');
  if(el)el.textContent=now.toLocaleDateString('en-IN',{day:'numeric',month:'short'})+' '+now.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
},1000);
(()=>{const now=new Date();const el=document.getElementById('header-time');if(el)el.textContent=now.toLocaleDateString('en-IN',{day:'numeric',month:'short'})+' '+now.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});})();

// Register service worker for PWA/offline support
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js').then(()=>console.log('SW registered')).catch(()=>{console.warn('SW registration failed');});
}
