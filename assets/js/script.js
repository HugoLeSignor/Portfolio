const allLinks = document.querySelectorAll('a[href^="#"]')

allLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    const screenWidth = window.innerWidth
    if (screenWidth <= 768 && this.classList.contains('en-tete__logo')) {
      return
    }

    event.preventDefault()

    const linkHref = this.getAttribute('href')
    const targetElement = document.querySelector(linkHref)

    if (targetElement) {
      const isSkills = linkHref === '#competences'
      const isPortfolio = linkHref === '#portfolio'
      const isAbout = linkHref === '#a-propos'
      const isHome = linkHref === '#accueil'

      if (isSkills || isPortfolio || isAbout || isHome) {
        const header = document.querySelector('.en-tete')
        const headerHeight = header ? header.offsetHeight : 0

        const elementTop = targetElement.offsetTop
        const elementHeight = targetElement.offsetHeight
        const windowHeight = window.innerHeight

        const viewportHeight = windowHeight - headerHeight
        const scrollPosition = elementTop - headerHeight - viewportHeight / 2 + elementHeight / 2

        window.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: 'smooth',
        })
      } else {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }

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

const menuButton = document.querySelector('.en-tete__bouton-menu')
const logoButton = document.querySelector('.en-tete__logo')
const navigation = document.getElementById('navigation-principale')

function toggleMenu() {
  if (navigation) {
    const isMenuOpen = navigation.classList.toggle('en-tete__navigation--ouvert')

    if (logoButton) {
      if (isMenuOpen) {
        logoButton.classList.add('en-tete__logo--actif')
      } else {
        logoButton.classList.remove('en-tete__logo--actif')
      }
    }

    if (menuButton) {
      if (isMenuOpen) {
        menuButton.classList.add('en-tete__bouton-menu--actif')
      } else {
        menuButton.classList.remove('en-tete__bouton-menu--actif')
      }
    }
  }
}

if (logoButton && navigation) {
  logoButton.addEventListener('click', function (event) {
    const screenWidth = window.innerWidth
    if (screenWidth <= 768) {
      event.preventDefault()
      event.stopPropagation()
      toggleMenu()
    }
  })
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', function () {
    toggleMenu()
  })
}

if (navigation) {
  document.addEventListener('click', function (event) {
    const isClickInsideNav = navigation.contains(event.target)
    const isClickOnLogo = logoButton && logoButton.contains(event.target)
    const isClickOnMenuButton = menuButton && menuButton.contains(event.target)

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

const skillsTrack = document.querySelector('.competences__piste')

if (skillsTrack) {
  let position = 0

  const speed = 0.5

  function animateCarousel() {
    position = position - speed

    const trackWidth = skillsTrack.scrollWidth / 2

    if (Math.abs(position) >= trackWidth) {
      position = 0
    }

    skillsTrack.style.transform = 'translateX(' + position + 'px)'

    requestAnimationFrame(animateCarousel)
  }
  animateCarousel()
}
