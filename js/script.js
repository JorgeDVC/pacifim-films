/* =========================================================
   PACIFIM FILMS — script.js
   Menú móvil, header al hacer scroll, tabs de servicios,
   galería filmstrip, animaciones de revelado y formulario
   de contacto (redirige a WhatsApp con el mensaje).
   ========================================================= */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Año en el footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header: sombra/blur al hacer scroll ---------- */
  var header = document.getElementById("siteHeader");
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  document.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Menú móvil ---------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  var iconOpen = document.getElementById("navIconOpen");
  var iconClose = document.getElementById("navIconClose");

  function closeNav() {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
    iconOpen.style.display = "";
    iconClose.style.display = "none";
  }
  function openNav() {
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú de navegación");
    iconOpen.style.display = "none";
    iconClose.style.display = "";
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = document.body.classList.contains("nav-open");
      if (isOpen) { closeNav(); } else { openNav(); }
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Tabs de servicios ---------- */
  var tabs = document.querySelectorAll(".services-tab");
  var panels = { "tab-foto": document.getElementById("panel-foto"), "tab-mkt": document.getElementById("panel-mkt") };
  var tabIndicator = document.getElementById("tabIndicator");
  var tabsWrap = document.querySelector(".services-tabs");

  function moveIndicatorTo(tab) {
    if (!tabIndicator || !tabsWrap || !tab) return;
    var wrapRect = tabsWrap.getBoundingClientRect();
    var tabRect = tab.getBoundingClientRect();
    var offsetX = tabRect.left - wrapRect.left - 6; /* align with wrapper's own 0.35rem padding minus border */
    tabIndicator.style.width = tabRect.width + "px";
    tabIndicator.style.transform = "translateX(" + Math.max(0, offsetX) + "px)";
  }

  function selectTab(tab) {
    tabs.forEach(function (t) {
      t.setAttribute("aria-selected", "false");
      t.setAttribute("tabindex", "-1");
    });
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");

    Object.keys(panels).forEach(function (id) {
      if (panels[id]) panels[id].hidden = true;
    });
    var panel = panels[tab.id];
    if (panel) panel.hidden = false;

    moveIndicatorTo(tab);
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () { selectTab(tab); });

    tab.addEventListener("keydown", function (e) {
      var tabArray = Array.prototype.slice.call(tabs);
      var idx = tabArray.indexOf(tab);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        var nextIdx = e.key === "ArrowRight"
          ? (idx + 1) % tabArray.length
          : (idx - 1 + tabArray.length) % tabArray.length;
        tabArray[nextIdx].focus();
        selectTab(tabArray[nextIdx]);
      }
    });
  });

  /* Posicionar el indicador al cargar y al redimensionar la ventana */
  function initIndicator() {
    var activeTab = document.querySelector('.services-tab[aria-selected="true"]');
    moveIndicatorTo(activeTab);
  }
  window.addEventListener("load", initIndicator);
  window.addEventListener("resize", initIndicator);
  initIndicator();

  /* ---------- Galería filmstrip ---------- */
  var filmstrip = document.getElementById("filmstrip");
  var scrollLeftBtn = document.getElementById("scrollLeft");
  var scrollRightBtn = document.getElementById("scrollRight");

  function scrollFilmstrip(direction) {
    if (!filmstrip) return;
    var frame = filmstrip.querySelector(".frame");
    var step = frame ? frame.getBoundingClientRect().width + 16 : 300;
    filmstrip.scrollBy({ left: direction * step, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }
  if (scrollLeftBtn) scrollLeftBtn.addEventListener("click", function () { scrollFilmstrip(-1); });
  if (scrollRightBtn) scrollRightBtn.addEventListener("click", function () { scrollFilmstrip(1); });

  /* ---------- Revelado al hacer scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Formulario de contacto -> WhatsApp ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  var WHATSAPP_NUMBER = "5355950707";

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      //var phone = form.phone.value.trim();
      var service = form.service.value;
      var message = form.message.value.trim();

      if (!name || !service || !message) {
        status.textContent = "Por favor completa todos los campos antes de enviar.";
        status.dataset.state = "error";
        return;
      }

      //var phoneDigits = phone.replace(/[^\d]/g, "");
      //if (phoneDigits.length < 7) {
      //  status.textContent = "Revisa el número de teléfono, parece incompleto.";
      //  status.dataset.state = "error";
      //  return;
      //}

      var serviceLabels = {
        sencillo: "Paquete Sencillo",
        medio: "Paquete Medio",
        premium: "Paquete Premium",
        marketing: "Marketing para mi negocio",
        otro: "Otro"
      };

      var text = "Hola, soy " + name + " \n" +
        "me interesa: " + (serviceLabels[service] || service) + "\n" +
        message;

      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);

      var opened = window.open(url, "_blank", "noopener");

      /* Si el navegador bloqueó la ventana emergente (frecuente en algunos
         navegadores móviles), mostramos un enlace visible como respaldo
         para que el mensaje nunca se pierda. */
      if (!opened || opened.closed || typeof opened.closed === "undefined") {
        status.innerHTML = '¡Gracias! Tu navegador bloqueó la apertura automática — ' +
          '<a href="' + url + '" target="_blank" rel="noopener" style="color:var(--gold-bright); text-decoration:underline;">' +
          'toca aquí para abrir WhatsApp</a>.';
        status.dataset.state = "success";
      } else {
        status.textContent = "¡Gracias! Abriendo WhatsApp para confirmar tu mensaje...";
        status.dataset.state = "success";
      }

      form.reset();
    });
  }
})();
