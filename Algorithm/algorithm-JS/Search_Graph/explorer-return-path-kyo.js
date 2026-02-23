function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  const dist = Array.from({ length: n }, () => Array(m).fill(0));

  const queue = [[0, 0]];
  let head = 0;

  dist[0][0] = 1;
  maps[0][0] = 0;

  while (head < queue.length) {
    const [x, y] = queue[head++];

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];

      if (nx >= 0 && nx < n && ny >= 0 && ny < m && maps[nx][ny] === 1) {
        queue.push([nx, ny]);
        maps[nx][ny] = 0;
        dist[nx][ny] = dist[x][y] + 1;
      }
    }
  }

  return dist[n - 1][m - 1] || -1;
}

console.log(
  solution([
    [1, 1, 0, 1],
    [0, 1, 0, 1],
    [0, 1, 1, 1],
    [1, 0, 0, 1],
  ])
);

console.log(
  solution([
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ])
);

console.log(
  solution([
    [1, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ])
);
