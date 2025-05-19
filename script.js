const hamburger = document.getElementById('hamburger');
      const navMenuMobile = document.getElementById('navMenuMobile');
      
      // Quand l'icône hamburger est cliquée
      hamburger.addEventListener('click', () => {
        navMenuMobile.classList.toggle('active');  // Affiche ou masque le menu
        hamburger.classList.toggle('active');      // Transforme l'icône hamburger en croix
        document.body.classList.toggle('menu-active'); // Empêche le scroll du site
      });


const questionsYMG = document.querySelectorAll('.faq-question-custom');
  
    questionsYMG.forEach((question) => {
      question.addEventListener('click', () => {
        questionsYMG.forEach((q) => {
          if (q !== question) {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('open');
          }
        });
  
        question.classList.toggle('active');
        question.nextElementSibling.classList.toggle('open');
      });
    });


  document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopElement = document.querySelector('.scroll-to-top');

    // Scroll to top au clic
    scrollToTopElement.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Apparition fluide après 70% de scroll
    window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      if (scrollPercent > 0.7) {
        scrollToTopElement.classList.add('visible');
      } else {
        scrollToTopElement.classList.remove('visible');
      }
    });
  });


  // Configuration de la date fixe de fermeture
  const closingDate = new Date("2025-09-29T16:59:59").getTime(); // Exemple : 23 janvier 2025 à 23h59

  function updateTimer() {
    const currentTime = new Date().getTime();
    const remainingTime = closingDate - currentTime;

    if (remainingTime <= 0) {
      // Affiche "fermée" si le temps est écoulé
      document.getElementById("timer-text").textContent = "La Lockroom est fermée";
      document.getElementById("progress-bar").style.width = "100%";
      return;
    }

    // Calcul des jours, heures, minutes et secondes restants
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Mise à jour des valeurs dans le DOM
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

    // Calcul de la progression de la barre
    const totalTime = closingDate - (closingDate - (3 * 24 * 60 * 60 * 1000)); // Exemple : 3 jours
    const elapsedTime = totalTime - remainingTime;
    const progress = (elapsedTime / totalTime) * 100;

    // Mettre à jour la barre de progression
    document.getElementById("progress-bar").style.width = progress + "%";
  }

  // Lancer le timer et le mettre à jour chaque seconde
  setInterval(updateTimer, 1000);
  updateTimer();



  const form = document.getElementById('contactForm');
const merciMessage = document.getElementById('merciMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // bloquer envoi classique

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Reset formulaire
      form.reset();

      // Affiche message de merci
      merciMessage.style.display = 'flex';
    } else {
      alert('Erreur lors de l’envoi. Merci de réessayer.');
    }
  } catch (error) {
    alert('Erreur réseau. Merci de vérifier votre connexion.');
  }
});
