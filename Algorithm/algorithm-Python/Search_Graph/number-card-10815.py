import sys

# sys.stdin = open("../예제.txt")
input = sys.stdin.readline


def solution(cards, target):
    left = 0
    right = len(cards) - 1

    while left <= right:
        mid = (left + right) // 2

        if cards[mid] == target:
            return 1
        if cards[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return 0


n = int(input())
cards = list(map(int, input().split()))

m = int(input())
queries = list(map(int, input().split()))

cards.sort()

answer = []
for query in queries:
    answer.append(solution(cards, query))

print(*answer)
