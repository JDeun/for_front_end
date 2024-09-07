// 필터링 버튼과 카드 요소 선택
const filterButtons = document.querySelectorAll('.categories li a');
const cards = document.querySelectorAll('.card');

// 버튼 클릭 시 카드 필터링
filterButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    filterButtons.forEach(btn => btn.classList.remove('active')); // 모든 버튼의 active 클래스 제거
    button.classList.add('active'); // 클릭된 버튼에 active 클래스 추가
    
    const filter = button.textContent.toLowerCase();
    
    cards.forEach(card => {
      if (filter === '전체' || card.querySelector('.card-title').textContent.toLowerCase().includes(filter)) {
        card.style.display = 'flex'; // 조건에 맞는 카드 표시
      } else {
        card.style.display = 'none'; // 조건에 맞지 않는 카드 숨김
      }
    });
  });
});

// 모달 관련 변수
const modal = document.getElementById('modal');
const closeModalBtn = document.querySelector('.close-btn');
const modalImg = modal.querySelector('.carousel img');
const modalBody = modal.querySelector('.modal-body');

// 모든 '자세히 보기' 버튼을 선택합니다.
const viewDetailsButtons = document.querySelectorAll('.card-btn');

// 각 '자세히 보기' 버튼에 클릭 이벤트를 추가합니다.
viewDetailsButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    const imgSrc = card.querySelector('.card-img').src;
    const title = card.querySelector('.card-title').textContent;
    
    // 모달에 카드 이미지와 제목을 설정합니다.
    modalImg.src = imgSrc;
    modalBody.querySelector('h2').textContent = title; // 제목을 추가
    
    modal.style.display = 'flex'; // 모달을 표시합니다.
  });
});

// 모달 닫기 버튼에 클릭 이벤트를 추가합니다.
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none'; // 모달을 숨깁니다.
});

// 모달 영역 밖을 클릭하면 모달을 닫습니다.
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
