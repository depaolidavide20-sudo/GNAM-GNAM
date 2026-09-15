const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const carousels = document.querySelectorAll("[data-carousel]");
const modalTriggers = document.querySelectorAll("[data-modal-open]");
const modals = document.querySelectorAll("[data-modal]");
const bookingForms = document.querySelectorAll("[data-booking-form]");
const languageLinks = document.querySelectorAll("[data-lang-switch]");
const hero = document.querySelector(".hero");
const heroCarousel = document.querySelector("[data-hero-carousel]");
const heroSlides = heroCarousel ? [...heroCarousel.querySelectorAll("[data-hero-slide]")] : [];
const heroCopySlides = heroCarousel ? [...heroCarousel.querySelectorAll("[data-hero-copy]")] : [];
const heroDots = heroCarousel ? [...heroCarousel.querySelectorAll("[data-hero-dot]")] : [];
const mobileCta = document.querySelector(".mobile-cta");
const mobileHeroQuery = window.matchMedia("(max-width: 720px)");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const whatsappNumber = "393207603965";
const menuModal = document.getElementById("menu-modal");
const menuPages = menuModal?.querySelector(".menu-pages");
const menuInputs = menuModal?.querySelectorAll('input[name="menu-view"]') || [];
const restaurantModal = document.getElementById("restaurant-modal");
const restaurantOccasion = restaurantModal?.querySelector('select[name="occasion"]');
const restaurantTime = restaurantModal?.querySelector('input[name="time"]');
const traditionScroll = document.querySelector("[data-tradition-scroll]");
const traditionChapters = traditionScroll ? [...traditionScroll.querySelectorAll("[data-tradition-chapter]")] : [];
const traditionCurrent = traditionScroll?.querySelector("[data-tradition-current]");
const originalTitle = document.title;
const metaDescription = document.querySelector('meta[name="description"]');
const originalDescription = metaDescription?.getAttribute("content") || "";

const originalHtml = new Map();
const originalAttributes = new Map();

function rememberHtml(element) {
  if (!originalHtml.has(element)) {
    originalHtml.set(element, element.innerHTML);
  }
}

function rememberAttribute(element, attribute) {
  const stored = originalAttributes.get(element) || {};

  if (!(attribute in stored)) {
    stored[attribute] = element.getAttribute(attribute);
    originalAttributes.set(element, stored);
  }
}

function setFullText(selector, text) {
  const element = document.querySelector(selector);

  if (!element) {
    return;
  }

  rememberHtml(element);
  element.textContent = text;
}

function setAllFullText(selector, texts) {
  document.querySelectorAll(selector).forEach((element, index) => {
    const text = Array.isArray(texts) ? texts[index] ?? texts[texts.length - 1] : texts;
    rememberHtml(element);
    element.textContent = text;
  });
}

function setInlineText(selector, text) {
  const element = document.querySelector(selector);

  if (!element) {
    return;
  }

  const textNodes = [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE);
  const primaryNode = textNodes.find((node) => node.textContent.trim());

  rememberHtml(element);

  if (!primaryNode) {
    element.append(document.createTextNode(` ${text}`));
    return;
  }

  primaryNode.textContent = ` ${text} `;

  textNodes
    .filter((node) => node !== primaryNode && node.textContent.trim())
    .forEach((node) => {
      node.textContent = "";
    });
}

function setAttribute(selector, attribute, value) {
  document.querySelectorAll(selector).forEach((element) => {
    rememberAttribute(element, attribute);
    element.setAttribute(attribute, value);
  });
}

function restoreItalianCopy() {
  originalHtml.forEach((html, element) => {
    element.innerHTML = html;
  });

  originalAttributes.forEach((attributes, element) => {
    Object.entries(attributes).forEach(([attribute, value]) => {
      if (value === null) {
        element.removeAttribute(attribute);
      } else {
        element.setAttribute(attribute, value);
      }
    });
  });

  document.title = originalTitle;
  metaDescription?.setAttribute("content", originalDescription);
}

