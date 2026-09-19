import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const publicRoot = path.join(projectRoot, "public");
const localeCases = [
  { locale: "ko", htmlLang: "ko", hrefLang: "ko" },
  { locale: "en", htmlLang: "en", hrefLang: "en" },
  { locale: "ja", htmlLang: "ja", hrefLang: "ja" },
  { locale: "zh", htmlLang: "zh-CN", hrefLang: "zh-CN" },
];
const localizedPageSuffixes = [
  "",
  "/components",
  "/components/button",
  "/docs/installation",
  "/customize",
];
const localizedSmokeMarkers = {
  ko: {
    "": "빠른 시작",
    "/components": "컴포넌트 검색...",
    "/components/button": "설치",
    "/docs/installation": "shadcn 초기화",
    "/customize": "테마 설정",
  },
  en: {
    "": "Quick start",
    "/components": "Search components...",
    "/components/button": "Installation",
    "/docs/installation": "Initialize shadcn",
    "/customize": "Theme settings",
  },
  ja: {
    "": "クイックスタート",
    "/components": "コンポーネントを検索...",
    "/components/button": "インストール",
    "/docs/installation": "shadcn を初期化",
    "/customize": "テーマ設定",
  },
  zh: {
    "": "快速开始",
    "/components": "搜索组件...",
    "/components/button": "安装",
    "/docs/installation": "初始化 shadcn",
    "/customize": "主题设置",
  },
};
const localizedButtonMarkers = {
  ko: ["네이티브 button", "변경 저장"],
  en: ["Uses a native button", "Save changes"],
  ja: ["native button を使用", "変更を保存"],
  zh: ["使用原生 button", "保存更改"],
};

function localizedPath(locale, suffix = "") {
  return `/${locale}${suffix}`;
}

function decodeHtmlAttribute(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'");
}

function elementAttributes(html, elementName) {
  const elementPattern = new RegExp(`<${elementName}\\b[^>]*>`, "gi");

  return [...html.matchAll(elementPattern)].map(([element]) =>
    Object.fromEntries(
      [...element.matchAll(/\s([:\w-]+)="([^"]*)"/g)].map(
        ([, name, value]) => [
          name.toLowerCase(),
          decodeHtmlAttribute(value),
        ],
      ),
    ),
  );
}

function assertHtmlLanguage(html, htmlLang) {
  const [htmlAttributes] = elementAttributes(html, "html");
  assert.equal(htmlAttributes?.lang, htmlLang);
}

function assertLocaleNavigation(html, suffix, currentLocale) {
  const languageLinks = elementAttributes(html, "a").filter(
    (attributes) => attributes.hreflang,
  );

  for (const target of localeCases) {
    const expectedHref = localizedPath(target.locale, suffix);
    const matchingLink = languageLinks.find(
      (attributes) =>
        attributes.hreflang === target.hrefLang &&
        attributes.href === expectedHref,
    );

    assert.ok(
      matchingLink,
      `missing ${target.hrefLang} language link to ${expectedHref}`,
    );

    if (target.locale === currentLocale) {
      assert.equal(matchingLink["aria-current"], "page");
    }
  }
}

function assertInternalLinksKeepLocale(html, currentLocale) {
  const currentLocaleRoot = localizedPath(currentLocale);
  const internalLinks = elementAttributes(html, "a").filter(
    (attributes) =>
      attributes.href?.startsWith("/") &&
      !attributes.href.startsWith("//") &&
      !attributes.hreflang,
  );

  for (const { href } of internalLinks) {
    const pathname = new URL(href, "http://localhost").pathname;
    const isNonLocalizedAsset =
      pathname === "/r/registry.json" ||
      pathname.startsWith("/r/") ||
      pathname.startsWith("/fonts/") ||
      pathname === "/og.png";

    assert.ok(
      isNonLocalizedAsset ||
        pathname === currentLocaleRoot ||
        pathname.startsWith(`${currentLocaleRoot}/`),
      `internal link ${href} dropped the ${currentLocale} locale`,
    );
  }
}

