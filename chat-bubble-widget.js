/*! YM Chat Bubble (compact) */
(function () {
  var d = document;
  var s = d.currentScript || (function () {
    var a = d.getElementsByTagName('script');
    return a[a.length - 1];
  })();

  var ds = s.dataset || {};
  var CHAT_URL = (ds.url || '').trim();           // REQUIRED: URL to your chat page (chat.html)
  var POS      = (ds.position || 'right').toLowerCase(); // left | right
  var COLOR    = ds.color || '#2563eb';
  var WIDTH    = parseInt(ds.width  || '420', 10);
  var HEIGHT   = parseInt(ds.height || '600', 10);
  var TITLE    = ds.title || 'Chat';

  if (!CHAT_URL) { console.error('[YMChat] data-url is required'); return; }

  // build UI
  var bubble = d.createElement('button');
  bubble.type = 'button';
  bubble.setAttribute('aria-label','Open chat');
  bubble.style.cssText =
    'position:fixed;'+(POS==='left'?'left:16px;':'right:16px;')+
    'bottom:16px;width:56px;height:56px;border-radius:999px;border:none;'+
    'background:'+COLOR+';color:#fff;cursor:pointer;z-index:2147483647;'+
    'display:grid;place-items:center;box-shadow:0 10px 30px rgba(0,0,0,.25);';
  bubble.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10z"/></svg>';

  var panel = d.createElement('div');
  panel.setAttribute('role','dialog');
  panel.style.cssText =
    'position:fixed;'+(POS==='left'?'left:16px;':'right:16px;')+
    'bottom:84px;width:'+WIDTH+'px;height:'+HEIGHT+'px;display:none;'+
    'background:#fff;border-radius:16px;overflow:hidden;'+
    'box-shadow:0 30px 80px rgba(0,0,0,.35);z-index:2147483647;';

  var iframe = d.createElement('iframe');
  iframe.src = CHAT_URL;
  iframe.title = TITLE;
  iframe.allow = 'camera; microphone;';
  iframe.style.cssText = 'border:0;width:100%;height:100%;background:#fff;';
  panel.appendChild(iframe);

  var close = d.createElement('button');
  close.type = 'button';
  close.setAttribute('aria-label','Close chat');
  close.textContent = '×';
  close.style.cssText =
    'position:absolute;top:8px;right:8px;width:32px;height:32px;border:none;'+
    'background:#fff;border-radius:999px;box-shadow:0 6px 18px rgba(0,0,0,.15);cursor:pointer;';
  panel.appendChild(close);

  function toggle(open) { panel.style.display = open ? 'block' : 'none'; }
  bubble.addEventListener('click', function(){ toggle(true); });
  close.addEventListener('click', function(){ toggle(false); });
  d.addEventListener('keydown', function(e){ if (e.key === 'Escape') toggle(false); });

  d.body.appendChild(bubble);
  d.body.appendChild(panel);

  // tiny API
  window.YMChat = {
    open:  function(){ toggle(true);  },
    close: function(){ toggle(false); },
    toggle:function(){ toggle(panel.style.display === 'none'); },
    setUrl:function(u){ iframe.src = u; }
  };
})();
