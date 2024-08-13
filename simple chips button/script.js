// 모든 칩 요소 선택
const chips = document.querySelectorAll('.chip');

// 각 칩에 클릭 이벤트 리스너 추가
chips.forEach(chip => {
    chip.addEventListener('click', () => {
        // 배경 요소 찾기
        const background = chip.querySelector('.chip-background');
        
        // 배경 요소가 존재하면 활성화 상태 토글
        if (background) {
            background.classList.toggle('active');
            
            // 접근성: aria-pressed 상태 업데이트
            const isPressed = background.classList.contains('active');
            chip.setAttribute('aria-pressed', isPressed);
            
            // 선택된 과일 로깅 (필요에 따라 다른 로직으로 대체 가능)
            console.log(`선택된 과일: ${chip.textContent.trim()}`);
        }
    });
});

// 키보드 접근성 개선
chips.forEach(chip => {
    chip.addEventListener('keydown', (event) => {
        // 스페이스바 또는 엔터 키 입력 시 클릭 이벤트 트리거
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault(); // 기본 동작 방지
            chip.click();
        }
    });
});