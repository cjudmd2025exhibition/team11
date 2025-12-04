// SCHEDULE.js - 날짜 선택 기능 및 이미지 변경

document.addEventListener('DOMContentLoaded', function() {
    // 날짜 선택 요소들
    const yearSelect = document.getElementById('year-select');
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');
    const prevBtn = document.getElementById('prev-date');
    const nextBtn = document.getElementById('next-date');
    const gamesImg = document.getElementById('games-img');

    if (!yearSelect || !monthSelect || !daySelect) {
        console.error('날짜 선택 요소를 찾을 수 없습니다.');
        return;
    }

    // 현재 날짜 초기화
    let currentDate = new Date(2025, 5, 10); // 2025년 6월 10일

    // 년도 옵션 생성 (2025-2030)
    function initYearSelect() {
        yearSelect.innerHTML = '';
        for (let year = 2025; year <= 2030; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
        yearSelect.value = currentDate.getFullYear();
    }

    // 월 옵션 생성 (01-12)
    function initMonthSelect() {
        monthSelect.innerHTML = '';
        for (let month = 1; month <= 12; month++) {
            const option = document.createElement('option');
            option.value = month;
            option.textContent = month.toString().padStart(2, '0');
            monthSelect.appendChild(option);
        }
        monthSelect.value = currentDate.getMonth() + 1;
    }

    // 일 옵션 생성 (해당 월의 일수만큼)
    function initDaySelect() {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        const daysInMonth = new Date(year, month, 0).getDate();
        
        const currentDayValue = parseInt(daySelect.value) || currentDate.getDate();
        
        daySelect.innerHTML = '';
        
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day.toString().padStart(2, '0');
            daySelect.appendChild(option);
        }
        
        // 현재 선택된 날짜가 해당 월에 없으면 마지막 날로 설정
        if (currentDayValue <= daysInMonth) {
            daySelect.value = currentDayValue;
        } else {
            daySelect.value = daysInMonth;
        }
    }

    // 선택된 날짜에 따라 게임 카드 이미지 변경
    function updateGamesImage() {
        const year = yearSelect.value;
        const month = monthSelect.value.toString().padStart(2, '0');
        const day = daySelect.value.toString().padStart(2, '0');
        
        // 이미지 경로 형식: Image/SCHEDULE/games/2025-06-10.png
        const imagePath = `Image/SCHEDULE/games/${year}-${month}-${day}.png`;
        
        console.log(`이미지 변경: ${year}-${month}-${day}`);
        
        if (gamesImg) {
            // 이미지 로딩 실패 시 기본 이미지로
            gamesImg.onerror = function() {
                console.warn('이미지를 찾을 수 없습니다.');
                this.src = 'Image/SCHEDULE/games/default.png';
                this.onerror = null;
            };
            
            gamesImg.src = imagePath;
        }
    }

    // 이전 날짜로 이동
    function goToPrevDate() {
        currentDate.setDate(currentDate.getDate() - 1);
        updateSelectsFromDate();
        updateGamesImage();
    }

    // 다음 날짜로 이동
    function goToNextDate() {
        currentDate.setDate(currentDate.getDate() + 1);
        updateSelectsFromDate();
        updateGamesImage();
    }

    // currentDate를 기반으로 select 값 업데이트
    function updateSelectsFromDate() {
        yearSelect.value = currentDate.getFullYear();
        monthSelect.value = currentDate.getMonth() + 1;
        initDaySelect();
        daySelect.value = currentDate.getDate();
    }

    // select 값을 기반으로 currentDate 업데이트
    function updateDateFromSelects() {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value) - 1;
        const day = parseInt(daySelect.value);
        currentDate = new Date(year, month, day);
    }

    // 초기화
    initYearSelect();
    initMonthSelect();
    initDaySelect();
    updateGamesImage();

    // 이벤트 리스너
    yearSelect.addEventListener('change', function() {
        updateDateFromSelects();
        initDaySelect();
        updateGamesImage();
    });

    monthSelect.addEventListener('change', function() {
        updateDateFromSelects();
        initDaySelect();
        updateGamesImage();
    });

    daySelect.addEventListener('change', function() {
        updateDateFromSelects();
        updateGamesImage();
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', goToPrevDate);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', goToNextDate);
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe schedule section
    const scheduleSection = document.querySelector('.schedule-section');
    if (scheduleSection) {
        scheduleSection.style.opacity = '0';
        scheduleSection.style.transform = 'translateY(40px)';
        scheduleSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(scheduleSection);
    }

    // Hero section animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    console.log('SCHEDULE.js 초기화 완료');
});