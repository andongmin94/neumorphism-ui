import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
const catalog=JSON.parse(readFileSync(new URL("../../../registry/catalog.json",import.meta.url),"utf8")) as {items:{name:string;type:string}[]};
const entries=catalog.items.filter(item=>item.type==="registry:ui");
for(const {name} of entries) test(`catalog detail: ${name}`,async({page},info)=>{
  const errors:string[]=[];page.on("pageerror",error=>errors.push(error.message));
  const response=await page.goto(`/en/components/${name}`);
  expect(response?.status()).toBe(200);
  const panel=page.locator(".component-example-panel").first();
  await expect(panel).toBeVisible();
  await page.evaluate(()=>document.fonts.ready);
  await panel.scrollIntoViewIfNeeded();
  await panel.screenshot({path:info.outputPath(`${name}.png`),animations:"disabled"});
  const geometry=await panel.evaluate(element=>{
    const rect=element.getBoundingClientRect();
    return {width:rect.width,height:rect.height,pageWidth:document.documentElement.scrollWidth,viewport:innerWidth,controls:Array.from(element.querySelectorAll("button,input,select,textarea,[role=slider]")).filter(e=>e.getBoundingClientRect().width>0).map(e=>{const r=e.getBoundingClientRect();return {slot:e.getAttribute("data-slot"),name:e.getAttribute("aria-label")??e.textContent?.slice(0,40),width:r.width,height:r.height};})};
  });
  await info.attach("geometry",{body:JSON.stringify(geometry,null,2),contentType:"application/json"});
  expect(geometry.pageWidth).toBeLessThanOrEqual(geometry.viewport+1);
  expect(errors).toEqual([]);
});
test("theme preview saves, pauses, removes and recreates a real local state",async({page},info)=>{
  await page.goto("/en/customize");const preview=page.locator("[data-theme-price-preview]");
  const input=preview.locator('input[type="number"]');const save=preview.getByRole("button",{name:"Save",exact:true});
  await expect(save).toBeDisabled();await input.fill("240");await save.click();
  await expect(preview.getByRole("status")).toContainText("$240.00");
  await expect(preview.getByRole("progressbar")).toHaveAttribute("aria-valuenow",/78/);
  const alert=preview.getByRole("status");const icon=await alert.locator(":scope > svg").boundingBox();const title=await alert.locator('[data-slot="alert-title"]').boundingBox();
  expect(icon!.x+icon!.width).toBeLessThanOrEqual(title!.x);
  await preview.getByRole("switch").uncheck();await expect(alert).toContainText("Alerts paused");
  await preview.getByRole("button",{name:"Delete alert",exact:true}).click();await expect(alert).toContainText("Alert removed");
  await input.fill("0");await save.click();await expect(input).toHaveAttribute("aria-invalid","true");await expect(input).toBeFocused();
  await input.fill("250");await save.click();await expect(input).not.toHaveAttribute("aria-invalid","true");await expect(alert).toContainText("$250.00");
  await expect(preview.getByRole("link",{name:/View chart/})).toHaveAttribute("href","/en/charts");
  await preview.screenshot({path:info.outputPath("theme-interaction.png")});
});
test("progress end cap inherits the real track radius",async({page})=>{
  await page.goto("/en/components/progress");const fill=page.locator('.component-example-panel [data-slot="progress-indicator"]').first();
  expect(await fill.evaluate(e=>parseFloat(getComputedStyle(e).borderTopRightRadius))).toBeGreaterThan(0);
});
test("single-line input families share a forty pixel outer control",async({page})=>{
  for(const [slug,slot] of [["input","input"],["select","select"],["input-group","input-group"],["number-field","number-field-group"]]){
    await page.goto(`/en/components/${slug}`);const control=page.locator(`.component-example-panel [data-slot="${slot}"]`).first();
    await expect(control).toBeVisible();expect((await control.boundingBox())!.height).toBe(40);
  }
});
