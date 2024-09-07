// 페이지 로드 시 현재 페이지의 URL을 입력 필드에 설정
window.addEventListener("DOMContentLoaded", () => {
    const copyInput = document.getElementById("copy-link-input");
    copyInput.value = window.location.href;
  });
  
  // 모달과 버튼 요소들 선택
  const modalDialog = document.querySelector(".copy-link-dialog");
  const shareBtn = document.querySelector(".share-btn");
  const closeBtn = document.querySelector(".close-btn");
  const copyBtn = document.querySelector(".copy-btn");
  
  // 공유 버튼 클릭 시 모달 창 열기
  shareBtn.addEventListener("click", () => {
    modalDialog.classList.remove("copy-link-dialog--fadeout");
    modalDialog.showModal();
  });
  
  // 닫기 버튼 클릭 시 모달 창 닫기
  closeBtn.addEventListener("click", () => {
    modalDialog.classList.add("copy-link-dialog--fadeout");
    modalDialog.close();
  });
  
  // 복사 버튼 클릭 시 링크를 클립보드에 복사
  copyBtn.addEventListener("click", () => {
    const copyInput = document.getElementById("copy-link-input");
    copyInput.select();
    copyInput.setSelectionRange(0, 99999); // 모바일 브라우저 대응
    navigator.clipboard.writeText(copyInput.value);
  
    // "복사 완료" 메시지 표시
    const copyText = document.getElementById("copy-text");
    copyText.innerHTML = "복사 완료!";
  });
  