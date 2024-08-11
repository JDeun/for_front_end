// HTML 요소들 가져오기
const banner = document.getElementById("banner");
const loginContainer = document.getElementById("login-container");
const signupContainer = document.getElementById("signup-container");
const loginToggle = document.getElementById("login-form-toggler");
const signupToggle = document.getElementById("signup-form-toggler");

// 회원가입 버튼 클릭 시 이벤트 리스너
signupToggle.addEventListener('click', () => {
    banner.style.transform = "translateX(-100%)";
    loginContainer.style.transform = "scale(0)";
    signupContainer.style.transform = "scale(1)";
});

// 로그인 버튼 클릭 시 이벤트 리스너
loginToggle.addEventListener('click', () => {
    banner.style.transform = "translateX(0%)";
    signupContainer.style.transform = "scale(0)";
    loginContainer.style.transform = "scale(1)";
});

// 백엔드와 연결하기 위한 설명
// 1. 로그인 폼 데이터 전송
//    - 로그인 버튼 클릭 시 이벤트를 추가하여 사용자 입력을 서버로 전송합니다.
//    - 예를 들어, 다음과 같이 `fetch`를 사용할 수 있습니다:
document.querySelector('.login-container .account-controls > button').addEventListener('click', () => {
    const email = document.querySelector('.login-container input[type="email"]').value;
    // 비밀번호 입력란이 있는 경우 추가로 수집해야 합니다.
    // 예: const password = document.querySelector('.login-container input[type="password"]').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })  // 비밀번호를 추가해야 할 수 있습니다.
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // 로그인 성공 시 리다이렉트
            window.location.href = '/dashboard';  // 대시보드나 메인 페이지로 리다이렉트
        } else {
            // 로그인 실패 시 에러 처리
            alert('로그인 실패. 이메일이나 비밀번호를 확인하세요.');
        }
    })
    .catch(error => {
        console.error('로그인 중 오류 발생:', error);
    });
});

// 2. 회원가입 폼 데이터 전송
//    - 회원가입 버튼 클릭 시 이벤트를 추가하여 사용자 입력을 서버로 전송합니다.
document.querySelector('.signup-container .account-controls > button').addEventListener('click', () => {
    const email = document.querySelector('.signup-container input[type="email"]').value;
    const password = document.querySelector('.signup-container input[type="password"]').value;

    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // 회원가입 성공 시 로그인 페이지로 리다이렉트
            window.location.href = '/login';  // 로그인 페이지로 리다이렉트
        } else {
            // 회원가입 실패 시 에러 처리
            alert('회원가입 실패. 이메일이나 비밀번호를 확인하세요.');
        }
    })
    .catch(error => {
        console.error('회원가입 중 오류 발생:', error);
    });
});
