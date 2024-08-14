// 로그인 폼을 선택합니다.
let loginForm = document.querySelector(".my-form");

// 폼 제출 시 동작을 정의합니다.
loginForm.addEventListener("submit", (e) => {
    // 기본 폼 제출 동작을 막습니다.
    e.preventDefault();

    // 이메일과 비밀번호 입력 요소를 선택합니다.
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    // 이메일과 비밀번호 값을 콘솔에 출력합니다.
    console.log("이메일:", email.value);
    console.log("비밀번호:", password.value);

    // 이메일과 비밀번호를 처리하고, API로 전송하는 로직을 추가하세요.
    // 예: 
    // fetch('/api/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         email: email.value,
    //         password: password.value
    //     })
    // }).then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error('Error:', error));
});
