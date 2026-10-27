(function(){
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = { get(k,d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } }, set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} } };
const fmt = n => n.toLocaleString("ru-RU").replace(/\s/g," ") + " ₽";
const count = () => { const n = store.get("elki-cart", []).reduce((a,i) => a + (i.q||1), 0); document.querySelectorAll("[data-cnt]").forEach(e => e.textContent = n); };
count();
(function garland(){ const svg = document.getElementById("garl"); if (!svg) return;
  const draw = () => { const W = Math.max(600, innerWidth), N = Math.round(W/38); svg.setAttribute("viewBox", `0 0 ${W} 22`);
    let p = "M0 3"; for (let i=0;i<N;i++){ const x0=i*W/N, x1=(i+1)*W/N; p += ` Q ${(x0+x1)/2} 14 ${x1} 3`; }
    const cols = ["#F3C452","#FF6A2B","#F4F1E8","#D2362C","#7FD6A8"]; let b = "";
    for (let i=0;i<N;i++){ const x=(i+.5)*W/N, c=cols[i%5]; b += `<ellipse class="bulb" cx="${x}" cy="13" rx="3.6" ry="5.4" fill="${c}" style="filter:drop-shadow(0 0 3px ${c})"/>`; }
    svg.innerHTML = `<path d="${p}" stroke="#061510" stroke-width="1.6" fill="none"/>${b}`; };
  draw(); let t; addEventListener("resize", () => { clearTimeout(t); t = setTimeout(draw, 200); }); })();
(function snow(){ if (reduce) return; const cv = document.createElement("canvas"); cv.id = "snow"; cv.setAttribute("aria-hidden","true"); document.body.appendChild(cv);
  const ctx = cv.getContext("2d"); let W, H, f = [], d = Math.min(2, devicePixelRatio||1);
  const size = () => { W = cv.width = innerWidth*d; H = cv.height = innerHeight*d; f = Array.from({length: Math.round(innerWidth/16)}, () => ({x:Math.random()*W, y:Math.random()*H, r:(Math.random()*1.6+.5)*d, v:(Math.random()*.5+.2)*d, w:Math.random()*6})); };
  size(); addEventListener("resize", size);
  (function loop(){ ctx.clearRect(0,0,W,H); ctx.fillStyle = "rgba(244,241,232,.7)"; for (const k of f){ k.y += k.v; k.w += .01; k.x += Math.sin(k.w)*.3*d; if (k.y > H){ k.y = -4; k.x = Math.random()*W; } ctx.beginPath(); ctx.arc(k.x,k.y,k.r,0,7); ctx.fill(); } requestAnimationFrame(loop); })(); })();
document.querySelectorAll("[data-until]").forEach(el => { if (Date.now() >= new Date(el.dataset.until).getTime()) el.hidden = true; });
const box = document.getElementById("buy"); if (!box) return;
const id = box.dataset.id, sizes = JSON.parse(box.dataset.sizes);
let h = +box.dataset.def;
const price = document.getElementById("buyPrice"), add = document.getElementById("buyAdd"), go = document.getElementById("buyGo");
const sync = () => {
  box.querySelectorAll("[data-size]").forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.size === h)));
  price.textContent = fmt(sizes.find(z => z[0] === h)[1]);
  const inC = store.get("elki-cart", []).some(i => i.id === id && i.h === h);
  add.hidden = inC; go.hidden = !inC;
  document.querySelectorAll("[data-row]").forEach(r => r.classList.toggle("is-sel", +r.dataset.row === h));
};
box.querySelectorAll("[data-size]").forEach(b => b.addEventListener("click", () => { h = +b.dataset.size; sync(); }));
document.querySelectorAll("[data-row]").forEach(r => r.addEventListener("click", () => { h = +r.dataset.row; sync(); box.scrollIntoView({behavior: reduce ? "auto" : "smooth", block: "center"}); }));
add.addEventListener("click", () => { const c = store.get("elki-cart", []); if (!c.some(i => i.id === id && i.h === h)) c.push({id, h, q:1}); store.set("elki-cart", c); count(); sync();
  const n = document.querySelector("header [data-cnt]"); if (n && !reduce) n.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:420}); });
sync();
})();
