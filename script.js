// Technology Image Gallery JavaScript
// This script builds the gallery, handles filtering, search, favorites, lightbox and theme state.

const galleryData = [
  {
    id: 'img-01',
    title: 'AI Neural Vision',
    category: 'Artificial Intelligence',
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    alt: 'Abstract representation of neural network technology in blue.',
    description: 'A futuristic AI visualization with digital neural pathways.'
  },
  {
    id: 'img-02',
    title: 'Industrial Robotics Arm',
    category: 'Robotics',
    src: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1000&q=80',
    alt: 'Robotic arm working in a manufacturing environment.',
    description: 'Precision robotics automating next-generation manufacturing.'
  },
  {
    id: 'img-03',
    title: 'Cyber Shield Defense',
    category: 'Cyber Security',
    src: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1000&q=80',
    alt: 'Digital shield protecting data against cyber attacks.',
    description: 'Cyber security defenses for modern cloud infrastructures.'
  },
  {
    id: 'img-04',
    title: 'Cloud Infrastructure',
    category: 'Cloud Computing',
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80',
    alt: 'Cloud server racks and network infrastructure with blue lighting.',
    description: 'Scalable cloud infrastructure powering hybrid enterprise systems.'
  },
  {
    id: 'img-05',
    title: 'Web App Dashboard',
    category: 'Web Development',
    src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=80',
    alt: 'Person viewing a web development dashboard on a monitor.',
    description: 'A polished web development dashboard with analytics and metrics.'
  },
  {
    id: 'img-06',
    title: 'Smart Autonomous Robot',
    category: 'Robotics',
    src: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1000&q=80',
    alt: 'Autonomous robot moving through a dark technology environment.',
    description: 'Innovative robotic systems for navigation and automation.'
  },
  {
    id: 'img-07',
    title: 'AI Code Intelligence',
    category: 'Artificial Intelligence',
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=90&ixlib=rb-4.0.3',
    alt: 'Artificial intelligence processing code on a futuristic display.',
    description: 'AI-driven code analysis accelerating application development.'
  },
  {
    id: 'img-08',
    title: 'Cloud Security Hub',
    category: 'Cyber Security',
    src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=90&ixlib=rb-4.0.3',
    alt: 'Secure cloud computing environment with security shield icons.',
    description: 'Cloud security solutions that protect business-critical systems.'
  },
  {
    id: 'img-09',
    title: 'Developer Workstation',
    category: 'Web Development',
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=90&ixlib=rb-4.0.3',
    alt: 'Developer workspace with code editor displayed on screen.',
    description: 'Modern frontend development workspace with responsive code.'
  },
  {
    id: 'img-10',
    title: 'Machine Learning Cloud',
    category: 'Cloud Computing',
    src: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1000&q=90&ixlib=rb-4.0.3',
    alt: 'Machine learning and cloud service concept with abstract data.',
    description: 'Cloud-native machine learning pipelines and analytics engines.'
  },
  {
    id: 'img-11',
    title: 'Human-Robot Collaboration',
    category: 'Robotics',
    src: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1000&q=90',
    alt: 'A collaborative industrial robot working alongside a person.',
    description: 'Collaborative robotics supporting efficient manufacturing teams.'
  },
  {
    id: 'img-12',
    title: 'Secure DevOps Pipeline',
    category: 'Cyber Security',
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=90',
    alt: 'DevOps code pipeline with security overlays in a dark theme.',
    description: 'Secure DevOps to deploy web and cloud applications safely.'
  }
];

const galleryGrid = document.getElementById('galleryGrid');
const filterButtons = document.querySelectorAll('.filter-button');
const searchInput = document.getElementById('searchInput');
const displayedCount = document.getElementById('displayedCount');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const loadingOverlay = document.getElementById('loadingOverlay');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxPrev = document.getElementById('lightboxPrev');

const localStorageKey = 'techGalleryFavorites';
const themeStorageKey = 'techGalleryTheme';

let activeCategory = 'All';
let activeSearch = '';
let favorites = new Set();
let activeIndex = 0;
let lightboxItems = [];

function loadFavorites() {
  try {
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      favorites = new Set(JSON.parse(saved));
    }
  } catch (error) {
    console.warn('Unable to load favorites from localStorage', error);
  }
}

function saveFavorites() {
  localStorage.setItem(localStorageKey, JSON.stringify(Array.from(favorites)));
}

function applyTheme(initial = false) {
  const storedTheme = localStorage.getItem(themeStorageKey);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = storedTheme || (prefersDark ? 'dark' : 'light');
  document.body.classList.toggle('light-mode', theme === 'light');
  themeToggle.innerHTML = theme === 'light' ? '<span class="toggle-icon">🌙</span><span>Dark Mode</span>' : '<span class="toggle-icon">☀️</span><span>Light Mode</span>';
  if (!initial) {
    localStorage.setItem(themeStorageKey, theme);
  }
}

