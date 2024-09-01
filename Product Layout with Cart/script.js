// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // 장바구니 항목 저장
    const cart = [];
    
    // 장바구니 사이드바 열기/닫기
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.toggle('open');
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    // 장바구니에 항목 추가
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.dataset.product;
            const price = parseInt(button.dataset.price, 10);

            cart.push({ product, price });
            updateCart();
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price;
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.product}</span>
                <span>₩${item.price.toLocaleString()}</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        cartCount.textContent = cart.length;
        cartTotal.textContent = `₩${total.toLocaleString()}`;
    }
});
