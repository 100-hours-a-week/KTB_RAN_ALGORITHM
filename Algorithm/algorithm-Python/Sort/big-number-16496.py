import sys
from functools import cmp_to_key

sys.stdin = open("../예제.txt")
input = sys.stdin.readline

n = int(input())
arr = list(map(str, input().split()))

#앞에 자리가 큰 것부터 정렬
#두번째 자리가 큰 것 부터 정렬

def compare(x,y) :
    if x+y > y+x :
        return -1
    else :
        return 1

arr.sort(key=cmp_to_key(compare))

#앞에 0이 오면 제거
if arr[0] == "0" :
    print("0");
else :
    print("".join(arr))
