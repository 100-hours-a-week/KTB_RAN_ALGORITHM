import sys
from collections import deque


sys.stdin = open("../예제.txt")
input = sys.stdin.readline
n = int(input())

graph = [list(input().strip()) for _ in range(n)]
defGraph = [row[:] for row in graph]
for i in range(n) :
    for j in range(n) :
        if defGraph[i][j] == "G" :
            defGraph[i][j] = "R"



#방문노드
visited = [[False]*n for _ in range(n)];

#옆으로 퍼지는 거면 가는 방향을 4방향으로 해야됨.
dx = [1,0,0,-1]
dy = [0,1,-1,0]

count = 0;
defCount = 0;

#BFS로 진행하는데, 적록색약은 초록빨강을 하나로 생각.
#적록색약일 경우도 해야됨.
#적록색약은 빨강초록의 경우를 합하면됨.

def BFS(start,graph) :
    #발자취 큐
    x,y=start
    queue = deque();
    visited[x][y] = True
    #BFS
    queue.append(start)
    color = graph[x][y]
    
    
    while queue :
        curX,curY = queue.popleft()
        #시작한 색상을 시준으로 시작
    
        #시작한 색상이 빨간색일 경우 빨강 count에 들어감
        #초록일경우 초록 count에 들어감
        
        for i in range(4) :
            nx = curX + dx[i]
            ny = curY + dy[i]
        
            if 0 <= nx < n and 0<= ny <n :
                if graph[nx][ny] == color and not visited[nx][ny] :
                    visited[nx][ny] = True
                    queue.append([nx,ny])
    
                    
        

#그래프 시작이 방문하지 않았을 경우, BFS를 시작한다.
for i in range(n) :
    for j in range(n) :
        if not visited[i][j] :
            color = BFS([i,j],graph)
            count+=1

visited = [[False]*n for _ in range(n)];

for i in range(n) :
    for j in range(n) :
        if not visited[i][j] :
            color = BFS([i,j],defGraph)
            defCount+=1
#적록색일 경우, 
print(count, defCount)
