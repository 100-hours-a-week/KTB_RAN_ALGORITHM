import sys
from collections import deque

#1에서부터 시작해서 DFS 탐색으로 찾아내야됨.
#start = 1이 되는거임

sys.stdin = open("../예제.txt")
input = sys.stdin.readline

n = int(input())
arr = [];
graph = {}

visitedParentArr = [0]*(n+1);
# print(visitedParentArr)

for _ in range(n-1) :
    arr.append(list(map(int,input().split())))

for u,v in arr :
    if u not in graph :
        graph[u] = [];
    if v not in graph :
        graph[v] = [];
    graph[u].append(v);
    graph[v].append(u);


visited = set();
queue = deque();
# print(graph)


#항상 1에서 시작
#1에서 시작하여 DFS로 타고 타고 내려가서 2있을때까지 DFS로 내려감.
def bfs(ele) :
    queue.append(ele);
    visited.add(ele);

    while queue :
        current = queue.popleft();


        for child in graph[current] :
            if child not in visited :
                visited.add(child);
                visitedParentArr[child] = current
                queue.append(child);


start = 1
bfs(start)

print("\n".join(list(map(str,visitedParentArr))[2:]))
