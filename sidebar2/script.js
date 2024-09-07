const expandBtn = document.querySelector(".expand-btn");
const allLinks = document.querySelectorAll(".sidebar-links a");

// 사이드바 토글 버튼 클릭 시 사이드바 상태 변경
expandBtn.addEventListener("click", () => {
  document.body.classList.toggle("collapsed");
});

// 현재 페이지 URL 가져오기
const current = window.location.href;

// 모든 링크에 클릭 이벤트 추가
allLinks.forEach((elem) => {
  elem.addEventListener("click", function () {
    // 모든 링크에서 호버 스타일 제거
    allLinks.forEach((link) => {
      link.classList.remove("hover");
    });

    // 클릭된 링크에만 호버 스타일 적용
    elem.classList.add("hover");
  });
});

// 검색 입력 필드에 포커스 시 사이드바 상태 변경
const searchInput = document.querySelector(".search__wrapper input");
searchInput.addEventListener("focus", () => {
  document.body.classList.remove("collapsed");
});
