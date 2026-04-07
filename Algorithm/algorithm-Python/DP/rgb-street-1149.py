import sys

sys.stdin = open("../예제.txt")


input = sys.stdin.readline
n = int(input())

colorArr = [list(map(int, input().split(" "))) for _ in range(n)]

def solution():
    dp = [[0]*3 for _ in range(n)];
    
    dp[0][0] = colorArr[0][0];
    dp[0][1] = colorArr[0][1];
    dp[0][2] = colorArr[0][2];
    
    for i in range(1,n) :
        dp[i][0] = min(dp[i-1][1],dp[i-1][2]) + colorArr[i][0];
        dp[i][1] = min(dp[i-1][0],dp[i-1][2]) + colorArr[i][1];
        dp[i][2] = min(dp[i-1][0],dp[i-1][1]) + colorArr[i][2];
    
    return min(dp[n-1])
    
print(solution());
