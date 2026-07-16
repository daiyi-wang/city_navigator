import { cityMap } from './data/map.js';
import { missions, levels } from './data/missions.js';
import { RouteEngine } from './game/RouteEngine.js';
import { CharacterController } from './game/CharacterController.js';
import { DirectionParser } from './game/DirectionParser.js';
import { ScoreManager } from './game/ScoreManager.js';
import { ProgressStorage } from './services/storage.js';
import { SpeechService, SpeechRecognitionService } from './services/speech.js';

const app=document.querySelector('#app');
const announcer=document.querySelector('#announcer');
const route=new RouteEngine(cityMap);
const character=new CharacterController(route);
const parser=new DirectionParser();
const scorer=new ScoreManager();
const storage=new ProgressStorage();
const speech=new SpeechService();
const recognition=new SpeechRecognitionService();
const SETTINGS_KEY='cityNavigator.settings.v1';
const defaultSettings={speed:'slow',sound:true,music:false,autoPlay:true,replays:'2',captions:false,speechEnabled:true,animation:'normal',tutorialSeen:false};
const loadSettings=()=>{try{return {...defaultSettings,...JSON.parse(localStorage.getItem(SETTINGS_KEY)||'{}')};}catch{return {...defaultSettings};}};
const state={screen:'home',mode:null,level:1,mission:null,session:[],sessionIndex:0,stepIndex:0,settings:loadSettings(),feedback:null,hintLevel:0,showCaption:false,transcript:'',listening:false,busy:false,moving:false,lastAction:null,missionComplete:false,visitedSegments:[],sessionResults:[],tutorialStep:0,returnScreen:'home'};

const escapeHTML=value=>String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const announce=text=>{announcer.textContent='';setTimeout(()=>{announcer.textContent=text;},20);};
const saveSettings=()=>{try{localStorage.setItem(SETTINGS_KEY,JSON.stringify(state.settings));}catch{}speech.rate=state.settings.speed==='slow'?.72:1;};
saveSettings();

function topbar(){
  const playing=state.screen==='game';
  return `<header class="topbar"><div class="brand"><span class="brand-mark" aria-hidden="true">➤</span><div><strong>City Navigator</strong><small>Listen, Speak, and Find the Way!</small></div></div>${playing?`<span class="status-pill">${state.mode==='speaking'?'Speaking':'Listening'} Mode</span><span class="status-pill">Level ${state.level} · Mission ${state.sessionIndex+1} of ${state.session.length}</span><span class="status-pill" aria-label="目前星級">${'★'.repeat(scorer.stars())}</span>`:''}<button class="icon-btn" data-action="open-settings" aria-label="開啟設定">⚙ Settings</button>${state.screen!=='home'?'<button class="text-btn" data-action="home">⌂ Home</button>':''}</header>`;
}

function render(){
  let content='';
  if(state.screen==='home')content=homeView();
  if(state.screen==='modeSelection')content=levelView();
  if(state.screen==='game')content=gameView();
  if(state.screen==='results')content=resultsView();
  if(state.screen==='progress')content=progressView();
  if(state.screen==='settings')content=settingsView();
  app.innerHTML=`<div class="shell">${topbar()}${content}</div>${state.screen==='tutorial'?tutorialModal():''}${state.missionComplete?missionCompleteModal():''}`;
  bindEvents();
}

function homeView(){
  const progress=storage.load();
  const hasMistakes=Object.keys(progress.wrongPatterns).length>0;
  return `<section class="home"><div class="hero"><div class="hero-copy"><span class="eyebrow">城市英語導航挑戰</span><h1>Find your way.<br>Say it in English.</h1><p>聽懂方向、勇敢開口，在 Sunny Town 完成你的第一趟導航任務。</p></div><div class="hero-map" aria-hidden="true"><div class="mini-road h"></div><div class="mini-road v"></div><div class="mini-place a">PARK</div><div class="mini-place b">SCHOOL</div><div class="mini-person">➤</div></div></div><div class="home-grid"><button class="mode-card primary" data-mode="listening"><span class="card-icon" aria-hidden="true">◖))</span><h2>Listening Mode</h2><p>聽英文指令，按方向鍵帶人物走過城市。</p><span class="arrow">→</span></button><button class="mode-card primary" data-mode="speaking"><span class="card-icon" aria-hidden="true">●</span><h2>Speaking Mode</h2><p>說出一句英文指令，用你的聲音導航。</p><span class="arrow">→</span></button><button class="mode-card" data-action="practice" ${hasMistakes?'':'aria-describedby="no-mistakes"'}><span class="card-icon">↻</span><h2>Practice Mistakes</h2><p id="no-mistakes">${hasMistakes?'重新練習需要加強的句型。':'完成一題後，錯題會出現在這裡。'}</p></button><button class="mode-card" data-action="progress"><span class="card-icon">◒</span><h2>Progress</h2><p>${progress.completedMissions.length} missions · ${progress.totalStars} stars</p></button><button class="mode-card" data-action="tutorial"><span class="card-icon">?</span><h2>How to Play</h2><p>兩分鐘了解轉向與前進。</p></button><button class="mode-card" data-action="open-settings"><span class="card-icon">⚙</span><h2>Settings</h2><p>調整語速、字幕與重播次數。</p></button></div></section>`;
}

