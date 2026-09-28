import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { getRegistryUrlTemplate } from '../../docs/components/docs/registry-config.ts';
import { getRequestOrigin } from '../../docs/components/docs/request-origin.ts';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const catalog=JSON.parse(read('../catalog.json'));
const entry=JSON.parse(read('../directory-entry.json'));
test('public installation and documentation share the configured canonical origin',async()=>{
  const origin='https://neumorphism-ui.andongmin.com';
  assert.equal(catalog.homepage,origin);
  assert.equal(entry.homepage,origin);
  assert.equal(entry.url,getRegistryUrlTemplate());
  assert.equal(getRegistryUrlTemplate(),origin+'/r/{name}.json');
  const previous=process.env.NEUMORPHISM_UI_ORIGIN;
  delete process.env.NEUMORPHISM_UI_ORIGIN;
  try {assert.equal(await getRequestOrigin(),origin);} finally {if(previous!==undefined)process.env.NEUMORPHISM_UI_ORIGIN=previous;}
  for(const filename of ['../../README.md','../../docs/press.config.tsx','../../docs/components/docs/registry-config.ts','../../docs/components/docs/request-origin.ts']){
    const source=read(filename);assert.ok(source.includes(origin),filename);assert.ok(!source.includes('https://neumorphism-ui.dev'),filename);
  }
});
