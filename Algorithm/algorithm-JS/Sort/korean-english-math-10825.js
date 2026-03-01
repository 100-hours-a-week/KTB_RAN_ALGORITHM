const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(arr) {
  let students = [];
  for (let i of arr) {
    let student = {};
    student.name = i[0];
    student.K = i[1];
    student.E = i[2];
    student.M = i[3];
    students.push(student);
  }

  //정렬 시도
  students.sort((a, b) => {
    if (a.K === b.K && b.E === a.E && a.M === b.M)
      return a.name < b.name ? -1 : 1;
    if (a.K === b.K && b.E === a.E) return b.M - a.M;
    if (b.K === a.K) return a.E - b.E;

    return b.K - a.K;
  });
  return students.map((i) => i.name).join("\n");
}

const arr = input
  .slice(1)
  .map((i) => i.split(" ").map((i) => (!isNaN(Number(i)) ? Number(i) : i)));
console.log(solution(arr));