function levelView(){
  const available=levels.filter(item=>state.mode==='listening'||item.level!==3);
  return `<section class="panel-screen"><span class="eyebrow" style="color:var(--teal)">${state.mode==='speaking'?'Speaking Mode':'Listening Mode'}</span><h1 class="screen-title">Choose a level</h1><p class="screen-lead">從清楚的單一步驟開始，逐步走到完整城市導航。</p><div class="level-grid">${available.map(item=>`<button class="level-card" data-level="${item.level}"><span class="level-no">0${item.level}</span><strong>${item.name}</strong><small>${item.note}</small></button>`).join('')}</div></section>`;
}

function nextAvailableLevel(currentLevel=state.level){
  return levels.find(item=>item.level>currentLevel&&(state.mode==='listening'||item.level!==3)&&missions.some(mission=>mission.level===item.level&&(state.mode==='speaking'?mission.mode==='speaking':mission.mode!=='speaking')))?.level??null;
}

function buildingIcon(placeId){
  const icons={
    police:'<path d="M12 25V11l20-8 20 8v14M17 25v31h30V25"/><path d="m32 29 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/>',
    school:'<path d="M8 25 32 8l24 17M13 24v32h38V24M27 56V39h10v17"/><path d="M39 13V3h12l-4 5 4 5Z"/>',
    park:'<path d="M13 55h38M22 55V38M42 55V34"/><path d="M22 11c-8 0-13 7-9 14-6 5-2 15 7 15h5c9 0 13-10 7-15 3-7-2-14-10-14ZM42 7c-7 0-11 6-8 12-5 5-1 14 7 14h4c8 0 12-9 7-14 2-6-3-12-10-12Z"/>',
    bakery:'<path d="M9 25h46v31H9zM7 25l5-15h40l5 15"/><path d="M17 25v-6m10 6v-6m10 6v-6m10 6v-6M21 47c0-8 5-13 11-13s11 5 11 13c-7-3-15-3-22 0Z"/>',
    'post-office':'<path d="M9 17h46v38H9z"/><path d="m11 20 21 18 21-18M11 52l16-18m26 18L37 34"/>',
    restaurant:'<path d="M16 7v18c0 5 4 8 8 8V57M8 7v12c0 4 3 7 8 7s8-3 8-7V7M44 57V8c8 4 11 15 5 24h-5"/>',
    bookstore:'<path d="M7 13c10-3 19 0 25 7v37c-6-7-15-10-25-7ZM57 13c-10-3-19 0-25 7v37c6-7 15-10 25-7Z"/><path d="M14 22c5-1 9 1 13 4m-13 7c5-1 9 1 13 4m23-15c-5-1-9 1-13 4m13 7c-5-1-9 1-13 4"/>',
    'fire-station':'<path d="M8 22h48v34H8zM13 22 32 8l19 14M18 56V32h28v24"/><path d="M27 47c-5-7 2-10 3-17 7 5 10 11 6 17-2 4-7 4-9 0Z"/>',
    mall:'<path d="M12 20h40l-4 37H16Z"/><path d="M23 25v-8c0-6 4-10 9-10s9 4 9 10v8M23 39h18"/>',
    'department-store':'<path d="M7 20h50M11 20v36h42V20M6 56h52M14 9h36l7 11H7Z"/><path d="M20 27v21m12-21v21m12-21v21"/>'
  };
  return `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">${icons[placeId]||icons.mall}</svg>`;
}

function landmarkMarker(type){
  if(type==='trafficLight')return `<span class="landmark landmark-light" aria-label="Traffic light"><svg viewBox="0 0 40 50" aria-hidden="true"><rect x="10" y="2" width="20" height="34" rx="7"/><circle class="light-red" cx="20" cy="10" r="4"/><circle class="light-yellow" cx="20" cy="19" r="4"/><circle class="light-green" cx="20" cy="28" r="4"/><path d="M20 36v10M13 46h14"/></svg><small>LIGHT</small></span>`;
  if(type==='busStop')return `<span class="landmark landmark-bus" aria-label="Bus stop"><svg viewBox="0 0 46 50" aria-hidden="true"><rect x="6" y="3" width="31" height="29" rx="5"/><path d="M11 23h21M13 11h17l2 12H11Zm2 21v7m16-7v7M37 8h4v38M10 46h34"/><circle cx="14" cy="28" r="2"/><circle cx="29" cy="28" r="2"/></svg><small>BUS STOP</small></span>`;
  return `<span class="landmark landmark-stop" aria-label="Stop sign"><svg viewBox="0 0 42 50" aria-hidden="true"><path d="m12 3 17 0 10 10v17L29 40H12L2 30V13Z"/><path d="M21 40v7M13 47h16"/></svg><small>STOP</small></span>`;
}

