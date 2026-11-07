(function(){
  var nav = document.querySelector('header nav[aria-label="Разделы сайта"]');
  if (!nav || document.getElementById("mnavBtn")) return;
  var bar = nav.parentElement;
  var hasCart = !!document.querySelector("[data-open-cart]");

  var btn = document.createElement("button");
  btn.type = "button"; btn.id = "mnavBtn"; btn.className = "mnav-btn";
  btn.setAttribute("aria-label", "Открыть меню"); btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "mnav");
  btn.innerHTML = '<span class="mnav-ico" aria-hidden="true"><i></i><i></i><i></i></span><span class="mnav-lbl">Меню</span>';
  bar.appendChild(btn);

  var panel = document.createElement("div");
  panel.id = "mnav"; panel.className = "mnav"; panel.hidden = true;
  var links = Array.prototype.map.call(nav.querySelectorAll("a"), function(a){
    return '<a href="' + a.getAttribute("href") + '">' + a.textContent.trim() + '<span aria-hidden="true">→</span></a>';
  }).join("");
  panel.innerHTML =
    '<nav class="mnav-list" aria-label="Меню">' + links + '</nav>' +
    '<div class="mnav-foot">' +
      '<a class="mnav-tel" href="tel:+79040791829"><b>8 904 079-18-29</b><small>ежедневно 11:00–20:00</small></a>' +
      '<div class="mnav-row">' +
        (hasCart ? '<button type="button" class="mnav-cart" data-open-cart>Корзина <span data-cnt>0</span></button>' : '') +
        '<a class="mnav-vk" href="https://vk.ru/elki_v_omske" target="_blank" rel="noopener">ВКонтакте</a>' +
      '</div>' +
      '<p class="mnav-addr">Омск, ул. Маршала Жукова, 70а/1 — территория Казачьего рынка</p>' +
    '</div>';
  bar.parentElement.appendChild(panel);

  try { var n = JSON.parse(localStorage.getItem("elki-cart") || "[]").reduce(function(s,i){ return s + (i.q||1); }, 0);
    panel.querySelectorAll("[data-cnt]").forEach(function(e){ e.textContent = n; }); } catch(e) {}

  function setOpen(o){
    panel.hidden = !o; btn.setAttribute("aria-expanded", o ? "true" : "false");
    btn.setAttribute("aria-label", o ? "Закрыть меню" : "Открыть меню");
    document.documentElement.classList.toggle("mnav-open", o);
  }
  btn.addEventListener("click", function(){ setOpen(panel.hidden); });
  panel.addEventListener("click", function(e){ if (e.target.closest("a, [data-open-cart]")) setOpen(false); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape" && !panel.hidden) { setOpen(false); btn.focus(); } });
  document.addEventListener("click", function(e){ if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) setOpen(false); });
  matchMedia("(min-width: 1280px)").addEventListener("change", function(m){ if (m.matches) setOpen(false); });
})();
