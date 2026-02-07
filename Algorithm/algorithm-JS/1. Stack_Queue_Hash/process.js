function solution(priorities, location) {
    var answer = 0;
    let queue = [...priorities];
    
    let currentLocation = location;
    let len = priorities.length;

    let Qprev = 0;
    let count = 0;
    
    let prevQueue = 0;
    let currentQueue = 0;
    
    while(queue.length!=0){
        prevQueue = queue.length;
        Qprev = queue.shift();
        if(queue.some(i => Qprev < i)){

            if(currentLocation==0){
                queue.push(Qprev)
                currentLocation=queue.length-1;
            }else{
                queue.push(Qprev)
                currentLocation--;
            }
        }else{

            
            currentQueue = queue.length;
            if(currentQueue!=prevQueue){
                count++;
            }
            if(currentLocation==0){
                return count;
            }
            currentLocation--;
        }

    }
    

}