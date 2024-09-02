// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

// 페이지 스크롤에 따라 progress 요소 애니메이션 설정
gsap.to("progress", {
    value: 100, // 진행 바가 100%까지 애니메이션
    scrollTrigger: {
        scrub: 0.5 // 스크롤과 애니메이션 동기화
    }
});
