const step = (instruction, action, direction, extra = {}) => ({ instruction, intent: { action, direction, ...extra } });

export const missions = [
  // Level 1: exactly one basic action per mission.
  { id:'l1-01', mode:'listening', level:1, title:'One step to the bookstore', startNodeId:'bakery-front', startFacing:'east', destinationNodeId:'bookstore-front', steps:[step('Go straight.','move','straight')] },
  { id:'l1-02', mode:'listening', level:1, title:'Face Main Street west', startNodeId:'main-market', startFacing:'north', targetFacing:'west', destinationNodeId:'main-market', steps:[step('Turn left.','turn','left')] },
  { id:'l1-03', mode:'listening', level:1, title:'Face Main Street east', startNodeId:'main-market', startFacing:'north', targetFacing:'east', destinationNodeId:'main-market', steps:[step('Turn right.','turn','right')] },
  { id:'l1-04', mode:'listening', level:1, title:'Stop safely', startNodeId:'main-west', startFacing:'east', destinationNodeId:'main-west', steps:[step('Stop.','stop','stop')] },

  // Level 2: one landmark-based action at a visible signal or sign.
  { id:'l2-01', mode:'listening', level:2, title:'Left at the traffic light', startNodeId:'main-market', startFacing:'east', targetFacing:'north', destinationNodeId:'main-market', steps:[step('Turn left at the traffic light.','turn','left',{landmarkType:'trafficLight'})] },
  { id:'l2-02', mode:'listening', level:2, title:'Right at the traffic light', startNodeId:'main-park', startFacing:'east', targetFacing:'south', destinationNodeId:'main-park', steps:[step('Turn right at the traffic light.','turn','right',{landmarkType:'trafficLight'})] },
  { id:'l2-03', mode:'listening', level:2, title:'Stop at the west sign', startNodeId:'main-west', startFacing:'east', destinationNodeId:'main-west', steps:[step('Stop at the stop sign.','stop','stop',{landmarkType:'stopSign'})] },
  { id:'l2-04', mode:'listening', level:2, title:'Stop at the east sign', startNodeId:'station-east', startFacing:'west', destinationNodeId:'station-east', steps:[step('Stop at the stop sign.','stop','stop',{landmarkType:'stopSign'})] },

  // Level 3: all five position targets from the README.
  { id:'l3-01', mode:'findPlace', level:3, title:'On your left', instruction:'Find the place on your left.', targetPlaceId:'police', startNodeId:'police-front', startFacing:'east', destinationNodeId:'police-front', relation:{type:'leftOfTraveler'} },
  { id:'l3-02', mode:'findPlace', level:3, title:'On your right', instruction:'Find the place on your right.', targetPlaceId:'post-office', startNodeId:'post-office-front', startFacing:'west', destinationNodeId:'post-office-front', relation:{type:'rightOfTraveler'} },
  { id:'l3-03', mode:'findPlace', level:3, title:'Across the street', instruction:'Find the place across from the school.', targetPlaceId:'bakery', startNodeId:'main-market', startFacing:'east', destinationNodeId:'bakery-front', relation:{type:'acrossFrom',referencePlaceId:'school'} },
  { id:'l3-04', mode:'findPlace', level:3, title:'Next door', instruction:'Find the place next to the police station.', targetPlaceId:'school', startNodeId:'main-market', startFacing:'west', destinationNodeId:'school-front', relation:{type:'nextTo',referencePlaceId:'police'} },
  { id:'l3-05', mode:'findPlace', level:3, title:'Between two places', instruction:'Find the place between the bakery and the park.', targetPlaceId:'bookstore', startNodeId:'main-market', startFacing:'east', destinationNodeId:'bookstore-front', relation:{type:'between',referencePlaceIds:['bakery','park']} },

  // Level 4: two or three step routes that finish at a building entrance.
  { id:'l4-01', mode:'listening', level:4, title:'Market Lane to the bakery', startNodeId:'market-north', startFacing:'south', destinationNodeId:'bakery-front', steps:[step('Go straight.','move','straight'),step('Turn left at the traffic light.','turn','left',{landmarkType:'trafficLight'}),step('Go straight to the bakery.','move','straight')] },
  { id:'l4-02', mode:'listening', level:4, title:'Market Lane to the mall', startNodeId:'market-south', startFacing:'north', destinationNodeId:'mall-front', steps:[step('Go straight.','move','straight'),step('Turn left at the traffic light.','turn','left',{landmarkType:'trafficLight'}),step('Go straight to the mall.','move','straight')] },
  { id:'l4-03', mode:'listening', level:4, title:'Park Avenue to the restaurant', startNodeId:'park-north', startFacing:'south', destinationNodeId:'restaurant-front', steps:[step('Go straight.','move','straight'),step('Turn left at the traffic light.','turn','left',{landmarkType:'trafficLight'}),step('Go straight to the restaurant.','move','straight')] },

  // Level 5: three to five steps using blocks, ordered landmarks, go past, and destination position.
  { id:'l5-01', mode:'listening', level:5, title:'Main Street delivery', startNodeId:'main-market', startFacing:'east', destinationNodeId:'post-office-front', steps:[step('Go straight for one block.','move','straight',{distance:1,distanceUnit:'blocks'}),step('Go past the restaurant.','move','straight'),step('Go straight to the post office.','move','straight'),step('Stop at the post office.','stop','stop')] },
  { id:'l5-02', mode:'listening', level:5, title:'First light to the department store', startNodeId:'market-north', startFacing:'south', destinationNodeId:'department-store-front', steps:[step('Go straight to the first traffic light.','move','straight',{landmarkOrder:1}),step('Go straight for one block.','move','straight',{distance:1,distanceUnit:'blocks'}),step('Turn left at the traffic light.','turn','left',{landmarkType:'trafficLight'}),step('Go past the bus stop.','move','straight'),step('Go straight to the department store.','move','straight')] },
  { id:'l5-03', mode:'listening', level:5, title:'Two blocks to the fire station', startNodeId:'park-north', startFacing:'south', destinationNodeId:'fire-station-front', steps:[step('Go straight for two blocks.','move','straight',{distance:2,distanceUnit:'blocks'}),step('Turn right at the traffic light.','turn','right',{landmarkType:'trafficLight'}),step('Go straight for one block.','move','straight',{distance:1,distanceUnit:'blocks'}),step('Go past the mall.','move','straight'),step('Go straight to the fire station.','move','straight')] },

  // Speaking mode: one free-navigation destination for each level.
  { id:'s1-01', mode:'speaking', level:1, title:'Guide to the bookstore', startNodeId:'bakery-front', startFacing:'east', destinationNodeId:'bookstore-front', freeRoute:true, steps:[] },
  { id:'s2-01', mode:'speaking', level:2, title:'Guide from the traffic light to the park', startNodeId:'main-market', startFacing:'east', destinationNodeId:'park-front', freeRoute:true, steps:[] },
  { id:'s3-01', mode:'speaking', level:3, title:'Guide from the police station to the fire station', startNodeId:'police-front', startFacing:'east', destinationNodeId:'fire-station-front', freeRoute:true, steps:[] },
  { id:'s4-01', mode:'speaking', level:4, title:'Guide from Market Lane to the restaurant', startNodeId:'market-north', startFacing:'south', destinationNodeId:'restaurant-front', freeRoute:true, steps:[] },
  { id:'s5-01', mode:'speaking', level:5, title:'Guide across town to the department store', startNodeId:'park-north', startFacing:'south', destinationNodeId:'department-store-front', freeRoute:true, steps:[] }
];

export const levels = [
  {level:1,name:'Basic Directions',note:'One action at a time'},
  {level:2,name:'Landmarks',note:'Traffic lights & stop signs'},
  {level:3,name:'Places & Positions',note:'Left, right & place relations'},
  {level:4,name:'Short Routes',note:'Two to three steps'},
  {level:5,name:'Full Navigation',note:'Blocks, landmarks & go past'}
];