function applyEnglishCopy() {
  document.title = "GnamGnam | Seafront deli and restaurant in Genoa";
  metaDescription?.setAttribute(
    "content",
    "GnamGnam in Genoa Quinto: Ligurian deli, seafood dishes and a seafront terrace on Via Angelo Gianelli 47R."
  );

  [
    [".skip-link", "Skip to content"],
    ['.site-nav a[href="#ristorante"]', "Restaurant"],
    ['.site-nav a[href="#location"]', "Location"],
    ['.site-nav a[href="#tradizione"]', "Our story"],
    ['.site-nav a[href="#recensioni"]', "Reviews"],
    ['.site-nav a[href="#contatti"]', "Contacts"],
    [".hero-copy-set:nth-child(1) .hero-kicker", "SEAFRONT RESTAURANT"],
    [".hero-copy-set:nth-child(1) .hero-slide-title", "A few steps from the sea."],
    [".hero-copy-set:nth-child(1) .hero-copy", "A terrace suspended over the Mediterranean, between light, sea breeze and authentic flavors."],
    [".hero-copy-set:nth-child(2) .hero-kicker", "THE ATMOSPHERE"],
    [".hero-copy-set:nth-child(2) .hero-slide-title", "The sea sets the scene."],
    [".hero-copy-set:nth-child(2) .hero-copy", "Lunches, dinners and shared moments on a terrace overlooking the Ligurian coast."],
    [".hero-copy-set:nth-child(3) .hero-kicker", "OUR CUISINE"],
    [".hero-copy-set:nth-child(3) .hero-slide-title", "Flavors that speak of the sea."],
    [".hero-copy-set:nth-child(3) .hero-copy", "Fish, Mediterranean recipes and simple ingredients treated with care and character."],
    [".hero-copy-set:nth-child(4) .hero-kicker", "AUTHENTICITY"],
    [".hero-copy-set:nth-child(4) .hero-slide-title", "Every dish begins here."],
    [".hero-copy-set:nth-child(4) .hero-copy", "Daily preparations, selected ingredients and cooking rooted in the territory."],
    [".hero-scroll", "Scroll"],
    [".restaurant-feature-copy .eyebrow", "Restaurant"],
    [".restaurant-feature-copy h2", "Ligurian cuisine by the sea."],
    [
      ".restaurant-feature-copy > p:not(.eyebrow)",
      "GnamGnam serves fresh dishes, Mediterranean recipes and a family story that began in 1998: a seafront deli where lunch, dinner and takeaway stay simple, generous and close to tradition."
    ],
    [".restaurant-info-panel span", "Info & reservations"],
    [".restaurant-info-panel strong", "Deli, Ligurian cuisine and seafront terrace"],
    [".restaurant-experience > .mobile-section-kicker", "Restaurant"],
    [".event-block .eyebrow", "Events"],
    [".event-copy h3", "Plan your event with us"],
    [
      ".event-copy p",
      "Birthdays, private dinners, aperitifs and moments to share on the seafront terrace: tell us what you have in mind and we will get back to you with a tailored proposal."
    ],
    [".restaurant-statement p", "From lunch on the coast to dinner on the terrace, every dish tells Genoa with the scent of the sea."],
    [".location-section .beach-story .eyebrow", "Location"],
    [".location-section .beach-story h2", "Genoa Quinto, terrace by the sea."],
    [
      ".location-section .beach-story > p:not(.eyebrow)",
      "GnamGnam is located at Via Angelo Gianelli 47R, in Genoa's eastern side: a seafront terrace for a quick break, a family lunch, dinner with friends or takeaway by the sea."
    ],
    [".beach-info-panel span", "Address"],
    [".beach-info-panel strong", "Via Angelo Gianelli 47R · Genoa 16166"],
    [".location-section > .mobile-section-kicker", "Location"],
    [".tradition-section-kicker", "Our story"],
    [".tradition-intro-copy h2", "Family roots"],
    [".tradition-story-item:nth-child(1) strong", "1998 Gnam Gnam is born"],
    [".tradition-story-item:nth-child(1) p", "The first cafeteria opens in Cherkassy, Ukraine."],
    [".tradition-story-item:nth-child(2) strong", "2008 Genoa Quinto"],
    [".tradition-story-item:nth-child(2) p", "A family-run deli and takeaway pizzeria."],
    [".tradition-story-item:nth-child(3) strong", "2010 New formula"],
    [".tradition-story-item:nth-child(3) p", "Deli dishes and kebab bring in new regular guests."],
    [".tradition-story-item:nth-child(4) strong", "2013 Seafront terrace"],
    [".tradition-story-item:nth-child(4) p", "On-site dining opens with a view over Genoa Quinto."],
    [".tradition-story-item:nth-child(5) strong", "2019 Renewal"],
    [".tradition-story-item:nth-child(5) p", "A new look, new menu and new team members."],
    [".tradition-story-item:nth-child(6) strong", "2020 Delivery"],
    [".tradition-story-item:nth-child(6) p", "During Covid the business resists and reinvents itself."],
    [".tradition-story-item:nth-child(7) strong", "2023 New generation"],
    [".tradition-story-item:nth-child(7) p", "Daniyil brings family continuity and innovation."],
    [".review-pill", "Reviews"],
    [".reviews-inner h2", "What guests say"],
    [".review-card:nth-child(1) blockquote", "\"Simple, good cooking and a seafront terrace that makes every break special.\""],
    [".review-card:nth-child(2) blockquote", "\"Fresh seafood dishes, kind staff and a family atmosphere in Genoa Quinto.\""],
    [".review-card:nth-child(3) blockquote", "\"A deli with a sea view for lunch, dinner or takeaway.\""],
    [".review-swipe-hint", "Swipe to read the reviews"],
    [".contact-pill", "Contacts"],
    [".contact-card h2", "Come visit us."],
    [".contact-card > .contact-item:nth-of-type(1) div > span", "How to reach us"],
    [".contact-card > .contact-item:nth-of-type(1) strong", "Genoa Quinto\nVia Angelo Gianelli 47R"],
    [
      ".contact-card > .contact-item:nth-of-type(1) p",
      "GnamGnam is above the Scalo area, on Genoa's eastern side, with a terrace overlooking the sea."
    ],
    [".contact-card > .contact-item:nth-of-type(2) div > span", "Phone"],
    [".contact-card > .contact-item:nth-of-type(3) div > span", "Email"],
    [".contact-card > .contact-item:nth-of-type(4) div > span", "Hours"],
    [".contact-hours strong", "Lunch 12:00-15:30 · Dinner 19:00-23:00"],
    [".contact-hours p", "Lunch every day. Lunch and dinner from Friday to Tuesday according to the restaurant's public information."],
    [".route-kicker", "Directions"],
    [".route-card h3", "Open the map"],
    [".route-intro", "Via Angelo Gianelli 47R, Genoa Quinto. Open Google Maps to start updated directions from your current location."],
    [".route-steps li:nth-child(1) p", "Reach Genoa Quinto and head toward the Scalo area."],
    [".route-steps li:nth-child(2) p", "Continue along Via Angelo Gianelli to number 47R."],
    [".route-steps li:nth-child(3) p", "GnamGnam is above the Scalo area, with access to the seafront terrace."],
    ["#restaurant-modal .eyebrow", "Restaurant reservation"],
    ["#restaurant-modal-title", "Book your table"],
    ["#event-modal .eyebrow", "Private events"],
    ["#event-modal-title", "Tell us about your event"],
    ["#menu-modal .eyebrow", "Digital menu"],
    ["#menu-modal-title", "GnamGnam menu"],
    [".menu-intro", "A provisional selection inspired by the public menu: dish photos will arrive later."],
    [".menu-tab-label-lunch", "Lunch"],
    [".menu-tab-label-dinner", "Dinner"],
    [".footer-copy", "© 2026 GnamGnam · All rights reserved"],
    [".footer-legal-links a:nth-of-type(1)", "Privacy Policy"],
    [".footer-legal-links a:nth-of-type(2)", "Cookie Policy"],
    [".footer-legal-links a:nth-of-type(3)", "Legal notes"],
  ].forEach(([selector, text]) => setFullText(selector, text));

  [
    [".tradition-story-item:nth-child(1) strong", "<span>1998</span> Gnam Gnam is born"],
    [".tradition-story-item:nth-child(2) strong", "<span>2008</span> Genoa Quinto"],
    [".tradition-story-item:nth-child(3) strong", "<span>2010</span> New formula"],
    [".tradition-story-item:nth-child(4) strong", "<span>2013</span> Seafront terrace"],
    [".tradition-story-item:nth-child(5) strong", "<span>2019</span> Renewal"],
    [".tradition-story-item:nth-child(6) strong", "<span>2020</span> Delivery"],
    [".tradition-story-item:nth-child(7) strong", "<span>2023</span> New generation"],
  ].forEach(([selector, html]) => {
    const element = document.querySelector(selector);

    if (!element) {
      return;
    }

    rememberHtml(element);
    element.innerHTML = html;
  });

  setAllFullText(".review-card figcaption strong", "Online guest");
  setAllFullText(".review-card figcaption span", "Public review");

  document.querySelectorAll(".privacy-consent-copy").forEach((element) => {
    rememberHtml(element);
    element.innerHTML =
      'I have read the <a href="privacy-policy.html" target="_blank" rel="noopener">Privacy Policy</a> and understand that the request will be sent via WhatsApp only through my voluntary action.';
  });

  [
    [".hero-actions .button-primary", "Book a table"],
    [".hero-actions .button-ghost", "Discover the menu"],
    [".restaurant-menu-preview", "View menu"],
    [".restaurant-call-link", "Call now"],
    [".event-block .button", "Request information"],
    [".beach-info-panel .whatsapp-cta", "Call GnamGnam"],
    [".review-cta", "Leave a review on Tripadvisor"],
    [".contact-actions .button-primary", "Book a table"],
    [".contact-call", "Call now"],
    [".map-directions", "Start directions"],
    [".mobile-cta-reservation", "Book a table"],
  ].forEach(([selector, text]) => setInlineText(selector, text));

  const storyItems = [
    ["1998", "Gnam Gnam is born", "The story begins in Cherkassy, Ukraine, with a small cafeteria inside a public hospital."],
    ["2008", "A deli in Genoa", "Gnam Gnam is reborn in Quinto as a family-run deli and takeaway pizzeria."],
    ["2010", "A new formula", "The offer evolves with takeaway deli dishes and kebab."],
    ["2013", "The terrace turning point", "On-site dining opens the seafront terrace, now the venue's signature feature."],
    ["2019", "The major renewal", "A full renovation brings a new look, menu and team."],
    ["2020", "Resilience and reinvention", "During Covid the business keeps going and introduces delivery."],
    ["2023", "The new generation", "Daniyil brings innovation and continuity to the family story."]
  ];

  document.querySelectorAll(".tradition-story-item").forEach((item, index) => {
    const story = storyItems[index];

    if (!story) {
      return;
    }

    rememberHtml(item);
    item.innerHTML = `<h3><span>${story[0]}</span> ${story[1]}</h3><p>${story[2]}</p>`;
  });

  [
    ["#restaurant-modal .booking-form > label:nth-of-type(1)", "Full name"],
    ["#restaurant-modal .booking-form > label:nth-of-type(2)", "Phone"],
    ["#restaurant-modal .form-row label:nth-child(1)", "Date"],
    ["#restaurant-modal .form-row label:nth-child(2)", "Time"],
    ["#restaurant-modal .booking-form > label:nth-of-type(3)", "People"],
    ["#restaurant-modal .booking-form > label:nth-of-type(4)", "Occasion"],
    ["#restaurant-modal .booking-form > label:nth-of-type(5)", "Notes"],
    ["#event-modal .booking-form > label:nth-of-type(1)", "Full name"],
    ["#event-modal .booking-form > label:nth-of-type(2)", "Phone"],
    ["#event-modal .booking-form > label:nth-of-type(3)", "Email"],
    ["#event-modal .form-row label:nth-child(1)", "Indicative date"],
    ["#event-modal .form-row label:nth-child(2)", "Time"],
    ["#event-modal .booking-form > label:nth-of-type(4)", "Guests"],
    ["#event-modal .booking-form > label:nth-of-type(5)", "Event type"],
    ["#event-modal .booking-form > label:nth-of-type(6)", "Notes and requests"],
  ].forEach(([selector, text]) => setInlineText(selector, text));

  [
    ["#restaurant-modal select[name='occasion'] option:nth-child(1)", "Lunch"],
    ["#restaurant-modal select[name='occasion'] option:nth-child(2)", "Dinner"],
    ["#restaurant-modal select[name='occasion'] option:nth-child(3)", "Takeaway"],
    ["#restaurant-modal select[name='occasion'] option:nth-child(4)", "Private event"],
    ["#event-modal select[name='eventType'] option:nth-child(1)", "Birthday"],
    ["#event-modal select[name='eventType'] option:nth-child(2)", "Private dinner"],
    ["#event-modal select[name='eventType'] option:nth-child(3)", "Aperitif"],
    ["#event-modal select[name='eventType'] option:nth-child(4)", "Corporate event"],
    ["#event-modal select[name='eventType'] option:nth-child(5)", "Other"],
  ].forEach(([selector, text]) => setFullText(selector, text));

  setFullText(".dinner-window-help", "Lunch 12:00-15:30. Dinner 19:00-23:00 on the days indicated by the restaurant.");
  setFullText("#restaurant-modal .booking-form button[type='submit']", "Send request on WhatsApp");
  setFullText("#event-modal .booking-form button[type='submit']", "Send event request on WhatsApp");
  setAttribute(".modal-close", "aria-label", "Close form");
}

