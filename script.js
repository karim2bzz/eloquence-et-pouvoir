// HAMBURGER
const hamburger = document.getElementById('hamburger');
const navMenuMobile = document.getElementById('navMenuMobile');

hamburger?.addEventListener('click', () => {
  navMenuMobile.classList.toggle('active');
  hamburger.classList.toggle('active');
  document.body.classList.toggle('menu-active');
});

// FAQ
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

// SCROLL TO TOP
document.addEventListener('DOMContentLoaded', function () {
  const scrollToTopElement = document.querySelector('.scroll-to-top');

  scrollToTopElement?.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    if (scrollPercent > 0.7) {
      scrollToTopElement?.classList.add('visible');
    } else {
      scrollToTopElement?.classList.remove('visible');
    }
  });
});

// TIMER
const closingDate = new Date("2025-09-29T16:59:59").getTime();

function updateTimer() {
  const currentTime = new Date().getTime();
  const remainingTime = closingDate - currentTime;

  if (remainingTime <= 0) {
    document.getElementById("timer-text").textContent = "La Lockroom est fermée";
    document.getElementById("progress-bar").style.width = "100%";
    return;
  }

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

  const totalTime = 3 * 24 * 60 * 60 * 1000;
  const elapsedTime = totalTime - remainingTime;
  const progress = (elapsedTime / totalTime) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
}

setInterval(updateTimer, 1000);
updateTimer();

// FORMULAIRE DE CONTACT
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  if (!form) return;

  // Créer la popup message dynamique
  const popup = document.createElement('div');
  popup.id = 'popupMessage';
  popup.style.position = 'fixed';
  popup.style.top = '20px';
  popup.style.right = '20px';
  popup.style.backgroundColor = '#9c7d3c';
  popup.style.color = 'white';
  popup.style.padding = '15px 25px';
  popup.style.borderRadius = '5px';
  popup.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
  popup.style.display = 'none';
  popup.style.zIndex = '10000';
  popup.style.fontFamily = 'Arial, sans-serif';
  popup.style.fontSize = '16px';

  // Bouton fermeture popup (croix)
  const closeBtn = document.createElement('span');
  closeBtn.textContent = '×';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.marginLeft = '15px';
  closeBtn.style.fontWeight = 'bold';
  closeBtn.style.float = 'right';
  closeBtn.style.fontSize = '20px';
  closeBtn.title = 'Fermer';
  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  popup.appendChild(closeBtn);
  document.body.appendChild(popup);

  // Fonction pour afficher la popup avec message
  function showPopup(message) {
    popup.textContent = message;
    popup.appendChild(closeBtn);
    popup.style.display = 'block';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      nom: form.querySelector('input[name="name"]').value.trim(),
      email: form.querySelector('input[name="email"]').value.trim(),
      message: form.querySelector('textarea[name="message"]').value.trim(),
    };

    try {
      const response = await fetch('https://form-backend-ahxw.onrender.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        form.reset();
        showPopup(result.message);
      } else {
        alert("❌ Erreur serveur : " + (result.message || "Erreur inconnue."));
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      alert("❌ Une erreur réseau est survenue. Veuillez réessayer.");
    }
  });
});
