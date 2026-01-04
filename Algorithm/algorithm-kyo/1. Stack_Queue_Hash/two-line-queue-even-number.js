function solution(queue1, queue2, k) {
    let result = [];
    let q = [...queue1, ...queue2];

    while(result.length < k && q.length > 0){
        const person = q.shift();

        if(person %2===0){
            result.push(person);
        }else{
            q.push(person);
        }
    }

    return result;
}
console.log(solution([1, 3, 4], [6, 5, 8], 3))