function updateRestaurantTimeHelp(language = document.documentElement.lang) {
  if (!restaurantOccasion || !restaurantTime) {
    return;
  }

  const value = String(restaurantOccasion.value || "").trim().toLowerCase();
  const isEnglish = language === "en";

  if (value.includes("pranzo") || value.includes("lunch")) {
    restaurantTime.min = "12:00";
    restaurantTime.max = "15:30";
    setFullText(".dinner-window-help", isEnglish ? "For lunch, choose a time between 12:00 and 15:30." : "Per il pranzo indica un orario tra le 12:00 e le 15:30.");
  } else if (value.includes("asporto") || value.includes("takeaway")) {
    restaurantTime.min = "12:00";
    restaurantTime.max = "23:00";
    setFullText(".dinner-window-help", isEnglish ? "Choose your preferred pickup time." : "Indica l'orario preferito per il ritiro.");
  } else {
    restaurantTime.min = "19:00";
    restaurantTime.max = "23:00";
    setFullText(".dinner-window-help", isEnglish ? "For dinner, choose a time between 19:00 and 23:00." : "Per la cena indica un orario tra le 19:00 e le 23:00.");
  }

  if (restaurantTime.value && (restaurantTime.value < restaurantTime.min || restaurantTime.value > restaurantTime.max)) {
    restaurantTime.value = "";
  }
}

