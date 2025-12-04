// Food Page - i18n Data Extension
const foodI18nData = {
  ko: {
    // Hero Section
    foodHeroTitle: "야구장 음식, 뭘 먹어야 할까?",
    foodHeroSubtitle: "야구와 음식을 결합하는 즐거움은 맛있는 음식에 비할 수 없습니다. 각 구장에서 어떤 식당들이 있는지, 현지 팬들이 추천하는 꼭 먹어봐야 할 음식들을 발견해보세요.",
    
    // Side Nav
    navSeoul: "서울",
    navSuwon: "수원",
    navIncheon: "인천",
    navDaejeon: "대전",
    navBusan: "부산",
    navChangwon: "창원",
    navGwangju: "광주",
    navDaegu: "대구",
    
    // Seoul
    seoulTitle: "서울종합운동장 야구장",
    mustTryTop3: "꼭 먹어야 할 음식 TOP3",
    gateLabel: "1-4 게이트",
    outfieldFirstBase: "외야 1루",
    
    // Gate Navigation
    outfieldFirst: "외야 1루",
    outfieldThird: "외야 3루",
    infieldFirst: "내야 1루",
    infieldThird: "내야 3루"
  },
  en: {
    // Hero Section
    foodHeroTitle: "Baseball stadium food, what should I eat?",
    foodHeroSubtitle: "The joy of combining baseball and food is incomparable to the delicious food. Discover what restaurants are available at each stadium and the must-try dishes recommended by local fans.",
    
    // Side Nav
    navSeoul: "Seoul",
    navSuwon: "Suwon",
    navIncheon: "Incheon",
    navDaejeon: "Daejeon",
    navBusan: "Busan",
    navChangwon: "Changwon",
    navGwangju: "Gwangju",
    navDaegu: "Daegu",
    
    // Seoul
    seoulTitle: "Seoul Sports Complex Baseball Stadium",
    mustTryTop3: "MUST-TRY FOODS TOP3",
    gateLabel: "1-4 GATE",
    outfieldFirstBase: "Outside first base",
    
    // Gate Navigation
    outfieldFirst: "Outfield first base",
    outfieldThird: "Outfield third base",
    infieldFirst: "Infield first base",
    infieldThird: "Infield third base"
  }
};

// Gate map images data
const gateMapImages = {
  'outside-first': 'Image/FOOD/Seoul_outside_first.png',
  'outside-third': 'Image/FOOD/Seoul_outside_third.png',
  'infield-first': 'Image/FOOD/Seoul_infield_first.png',
  'infield-third': 'Image/FOOD/Seoul_infield_third.png'
};

// Food items data for each gate
const gateFoodItems = {
  'outside-first': [
    { img: 'Image/FOOD/Seoul_01.png', label: 'BBQ' },
    { img: 'Image/FOOD/Seoul_02.png', label: 'BHC' },
    { img: 'Image/FOOD/Seoul_03.png', label: 'GAZZI' },
    { img: 'Image/FOOD/Seoul_04.png', label: 'ONE-SHOT JAMSHIL' },
    { img: 'Image/FOOD/Seoul_05.png', label: 'CAFE' },
    { img: 'Image/FOOD/Seoul_06.png', label: 'JJAMPPONG JJAJANGMYEON RAMENBAP' },
    { img: 'Image/FOOD/Seoul_07.png', label: 'FRANK BURGER' }
  ],
  'outside-third': [
    { img: 'Image/FOOD/Seoul_01.png', label: 'BBQ' },
    { img: 'Image/FOOD/Seoul_02.png', label: 'BHC' },
    { img: 'Image/FOOD/Seoul_03.png', label: 'GAZZI' },
    { img: 'Image/FOOD/Seoul_04.png', label: 'ONE-SHOT JAMSHIL' }
  ],
  'infield-first': [
    { img: 'Image/FOOD/Seoul_01.png', label: 'BBQ' },
    { img: 'Image/FOOD/Seoul_02.png', label: 'BHC' },
    { img: 'Image/FOOD/Seoul_05.png', label: 'CAFE' },
    { img: 'Image/FOOD/Seoul_06.png', label: 'JJAMPPONG JJAJANGMYEON RAMENBAP' }
  ],
  'infield-third': [
    { img: 'Image/FOOD/Seoul_03.png', label: 'GAZZI' },
    { img: 'Image/FOOD/Seoul_04.png', label: 'ONE-SHOT JAMSHIL' },
    { img: 'Image/FOOD/Seoul_06.png', label: 'JJAMPPONG JJAJANGMYEON RAMENBAP' },
    { img: 'Image/FOOD/Seoul_07.png', label: 'FRANK BURGER' }
  ]
};

