export const cityMap = {
  id: 'sunny-town',
  name: 'Sunny Town',
  nodes: [
    { id: 'n00', x: 14, y: 17, type: 'start' },
    { id: 'bakery-front', x: 14, y: 29, type: 'arrival' },
    { id: 'n10', x: 38, y: 17, type: 'trafficLight', landmark: 'trafficLight' },
    { id: 'n20', x: 62, y: 17, type: 'intersection' },
    { id: 'park-front', x: 75, y: 17, type: 'arrival' },
    { id: 'n30', x: 86, y: 17, type: 'stopSign', landmark: 'stopSign' },
    { id: 'n01', x: 14, y: 39, type: 'intersection' },
    { id: 'restaurant-front', x: 14, y: 51, type: 'arrival' },
    { id: 'n11', x: 38, y: 39, type: 'intersection' },
    { id: 'n21', x: 62, y: 39, type: 'trafficLight', landmark: 'trafficLight' },
    { id: 'bookstore-front', x: 62, y: 51, type: 'arrival' },
    { id: 'n31', x: 86, y: 39, type: 'intersection' },
    { id: 'n02', x: 14, y: 61, type: 'busStop', landmark: 'busStop' },
    { id: 'fire-station-front', x: 14, y: 73, type: 'arrival' },
    { id: 'n12', x: 38, y: 61, type: 'intersection' },
    { id: 'mall-front', x: 38, y: 73, type: 'arrival' },
    { id: 'n22', x: 62, y: 61, type: 'intersection' },
    { id: 'n32', x: 86, y: 61, type: 'trafficLight', landmark: 'trafficLight' },
    { id: 'n03', x: 14, y: 83, type: 'intersection' },
    { id: 'n13', x: 38, y: 83, type: 'busStop', landmark: 'busStop' },
    { id: 'n23', x: 62, y: 83, type: 'destination' },
    { id: 'n33', x: 86, y: 83, type: 'intersection' }
  ],
  edges: [],
  places: [
    { id: 'police', name: 'Police Station', icon: '★', x: 4, y: 4, nodeId: 'n00', color: '#6c7bd9' },
    { id: 'school', name: 'School', icon: 'ABC', x: 43, y: 4, nodeId: 'n10', color: '#f2b84b' },
    { id: 'park', name: 'Park', icon: '♣', x: 67, y: 4, nodeId: 'n20', color: '#65a866' },
    { id: 'bakery', name: 'Bakery', icon: 'B', x: 18, y: 25, nodeId: 'n01', color: '#e78272' },
    { id: 'post-office', name: 'Post Office', icon: '✉', x: 67, y: 25, nodeId: 'n21', color: '#5d91c9' },
    { id: 'restaurant', name: 'Restaurant', icon: 'R', x: 18, y: 47, nodeId: 'n12', color: '#de7857' },
    { id: 'bookstore', name: 'Bookstore', icon: 'BK', x: 67, y: 47, nodeId: 'n22', color: '#8f75b5' },
    { id: 'fire-station', name: 'Fire Station', icon: 'F', x: 4, y: 69, nodeId: 'n03', color: '#d95d5d' },
    { id: 'mall', name: 'Mall', icon: 'M', x: 43, y: 69, nodeId: 'n23', color: '#46a4a8' },
    { id: 'department-store', name: 'Department Store', icon: 'DS', x: 67, y: 69, nodeId: 'n33', color: '#cb6f9e' }
  ]
};

const arrivalNodes = {
  park: 'park-front',
  bakery: 'bakery-front',
  restaurant: 'restaurant-front',
  bookstore: 'bookstore-front',
  'fire-station': 'fire-station-front',
  mall: 'mall-front'
};
for (const place of cityMap.places) place.arrivalNodeId = arrivalNodes[place.id] || place.nodeId;

const directions = [
  ['n00','n10','east'],['n10','n20','east'],['n20','park-front','east'],['park-front','n30','east'],
  ['n01','n11','east'],['n11','n21','east'],['n21','n31','east'],
  ['n02','n12','east'],['n12','n22','east'],['n22','n32','east'],
  ['n03','n13','east'],['n13','n23','east'],['n23','n33','east'],
  ['n00','bakery-front','south'],['bakery-front','n01','south'],['n01','restaurant-front','south'],['restaurant-front','n02','south'],['n02','fire-station-front','south'],['fire-station-front','n03','south'],
  ['n10','n11','south'],['n11','n12','south'],['n12','mall-front','south'],['mall-front','n13','south'],
  ['n20','n21','south'],['n21','bookstore-front','south'],['bookstore-front','n22','south'],['n22','n23','south'],
  ['n30','n31','south'],['n31','n32','south'],['n32','n33','south']
];
const opposite = { east: 'west', south: 'north' };
cityMap.edges = directions.flatMap(([from, to, direction]) => [
  { from, to, direction, distance: 1 },
  { from: to, to: from, direction: opposite[direction], distance: 1 }
]);
