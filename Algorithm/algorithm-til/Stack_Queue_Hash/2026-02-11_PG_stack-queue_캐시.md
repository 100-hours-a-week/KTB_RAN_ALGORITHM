## 🧩 문제

* **문제 제목** : [1차] 캐시
* **문제 레벨** : Level 2
* **문제 유형** : 스택/큐 (Queue, LRU 시뮬레이션)
* **문제 제공** : Programmers
* **문제 링크** : https://school.programmers.co.kr/learn/courses/30/lessons/17680
* **코드 파일** : [cache-17680.js](../../algorithm-JS/1.%20Stack_Queue_Hash/cache-17680.js)

---

## 🧩 문제 설명

도시 이름 배열 `cities`를 순서대로 조회할 때, 캐시 히트/미스 비용을 누적해 총 실행 시간을 구하는 문제다.

* cache hit: `1`
* cache miss: `5`
* 대소문자는 구분하지 않는다.

---

## 🧩 문제 핵심 포인트

* 캐시는 최근 사용 순서(LRU)를 유지해야 한다.
* 같은 도시가 다시 나오면 기존 위치에서 제거 후 가장 최근 위치(뒤)로 이동한다.
* 캐시 크기를 넘으면 가장 오래된 항목(앞)을 제거한다.

---

## 🧩 내 풀이 방식

* `cities`를 순회하면서 도시명을 소문자로 변환한다.
* 캐시에 없으면 미스(`+5`), 있으면 히트(`+1`) 처리한다.
* 히트인 경우 기존 도시를 `filter`로 제거한 뒤 다시 `push`해서 최신 사용으로 만든다.
* `cacheSize`를 넘으면 `shift`로 가장 오래된 도시를 제거한다.
* 반복이 끝나면 누적 시간 `time`을 반환한다.

-> 배열에서 중간 값을 빼고 싶을 경우 filter 또는 splice를 사용.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. 도시명을 소문자로 변환
2. 캐시에 존재 여부 확인(indexOf)
3. miss면 +5, hit면 +1 후 기존 값 제거
4. 현재 도시를 캐시 뒤에 추가
5. 캐시 크기 초과 시 앞에서 제거
6. 총 time 반환
```

---

## 🧩 코드 구현 (내 풀이)

```js
function solution(cacheSize, cities) {
    var answer = 0;
    let cacheQueue = [];
    let citiesTop = "";
    let time = 0;
    

    for(let i=0;i<cities.length;i++){
        citiesTop = cities[i].toLowerCase();
        
        if(cacheQueue.indexOf(citiesTop) == -1){ //캐시가 없다. cache miss
            time+=5;
        }else{ //있는거임 cache hit
            time+=1;
            cacheQueue = cacheQueue.filter(i=>i!=citiesTop);
        }
        
        cacheQueue.push(citiesTop);
        
        if(cacheQueue.length>cacheSize){
            cacheQueue.shift();
        }
    }
    
    return time;
}
```

---

## 🧩 사용된 JS 개념

* `toLowerCase()` : 대소문자 구분 제거
* `indexOf()` : 캐시 hit/miss 판별
* `filter()` : hit 도시의 기존 위치 제거
* `push()` : 최신 사용 도시 삽입
* `shift()` : LRU(가장 오래된 도시) 제거

---

## 🧩 개선 포인트

* 현재 코드는 `indexOf`, `filter`, `shift`가 모두 선형 탐색/이동이라 `O(n * cacheSize)` 패턴이다.
* 문제 요구사항 범위에서는 통과 가능하지만, 캐시 연산만 보면 더 효율적으로 바꿀 수 있다.
* 개선 시에는 `Map` 기반으로 최근 사용 순서를 관리해 hit 처리 비용을 줄일 수 있다.

---

## 개선 코드

```javascript
function solution(cacheSize, cities) {
  if (cacheSize === 0) {
    return cities.length * 5;
  }

  let time = 0;
  const cache = new Map();

  for (let city of cities) {
    city = city.toLowerCase();

    if (cache.has(city)) {
      // cache hit
      time += 1;

      // 최근 사용 처리 (뒤로 이동)
      cache.delete(city);
      cache.set(city, true);

    } else {
      // cache miss
      time += 5;

      if (cache.size >= cacheSize) {
        // 가장 오래된 것 제거
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
      }

      cache.set(city, true);
    }
  }

  return time;
}

```