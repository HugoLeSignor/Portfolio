const header = document.querySelector('.header');
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    
    if (window.scrollY > heroBottom) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const skillsTrack = document.querySelector('.skills-track');

if (skillsTrack) {
    let position = 0;
    const speed = 0.5;
    
    function animateCarousel() {
        position -= speed;
        const trackWidth = skillsTrack.scrollWidth / 2;
        
        if (Math.abs(position) >= trackWidth) {
            position = 0;
        }
        
        skillsTrack.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animateCarousel);
    }
    
    animateCarousel();
}
