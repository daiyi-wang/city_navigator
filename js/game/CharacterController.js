export class CharacterController {
  constructor(routeEngine) { this.route = routeEngine; this.reset('n00','east'); }
  reset(nodeId, facing) { this.currentNodeId=nodeId; this.facing=facing; this.visitedNodes=[nodeId]; this.wrongMoves=0; }
  execute(intent) {
    if (intent.action === 'turn') { this.facing=this.route.turn(this.facing,intent.direction); return {ok:true,type:'turn'}; }
    if (intent.action === 'stop') return {ok:true,type:'stop'};
    if (intent.action === 'move') {
      const distance=intent.distance || 1;
      const path=this.route.forwardPath(this.currentNodeId,this.facing,distance,intent.distanceUnit);
      if(!path){this.wrongMoves+=1;return {ok:false,type:'invalidMove',path:[]};}
      this.currentNodeId=path[path.length-1];
      this.visitedNodes.push(...path);
      return {ok:true,type:'move',path};
    }
    return {ok:false,type:'unknown'};
  }
}
