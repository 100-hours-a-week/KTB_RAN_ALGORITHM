function solution(s) {
    let stack = [];

    for(let char of s) {
        const top = stack[stack.length - 1];
        if(top && Math.abs(top.charCodeAt() - char.charCodeAt()) === 32) {
            stack.pop();
        } else {
            stack.push(char);
        }
    }

    return stack.join('');

}
console.log(solution("infFflearn"));
console.log(solution("aAbBcC"));
console.log(solution("xYyX"));
console.log(solution("a"));
console.log(solution("Code"));