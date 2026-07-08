// #region ***  Configuration                            ***********

// Register every experiment here: name, folder path (relative to the repo
// root, empty string for the home page) and a Lucide icon name
// (https://lucide.dev/icons).
const experiments = [
  { name: "Home", path: "", icon: "house" },
  { name: "Dark/Light Theme", path: "dark-light-theme", icon: "sun-moon" },
  { name: "Language Toggle", path: "language-toggle", icon: "languages" },
  { name: "GSAP Animations", path: "gsap-animations", icon: "sparkles" },
];

const lucideScriptUrl = "https://cdn.jsdelivr.net/npm/lucide@0.525.0/dist/umd/lucide.min.js";

// This script lives at <root>/shared/nav/nav.js, so the repo root is two
// levels up from the script's own URL — works from any page depth.
const rootUrl = new URL("../../", document.currentScript.src).href;

// #endregion

// #region ***  DOM references                           ***********

const getNavElement = () => document.querySelector(".js-nav");

const getThemeButtonElement = () => document.querySelector(".js-nav-theme");

// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const showStylesheet = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = new URL("shared/nav/nav.css", rootUrl).href;
  document.head.appendChild(link);
};

const showNav = () => {
  const nav = document.createElement("div");
  nav.className = "js-nav c-nav";
  nav.innerHTML = `
    <button class="js-nav-toggle c-nav__toggle" aria-label="Open navigation" aria-expanded="false">
      <i data-lucide="menu"></i>
    </button>
    <div class="js-nav-backdrop c-nav__backdrop"></div>
    <nav class="c-nav__panel" aria-label="Sandbox navigation">
      <div class="c-nav__header">
        <span class="c-nav__title">Sandbox</span>
        <button class="js-nav-close c-nav__close" aria-label="Close navigation">
          <i data-lucide="x"></i>
        </button>
      </div>
      <ul class="c-nav__list">
        ${experiments.map(showNavItem).join("")}
      </ul>
      <div class="c-nav__footer">
        <button class="js-nav-theme c-nav__theme" type="button"></button>
      </div>
    </nav>
  `;
  document.body.appendChild(nav);
};

const showThemeButton = () => {
  const isDark = getCurrentTheme() === "dark";
  getThemeButtonElement().innerHTML = `
    <i data-lucide="${isDark ? "sun" : "moon"}"></i>
    <span>${isDark ? "Light mode" : "Dark mode"}</span>
  `;
  // Lucide replaces <i data-lucide> with an svg, so re-run it after updates.
  if (window.lucide) {
    lucide.createIcons();
  }
};

const showNavItem = (experiment) => {
  const href = getExperimentUrl(experiment);
  const activeClass = getIsCurrentPage(href) ? " c-nav__item--active" : "";
  return `
    <li>
      <a class="c-nav__item${activeClass}" href="${href}">
        <i data-lucide="${experiment.icon}"></i>
        <span>${experiment.name}</span>
      </a>
    </li>
  `;
};

const showIcons = () => {
  const script = document.createElement("script");
  script.src = lucideScriptUrl;
  script.onload = () => lucide.createIcons();
  document.head.appendChild(script);
};

// The dark/light-theme experiment stores the chosen theme in localStorage;
// apply it on every page so the whole sandbox keeps a consistent look.
const showSavedTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    document.documentElement.classList.add(savedTheme);
  }
};

const showNavOpen = (isOpen) => {
  const navElement = getNavElement();
  navElement.classList.toggle("c-nav--open", isOpen);
  navElement.querySelector(".js-nav-toggle").setAttribute("aria-expanded", isOpen);
};

// #endregion

// #region ***  Data Access - get___                     ***********

const getExperimentUrl = (experiment) => {
  return new URL(experiment.path ? `${experiment.path}/` : "", rootUrl).href;
};

const getIsCurrentPage = (href) => {
  const normalize = (pathname) => pathname.replace(/index\.html$/, "");
  return normalize(new URL(href).pathname) === normalize(window.location.pathname);
};

const getCurrentTheme = () => {
  const html = document.documentElement;
  if (html.classList.contains("dark")) return "dark";
  if (html.classList.contains("light")) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

// #endregion

// #region ***  Event Listeners - listenTo___            ***********

const listenToNavToggle = () => {
  const navElement = getNavElement();
  navElement.querySelector(".js-nav-toggle").addEventListener("click", () => {
    showNavOpen(!navElement.classList.contains("c-nav--open"));
  });
  navElement.querySelector(".js-nav-close").addEventListener("click", () => showNavOpen(false));
  navElement.querySelector(".js-nav-backdrop").addEventListener("click", () => showNavOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      showNavOpen(false);
    }
  });
};

const listenToThemeToggle = () => {
  getThemeButtonElement().addEventListener("click", () => {
    const newTheme = getCurrentTheme() === "dark" ? "light" : "dark";
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    showThemeButton();
    document.dispatchEvent(new CustomEvent("themechange", { detail: newTheme }));
  });
  // Keep the button in sync when an experiment changes the theme itself.
  document.addEventListener("themechange", showThemeButton);
};

// #endregion

// #region ***  Init / DOMContentLoaded                  ***********

const initNav = () => {
  showSavedTheme();
  showStylesheet();
  showNav();
  showThemeButton();
  showIcons();
  listenToNavToggle();
  listenToThemeToggle();
};

document.addEventListener("DOMContentLoaded", initNav);

// #endregion