function assertLocalizedMetadata(html, suffix, currentLocale) {
  const metadataLinks = elementAttributes(html, "link");
  const canonical = metadataLinks.find(
    (attributes) => attributes.rel === "canonical",
  );

  assert.ok(canonical?.href, `missing canonical URL for ${currentLocale}${suffix}`);
  const canonicalUrl = new URL(canonical.href, "http://localhost");
  assert.equal(canonicalUrl.pathname, localizedPath(currentLocale, suffix));
  assert.equal(canonicalUrl.search, "");

  for (const target of localeCases) {
    const alternate = metadataLinks.find(
      (attributes) =>
        attributes.rel === "alternate" &&
        attributes.hreflang === target.hrefLang,
    );

    assert.ok(
      alternate?.href,
      `missing ${target.hrefLang} alternate URL for ${currentLocale}${suffix}`,
    );
    assert.equal(
      new URL(alternate.href, canonicalUrl).pathname,
      localizedPath(target.locale, suffix),
    );
  }

  const defaultAlternate = metadataLinks.find(
    (attributes) =>
      attributes.rel === "alternate" &&
      attributes.hreflang === "x-default",
  );
  assert.ok(
    defaultAlternate?.href,
    `missing x-default alternate URL for ${currentLocale}${suffix}`,
  );
  assert.equal(
    new URL(defaultAlternate.href, canonicalUrl).pathname,
    localizedPath("ko", suffix),
  );
}

