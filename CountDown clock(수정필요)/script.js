// DOM 요소 선택
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const digitWrappers = document.querySelectorAll('.digit-wrapper');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

let countdownInterval;
let remainingTime = 0;

// 시작 버튼 클릭 이벤트
startBtn.addEventListener('click', startCountdown);

// 리셋 버튼 클릭 이벤트
resetBtn.addEventListener('click', resetCountdown);

// 카운트다운 시작 함수
function startCountdown() {
    // 사용자가 입력한 시간을 가져옴
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    // 총 시간을 밀리초 단위로 계산
    remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

    if (remainingTime <= 0) {
        alert('유효한 시간을 입력해주세요.');
        return;
    }

    // 이미 실행 중이면 중지
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    // 화면 즉시 업데이트
    updateDisplay();

    // 10밀리초마다 시간 갱신 (1/100초 단위로 업데이트)
    countdownInterval = setInterval(() => {
        remainingTime -= 10;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            remainingTime = 0;
            updateDisplay();
            alert('카운트다운 종료!');
            resetCountdown();
            return;
        }

        updateDisplay();
    }, 10);

    startBtn.disabled = true;
    hoursInput.disabled = true;
    minutesInput.disabled = true;
    secondsInput.disabled = true;
}

// 카운트다운 리셋 함수
function resetCountdown() {
    clearInterval(countdownInterval);
    remainingTime = 0;
    updateDisplay();

    startBtn.disabled = false;
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;

    // 입력 필드 초기화
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
}

// 화면 표시 업데이트 함수
function updateDisplay() {
    const totalSeconds = Math.ceil(remainingTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hundredths = Math.floor((remainingTime % 1000) / 10);

    // 각 자릿수 업데이트
    updateDigit('minutes', 'tens', Math.floor(minutes / 10));
    updateDigit('minutes', 'ones', minutes % 10);
    updateDigit('seconds', 'tens', Math.floor(seconds / 10));
    updateDigit('seconds', 'ones', seconds % 10);
    updateDigit('hundredths', 'tens', Math.floor(hundredths / 10));
    updateDigit('hundredths', 'ones', hundredths % 10);
}

// 개별 숫자 업데이트 함수
function updateDigit(unit, position, value) {
    const wrapper = document.querySelector(`.time-part.${unit}.${position} .digit-wrapper`);
    wrapper.style.transform = `translateY(-${value * 180}px)`;
}

// 초기 화면 설정
updateDisplay();