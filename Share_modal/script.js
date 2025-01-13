// 요소 선택
const modalDialog = document.querySelector(".copy-link-dialog");
const shareBtn = document.querySelector(".share-btn");
const closeBtn = document.querySelector(".close-btn");
const copyBtn = document.querySelector(".copy-link-btn");

// 다이얼로그 열고 닫기
shareBtn.addEventListener("click", () => {
    modalDialog.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    modalDialog.classList.remove("active");
});

// 링크 복사 기능
copyBtn.addEventListener("click", () => {
    const copyInput = document.getElementById("copy-link-input");
    copyInput.select();
    navigator.clipboard.writeText(copyInput.value)
        .then(() => {
            copyBtn.textContent = "복사 완료";
            setTimeout(() => copyBtn.textContent = "복사", 2000);
        })
        .catch((err) => {
            alert("복사에 실패했습니다. 다시 시도해주세요.");
            console.error("복사 실패: ", err);
        });
});
