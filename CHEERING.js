// CHEERING.js

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 공통: 헤더/모바일 (STADIUM.js 로직) ====================
    // (Req 1) STADIUM.js에서 가져온 공통 모바일 네비게이션 로직
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const icon = hamburgerMenu.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 모바일 메뉴 외부 클릭 시 닫기
        document.addEventListener('click', (e) => {
            if (mobileNav.classList.contains('active') && !hamburgerMenu.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.classList.remove('active');
                const icon = hamburgerMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // (Req 1) STADIUM.js에서 가져온 공통 Hero 애니메이션
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

    // ==================== (Req 2) 응원 도구 3D Coverflow 캐러셀 ====================
    const itemsData = [
        {
            name: "Baseball cap",
            description: "It is not just a simple hat, but a symbol of loyalty and enthusiasm to the team.Show your support by wearing the team logo and color of the team cap hat."
        },
        {
            name: "Thunder Stick",
            description: "Create exciting sounds and atmosphere! Thunder sticks are essential cheering items that amplify your team spirit with every hit."
        },
        {
            name: "Cheering Towel",
            description: "Wave it proudly in the stands! The cheering towel shows your team colors and creates a sea of support in the stadium."
        },
        {
            name: "Mini Flag",
            description: "Show your pride with every wave! Mini flags let you celebrate every play and create an amazing visual display."
        },
        {
            name: "Team Gloves",
            description: "Catch the spirit! Team gloves help you feel like part of the action while showing your dedication to the team."
        }
    ];

    let currentItemIndex = 0;
    const itemCards = document.querySelectorAll('.item-card');
    const itemName = document.getElementById('item-name');
    const itemDescription = document.getElementById('item-description');
    const itemsCarousel = document.querySelector('.items-carousel');
    
    let touchStartX = 0;
    let touchEndX = 0;

    function updateItemsCarousel() {
        const totalItems = itemCards.length;
        if (totalItems === 0) return;
        
        const angleStep = 360 / totalItems;
        const radius = 300; // Z축 거리 (조정 가능)
        
        // 메인 캐러셀 회전
        const rotateY = -currentItemIndex * angleStep;
        itemsCarousel.style.transform = `rotateY(${rotateY}deg)`;

        itemCards.forEach((card, index) => {
            card.classList.remove('active');
            
            // (Req 2) 3D Coverflow 배치
            const itemAngle = index * angleStep;
            // 아이템을 정면으로 회전시킨 후, Z축으로 밀어 3D 배치
            card.style.transform = `rotateY(${itemAngle}deg) translateZ(${radius}px)`;
            
            if (index === currentItemIndex) {
                card.classList.add('active');
            }
        });

        // 텍스트 업데이트 (애니메이션 효과)
        const itemInfo = document.querySelector('.item-info');
        itemInfo.style.animation = 'none';
        
        // 현재 활성화된 아이템의 데이터 가져오기
        const currentData = itemsData[currentItemIndex];
        
        setTimeout(() => {
            itemName.textContent = currentData.name;
            itemDescription.textContent = currentData.description;
            itemInfo.style.animation = 'fadeInUp 0.6s ease forwards';
        }, 50); // CSS transition 시간(0.6s)보다 짧게
    }

    // (Req 2) 카드 클릭 이벤트
    itemCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentItemIndex = index;
            updateItemsCarousel();
        });
    });

    // (Req 2) 터치/스와이프 이벤트 (모바일)
    itemsCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true }); // 스크롤 성능 향상을 위해 passive: true 추가

    itemsCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; // 스와이프 민감도
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 왼쪽으로 스와이프 - 다음
                currentItemIndex = (currentItemIndex + 1) % itemCards.length;
            } else {
                // 오른쪽으로 스와이프 - 이전
                currentItemIndex = (currentItemIndex - 1 + itemCards.length) % itemCards.length;
            }
            updateItemsCarousel();
        }
    }

    // 초기 위치 설정
    updateItemsCarousel();

    // ==================== (Req 3) 공식 굿즈 카드 캐러셀 ====================
    const goodsData = [
        { team: "LG Twins", subtitle: "Official Merchandise", image: "Image/CHEERING/LG.png", url: "https://twins.shop/" },
        { team: "Doosan Bears", subtitle: "Official Merchandise", image: "Image/CHEERING/DOOSAN.png", url: "https://www.doosanbears.com/" },
        { team: "KIA Tigers", subtitle: "Official Merchandise", image: "Image/CHEERING/KN.png", url: "https://www.tigers.co.kr/" },
        { team: "Lotte Giants", subtitle: "Official Merchandise", image: "Image/CHEERING/LOTTE.png", url: "https://www.giantsclub.com/" },
        { team: "Samsung Lions", subtitle: "Official Merchandise", image: "Image/CHEERING/LIONS.png", url: "https://www.samsunglions.com/" },
        { team: "Hanwha Eagles", subtitle: "Official Merchandise", image: "Image/CHEERING/Officia_hy.png", url: "https://www.hanwhaeagles.co.kr/" },
        { team: "SSG Landers", subtitle: "Official Merchandise", image: "Image/CHEERING/Officia_lg.png", url: "https://www.ssglanders.com/" },
        { team: "NC Dinos", subtitle: "Official Merchandise", image: "Image/CHEERING/Officia_hy.png", url: "https://www.ncdinos.com/" },
        { team: "KT Wiz", subtitle: "Official Merchandise", image: "Image/CHEERING/Officia_lg.png", url: "https://www.ktwiz.co.kr/" },
        { team: "Kiwoom Heroes", subtitle: "Official Merchandise", image: "Image/CHEERING/Officia_hy.png", url: "https://www.heroesbaseball.co.kr/" }
    ];

    const goodsCarousel = document.querySelector('.goods-carousel');
    const goodsPrev = document.getElementById('goods-prev');
    const goodsNext = document.getElementById('goods-next');
    let currentGoodsIndex = 0; // 한 칸씩 이동할 인덱스
    
    // (Req 3) PC/모바일에서 한 번에 보이는 카드 수
    let cardsPerView = window.innerWidth <= 768 ? 2 : 5; // 모바일 2개, PC 5개
    let maxGoodsIndex = goodsData.length - cardsPerView;

    // (Req 3) 모든 굿즈 카드를 렌더링
    function renderGoodsCards() {
        if (!goodsCarousel) return;
        goodsCarousel.innerHTML = '';
        
        goodsData.forEach(goods => {
            const card = document.createElement('div');
            card.className = 'goods-card';
            
            card.innerHTML = `
                <img src="${goods.image}" alt="${goods.team}" class="goods-card-image">
                <div class="goods-card-content">
                    <h3 class="goods-card-title">${goods.team}</h3>
                    <p class="goods-card-subtitle">${goods.subtitle}</p>
                    <a href="${goods.url}" target="_blank" class="goods-card-btn">Visit Shop</a>
                </div>
            `;
            goodsCarousel.appendChild(card);
        });
    }

    // (Req 3) 캐러셀 위치 업데이트 (translateX 사용)
    function updateGoodsCarousel() {
        const cardWidth = 220; // .goods-card width
        const gap = 32; // .goods-carousel gap (2rem)
        const moveDistance = cardWidth + gap;

        // 인덱스 범위 제한
        maxGoodsIndex = goodsData.length - cardsPerView;
        if (currentGoodsIndex < 0) currentGoodsIndex = 0;
        if (currentGoodsIndex > maxGoodsIndex) currentGoodsIndex = maxGoodsIndex;

        goodsCarousel.style.transform = `translateX(-${currentGoodsIndex * moveDistance}px)`;

        // 버튼 상태 업데이트
        goodsPrev.disabled = currentGoodsIndex === 0;
        goodsNext.disabled = currentGoodsIndex === maxGoodsIndex;
    }


    if (goodsPrev && goodsNext) {
        goodsNext.addEventListener('click', () => {
            if (currentGoodsIndex < maxGoodsIndex) {
                currentGoodsIndex++;
                updateGoodsCarousel();
            }
        });

        goodsPrev.addEventListener('click', () => {
            if (currentGoodsIndex > 0) {
                currentGoodsIndex--;
                updateGoodsCarousel();
            }
        });
    }

    // ==================== 스포츠 DB 비디오 (기존 로직 유지) ====================
        const videosData = [
        {
            title: "LG트윈스",
            team: "𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 LG트윈스 응원가 모음 Ver.2025",
            thumbnail: "https://i.ytimg.com/an_webp/cu12AuKqxhw/mqdefault_6s.webp?du=3000&sqp=CKDPjsgG&rs=AOn4CLDvHjQJ8IGgTTblB8mqKdbyyNI3ig",
            url: "https://youtu.be/0hh0Ln3QNrg?si=H7PDTgi0VEK1kcSd"
        },
        {
            title: "KIA 타이거즈",
            team: "𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 기아타이거즈 응원가 모음 Ver.2025 ",
            thumbnail: "https://i.ytimg.com/vi/Y55NxjqfP6s/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCb70yErW9_aOqasFayiZwbe6emYw",
            url: "https://www.youtube.com/watch?v=Y55NxjqfP6s"
        },
        {
            title: "삼성라이온즈",
            team: "𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 삼성라이온즈 응원가 모음 Ver.2025",
            thumbnail: "https://i.ytimg.com/vi/ftv2CZS7vgw/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLALbTXsS9SJg_-SmUoAh-CmiDrXnA",
            url: "https://www.youtube.com/watch?v=ftv2CZS7vgw"
        },
        {
            title: "한화이글스",
            team: "𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 한화이글스 응원가 모음 Ver.2025",
            thumbnail: "https://i.ytimg.com/vi/l2u8HCAAunc/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCEWOhKowdYeGofzV30H_ZYN83hEw",
            url: "https://www.youtube.com/watch?v=l2u8HCAAunc"
        },
        {
            title: "롯데 자이언츠",
            team: "LOTTE GIANTS",
            thumbnail: "https://img.youtube.com/vi/example5/mqdefault.jpg",
            url: "https://www.youtube.com/watch?v=example5"
        },
        {
            title: "두산 베어스",
            team: "DOOSAN BEARS",
            thumbnail: "https://img.youtube.com/vi/example6/mqdefault.jpg",
            url: "https://www.youtube.com/watch?v=example6"
        },
        {
            title: "SSG 랜더스",
            team: "SSG LANDERS",
            thumbnail: "https://img.youtube.com/vi/example7/mqdefault.jpg",
            url: "https://www.youtube.com/watch?v=example7"
        },
        {
            title: "NC 다이노스",
            team: "NC DINOS",
            thumbnail: "https://img.youtube.com/vi/example8/mqdefault.jpg",
            url: "https://www.youtube.com/watch?v=example8"
        }
    ];

    const videosGrid = document.getElementById('videos-grid');
    const videoPrev = document.getElementById('video-prev');
    const videoNext = document.getElementById('video-next');
    let currentVideoPage = 0;
    let videosPerPage = window.innerWidth <= 768 ? 1 : 4; // PC 4개

    function renderVideos() {
        if (!videosGrid) return;
        videosGrid.innerHTML = '';
        
        // (Req 3) 비디오 슬라이더도 굿즈와 동일하게 전체 렌더링 후 transform으로 변경
        videosData.forEach(video => {
            const videoCard = document.createElement('a');
            videoCard.href = video.url;
            videoCard.target = '_blank';
            videoCard.className = 'video-card';
            
            videoCard.innerHTML = `
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <div class="play-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="video-info">
                    <h4 class="video-title">${video.title}</h4>
                    <p class="video-team">${video.team}</p>
                </div>
            `;
            videosGrid.appendChild(videoCard);
        });

        updateVideoSlider(); // 초기 위치 업데이트
    }
    
    function updateVideoSlider() {
        const videoCardWidth = 280; // .video-card width
        const gap = 32; // .videos-grid gap (2rem)
        const moveDistance = videoCardWidth + gap;
        const maxVideoIndex = videosData.length - videosPerPage;

        if (currentVideoPage < 0) currentVideoPage = 0;
        if (currentVideoPage > maxVideoIndex) currentVideoPage = maxVideoIndex;

        videosGrid.style.transform = `translateX(-${currentVideoPage * moveDistance}px)`;

        // 버튼 비활성화
        videoPrev.style.opacity = currentVideoPage === 0 ? '0.3' : '1';
        videoPrev.style.pointerEvents = currentVideoPage === 0 ? 'none' : 'all';
        
        videoNext.style.opacity = currentVideoPage >= maxVideoIndex ? '0.3' : '1';
        videoNext.style.pointerEvents = currentVideoPage >= maxVideoIndex ? 'none' : 'all';
    }


    videoNext.addEventListener('click', () => {
        const maxVideoIndex = videosData.length - videosPerPage;
        if (currentVideoPage < maxVideoIndex) {
            currentVideoPage++;
            updateVideoSlider();
        }
    });

    videoPrev.addEventListener('click', () => {
        if (currentVideoPage > 0) {
            currentVideoPage--;
            updateVideoSlider();
        }
    });

    // ==================== 스크롤 애니메이션 (STADIUM.js 로직) ====================
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

    // 모든 섹션 관찰
    document.querySelectorAll('.cheering-items-section, .official-goods-section, .sportsdb-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 1s ease, transform 1s ease';
        observer.observe(section);
    });

    // ==================== 초기화 실행 ====================
    renderGoodsCards();
    updateGoodsCarousel(); // 굿즈 초기화
    renderVideos(); // 비디오 초기화
    
    // (Req 2) 3D 캐러셀 초기화
    createToolCards(itemsData);
    updateItemsCarousel();

    // ==================== 반응형 대응 ====================
    window.addEventListener('resize', () => {
        // 굿즈 섹션 반응형
        let newCardsPerView = window.innerWidth <= 768 ? 2 : 5; // 모바일 2개, PC 5개
        if (window.innerWidth <= 480) newCardsPerView = 1; // 480px 이하 1개
        
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            currentGoodsIndex = 0; // 리사이즈 시 인덱스 리셋
            updateGoodsCarousel();
        }
        
        // 비디오 섹션 반응형
        let newVideosPerPage = window.innerWidth <= 768 ? 1 : 4; // PC 4개
        if (window.innerWidth <= 1024) newVideosPerPage = 3; // 1024px 이하 3개
        if (window.innerWidth <= 768) newVideosPerPage = 2; // 768px 이하 2개
        if (window.innerWidth <= 480) newVideosPerPage = 1; // 480px 이하 1개

        if (newVideosPerPage !== videosPerPage) {
            videosPerPage = newVideosPerPage;
            currentVideoPage = 0; // 리사이즈 시 인덱스 리셋
            updateVideoSlider();
        }
    });

    console.log('CHEERING.js 초기화 완료');
});