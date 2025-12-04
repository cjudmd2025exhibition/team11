// Intro 페이지 휠/터치 감지 및 애니메이션
(function initIntroAnimation() {
    const introSection = document.getElementById('intro-section');
    const body = document.body;
    
    if (!introSection) return;

    let hasAnimated = false;
    const ANIMATION_DURATION = 800; // CSS transition 시간과 동일하게 0.8초

    // *터치 시작 Y 좌표를 저장**
    let touchStartY = 0; 

    // 애니메이션 실행 및 페이지 전환 함수
    function playAnimation() {
        if (hasAnimated) return;
        hasAnimated = true;

        // 1. 애니메이션 시작: body에 클래스 추가하여 CSS 애니메이션 트리거
        body.classList.add('animate-out'); 

        // 2. 이벤트 리스너 제거 (중복 실행 방지)
        window.removeEventListener('wheel', handleWheel, { passive: false });
        window.removeEventListener('keydown', handleKeyPress);
        // [수정] 터치 이벤트 리스너 제거
        introSection.removeEventListener('touchstart', handleTouchStart);
        introSection.removeEventListener('touchend', handleTouchEnd); 
        
        // 3. 애니메이션 완료 시간 후 페이지 전환
        setTimeout(() => {
            window.location.href = 'index.html';
        }, ANIMATION_DURATION); 
    }

    // --------------------------------------------------
    // 1. PC: 휠 이벤트 리스너
    function handleWheel(event) {
        if (event.deltaY > 0) { // 아래로 스크롤 시
            event.preventDefault(); 
            playAnimation();
        }
    }
    
    // 2. PC: 키보드 이벤트 리스너
    function handleKeyPress(event) {
        if (event.keyCode === 32 || event.keyCode === 40) { 
            event.preventDefault(); 
            playAnimation();
        }
    }
    
    // --------------------------------------------------
    // 3. 모바일: 터치 시작 이벤트 리스너
    function handleTouchStart(event) {
        // 첫 번째 손가락의 Y좌표 저장
        touchStartY = event.touches[0].clientY;
    }

    // 4. 모바일: 터치 끝 이벤트 리스너
    function handleTouchEnd(event) {
        // 터치 끝난 시점의 Y좌표
        const touchEndY = event.changedTouches[0].clientY;
        // 스와이프 거리 (최소 50px 이상 움직여야 스와이프로 인정)
        const swipeDistance = touchStartY - touchEndY;
        const MIN_SWIPE_DISTANCE = 50; 

        // touchStartY가 touchEndY보다 크면 (손가락을 아래에서 위로 올린 경우 = 다음 섹션으로 이동)
        if (swipeDistance > MIN_SWIPE_DISTANCE) {
            playAnimation();
        }
    }
    // --------------------------------------------------


    // 초기 이벤트 등록
    // PC 이벤트
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyPress);
    
    // 모바일 이벤트
    introSection.addEventListener('touchstart', handleTouchStart, { passive: true });
    introSection.addEventListener('touchend', handleTouchEnd, { passive: true });


    // 클릭으로도 전환 가능 (fallback 유지)
    introSection.addEventListener('click', () => {
        playAnimation();
    });


    

})();