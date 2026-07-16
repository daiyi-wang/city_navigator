export class ScoreManager {
  constructor(){this.reset();}
  reset(){this.errors=0;this.hints=0;this.replays=0;this.usedFallback=false;}
  stars(){if(this.errors>1||this.hints>=3||this.usedFallback)return 1;if(this.errors===1||this.hints>0||this.replays>=2)return 2;return 3;}
}
