// 플레이 버튼을 클릭하면 일시정지 버튼으로 바뀌는 기능을 구현합니다.
const playPauseBtn = document.getElementById("playPauseBtn"); // 버튼 요소 선택
const icon = document.getElementById("icon"); // 아이콘 요소 선택
let isPlaying = false; // 현재 재생 상태 여부

playPauseBtn.addEventListener("click", function () {
    // 클릭 시 아이콘을 변경
    if (isPlaying) {
        icon.classList.remove("bi-pause-fill"); // 일시정지 아이콘 제거
        icon.classList.add("bi-play-fill"); // 플레이 아이콘 추가
    } else {
        icon.classList.remove("bi-play-fill"); // 플레이 아이콘 제거
        icon.classList.add("bi-pause-fill"); // 일시정지 아이콘 추가
    }
    isPlaying = !isPlaying; // 상태 전환
});
