import sys
import bisect
sys.stdin = open("../예제.txt")
input = sys.stdin.readline

[n,m] = list(map(int,input().split(" ")));
arrN = list(map(int, input().split(" ")))
arrN.sort();
answer = [];

for _ in range(m) :
    x, y = map(int, input().split(" "));

    count = bisect.bisect_right(arrN,y)-bisect.bisect_left(arrN,x)
    answer.append(count)

print("\n".join(map(str,answer)))
