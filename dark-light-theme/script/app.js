const html = document.documentElement;

// #region ***  DOM references                           ***********
// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const showTheme = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
  html.classList.add(savedTheme);
  showThemeToggle(savedTheme);
  listenToThemeChange();
};

const showThemeToggle = (theme) => {
  const themeToggleButtons = document.querySelectorAll(".js-theme-toggle");
  if (theme === "light") {
    themeToggleButtons[0].classList.add("c-theme__toggle--active");
    themeToggleButtons[1].classList.remove("c-theme__toggle--active");
  } else {
    themeToggleButtons[0].classList.remove("c-theme__toggle--active");
    themeToggleButtons[1].classList.add("c-theme__toggle--active");
  }
};

// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********
// #endregion

// #region ***  Data Access - get___                     ***********
// #endregion

// #region ***  Event Listeners - listenTo___            ***********

const listenToThemeChange = () => {
  const themeToggleButtons = document.querySelectorAll(".js-theme-toggle");
  for (const button of themeToggleButtons) {
    button.addEventListener("click", () => {
      const newTheme = html.classList.contains("dark") ? "light" : "dark";
      html.classList.remove("dark", "light");
      html.classList.add(newTheme);
      showThemeToggle(newTheme);
      localStorage.setItem("theme", newTheme);
      document.dispatchEvent(new CustomEvent("themechange", { detail: newTheme }));
    });
  }
  // Stay in sync when the theme is switched elsewhere (e.g. the nav footer).
  document.addEventListener("themechange", (event) => showThemeToggle(event.detail));
};

// #endregion

// #region ***  Init / DOMContentLoaded                  ***********

const init = () => {
  showTheme();
};

document.addEventListener("DOMContentLoaded", init);

// #endregion
