// 메뉴 토글 함수
function toggleMenu() {
    const body = document.body;
    const burgerButton = document.querySelector('.burger');
    
    // body 클래스 토글
    body.classList.toggle('open');
    
    // aria-expanded 속성 업데이트
    const isOpen = body.classList.contains('open');
    burgerButton.setAttribute('aria-expanded', isOpen);
}

// 키보드 접근성 개선
document.querySelector('.burger').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});

// 메뉴 아이템 포커스 관리
const menuItems = document.querySelectorAll('.menu a');
menuItems.forEach((item) => {
    item.addEventListener('focus', () => {
        if (!document.body.classList.contains('open')) {
            toggleMenu();
        }
    });
});