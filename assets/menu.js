(function(){
  var nav = document.querySelector('header nav[aria-label="Разделы сайта"]');
  if (!nav || document.getElementById("mnavBtn")) return;
  if (!document.getElementById("mnavCss")) { var st=document.createElement("style"); st.id="mnavCss"; st.textContent=".mnav-btn{display:inline-flex;align-items:center;gap:8px;flex-shrink:0;margin-left:12px;padding:9px 14px;border-radius:999px;border:1px solid rgb(var(--hair));background:rgb(var(--paper));color:rgb(var(--ink));font-size:14px;font-weight:600;cursor:pointer;transition:border-color .2s,background .2s}\n.mnav-btn:hover{border-color:rgb(var(--gold))}\n.mnav-btn:focus-visible,.mnav a:focus-visible,.mnav button:focus-visible{outline:2px solid rgb(var(--gold));outline-offset:2px}\n.mnav-ico{position:relative;display:block;width:18px;height:12px}\n.mnav-ico i{position:absolute;left:0;right:0;height:2px;border-radius:2px;background:currentColor;transition:transform .25s,opacity .2s}\n.mnav-ico i:nth-child(1){top:0}.mnav-ico i:nth-child(2){top:5px}.mnav-ico i:nth-child(3){top:10px}\n.mnav-btn[aria-expanded=\"true\"] .mnav-ico i:nth-child(1){transform:translateY(5px) rotate(45deg)}\n.mnav-btn[aria-expanded=\"true\"] .mnav-ico i:nth-child(2){opacity:0}\n.mnav-btn[aria-expanded=\"true\"] .mnav-ico i:nth-child(3){transform:translateY(-5px) rotate(-45deg)}\n.mnav{position:absolute;left:0;right:0;top:100%;max-height:calc(100dvh - 80px);overflow-y:auto;background:rgb(var(--snow));border-bottom:1px solid rgb(var(--hair));box-shadow:0 24px 48px rgba(0,0,0,.35);padding:8px max(16px,env(safe-area-inset-left,0px)) 20px;animation:mnavIn .22s ease-out}\n.mnav[hidden]{display:none}\n@keyframes mnavIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}\n.mnav-list{display:grid;max-width:1320px;margin:0 auto}\n.mnav-list a{display:flex;justify-content:space-between;align-items:center;padding:15px 4px;border-bottom:1px solid rgb(var(--hair));font-size:18px;font-weight:600;color:rgb(var(--ink))}\n.mnav-list a span{color:rgb(var(--tang));transition:transform .2s}\n.mnav-list a:hover span{transform:translateX(4px)}\n.mnav-list a::after{display:none}\n.mnav-foot{max-width:1320px;margin:16px auto 0;display:grid;gap:12px}\n.mnav-tel{display:flex;flex-direction:column;gap:2px;color:rgb(var(--ink))}\n.mnav-tel b{font-family:ui-monospace,monospace;font-size:20px;font-weight:600}\n.mnav-tel small{font-size:13px;color:rgb(var(--mute))}\n.mnav-row{display:flex;gap:10px;flex-wrap:wrap}\n.mnav-cart,.mnav-vk{display:inline-flex;align-items:center;gap:8px;padding:11px 18px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer}\n.mnav-cart{background:rgb(var(--tang));color:#fff;border:0}\n.mnav-cart span{display:inline-grid;place-items:center;min-width:22px;height:22px;padding:0 6px;border-radius:999px;background:rgba(255,255,255,.22);font-size:12px}\n.mnav-vk{border:1px solid rgb(var(--hair));color:rgb(var(--ink))}\n.mnav-addr{font-size:13px;color:rgb(var(--mute))}\nhtml.mnav-open{overflow:hidden}\n@media (min-width:1280px){.mnav-btn,.mnav{display:none!important}}\n@media (max-width:420px){.mnav-lbl{display:none}.mnav-btn{padding:10px 12px}}"; document.head.appendChild(st); }
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
