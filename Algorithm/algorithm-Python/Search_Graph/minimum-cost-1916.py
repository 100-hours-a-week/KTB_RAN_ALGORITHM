import heapq
import sys

sys.stdin = open("../예제.txt")

input = sys.stdin.readline
V = int(input());
M = int(input());

arr = [list(map(int, input().split(" "))) for _ in range(M)]
graph = [[] for _ in range(V+1)]

start, end = map(int,input().split(" "))


for u,v,w in arr:
    graph[u].append((w,v));
    

def dijkstra ():
    heap = [];
    dist = [float('inf')]*(V+1);
    heapq.heappush(heap, (0, start))
    dist[start] = 0
    
    while heap :
        curDist,curNode = heapq.heappop(heap);
        
        if dist[curNode] < curDist : continue;
        
        for cost,nextNode in graph[curNode]:
            if dist[nextNode] > curDist + cost:
                dist[nextNode] = cost + curDist
                heapq.heappush(heap,(cost + curDist,nextNode))

    return dist[end]


print(dijkstra())
