const passwordInput = document.querySelector("#password"); // 비밀번호 입력 필드 선택
const passwordIcon = document.querySelector(".input_icon"); // 비밀번호 아이콘 선택

// 비밀번호 아이콘 클릭 시 비밀번호 표시/숨기기 토글
passwordIcon.addEventListener("click", (e) => {
  e.preventDefault(); // 기본 동작 방지
  const isPassword = passwordInput.getAttribute('type') === 'password'; // 현재 입력 타입 확인
  passwordIcon.setAttribute(
    'src',
    isPassword ? 'assets/eye-off.svg' : 'assets/eye.svg' // 비밀번호 보이기/숨기기 아이콘 변경
  );
  passwordInput.setAttribute(
    'type',
    isPassword ? 'text' : 'password' // 입력 타입 변경
  );
});
