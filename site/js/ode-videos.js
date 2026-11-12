/* The tutorial videos, in order. One list for the tutorials page and the setup guide.
   key: where the video appears on the setup guide (data-yt="key"). */
var ODE_SERVER = 'https://ode-server.nahati.online';
var ODE_VIDEOS = [
  { key: 'overview', id: '7SwJ3xDD73w', title: 'Overview: get your own Synkronus server',
    summary: 'What a Synkronus server does, what you need, and the setup routes you can choose from.',
    link: { href: ODE_SERVER + '/', text: 'Open the setup guide' } },
  { key: 'q', id: 'oAW7oCOh2Hc', title: 'Try it, no domain needed',
    summary: 'On a laptop, an office PC or any server, get a free temporary https address in a few minutes. Good for trying things out.',
    cmd: 'curl -fsSL ' + ODE_SERVER + '/install.sh | sudo bash -s -- --quick-tunnel' },
  { key: 'c', id: 'o0_-FPkGGQU', title: 'Your own domain with a Cloudflare tunnel',
    summary: 'A permanent address on your own domain, with no open ports. Create a tunnel in Cloudflare, then run the line with your token and domain.',
    cmd: 'curl -fsSL ' + ODE_SERVER + '/install.sh | sudo bash -s -- --tunnel-token YOUR-TOKEN --domain data.yourorg.org',
    link: { href: ODE_SERVER + '/#route-c', text: 'Fill in your token on the guide' } },
  { key: 'a', id: '76YTOVyROFs', title: 'A server you already have (Option A)',
    summary: 'Open your server’s console, paste one line, and wait about five minutes. Add --domain if you have one.',
    cmd: 'curl -fsSL ' + ODE_SERVER + '/install.sh | sudo bash' },
  { key: 'b', id: 'JbpRw9dy6rY', title: 'No terminal needed (Option B)',
    summary: 'Paste a setup script once while creating the server at your provider. It installs itself the first time it starts.',
    link: { href: ODE_SERVER + '/#route-b', text: 'Make your setup script' } },
  { key: 'after', id: 'R13KiAbWJ7I', title: 'After setup: portal and phones',
    summary: 'Log in to the portal, create a user for your phones, upload your app bundle and sync the phones.',
    cmd: 'synkronus status',
    link: { href: 'https://ode-app.nahati.online/', text: 'Build or upload your app' } }
];

/* Click-to-load player: a thumbnail and a play button; the iframe is only added on click. */
function odeVideo(v) {
  var box = document.createElement('div');
  box.className = 'ode-yt';
  var b = document.createElement('button');
  b.type = 'button';
  b.setAttribute('aria-label', 'Play video: ' + v.title);
  var img = document.createElement('img');
  img.src = 'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg';
  img.alt = ''; img.loading = 'lazy';
  var play = document.createElement('span'); play.className = 'play';
  var cap = document.createElement('span'); cap.className = 'cap'; cap.textContent = v.title;
  b.appendChild(img); b.appendChild(play); b.appendChild(cap);
  b.addEventListener('click', function () {
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=1&rel=0';
    f.title = v.title;
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    box.innerHTML = '';
    box.appendChild(f);
  });
  box.appendChild(b);
  return box;
}

/* Fill every <div data-yt="key"> on the page. */
document.querySelectorAll('[data-yt]').forEach(function (el) {
  var v = ODE_VIDEOS.filter(function (x) { return x.key === el.getAttribute('data-yt'); })[0];
  if (v) el.appendChild(odeVideo(v));
});
