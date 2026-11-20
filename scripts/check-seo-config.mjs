import fs from 'node:fs';
import assert from 'node:assert/strict';
const config=JSON.parse(fs.readFileSync('vercel.json','utf8'));
const excluded=['flowersmilan.co','flowersmilan.it','flowersmilan.com','consegnah24.it'];
const rules=config.redirects;
assert.equal(rules.length,51);
assert(rules.every(r=>r.statusCode===301));
for(const name of excluded) assert(!rules.some(r=>new RegExp(r.has[0].value).test(name) || new RegExp(r.has[0].value).test('www.'+name)),`excluded domain ${name} would be redirected`);
const hostname=(name)=>rules.find(r=>new RegExp(r.has[0].value).test(name));
for (const [domain,language] of Object.entries({'flowermilan.it':'en','blumenmailand.it':'de','enviofloresmilan.es':'es','fleursmilan.it':'fr','dostavkamilan.it':'ru'})) {
  assert.equal(hostname(domain)?.destination,`https://consegnafiorimilano.it/${language}`);
  assert.equal(hostname('www.'+domain)?.destination,`https://consegnafiorimilano.it/${language}`);
}
assert.equal(hostname('www.consegnafiorimilano.it')?.destination,'https://consegnafiorimilano.it/:path*');
console.log('SEO config: 51 301 rules; 4 excluded domains safe; language routing OK.');
