// Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // Sur mobile, ignorer le logo car il sert de menu burger
    if (window.innerWidth <= 768 && this.classList.contains('en-tete__logo')) {
      return
    }
    
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
        
        // Adjust for sticky header: center in visible viewport (minus header)
        const viewportHeight = windowHeight - headerHeight
        const scrollPosition = elementTopPosition - headerHeight - (viewportHeight / 2) + (elementHeight / 2)

        window.scrollTo({
          top: Math.max(0, scrollPosition),
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
      const logoButton = document.querySelector('.en-tete__logo')
      if (navigation && navigation.classList.contains('en-tete__navigation--ouvert')) {
        navigation.classList.remove('en-tete__navigation--ouvert')
        if (logoButton) {
          logoButton.classList.remove('en-tete__logo--actif')
        }
      }
    }
  })
})

// Mobile menu
const menuButton = document.querySelector('.en-tete__bouton-menu')
const logoButton = document.querySelector('.en-tete__logo')
const navigation = document.getElementById('navigation-principale')

// Fonction pour toggle le menu
function toggleMenu() {
  if (navigation) {
    const isOpen = navigation.classList.toggle('en-tete__navigation--ouvert')
    
    // Toggle l'état actif sur le logo
    if (logoButton) {
      logoButton.classList.toggle('en-tete__logo--actif', isOpen)
    }
    
    // Toggle l'état actif sur le bouton menu (si présent)
    if (menuButton) {
      menuButton.classList.toggle('en-tete__bouton-menu--actif', isOpen)
    }
  }
}

// Gérer le clic sur le logo sur mobile
if (logoButton && navigation) {
  logoButton.addEventListener('click', (e) => {
    // Sur mobile, le logo toggle le menu au lieu de scroller
    if (window.innerWidth <= 768) {
      e.preventDefault()
      e.stopPropagation()
      toggleMenu()
    }
  })
}

// Gérer le clic sur le bouton menu (pour desktop/tablette si visible)
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    toggleMenu()
  })
}

// Close menu when clicking outside
if (navigation) {
  document.addEventListener('click', e => {
    const isClickInsideNav = navigation.contains(e.target)
    const isClickOnLogo = logoButton && logoButton.contains(e.target)
    const isClickOnMenuButton = menuButton && menuButton.contains(e.target)
    
    if (!isClickInsideNav && !isClickOnLogo && !isClickOnMenuButton) {
      navigation.classList.remove('en-tete__navigation--ouvert')
      if (logoButton) {
        logoButton.classList.remove('en-tete__logo--actif')
      }
      if (menuButton) {
        menuButton.classList.remove('en-tete__bouton-menu--actif')
      }
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


