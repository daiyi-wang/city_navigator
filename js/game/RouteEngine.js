const turnMap = {
  north: { left: 'west', right: 'east' },
  east: { left: 'north', right: 'south' },
  south: { left: 'east', right: 'west' },
  west: { left: 'south', right: 'north' }
};

export class RouteEngine {
  constructor(map) { this.map = map; }
  turn(facing, direction) { return turnMap[facing]?.[direction] ?? facing; }
  forward(nodeId, facing) { return this.map.edges.find(edge => edge.from === nodeId && edge.direction === facing) ?? null; }
  forwardPath(nodeId, facing, distance=1, distanceUnit='nodes') {
    const path=[];
    let current=nodeId;
    let progress=0;
    let safety=0;
    while(progress<distance&&safety<=this.map.nodes.length){
      const edge=this.forward(current,facing);
      if(!edge)return null;
      current=edge.to;
      path.push(current);
      progress+=distanceUnit==='blocks'?(this.node(current)?.blockBoundary?1:0):1;
      safety+=1;
    }
    return progress===distance?path:null;
  }
  node(id) { return this.map.nodes.find(node => node.id === id); }
  isAt(nodeId, destinationId) { return nodeId === destinationId; }
  hasLandmark(nodeId, landmark) { return !landmark || this.node(nodeId)?.landmark === landmark; }
}

export { turnMap };
