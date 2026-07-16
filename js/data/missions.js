const step = (instruction, action, direction, extra = {}) => ({ instruction, intent: { action, direction, ...extra } });

export const missions = [
  { id:'l1-01', mode:'listening', level:1, title:'First turn', startNodeId:'n00', startFacing:'east', destinationNodeId:'n10', steps:[step('Go straight.','move','straight')] },
  { id:'l1-02', mode:'listening', level:1, title:'Face the park', startNodeId:'n10', startFacing:'east', destinationNodeId:'n10', steps:[step('Turn left.','turn','left')] },
  { id:'l1-03', mode:'listening', level:1, title:'Right at school', startNodeId:'n10', startFacing:'east', destinationNodeId:'n10', steps:[step('Turn right.','turn','right')] },
  { id:'l1-04', mode:'listening', level:1, title:'Safe stop', startNodeId:'n30', startFacing:'south', destinationNodeId:'n30', steps:[step('Stop.','stop','stop')] },
  { id:'l2-01', mode:'listening', level:2, title:'Traffic-light turn', startNodeId:'n10', startFacing:'east', destinationNodeId:'n10', steps:[step('Turn right at the traffic light.','turn','right',{landmarkType:'trafficLight'})] },
  { id:'l2-02', mode:'listening', level:2, title:'Stop-sign turn', startNodeId:'n02', startFacing:'south', destinationNodeId:'n02', steps:[step('Turn left at the stop sign.','turn','left',{landmarkType:'stopSign'})] },
  { id:'l2-03', mode:'listening', level:2, title:'Stop at the sign', startNodeId:'n13', startFacing:'east', destinationNodeId:'n13', steps:[step('Stop at the stop sign.','stop','stop',{landmarkType:'stopSign'})] },
  { id:'l3-01', mode:'findPlace', level:3, title:'Across town', instruction:'The park is across from the department store.', targetPlaceId:'park', startNodeId:'n11', startFacing:'north', destinationNodeId:'n20', relation:{type:'acrossFrom',referencePlaceId:'department-store'} },
  { id:'l3-02', mode:'findPlace', level:3, title:'Next-door helpers', instruction:'The school is next to the police station.', targetPlaceId:'school', startNodeId:'n11', startFacing:'north', destinationNodeId:'n10', relation:{type:'nextTo',referencePlaceId:'police'} },
  { id:'l3-03', mode:'findPlace', level:3, title:'Book hunt', instruction:'Choose the bookstore.', targetPlaceId:'bookstore', startNodeId:'n11', startFacing:'east', destinationNodeId:'n22' },
  { id:'l4-01', mode:'listening', level:4, title:'To the post office', startNodeId:'n11', startFacing:'east', destinationNodeId:'n21', steps:[step('Go straight.','move','straight'),step('Turn right at the traffic light.','turn','right',{landmarkType:'trafficLight'}),step('Stop.','stop','stop')] },
  { id:'l4-02', mode:'listening', level:4, title:'Bakery corner', startNodeId:'n02', startFacing:'north', destinationNodeId:'n01', steps:[step('Go straight.','move','straight'),step('Turn right.','turn','right'),step('Stop.','stop','stop')] },
  { id:'l4-03', mode:'listening', level:4, title:'Mall route', startNodeId:'n22', startFacing:'south', destinationNodeId:'n23', steps:[step('Go straight.','move','straight'),step('Turn left.','turn','left'),step('Stop.','stop','stop')] },
  { id:'l5-01', mode:'listening', level:5, title:'Two-block challenge', startNodeId:'n00', startFacing:'east', destinationNodeId:'n20', steps:[step('Go straight for two blocks.','move','straight',{distance:2}),step('Turn right.','turn','right'),step('Stop.','stop','stop')] },
  { id:'l5-02', mode:'listening', level:5, title:'Full navigation', startNodeId:'n30', startFacing:'south', destinationNodeId:'n32', steps:[step('Go straight for two blocks.','move','straight',{distance:2}),step('Turn right at the traffic light.','turn','right',{landmarkType:'trafficLight'}),step('Stop.','stop','stop')] },
  { id:'s1-01', mode:'speaking', level:1, title:'Say the turn', startNodeId:'n10', startFacing:'east', destinationNodeId:'n10', steps:[step('Turn right.','turn','right')] },
  { id:'s2-01', mode:'speaking', level:2, title:'Speak at the light', startNodeId:'n21', startFacing:'north', destinationNodeId:'n21', steps:[step('Turn left at the traffic light.','turn','left',{landmarkType:'trafficLight'})] },
  { id:'s3-01', mode:'speaking', level:3, title:'Guide to the bakery', startNodeId:'n02', startFacing:'north', destinationNodeId:'n01', steps:[step('Go straight.','move','straight'),step('Stop.','stop','stop')] },
  { id:'s4-01', mode:'speaking', level:4, title:'Guide to the mall', startNodeId:'n22', startFacing:'south', destinationNodeId:'n23', steps:[step('Go straight.','move','straight'),step('Stop.','stop','stop')] },
  { id:'s5-01', mode:'speaking', level:5, title:'Guide across town', startNodeId:'n00', startFacing:'east', destinationNodeId:'n20', steps:[step('Go straight for two blocks.','move','straight',{distance:2}),step('Stop.','stop','stop')] }
];

export const levels = [
  {level:1,name:'Basic Directions',note:'One clear action'},
  {level:2,name:'Landmarks',note:'Traffic lights & signs'},
  {level:3,name:'Places & Positions',note:'Find city places'},
  {level:4,name:'Short Routes',note:'Two to three steps'},
  {level:5,name:'Full Navigation',note:'Blocks & longer routes'}
];
