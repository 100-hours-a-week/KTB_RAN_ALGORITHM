function solution(bridge_length, weight, truck_weights) {
    let truck_success = [];
    let len = truck_weights.length;
    let time = 0;
    
    let bridge = [];
    let current_truck = 0;
    let current_time = [];
    let head_time = 0;
    
     while(truck_success.length != len){
         time++;
         current_truck = truck_weights.shift();
         current_time = current_time.map(i=>i+1);
         
         head_time = current_time[0];
         if(head_time > bridge_length){
             truck_success.push(bridge.shift());
             current_time.shift();
             
         }
         
         if((bridge.length == 0) || (bridge.reduce((a,b)=>a+b) + current_truck <= weight)){
            bridge.push(current_truck);
            current_time.push(1);
         }else{
             truck_weights.unshift(current_truck );
         }
     }
    
    
    return time;
}