function mapView(){
  const current=route.node(character.currentNodeId);
  const start=route.node(state.mission.startNodeId);
  const destination=route.node(state.mission.destinationNodeId);
  const showDestination=state.mission.steps?.some(item=>item.intent.action==='move')||(state.mission.mode==='findPlace'&&state.feedback?.type==='success');
  const angle={north:0,east:90,south:180,west:270}[character.facing];
  const hRoads=[17,39,61,83].map(y=>`<div class="road h" style="top:${y}%"></div>`).join('');
  const vRoads=[14,38,62,86].map(x=>`<div class="road v" style="left:${x}%"></div>`).join('');
  const nodes=cityMap.nodes.map(node=>`${node.type==='arrival'?(node.id===state.mission.destinationNodeId?`<span class="arrival-node" style="left:${node.x}%;top:${node.y}%" aria-hidden="true"></span>`:''):`<span class="node" style="left:${node.x}%;top:${node.y}%" aria-hidden="true"></span>`}${node.landmark?`<span class="landmark-position" style="left:${node.x-4}%;top:${node.y-5}%">${landmarkMarker(node.landmark)}</span>`:''}`).join('');
  const places=cityMap.places.map(place=>`<button class="place ${state.mission.mode==='findPlace'?'selectable':''} ${place.id===state.mission.targetPlaceId&&state.feedback?.type==='success'?'target':''} ${state.mission.mode==='findPlace'&&state.hintLevel>=2&&place.id===state.mission.relation?.referencePlaceId?'reference':''}" style="left:${place.x===4?6.5:place.x+8}%;top:${place.y===4?5.5:place.y+4}%;--place-color:${place.color}" data-place="${place.id}" aria-label="${place.name}" ${state.mission.mode==='findPlace'?'':`tabindex="-1" aria-hidden="true"`}><span class="place-icon">${buildingIcon(place.id)}</span><span class="place-name">${place.name}</span></button>`).join('');
  const segments=state.visitedSegments.map(segment=>{const a=route.node(segment.from),b=route.node(segment.to);const dx=b.x-a.x,dy=b.y-a.y;const length=Math.sqrt(dx*dx+dy*dy);const angle=Math.atan2(dy,dx)*180/Math.PI;return `<span class="route-segment" style="left:${a.x}%;top:${a.y}%;width:${length}%;transform:rotate(${angle}deg)"></span>`;}).join('');
  return `<section class="map-card"><div class="map-header"><h2>Sunny Town</h2><span class="compass">N ↑ · Facing ${character.facing}${state.mission.targetFacing?` · Target ${state.mission.targetFacing}`:''}</span></div><div class="city-map" aria-label="Sunny Town 城市地圖，人物目前面向 ${character.facing}">${hRoads}${vRoads}${nodes}${places}${segments}<span class="start-marker" style="left:${start.x}%;top:${start.y}%">START</span>${showDestination?`<span class="destination-marker" style="left:${destination.x}%;top:${destination.y}%">GOAL</span>`:''}<div class="character ${state.moving?'walking':''} ${state.feedback?.type==='success'&&!state.missionComplete&&state.lastAction!=='turn'?'success':''}" style="left:${current.x}%;top:${current.y}%" aria-label="人物位於 ${current.id}，面向 ${character.facing}"><div class="character-body" style="transform:rotate(${angle}deg)">☺</div></div></div></section>`;
}

function feedbackView(){
  if(!state.feedback){const ready=state.mission?.mode==='findPlace'?'Play the clue, then choose a building.':'Listen carefully, then choose one action.';return `<div class="feedback" role="status"><span>◎</span><div><strong>Ready?</strong>${ready}</div></div>`;}
  const cls=state.feedback.type==='success'?'good':'try';
  return `<div class="feedback ${cls}" role="status"><span>${state.feedback.type==='success'?'✓':'○'}</span><div><strong>${escapeHTML(state.feedback.title)}</strong>${escapeHTML(state.feedback.message)}</div></div>`;
}

