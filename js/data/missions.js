const step = (instruction, action, direction, extra = {}) => ({ instruction, intent: { action, direction, ...extra } });

export const missions = [
  { id:'l1-01', mode:'listening', level:1, title:'First move', startNodeId:'n11', startFacing:'east', destinationNodeId:'n21', steps:[step('Go straight.','move','straight')] },
  { id:'l1-02', mode:'listening', level:1, title:'Turn north', startNodeId:'n11', startFacing:'east', targetFacing:'north', destinationNodeId:'n10', steps:[step('Turn left.','turn','left'),step('Go straight.','move','straight')] },
  { id:'l1-03', mode:'listening', level:1, title:'Turn south', startNodeId:'n11', startFacing:'east', targetFacing:'south', destinationNodeId:'n12', steps:[step('Turn right.','turn','right'),step('Go straight.','move','straight')] },
  { id:'l1-04', mode:'listening', level:1, title:'Safe stop', startNodeId:'n30', startFacing:'south', destinationNodeId:'n30', steps:[step('Stop.','stop','stop')] },
  { id:'l2-01', mode:'listening', level:2, title:'To the bookstore', startNodeId:'n21', startFacing:'east', destinationNodeId:'bookstore-front', steps:[step('Turn right at the traffic light.','turn','right',{landmarkType:'trafficLight'}),step('Go straight.','move','straight')] },
  { id:'l2-02', mode:'listening', level:2, title:'To the fire station', startNodeId:'n02', startFacing:'east', destinationNodeId:'fire-station-front', steps:[step('Turn right at the bus stop.','turn','right',{landmarkType:'busStop'}),step('Go straight.','move','straight')] },
  { id:'l2-03', mode:'listening', level:2, title:'To the park', startNodeId:'n10', startFacing:'south', destinationNodeId:'park-front', steps:[step('Turn left at the traffic light.','turn','left',{landmarkType:'trafficLight'}),step('Go straight.','move','straight'),step('Go straight to the park.','move','straight')] },
  { id:'l3-01', mode:'findPlace', level:3, title:'Across the street', instruction:'Find the place across from the bakery.', targetPlaceId:'restaurant', startNodeId:'n11', startFacing:'east', destinationNodeId:'restaurant-front', relation:{type:'acrossFrom',referencePlaceId:'bakery'} },
  { id:'l3-02', mode:'findPlace', level:3, title:'Next door', instruction:'Find the place next to the school.', targetPlaceId:'park', startNodeId:'n11', startFacing:'north', destinationNodeId:'park-front', relation:{type:'nextTo',referencePlaceId:'school'} },
  { id:'l3-03', mode:'findPlace', level:3, title:'Across the street', instruction:'Find the place across from the post office.', targetPlaceId:'bookstore', startNodeId:'n11', startFacing:'east', destinationNodeId:'bookstore-front', relation:{type:'acrossFrom',referencePlaceId:'post-office'} },
  { id:'l4-01', mode:'listening', level:4, title:'To the bookstore', startNodeId:'n11', startFacing:'east', destinationNodeId:'bookstore-front', steps:[step('Go straight.','move','straight'),step('Turn right at the traffic light.','turn','right',{landmarkType:'trafficLight'}),step('Go straight to the bookstore.','move','straight')] },
  { id:'l4-02', mode:'listening', level:4, title:'To the fire station', startNodeId:'n12', startFacing:'west', destinationNodeId:'fire-station-front', steps:[step('Go straight.','move','straight'),step('Turn left at the bus stop.','turn','left',{landmarkType:'busStop'}),step('Go straight to the fire station.','move','straight')] },
  { id:'l4-03', mode:'listening', level:4, title:'To the restaurant', startNodeId:'n12', startFacing:'west', destinationNodeId:'restaurant-front', steps:[step('Go straight.','move','straight'),step('Turn right at the bus stop.','turn','right',{landmarkType:'busStop'}),step('Go straight to the restaurant.','move','straight')] },
  { id:'l5-01', mode:'listening', level:5, title:'To the park', startNodeId:'n00', startFacing:'east', destinationNodeId:'park-front', steps:[step('Go straight for two blocks.','move','straight',{distance:2}),step('Go straight to the park.','move','straight'),step('Stop at the park.','stop','stop')] },
  { id:'l5-02', mode:'listening', level:5, title:'To the department store', startNodeId:'n30', startFacing:'south', destinationNodeId:'department-store-front', steps:[step('Go straight for two blocks.','move','straight',{distance:2}),step('Turn right at the traffic light.','turn','right',{landmarkType:'trafficLight'}),step('Go straight.','move','straight'),step('Turn left.','turn','left'),step('Go straight to the department store.','move','straight')] },
  { id:'s1-01', mode:'speaking', level:1, title:'Guide to the bakery', startNodeId:'n01', startFacing:'north', destinationNodeId:'bakery-front', freeRoute:true, steps:[] },
  { id:'s2-01', mode:'speaking', level:2, title:'Guide to the bookstore', startNodeId:'n11', startFacing:'east', destinationNodeId:'bookstore-front', freeRoute:true, steps:[] },
  { id:'s3-01', mode:'speaking', level:3, title:'Guide to the fire station', startNodeId:'n11', startFacing:'west', destinationNodeId:'fire-station-front', freeRoute:true, steps:[] },
  { id:'s4-01', mode:'speaking', level:4, title:'Guide to the mall', startNodeId:'n22', startFacing:'west', destinationNodeId:'mall-front', freeRoute:true, steps:[] },
  { id:'s5-01', mode:'speaking', level:5, title:'Guide to the department store', startNodeId:'n00', startFacing:'east', destinationNodeId:'department-store-front', freeRoute:true, steps:[] }
];

export const levels = [
  {level:1,name:'Basic Directions',note:'One clear action'},
  {level:2,name:'Landmarks',note:'Traffic lights & signs'},
  {level:3,name:'Places & Positions',note:'Find city places'},
  {level:4,name:'Short Routes',note:'Two to three steps'},
  {level:5,name:'Full Navigation',note:'Blocks & longer routes'}
];
