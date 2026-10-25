/**
 * Navegación principal
 * - Menú desplegable en móvil. Mejora progresiva: sin JS el menú se ve completo.
 * - Resalta el enlace de la sección visible con aria-current.
 */

const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("main-nav");

// --- Menú desplegable ---------------------------------------------

function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("nav--open", open);

  // Cambia el icono: tres rayas (abrir) o aspa (cerrar)
  const icon = toggle.querySelector(".nav-toggle__icon");
  icon.classList.toggle("fa-bars", !open);
  icon.classList.toggle("fa-xmark", open);
}

if (toggle && nav) {
  // Con JS: se muestra el botón y el menú pasa a ser plegable
  toggle.hidden = false;
  nav.classList.add("nav--collapsible");

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Al elegir un enlace, el menú se cierra
  nav.addEventListener("click", (event) => {
    if (event.target.closest(".nav__link")) {
      setMenu(false);
    }
  });

  // Escape cierra el menú y devuelve el foco al botón
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });
}

// --- Sección activa -------------------------------------------------

const links = [...document.querySelectorAll(".nav__link")];
const sections = links
  .map((link) => document.querySelector(link.hash))
  .filter(Boolean);

// La sección activa es la que cruza la línea central de la pantalla
// (el mismo criterio que el foco de las franjas del viaje)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      links.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  },
  { rootMargin: "-50% 0px -50% 0px" }
);

sections.forEach((section) => observer.observe(section));


// --- Cartas de personaje --------------------------------------------

document.querySelectorAll(".character-card").forEach((card) => {
  const button = card.querySelector(".character-card__flip");
  const label = card.querySelector(".character-card__flip-label");
  const front = card.querySelector(".character-card__face--front");
  const back = card.querySelector(".character-card__face--back");

  if (!button || !label || !front || !back) {
    return;
  }

  // Con JS: modo carta. Se muestra el botón y el reverso queda inactivo
  card.classList.add("character-card--interactive");
  button.hidden = false;
  back.inert = true;

  function flip() {
    const flipped = button.getAttribute("aria-expanded") !== "true";

    button.setAttribute("aria-expanded", String(flipped));
    card.classList.toggle("character-card--flipped", flipped);
    label.textContent = flipped ? "Volver" : "Girar carta";

    // La cara oculta queda inerte: sin foco y fuera del lector de pantalla
    front.inert = flipped;
    back.inert = !flipped;
  }

  button.addEventListener("click", flip);

  // Con el ratón se puede pulsar toda la carta (con teclado se usa el botón)
  card.addEventListener("click", (event) => {
    if (!event.target.closest(".character-card__flip")) {
      flip();
    }
  });
});