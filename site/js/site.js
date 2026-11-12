(function () {
  'use strict';
  var BASE = location.origin.indexOf('http') === 0 && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1'
    ? location.origin : 'https://ode-server.nahati.online';
  var URL_SCRIPT = BASE + '/install.sh';
  var $ = function (id) { return document.getElementById(id); };

  // Keep typed values to what a shell command can safely hold.
  function cleanDomain(v) {
    return (v || '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/[^a-z0-9.-]/g, '');
  }
  function cleanToken(v) { return (v || '').trim().replace(/[^A-Za-z0-9_\-=.]/g, ''); }
  function cleanPass(v) { return (v || '').replace(/["\\$`]/g, ''); }

  function genPass() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    var a = new Uint32Array(20); crypto.getRandomValues(a);
    var out = ''; for (var i = 0; i < a.length; i++) out += chars[a[i] % chars.length];
    return out;
  }

  function render() {
    var dA = cleanDomain($('a-domain').value);
    $('cmd-a').textContent = 'curl -fsSL ' + URL_SCRIPT + ' | sudo bash' + (dA ? ' -s -- --domain ' + dA : '');

    var pB = cleanPass($('b-pass').value) || 'change-me-to-a-long-password';
    var dB = cleanDomain($('b-domain').value);
    $('cmd-b').textContent =
      '#!/bin/bash\n' +
      'export SYNK_ADMIN_PASSWORD="' + pB + '"\n' +
      'export SYNK_DOMAIN="' + dB + '"\n' +
      'curl -fsSL ' + URL_SCRIPT + ' | bash -s -- --yes > /var/log/synkronus-install.log 2>&1';
    $('b-url').textContent = dB ? 'https://' + dB : 'https://YOUR-SERVER-IP.sslip.io';

    var t = cleanToken($('c-token').value) || 'PASTE-YOUR-TOKEN';
    var dC = cleanDomain($('c-domain').value) || 'data.yourorg.org';
    $('cmd-c').textContent = 'curl -fsSL ' + URL_SCRIPT + ' | sudo bash -s -- --tunnel-token ' + t + ' --domain ' + dC;
    $('c-host').textContent = dC;
    $('cmd-q').textContent = 'curl -fsSL ' + URL_SCRIPT + ' | sudo bash -s -- --quick-tunnel';
  }

  ['a-domain', 'b-pass', 'b-domain', 'c-token', 'c-domain'].forEach(function (id) { $(id).addEventListener('input', render); });
  $('b-gen').addEventListener('click', function () { $('b-pass').value = genPass(); render(); });
  $('b-pass').value = genPass();

  // Copy buttons
  document.querySelectorAll('.copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = $(btn.getAttribute('data-copy')).textContent;
      var done = function () { btn.textContent = 'Copied'; btn.classList.add('done'); setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('done'); }, 1800); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
      function fallback() {
        var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) {} document.body.removeChild(ta);
      }
    });
  });

  // Tabs (keyboard: arrows, Home, End)
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role=tab]'));
  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      $(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
    try { history.replaceState(null, '', '#' + tab.getAttribute('aria-controls')); } catch (e) {}
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t, false); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') n = tabs[0];
      if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); select(n, true); }
    });
  });
  var m = /^#route-([abc])$/.exec(location.hash);
  if (m) select($('tab-' + m[1]), false);

  render();
})();
