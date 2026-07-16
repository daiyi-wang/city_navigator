export class SpeechService {
  constructor(){this.rate=.85;this.volume=1;}
  supported(){return 'speechSynthesis' in window;}
  speak(text,options={}){if(!this.supported())return false;window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-US';utterance.rate=options.slow?.7:this.rate;utterance.volume=this.volume;window.speechSynthesis.speak(utterance);return true;}
}

export class SpeechRecognitionService {
  constructor(){this.Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;this.active=null;}
  supported(){return Boolean(this.Recognition);}
  listen(){return new Promise((resolve,reject)=>{if(!this.supported()){reject(new Error('unsupported'));return;}const recognition=new this.Recognition();this.active=recognition;recognition.lang='en-US';recognition.interimResults=false;recognition.maxAlternatives=1;recognition.onresult=event=>resolve(event.results?.[0]?.[0]?.transcript||'');recognition.onerror=event=>reject(new Error(event.error||'recognition-error'));recognition.onend=()=>{this.active=null;};recognition.start();});}
  stop(){this.active?.stop();}
}
