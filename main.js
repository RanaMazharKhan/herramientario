/* Herramientario — helpers compartidos */
(function(){
  "use strict";

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-item .faq-q").forEach(function(btn){
    btn.addEventListener("click", function(){
      var item = btn.closest(".faq-item");
      var wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function(i){ i.classList.remove("open"); });
      if(!wasOpen) item.classList.add("open");
    });
  });

  /* ---- Buscador de herramientas (portada) ---- */
  var searchInput = document.getElementById("tool-search");
  if(searchInput){
    searchInput.addEventListener("input", function(){
      var q = searchInput.value.trim().toLowerCase();
      document.querySelectorAll(".tool-card").forEach(function(card){
        var text = (card.textContent || "").toLowerCase();
        card.style.display = text.indexOf(q) !== -1 ? "" : "none";
      });
    });
  }

  /* ---- Helper: copiar al portapapeles ---- */
  window.copyText = function(text, msg){
    msg = msg || "¡Copiado al portapapeles!";
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){ flash(msg); }, function(){ fallback(); });
    } else { fallback(); }
    function fallback(){
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); flash(msg); } catch(e){ flash("No se pudo copiar automáticamente."); }
      document.body.removeChild(ta);
    }
  };

  /* ---- Helper: mensaje temporal (toast con estilo de marca) ---- */
  window.flash = function(msg){
    var el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    document.body.appendChild(el);
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ el.classList.add("show"); }); });
    setTimeout(function(){ el.classList.remove("show"); }, 1700);
    setTimeout(function(){ el.remove(); }, 2200);
  };

  /* ---- Helper: descargar texto/archivo ---- */
  window.downloadFile = function(name, content, mime){
    var blob = new Blob([content], {type: mime || "text/plain"});
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };

  /* ---- Año dinámico en el pie ---- */
  document.querySelectorAll("[data-year]").forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  /* ---- Tema claro / oscuro ---- */
  var themeBtn = document.getElementById("themeToggle");
  function syncTheme(){
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    if(themeBtn){
      themeBtn.setAttribute("aria-label", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      themeBtn.setAttribute("title", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    }
  }
  if(themeBtn){
    themeBtn.addEventListener("click", function(){
      var dark = document.documentElement.getAttribute("data-theme") === "dark";
      if(dark){
        document.documentElement.removeAttribute("data-theme");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
      }
      try { localStorage.setItem("hg-theme", dark ? "light" : "dark"); } catch(e){}
      syncTheme();
    });
  }
  syncTheme();

  /* ---- Scroll reveal (respeta prefers-reduced-motion) ---- */
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* Auto-reveal en páginas de herramientas y artículos */
  document.querySelectorAll("main .card, .article-cta").forEach(function(el){
    el.classList.add("reveal");
  });
  var revealEls = document.querySelectorAll(".reveal");
  if(revealEls.length){
    if(reducedMotion || !("IntersectionObserver" in window)){
      revealEls.forEach(function(el){ el.classList.add("visible"); });
    } else {
      var ro = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){ e.target.classList.add("visible"); ro.unobserve(e.target); }
        });
      }, {threshold: .12, rootMargin: "0px 0px -40px 0px"});
      revealEls.forEach(function(el){ ro.observe(el); });
    }
  }

  /* ---- Contadores animados del hero ---- */
  var counters = document.querySelectorAll("[data-count]");
  if(counters.length){
    var animateCount = function(el){
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      if(reducedMotion){ el.textContent = target + suffix; return; }
      var dur = 1200, start = null;
      var step = function(ts){
        if(!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if(p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if("IntersectionObserver" in window && !reducedMotion){
      var co = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){ animateCount(e.target); co.unobserve(e.target); }
        });
      }, {threshold: .4});
      counters.forEach(function(el){ co.observe(el); });
    } else {
      counters.forEach(animateCount);
    }
  }

  /* ---- Pop sutil cuando un resultado cambia ---- */
  if("MutationObserver" in window){
    document.querySelectorAll(".result-box").forEach(function(box){
      var mo = new MutationObserver(function(){
        box.classList.remove("pop");
        void box.offsetWidth;
        box.classList.add("pop");
      });
      mo.observe(box, {childList: true, subtree: true, characterData: true});
    });
  }

  /* ---- Menú móvil ---- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if(navToggle && mainNav){
    navToggle.addEventListener("click", function(){
      var open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    mainNav.addEventListener("click", function(e){
      if(e.target.tagName === "A"){
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menú");
      }
    });
  }
  /* ---- Vista previa de espacios publicitarios (?ads=preview) ---- */
  if(/[\?&]ads=preview/.test(location.search)){
    document.body.classList.add("show-ad-guides");
  }
})();
