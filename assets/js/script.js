const allLinks = document.querySelectorAll('a[href^="#"]')

allLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    const screenWidth = window.innerWidth
    if (screenWidth <= 768 && this.classList.contains('header__logo')) {
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
        const header = document.querySelector('.header')
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
      const logoButton = document.querySelector('.header__logo')
      if (navigation && navigation.classList.contains('header__navigation--open')) {
        navigation.classList.remove('header__navigation--open')
        if (logoButton) {
          logoButton.classList.remove('header__logo--active')
        }
      }
    }
  })
})

const menuButton = document.querySelector('.header__menu-button')
const logoButton = document.querySelector('.header__logo')
const navigation = document.getElementById('navigation-principale')

function toggleMenu() {
  if (navigation) {
    const isMenuOpen = navigation.classList.toggle('header__navigation--open')

    if (logoButton) {
      if (isMenuOpen) {
        logoButton.classList.add('header__logo--active')
      } else {
        logoButton.classList.remove('header__logo--active')
      }
    }

    if (menuButton) {
      if (isMenuOpen) {
        menuButton.classList.add('header__menu-button--active')
      } else {
        menuButton.classList.remove('header__menu-button--active')
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
      navigation.classList.remove('header__navigation--open')
      if (logoButton) {
        logoButton.classList.remove('header__logo--active')
      }
      if (menuButton) {
        menuButton.classList.remove('header__menu-button--active')
      }
    }
  })
}

const skillsTrack = document.querySelector('.skills__track')
const skillsCarousel = document.querySelector('.skills__carousel')

if (skillsTrack) {
  let position = 0
  let animationId = null
  let isPaused = false
  let isDragging = false
  let startX = 0
  let currentX = 0
  let dragStartPosition = 0

  const speed = 0.5

  function animateCarousel() {
    if (!isPaused && !isDragging) {
      position = position - speed

      const trackWidth = skillsTrack.scrollWidth / 2

      if (Math.abs(position) >= trackWidth) {
        position = 0
      }

      skillsTrack.style.transform = 'translateX(' + position + 'px)'
    }

    animationId = requestAnimationFrame(animateCarousel)
  }

  // Pause au survol du carrousel
  if (skillsCarousel) {
    skillsCarousel.addEventListener('mouseenter', function () {
      isPaused = true
    })

    skillsCarousel.addEventListener('mouseleave', function () {
      if (!isDragging) {
        isPaused = false
      }
    })

    // Fonctionnalité de drag
    let dragThreshold = 5 // Seuil minimum pour considérer un drag
    let hasDragged = false

    skillsCarousel.addEventListener('mousedown', function (e) {
      if (isPaused) {
        isDragging = true
        hasDragged = false
        startX = e.clientX
        dragStartPosition = position
        skillsCarousel.style.cursor = 'grabbing'

        // Empêcher la sélection de texte
        e.preventDefault()
      }
    })

    document.addEventListener('mousemove', function (e) {
      if (isDragging && isPaused) {
        currentX = e.clientX
        const diffX = currentX - startX

        // Vérifier si le mouvement dépasse le seuil
        if (Math.abs(diffX) > dragThreshold) {
          hasDragged = true
        }

        if (hasDragged) {
          position = dragStartPosition + diffX

          const trackWidth = skillsTrack.scrollWidth / 2

          // Limiter le déplacement pour éviter de sortir des limites
          if (position > 0) {
            position = 0
          } else if (Math.abs(position) >= trackWidth) {
            position = -trackWidth
          }

          skillsTrack.style.transform = 'translateX(' + position + 'px)'
        }
      }
    })

    document.addEventListener('mouseup', function (e) {
      if (isDragging) {
        isDragging = false
        skillsCarousel.style.cursor = 'grab'

        // Empêcher le clic sur les liens si on a dragué
        if (hasDragged) {
          e.preventDefault()
          e.stopPropagation()

          // Réinitialiser après un court délai pour permettre les clics normaux
          setTimeout(function () {
            hasDragged = false
          }, 100)
        }

        // Réinitialiser la position si nécessaire pour maintenir la boucle
        const trackWidth = skillsTrack.scrollWidth / 2
        if (Math.abs(position) >= trackWidth) {
          position = position % trackWidth
        }
      }
    })

    // Empêcher les liens de se déclencher pendant le drag
    const links = skillsCarousel.querySelectorAll('a')
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (hasDragged) {
          e.preventDefault()
          e.stopPropagation()
        }
      })
    })
  }

  // Style du curseur au survol
  if (skillsCarousel) {
    skillsCarousel.style.cursor = 'grab'
  }

  animateCarousel()
}
