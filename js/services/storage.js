const KEY='cityNavigator.progress.v1';
const defaults=()=>({completedMissions:[],totalStars:0,listening:{correct:0,total:0},speaking:{correct:0,total:0},wrongPatterns:{},history:[],lastPlayedAt:''});
export class ProgressStorage {
  load(){try{return {...defaults(),...JSON.parse(localStorage.getItem(KEY)||'{}')};}catch{return defaults();}}
  save(data){try{localStorage.setItem(KEY,JSON.stringify(data));return true;}catch{return false;}}
  clear(){try{localStorage.removeItem(KEY);return true;}catch{return false;}}
  record(result){const data=this.load();const previous=data.completedMissions.find(item=>item.id===result.id);data.completedMissions=data.completedMissions.filter(item=>item.id!==result.id);data.completedMissions.push({id:result.id,stars:Math.max(previous?.stars||0,result.stars),mode:result.mode});data.totalStars=data.completedMissions.reduce((sum,item)=>sum+item.stars,0);const bucket=result.mode==='speaking'?'speaking':'listening';data[bucket].total+=result.total;data[bucket].correct+=result.correct;for(const phrase of result.mistakes){data.wrongPatterns[phrase]=(data.wrongPatterns[phrase]||0)+1;}data.history.push({...result,at:new Date().toISOString()});data.history=data.history.slice(-40);data.lastPlayedAt=new Date().toISOString();this.save(data);return data;}
}
export {KEY as STORAGE_KEY};
