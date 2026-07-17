export const cityMap = {
  id: 'sunny-town',
  name: 'Sunny Town',
  roads: [
    { id: 'main-street', axis: 'h', position: 32, label: 'Main Street' },
    { id: 'station-road', axis: 'h', position: 68, label: 'Station Road' },
    { id: 'market-lane', axis: 'v', position: 28, label: 'Market Lane' },
    { id: 'park-avenue', axis: 'v', position: 72, label: 'Park Avenue' }
  ],
  nodes: [
    { id: 'main-west', x: 4, y: 32, type: 'stopSign', landmark: 'stopSign', blockBoundary: true, markerOffset: { x: 2.2, y: -4.2 } },
    { id: 'police-front', x: 10, y: 32, type: 'buildingEntrance' },
    { id: 'school-front', x: 20, y: 32, type: 'buildingEntrance' },
    { id: 'main-market', x: 28, y: 32, type: 'trafficLight', landmark: 'trafficLight', blockBoundary: true, markerOffset: { x: -3.6, y: -4.3 } },
    { id: 'bakery-front', x: 37, y: 32, type: 'buildingEntrance' },
    { id: 'bookstore-front', x: 47, y: 32, type: 'buildingEntrance' },
    { id: 'park-front', x: 60, y: 32, type: 'buildingEntrance' },
    { id: 'main-park', x: 72, y: 32, type: 'trafficLight', landmark: 'trafficLight', blockBoundary: true, markerOffset: { x: -3.6, y: -4.3 } },
    { id: 'restaurant-front', x: 81, y: 32, type: 'buildingEntrance' },
    { id: 'post-office-front', x: 91, y: 32, type: 'buildingEntrance' },
    { id: 'main-east', x: 96, y: 32, type: 'road', blockBoundary: true },

    { id: 'station-west', x: 4, y: 68, type: 'road', blockBoundary: true },
    { id: 'fire-station-front', x: 10, y: 68, type: 'buildingEntrance' },
    { id: 'mall-front', x: 20, y: 68, type: 'buildingEntrance' },
    { id: 'station-market', x: 28, y: 68, type: 'trafficLight', landmark: 'trafficLight', blockBoundary: true, markerOffset: { x: 3.5, y: -4.3 } },
    { id: 'bus-west', x: 38, y: 68, type: 'road', landmark: 'busStop', markerOffset: { x: 0, y: -5.2 } },
    { id: 'department-store-front', x: 50, y: 68, type: 'buildingEntrance' },
    { id: 'station-park', x: 72, y: 68, type: 'trafficLight', landmark: 'trafficLight', blockBoundary: true, markerOffset: { x: 3.5, y: -4.3 } },
    { id: 'bus-east', x: 82, y: 68, type: 'road', landmark: 'busStop', markerOffset: { x: 0, y: 5.1 } },
    { id: 'station-east', x: 96, y: 68, type: 'stopSign', landmark: 'stopSign', blockBoundary: true, markerOffset: { x: -2.2, y: -4.2 } },

    { id: 'market-north', x: 28, y: 4, type: 'road', blockBoundary: true },
    { id: 'market-south', x: 28, y: 96, type: 'road', blockBoundary: true },
    { id: 'park-north', x: 72, y: 4, type: 'road', blockBoundary: true },
    { id: 'park-south', x: 72, y: 96, type: 'road', blockBoundary: true }
  ],
  places: [
    { id: 'police', name: 'Police Station', mark: '★', x: 5.2, y: 10.2, w: 9.2, h: 17.2, form: 'civic', arrivalNodeId: 'police-front', color: '#5877c7' },
    { id: 'school', name: 'School', mark: 'ABC', x: 15.1, y: 10.2, w: 10.2, h: 17.2, form: 'civic', arrivalNodeId: 'school-front', color: '#e9a83b' },
    { id: 'bakery', name: 'Bakery', mark: 'B', x: 32.7, y: 12.7, w: 9.4, h: 14.7, form: 'shop', arrivalNodeId: 'bakery-front', color: '#e87867' },
    { id: 'bookstore', name: 'Bookstore', mark: 'BK', x: 42.7, y: 12.7, w: 9.4, h: 14.7, form: 'shop', arrivalNodeId: 'bookstore-front', color: '#8066ad' },
    { id: 'park', name: 'Park', mark: '♣', x: 53.2, y: 6.2, w: 15.2, h: 21.2, form: 'park', arrivalNodeId: 'park-front', color: '#5c9d62' },
    { id: 'restaurant', name: 'Restaurant', mark: 'R', x: 76, y: 12.7, w: 9.4, h: 14.7, form: 'shop', arrivalNodeId: 'restaurant-front', color: '#d76d50' },
    { id: 'post-office', name: 'Post Office', mark: '✉', x: 86, y: 12.7, w: 9.4, h: 14.7, form: 'shop', arrivalNodeId: 'post-office-front', color: '#4d8bc0' },
    { id: 'fire-station', name: 'Fire Station', mark: 'F', x: 5.2, y: 46.7, w: 9.6, h: 16.8, form: 'garage', arrivalNodeId: 'fire-station-front', color: '#d95252' },
    { id: 'mall', name: 'Mall', mark: 'M', x: 15.5, y: 46.7, w: 9.6, h: 16.8, form: 'shop', arrivalNodeId: 'mall-front', color: '#32989d' },
    { id: 'department-store', name: 'Department Store', mark: 'DS', x: 43.2, y: 46.7, w: 13.6, h: 16.8, form: 'civic', arrivalNodeId: 'department-store-front', color: '#bd648e' }
  ],
  edges: []
};

const roadPaths = [
  ['main-west','police-front','school-front','main-market','bakery-front','bookstore-front','park-front','main-park','restaurant-front','post-office-front','main-east'],
  ['station-west','fire-station-front','mall-front','station-market','bus-west','department-store-front','station-park','bus-east','station-east'],
  ['market-north','main-market','station-market','market-south'],
  ['park-north','main-park','station-park','park-south']
];

const nodesById = new Map(cityMap.nodes.map(node => [node.id, node]));
const directionBetween = (from, to) => {
  if (from.x < to.x) return 'east';
  if (from.x > to.x) return 'west';
  if (from.y < to.y) return 'south';
  return 'north';
};

for (const path of roadPaths) {
  for (let index = 0; index < path.length - 1; index += 1) {
    const from = nodesById.get(path[index]);
    const to = nodesById.get(path[index + 1]);
    cityMap.edges.push(
      { from: from.id, to: to.id, direction: directionBetween(from, to) },
      { from: to.id, to: from.id, direction: directionBetween(to, from) }
    );
  }
}
