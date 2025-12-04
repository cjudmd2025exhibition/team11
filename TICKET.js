// TICKET.js
// Ticket Page - i18n Data Extension
const ticketI18nData = {
  ko: {
    // Hero Section
    heroTitle: "티켓과 좌석은 어떻게 구매하나요?",
    heroSubtitle: "야구 티켓 구매와 좌석 선택의 간단한 과정을 안내해드립니다. 온라인 예약부터 추천 좌석까지, 모든 정보를 확인하고 당신에게 완벽한 자리를 찾아보세요!",
  },
  en: {
    // Hero Section
    heroTitle: "HOW DO I GET TICKETS END SEATS?",
    heroSubtitle: "We'll guide you through the simple process of purchasing baseball tickets and selecting your seats. From online reservations to recommended seating, check out all the information and find the perfect spot for you!",
  }
};

// --- JavaScript Logic (Based on Stadium Page) ---

// Assuming 'i18nData' is defined in 'script.js' or globally. 
// If it's not defined, the map will be initialized with ticketI18nData only.
const i18nMap = (typeof i18nData !== 'undefined') ? { ...i18nData, ...ticketI18nData } : ticketI18nData;

function applyI18n(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        // Check if the key exists in the current language map
        if (i18nMap && i18nMap[lang] && i18nMap[lang][key]) {
            element.textContent = i18nMap[lang][key];
        } else if (ticketI18nData[lang] && ticketI18nData[lang][key]) {
            // Fallback to ticket-specific data
            element.textContent = ticketI18nData[lang][key];
        }
    });
}

// Language selector event listeners
document.querySelectorAll('.lang-menu li, .lang-toggle-btn').forEach(item => {
    item.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang') || (this.classList.contains('active') ? 'en' : 'ko');
        localStorage.setItem('selectedLang', lang);
        applyI18n(lang);
        
        // Close mobile menu after language change
        const mobileNav = document.querySelector('.mobile-nav');
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            const icon = hamburgerMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Apply saved language on load
const savedLang = localStorage.getItem('selectedLang') || 'ko';
applyI18n(savedLang);

// --- TICKET Page Specific Logic ---

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

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Add staggered animation for seat types
      if (entry.target.classList.contains('seat-proposal-section')) {
        const seatTypes = entry.target.querySelectorAll('.seat-type');
        seatTypes.forEach((type, index) => {
          setTimeout(() => {
            type.style.opacity = '1';
            type.style.transform = 'translateY(0)';
          }, index * 250);
        });
      }
    }
  });
}, observerOptions);

// Initialize ticket sections with animations
const ticketSections = document.querySelectorAll('.ticket-section');
ticketSections.forEach(section => {
  // 💡 수정: 첫 번째 섹션(.ticketing-section)은 observer를 적용하지 않습니다.
  if (!section.classList.contains('ticketing-section')) {
    observer.observe(section);
  } 
  
  // 💡 추가: 첫 번째 섹션이 로드 시 바로 보이도록 스타일을 명시적으로 설정 (CSS와 연동)
  if (section.classList.contains('ticketing-section')) {
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
  }
});

// Initialize step boxes (Ticketing Steps)
const stepBoxes = document.querySelectorAll('.step-box');
stepBoxes.forEach(box => {
  // 💡 수정: 초기 opacity: 0과 transform: translateY(30px) 설정을 제거하여 바로 보이게 합니다.
  // CSS의 기본 스타일(visible)을 따르게 됩니다.
  box.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'; // CSS의 호버 트랜지션만 남김
});

// Initialize seat types with staggered animation
const seatTypes = document.querySelectorAll('.seat-type');
seatTypes.forEach(type => {
  // seat-proposal-section은 observer로 애니메이션 적용 (유지)
  type.style.opacity = '0';
  type.style.transform = 'translateY(30px)';
  type.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});


// Enhanced floating text animation
const floatingTexts = document.querySelectorAll('.floating-text');
floatingTexts.forEach((text, index) => {
  // Add random delay for more natural movement
  const randomDelay = Math.random() * 2;
  text.style.animationDelay = `${randomDelay}s`;
  
  // PC 환경(768px 초과)에서만 호버 발동
  text.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) {
        text.style.transform = 'scale(1.2)';
        text.style.transition = 'transform 0.3s ease';
    }
  });
  
  text.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) {
        text.style.transform = 'scale(1)';
    }
  });
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
  img.addEventListener('load', () => {
    img.style.opacity = '1';
    img.style.transform = 'scale(1)';
  });
  
  // Set initial state to visible
  img.style.opacity = '1';
  img.style.transform = 'scale(1)';
  img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Mobile navigation toggle
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburgerMenu && mobileNav) {
  hamburgerMenu.addEventListener('click', () => {
    // 💡 mobile-nav에 'active' 클래스를 토글하여 메뉴가 표시되도록 합니다.
    mobileNav.classList.toggle('active');
    
    // Toggle hamburger icon
    const icon = hamburgerMenu.querySelector('i');
    if (mobileNav.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    // 햄버거 메뉴나 모바일 네비게이션 영역을 클릭하지 않았을 때만 닫기
    if (mobileNav.classList.contains('active') && !hamburgerMenu.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('active');
      const icon = hamburgerMenu.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}