document.addEventListener('DOMContentLoaded', () => {
    const notification = document.querySelector('.notification');
    const progress = document.querySelector('.notification-progress');

    // 알림이 화면에 보이도록 설정합니다.
    notification.style.opacity = 1;
    notification.style.visibility = 'visible';
  
    // 진행 바 애니메이션을 완료 후 알림을 숨깁니다.
    setTimeout(() => {
      notification.style.opacity = 0;
      notification.style.visibility = 'hidden';
    }, 3000); // 3초 후에 숨기기 시작
});
