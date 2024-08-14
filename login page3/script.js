// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 필요한 요소들 선택
    const loginForm = document.querySelector('.login');
    const usernameInput = loginForm.querySelector('input[type="text"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const submitButton = loginForm.querySelector('input[type="submit"]');

    // 폼 제출 이벤트 리스너
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // 기본 제출 동작 방지

        // 입력값 가져오기
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // 기본적인 유효성 검사
        if (username === '' || password === '') {
            showMessage('사용자 이름과 비밀번호를 모두 입력해주세요.', 'error');
            return;
        }

        // 여기에 실제 로그인 로직을 구현할 수 있습니다.
        // 예: 서버에 로그인 요청 보내기

        // 임시 로그인 성공 메시지 (실제 구현 시 이 부분을 수정하세요)
        showMessage('로그인 성공!', 'success');

        // 폼 리셋
        loginForm.reset();
    });

    // 메시지 표시 함수
    function showMessage(message, type) {
        // 기존 메시지 요소가 있다면 제거
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // 새 메시지 요소 생성
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.className = `message ${type}`;

        // 스타일 설정
        messageElement.style.position = 'absolute';
        messageElement.style.bottom = '10px';
        messageElement.style.left = '50%';
        messageElement.style.transform = 'translateX(-50%)';
        messageElement.style.padding = '10px';
        messageElement.style.borderRadius = '5px';
        messageElement.style.color = '#fff';
        messageElement.style.fontSize = '0.9em';
        messageElement.style.textAlign = 'center';

        if (type === 'error') {
            messageElement.style.backgroundColor = '#ff3333';
        } else if (type === 'success') {
            messageElement.style.backgroundColor = '#33cc33';
        }

        // 메시지를 폼에 추가
        loginForm.appendChild(messageElement);

        // 3초 후 메시지 제거
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }

    // 입력 필드에 포커스 효과 추가
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        });

        input.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
        });
    });
});