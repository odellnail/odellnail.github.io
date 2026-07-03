/*
 * main.js — site behavior + a small bridge to GTM's dataLayer.
 *
 * GTM EVENT PATTERN:
 * Any element with a data-gtm-event="some_name" attribute gets its clicks
 * pushed to window.dataLayer automatically (see bindGtmEvents below). This
 * means adding tracking to a new button later is just:
 *
 *   <a href="#" data-gtm-event="pricing_click">See pricing</a>
 *
 * No code changes needed here. In GTM, create a Trigger of type
 * "Custom Event" with event name matching what you pushed (e.g.
 * "pricing_click"), attach it to whatever Tag you want to fire.
 */

(function () {
  "use strict";

  // Make sure dataLayer exists even if GTM hasn't loaded yet (e.g. blocked
  // by an ad blocker) — pushes just become harmless no-ops instead of errors.
  window.dataLayer = window.dataLayer || [];

  function pushGtmEvent(eventName, extraData) {
    var payload = Object.assign({ event: eventName }, extraData || {});
    window.dataLayer.push(payload);
  }

  function bindGtmEvents() {
    var trackedEls = document.querySelectorAll("[data-gtm-event]");
    trackedEls.forEach(function (el) {
      el.addEventListener("click", function () {
        pushGtmEvent(el.getAttribute("data-gtm-event"), {
          element_text: el.textContent.trim(),
        });
      });
    });
  }

  function setFooterYear() {
    var yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  function handleContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      // NOTE: this is a placeholder. The form currently has no backend —
      // action="#" goes nowhere. Wire this up to your actual form handler
      // (Formspree, Netlify Forms, your own endpoint, etc.) before launch.
      // The data-gtm-event on the submit button already fires a tracking
      // event on click; this listener is separate and just prevents the
      // page from reloading until you've got a real submit handler in place.
      e.preventDefault();
      console.log("Contact form submitted (no backend wired up yet).");
    });
  }
  
function initBackToTop() {
  var btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
  function initGallery() {
    if (typeof GLightbox === "undefined") return;
    GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      closeButton: true,
      skin: "clean",
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setFooterYear();
    bindGtmEvents();
    handleContactForm();
    initGallery();
    initBackToTop();
  });
})();
