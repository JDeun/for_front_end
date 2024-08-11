// 대시보드 카드 클릭 시 세부 정보 표시 기능 추가
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      alert(`클릭한 카드: ${card.querySelector('h2').textContent}`);
      // 여기에 백엔드 API 호출 등을 추가하여 카드의 세부 정보를 가져올 수 있습니다.
    });
  });
  
  // 백엔드와 연결할 경우, 데이터 가져오기 함수 예제
  async function fetchData() {
    try {
      const response = await fetch('https://api.example.com/dashboard'); // 실제 API 엔드포인트로 변경
      const data = await response.json();
      // 데이터를 사용하여 대시보드 업데이트
      console.log(data);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  }
  
  // 페이지 로드 시 데이터 가져오기
  window.addEventListener('DOMContentLoaded', fetchData);
  