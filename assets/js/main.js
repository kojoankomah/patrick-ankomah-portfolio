const navigationToggle = document.querySelector(
  "[data-navigation-toggle]"
);

const navigation = document.querySelector(
  "[data-navigation]"
);

const siteHeader = document.querySelector(
  ".site-header"
);

function closeNavigation() {
  navigationToggle?.setAttribute(
    "aria-expanded",
    "false"
  );

  navigation?.classList.remove("is-open");
}

navigationToggle?.addEventListener("click", () => {
  const isOpen =
    navigationToggle.getAttribute("aria-expanded") ===
    "true";

  navigationToggle.setAttribute(
    "aria-expanded",
    String(!isOpen)
  );

  navigation?.classList.toggle("is-open", !isOpen);
});

navigation
  ?.querySelectorAll("a")
  .forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavigation();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) {
    closeNavigation();
  }
});

function updateHeaderAppearance() {
  siteHeader?.classList.toggle(
    "is-scrolled",
    window.scrollY > 20
  );
}

window.addEventListener(
  "scroll",
  updateHeaderAppearance,
  { passive: true }
);

updateHeaderAppearance();


const currentYear = document.querySelector(
  "#currentYear"
);

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


const sectionNavigationLinks = [
  ...document.querySelectorAll(
    '.primary-navigation a[href^="#"]'
  )
];

const navigationSections =
  sectionNavigationLinks
    .map((link) => {
      const section = document.querySelector(
        link.getAttribute("href")
      );

      return {
        link,
        section
      };
    })
    .filter((item) => item.section);

function updateActiveNavigation() {
  const referencePosition = window.scrollY + 220;
  let activeItem = null;

  navigationSections.forEach((item) => {
    if (item.section.offsetTop <= referencePosition) {
      activeItem = item;
    }
  });

  sectionNavigationLinks.forEach((link) => {
    const isActive = activeItem?.link === link;

    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

if (navigationSections.length > 0) {
  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );

  updateActiveNavigation();
}