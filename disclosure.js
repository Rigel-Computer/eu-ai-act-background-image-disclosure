/*
 * disclosure.js
 * EU AI Act Art. 50 - KI-Kennzeichnung
 * Einbinden via <script src="js/disclosure.js"></script> vor </body>
 */

(function () {
   var KEY = "ai_bg_disclosed";

   var LABELS = {
      de: "Hintergrundbild mit KI erstellt",
      fr: "Image d'arriere-plan generee par IA",
      en: "Background image created with AI",
   };

   // Reload: sessionStorage überlebt F5, daher manuell löschen
   var nav = performance.getEntriesByType("navigation")[0];
   if (nav && nav.type === "reload") {
      sessionStorage.removeItem(KEY);
   }

   function getLang() {
      var l = (navigator.language || "en").toLowerCase().slice(0, 2);
      return LABELS[l] ? l : "en";
   }

   function show() {
      var el = document.getElementById("ai-disclosure");
      var txt = document.getElementById("ai-disclosure-text");
      var cls = document.getElementById("ai-disclosure-close");
      if (!el || !txt || !cls) return;

      txt.textContent = LABELS[getLang()];

      // Zwei RAF nötig: erstes setzt display:flex, zweites triggert Transition
      requestAnimationFrame(function () {
         el.classList.add("visible");
         requestAnimationFrame(function () {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
         });
      });

      cls.addEventListener("click", function () {
         el.classList.remove("visible");
      });

      sessionStorage.setItem(KEY, "1");
   }

   function hasAiBg() {
      var bg = window
         .getComputedStyle(document.body)
         .backgroundImage.toLowerCase();
      return bg && bg.includes("ai") && bg.includes("generated");
   }

   function init() {
      if (!hasAiBg()) return;
      if (!sessionStorage.getItem(KEY)) {
         show();
      }
   }

   if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
   } else {
      init();
   }
})();
