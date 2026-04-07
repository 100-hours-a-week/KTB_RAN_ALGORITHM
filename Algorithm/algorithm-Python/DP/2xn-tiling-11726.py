import sys

# 로컬 테스트 시 사용
# sys.stdin = open("../예제.txt", "r")
input = sys.stdin.readline

MOD = 10007


def solution():
    n = int(input().strip())

    if n == 1:
        return 1
    if n == 2:
        return 2

    # dp[i] = 2xi 보드를 채우는 경우의 수
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2

    for i in range(3, n + 1):
        # 마지막 모양 기준 분기:
        # 1) 세로 1개로 끝나면 dp[i-1]
        # 2) 가로 2개로 끝나면 dp[i-2]
        dp[i] = (dp[i - 1] + dp[i - 2]) % MOD

    return dp[n]


print(solution())