function updateCounts() {
  const categories = ['All', 'Artificial Intelligence', 'Robotics', 'Cyber Security', 'Cloud Computing', 'Web Development'];
  categories.forEach((category) => {
    const sanitized = category.toLowerCase().replace(/\s+/g, '-');
    const buttonCount = document.getElementById(`count-${sanitized}`);
    if (buttonCount) {
      const count = category === 'All' ? galleryData.length : galleryData.filter((item) => item.category === category).length;
      buttonCount.textContent = `(${count})`;
    }
  });
}

function filterGallery() {
  const filterText = activeSearch.trim().toLowerCase();
  lightboxItems = galleryData.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(filterText);
    return matchesCategory && matchesSearch;
  });

  galleryGrid.innerHTML = '';

  lightboxItems.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'gallery-card';
    card.dataset.category = item.category;
    card.dataset.title = item.title.toLowerCase();
    card.dataset.id = item.id;
    card.innerHTML = `
      <div class="card-media" data-id="${item.id}">
        <img src="${item.src}" alt="${item.alt}" loading="lazy" />
        <div class="card-overlay">
          <div class="card-info">
            <div class="card-caption">
              <span class="category-tag">${item.category}</span>
              <h3>${item.title}</h3>
            </div>
            <button class="favorite-btn ${favorites.has(item.id) ? 'active' : ''}" type="button" aria-label="Toggle favorite">
              <span class="heart">${favorites.has(item.id) ? '♥' : '♡'}</span>
            </button>
          </div>
          <p>${item.description}</p>
        </div>
      </div>
    `;

    const imageElement = card.querySelector('img');
    const mediaWrapper = card.querySelector('.card-media');

    imageElement.addEventListener('load', () => {
      mediaWrapper.classList.add('loaded');
    });

    card.addEventListener('click', (event) => {
      const favoriteButton = event.target.closest('.favorite-btn');
      if (favoriteButton) {
        event.stopPropagation();
        toggleFavorite(item.id, favoriteButton);
        return;
      }
      openLightbox(index);
    });

    galleryGrid.appendChild(card);
  });

  displayedCount.textContent = lightboxItems.length;
}

function toggleFavorite(id, button = null) {
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }
  saveFavorites();
  if (button) {
    button.classList.toggle('active', favorites.has(id));
    button.querySelector('.heart').textContent = favorites.has(id) ? '♥' : '♡';
  }
}

function setActiveFilter(category) {
  activeCategory = category;
  filterButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.category === category);
  });
  filterGallery();
}

function clearLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openLightbox(index) {
  activeIndex = index;
  const item = lightboxItems[activeIndex];
  if (!item) return;
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxTitle.textContent = item.title;
  lightboxCategory.textContent = item.category;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function navigateLightbox(direction) {
  if (!lightboxItems.length) return;
  activeIndex += direction;
  if (activeIndex < 0) {
    activeIndex = lightboxItems.length - 1;
  } else if (activeIndex >= lightboxItems.length) {
    activeIndex = 0;
  }
  const item = lightboxItems[activeIndex];
  if (!item) return;
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxTitle.textContent = item.title;
  lightboxCategory.textContent = item.category;
}

function handleKeyboard(event) {
  if (!lightbox.classList.contains('active')) return;
  if (event.key === 'Escape') {
    clearLightbox();
  }
  if (event.key === 'ArrowRight') {
    navigateLightbox(1);
  }
  if (event.key === 'ArrowLeft') {
    navigateLightbox(-1);
  }
}

function updateBackToTop() {
  if (window.scrollY > 420) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

function initializeEvents() {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveFilter(button.dataset.category);
    });
  });

  searchInput.addEventListener('input', (event) => {
    activeSearch = event.target.value;
    filterGallery();
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const newTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem(themeStorageKey, newTheme);
    applyTheme();
  });

  lightboxClose.addEventListener('click', clearLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      clearLightbox();
    }
  });

  lightboxNext.addEventListener('click', () => navigateLightbox(1));
  lightboxPrev.addEventListener('click', () => navigateLightbox(-1));

  window.addEventListener('keydown', handleKeyboard);
  window.addEventListener('scroll', updateBackToTop);
}

function initGallery() {
  loadFavorites();
  applyTheme(true);
  updateCounts();
  initializeEvents();
  filterGallery();
}

window.addEventListener('load', () => {
  initGallery();
  document.body.classList.add('loaded');
  setTimeout(() => {
    loadingOverlay.classList.add('fade-out');
  }, 350);
});
