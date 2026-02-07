function solution(boxes) {
    const submit = []; //결과

    for (const box of boxes){
        if(submit[submit.length-1]!==box){
            submit.push(box);
        }
    }
    return submit;
}


console.log(solution([2, 2, 5, 5, 5, 1, 1]));
console.log(solution([7 , 7 , 8, 8, 0, 0, 0]));