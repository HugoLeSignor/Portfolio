const navigation = document.getElementById('navigation-principale')
const logoButton = document.querySelector('.header__logo')

// Fonction pour vérifier si on est sur tablette/mobile
function isTabletOrMobile() {
  return window.innerWidth <= 1024
}

// Fonction pour toggle le menu
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
  }
}

// Gérer le clic sur le logo pour toggle le menu sur tablette 
if (logoButton && navigation) {
  logoButton.addEventListener(
    'click',
    function (event) {
      // Sur tablette/mobile (1024px), toggle le menu au lieu de scroller
      if (isTabletOrMobile()) {
        event.preventDefault()
        event.stopPropagation()
        toggleMenu()
        return false
      }
    },
    true
  ) // Utiliser capture phase pour être prioritaire
}

// Fermer le menu quand on clique en dehors
if (navigation) {
  document.addEventListener('click', function (event) {
    const isClickInsideNav = navigation.contains(event.target)
    const isClickOnLogo = logoButton && logoButton.contains(event.target)

    if (
      !isClickInsideNav &&
      !isClickOnLogo &&
      navigation.classList.contains('header__navigation--open')
    ) {
      navigation.classList.remove('header__navigation--open')
      if (logoButton) {
        logoButton.classList.remove('header__logo--active')
      }
    }
  })
}

const allLinks = document.querySelectorAll('a[href^="#"]')

allLinks.forEach(function (link) {
  // Ne pas ajouter le listener sur le logo (déjà géré ci-dessus)
  if (link.classList.contains('header__logo')) {
    return
  }

  link.addEventListener('click', function (event) {
    event.preventDefault()

    const linkHref = this.getAttribute('href')
    if (!linkHref || linkHref === '') {
      return
    }

    // Cas spécial pour #accueil : scroller tout en haut
    if (linkHref === '#accueil') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      // Fermer le menu si ouvert
      if (navigation && navigation.classList.contains('header__navigation--open')) {
        toggleMenu()
      }
      return
    }

    const targetElement = document.querySelector(linkHref)

    if (targetElement) {
      // Calculer la hauteur du header pour l'offset
      const header = document.querySelector('.header')
      const headerHeight = header ? header.offsetHeight : 0

      // Obtenir la position de l'élément cible
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      // Scroller avec offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // Fermer le menu si ouvert
      if (navigation && navigation.classList.contains('header__navigation--open')) {
        toggleMenu()
      }
    }
  })
})

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
