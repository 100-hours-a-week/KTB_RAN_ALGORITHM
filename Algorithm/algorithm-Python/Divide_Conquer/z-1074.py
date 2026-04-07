import sys

sys.stdin = open("../예제.txt")
input = sys.stdin.readline

n, r, c = map(int, input().split(" "))
# 목표 좌표: r(행), c(열)

# 전체 배열 크기: 2^n x 2^n
sizeXN = 2**n
sizeYN = 2**n

startX = 0;
startY = 0;
endX = sizeXN;
endY = sizeYN;


# 핵심 아이디어
# 1) Z 순서대로 배열을 직접 만들면 비효율적이다.
# 2) 현재 범위를 4등분해서 (r, c)가 속한 사분면만 재귀 탐색한다.
# 3) 선택한 사분면 이전에 지나간 칸 수(size*size)를 누적한다.
def funZ(startX, endX, startY, endY):
    # 현재 범위를 4등분하기 위한 중간 좌표
    midX = (startX + endX) // 2
    midY = (startY + endY) // 2
    size = midX - startX

    # 종료 조건: 1x1 칸까지 내려오면 추가 이동 수는 0
    if startX + 1 == endX and startY + 1 == endY:
        return 0;

    # Z 순서: 좌상 -> 우상 -> 좌하 -> 우하
    if c < midX and r < midY:  # 좌상
        return funZ(startX, midX, startY, midY)
    elif c >= midX and r < midY:  # 우상
        return size * size + funZ(midX, endX, startY, midY)
    elif c < midX and r >= midY:  # 좌하
        return size * size * 2 + funZ(startX, midX, midY, endY)
    elif c >= midX and r >= midY:  # 우하
        return size * size * 3 + funZ(midX, endX, midY, endY)


print(funZ(startX, endX, startY, endY))
