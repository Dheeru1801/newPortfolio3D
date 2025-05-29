/**
 * Card visibility utility - Controls visibility and animation effects for cards
 * Adds gradual fade effect to project cards based on their visibility percentage
 * Used to create a more engaging scroll experience with smooth transitions
 */

import { gsap } from "gsap";

// Initialize the IntersectionObserver when the DOM is fully loaded
export function initCardVisibility() {
  setupIntersectionObservers();
  setupScrollListeners();
  return;
}

// Add scroll listener for more precise control of fade effect
function setupScrollListeners() {
  let ticking = false;
  
  const updateCardsVisibility = () => {
    document.querySelectorAll('.project-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the card is in the viewport
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      let visibilityPercent = visibleHeight / rect.height;
      
      // Clamp between 0 and 1
      visibilityPercent = Math.max(0, Math.min(1, visibilityPercent));
      
      // Apply gradual fade classes based on visibility percentage
      updateCardVisibility(card, visibilityPercent);
    });
    
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateCardsVisibility();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  
  // Initial check
  setTimeout(updateCardsVisibility, 500);
}

// Update card visibility based on percentage
function updateCardVisibility(card, visibilityPercent) {
  // Remove all existing visibility classes
  card.classList.remove('fade-out-strong', 'fade-out-medium', 'fade-out-light', 'fade-in-full');
  
  // Apply appropriate class based on visibility percentage
  if (visibilityPercent < 0.2) {
    card.classList.add('fade-out-strong'); // Very low visibility (0-20%)
  } else if (visibilityPercent < 0.4) {
    card.classList.add('fade-out-medium'); // Low visibility (20-40%) 
  } else if (visibilityPercent < 0.7) {
    card.classList.add('fade-out-light');  // Medium visibility (40-70%)
  } else {
    card.classList.add('fade-in-full');    // High visibility (70-100%)
  }
}

function setupIntersectionObservers() {
  // Options for the IntersectionObserver with multiple thresholds
  const options = {
    root: null, // Use viewport as root
    rootMargin: '0px', // No extra margin around the viewport
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Multiple thresholds for smoother transitions
  };
  
  // Create the observer for project cards
  const projectCardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.classList.contains('project-card')) {
        // Use the more precise visibility calculation
        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight;
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibilityPercent = Math.max(0, Math.min(1, visibleHeight / rect.height));
        
        updateCardVisibility(entry.target, visibilityPercent);
      }
    });
  }, options);
  
  // Function to handle dynamic elements
  function observeNewElements() {
    // Find all project cards and observe them
    document.querySelectorAll('.project-card').forEach(element => {
      if (!element.dataset.visibilityObserved) {
        projectCardObserver.observe(element);
        element.dataset.visibilityObserved = 'true';
        
        // Add initial visibility class
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibilityPercent = Math.max(0, Math.min(1, visibleHeight / rect.height));
        
        updateCardVisibility(element, visibilityPercent);
      }
    });
  }
  
  // Initial observation
  setTimeout(observeNewElements, 500); // Small delay to ensure React has rendered elements
  
  // For elements added dynamically after initial load
  const observer = new MutationObserver(mutations => {
    observeNewElements();
  });

  // Start observing DOM changes once document is fully loaded
  window.addEventListener('load', () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    observeNewElements();
  });
  
  // Recalculate on resize for responsive layouts
  window.addEventListener('resize', () => {
    document.querySelectorAll('.project-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const visibilityPercent = Math.max(0, Math.min(1, visibleHeight / rect.height));
      
      updateCardVisibility(card, visibilityPercent);
    });
  }, { passive: true });
}