function controlView(){
  const mission=state.mission;
  const expected=mission.steps?.[state.stepIndex];
  const instruction=mission.mode==='findPlace'?mission.instruction:expected?.instruction||'Mission complete!';
  const captionVisible=state.settings.captions||state.showCaption;
  const dots=mission.steps?.map((_,index)=>`<i class="step-dot ${index<state.stepIndex?'done':index===state.stepIndex?'current':''}"></i>`).join('')||'';
  const destinationPlace=cityMap.places.find(place=>place.arrivalNodeId===mission.destinationNodeId||place.nodeId===mission.destinationNodeId);
  const destinationCopy=destinationPlace&&mission.steps?.some(item=>item.intent.action==='move')?`<p class="destination-copy"><span>Destination</span><strong>${destinationPlace.name}</strong></p>`:'';
  const disabled=state.busy?'disabled aria-disabled="true"':'';
  const directionButtons=`<button class="action-btn" data-command="move:straight" ${disabled}><span class="symbol">↑</span>Go Straight</button><button class="action-btn" data-command="stop:stop" ${disabled}><span class="symbol">■</span>Stop</button><button class="action-btn" data-command="turn:left" ${disabled}><span class="symbol">↰</span>Turn Left</button><button class="action-btn" data-command="turn:right" ${disabled}><span class="symbol">↱</span>Turn Right</button>`;
  const main=mission.mode==='findPlace'?`<div class="instruction-card ${captionVisible?'':'hidden-text'}"><span class="instruction-label">Listening clue</span><span class="instruction-text">${escapeHTML(instruction)}</span></div><div class="control-grid"><button class="play-btn" data-action="play">▶ Play listening clue</button></div><p class="mission-goal">Listen to the position words, then tap the correct building. The answer name is not spoken.</p>`:`<div class="instruction-card ${captionVisible?'':'hidden-text'}"><span class="instruction-label">Current instruction</span><span class="instruction-text">${escapeHTML(instruction)}</span></div>${mission.mode==='speaking'?`<div class="control-grid"><button class="mic-btn ${state.listening?'listening':''}" data-action="listen" ${state.listening?'disabled':''}>${state.listening?'● Listening…':'● Start Speaking'}</button>${state.transcript?`<div class="instruction-card" style="grid-column:1/-1"><span class="instruction-label">I heard</span><span class="instruction-text">“${escapeHTML(state.transcript)}”</span></div>`:''}${directionButtons}</div>`:`<div class="control-grid"><button class="play-btn" data-action="play">▶ Play instruction</button>${directionButtons}</div>`}`;
  return `<aside class="control-panel"><div class="mission-kicker"><span>MISSION ${state.sessionIndex+1}</span><span>LEVEL ${mission.level}</span></div><h1 class="mission-title">${escapeHTML(mission.title)}</h1><p class="mission-goal">${mission.mode==='speaking'?'Guide the navigator to the goal, one sentence at a time.':mission.mode==='findPlace'?'Listen to the location clue and find the building.':'Follow each clue and use landmarks to reach the building.'}</p>${destinationCopy}<div class="step-dots" aria-label="任務步驟進度">${dots}</div>${main}${feedbackView()}<div class="minor-actions">${mission.mode!=='findPlace'?'<button data-action="replay">↻ Listen Again</button>':''}<button data-action="hint">✦ Hint ${state.hintLevel}/4</button></div>${mission.mode==='speaking'&&!recognition.supported()?'<p class="mission-goal" role="status">This browser cannot use speech recognition. Use the direction buttons instead.</p>':''}</aside>`;
}

function gameView(){return `<div class="game-shell">${mapView()}${controlView()}</div>`;}

function resultsView(){
  const results=state.sessionResults;
  const totalStars=results.reduce((sum,item)=>sum+item.stars,0);
  const correct=results.reduce((sum,item)=>sum+item.correct,0);
  const total=results.reduce((sum,item)=>sum+item.total,0);
  const hints=results.reduce((sum,item)=>sum+item.hints,0);
  const replays=results.reduce((sum,item)=>sum+item.replays,0);
  const mistakes=[...new Set(results.flatMap(item=>item.mistakes))];
  const nextLevel=nextAvailableLevel();
  const continueAction=nextLevel?`<button class="primary-btn next-level-btn" data-action="next-level">Continue to Level ${nextLevel} →</button>`:`<button class="primary-btn" data-action="home">All Levels Complete · Home</button>`;
  return `<section class="panel-screen"><span class="eyebrow" style="color:var(--teal)">Level ${state.level} complete</span><h1 class="screen-title">Great job!</h1><p class="screen-lead">You completed ${results.length} mission${results.length===1?'':'s'} in Level ${state.level}.</p><div class="result-stars" aria-label="獲得 ${totalStars} 顆星">${'★'.repeat(totalStars)}${'☆'.repeat(Math.max(0,results.length*3-totalStars))}</div><div class="stats-grid"><div class="stat"><strong>${results.length}</strong><span>Missions</span></div><div class="stat"><strong>${total?Math.round(correct/total*100):100}%</strong><span>${state.mode==='speaking'?'Speaking':'Listening'} Accuracy</span></div><div class="stat"><strong>${hints}</strong><span>Hints Used</span></div><div class="stat"><strong>${replays}</strong><span>Listen Again</span></div><div class="stat"><strong>${totalStars}</strong><span>Total Stars</span></div></div><h2>You need more practice with:</h2>${mistakes.length?`<ul class="mistake-list">${mistakes.map(item=>`<li>${escapeHTML(item)}</li>`).join('')}</ul>`:'<p>No mistakes this time. Excellent navigation!</p>'}<div class="button-row"><button class="secondary-btn" data-action="practice">Practice Mistakes</button><button class="secondary-btn" data-action="play-again">Play Level ${state.level} Again</button>${nextLevel?'<button class="secondary-btn" data-action="home">Back to Home</button>':''}${continueAction}</div></section>`;
}

