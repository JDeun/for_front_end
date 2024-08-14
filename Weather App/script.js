// API 설정
const API_KEY = "07a61bcaff62440c2c415905042eb877";
const WEATHER_API_BASE = "https://api.openweathermap.org/data/2.5/weather"; // One Call API 대신 일반 Weather API 사용
const GEO_API_BASE = "https://api.openweathermap.org/geo/1.0/direct";

// DOM 요소 선택
const searchBox = document.querySelector(".search-box");
const city = document.querySelector(".location .city");
const dateElement = document.querySelector(".location .date");
const temp = document.querySelector(".current .temp");
const weatherElement = document.querySelector(".current .weather");
const hiLow = document.querySelector(".current .hi-low");

// 날씨 상태에 따른 배경 이미지 매핑
const weatherBackgrounds = {
    Clear: "https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618_1280.jpg",
    Clouds: "https://cdn.pixabay.com/photo/2017/11/04/08/14/clouds-2916718_1280.jpg",
    Rain: "https://cdn.pixabay.com/photo/2018/05/31/13/13/rainy-day-3443977_1280.jpg",
    Snow: "https://cdn.pixabay.com/photo/2019/12/30/20/34/road-4730553_1280.jpg",
    Thunderstorm: "https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_1280.jpg",
    Drizzle: "https://cdn.pixabay.com/photo/2017/11/14/10/43/rain-2948852_1280.jpg",
    Mist: "https://cdn.pixabay.com/photo/2017/08/02/15/50/mountains-2571774_1280.jpg",
    default: "https://cdn.pixabay.com/photo/2019/12/28/11/03/sea-4724317_640.jpg"
};

// 이벤트 리스너 설정
searchBox.addEventListener("keypress", setQuery);

// 페이지 로드 시 사용자 위치 요청
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
    } else {
        alert("브라우저가 위치 정보를 지원하지 않습니다. 수동으로 도시를 검색해주세요.");
    }
});

// 위치 정보 요청 성공 시 처리
function positionSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
}

// 위치 정보 요청 실패 시 처리
function positionError() {
    alert("위치 정보를 가져올 수 없습니다. 수동으로 도시를 검색해주세요.");
    getResults("Seoul"); // 기본값으로 서울 날씨 표시
}

// 날씨 정보 가져오기
async function getWeather(lat, lon) {
    try {
        const response = await fetch(`${WEATHER_API_BASE}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=kr`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const weatherData = await response.json();
        console.log("Weather API Response:", weatherData);
        displayResults(weatherData);
    } catch (error) {
        console.error("날씨 정보를 가져오는 중 오류 발생:", error);
        alert("날씨 정보를 가져오는데 실패했습니다. 다시 시도해주세요.");
    }
}

// 엔터 키 입력 시 검색 실행
function setQuery(evt) {
    if (evt.key === "Enter") {
        getResults(searchBox.value);
    }
}

// 도시 이름으로 날씨 정보 가져오기
async function getResults(query) {
    try {
        console.log("Searching for:", query);
        const response = await fetch(`${WEATHER_API_BASE}?q=${query}&units=metric&appid=${API_KEY}&lang=kr`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const weatherData = await response.json();
        console.log("Weather API Response:", weatherData);
        displayResults(weatherData);
    } catch (error) {
        console.error("날씨 정보를 가져오는 중 오류 발생:", error);
        alert("날씨 정보를 가져오는데 실패했습니다. 도시 이름을 확인하고 다시 시도해주세요.");
    }
}

// 날씨 정보 화면에 표시
function displayResults(weather) {
    if (!weather || !weather.name) {
        console.error("Invalid weather data:", weather);
        alert("날씨 정보를 표시할 수 없습니다.");
        return;
    }

    console.log("Displaying results for:", weather.name);

    city.textContent = `${weather.name}, ${weather.sys.country}`;
    
    const now = new Date();
    dateElement.textContent = dateBuilder(now);
    
    if (typeof weather.main.temp !== 'undefined') {
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    } else {
        temp.innerHTML = `N/A<span>°C</span>`;
    }

    weatherElement.textContent = weather.weather[0].description || '날씨 정보 없음';

    if (typeof weather.main.temp_min !== 'undefined' && typeof weather.main.temp_max !== 'undefined') {
        hiLow.textContent = `최저 ${Math.round(weather.main.temp_min)}°C / 최고 ${Math.round(weather.main.temp_max)}°C`;
    } else {
        hiLow.textContent = 'N/A';
    }

    // 배경 이미지 변경
    changeBackgroundImage(weather.weather[0].main);
}

// 날짜 형식 생성
function dateBuilder(d) {
    const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${year}년 ${month} ${date}일 ${day}`;
}

// 배경 이미지 변경 함수
function changeBackgroundImage(weatherCondition) {
    const body = document.body;
    const imageUrl = weatherBackgrounds[weatherCondition] || weatherBackgrounds.default;
    body.style.backgroundImage = `url(${imageUrl})`;
}