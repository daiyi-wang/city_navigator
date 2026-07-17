const clean = text => text.toLowerCase().replace(/[.,!?]/g,' ').replace(/\bfirst\b/g,'1').replace(/\bsecond\b/g,'2').replace(/\bone\b/g,'1').replace(/\btwo\b/g,'2').replace(/\s+/g,' ').trim();
export class DirectionParser {
  parse(raw='') {
    const text=clean(raw);
    if(!text) return null;
    let intent=null;
    if(/\b(left)\b/.test(text)) intent={action:'turn',direction:'left'};
    else if(/\b(right)\b/.test(text)) intent={action:'turn',direction:'right'};
    else if(/\b(stop|halt)\b/.test(text)) intent={action:'stop',direction:'stop'};
    else if(/\b(straight|forward|continue)\b/.test(text)) intent={action:'move',direction:'straight'};
    if(!intent) return null;
    if(/traffic light/.test(text)) intent.landmarkType='trafficLight';
    if(/bus stop/.test(text)) intent.landmarkType='busStop';
    if(/stop sign/.test(text)) intent.landmarkType='stopSign';
    if(intent.action==='move'&&/\b2\s*(blocks?|steps?)?\b/.test(text)) intent.distance=2;
    if(intent.action==='move'&&/\b1\s*(blocks?|steps?)?\b/.test(text)) intent.distance=1;
    if(intent.action==='move'&&/\bblocks?\b/.test(text)) intent.distanceUnit='blocks';
    if(/\b1\b/.test(text)) intent.landmarkOrder=1;
    if(/\b2\b/.test(text) && /traffic|intersection/.test(text)) intent.landmarkOrder=2;
    return intent;
  }
  normalize(text='') { return clean(text); }
}
