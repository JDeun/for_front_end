// login.js

// DOMContentLoaded 이벤트는 HTML 문서가 완전히 로드되었을 때 실행됩니다.
document.addEventListener('DOMContentLoaded', () => {
    // 로그인 버튼 요소를 가져옵니다.
    const loginButton = document.querySelector('.login-btn');
  
    // 로그인 버튼에 클릭 이벤트 리스너를 추가합니다.
    loginButton.addEventListener('click', handleLogin);
  
    // 로그인 처리 함수입니다.
    function handleLogin() {
      // 사용자 입력 필드의 값을 가져옵니다.
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
  
      // 입력 검증을 수행합니다.
      if (!validateEmail(email)) {
        alert('유효한 이메일을 입력해 주세요.');
        return;
      }
      
      if (password === '') {
        alert('비밀번호를 입력해 주세요.');
        return;
      }
  
      // 로그인 요청을 서버로 보냅니다.
      loginUser(email, password);
    }
  
    // 이메일의 유효성을 검사하는 함수입니다.
    function validateEmail(email) {
      // 이메일 형식을 검사하기 위한 정규 표현식입니다.
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    // 서버에 로그인 요청을 보내는 함수입니다.
    function loginUser(email, password) {
      // 로그인 요청을 서버로 보내기 위해 fetch를 사용합니다.
      fetch('/api/login', { // 로그인 API의 URL로 변경
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) // 이메일과 비밀번호를 JSON 형식으로 전송
      })
      .then(response => {
        if (response.ok) {
          return response.json(); // 응답을 JSON 형식으로 변환
        }
        throw new Error('로그인 실패');
      })
      .then(data => {
        // 로그인 성공 시 처리
        alert('로그인 성공!');
        // 성공 시 리디렉션 등의 후속 작업을 수행할 수 있습니다.
        window.location.href = '/dashboard'; // 대시보드 페이지로 이동
      })
      .catch(error => {
        // 로그인 실패 시 에러 처리
        alert(error.message);
      });
    }
  });
  