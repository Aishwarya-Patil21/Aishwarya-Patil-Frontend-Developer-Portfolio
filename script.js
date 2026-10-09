const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("open", !isOpen);
});
navLinks?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

const savedTheme = localStorage.getItem("aishwarya-theme");
if (savedTheme === "light") document.body.classList.add("light-theme");
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem("aishwarya-theme", document.body.classList.contains("light-theme") ? "light" : "dark");
  themeToggle.textContent = document.body.classList.contains("light-theme") ? "☾" : "☼";
});
if (document.body.classList.contains("light-theme") && themeToggle) themeToggle.textContent = "☾";

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

const roles = ["Frontend Developer", "UI Enthusiast", "Creative Problem Solver"];
const roleTarget = document.querySelector("#typed-role");
let roleIndex = 0, charIndex = roles[0].length, deleting = false;
function typeRole() {
  if (!roleTarget || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const current = roles[roleIndex];
  roleTarget.textContent = current.slice(0, charIndex);
  let delay = deleting ? 45 : 80;
  if (!deleting && charIndex === current.length) { deleting = true; delay = 1500; }
  else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 300; }
  else charIndex += deleting ? -1 : 1;
  setTimeout(typeRole, delay);
}
setTimeout(typeRole, 1500);

const progress = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#contact-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Hi Aishwarya,\n\n${message}\n\nFrom: ${name}\nReply to: ${email}`);
  document.querySelector(".form-status").textContent = "Opening your email app…";
  window.location.href = `mailto:patilaishu2612@gmail.com?subject=${subject}&body=${body}`;
});


// Respect visitors who prefer reduced motion by stopping the background video.
const heroVideo = document.querySelector(".hero-video");
if (heroVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroVideo.pause();
}
