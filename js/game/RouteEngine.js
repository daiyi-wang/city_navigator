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
  node(id) { return this.map.nodes.find(node => node.id === id); }
  isAt(nodeId, destinationId) { return nodeId === destinationId; }
  hasLandmark(nodeId, landmark) { return !landmark || this.node(nodeId)?.landmark === landmark; }
}

export { turnMap };