function missionCompleteModal(){
  const next=state.session[state.sessionIndex+1];
  const result=state.sessionResults[state.sessionResults.length-1];
  const outcome=state.mission.targetFacing?`Now facing ${character.facing}.`:`You reached the goal.`;
  return `<div class="modal-backdrop"><section class="modal mission-complete-modal" role="dialog" aria-modal="true" aria-labelledby="mission-complete-title"><div class="mission-complete-badge" aria-hidden="true">✓</div><span class="eyebrow" style="color:var(--teal)">Mission ${state.sessionIndex+1} complete</span><h1 id="mission-complete-title" class="screen-title">Great navigation!</h1><p class="screen-lead">${outcome} You earned ${result?.stars||1} star${result?.stars===1?'':'s'}.</p><div class="next-mission-preview"><span>Up next</span><strong>${escapeHTML(next?.title||'Route complete')}</strong></div><div class="button-row"><button class="secondary-btn" data-action="home">End Session</button><button class="primary-btn" data-action="next-mission">Next Mission</button></div></section></div>`;
}

function progressView(){
  const data=storage.load();const listening=data.listening.total?Math.round(data.listening.correct/data.listening.total*100):0;const speaking=data.speaking.total?Math.round(data.speaking.correct/data.speaking.total*100):0;const mistakes=Object.entries(data.wrongPatterns).sort((a,b)=>b[1]-a[1]);
  return `<section class="panel-screen"><span class="eyebrow" style="color:var(--teal)">Learning record</span><h1 class="screen-title">Your progress</h1><p class="screen-lead">每一次導航，都讓你的方向英語更可靠。</p><div class="stats-grid"><div class="stat"><strong>${data.completedMissions.length}</strong><span>Completed Missions</span></div><div class="stat"><strong>${data.totalStars}</strong><span>Total Stars</span></div><div class="stat"><strong>${listening}%</strong><span>Listening Accuracy</span></div><div class="stat"><strong>${speaking}%</strong><span>Speaking Accuracy</span></div></div><h2>Practice focus</h2>${mistakes.length?`<div class="progress-list">${mistakes.map(([phrase,count])=>`<div class="progress-row"><span>${escapeHTML(phrase)}</span><strong>${count}×</strong></div>`).join('')}</div>`:'<div class="empty">完成一些任務後，系統會在這裡整理需要加強的句型。</div>'}<div class="button-row"><button class="secondary-btn" data-action="practice">Practice Mistakes</button><button class="primary-btn" data-action="home">Back to Home</button></div></section>`;
}

function settingsView(){
  const s=state.settings;const row=(title,note,control)=>`<div class="setting"><label><strong>${title}</strong><small>${note}</small></label>${control}</div>`;const toggle=(key,label)=>`<button class="toggle ${s[key]?'on':''}" data-setting-toggle="${key}" aria-pressed="${s[key]}">${s[key]?'On':'Off'}<span class="sr-only"> ${label}</span></button>`;
  return `<section class="panel-screen"><span class="eyebrow" style="color:var(--teal)">Make it yours</span><h1 class="screen-title">Settings</h1><div class="settings-grid">${row('Voice speed','英文指令的播放速度',`<select data-setting="speed"><option value="slow" ${s.speed==='slow'?'selected':''}>Slow</option><option value="normal" ${s.speed==='normal'?'selected':''}>Normal</option></select>`)}${row('Sound effects','正確與提示音效',toggle('sound','音效'))}${row('Background music','安靜的背景音樂',toggle('music','背景音樂'))}${row('Auto-play instruction','每一步自動播放英文',toggle('autoPlay','自動播放'))}${row('Listen Again limit','每題可重播次數',`<select data-setting="replays"><option value="unlimited" ${s.replays==='unlimited'?'selected':''}>Unlimited</option>${[1,2,3].map(n=>`<option value="${n}" ${String(n)===s.replays?'selected':''}>${n} time${n>1?'s':''}</option>`).join('')}</select>`)}${row('English captions','預設顯示英文句子',toggle('captions','英文字幕'))}${row('Speaking Mode','啟用麥克風語音模式',toggle('speechEnabled','語音模式'))}${row('Animation speed','人物移動速度',`<select data-setting="animation"><option value="normal" ${s.animation==='normal'?'selected':''}>Normal</option><option value="fast" ${s.animation==='fast'?'selected':''}>Fast</option></select>`)}${row('Tutorial','重新觀看操作教學','<button class="secondary-btn" data-action="tutorial">View tutorial</button>')}${row('Learning record','清除所有星星與錯題紀錄','<button class="secondary-btn" data-action="reset-progress">Reset progress</button>')}</div><div class="button-row"><button class="primary-btn" data-action="settings-done">Done</button></div></section>`;
}