function setLanguage(language, updateHash = true) {
  const nextLanguage = language === "en" ? "en" : "it";

  restoreItalianCopy();

  if (nextLanguage === "en") {
    applyEnglishCopy();
  }

  document.documentElement.lang = nextLanguage;
  updateRestaurantTimeHelp(nextLanguage);

  languageLinks.forEach((link) => {
    const isActive = link.dataset.langSwitch === nextLanguage;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  if (updateHash && window.history?.replaceState) {
    window.history.replaceState(null, "", nextLanguage === "en" ? "#en" : "#it");
  }
}

languageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setLanguage(link.dataset.langSwitch);
  });
});

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

let activeTraditionIndex = -1;

function setTraditionChapter(index) {
  if (!traditionChapters.length) {
    return;
  }

  const nextIndex = clamp(Number.isFinite(index) ? index : 0, 0, traditionChapters.length - 1);

  if (nextIndex === activeTraditionIndex) {
    return;
  }

  activeTraditionIndex = nextIndex;

  traditionChapters.forEach((chapter, chapterIndex) => {
    const isActive = chapterIndex === nextIndex;
    chapter.classList.toggle("is-active", isActive);
    chapter.classList.toggle("is-before", chapterIndex < nextIndex);
    chapter.classList.toggle("is-after", chapterIndex > nextIndex);

    if (isActive) {
      chapter.setAttribute("aria-current", "step");
    } else {
      chapter.removeAttribute("aria-current");
    }
  });

  if (traditionCurrent) {
    traditionCurrent.textContent = String(nextIndex + 1).padStart(2, "0");
  }
}

