// ------------------------------------------------------------------
// EDIT THIS ARRAY TO ADD/REMOVE/UPDATE YOUR PROJECTS
// status: "done" or "progress"
// links: leave as "#" if you don't have a public URL yet
// detail: content shown in the pop-up window on click
// ------------------------------------------------------------------
const projects = [
  {
    title: "Custom CRM Built on Odoo",
    status: "done",
    description: "A fully custom backend built on Odoo 16 for complete operational management: daily logging, monthly summaries, and automated tax reports.",
    tags: ["Odoo 16", "Python", "QWeb", "Reporting"],
    demo: "#",
    code: "#",
    detail: {
      subtitle: "An operational backend built from scratch on Odoo 16",
      summary: "A custom module that runs the day-to-day of a business: daily activity logging, a central database, monthly summaries per worker, and structured tax reports, all generated as PDFs through Odoo's QWeb engine.",
      highlights: [
        "Daily logging with automatic fee calculation and shift tracking",
        "Central database with alerts for documents nearing expiry",
        "Monthly summaries per worker with one-click PDF export",
        "Structured tax reports ready for filing",
        "CSV import/export with validation and duplicate prevention",
        "PIN-protected access for sensitive operations"
      ],
      stack: ["Odoo 16", "Python", "ORM", "QWeb (PDF)", "CSV I/O"]
    }
  },
  {
    title: "Interactive NFC Menu for Restaurants & Bars",
    status: "done",
    description: "An NFC-powered digital menu: customers tap their phone on a table stand and the menu opens instantly, with no apps or QR codes needed.",
    tags: ["NFC", "Web App", "Multi-language", "Mobile-first"],
    demo: "https://cartainteractiva.es/carta/",
    code: "#",
    detail: {
      subtitle: "From table to menu in three seconds",
      summary: "A complete NFC solution for hospitality: a physical stand on every table opens the digital menu instantly in the browser, with no apps, cameras, or QR codes. Includes the restaurant's website and a management dashboard for real-time updates.",
      highlights: [
        "Instant menu access with a tap of the phone (iOS and Android)",
        "Expandable categories, photos, descriptions, prices, and allergen info, with no item limit",
        "Real-time price and dish updates from the dashboard",
        "Multi-language version with a visible language switcher",
        "Restaurant website included: reservations, delivery, and gallery",
        "Custom-branded NFC stands, durable and reprogrammable"
      ],
      stack: ["NFC", "Web App", "Management dashboard", "Multi-language"]
    }
  },
  {
    title: "NFC GO — NFC Treasure Hunt",
    status: "progress",
    description: "A gamified marketing tool: customers scan hidden NFC touchpoints around the venue to unlock rewards and redeem them on the spot.",
    tags: ["NFC", "Gamification", "Dashboard", "UX"],
    demo: "https://nfcuniverse.online/nfc-go-demo/",
    code: "#",
    detail: {
      subtitle: "An NFC treasure hunt built to drive sales",
      summary: "A gamified marketing tool: customers scan physical NFC touchpoints placed around the venue to unlock rewards and redeem them instantly, while the business tracks performance in real time.",
      highlights: [
        "Scan a hidden NFC tag to reveal an exclusive reward",
        "Unique, single-use discount code with a daily expiry",
        "Staff validation view showing code status",
        "Business dashboard: scans, redemptions, and conversion rate in real time",
        "Designed to boost engagement and repeat visits"
      ],
      stack: ["NFC", "Gamification", "Dashboard", "Real-time analytics"]
    }
  }
  // Example of how to add an in-progress project:
  // {
  //   title: "Project name",
  //   status: "progress",
  //   description: "Short description of what it does and what problem it solves.",
  //   tags: ["Tag1", "Tag2"],
  //   demo: "#",
  //   code: "#",
  //   detail: {
  //     subtitle: "A catchy one-liner",
  //     summary: "Longer paragraph explaining the project.",
  //     highlights: ["Key point 1", "Key point 2"],
  //     stack: ["Tech1", "Tech2"]
  //   }
  // }
];

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = projects.map((p, i) => `
    <div class="project-card reveal" style="transition-delay:${i * 60}ms" data-index="${i}" tabindex="0" role="button" aria-haspopup="dialog">
      <span class="project-status ${p.status === 'done' ? 'status-done' : 'status-progress'}">
        ${p.status === 'done' ? 'Completed' : 'In progress'}
      </span>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      <span class="card-expand">View details →</span>
    </div>
  `).join("");
  observeReveals();
}

