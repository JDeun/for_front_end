// 메뉴 토글 함수
function menutoggle() {
    const menuItems = document.getElementById('MenuItems');
    if (menuItems.classList.contains('active')) {
        menuItems.classList.remove('active');
    } else {
        menuItems.classList.add('active');
    }
}



// 장바구니 버튼 클릭 시 알림
document.addEventListener("DOMContentLoaded", function() {
    const cartButton = document.querySelector("a[href='cart.html']");
    
    cartButton.addEventListener("click", function(event) {
        event.preventDefault(); // 기본 동작 방지
        alert("장바구니 페이지로 이동합니다.");
        window.location.href = "cart.html"; // 장바구니 페이지로 이동
    });
});