const tutorialPages=[
  {icon:'☺<span style="transform:rotate(0deg)">▲</span>',title:'Facing matters',text:'人物頭上的箭頭代表目前面向。左轉與右轉要從人物的角度判斷。'},
  {icon:'↰　↱',title:'Turn changes facing',text:'Turn left 與 Turn right 只會旋轉人物，不會前進。'},
  {icon:'↑',title:'Go straight moves',text:'Go straight 才會沿目前面向走到下一個道路節點。'},
  {icon:'◖))　●',title:'Listen or speak',text:'可以重播聽力指令。口語模式需要允許麥克風；若無法使用，方向按鈕永遠可用。'}
];
function tutorialModal(){const page=tutorialPages[state.tutorialStep];return `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="tutorial-title"><span class="eyebrow" style="color:var(--teal)">Quick tutorial ${state.tutorialStep+1}/${tutorialPages.length}</span><h1 id="tutorial-title" class="screen-title">${page.title}</h1><div class="tutorial-visual" aria-hidden="true">${page.icon}</div><p class="screen-lead">${page.text}</p><div class="dots">${tutorialPages.map((_,i)=>`<i class="${i===state.tutorialStep?'active':''}"></i>`).join('')}</div><div class="button-row"><button class="secondary-btn" data-action="skip-tutorial">Skip</button><button class="primary-btn" data-action="next-tutorial">${state.tutorialStep===tutorialPages.length-1?'Start exploring':'Next'}</button></div></section></div>`;}

function selectMode(mode){state.mode=mode;if(mode==='speaking'&&!state.settings.speechEnabled){state.returnScreen='home';state.screen='settings';render();return;}state.screen='modeSelection';render();}
function startSession(level,customMissions=null){state.level=level;let pool=customMissions||missions.filter(item=>item.level===level&&(state.mode==='speaking'?item.mode==='speaking':item.mode!=='speaking'));state.session=pool.slice(0,3);if(!state.session.length){state.screen='home';render();return;}state.sessionIndex=0;state.sessionResults=[];state.screen='game';loadMission();}
function loadMission(){state.mission=state.session[state.sessionIndex];state.stepIndex=0;state.feedback=null;state.hintLevel=0;state.showCaption=false;state.transcript='';state.busy=false;state.moving=false;state.lastAction=null;state.missionComplete=false;state.visitedSegments=[];scorer.reset();character.reset(state.mission.startNodeId,state.mission.startFacing);render();if(state.settings.autoPlay&&state.mission.mode!=='findPlace')setTimeout(()=>playInstruction(false),250);}
function intentsMatch(actual,expected){return actual&&actual.action===expected.action&&(expected.direction?actual.direction===expected.direction:true);}

function animateCharacterPath(nodeIds,duration){
  const element=document.querySelector('.character');
  if(!element||nodeIds.length<2||duration===0)return Promise.resolve();
  const points=nodeIds.map(nodeId=>route.node(nodeId));
  const segmentCount=points.length-1;
  return new Promise(resolve=>{
    let startedAt=null;
    const tick=timestamp=>{
      if(!element.isConnected){resolve();return;}
      if(startedAt===null)startedAt=timestamp;
      const progress=Math.min(1,(timestamp-startedAt)/duration);
      const routeProgress=progress*segmentCount;
      const segment=Math.min(segmentCount-1,Math.floor(routeProgress));
      const localProgress=progress===1?1:routeProgress-segment;
      const from=points[segment],to=points[segment+1];
      element.style.left=`${from.x+(to.x-from.x)*localProgress}%`;
      element.style.top=`${from.y+(to.y-from.y)*localProgress}%`;
      if(progress<1)requestAnimationFrame(tick);else resolve();
    };
    requestAnimationFrame(tick);
  });
}

function animateCharacterTurn(fromFacing,direction,duration){
  const element=document.querySelector('.character-body');
  if(!element||duration===0)return Promise.resolve();
  const base={north:0,east:90,south:180,west:270}[fromFacing];
  const delta=direction==='left'?-90:90;
  element.style.transition='none';
  return new Promise(resolve=>{
    let startedAt=null;
    const tick=timestamp=>{
      if(!element.isConnected){resolve();return;}
      if(startedAt===null)startedAt=timestamp;
      const progress=Math.min(1,(timestamp-startedAt)/duration);
      element.style.transform=`rotate(${base+delta*progress}deg)`;
      if(progress<1)requestAnimationFrame(tick);else resolve();
    };
    requestAnimationFrame(tick);
  });
}

