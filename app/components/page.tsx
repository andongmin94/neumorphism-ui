import type { Metadata } from "next";
import Link from "next/link";

import { InstallCommand } from "@/components/docs/install-command";
import { RegistryShowcase } from "@/components/docs/registry-showcase";

export const metadata: Metadata = {
  title: "컴포넌트",
  description:
    "Neumorphism UI의 설치 가능한 26개 컴포넌트를 미리 보고 프로젝트에 추가하세요.",
};

const componentGroups = [
  {
    label: "Actions & overlays",
    description: "행동을 시작하고 맥락을 유지하는 인터랙션",
    items: [
      {
        name: "button",
        title: "Button",
        description: "Raised, soft, ghost, destructive 상태를 갖는 촉각적인 버튼.",
      },
      {
        name: "dialog",
        title: "Dialog",
        description: "포커스 트랩과 Escape 닫기를 제공하는 접근 가능한 모달.",
      },
      {
        name: "dropdown-menu",
        title: "Dropdown Menu",
        description: "Checkbox, radio, submenu까지 포함하는 키보드 메뉴.",
      },
    ],
  },
  {
    label: "Forms & selection",
    description: "입력, 선택, 설정을 위한 뉴모피즘 폼 컨트롤",
    items: [
      {
        name: "input",
        title: "Input",
        description: "눌린 표면으로 입력 가능성을 전달하는 단일 행 필드.",
      },
      {
        name: "input-group",
        title: "Input Group",
        description: "Addon과 action을 한 표면에 조합하는 입력 그룹.",
      },
      {
        name: "textarea",
        title: "Textarea",
        description: "Focus와 validation 상태를 갖는 여러 줄 입력.",
      },
      {
        name: "label",
        title: "Label",
        description: "폼 컨트롤의 이름과 disabled 상태를 연결하는 레이블.",
      },
      {
        name: "checkbox",
        title: "Checkbox",
        description: "Boolean과 indeterminate 상태를 지원하는 체크박스.",
      },
      {
        name: "switch",
        title: "Switch",
        description: "켜짐과 꺼짐을 깊이와 이동으로 표현하는 스위치.",
      },
      {
        name: "radio-group",
        title: "Radio Group",
        description: "Controlled와 uncontrolled 사용을 모두 지원하는 선택 그룹.",
      },
      {
        name: "select",
        title: "Select",
        description: "브라우저 접근성을 유지하는 native select 표면.",
      },
      {
        name: "slider",
        title: "Slider",
        description: "shadcn식 배열 value API를 제공하는 범위 컨트롤.",
      },
    ],
  },
  {
    label: "Navigation & disclosure",
    description: "위치, 전환, 접힌 정보를 명확히 보여주는 구조",
    items: [
      {
        name: "accordion",
        title: "Accordion",
        description: "Single과 multiple 모드를 지원하는 disclosure group.",
      },
      {
        name: "breadcrumb",
        title: "Breadcrumb",
        description: "현재 페이지 의미를 포함한 경로 탐색.",
      },
      {
        name: "pagination",
        title: "Pagination",
        description: "활성 페이지가 선명한 raised 페이지 컨트롤.",
      },
      {
        name: "tabs",
        title: "Tabs",
        description: "키보드 탐색과 orientation을 지원하는 탭.",
      },
      {
        name: "tooltip",
        title: "Tooltip",
        description: "Hover와 keyboard focus에 짧은 맥락을 더하는 설명.",
      },
    ],
  },
  {
    label: "Data & feedback",
    description: "상태, 진행, 콘텐츠와 데이터를 표현하는 표면",
    items: [
      {
        name: "alert",
        title: "Alert",
        description: "Default, success, destructive 상태 메시지.",
      },
      {
        name: "avatar",
        title: "Avatar",
        description: "Fallback, badge, group을 제공하는 프로필 이미지.",
      },
      {
        name: "badge",
        title: "Badge",
        description: "상태와 분류를 작고 선명하게 보여주는 라벨.",
      },
      {
        name: "card",
        title: "Card",
        description: "Raised, flat, inset 깊이를 선택하는 조합형 표면.",
      },
      {
        name: "progress",
        title: "Progress",
        description: "정규화된 값을 표시하는 접근 가능한 진행 트랙.",
      },
      {
        name: "scroll-area",
        title: "Scroll Area",
        description: "테마에 맞춘 native scrollbar를 갖는 스크롤 영역.",
      },
      {
        name: "separator",
        title: "Separator",
        description: "수평과 수직 레이아웃을 나누는 의미 있는 구분선.",
      },
      {
        name: "skeleton",
        title: "Skeleton",
        description: "인셋 깊이로 로딩 중인 콘텐츠를 예고하는 placeholder.",
      },
      {
        name: "table",
        title: "Table",
        description: "Header, caption, selected row 상태를 갖는 반응형 표.",
      },
    ],
  },
] as const;

export default function ComponentsPage() {
  return (
    <div className="subpage">
      <section className="page-intro site-shell">
        <span className="section-index">REGISTRY / 26 COMPONENTS</span>
        <div className="page-intro-grid">
          <h1>설치 가능한<br />표면들.</h1>
          <div>
            <p>
              처음의 6개 primitive에서 멈추지 않고, 폼·탐색·오버레이·
              데이터 표시까지 실제 제품을 만들 수 있는 26개 세트로 확장했습니다.
            </p>
            <div className="page-meta">
              <span><strong>26</strong> components</span>
              <span><strong>4</strong> categories</span>
              <span><strong>A11y</strong> keyboard ready</span>
            </div>
          </div>
        </div>
      </section>

      <RegistryShowcase />

      <section
        id="component-index"
        className="component-index site-shell"
        aria-labelledby="component-index-title"
      >
        <div className="section-heading section-heading-compact">
          <div>
            <span className="section-index">ALL COMPONENTS</span>
            <h2 id="component-index-title">필요한 것만 골라서 설치하세요.</h2>
          </div>
          <p>
            모든 카드는 실제 Registry 항목과 연결됩니다. 복사 버튼은 해당
            컴포넌트의 CLI 명령을 그대로 복사합니다.
          </p>
        </div>

        <div className="component-groups">
          {componentGroups.map((group, groupIndex) => (
            <section className="component-group" key={group.label}>
              <header className="component-group-header">
                <div className="component-group-number">
                  {String(groupIndex + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3>{group.label}</h3>
                  <p>{group.description}</p>
                </div>
                <span>{group.items.length} items</span>
              </header>

              <div className="component-index-grid">
                {group.items.map((component) => (
                  <article className="component-index-card" key={component.name}>
                    <div>
                      <span className="component-file">{component.name}.tsx</span>
                      <h4>{component.title}</h4>
                      <p>{component.description}</p>
                    </div>
                    <InstallCommand compact name={component.name} />
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="catalog-note site-shell">
        <div className="note-index">NEXT</div>
        <div>
          <h2>다음 묶음은 조합형 컴포넌트입니다.</h2>
          <p>
            Popover, Sheet, Command, Calendar와 뉴모피즘 기반 완성형 블록을
            같은 Registry에 이어서 추가할 수 있습니다.
          </p>
        </div>
        <Link className="neu-button neu-button-quiet" href="/docs/installation">
          설치 문서 보기 <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