function syncTradition() {
  if (!traditionScroll || traditionChapters.length === 0) {
    return;
  }

  if (reducedMotionQuery.matches) {
    traditionChapters.forEach((chapter) => chapter.removeAttribute("aria-current"));
    return;
  }

  const totalSteps = traditionChapters.length;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const sectionTop = traditionScroll.offsetTop;
  const scrollableDistance = Math.max(traditionScroll.offsetHeight - viewportHeight, 1);
  const rawProgress = (window.scrollY - sectionTop) / scrollableDistance;
  const progress = clamp(Number.isFinite(rawProgress) ? rawProgress : 0, 0, 0.9999);
  const nextIndex = Math.min(totalSteps - 1, Math.max(0, Math.floor(progress * totalSteps)));

  setTraditionChapter(nextIndex);
}

function syncHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
}

function syncMobileHeroCta() {
  if (!hero || !mobileCta) {
    return;
  }

  const heroBottom = hero.getBoundingClientRect().bottom;
  const shouldShowHeroCta = mobileHeroQuery.matches && heroBottom > window.innerHeight * 0.42;
  document.body.classList.toggle("hero-mobile-cta", shouldShowHeroCta);
}

function syncHero() {
  syncHeader();
  syncMobileHeroCta();
  syncTradition();
}

