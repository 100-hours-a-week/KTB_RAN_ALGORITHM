import sys

sys.stdin = open("../예제.txt")

input = sys.stdin.readline

#N개의 자연수 중에서 M개를 고른 수열
#수열은 사전 순으로 증가해야한다. -> 마지막에 정렬해도되나?

#depth 기준으로 하기 때문에 갯수는 depth로 파악하기 depth => M


N,M = map(int,input().split(" "))
arr = list(map(int, input().split(" ")))

answer = [];
current = [];

def backdfs(depth):
    if depth == M :
        answer.append(current.copy());
        return
        
    for d in arr :  #arr : 2,4,5
        if d in current : continue
        current.append(d)
        backdfs(depth+1)
        current.pop();
        
#원래 depth는 for 반복문으로 많이 표현했었는데, 백트래킹은 반복문이 아닌 depth는 재귀에게 역할을 맡긴다.
#코테는 각 요소의 역할을 누가 대체하느냐에 따라 구현이 다른것같다. 
        
backdfs(0)
answer.sort()
print("\n".join(" ".join(map(str,i)) for i in answer))
