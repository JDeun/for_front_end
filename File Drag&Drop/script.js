// 첫 번째 "dropzone-box" 클래스를 가진 요소를 선택
const dropzoneBox = document.getElementsByClassName("dropzone-box")[0];

// 드롭존 영역 내의 모든 파일 입력 요소를 선택
const inputFiles = document.querySelectorAll(".dropzone-area input[type='file']");
const inputElement = inputFiles[0];

// 가장 가까운 부모 요소 중 "dropzone-area" 클래스를 가진 요소를 찾음
const dropZoneElement = inputElement.closest(".dropzone-area");

// 파일 입력 요소의 변경 이벤트 리스너
// 파일 입력 요소에서 파일이 선택될 때 실행됨
inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
        updateDropzoneFileList(dropZoneElement, inputElement.files[0]);
    }
});

// 파일 드롭 이벤트 리스너
// 파일이 드롭존에 드롭될 때 실행됨
dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateDropzoneFileList(dropZoneElement, e.dataTransfer.files[0]);
        dropZoneElement.classList.remove("dropzone--over");
    }
});

// 드롭존의 메시지를 파일 정보로 업데이트하는 함수
const updateDropzoneFileList = (dropzoneElement, file) => {
    let dropzoneFileMessage = dropzoneElement.querySelector(".message");
    dropzoneFileMessage.innerHTML = `${file.name}, ${file.size} bytes`;
};

// 드래그 오버 이벤트 리스너
// 파일이 드롭존 위로 드래그될 때 실행됨
dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("dropzone--over");
});

// 드래그 리브와 드래그 엔드 이벤트 리스너
// 파일이 드롭존을 벗어나거나 드래그가 끝날 때 실행됨
["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("dropzone--over");
    });
});

// 폼 리셋 이벤트 리스너
// 폼이 리셋될 때 드롭존 메시지를 초기 상태로 되돌림
dropzoneBox.addEventListener("reset", (e) => {
    let dropzoneFileMessage = dropZoneElement.querySelector(".message");
    dropzoneFileMessage.innerHTML = `No Files Selected`;
});

// 폼 제출 이벤트 리스너
// 폼 제출을 방지하고 선택된 파일을 콘솔에 출력
dropzoneBox.addEventListener("submit", (e) => {
    e.preventDefault();
    const myFile = document.getElementById("upload-file");
    console.log(myFile.files[0]);
});
