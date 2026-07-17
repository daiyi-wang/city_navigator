const preferredUSFemaleVoices = [
  [/microsoft jenny.*natural/i,1000],
  [/microsoft ana.*natural/i,980],
  [/microsoft aria.*natural/i,960],
  [/microsoft ava.*natural/i,940],
  [/microsoft emma.*natural/i,920],
  [/microsoft michelle.*natural/i,900],
  [/\bsamantha\b/i,860],
  [/microsoft zira/i,840],
  [/google us english/i,820],
  [/\bfemale\b/i,760]
];
const knownMaleVoices=/\b(guy|davis|tony|christopher|eric|roger|david|mark)\b/i;

export function choosePreferredVoice(voices=[]){
  const candidates=voices.filter(voice=>/^en[-_]us$/i.test(voice.lang||''));
  if(!candidates.length)return null;
  const scored=candidates.map((voice,index)=>{
    const name=voice.name||'';
    const preference=preferredUSFemaleVoices.find(([pattern])=>pattern.test(name))?.[1]||0;
    const natural=/natural/i.test(name)?40:0;
    const local=voice.localService?5:0;
    const malePenalty=knownMaleVoices.test(name)?-2000:0;
    return {voice,index,score:preference+natural+local+malePenalty};
  });
  scored.sort((a,b)=>b.score-a.score||a.index-b.index);
  return scored[0]?.voice||null;
}

export class SpeechService {
  constructor(){
    this.rate=.95;this.pitch=1.08;this.volume=.92;this.voice=null;
    if(this.supported()){
      this.refreshVoices();
      window.speechSynthesis.addEventListener?.('voiceschanged',()=>this.refreshVoices());
    }
  }
  supported(){return 'speechSynthesis' in window;}
  refreshVoices(){if(!this.supported())return null;this.voice=choosePreferredVoice(window.speechSynthesis.getVoices?.()||[]);return this.voice;}
  get voiceName(){return this.voice?.name||'Browser default en-US';}
  speak(text,options={}){
    if(!this.supported())return false;
    window.speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance(text);
    utterance.lang='en-US';
    utterance.rate=options.slow?.82:this.rate;
    utterance.pitch=options.pitch??this.pitch;
    utterance.volume=options.volume??this.volume;
    const voice=this.refreshVoices();if(voice)utterance.voice=voice;
    window.speechSynthesis.speak(utterance);
    return true;
  }
}

export class SpeechRecognitionService {
  constructor(){this.Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;this.active=null;}
  supported(){return Boolean(this.Recognition);}
  listen(){return new Promise((resolve,reject)=>{if(!this.supported()){reject(new Error('unsupported'));return;}const recognition=new this.Recognition();this.active=recognition;recognition.lang='en-US';recognition.interimResults=false;recognition.maxAlternatives=1;recognition.onresult=event=>resolve(event.results?.[0]?.[0]?.transcript||'');recognition.onerror=event=>reject(new Error(event.error||'recognition-error'));recognition.onend=()=>{this.active=null;};recognition.start();});}
  stop(){this.active?.stop();}
}
