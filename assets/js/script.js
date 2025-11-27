const allLinks = document.querySelectorAll('a[href^="#"]')
const navigation = document.getElementById('navigation-principale')
const logoButton = document.querySelector('.header__logo')

allLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    if (window.innerWidth <= 768 && this.classList.contains('header__logo')) {
      return
    }

    event.preventDefault()

    const linkHref = this.getAttribute('href')
    const targetElement = document.querySelector(linkHref)

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

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
    if (window.innerWidth <= 768) {
      event.preventDefault()
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
