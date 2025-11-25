// Défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(ancre => {
  ancre.addEventListener('click', function (e) {
    e.preventDefault()
    const cible = document.querySelector(this.getAttribute('href'))
    if (cible) {
      // Centrer les sections compétences et portfolio, aligner les autres en haut
      const href = this.getAttribute('href')
      const estCompetences = href === '#competences'
      const estPortfolio = href === '#portfolio'

      if (estCompetences || estPortfolio) {
        // Calculer la position pour centrer la section
        const enTete = document.querySelector('.en-tete')
        const hauteurEnTete = enTete ? enTete.offsetHeight : 0
        const positionHautElement = cible.offsetTop
        const hauteurElement = cible.offsetHeight
        const hauteurFenetre = window.innerHeight
        const positionDefilement =
          positionHautElement - hauteurFenetre / 2 + hauteurElement / 2 - hauteurEnTete

        window.scrollTo({
          top: positionDefilement,
          behavior: 'smooth',
        })
      } else {
        cible.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }

      // Fermer le menu mobile si ouvert
      const navigation = document.getElementById('navigation-principale')
      if (navigation && navigation.classList.contains('en-tete__navigation--ouvert')) {
        navigation.classList.remove('en-tete__navigation--ouvert')
      }
    }
  })
})

// Menu mobile
const boutonMenu = document.querySelector('.en-tete__bouton-menu')
const navigation = document.getElementById('navigation-principale')

if (boutonMenu && navigation) {
  boutonMenu.addEventListener('click', () => {
    const estOuvert = navigation.classList.toggle('en-tete__navigation--ouvert')
    boutonMenu.classList.toggle('en-tete__bouton-menu--actif', estOuvert)
  })

  // Fermer le menu en cliquant à l'extérieur
  document.addEventListener('click', e => {
    if (!navigation.contains(e.target) && !boutonMenu.contains(e.target)) {
      navigation.classList.remove('en-tete__navigation--ouvert')
      boutonMenu.classList.remove('en-tete__bouton-menu--actif')
    }
  })
}

// Effet de défilement sur l'en-tête
const enTete = document.querySelector('.en-tete')

if (enTete) {
  function gererDefilement() {
    if (window.scrollY > 50) {
      enTete.classList.add('en-tete--defile')
    } else {
      enTete.classList.remove('en-tete--defile')
    }
  }

  // Vérifier la position au chargement
  gererDefilement()

  // Écouter le défilement
  window.addEventListener('scroll', gererDefilement)
}

// Carrousel des compétences
const pisteCompetences = document.querySelector('.competences__piste')

if (pisteCompetences) {
  let position = 0
  const vitesse = 0.5

  function animerCarrousel() {
    position -= vitesse
    const largeurPiste = pisteCompetences.scrollWidth / 2

    if (Math.abs(position) >= largeurPiste) {
      position = 0
    }

    pisteCompetences.style.transform = `translateX(${position}px)`
    requestAnimationFrame(animerCarrousel)
  }

  animerCarrousel()
}
