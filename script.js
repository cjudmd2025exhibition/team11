// 다국어 데이터
const i18nData = {
  ko: {
    mainTitle: "지금 무엇이 궁금하신가요?",
    navStadium: "구장",
    navSchedule: "일정",
    navTicket: "티켓",
    navCheering: "응원",
    navFood: "음식",
    stadium: "구장",
    schedule: "일정",
    ticket: "티켓",
    cheering: "응원",
    food: "음식"
  },
  en: {
    mainTitle: "WHAT ARE YOU CURIOUS ABOUT RIGHT NOW?",
    navStadium: "STADIUM",
    navSchedule: "SCHEDULE",
    navTicket: "TICKET",
    navCheering: "CHEERING",
    navFood: "FOOD",
    stadium: "Stadium",
    schedule: "Schedule",
    ticket: "Ticket",
    cheering: "Cheering",
    food: "Food"
  }
};

// 현재 언어 상태, 기본값은 'en' (영어)로 고정
let currentLang = 'en';

// 다국어 텍스트 업데이트 및 활성 버튼 표시
function updateI18n(lang) {
  currentLang = lang;
  const data = i18nData[lang];
  if (!data) return;
  
  // 텍스트 업데이트 (한국어를 선택했을 때만 텍스트가 변경됨)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (data[key]) {
      el.textContent = data[key];
    }
  });

  // HTML lang 속성 업데이트
  document.documentElement.lang = lang;

  // 모바일 언어 선택 버튼 활성화 표시
  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
    }
  });
}

// 부드러운 스크롤 헬퍼
function smoothScrollTo(target) {
  // 타겟이 없는 경우 (예: href="#") 스크롤 방지
  if (target === '#main-content') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 메인 앱 초기화
(function initApp() {
  const langMenu = document.querySelector('.lang-menu');
  const hamburgerBtn = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  
  // PC: 언어 선택 드롭다운
  if (langMenu) {
    // 언어 선택 시
    langMenu.addEventListener('click', (e) => {
      const langItem = e.target.closest('[data-lang]');
      if (langItem) {
        const lang = langItem.getAttribute('data-lang');
        updateI18n(lang);
      }
    });
  }

  // 모바일 햄버거 메뉴 토글
  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      hamburgerBtn.querySelector('i').className = mobileNav.classList.contains('active') 
        ? 'fa-solid fa-xmark' // 메뉴가 열리면 X 아이콘
        : 'fa-solid fa-bars'; // 메뉴가 닫히면 햄버거 아이콘
    });
  }

  // 모바일: 언어 선택 버튼 클릭 이벤트
  document.querySelectorAll('.mobile-lang-select .lang-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.getAttribute('data-lang');
      updateI18n(lang);
    });
  });

  // 네비게이션 링크 클릭 이벤트 (스무스 스크롤 및 모바일 메뉴 닫기)
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      smoothScrollTo(href);
      // 모바일 메뉴가 열려있을 경우 닫기
      if (mobileNav?.classList.contains('active')) {
        mobileNav.classList.remove('active');
        hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
      }
    }
  });

  
})();