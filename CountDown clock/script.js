document.addEventListener('DOMContentLoaded', () => {
    // 버튼 및 입력 필드 참조
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const hourInput = document.getElementById('hourInput');
    const minuteInput = document.getElementById('minuteInput');
    const secondInput = document.getElementById('secondInput');
    const hourDisplay = document.getElementById('hour');
    const minuteDisplay = document.getElementById('minute');
    const secondDisplay = document.getElementById('second');

    let timer; // 타이머의 ID를 저장할 변수
    let isPaused = false; // 타이머가 일시정지 상태인지 여부
    let isRunning = false; // 타이머가 실행 중인지 여부
    let remainingTime; // 남은 시간(초 단위)

    // 타이머 디스플레이를 업데이트하는 함수
    function updateDisplay() {
        const hours = Math.floor(remainingTime / 3600); // 남은 시간을 시 단위로 변환
        const minutes = Math.floor((remainingTime % 3600) / 60); // 남은 시간을 분 단위로 변환
        const seconds = remainingTime % 60; // 남은 시간을 초 단위로 변환
        // 디스플레이를 두 자릿수로 포맷
        hourDisplay.textContent = String(hours).padStart(2, '0');
        minuteDisplay.textContent = String(minutes).padStart(2, '0');
        secondDisplay.textContent = String(seconds).padStart(2, '0');
    }

    // 타이머를 시작하는 함수
    function startTimer() {
        // 입력 필드에서 값을 읽어와서 남은 시간 계산
        const hours = parseInt(hourInput.value) || 0;
        const minutes = parseInt(minuteInput.value) || 0;
        const seconds = parseInt(secondInput.value) || 0;

        // 입력 필드가 비어있다면 알림을 표시
        if (hours <= 0 && minutes <= 0 && seconds <= 0) {
            alert('시간을 입력하세요.');
            return;
        }

        if (isRunning) return; // 타이머가 이미 실행 중이면 함수 종료
        isRunning = true;
        isPaused = false;
        remainingTime = hours * 3600 + minutes * 60 + seconds; // 남은 시간 초기화

        // 타이머가 종료되었는지 확인하고 타이머 디스플레이 업데이트
        timer = setInterval(() => {
            if (remainingTime <= 0) {
                clearInterval(timer);
                isRunning = false;
                alert('타이머가 종료되었습니다.');
                updateDisplay();
                return;
            }
            remainingTime--;
            updateDisplay();
        }, 1000);

        // 버튼 상태 업데이트
        startButton.classList.add('active');
        pauseButton.textContent = '일시정지';
        pauseButton.classList.remove('active');
        resetButton.classList.remove('active');
    }

    // 타이머를 일시정지하는 함수
    function pauseTimer() {
        if (!isRunning || isPaused) return; // 타이머가 실행 중이지 않거나 이미 일시정지 상태일 때 함수 종료
        clearInterval(timer);
        isPaused = true;
        // 버튼 상태 업데이트
        startButton.classList.remove('active');
        pauseButton.textContent = '다시시작';
        pauseButton.classList.add('active');
        resetButton.classList.remove('active');
    }

    // 타이머를 다시 시작하는 함수
    function resumeTimer() {
        if (!isPaused) return; // 타이머가 일시정지 상태가 아닐 때 함수 종료
        isPaused = false;
        timer = setInterval(() => {
            if (remainingTime <= 0) {
                clearInterval(timer);
                isRunning = false;
                alert('타이머가 종료되었습니다.');
                updateDisplay();
                return;
            }
            remainingTime--;
            updateDisplay();
        }, 1000);

        // 버튼 상태 업데이트
        startButton.classList.add('active');
        pauseButton.textContent = '일시정지';
        pauseButton.classList.remove('active');
        resetButton.classList.remove('active');
    }

    // 타이머를 리셋하는 함수
    function resetTimer() {
        clearInterval(timer); // 기존 타이머 종료
        isRunning = false;
        isPaused = false;
        remainingTime = 0;
        updateDisplay(); // 디스플레이를 00:00:00으로 설정
        // 버튼 상태 업데이트
        startButton.classList.remove('active');
        pauseButton.classList.remove('active');
        resetButton.classList.remove('active');
    }

    // 버튼 클릭 이벤트 핸들러 등록
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', () => {
        if (isPaused) {
            resumeTimer(); // 일시정지 상태에서 다시 시작
        } else {
            pauseTimer(); // 타이머 일시정지
        }
    });
    resetButton.addEventListener('click', () => {
        resetTimer();
    });
});