async function assetResponse(request) {
  const pathname = new URL(request.url).pathname;
  const relativePath = pathname.replace(/^\/+/, "");
  const filePath = path.resolve(publicRoot, relativePath);

  if (!filePath.startsWith(`${publicRoot}${path.sep}`)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const body = await readFile(filePath);
    const contentType = filePath.endsWith(".json")
      ? "application/json; charset=utf-8"
      : "application/octet-stream";

    return new Response(body, {
      headers: { "content-type": contentType },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

async function render(pathname = "/", { headers = {} } = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: {
        accept: pathname.endsWith(".json") ? "application/json" : "text/html",
        ...headers,
      },
    }),
    {
      ASSETS: {
        fetch: assetResponse,
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders every representative page in all four locales", async () => {
  for (const { locale, htmlLang } of localeCases) {
    for (const suffix of localizedPageSuffixes) {
      const response = await render(localizedPath(locale, suffix));
      assert.equal(
        response.status,
        200,
        `${localizedPath(locale, suffix)} did not render`,
      );
      assert.match(
        response.headers.get("content-type") ?? "",
        /^text\/html\b/i,
      );

      const html = await response.text();
      assertHtmlLanguage(html, htmlLang);
      assert.ok(
        html.includes(localizedSmokeMarkers[locale][suffix]),
        `${localizedPath(locale, suffix)} did not render its localized copy`,
      );
      assertLocaleNavigation(html, suffix, locale);
      assertInternalLinksKeepLocale(html, locale);
      assertLocalizedMetadata(html, suffix, locale);

      if (suffix === "/components/button") {
        assert.match(html, /<h1>Button<\/h1>/);
        assert.match(html, /\/r\/button\.json/);
        assert.doesNotMatch(html, /\/(?:ko|en|ja|zh)\/r\/button\.json/);
        for (const marker of localizedButtonMarkers[locale]) {
          assert.ok(
            html.includes(marker),
            `${localizedPath(locale, suffix)} is missing localized component copy: ${marker}`,
          );
        }
      }

      if (suffix === "/docs/installation") {
        assert.match(html, /@neumorphism-ui/);
        assert.match(html, /\/r\/\{name\}\.json/);
        assert.doesNotMatch(
          html,
          /\/(?:ko|en|ja|zh)\/r\/\{name\}\.json/,
        );
      }
    }
  }
});

test("preserves a hyphenated component slug when switching language", async () => {
  const response = await render("/ja/components/input-group");
  assert.equal(response.status, 200);

  const html = await response.text();
  assertHtmlLanguage(html, "ja");
  assert.match(html, /<h1>Input Group<\/h1>/);
  assertLocaleNavigation(html, "/components/input-group", "ja");
  assertInternalLinksKeepLocale(html, "ja");
  assert.match(html, /\/r\/input-group\.json/);
  assert.doesNotMatch(html, /\/(?:ko|en|ja|zh)\/r\/input-group\.json/);
});

test("redirects legacy documentation URLs to the fixed Korean locale", async () => {
  for (const [legacyPath, expectedPath] of [
    ["/", "/ko"],
    ["/components", "/ko/components"],
    ["/components/button", "/ko/components/button"],
    ["/docs/installation", "/ko/docs/installation"],
    ["/customize", "/ko/customize"],
  ]) {
    const response = await render(legacyPath, {
      headers: { "accept-language": "en-US,en;q=0.9" },
    });

    assert.ok(
      response.status === 307 || response.status === 308,
      `${legacyPath} returned ${response.status} instead of a redirect`,
    );
    const location = response.headers.get("location");
    assert.ok(location, `${legacyPath} redirect is missing Location`);
    assert.equal(new URL(location, "http://localhost").pathname, expectedPath);
  }
});

test("server-renders the finished Neumorphism UI homepage", async () => {
  const response = await render("/ko");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Neumorphism UI<\/title>/i);
  assert.match(html, /shadcn의 Base UI 구성을 바탕으로/);
  assert.match(html, /필요한 컴포넌트만 소스 형태로/);
  assert.match(html, />빠른 시작</);
  assert.match(html, />설치하기</);
  assert.match(html, /class="brand-sigil"/);
  assert.match(html, /class="docs-site-sidebar"/);
  assert.match(html, /neumorphism-ui-style-v2/);
  assert.doesNotMatch(html, /표면에서 시작하는|READY TO BUILD|01 · SYSTEM/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("renders the component catalog and installation guide", async () => {
  const [componentsResponse, installationResponse] = await Promise.all([
    render("/ko/components"),
    render("/ko/docs/installation"),
  ]);

  assert.equal(componentsResponse.status, 200);
  assert.equal(installationResponse.status, 200);

  const [componentsHtml, installationHtml] = await Promise.all([
    componentsResponse.text(),
    installationResponse.text(),
  ]);

  for (const componentName of [
    "Accordion",
    "Alert",
    "Avatar",
    "Badge",
    "Breadcrumb",
    "Button",
    "Card",
    "Checkbox",
    "Dialog",
    "Dropdown Menu",
    "Input",
    "Input Group",
    "Label",
    "Pagination",
    "Progress",
    "Radio Group",
    "Scroll Area",
    "Select",
    "Separator",
    "Skeleton",
    "Slider",
    "Switch",
    "Table",
    "Tabs",
    "Textarea",
    "Tooltip",
  ]) {
    assert.match(componentsHtml, new RegExp(`>${componentName}<`));
  }
  assert.match(componentsHtml, /<h1>Components<\/h1>/);
  assert.match(componentsHtml, /컴포넌트 검색\.\.\./);
  assert.match(componentsHtml, /href="\/ko\/components\/button"/);
  assert.match(componentsHtml, />테마</);
  assert.match(componentsHtml, />예제</);
  assert.doesNotMatch(componentsHtml, /COMPONENT DIRECTORY|INSTALLABLE STYLES|LIVE EXAMPLES/);

  assert.match(installationHtml, /@neumorphism-ui/);
  assert.match(installationHtml, /components\.json/);
  assert.match(installationHtml, /shadcn@latest/);
  assert.match(installationHtml, /style-sage/);
  assert.match(installationHtml, /https:\/\/neumorphism-ui\.dev\/r\/\{name\}\.json/);
});

test("renders full per-component reference pages", async () => {
  for (const [slug, title] of [
    ["button", "Button"],
    ["dialog", "Dialog"],
    ["input-group", "Input Group"],
    ["table", "Table"],
  ]) {
    const response = await render(`/ko/components/${slug}`);
    assert.equal(response.status, 200);

    const html = await response.text();
    assert.match(html, new RegExp(`<h1>${title}</h1>`));
    assert.match(html, />미리보기</);
    assert.match(html, />설치</);
    assert.match(html, />CLI</);
    assert.match(html, />컴포넌트 소스</);
    assert.match(html, />사용법</);
    assert.match(html, />API 레퍼런스</);
    assert.match(html, />접근성</);
    assert.match(html, new RegExp(`/r/${slug}\\.json`));
    assert.match(html, /aria-current="location"/);
    assert.doesNotMatch(html, /01 \/ LIVE|02 \/ INSTALL|03 \/ USE/);
  }

  const sliderResponse = await render("/ko/components/slider");
  const sliderHtml = await sliderResponse.text();
  assert.match(sliderHtml, /aria-label="최저 가격"/);
  assert.match(sliderHtml, /aria-label="최고 가격"/);
  assert.match(sliderHtml, /aria-label="세로 음량"/);
});

test("renders the live Theme Studio and generated style outputs", async () => {
  const response = await render("/ko/customize");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<h1>Theme Studio<\/h1>/);
  assert.match(html, /<h2>테마 설정<\/h2>/);
  assert.match(html, /<legend>프리셋<\/legend>/);
  assert.match(html, /aria-pressed="true" class="is-active"[^>]*>[\s\S]*?<strong>Air<\/strong>/);
  assert.match(html, /<output>18<!-- -->px<\/output>/);
  assert.match(html, />부드러운<\/button>/);
  assert.match(html, />CSS<\/button>/);
  assert.match(html, />CLI<\/button>/);
  assert.match(html, />가격 알림</);
  assert.match(html, />NVDA</);
  assert.match(html, />알림 조건</);
  assert.match(html, /Neumorphism UI theme — Air/);
  assert.doesNotMatch(
    html,
    /Surface preview|Control states|Passive state|Semantic feedback color|Shape the light|THEME CONTROLS|TOKEN CONTRACT|blue action|green surface|beige surface|Workspace|Design system review|Invite teammate|Theme coverage/,
  );

  for (const preset of ["Air", "Lavender", "Sage", "Clay", "Graphite"]) {
    assert.match(html, new RegExp(`>${preset}<`));
  }
});

test("serves a complete shadcn registry catalog", async () => {
  const response = await render("/r/registry.json");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^application\/json\b/i);

  const registry = await response.json();
  assert.equal(registry.$schema, "https://ui.shadcn.com/schema/registry.json");
  assert.equal(registry.name, "neumorphism-ui");

  const expectedItems = [
    "neumorphism-ui",
    "utils",
    "button",
    "card",
    "input",
    "badge",
    "skeleton",
    "tooltip",
    "accordion",
    "alert",
    "avatar",
    "breadcrumb",
    "checkbox",
    "dialog",
    "dropdown-menu",
    "input-group",
    "label",
    "pagination",
    "progress",
    "radio-group",
    "scroll-area",
    "select",
    "separator",
    "slider",
    "switch",
    "table",
    "tabs",
    "textarea",
    "style-air",
    "style-lavender",
    "style-sage",
    "style-clay",
    "style-graphite",
    "alert-dialog",
    "popover",
    "hover-card",
    "sheet",
    "collapsible",
    "toggle",
    "toggle-group",
    "toolbar",
    "field",
    "fieldset",
    "form",
    "number-field",
    "meter",
    "combobox",
    "calendar",
    "date-picker",
    "data-table",
    "toast",
  ];
  assert.deepEqual(
    registry.items.map((item) => item.name),
    expectedItems,
  );

  for (const itemName of expectedItems) {
    const item = JSON.parse(
      await readFile(path.join(publicRoot, "r", `${itemName}.json`), "utf8"),
    );
    assert.equal(item.$schema, "https://ui.shadcn.com/schema/registry-item.json");
    assert.equal(item.name, itemName);
    assert.doesNotMatch(JSON.stringify(item), /radix-ui/);
  }

  const button = await readFile(path.join(publicRoot, "r", "button.json"), "utf8");
  assert.match(button, /--neu-shadow-raised-sm/);
  assert.match(button, /--neu-shadow-primary-inset/);
  assert.match(button, /src\/components\/ui\/button\.tsx/);
  assert.match(button, /@\/lib\/utils/);
  assert.doesNotMatch(button, /@\/registry\/src/);
  assert.doesNotMatch(button, /Upbit|Yahoo|Hyperliquid|watchlist/i);

  const utils = JSON.parse(
    await readFile(path.join(publicRoot, "r", "utils.json"), "utf8"),
  );
  assert.equal(utils.files[0].target, "@lib/utils.ts");
  assert.deepEqual(utils.dependencies, ["tailwind-merge"]);
  assert.match(utils.files[0].content, /twMerge/);

  for (const itemName of [
    "accordion",
    "avatar",
    "dialog",
    "dropdown-menu",
    "progress",
    "slider",
    "tabs",
    "tooltip",
  ]) {
    const item = JSON.parse(
      await readFile(path.join(publicRoot, "r", `${itemName}.json`), "utf8"),
    );
    assert.ok(item.dependencies.includes("@base-ui/react"));
    assert.ok(!item.dependencies.includes("radix-ui"));
  }

  const sageStyle = JSON.parse(
    await readFile(path.join(publicRoot, "r", "style-sage.json"), "utf8"),
  );
  assert.equal(sageStyle.type, "registry:style");
  assert.ok(
    !sageStyle.registryDependencies?.includes("@neumorphism-ui/neumorphism-ui"),
  );
  assert.equal(sageStyle.cssVars.light["neu-radius-control"], "12px");
  assert.match(sageStyle.cssVars.dark["neu-shadow-raised"], /-4px 4px 10px/);

  const baseStyle = JSON.parse(
    await readFile(path.join(publicRoot, "r", "neumorphism-ui.json"), "utf8"),
  );
  assert.deepEqual(baseStyle.dependencies, ["pretendard@1.3.9"]);
  assert.ok(!baseStyle.dependencies?.includes("radix-ui"));
  const airStyle = JSON.parse(
    await readFile(path.join(publicRoot, "r", "style-air.json"), "utf8"),
  );
  assert.equal(airStyle.cssVars.light["neu-radius-surface"], "18px");
  assert.equal(airStyle.cssVars.light["neu-radius-control"], "12px");
  assert.equal(airStyle.cssVars.light.background, "#e5ebf1");
  assert.equal(airStyle.cssVars.light["neu-surface"], "#e9eef4");
  assert.doesNotMatch(
    airStyle.cssVars.light["neu-shadow-raised"],
    /1px 1px 2px/,
  );
  assert.deepEqual(airStyle.cssVars.light, baseStyle.cssVars.light);
  assert.deepEqual(airStyle.cssVars.dark, baseStyle.cssVars.dark);
});

test("keeps registry JSON outside locale routing", async () => {
  const expectedButton = await readFile(
    path.join(publicRoot, "r", "button.json"),
    "utf8",
  );

  for (const language of ["ko-KR", "en-US", "ja-JP", "zh-CN"]) {
    const response = await render("/r/button.json", {
      headers: { "accept-language": language },
    });
    assert.equal(response.status, 200);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^application\/json\b/i,
    );
    assert.equal(await response.text(), expectedButton);
  }

  for (const { locale } of localeCases) {
    const response = await render(`/${locale}/r/button.json`);
    assert.equal(
      response.status,
      404,
      `registry item was incorrectly localized at /${locale}/r/button.json`,
    );
  }
});

test("removes every disposable starter artifact", async () => {
  const packageJson = await readFile(path.join(projectRoot, "package.json"), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton|site-creator-vinext-starter/);
  await assert.rejects(access(path.join(projectRoot, "app", "_sites-preview")));
});


test("renders every expanded component in all documentation locales", async () => {
  for (const {locale} of localeCases) for (const slug of ["alert-dialog","popover","hover-card","sheet","collapsible","toggle","toggle-group","toolbar","field","fieldset","form","number-field","meter","combobox"]) {
    const response = await render(`/${locale}/components/${slug}`);
    assert.equal(response.status, 200, `${locale}/${slug}`);
    const html = await response.text();
    assert.ok(html.includes(`/r/${slug}.json`));
    assert.ok(html.includes("data-slot="));
  }
});
