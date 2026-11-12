// Copies the installer from a synkronus-quickstart checkout next to this folder,
// so the site always serves the same script as the official repository.
//
//   npm run sync-installer            copy from the checkout as it is
//   npm run sync-installer -- v1.0.0  copy from a tagged release (recommended for deploys)
//
// The address people paste (https://ode-server.nahati.online/install.sh) never changes;
// only the release it serves does.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const src = new URL('../../synkronus-quickstart/', import.meta.url);
if (!existsSync(new URL('get.sh', src))) { console.log('synkronus-quickstart not found next to this folder; keeping site/install.sh as is.'); process.exit(0); }
const ref = process.argv[2];
const read = (file) => ref
  ? execFileSync('git', ['-C', fileURLToPath(src), 'show', `${ref}:${file}`])
  : readFileSync(new URL(file, src));
writeFileSync(new URL('../site/install.sh', import.meta.url), read('get.sh'));
const ci = read('cloud-init.sh').toString('utf8')
  .replace('https://raw.githubusercontent.com/OpenDataEnsemble/synkronus-quickstart/main/get.sh', 'https://ode-server.nahati.online/install.sh');
writeFileSync(new URL('../site/cloud-init.sh', import.meta.url), ci);
console.log(`Installer copied from synkronus-quickstart${ref ? ` at ${ref}` : ''}.`);