let ticking = false;

function requestSync() {
  if (ticking) {
    return;
  }

  ticking = true;
  window.requestAnimationFrame(() => {
    syncHero();
    ticking = false;
  });
}

syncHero();
window.addEventListener("scroll", requestSync, { passive: true });
window.addEventListener("resize", requestSync);
reducedMotionQuery.addEventListener?.("change", requestSync);

function initHeroCarousel() {
  if (!heroCarousel || heroSlides.length === 0) {
    return;
  }

  const intervalMs = 3800;
  let activeIndex = Math.max(heroSlides.findIndex((slide) => slide.classList.contains("is-active")), 0);
  let timer = 0;
  let isPointerOver = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStarted = false;

  function sync(index) {
    activeIndex = (index + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    heroCopySlides.forEach((copy, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      copy.classList.toggle("is-active", isActive);
      copy.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    heroDots.forEach((dot, slideIndex) => {
      dot.classList.toggle("is-active", slideIndex === activeIndex);
      dot.setAttribute("aria-current", slideIndex === activeIndex ? "true" : "false");
    });
  }

  function stopTimer() {
    if (timer) {
      window.clearTimeout(timer);
      timer = 0;
    }
  }

  function shouldRun() {
    return document.visibilityState === "visible" && !isPointerOver;
  }

  function schedule() {
    stopTimer();

    if (!shouldRun()) {
      return;
    }

    timer = window.setTimeout(() => {
      goTo(activeIndex + 1);
    }, intervalMs);
  }

  function goTo(index) {
    sync(index);
    schedule();
  }

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => goTo(index));
  });

  heroCarousel.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      touchStarted = true;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    },
    { passive: true }
  );

  heroCarousel.addEventListener(
    "touchend",
    (event) => {
      if (!touchStarted) {
        return;
      }

      const touch = event.changedTouches[0];
      touchStarted = false;

      if (!touch) {
        return;
      }

      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;

      if (Math.abs(deltaX) > 44 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35) {
        goTo(deltaX < 0 ? activeIndex + 1 : activeIndex - 1);
      }
    },
    { passive: true }
  );

  heroCarousel.addEventListener("mouseenter", () => {
    if (mobileHeroQuery.matches) {
      return;
    }

    isPointerOver = true;
    stopTimer();
  });

  heroCarousel.addEventListener("mouseleave", () => {
    isPointerOver = false;
    schedule();
  });

  window.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) {
      return;
    }

    if (document.body.classList.contains("modal-open")) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      schedule();
    } else {
      stopTimer();
    }
  });

  sync(activeIndex);
  schedule();
}

initHeroCarousel();

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  header?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navToggle?.setAttribute("aria-expanded", "false");
    header?.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }
});

function resetMenuScroll() {
  window.requestAnimationFrame(() => {
    if (menuPages) {
      menuPages.scrollTop = 0;
      menuPages.scrollLeft = 0;
    }

    const dialog = menuModal?.querySelector(".booking-dialog");
    if (dialog) {
      dialog.scrollTop = 0;
      dialog.scrollLeft = 0;
    }
  });
}

menuInputs.forEach((input) => {
  input.addEventListener("change", resetMenuScroll);
});

restaurantOccasion?.addEventListener("change", () => updateRestaurantTimeHelp());
restaurantTime?.addEventListener("input", () => updateRestaurantTimeHelp());
updateRestaurantTimeHelp();

function closeModal(modal) {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) {
    return;
  }

  modals.forEach(closeModal);
  modal.hidden = false;
  document.body.classList.add("modal-open");

  if (modal.id === "menu-modal") {
    resetMenuScroll();
  }

  modal.querySelector(".booking-form input, .booking-form select, .booking-form textarea, .modal-close")?.focus();
}

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => openModal(trigger.dataset.modalOpen));
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute("data-modal-close")) {
      closeModal(modal);
    }
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modals.forEach((modal) => {
      if (!modal.hidden) {
        closeModal(modal);
      }
    });
  }
});

