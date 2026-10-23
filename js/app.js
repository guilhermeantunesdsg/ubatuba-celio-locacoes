(function () {
  var S = window.SITE, A = window.ACOMODACOES;
  var grid = document.getElementById("grid");
  var state = { tipo: "todos", pessoas: 0 };

  function waLink(msg) { return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(msg); }
  function nome(a) { return a.nome + (a.variante ? " (" + a.variante + ")" : ""); }
  function waMsg(a) {
    return "Olá! Vim pelo site e tenho interesse na acomodação *" + nome(a) + "* (até " + a.pessoas +
      " pessoas) em Ubatuba. Gostaria de saber sobre disponibilidade e valores para as datas: ";
  }
  function foto(a, i) { return "img/" + a.slug + "/" + String(i).padStart(2, "0") + ".jpg"; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var WA = '<svg class="ico" viewBox="0 0 24 24"><use href="#i-wa"/></svg>';

  function card(a, idx, k) {
    var title = esc(a.nome) + (a.variante ? ' <small>' + esc(a.variante) + '</small>' : "");
    var media = a.fotos
      ? '<button class="card__media" data-open="' + idx + '" aria-label="Ver fotos de ' + esc(nome(a)) + '">' +
        '<img loading="lazy" src="' + foto(a, a.capa[0] || 1) + '" alt="' + esc(nome(a)) + ' – ' + esc(a.destaque) + '">' +
        '<span class="card__photos">Ver ' + a.fotos + ' fotos</span></button>'
      : '<div class="card__media card__media--empty"><span>Fotos em breve</span></div>';
    var tags = a.extras.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    return '<article class="card" style="--i:' + Math.min(k || 0, 8) + '">' + media +
      '<div class="card__body">' +
        '<span class="badge badge--' + a.tipo + '">' + esc(a.destaque) + '</span>' +
        '<h3>' + title + '</h3>' +
        '<p class="card__loc">' + esc(a.local) + ' · Ubatuba/SP</p>' +
        '<ul class="specs"><li><b>' + esc(a.quartos) + '</b></li><li>Até <b>' + a.pessoas + '</b> pessoas</li></ul>' +
        (tags ? '<ul class="tags">' + tags + '</ul>' : "") +
        '<a class="btn btn--wa btn--lg btn--block" target="_blank" rel="noopener" href="' + waLink(waMsg(a)) + '">' + WA + ' Reservar pelo WhatsApp</a>' +
      '</div></article>';
  }

  function render() {
    var list = A.filter(function (a) {
      return (state.tipo === "todos" || a.tipo === state.tipo) && a.pessoas >= state.pessoas;
    });
    if (state.pessoas) list = list.slice().sort(function (x, y) { return x.pessoas - y.pessoas; });
    grid.innerHTML = list.map(function (a, k) { return card(a, A.indexOf(a), k); }).join("");
    document.getElementById("empty").hidden = list.length > 0;
    var c = document.getElementById("count"), n = list.length;
    c.textContent = state.pessoas
      ? n + (n === 1 ? " acomodação comporta " : " acomodações comportam ") + state.pessoas + " pessoas ou mais"
      : n + (n === 1 ? " acomodação" : " acomodações");
  }

  document.getElementById("filters").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    state.tipo = b.dataset.tipo;
    [].forEach.call(this.querySelectorAll(".chip"), function (c) { c.classList.toggle("is-on", c === b); });
    render();
  });
  document.getElementById("pessoas").addEventListener("change", function () { state.pessoas = +this.value; render(); });

  [].forEach.call(document.querySelectorAll("[data-wa]"), function (el) {
    el.href = waLink(el.dataset.wa); el.target = "_blank"; el.rel = "noopener";
  });

  function setLink(id, href, txt, ext) { var e = document.getElementById(id); e.href = href; e.textContent = txt; if (ext) { e.target = "_blank"; e.rel = "noopener"; } }
  setLink("c-wa1", "https://wa.me/" + S.whatsapp, S.whatsappLabel, true);
  setLink("c-wa2", "https://wa.me/" + S.whatsapp2, S.whatsapp2Label, true);
  setLink("c-tel", "tel:+55" + S.telefone.replace(/\D/g, ""), S.telefone);
  setLink("c-mail", "mailto:" + S.email, S.email);
  setLink("c-ig", "https://instagram.com/" + S.instagram, "@" + S.instagram, true);
  document.getElementById("ano").textContent = new Date().getFullYear();

  var burger = document.getElementById("burger"), nav = document.getElementById("nav");
  burger.addEventListener("click", function () { var on = nav.classList.toggle("is-open"); burger.setAttribute("aria-expanded", on); });
  nav.addEventListener("click", function () { nav.classList.remove("is-open"); burger.setAttribute("aria-expanded", false); });

  // Galeria
  var lb = document.getElementById("lb"), lbImg = document.getElementById("lbImg"), lbCap = document.getElementById("lbCap"),
      lbWa = document.getElementById("lbWa"), cur = null, n = 1;
  function show() { lbImg.src = foto(cur, n); lbImg.alt = nome(cur); lbCap.textContent = nome(cur) + " — foto " + n + " de " + cur.fotos; }
  function open(i) {
    cur = A[i]; n = 1; lbWa.href = waLink(waMsg(cur)); lbWa.target = "_blank"; lbWa.rel = "noopener";
    lb.hidden = false; document.body.classList.add("noscroll"); if (lenis) lenis.stop(); show();
  }
  function step(d) { n = ((n - 1 + d + cur.fotos) % cur.fotos) + 1; show(); }
  function close() { lb.hidden = true; document.body.classList.remove("noscroll"); if (lenis) lenis.start(); lbImg.removeAttribute("src"); }
  grid.addEventListener("click", function (e) { var b = e.target.closest("[data-open]"); if (b) open(+b.dataset.open); });
  document.getElementById("lbX").onclick = close;
  document.getElementById("lbP").onclick = function () { step(-1); };
  document.getElementById("lbN").onclick = function () { step(1); };
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") step(-1); else if (e.key === "ArrowRight") step(1);
  });
  var tx = 0;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) { var dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); });

  render();

  // Rolagem suave com o mouse (Lenis); só roda se a biblioteca carregou
  var lenis = null;
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.Lenis && !reduced) {
    try {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
      document.addEventListener("click", function (e) {
        var a = e.target.closest('a[href^="#"]'); if (!a) return;
        var id = a.getAttribute("href"); if (id.length < 2) return;
        var el = document.querySelector(id); if (!el) return;
        e.preventDefault(); lenis.scrollTo(el, { offset: -100, duration: 1.2 });
      });
    } catch (err) { lenis = null; }
  }

  // Depoimentos
  var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>';
  var qs = document.getElementById("quotes");
  if (qs && window.DEPOIMENTOS) {
    qs.innerHTML = window.DEPOIMENTOS.map(function (d) {
      return '<figure class="quote">' + (d.exemplo ? '<span class="quote__ex">Exemplo</span>' : "") +
        '<div class="stars" role="img" aria-label="5 de 5 estrelas">' + STAR + STAR + STAR + STAR + STAR + '</div>' +
        '<p>' + esc(d.texto) + '</p>' +
        '<footer><span class="quote__av">' + esc(d.nome.charAt(0)) + '</span><span class="quote__who"><strong>' + esc(d.nome) + '</strong><span>' + esc(d.cidade) + ' · ficou na ' + esc(d.casa) + '</span></span></footer></figure>';
    }).join("");
  }

  // Header encolhe ao rolar
  var top = document.getElementById("topo");
  function onScroll() { top.classList.toggle("is-small", window.scrollY > 60); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Números da faixa laranja: contam de 0 até o valor quando a faixa aparece na tela.
  // O gatilho usa scroll + verificação periódica (não depende só do IntersectionObserver)
  // e a contagem usa setInterval com relógio, então funciona mesmo se o navegador pausar o requestAnimationFrame.
  var counters = document.querySelectorAll("[data-to]");
  var band = document.querySelector(".numbers"), live = false, runId = 0, timers = [];
  function finalText(el) { return el.dataset.final || el.dataset.to; }
  function runCount(el, id) {
    var to = +el.dataset.to, dur = to >= 1000 ? 2600 : 2000, t0 = Date.now();
    var iv = setInterval(function () {
      if (id !== runId) { clearInterval(iv); return; }
      var p = Math.min((Date.now() - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      if (p < 1) el.textContent = Math.round(to * e).toLocaleString("pt-BR");
      else { el.textContent = finalText(el); clearInterval(iv); }
    }, 32);
    timers.push(iv);
  }
  function startBand() {
    if (live) return; live = true; var id = ++runId;
    band.classList.add("is-live");
    [].forEach.call(counters, function (el, i) { setTimeout(function () { if (id === runId) runCount(el, id); }, i * 200); });
  }
  function resetBand() {
    if (!live) return; live = false; runId++;
    timers.forEach(clearInterval); timers = [];
    band.classList.remove("is-live");
    [].forEach.call(counters, function (el) { el.textContent = "0"; });
  }
  if (band && counters.length) {
    [].forEach.call(counters, function (el) { el.textContent = "0"; });
    var pending = false;
    function checkBand() {
      var r = band.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
      var seen = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      if (r.height > 0 && seen >= Math.min(r.height, vh) * 0.3) {
        if (live || pending) return;
        var wait = 2000 - performance.now(); // já à vista ao abrir: espera o topo terminar de entrar
        if (wait > 0) { pending = true; setTimeout(function () { pending = false; checkBand(); }, wait); }
        else startBand();
      } else if (seen <= 0) resetBand();
    }
    window.addEventListener("scroll", checkBand, { passive: true });
    window.addEventListener("resize", checkBand);
    setInterval(checkBand, 300);
    if ("IntersectionObserver" in window) new IntersectionObserver(checkBand, { threshold: [0, 0.3] }).observe(band);
    checkBand();
  }

  // Revelar seções ao rolar (com fallback para tudo visível)
  var targets = document.querySelectorAll(".sec__head, .filters, .steps li, .about > *, .contact > *, .num, .quote");
  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("rv-on");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    [].forEach.call(targets, function (el, i) { el.classList.add("rv"); el.style.setProperty("--d", (el.matches(".steps li, .num, .quote") ? ([].indexOf.call(el.parentNode.children, el) * 120) : 0) + "ms"); io.observe(el); });
    setTimeout(function () { [].forEach.call(targets, function (el) { el.classList.add("in"); }); }, 3500);
  }
})();
