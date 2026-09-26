import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { isDeepStrictEqual } from 'node:util';
const origin='https://neumorphism-ui.dev';
const report={origin,checkedAt:new Date().toISOString(),commit:process.env.GITHUB_SHA??null,status:'unreachable',routes:[],items:[]};
const output=new URL('../test-results/deployment.json',import.meta.url);
async function get(path){const response=await fetch(origin+path,{signal:AbortSignal.timeout(15000)});if(!response.ok)throw new Error(`${path}: HTTP ${response.status}`);return response;}
try{
  for(const path of ['/en','/en/components/button','/en/customize']){const response=await get(path);if(!response.headers.get('content-type')?.includes('text/html'))throw new Error(`${path}: not HTML`);report.routes.push({path,status:response.status});}
  const catalog=JSON.parse(readFileSync(new URL('../../registry/catalog.json',import.meta.url),'utf8'));
  for(const item of catalog.items){const path=`/r/${item.name}.json`;const remote=await(await get(path)).json();const local=JSON.parse(readFileSync(new URL(`../public${path}`,import.meta.url),'utf8'));report.items.push({name:item.name,matches:isDeepStrictEqual(remote,local)});}
  report.status=report.items.every(item=>item.matches)?'verified':'mismatch';
}catch(error){report.error=error.message;report.cause=error.cause?.code??null;}
mkdirSync(new URL('../test-results/',import.meta.url),{recursive:true});writeFileSync(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));if(report.status!=='verified')process.exitCode=1;