// Mobile menu
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
navToggle.addEventListener("click", () => navMenu.classList.toggle("open"));
navMenu.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => navMenu.classList.remove("open"))
);

// Scroll reveal animation
function observeReveals() {
  const els = document.querySelectorAll(".reveal:not(.visible)");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
}

document.getElementById("year").textContent = new Date().getFullYear();

// Scroll progress bar + compact header + blob parallax
const progressBar = document.getElementById("progressBar");
const headerEl = document.getElementById("header");
const blobs = document.querySelectorAll(".blob");

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + "%";

  headerEl.classList.toggle("scrolled", scrollTop > 40);

  blobs.forEach((blob, i) => {
    const speed = 0.06 + i * 0.03;
    blob.style.setProperty("--py", `${scrollTop * speed}px`);
  });
}
window.addEventListener("scroll", onScroll, { passive: true });

// Animated counters in the stats strip
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll(".stat-num").forEach(el => statObserver.observe(el));

// Cursor-follow spotlight inside each project card
document.getElementById("projectsGrid").addEventListener("mousemove", (e) => {
  const card = e.target.closest(".project-card");
  if (!card) return;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--x", `${e.clientX - rect.left}px`);
  card.style.setProperty("--y", `${e.clientY - rect.top}px`);
});

// ------------------------------------------------------------------
// Project detail modal: opens when a card is clicked
// ------------------------------------------------------------------
const modalOverlay = document.getElementById("modalOverlay");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
let lastFocusedCard = null;

function openProjectModal(project) {
  const d = project.detail || {};
  modalBody.innerHTML = `
    <span class="project-status modal-status ${project.status === 'done' ? 'status-done' : 'status-progress'}">
      ${project.status === 'done' ? 'Completed' : 'In progress'}
    </span>
    <h3 id="modalTitle">${project.title}</h3>
    ${d.subtitle ? `<p class="modal-subtitle">${d.subtitle}</p>` : ""}
    <p class="modal-summary">${d.summary || project.description}</p>
    ${d.highlights && d.highlights.length ? `
      <p class="modal-section-label">Highlights</p>
      <ul class="modal-highlights">${d.highlights.map(h => `<li>${h}</li>`).join("")}</ul>
    ` : ""}
    <div class="tags">${(d.stack || project.tags).map(t => `<span>${t}</span>`).join("")}</div>
    <div class="modal-links">
      ${project.demo && project.demo !== "#" ? `<a href="${project.demo}" target="_blank" rel="noopener" class="btn btn-primary">View demo →</a>` : ""}
      ${project.code && project.code !== "#" ? `<a href="${project.code}" target="_blank" rel="noopener" class="btn btn-ghost">Code →</a>` : ""}
    </div>
  `;
  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeProjectModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
  if (lastFocusedCard) lastFocusedCard.focus();
}

document.getElementById("projectsGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");
  if (!card) return;
  lastFocusedCard = card;
  openProjectModal(projects[parseInt(card.dataset.index, 10)]);
});

document.getElementById("projectsGrid").addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target.closest(".project-card");
  if (!card) return;
  e.preventDefault();
  lastFocusedCard = card;
  openProjectModal(projects[parseInt(card.dataset.index, 10)]);
});

modalClose.addEventListener("click", closeProjectModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeProjectModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("open")) closeProjectModal();
});

renderProjects();
observeReveals();
onScroll();
