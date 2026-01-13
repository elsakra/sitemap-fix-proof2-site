import { animate, inView, stagger } from '@motionone/dom';

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Animate elements on scroll
const animateOnScroll = () => {
  // Fade in animations
  const fadeElements = document.querySelectorAll<HTMLElement>('.animate-fade-in');
  fadeElements.forEach((element, index) => {
    inView(element, () => {
      animate(
        element,
        { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
        { duration: 0.6, delay: index * 0.1 }
      );
    });
  });

  // Slide up animations
  const slideElements = document.querySelectorAll<HTMLElement>('.animate-slide-up');
  slideElements.forEach((element, index) => {
    inView(element, () => {
      animate(
        element,
        { opacity: [0, 1], transform: ['translateY(40px)', 'translateY(0px)'] },
        { duration: 0.8, delay: index * 0.1 }
      );
    });
  });

  // Stagger animations for cards/grid items
  const cardContainers = document.querySelectorAll('.grid');
  cardContainers.forEach(container => {
    const cards = container.querySelectorAll<HTMLElement>('.bg-white, .rounded-lg');
    if (cards.length > 0) {
      inView(container, () => {
        animate(
          cards,
          { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0px)'] },
          { duration: 0.6, delay: stagger(0.1) }
        );
      });
    }
  });
};

// Button hover animations
const setupButtonAnimations = () => {
  const buttons = document.querySelectorAll<HTMLElement>('button, .bg-accent-teal, .bg-primary-navy');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      animate(button, { scale: 1.05 }, { duration: 0.2 });
    });
    
    button.addEventListener('mouseleave', () => {
      animate(button, { scale: 1 }, { duration: 0.2 });
    });
  });
};

// Card hover effects
const setupCardAnimations = () => {
  const cards = document.querySelectorAll<HTMLElement>('.shadow-lg, .shadow-md');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      animate(
        card,
        { transform: 'translateY(-8px)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
        { duration: 0.3 }
      );
    });
    
    card.addEventListener('mouseleave', () => {
      animate(
        card,
        { transform: 'translateY(0px)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
        { duration: 0.3 }
      );
    });
  });
};

// Smooth scroll for anchor links
const setupSmoothScroll = () => {
  const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId || '');
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// Parallax effect for hero backgrounds
const setupParallax = () => {
  const heroSections = document.querySelectorAll<HTMLElement>('.relative.min-h-\\[600px\\]');
  
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    
    heroSections.forEach(section => {
      const rate = scrolled * -0.5;
      const bgImage = section.querySelector<HTMLElement>('img');
      if (bgImage) {
        bgImage.style.transform = `translateY(${rate}px)`;
      }
    });
  };
  
  // Throttle scroll events
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
};

// Initialize all animations when DOM is loaded
const initAnimations = () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    animateOnScroll();
    setupButtonAnimations();
    setupCardAnimations();
    setupParallax();
  }
  
  setupSmoothScroll();
};

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

// Re-run animations on navigation (for SPAs)
window.addEventListener('popstate', initAnimations);