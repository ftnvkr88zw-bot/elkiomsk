/* Яндекс.Метрика — счётчик 113831130 + цели */
(function(){
if (window.__elkiYM) return; window.__elkiYM = 1;
var ID = 113831130;
(function(m,e,t,r,i,k,a){
m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=113831130', 'ym');
ym(ID, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});

function goal(name){ try { ym(ID, 'reachGoal', name); } catch(e){} }

/* переход на Яндекс Карты */
document.addEventListener('click', function(e){
  var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
  if (!a) return;
  var h = a.getAttribute('href') || '';
  if (/yandex\.[a-z]+\/maps|maps\.yandex/i.test(h)) goal('map_click');
}, true);

/* заявка: появился экран «Заявка принята» / «Осталось отправить» */
var leadAt = 0;
function checkLead(node){
  var t = node && node.textContent || '';
  if (/Заявка принята|Осталось отправить/.test(t) && Date.now() - leadAt > 5000){ leadAt = Date.now(); goal('lead_sent'); }
}

/* квиз: показан результат */
var quizDone = false;
function wrapQuiz(){
  if (typeof window.renderQuiz === 'function' && !window.renderQuiz.__ym){
    var orig = window.renderQuiz;
    window.renderQuiz = function(){
      var r = orig.apply(this, arguments);
      try { if (!quizDone && typeof qs !== 'undefined' && typeof QUIZ !== 'undefined' && qs.i >= QUIZ.length){ quizDone = true; goal('quiz_done'); } } catch(e){}
      return r;
    };
    window.renderQuiz.__ym = 1;
  }
}

function start(){
  wrapQuiz();
  if (window.MutationObserver){
    new MutationObserver(function(list){
      for (var i = 0; i < list.length; i++){
        var add = list[i].addedNodes;
        for (var j = 0; j < add.length; j++) if (add[j].nodeType === 1) checkLead(add[j]);
      }
    }).observe(document.body, {childList:true, subtree:true});
  }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
