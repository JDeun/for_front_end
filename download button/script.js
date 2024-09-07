// 다운로드 버튼 클릭 시 파일 다운로드 기능
document.querySelector(".btn-download").addEventListener("click", function () {
    // 다운로드할 파일의 경로 설정 (사용자의 요구에 맞게 수정 가능)
    const fileUrl = "파일경로/파일명.zip";
  
    // 임시로 a 태그 생성하여 다운로드
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = "파일명.zip"; // 다운로드할 파일명 설정
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
  