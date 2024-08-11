// DOM 요소 선택
const bars = document.querySelector("#bars"),
    strengthDiv = document.querySelector("#strength"),
    passwordInput = document.querySelector("#password"),
    emailInput = document.querySelector("#email");

// 비밀번호 강도 상태
const strength = {
    1: "weak",
    2: "medium",
    3: "strong",
};

// 비밀번호 강도를 평가하는 함수
const getIndicator = (password, strengthValue) => {
    // 대문자, 소문자, 숫자, 특수문자 포함 여부 확인
    strengthValue.upper = /[A-Z]/.test(password);
    strengthValue.lower = /[a-z]/.test(password);
    strengthValue.numbers = /[0-9]/.test(password);
    strengthValue.special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // 강도 점수 계산
    let strengthIndicator = Object.values(strengthValue).filter(Boolean).length;
    
    // 비밀번호 길이에 따른 추가 점수
    if (password.length >= 8) strengthIndicator++;
    
    return strength[Math.min(strengthIndicator, 3)] || "";
};

// 비밀번호 강도 값을 반환하는 함수
const getStrength = (password) => {
    let strengthValue = {
        upper: false,
        lower: false,
        numbers: false,
        special: false
    };
    return getIndicator(password, strengthValue);
};

// 비밀번호 입력 시 호출되는 함수
const handlePasswordChange = () => {
    let password = passwordInput.value;
    const strengthText = getStrength(password);
    
    // 모든 강도 클래스 제거
    bars.classList.remove("weak", "medium", "strong");
    bars.querySelector("div").style.width = "0";

    if (strengthText) {
        strengthDiv.innerText = `${strengthText.charAt(0).toUpperCase() + strengthText.slice(1)} 비밀번호`;
        bars.classList.add(strengthText);
        
        // 강도에 따라 바의 너비 설정
        let width = strengthText === "weak" ? "33.33%" :
                    strengthText === "medium" ? "66.66%" : "100%";
        bars.querySelector("div").style.width = width;
    } else {
        strengthDiv.innerText = "";
    }
};

// 이메일 유효성 검사 함수
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// 폼 유효성 검사 및 제출 함수
const validateForm = () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const strengthText = getStrength(password);

    if (!isValidEmail(email)) {
        alert('유효한 이메일 주소를 입력해주세요.');
        return;
    }

    if (strengthText === "weak") {
        document.querySelector('.card').classList.add('shake');
        setTimeout(() => {
            document.querySelector('.card').classList.remove('shake');
        }, 300);
        alert('비밀번호를 더 강화해주세요.');
        return;
    }

    // 백엔드로 데이터 전송
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('회원가입이 완료되었습니다.');
            // 로그인 페이지로 리다이렉트 또는 추가 작업 수행
        } else {
            alert('회원가입 중 오류가 발생했습니다: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('회원가입 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    });
};

// 이벤트 리스너 등록
passwordInput.addEventListener('input', handlePasswordChange);

// 회원가입 버튼에 이벤트 리스너 추가 (HTML에 onclick 속성이 없다고 가정)
document.querySelector('button.control').addEventListener('click', validateForm);