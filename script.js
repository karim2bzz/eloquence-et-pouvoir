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
