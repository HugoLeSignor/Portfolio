// Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      // Center sections, align others to top
      const href = this.getAttribute('href')
      const isSkills = href === '#competences'
      const isPortfolio = href === '#portfolio'
      const isPropos = href === '#a-propos'
      const isAccueil = href === '#accueil'

      if (isSkills || isPortfolio || isPropos || isAccueil) {
        // Calculate position to center the section
        const header = document.querySelector('.en-tete')
        const headerHeight = header ? header.offsetHeight : 0
        const elementTopPosition = target.offsetTop
        const elementHeight = target.offsetHeight
        const windowHeight = window.innerHeight
        const scrollPosition =
          elementTopPosition - windowHeight / 2 + elementHeight / 2 - headerHeight

        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth',
        })
      } else {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }

      // Close mobile menu if open
      const navigation = document.getElementById('navigation-principale')
      if (navigation && navigation.classList.contains('en-tete__navigation--ouvert')) {
        navigation.classList.remove('en-tete__navigation--ouvert')
      }
    }
  })
})

// Mobile menu
const menuButton = document.querySelector('.en-tete__bouton-menu')
const navigation = document.getElementById('navigation-principale')

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('en-tete__navigation--ouvert')
    menuButton.classList.toggle('en-tete__bouton-menu--actif', isOpen)
  })

  // Close menu when clicking outside
  document.addEventListener('click', e => {
    if (!navigation.contains(e.target) && !menuButton.contains(e.target)) {
      navigation.classList.remove('en-tete__navigation--ouvert')
      menuButton.classList.remove('en-tete__bouton-menu--actif')
    }
  })
}

// Skills carousel
const skillsTrack = document.querySelector('.competences__piste')

if (skillsTrack) {
  let position = 0
  const speed = 0.5

  function animateCarousel() {
    position -= speed
    const trackWidth = skillsTrack.scrollWidth / 2

    if (Math.abs(position) >= trackWidth) {
      position = 0
    }

    skillsTrack.style.transform = `translateX(${position}px)`
    requestAnimationFrame(animateCarousel)
  }

  animateCarousel()
}


