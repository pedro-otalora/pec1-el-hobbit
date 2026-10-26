/**
 * Interacción de la página (mejora progresiva: sin JS todo el contenido es accesible)
 * - Navegación: menú desplegable en móvil y resaltado de la sección visible (aria-current).
 * - Cartas de personaje: giro entre anverso y reverso (aria-expanded e inert).
 */

const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("main-nav");

// --- Menú desplegable ---------------------------------------------

function setMenu(open) {
  // aria-expanded necesita el texto "true" o "false", no un booleano
  toggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("nav--open", open);

  // El icono muestra la acción disponible: abrir (tres rayas) o cerrar (aspa)
  const icon = toggle.querySelector(".nav-toggle__icon");
  icon.classList.toggle("fa-bars", !open);
  icon.classList.toggle("fa-xmark", open);
}

// Si falta el botón o el menú, el script no hace nada y la navegación se queda visible
if (toggle && nav) {
  // El menú solo se pliega cuando el script se ha cargado.
  // Sin JS sigue visible y el botón sigue oculto.
  toggle.hidden = false;
  nav.classList.add("nav--collapsible");

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Un solo listener en el menú en vez de uno por enlace.
  // Se cierra al elegir un enlace para que no tape la sección de destino.
  nav.addEventListener("click", (event) => {
    if (event.target.closest(".nav__link")) {
      setMenu(false);
    }
  });

  // Escape cierra el menú, como se espera al navegar con teclado,
  // y el foco vuelve al botón para no perderse en la página
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    ) {
      setMenu(false);
      toggle.focus();
    }
  });
}

// --- Sección activa -------------------------------------------------

const links = [...document.querySelectorAll(".nav__link")];
const sections = links
  .map((link) => document.querySelector(link.hash))
  // Se descartan los enlaces cuyo destino no existe,
  // para que un ancla mal escrita no rompa el script
  .filter(Boolean);

// La sección activa es la que cruza la línea central de la pantalla
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
  { rootMargin: "-50% 0px -50% 0px" },
);

sections.forEach((section) => observer.observe(section));

// --- Cartas de personaje --------------------------------------------
document.querySelectorAll(".character-card").forEach((card) => {
  const button = card.querySelector(".character-card__flip");
  const label = card.querySelector(".character-card__flip-label");
  const front = card.querySelector(".character-card__face--front");
  const back = card.querySelector(".character-card__face--back");

  // Si falta alguna pieza, la carta se queda en modo estático
  if (!button || !label || !front || !back) {
    return;
  }

  // Con JS: modo carta. Se muestra el botón y el reverso queda inactivo.
  // Sin script, las dos caras se ven seguidas y no se pierde contenido
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
