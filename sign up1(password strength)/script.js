// 회원가입 폼 요소를 선택합니다.
const signupForm = document.getElementsByClassName("signup-form")[0];

// 이메일, 비밀번호, 비밀번호 확인 입력 필드를 선택합니다.
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

// 비밀번호 강도 표시 바를 선택합니다.
const power = document.getElementById("power-point");

// 비밀번호 강도를 계산하고 표시하는 함수
const passwordStrength = function () {
    let point = 0;
    let value = password.value;

    // 비밀번호 강도에 따른 너비와 색상 설정
    let widthPower = ["1%", "25%", "50%", "75%", "100%"];
    let colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];

    // 비밀번호가 6자 이상인 경우에만 강도 계산을 시작합니다.
    if (value.length >= 6) {
        let arrayTest = [/[0-9]/, /[a-z]/, /[A-Z]/, /[^0-9a-zA-Z]/];

        // 숫자, 소문자, 대문자, 특수문자의 포함 여부를 검사합니다.
        arrayTest.forEach((item) => {
            if (item.test(value)) {
                point += 1;
            }
        });
    }

    // 강도에 따라 표시 바의 너비와 색상을 업데이트합니다.
    power.style.width = widthPower[point];
    power.style.backgroundColor = colorPower[point];
};

// 비밀번호 필드에서 키를 눌렀을 때 강도 검사를 실행합니다.
password.addEventListener("keyup", passwordStrength);

// 폼이 제출되기 전에 실행할 작업을 설정합니다.
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // 실제로는 폼 제출 전에 추가 검증을 실행할 수 있습니다.
    console.log("Form submitted");
});

// 비밀번호와 비밀번호 확인이 일치하는지 확인하는 함수
function onChange() {
    if (confirmPassword.value === password.value) {
        // 일치하면 오류 메시지를 제거합니다.
        confirmPassword.setCustomValidity("");
    } else {
        // 일치하지 않으면 오류 메시지를 설정합니다.
        confirmPassword.setCustomValidity("Passwords do not match!");
    }
}

// 비밀번호와 비밀번호 확인 필드에서 값이 변경될 때마다 일치 여부를 확인합니다.
password.addEventListener("change", onChange);
confirmPassword.addEventListener("change", onChange);