// --- JavaScript Logic ---

// Function to handle i18n
const i18nMap = { ...i18nData, ...foodI18nData };

function applyI18n(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (i18nMap[lang] && i18nMap[lang][key]) {
            element.textContent = i18nMap[lang][key];
        }
    });
}

// Language selector event listeners
document.querySelectorAll('.lang-menu li, .lang-toggle-btn').forEach(item => {
    item.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        localStorage.setItem('selectedLang', lang);
        applyI18n(lang);
    });
});

// Apply saved language on load
const savedLang = localStorage.getItem('selectedLang') || 'ko';
applyI18n(savedLang);

// --- FOOD Page Specific Logic ---

const sections = document.querySelectorAll('.food-section');
const sideNav = document.querySelector('.side-nav');
const navLinks = document.querySelectorAll('.side-nav a');

// Function to toggle the side nav visibility based on scroll position
function toggleSideNav() {
  const heroHeight = document.querySelector('.stadium-hero').offsetHeight;
  if (window.pageYOffset > heroHeight * 0.7) {
    sideNav.classList.add('visible');
  } else {
    sideNav.classList.remove('visible');
  }
}

// Smooth scrolling for side navigation links
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const offsetTop = targetSection.offsetTop;
      const targetScrollPosition = offsetTop - 100;
      
      window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth'
      });
      
      // Update active state
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// Update active nav on scroll
function updateActiveNav() {
  const scrollPosition = window.pageYOffset + 200;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Gate navigation functionality
const gateLinks = document.querySelectorAll('.gate-link');
const gateMapImage = document.getElementById('gateMapImage');
const foodGrid = document.getElementById('foodGrid');
const foodGridContainer = document.querySelector('.food-grid-container');

gateLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Update active state
    gateLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    
    // Get selected gate
    const selectedGate = this.getAttribute('data-gate');
    
    // Update gate map image with fade effect
    gateMapImage.style.opacity = '0';
    setTimeout(() => {
      gateMapImage.src = gateMapImages[selectedGate];
      gateMapImage.style.opacity = '1';
    }, 200);
    
    // Update food grid without animation
    updateFoodGrid(selectedGate, false);
  });
});

function updateFoodGrid(gate, animate = false) {
  const foods = gateFoodItems[gate] || gateFoodItems['outside-first'];
  
  // Clear existing items
  foodGrid.innerHTML = '';
  
  // Add new food items
  foods.forEach((food, index) => {
    const foodItem = document.createElement('div');
    foodItem.className = 'food-item';
    if (animate) {
      foodItem.style.animationDelay = `${index * 0.1}s`;
    }
    
    foodItem.innerHTML = `
      <img src="${food.img}" alt="${food.label}">
    `;
    
    foodGrid.appendChild(foodItem);
  });
}

// Intersection Observer for Food Grid animation
const foodGridObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      const foodItems = entry.target.querySelectorAll('.food-item');
      foodItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animate');
        }, index * 100);
      });
    }
  });
}, {
  threshold: 0.2,
  rootMargin: '0px'
});

// Observe food grid container
if (foodGridContainer) {
  foodGridObserver.observe(foodGridContainer);
}

// Listen to scroll events
window.addEventListener('scroll', () => {
  toggleSideNav();
  updateActiveNav();
});

// Initial updates
toggleSideNav();

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

// Observe all food sections
sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(40px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(section);
});

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

// Top 3 cards animation
const top3Cards = document.querySelectorAll('.top3-card');
top3Cards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  setTimeout(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 200 + (index * 150));
});