carousels.forEach((carousel) => {
  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const track = carousel.querySelector("[data-carousel-track]");
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const slides = [...carousel.querySelectorAll("[data-carousel-card]")];
  let activeIndex = 0;
  let scrollFrame = 0;

  function activeSlides() {
    return slides.filter((slide) => window.getComputedStyle(slide).display !== "none");
  }

  function visibleSlides() {
    const mobileCount = Number(carousel.dataset.visibleMobile || 1);
    const desktopCount = Number(carousel.dataset.visibleDesktop || 3);
    return window.matchMedia("(max-width: 720px)").matches ? mobileCount : desktopCount;
  }

  function slideWidth() {
    const currentSlides = activeSlides();

    if (!currentSlides[0]) {
      return 0;
    }

    const style = window.getComputedStyle(track || viewport);
    const gap = parseFloat(style.columnGap || style.gap || "0");
    return currentSlides[0].getBoundingClientRect().width + gap;
  }

  function maxIndex() {
    return Math.max(activeSlides().length - visibleSlides(), 0);
  }

  function loadSlideImages(fromIndex = activeIndex) {
    const currentSlides = activeSlides();
    const preloadWindow = Math.max(visibleSlides() + 2, 3);
    const preloadUntil = Math.min(fromIndex + preloadWindow, currentSlides.length);

    for (let index = fromIndex; index < preloadUntil; index += 1) {
      const image = currentSlides[index]?.querySelector("img");

      if (!image) {
        continue;
      }

      image.loading = "eager";
      image.decoding = "async";
    }
  }

  function normalizeIndex(index) {
    const limit = maxIndex();

    if (index < 0) {
      return limit;
    }

    if (index > limit) {
      return 0;
    }

    return index;
  }

  function syncFromScroll() {
    const width = slideWidth();

    if (!viewport || !width) {
      return;
    }

    activeIndex = clamp(Math.round(viewport.scrollLeft / width), 0, maxIndex());
    loadSlideImages();
  }

  function goTo(index) {
    if (!viewport || activeSlides().length === 0) {
      return;
    }

    activeIndex = normalizeIndex(index);
    loadSlideImages();
    viewport.scrollTo({ left: slideWidth() * activeIndex, behavior: "smooth" });
  }

  prevButton?.addEventListener("click", (event) => {
    goTo(activeIndex - 1);
    event.currentTarget.blur();
  });

  nextButton?.addEventListener("click", (event) => {
    goTo(activeIndex + 1);
    event.currentTarget.blur();
  });

  viewport?.addEventListener(
    "scroll",
    () => {
      if (scrollFrame) {
        return;
      }

      scrollFrame = window.requestAnimationFrame(() => {
        syncFromScroll();
        scrollFrame = 0;
      });
    },
    { passive: true }
  );

  window.addEventListener("resize", () => goTo(activeIndex));
  loadSlideImages(0);
});

function formValue(formData, name) {
  return String(formData.get(name) || "").trim();
}

function messageLines(formData, kind = "ristorante") {
  if (kind === "eventi") {
    return [
      "Ciao GnamGnam, vorrei informazioni per organizzare un evento.",
      `Nome: ${formValue(formData, "name")}`,
      `Telefono: ${formValue(formData, "phone")}`,
      `Email: ${formValue(formData, "email") || "-"}`,
      `Tipo evento: ${formValue(formData, "eventType") || "-"}`,
      `Data indicativa: ${formValue(formData, "date")}`,
      `Orario: ${formValue(formData, "time")}`,
      `Numero ospiti: ${formValue(formData, "guests")}`,
      `Note: ${formValue(formData, "notes") || "-"}`,
    ];
  }

  return [
    "Ciao GnamGnam, vorrei fare una richiesta di prenotazione.",
    `Nome: ${formValue(formData, "name")}`,
    `Telefono: ${formValue(formData, "phone")}`,
    `Data: ${formValue(formData, "date")}`,
    `Orario: ${formValue(formData, "time")}`,
    `Persone: ${formValue(formData, "people")}`,
    `Occasione: ${formValue(formData, "occasion") || "-"}`,
    `Note: ${formValue(formData, "notes") || "-"}`,
  ];
}

bookingForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const kind = form.dataset.bookingKind || "ristorante";

    if (kind === "ristorante") {
      updateRestaurantTimeHelp();
    }

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const message = messageLines(formData, kind).join("\n");
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");

    const modal = form.closest("[data-modal]");
    if (modal) {
      closeModal(modal);
    }

    form.reset();
  });
});

const initialLanguage = window.location.hash === "#en" ? "en" : "it";
setLanguage(initialLanguage, false);