function handleCommand(intent,fromFallback=false){
  const expected=state.mission.steps?.[state.stepIndex];if(!expected||state.busy)return;
  if(fromFallback&&state.mission.mode==='speaking')scorer.usedFallback=true;
  if(!intentsMatch(intent,expected.intent)){registerError(expected.instruction,intent.action==='move'&&!route.forward(character.currentNodeId,character.facing)?'You can’t go that way. Try another direction.':'Try again. Listen for the key direction word.');return;}
  if(expected.intent.landmarkType&&!route.hasLandmark(character.currentNodeId,expected.intent.landmarkType)){registerError(expected.instruction,'Look for the correct landmark before you turn.');return;}
  const before=character.currentNodeId;const facingBefore=character.facing;const result=character.execute(expected.intent);
  if(!result.ok){registerError(expected.instruction,'You can’t go that way. Try another direction.');return;}
  if(result.path?.length){let from=before;for(const to of result.path){state.visitedSegments.push({from,to});from=to;}}
  const pathNodes=[before,...(result.path||[])];
  const reducedMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const blockDuration=state.settings.animation==='fast'?650:1100;
  const duration=result.type==='move'&&!reducedMotion?Math.max(1,result.path.length)*blockDuration:result.type==='turn'&&!reducedMotion?420:160;
  state.busy=true;state.moving=result.type==='move'&&duration>0;
  state.lastAction=result.type;
  state.feedback={type:'success',title:state.moving?'On the way…':'Great!',message:expected.instruction};state.stepIndex+=1;announce(`Correct. ${expected.instruction}`);playTone(true);render();
  const finish=()=>{state.busy=false;state.moving=false;if(state.feedback?.type==='success')state.feedback.title='Great!';render();if(state.stepIndex>=state.mission.steps.length){setTimeout(completeMission,350);}else if(state.settings.autoPlay){setTimeout(()=>playInstruction(false),250);}};
  if(result.type==='move'&&duration>0){requestAnimationFrame(()=>animateCharacterPath(pathNodes,duration).then(finish));}else if(result.type==='turn'&&!reducedMotion){requestAnimationFrame(()=>animateCharacterTurn(facingBefore,expected.intent.direction,duration).then(finish));}else{setTimeout(finish,duration);}
}
function registerError(phrase,message){scorer.errors+=1;state.feedback={type:'error',title:scorer.errors>=3?'Let’s solve it together.':'Try again.',message};announce(state.feedback.title+' '+message);playTone(false);if(scorer.errors===2){speech.speak(state.mission.steps[state.stepIndex].instruction,{slow:true});state.showCaption=true;}if(scorer.errors>=3){state.showCaption=true;state.hintLevel=Math.max(state.hintLevel,4);}render();}
function selectPlace(placeId){if(state.mission.mode!=='findPlace')return;if(placeId!==state.mission.targetPlaceId){registerError(state.mission.instruction,'Look at the place names and try once more.');return;}character.currentNodeId=state.mission.destinationNodeId;state.feedback={type:'success',title:'You found it!',message:state.mission.instruction};announce('Correct place. '+state.mission.instruction);playTone(true);render();setTimeout(completeMission,700);}
function playInstruction(countReplay=true){const item=state.mission.mode==='findPlace'?state.mission.instruction:state.mission.steps?.[state.stepIndex]?.instruction;if(!item)return;if(countReplay){const limit=state.settings.replays;if(limit!=='unlimited'&&scorer.replays>=Number(limit)){state.feedback={type:'error',title:'Replay limit reached',message:'Use a hint or make your best choice.'};render();return;}scorer.replays+=1;}const ok=speech.speak(item,{slow:state.settings.speed==='slow'});if(!ok){state.feedback={type:'error',title:'Voice unavailable',message:'Read the hint or continue with the buttons.'};render();}}
function showHint(){scorer.hints+=1;state.hintLevel=Math.min(4,state.hintLevel+1);const isPlace=state.mission.mode==='findPlace';const expected=isPlace?{instruction:state.mission.instruction,intent:{}}:state.mission.steps[state.stepIndex];const relation=state.mission.relation?.type==='nextTo'?'next to':'across from';const reference=cityMap.places.find(place=>place.id===state.mission.relation?.referencePlaceId)?.name;const landmarkName={trafficLight:'traffic light',busStop:'bus stop',stopSign:'stop sign'}[expected.intent.landmarkType];const hints=isPlace?[`Listen for “${relation}”.`,`Find ${reference}, then check the place ${relation} it.`,expected.instruction.replace(new RegExp(relation,'i'),'___'),expected.instruction]:[expected.intent.direction?`Listen for “${expected.intent.direction}”.`:'Look carefully at the place names.',landmarkName?`Look for the ${landmarkName}.`:'Use the goal marker on the map.',expected.instruction.replace(/left|right|straight|stop/i,'___'),expected.instruction];state.feedback={type:'error',title:`Hint ${state.hintLevel}`,message:hints[state.hintLevel-1]};if(state.hintLevel>=3)state.showCaption=true;if(state.hintLevel===4)speech.speak(expected.instruction,{slow:true});announce(state.feedback.title+' '+state.feedback.message);render();}

