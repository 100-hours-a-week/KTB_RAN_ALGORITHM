function solution(cacheSize, cities) {
    var answer = 0;
    let cacheQueue = [];
    let citiesTop = "";
    let time = 0;

    for (let i = 0; i < cities.length; i++) {
        citiesTop = cities[i].toLowerCase();

        if (cacheQueue.indexOf(citiesTop) == -1) { // 캐시 미스
            time += 5;
        } else { // 캐시 히트
            time += 1;
            cacheQueue = cacheQueue.filter(i => i != citiesTop);
        }

        cacheQueue.push(citiesTop);

        if (cacheQueue.length > cacheSize) {
            cacheQueue.shift();
        }
    }

    return time;
}
