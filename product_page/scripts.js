// FAQ 항목 클릭 시 토글 기능 추가
document.querySelectorAll('.faq div').forEach(faq => {
    faq.addEventListener('click', () => {
        const span = faq.querySelector('.faq-toggle');
        span.textContent = span.textContent === '+' ? '−' : '+';
    });
});

// "Add to Bag" 버튼 클릭 시 메시지 표시
document.getElementById('add-to-bag').addEventListener('click', () => {
    alert('제품이 장바구니에 추가되었습니다!');
});

// 메인 이미지와 썸네일 이미지 요소를 선택
const mainImage = document.querySelector('.main-image img');
const thumbnails = document.querySelectorAll('.thumbnail-container .thumbnail');

// 각 썸네일 이미지에 호버 이벤트를 추가
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('mouseover', (event) => {
        // 메인 이미지의 src를 현재 호버된 썸네일 이미지의 src로 변경
        mainImage.src = event.target.src;
    });

    thumbnail.addEventListener('mouseout', () => {
        // 기본 메인 이미지로 복원
        mainImage.src = 'https://cdn.pixabay.com/photo/2015/10/16/13/47/premium-991221_640.jpg';
    });
});