async function listen(){if(!recognition.supported()){state.feedback={type:'error',title:'Microphone unavailable',message:'Use the direction buttons instead.'};scorer.usedFallback=true;render();return;}state.listening=true;state.feedback={type:'success',title:'Listening…',message:'Say one direction in English.'};render();try{const text=await recognition.listen();state.listening=false;state.transcript=text;const intent=parser.parse(text);if(!intent){state.feedback={type:'error',title:'I couldn’t hear you clearly.',message:'Please try again. You can also use the buttons.'};render();return;}handleCommand(intent,false);}catch(error){state.listening=false;state.feedback={type:'error',title:'I couldn’t hear you clearly.',message:'Please try again, or use the buttons instead.'};render();}}
function completeMission(){
  const mission=state.mission;const expectedTotal=mission.steps?.length||1;const result={id:mission.id,mode:mission.mode==='speaking'?'speaking':'listening',stars:scorer.stars(),correct:expectedTotal,total:expectedTotal+scorer.errors,hints:scorer.hints,replays:scorer.replays,mistakes:scorer.errors||scorer.hints>=4?[mission.instruction||mission.steps?.[Math.min(state.stepIndex,mission.steps.length-1)]?.instruction||mission.title]:[]};storage.record(result);state.sessionResults.push(result);if(state.sessionIndex<state.session.length-1){state.missionComplete=true;render();announce(`Mission ${state.sessionIndex+1} complete. ${mission.targetFacing?`Now facing ${character.facing}.`:'You reached the goal.'}`);}else{state.screen='results';render();announce('Great job! Route complete.');}}
function practiceMistakes(){const data=storage.load();const phrases=Object.keys(data.wrongPatterns);const pool=missions.filter(m=>phrases.some(phrase=>m.instruction===phrase||m.steps?.some(s=>s.instruction===phrase)));if(!pool.length){state.feedback=null;state.screen='home';render();announce('No mistakes to practice yet.');return;}state.mode=pool[0].mode==='speaking'?'speaking':'listening';startSession(pool[0].level,pool.slice(0,3));}
function playTone(success){if(!state.settings.sound)return;try{const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext)return;const ctx=new AudioContext();const osc=ctx.createOscillator(),gain=ctx.createGain();osc.frequency.value=success?660:260;gain.gain.setValueAtTime(.06,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.16);osc.connect(gain).connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.16);}catch{}}

function bindEvents(){
  document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>selectMode(button.dataset.mode)));
  document.querySelectorAll('[data-level]').forEach(button=>button.addEventListener('click',()=>startSession(Number(button.dataset.level))));
  document.querySelectorAll('[data-command]').forEach(button=>button.addEventListener('click',()=>{const [action,direction]=button.dataset.command.split(':');handleCommand({action,direction},state.mission.mode==='speaking');}));
  document.querySelectorAll('[data-place]').forEach(button=>button.addEventListener('click',()=>selectPlace(button.dataset.place)));
  document.querySelectorAll('[data-setting]').forEach(control=>control.addEventListener('change',()=>{state.settings[control.dataset.setting]=control.value;saveSettings();}));
  document.querySelectorAll('[data-setting-toggle]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.settingToggle;state.settings[key]=!state.settings[key];saveSettings();render();}));
  document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>action(button.dataset.action)));
}
function action(name){
  if(name==='home'){recognition.stop();state.missionComplete=false;state.screen='home';render();}
  if(name==='open-settings'){state.returnScreen=state.screen;state.screen='settings';render();}
  if(name==='settings-done'){state.screen=state.returnScreen==='settings'?'home':state.returnScreen;render();}
  if(name==='progress'){state.screen='progress';render();}
  if(name==='practice')practiceMistakes();
  if(name==='play')playInstruction(false);
  if(name==='replay')playInstruction(true);
  if(name==='hint')showHint();
  if(name==='listen')listen();
  if(name==='play-again')startSession(state.level);
  if(name==='next-level'){const nextLevel=nextAvailableLevel();if(nextLevel)startSession(nextLevel);}
  if(name==='next-mission'){state.sessionIndex+=1;loadMission();}
  if(name==='tutorial'){state.returnScreen=state.screen;state.screen='tutorial';state.tutorialStep=0;render();}
  if(name==='skip-tutorial'||name==='next-tutorial'&&state.tutorialStep===tutorialPages.length-1){state.settings.tutorialSeen=true;saveSettings();state.screen=state.returnScreen==='tutorial'?'home':state.returnScreen;render();}
  else if(name==='next-tutorial'){state.tutorialStep+=1;render();}
  if(name==='reset-progress'&&window.confirm('Clear all stars and learning records?')){storage.clear();announce('Learning record cleared.');render();}
}

window.__CITY_NAVIGATOR__={route,character,parser,storage,state,missions,cityMap,startSession,handleCommand,nextAvailableLevel};
render();
