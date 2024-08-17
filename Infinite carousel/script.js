document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');

  // 각 슬라이드에 클릭 이벤트 추가
  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      const link = slide.getAttribute('data-link');
      if (link) {
        window.location.href = link; // 클릭 시 해당 링크로 이동
      }
    });
  });

  // 캐로셀에 마우스를 올리면 애니메이션 멈추기
  const carousel = document.querySelector('.wrap');
  carousel.addEventListener('mouseenter', () => {
    carousel.style.animationPlayState = 'paused'; // 애니메이션 정지
  });

  // 캐로셀에서 마우스를 떼면 애니메이션 재개
  carousel.addEventListener('mouseleave', () => {
    carousel.style.animationPlayState = 'running'; // 애니메이션 재개
  });
});
