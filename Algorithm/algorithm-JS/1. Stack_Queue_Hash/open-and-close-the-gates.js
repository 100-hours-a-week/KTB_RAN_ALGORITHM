function solution(gate) {
    const stack = [];

    for (let char of gate){
        if(char === "<"){
            stack.push(char);
        }else{
            if(stack.length === 0){
                return false
            }
            stack.pop();
        }
    }

    return stack.length === 0;
}
console.log(solution("<<>>"))
console.log(solution("<<>>"))
console.log(solution(">><<"))
console.log(solution("<<<>"))