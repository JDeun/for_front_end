// 프로필 이미지 요소와 드롭다운 요소 선택
const profile = document.querySelector('.profile');
const dropdown = document.querySelector('.dropdown_wrapper');
const accountList = document.getElementById('account-list');

// 프로필 클릭 시 드롭다운 표시/숨기기
profile.addEventListener('click', (event) => {
    event.stopPropagation(); // 클릭 이벤트 전파 방지
    dropdown.classList.toggle('show');
});

// 드롭다운 외부 클릭 시 드롭다운 숨기기
document.addEventListener('click', (event) => {
    const isClickInsideDropdown = dropdown.contains(event.target);
    const isProfileClicked = profile.contains(event.target);
    if (!isClickInsideDropdown && !isProfileClicked) {
        dropdown.classList.remove('show');
    }
});

// 계정 전환 클릭 시 계정 업데이트
accountList.addEventListener('click', (event) => {
    const clickedItem = event.target.closest('li');
    if (clickedItem && !clickedItem.classList.contains('active')) {
        // 현재 활성 계정 비활성화
        const activeItem = accountList.querySelector('.active');
        if (activeItem) {
            activeItem.classList.remove('active');
        }

        // 클릭한 항목 활성화
        clickedItem.classList.add('active');
    }
});
