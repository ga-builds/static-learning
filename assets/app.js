
    // Set current year
    document.getElementById('yr').textContent = new Date().getFullYear();

    // Skills accordion functionality
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
      const header = card.querySelector('.skill-header');
      const content = card.querySelector('.skill-content');
      
      header.addEventListener('click', () => {
        // Close all other cards
        skillCards.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.classList.remove('active');
            otherCard.querySelector('.skill-content').classList.remove('open');
          }
        });
        
        // Toggle current card
        card.classList.toggle('active');
        content.classList.toggle('open');
      });
    });

    

    // Smooth scrolling for navigation links
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
  