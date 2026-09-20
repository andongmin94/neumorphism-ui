export const componentDocCategories = [
  {
    id: "actions-overlays",
    label: "Actions & overlays",
    description: "행동을 시작하고 맥락을 유지하는 인터랙션",
  },
  {
    id: "forms-selection",
    label: "Forms & selection",
    description: "입력, 선택, 설정을 위한 뉴모피즘 폼 컨트롤",
  },
  {
    id: "navigation-disclosure",
    label: "Navigation & disclosure",
    description: "위치, 전환, 접힌 정보를 명확히 보여주는 구조",
  },
  {
    id: "data-feedback",
    label: "Data & feedback",
    description: "상태, 진행, 콘텐츠와 데이터를 표현하는 표면",
  },
] as const;

export type ComponentDocCategory =
  (typeof componentDocCategories)[number]["id"];

export type ComponentApiRow = {
  component: string;
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
};

export type ComponentDoc = {
  slug: string;
  title: string;
  category: ComponentDocCategory;
  summary: string;
  description: string;
  importCode: string;
  usageCode: string;
  props: readonly ComponentApiRow[];
  accessibility: readonly string[];
};

export const componentDocs = [
  {
    slug: "accordion",
    title: "Accordion",
    category: "navigation-disclosure",
    summary: "여러 섹션을 한 번에 하나씩 또는 동시에 펼치는 disclosure group.",
    description:
      "Base UI Accordion의 상태 관리와 접근성 연결을 유지하면서 열린 항목을 inset 표면으로 표현합니다. multiple 옵션과 controlled·uncontrolled 사용을 모두 지원합니다.",
    importCode: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"`,
    usageCode: `<Accordion defaultValue={["shipping"]}>
  <AccordionItem value="shipping">
    <AccordionTrigger>배송은 얼마나 걸리나요?</AccordionTrigger>
    <AccordionContent>
      주문 후 영업일 기준 2–3일 안에 발송됩니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionTrigger>반품할 수 있나요?</AccordionTrigger>
    <AccordionContent>
      수령 후 14일 이내에 반품을 신청할 수 있습니다.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    props: [
      {
        component: "Accordion",
        name: "multiple",
        type: "boolean",
        defaultValue: "false",
        description: "여러 항목을 동시에 펼칠 수 있게 합니다.",
      },
      {
        component: "Accordion",
        name: "value / defaultValue",
        type: "string[]",
        description: "열린 항목의 controlled 또는 초기 uncontrolled 값입니다.",
      },
      {
        component: "Accordion",
        name: "onValueChange",
        type: "(value) => void",
        description: "열린 항목이 바뀔 때 호출됩니다.",
      },
      {
        component: "AccordionItem",
        name: "value",
        type: "string",
        required: true,
        description: "항목을 식별하는 고유 값입니다.",
      },
      {
        component: "AccordionItem",
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "항목의 trigger를 비활성화합니다.",
      },
      {
        component: "AccordionContent",
        name: "keepMounted",
        type: "boolean",
        defaultValue: "false",
        description: "닫힌 상태에도 패널을 DOM에 유지합니다.",
      },
    ],
    accessibility: [
      "Base UI가 trigger와 panel의 aria-expanded, aria-controls 연결을 관리합니다.",
      "Tab으로 trigger에 접근하고 Enter 또는 Space로 항목을 열고 닫습니다.",
      "AccordionTrigger는 실제 버튼이므로 제목 안에 별도의 중첩 버튼을 넣지 않습니다.",
    ],
  },
  {
    slug: "alert",
    title: "Alert",
    category: "data-feedback",
    summary: "중요한 상태와 결과를 raised 표면으로 전달하는 메시지.",
    description:
      "아이콘, 제목, 설명을 정렬하는 조합형 Alert입니다. default, success, destructive 변형이 있으며 모든 변형이 색상 외에 테두리와 텍스트 대비를 함께 사용합니다.",
    importCode: `import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"`,
    usageCode: `<Alert variant="success">
  <span aria-hidden="true">✓</span>
  <AlertTitle>저장했습니다</AlertTitle>
  <AlertDescription>
    변경 사항이 모든 팀원에게 반영되었습니다.
  </AlertDescription>
</Alert>`,
    props: [
      {
        component: "Alert",
        name: "variant",
        type: '"default" | "success" | "destructive"',
        defaultValue: '"default"',
        description: "메시지의 의미와 시각적 상태를 선택합니다.",
      },
      {
        component: "Alert",
        name: "children",
        type: "React.ReactNode",
        description: "아이콘, AlertTitle, AlertDescription을 배치합니다.",
      },
      {
        component: "Alert",
        name: "className",
        type: "string",
        description: "기본 표면 스타일을 확장합니다.",
      },
    ],
    accessibility: [
      "Alert는 role=alert를 사용하므로 동적으로 나타나는 중요한 메시지에 적합합니다.",
      "페이지 로드 때부터 보이는 일반 안내에는 role=alert의 즉시 읽기가 불필요할 수 있으므로 role을 덮어쓰거나 다른 컨테이너를 사용합니다.",
      "장식 아이콘에는 aria-hidden=true를 지정하고 의미는 제목과 설명 텍스트로도 전달합니다.",
    ],
  },
  {
    slug: "avatar",
    title: "Avatar",
    category: "data-feedback",
    summary: "이미지 로딩 실패에도 fallback을 유지하는 프로필 표면.",
    description:
      "Base UI Avatar 기반으로 이미지 로딩과 fallback 전환을 처리합니다. 세 가지 크기, 상태 badge, 겹쳐진 group과 잔여 인원 count를 제공합니다.",
    importCode: `import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"`,
    usageCode: `<AvatarGroup>
  <Avatar size="lg">
    <AvatarImage src="/members/ana.jpg" alt="Ana Martins" />
    <AvatarFallback>AM</AvatarFallback>
    <AvatarBadge aria-label="온라인" />
  </Avatar>
  <Avatar size="lg">
    <AvatarFallback>UI</AvatarFallback>
  </Avatar>
  <AvatarGroupCount aria-label="그 외 8명">+8</AvatarGroupCount>
</AvatarGroup>`,
    props: [
      {
        component: "Avatar",
        name: "size",
        type: '"sm" | "default" | "lg"',
        defaultValue: '"default"',
        description: "Avatar와 badge의 크기를 함께 변경합니다.",
      },
      {
        component: "AvatarImage",
        name: "src",
        type: "string",
        description: "표시할 이미지 URL입니다.",
      },
      {
        component: "AvatarImage",
        name: "alt",
        type: "string",
        required: true,
        description: "이미지가 전달하는 사람이나 대상의 대체 텍스트입니다.",
      },
      {
        component: "AvatarFallback",
        name: "delayMs",
        type: "number",
        defaultValue: "0",
        description: "fallback을 표시하기 전 대기 시간입니다.",
      },
      {
        component: "AvatarBadge",
        name: "children",
        type: "React.ReactNode",
        description: "상태 점 또는 작은 상태 아이콘을 표시합니다.",
      },
    ],
    accessibility: [
      "사람을 식별하는 이미지에는 이름을 alt로 제공하고, 주변에 같은 이름이 있으면 빈 alt를 사용할 수 있습니다.",
      "AvatarBadge가 온라인 여부처럼 의미를 전달하면 aria-label이나 시각적으로 숨긴 텍스트를 제공합니다.",
      "AvatarGroupCount에는 '+8'의 의미를 설명하는 aria-label을 추가합니다.",
    ],
  },
  {
    slug: "badge",
    title: "Badge",
    category: "data-feedback",
    summary: "상태와 분류를 짧고 선명하게 표시하는 inline label.",
    description:
      "다섯 가지 변형을 제공하는 가벼운 span 기반 컴포넌트입니다. 시각적 강조만 제공하고 별도의 상호작용이나 암묵적 ARIA role은 추가하지 않습니다.",
    importCode: `import { Badge } from "@/components/ui/badge"`,
    usageCode: `<div className="flex gap-2">
  <Badge>Default</Badge>
  <Badge variant="primary">Ready</Badge>
  <Badge variant="soft">Draft</Badge>
  <Badge variant="destructive">Failed</Badge>
</div>`,
    props: [
      {
        component: "Badge",
        name: "variant",
        type: '"default" | "primary" | "soft" | "outline" | "destructive"',
        defaultValue: '"default"',
        description: "상태의 강조 수준과 색상을 선택합니다.",
      },
      {
        component: "Badge",
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "짧은 상태 또는 분류 텍스트입니다.",
      },
      {
        component: "Badge",
        name: "className",
        type: "string",
        description: "크기, 간격, 색상을 확장합니다.",
      },
    ],
    accessibility: [
      "Badge는 기본적으로 span이므로 상태에 맞는 텍스트를 직접 제공해야 합니다.",
      "색상만으로 상태를 구분하지 말고 Ready, Failed 같은 명시적 문구를 사용합니다.",
      "클릭 동작이 필요하면 Badge에 이벤트를 붙이지 말고 Button 또는 링크 안에서 사용합니다.",
    ],
  },
  {
    slug: "breadcrumb",
    title: "Breadcrumb",
    category: "navigation-disclosure",
    summary: "현재 페이지까지의 경로를 의미 있는 순서 목록으로 표시합니다.",
    description:
      "nav와 ol의 기본 시맨틱을 보존하며 링크, 현재 페이지, separator, 축약 표시를 조합할 수 있습니다. 현재 페이지는 aria-current=page로 자동 표시됩니다.",
    importCode: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"`,
    usageCode: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    props: [
      {
        component: "Breadcrumb",
        name: "aria-label",
        type: "string",
        defaultValue: '"breadcrumb"',
        description: "경로 탐색 영역의 접근 가능한 이름입니다.",
      },
      {
        component: "BreadcrumbLink",
        name: "href",
        type: "string",
        required: true,
        description: "상위 경로의 실제 URL입니다.",
      },
      {
        component: "BreadcrumbPage",
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "현재 페이지 이름이며 aria-current=page가 적용됩니다.",
      },
      {
        component: "BreadcrumbSeparator",
        name: "children",
        type: "React.ReactNode",
        defaultValue: '"/"',
        description: "보조기술에서 숨겨지는 시각적 구분자입니다.",
      },
    ],
    accessibility: [
      "Breadcrumb는 aria-label=breadcrumb인 nav이고 목록은 순서 있는 ol입니다.",
      "마지막 항목에는 링크 대신 BreadcrumbPage를 사용해 aria-current=page를 전달합니다.",
      "Separator와 Ellipsis는 장식 요소로 보조기술에서 숨겨집니다.",
    ],
  },
  {
    slug: "button",
    title: "Button",
    category: "actions-overlays",
    summary: "raised, pressed, primary 상태를 갖는 기본 행동 컨트롤.",
    description:
      "네이티브 button을 사용해 폼과 키보드 동작을 그대로 유지합니다. 다섯 가지 variant와 네 가지 size를 제공하며 active 상태는 inset shadow로 눌림을 표현합니다.",
    importCode: `import { Button } from "@/components/ui/button"`,
    usageCode: `<div className="flex gap-3">
  <Button variant="primary">변경 저장</Button>
  <Button variant="soft">취소</Button>
  <Button variant="ghost">나중에</Button>
  <Button size="icon" aria-label="항목 추가">+</Button>
</div>`,
    props: [
      {
        component: "Button",
        name: "variant",
        type: '"default" | "primary" | "soft" | "ghost" | "destructive"',
        defaultValue: '"default"',
        description: "버튼의 의미와 표면 강조를 선택합니다.",
      },
      {
        component: "Button",
        name: "size",
        type: '"sm" | "default" | "lg" | "icon"',
        defaultValue: '"default"',
        description: "높이와 좌우 여백을 선택합니다.",
      },
      {
        component: "Button",
        name: "type",
        type: '"button" | "submit" | "reset"',
        defaultValue: '"button"',
        description: "네이티브 버튼 동작을 결정합니다.",
      },
      {
        component: "Button",
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "클릭과 키보드 동작을 비활성화합니다.",
      },
    ],
    accessibility: [
      "네이티브 button이므로 Space와 Enter 키 동작 및 disabled 의미를 유지합니다.",
      "icon 크기 버튼에는 동작을 설명하는 aria-label을 반드시 제공합니다.",
      "링크 이동에는 Button 클릭 핸들러 대신 의미에 맞는 anchor 또는 Link를 사용합니다.",
    ],
  },
  {
    slug: "card",
    title: "Card",
    category: "data-feedback",
    summary: "콘텐츠를 raised, soft, inset 또는 flat 깊이로 묶는 표면.",
    description:
      "Header, Title, Description, Action, Content, Footer를 조합하는 레이아웃 컴포넌트입니다. 기본 root는 div이므로 콘텐츠의 의미에 맞춰 제목과 상호작용 요소를 구성합니다.",
    importCode: `import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"`,
    usageCode: `<Card variant="raised">
  <CardHeader>
    <CardTitle>Team workspace</CardTitle>
    <CardDescription>공유 토큰으로 함께 작업하세요.</CardDescription>
    <CardAction>
      <Button size="sm">열기</Button>
    </CardAction>
  </CardHeader>
  <CardContent>8명의 멤버가 참여 중입니다.</CardContent>
  <CardFooter>마지막 업데이트: 방금 전</CardFooter>
</Card>`,
    props: [
      {
        component: "Card",
        name: "variant",
        type: '"raised" | "soft" | "inset" | "flat"',
        defaultValue: '"raised"',
        description: "표면의 깊이와 테두리 표현을 선택합니다.",
      },
      {
        component: "Card",
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Card의 조합형 하위 요소를 배치합니다.",
      },
      {
        component: "CardAction",
        name: "children",
        type: "React.ReactNode",
        description: "Header 우측의 행동 또는 상태 영역입니다.",
      },
      {
        component: "CardTitle",
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "기본 h3로 렌더링되는 Card 제목입니다.",
      },
    ],
    accessibility: [
      "Card 자체는 div이며 landmark나 article role을 자동으로 추가하지 않습니다.",
      "페이지의 heading 순서에 맞지 않으면 CardTitle 대신 적절한 제목 요소를 구성합니다.",
      "Card 전체를 클릭 가능하게 만들 때 내부 버튼과 링크가 중첩되지 않도록 합니다.",
    ],
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    category: "forms-selection",
    summary: "boolean과 indeterminate 상태를 지원하는 네이티브 체크박스.",
    description:
      "투명한 native input 위에 뉴모피즘 표면을 겹쳐 폼 제출과 브라우저 접근성을 유지합니다. controlled, uncontrolled, indeterminate 상태와 shadcn식 onCheckedChange를 제공합니다.",
    importCode: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"`,
    usageCode: `<div className="flex items-center gap-2">
  <Checkbox id="updates" defaultChecked />
  <Label htmlFor="updates">제품 업데이트 받기</Label>
</div>`,
    props: [
      {
        component: "Checkbox",
        name: "checked",
        type: 'boolean | "indeterminate"',
        description: "controlled 체크 또는 혼합 상태입니다.",
      },
      {
        component: "Checkbox",
        name: "defaultChecked",
        type: "boolean",
        defaultValue: "false",
        description: "uncontrolled 초기 체크 상태입니다.",
      },
      {
        component: "Checkbox",
        name: "onCheckedChange",
        type: '(checked: boolean | "indeterminate") => void',
        description: "체크 상태가 바뀔 때 호출됩니다.",
      },
      {
        component: "Checkbox",
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "입력과 포인터 동작을 비활성화합니다.",
      },
      {
        component: "Checkbox",
        name: "name / value / required",
        type: "native input props",
        description: "폼 제출에 사용하는 네이티브 checkbox 속성입니다.",
      },
    ],
    accessibility: [
      "실제 input[type=checkbox]를 사용하므로 폼 제출과 키보드 Space 동작을 유지합니다.",
      "Label의 htmlFor와 Checkbox의 id를 연결하거나 Checkbox를 label 안에 배치합니다.",
      "indeterminate 상태에서는 aria-checked=mixed와 DOM indeterminate 속성이 함께 설정됩니다.",
    ],
  },
  {
    slug: "dialog",
    title: "Dialog",
    category: "actions-overlays",
    summary: "포커스를 안전하게 가두고 원래 trigger로 돌려보내는 모달 표면.",
    description:
      "Base UI Dialog 기반으로 Portal, Backdrop, Popup, 제목, 설명, 닫기 동작을 조합합니다. Escape, 외부 클릭, focus trap과 복귀 동작을 primitive가 처리합니다.",
    importCode: `import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"`,
    usageCode: `<Dialog>
  <DialogTrigger render={<Button variant="primary" />}>
    프로젝트 만들기
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>새 프로젝트</DialogTitle>
      <DialogDescription>
        이름과 설명은 나중에도 변경할 수 있습니다.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="soft" />}>취소</DialogClose>
      <Button variant="primary">만들기</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    props: [
      {
        component: "Dialog",
        name: "open / defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "controlled 또는 초기 uncontrolled 열림 상태입니다.",
      },
      {
        component: "Dialog",
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "열림 상태가 바뀔 때 호출됩니다.",
      },
      {
        component: "Dialog",
        name: "modal",
        type: "boolean",
        defaultValue: "true",
        description: "배경 상호작용과 focus trap 여부를 결정합니다.",
      },
      {
        component: "DialogTrigger / DialogClose",
        name: "render",
        type: "ReactElement | (props, state) => ReactElement",
        description: "버튼이나 링크에 trigger 또는 close 동작을 합성합니다.",
      },
      {
        component: "DialogContent",
        name: "showCloseButton",
        type: "boolean",
        defaultValue: "true",
        description: "우측 상단 기본 닫기 버튼을 표시합니다.",
      },
      {
        component: "DialogContent",
        name: "overlayClassName",
        type: "string | (state) => string",
        description: "Backdrop의 색상, blur, 전환을 별도로 확장합니다.",
      },
      {
        component: "Dialog",
        name: "disablePointerDismissal",
        type: "boolean",
        defaultValue: "false",
        description: "외부 pointer press로 Dialog가 닫히지 않게 합니다.",
      },
    ],
    accessibility: [
      "DialogContent 안에 DialogTitle을 제공하고 보조 설명은 DialogDescription으로 연결합니다.",
      "Base UI가 모달 포커스 트랩, Escape 닫기, 닫힌 뒤 trigger로의 포커스 복귀를 관리합니다.",
      "DialogFooter의 취소 버튼은 DialogClose로 감싸 명시적인 닫기 동작을 제공합니다.",
    ],
  },
  {
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    category: "actions-overlays",
    summary: "행동, 선택, submenu를 키보드로 탐색하는 맥락 메뉴.",
    description:
      "Base UI Menu 기반의 완전한 조합 API입니다. 일반 item, checkbox, radio group, label, separator, shortcut, 중첩 submenu를 한 표면 안에서 구성할 수 있습니다.",
    importCode: `import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"`,
    usageCode: `export function WorkspaceMenu() {
  const [showDepthGrid, setShowDepthGrid] = React.useState(true)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="soft" />}>
        메뉴 열기
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Workspace</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          복제
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuCheckboxItem
          checked={showDepthGrid}
          onCheckedChange={setShowDepthGrid}
        >
          깊이 격자 표시
        </DropdownMenuCheckboxItem>
        <DropdownMenuItem variant="destructive">삭제</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
    props: [
      {
        component: "DropdownMenu",
        name: "open / defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "controlled 또는 초기 uncontrolled 열림 상태입니다.",
      },
      {
        component: "DropdownMenu",
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "메뉴 열림 상태가 바뀔 때 호출됩니다.",
      },
      {
        component: "DropdownMenuTrigger",
        name: "render",
        type: "ReactElement | (props, state) => ReactElement",
        description: "버튼이나 링크에 trigger 동작을 합성합니다.",
      },
      {
        component: "DropdownMenuContent",
        name: "side / align",
        type: '"top" | "right" | "bottom" | "left" / "start" | "center" | "end"',
        defaultValue: '"bottom" / "start"',
        description: "trigger를 기준으로 popup 위치를 정합니다.",
      },
      {
        component: "DropdownMenuContent",
        name: "sideOffset",
        type: "number",
        defaultValue: "8",
        description: "trigger와 popup 사이의 간격입니다.",
      },
      {
        component: "DropdownMenuItem",
        name: "variant",
        type: '"default" | "destructive"',
        defaultValue: '"default"',
        description: "일반 또는 위험 행동 스타일을 선택합니다.",
      },
      {
        component: "DropdownMenuItem / Label",
        name: "inset",
        type: "boolean",
        defaultValue: "false",
        description: "indicator가 있는 행과 텍스트 시작 위치를 맞춥니다.",
      },
      {
        component: "DropdownMenuCheckboxItem",
        name: "checked",
        type: 'boolean | "indeterminate"',
        description: "checkbox item의 controlled 상태입니다.",
      },
      {
        component: "DropdownMenuCheckboxItem",
        name: "onCheckedChange",
        type: "(checked) => void",
        description: "checkbox item 상태가 바뀔 때 호출됩니다.",
      },
    ],
    accessibility: [
      "Base UI가 Arrow 키 탐색, Home, End, typeahead, Escape 닫기와 포커스 복귀를 처리합니다.",
      "DropdownMenuItem에는 명령을 설명하는 명확한 텍스트를 제공하고 위험 행동은 variant뿐 아니라 문구로도 구분합니다.",
      "CheckboxItem은 checked와 onCheckedChange를 함께 사용해 상태를 직접 유지합니다.",
    ],
  },
  {
    slug: "input",
    title: "Input",
    category: "forms-selection",
    summary: "focus와 validation 상태가 선명한 inset 단일 행 입력.",
    description:
      "native input의 모든 속성을 전달하며 뉴모피즘 inset 표면, file input, disabled, aria-invalid 상태를 일관되게 표현합니다.",
    importCode: `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"`,
    usageCode: `<div className="grid gap-2">
  <Label htmlFor="email">이메일</Label>
  <Input
    id="email"
    name="email"
    type="email"
    placeholder="you@example.com"
    autoComplete="email"
  />
</div>`,
    props: [
      {
        component: "Input",
        name: "type",
        type: "React.HTMLInputTypeAttribute",
        defaultValue: '"text" (browser default)',
        description: "email, password, file 등 native input 유형입니다.",
      },
      {
        component: "Input",
        name: "value / defaultValue",
        type: "string | number",
        description: "controlled 또는 초기 uncontrolled 값입니다.",
      },
      {
        component: "Input",
        name: "placeholder",
        type: "string",
        description: "값의 형식을 보조하는 짧은 예시입니다.",
      },
      {
        component: "Input",
        name: "disabled / required / readOnly",
        type: "boolean",
        defaultValue: "false",
        description: "native 입력 제약을 설정합니다.",
      },
      {
        component: "Input",
        name: "aria-invalid",
        type: "boolean | string",
        description: "오류 상태의 테두리와 focus ring을 활성화합니다.",
      },
    ],
    accessibility: [
      "Label의 htmlFor와 Input의 id를 연결하거나 aria-label을 제공합니다.",
      "placeholder는 Label을 대신하지 않으며 입력 형식의 예시로만 사용합니다.",
      "오류가 있으면 aria-invalid와 함께 오류 문구의 id를 aria-describedby로 연결합니다.",
    ],
  },
  {
    slug: "input-group",
    title: "Input Group",
    category: "forms-selection",
    summary: "입력, addon, action을 하나의 inset 표면으로 묶는 조합형 필드.",
    description:
      "InputGroupInput 또는 InputGroupTextarea에 앞뒤 addon, 보조 텍스트, button을 조합합니다. root의 focus-within 상태가 그룹 전체에 하나의 focus 표현을 제공합니다.",
    importCode: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"`,
    usageCode: `<div className="grid gap-2">
  <Label htmlFor="workspace">Workspace</Label>
  <InputGroup>
    <InputGroupAddon aria-hidden="true">⌕</InputGroupAddon>
    <InputGroupInput id="workspace" defaultValue="soft-interface" />
    <InputGroupButton type="button">검색</InputGroupButton>
  </InputGroup>
</div>`,
    props: [
      {
        component: "InputGroup",
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "control, addon, text, button을 순서대로 배치합니다.",
      },
      {
        component: "InputGroup",
        name: "aria-label / aria-labelledby",
        type: "string",
        description: "role=group에 필요한 경우 그룹 전체의 이름을 제공합니다.",
      },
      {
        component: "InputGroupInput",
        name: "native input props",
        type: "React.ComponentProps<\"input\">",
        description: "id, name, type, value, onChange 등의 native 속성입니다.",
      },
      {
        component: "InputGroupTextarea",
        name: "native textarea props",
        type: "React.ComponentProps<\"textarea\">",
        description: "여러 줄 control의 native 속성입니다.",
      },
      {
        component: "InputGroupButton",
        name: "type",
        type: '"button" | "submit" | "reset"',
        defaultValue: '"button"',
        description: "그룹 action의 버튼 유형입니다.",
      },
    ],
    accessibility: [
      "root의 role=group은 input의 이름을 만들지 않으므로 control 자체를 Label과 연결해야 합니다.",
      "순수 장식 addon은 aria-hidden=true로 숨기고 단위나 접두어처럼 필요한 텍스트는 그대로 읽히게 둡니다.",
      "아이콘만 있는 InputGroupButton에는 aria-label을 제공합니다.",
    ],
  },
  {
    slug: "label",
    title: "Label",
    category: "forms-selection",
    summary: "폼 control의 이름과 클릭 영역을 연결하는 native label.",
    description:
      "native label을 얇게 감싼 컴포넌트로 모든 표준 속성을 전달합니다. peer-disabled 상태와 일치하는 글자색과 cursor를 제공합니다.",
    importCode: `import { Label } from "@/components/ui/label"`,
    usageCode: `<div className="grid gap-2">
  <Label htmlFor="project-name">프로젝트 이름</Label>
  <Input id="project-name" name="projectName" />
</div>`,
    props: [
      {
        component: "Label",
        name: "htmlFor",
        type: "string",
        description: "연결할 form control의 id입니다.",
      },
      {
        component: "Label",
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "control의 목적을 설명하는 텍스트입니다.",
      },
      {
        component: "Label",
        name: "className",
        type: "string",
        description: "레이아웃과 상태 스타일을 확장합니다.",
      },
    ],
    accessibility: [
      "htmlFor는 대상 control의 id와 정확히 일치해야 합니다.",
      "RadioGroup처럼 여러 control을 묶는 이름에는 단독 Label 대신 fieldset/legend 또는 aria-labelledby를 사용합니다.",
      "필수 여부와 보조 설명은 시각적 표시뿐 아니라 required, aria-describedby로도 전달합니다.",
    ],
  },
  {
    slug: "pagination",
    title: "Pagination",
    category: "navigation-disclosure",
    summary: "현재 페이지와 이전·다음 이동을 명시하는 raised 링크 모음.",
    description:
      "nav, ul, li, anchor의 시맨틱을 유지하는 조합형 pagination입니다. 활성 페이지, 이전·다음 링크, 축약 표시를 제공합니다.",
    importCode: `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"`,
    usageCode: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="?page=1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=2" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem>
      <PaginationNext href="?page=3" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
    props: [
      {
        component: "Pagination",
        name: "aria-label",
        type: "string",
        defaultValue: '"pagination"',
        description: "pagination navigation 영역의 접근 가능한 이름입니다.",
      },
      {
        component: "PaginationLink",
        name: "href",
        type: "string",
        required: true,
        description: "대상 페이지의 실제 URL입니다.",
      },
      {
        component: "PaginationLink",
        name: "isActive",
        type: "boolean",
        defaultValue: "false",
        description: "현재 페이지 스타일과 aria-current=page를 설정합니다.",
      },
      {
        component: "PaginationPrevious / PaginationNext",
        name: "children",
        type: "React.ReactNode",
        defaultValue: '"Previous" / "Next"',
        description: "기본 이동 문구를 교체합니다.",
      },
    ],
    accessibility: [
      "각 페이지는 실제 href가 있는 링크여야 브라우저 탐색과 새 탭 열기를 유지합니다.",
      "현재 페이지 하나에만 isActive를 지정해 aria-current=page를 설정합니다.",
      "Previous와 Next에는 기본 aria-label이 있으며 지역화가 필요하면 덮어씁니다.",
    ],
  },
  {
    slug: "progress",
    title: "Progress",
    category: "data-feedback",
    summary: "완료 정도를 inset track과 primary fill로 표시하는 진행 상태.",
    description:
      "Base UI Progress의 progressbar 시맨틱을 사용합니다. 유효한 max와 value를 정규화하며 value가 없거나 유효하지 않으면 indeterminate 상태로 전달합니다.",
    importCode: `import { Progress } from "@/components/ui/progress"`,
    usageCode: `<div className="grid gap-2">
  <div id="upload-label" className="flex justify-between">
    <span>파일 업로드</span>
    <span>72%</span>
  </div>
  <Progress value={72} max={100} aria-labelledby="upload-label" />
</div>`,
    props: [
      {
        component: "Progress",
        name: "value",
        type: "number | null",
        defaultValue: "null",
        description: "현재 진행 값이며 0과 max 사이로 정규화됩니다.",
      },
      {
        component: "Progress",
        name: "max",
        type: "number",
        defaultValue: "100",
        description: "0보다 큰 전체 범위입니다. 유효하지 않으면 100을 사용합니다.",
      },
      {
        component: "Progress",
        name: "aria-label / aria-labelledby",
        type: "string",
        description: "진행 중인 작업의 접근 가능한 이름입니다.",
      },
      {
        component: "Progress",
        name: "getValueLabel",
        type: "(value, max) => string",
        description: "수치 외 설명이 필요한 경우 aria-valuetext를 만듭니다.",
      },
    ],
    accessibility: [
      "Progress에는 '파일 업로드'처럼 작업을 설명하는 aria-label 또는 aria-labelledby가 필요합니다.",
      "화면에 백분율을 표시해도 progressbar와 자동 연결되지 않으므로 명시적으로 레이블을 연결합니다.",
      "value를 null로 두면 indeterminate 상태이며 완료 비율 텍스트를 함께 표시하지 않습니다.",
    ],
  },
  {
    slug: "radio-group",
    title: "Radio Group",
    category: "forms-selection",
    summary: "하나의 값을 선택하는 native radio input 그룹.",
    description:
      "React context로 name과 선택 상태를 공유하면서 각 항목은 실제 input[type=radio]로 렌더링합니다. controlled와 uncontrolled 값, 가로·세로 배치, disabled와 required를 지원합니다.",
    importCode: `import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"`,
    usageCode: `<RadioGroup
  defaultValue="comfortable"
  orientation="horizontal"
  aria-label="화면 밀도"
>
  <Label className="flex gap-2" htmlFor="density-compact">
    <RadioGroupItem id="density-compact" value="compact" />
    Compact
  </Label>
  <Label className="flex gap-2" htmlFor="density-comfortable">
    <RadioGroupItem id="density-comfortable" value="comfortable" />
    Comfortable
  </Label>
</RadioGroup>`,
    props: [
      {
        component: "RadioGroup",
        name: "value / defaultValue",
        type: "string",
        description: "controlled 또는 초기 uncontrolled 선택 값입니다.",
      },
      {
        component: "RadioGroup",
        name: "onValueChange",
        type: "(value: string) => void",
        description: "선택 값이 바뀔 때 호출됩니다.",
      },
      {
        component: "RadioGroup",
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"vertical"',
        description: "배치 방향과 aria-orientation을 설정합니다.",
      },
      {
        component: "RadioGroup",
        name: "name",
        type: "string",
        defaultValue: "generated id",
        description: "항목이 공유하는 native radio name입니다.",
      },
      {
        component: "RadioGroup",
        name: "disabled / required",
        type: "boolean",
        defaultValue: "false",
        description: "모든 항목의 입력 제약을 설정합니다.",
      },
      {
        component: "RadioGroupItem",
        name: "value",
        type: "string",
        required: true,
        description: "항목이 선택됐을 때 그룹에 전달할 값입니다.",
      },
    ],
    accessibility: [
      "RadioGroup root에는 aria-label 또는 aria-labelledby로 그룹 전체의 이름을 제공합니다.",
      "각 RadioGroupItem은 id와 Label htmlFor를 연결합니다.",
      "실제 radio input을 사용하므로 브라우저의 폼 제출과 키보드 선택 동작을 유지합니다.",
    ],
  },
  {
    slug: "scroll-area",
    title: "Scroll Area",
    category: "data-feedback",
    summary: "브라우저의 native scrolling을 유지하는 테마형 overflow 표면.",
    description:
      "overflow-auto와 native scrollbar를 사용해 휠, 터치, 키보드, 브라우저 접근성을 그대로 유지합니다. ScrollBar export는 shadcn 조합 호환을 위한 숨겨진 placeholder입니다.",
    importCode: `import {
  ScrollArea,
  ScrollBar,
} from "@/components/ui/scroll-area"`,
    usageCode: `<ScrollArea
  className="h-64 p-4"
  tabIndex={0}
  aria-label="최근 활동"
>
  {activities.map((activity) => (
    <article key={activity.id}>{activity.title}</article>
  ))}
  <ScrollBar orientation="vertical" />
</ScrollArea>`,
    props: [
      {
        component: "ScrollArea",
        name: "className",
        type: "string",
        description: "높이 또는 너비를 제한해 overflow 영역을 만듭니다.",
      },
      {
        component: "ScrollArea",
        name: "tabIndex",
        type: "number",
        description: "내부에 focusable 요소가 없을 때 키보드 스크롤 진입점을 제공합니다.",
      },
      {
        component: "ScrollArea",
        name: "aria-label / aria-labelledby",
        type: "string",
        description: "독립적으로 탐색할 영역이면 콘텐츠 이름을 제공합니다.",
      },
      {
        component: "ScrollBar",
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"vertical"',
        description: "호환용 placeholder의 방향 데이터 속성입니다.",
      },
    ],
    accessibility: [
      "native overflow를 사용하므로 화면 읽기 도구와 터치 스크롤을 가로채지 않습니다.",
      "내부에 링크나 버튼이 전혀 없다면 tabIndex=0으로 키보드 사용자가 영역에 진입하게 합니다.",
      "ScrollBar는 시각적으로 숨겨진 호환 placeholder이며 실제 스크롤은 브라우저 scrollbar가 담당합니다.",
    ],
  },
  {
    slug: "select",
    title: "Select",
    category: "forms-selection",
    summary: "브라우저 접근성을 보존한 native select 표면.",
    description:
      "native select, optgroup, option을 그대로 사용하면서 inset field와 장식 chevron을 적용합니다. 모바일 플랫폼의 기본 picker와 폼 제출 동작을 유지합니다.",
    importCode: `import {
  Select,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"`,
    usageCode: `<div className="grid gap-2">
  <Label htmlFor="role">역할</Label>
  <Select id="role" name="role" defaultValue="designer">
    <SelectItem value="designer">Designer</SelectItem>
    <SelectItem value="developer">Developer</SelectItem>
    <SelectItem value="founder">Founder</SelectItem>
  </Select>
</div>`,
    props: [
      {
        component: "Select",
        name: "value / defaultValue",
        type: "string | string[]",
        description: "controlled 또는 초기 uncontrolled 선택 값입니다.",
      },
      {
        component: "Select",
        name: "onChange",
        type: "React.ChangeEventHandler<HTMLSelectElement>",
        description: "native select 값이 바뀔 때 호출됩니다.",
      },
      {
        component: "Select",
        name: "disabled / required / multiple",
        type: "boolean",
        defaultValue: "false",
        description: "native select의 입력 제약과 다중 선택을 설정합니다.",
      },
      {
        component: "SelectItem",
        name: "value",
        type: "string | number | readonly string[]",
        required: true,
        description: "option이 제출하는 값입니다.",
      },
      {
        component: "SelectGroup",
        name: "label",
        type: "string",
        required: true,
        description: "optgroup의 선택지 묶음 이름입니다.",
      },
    ],
    accessibility: [
      "Label의 htmlFor와 Select의 id를 연결합니다.",
      "첫 option을 placeholder로 사용할 때 빈 value와 disabled를 조합하고 실제 Label은 유지합니다.",
      "native select를 사용하므로 운영체제의 키보드 및 모바일 picker 동작을 그대로 제공합니다.",
    ],
  },
  {
    slug: "separator",
    title: "Separator",
    category: "data-feedback",
    summary: "관련 콘텐츠 사이의 경계를 빛과 얇은 그림자로 표현하는 구분선.",
    description:
      "수평과 수직 방향을 지원하며 기본값은 장식용입니다. 의미 있는 섹션 경계가 필요하면 decorative=false로 separator role과 aria-orientation을 활성화할 수 있습니다.",
    importCode: `import { Separator } from "@/components/ui/separator"`,
    usageCode: `<div>
  <section>프로필 설정</section>
  <Separator className="my-6" />
  <section>알림 설정</section>
</div>`,
    props: [
      {
        component: "Separator",
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "구분선의 방향과 크기 스타일을 설정합니다.",
      },
      {
        component: "Separator",
        name: "decorative",
        type: "boolean",
        defaultValue: "true",
        description: "true면 장식 요소로 숨기고 false면 role=separator를 사용합니다.",
      },
      {
        component: "Separator",
        name: "className",
        type: "string",
        description: "여백, 길이, 최소 높이를 확장합니다.",
      },
    ],
    accessibility: [
      "단순 시각적 경계에는 기본 decorative=true를 유지합니다.",
      "문서 구조상 의미 있는 경계라면 decorative=false를 사용해 role=separator를 노출합니다.",
      "수직 separator는 부모가 높이를 제공하거나 className으로 명시적인 높이를 설정해야 합니다.",
    ],
  },
  {
    slug: "skeleton",
    title: "Skeleton",
    category: "data-feedback",
    summary: "로딩될 콘텐츠의 크기와 위치를 미리 보여주는 inset placeholder.",
    description:
      "단순 div 기반의 pulse placeholder입니다. 시각적 로딩 형태만 제공하며 aria-hidden=true로 보조기술에서 숨겨집니다.",
    importCode: `import { Skeleton } from "@/components/ui/skeleton"`,
    usageCode: `<div className="flex items-center gap-3" aria-busy="true">
  <span className="sr-only">프로필을 불러오는 중</span>
  <Skeleton className="size-12 rounded-full" />
  <div className="grid flex-1 gap-2">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-3 w-2/3" />
  </div>
</div>`,
    props: [
      {
        component: "Skeleton",
        name: "className",
        type: "string",
        required: true,
        description: "placeholder의 너비, 높이, radius를 설정합니다.",
      },
      {
        component: "Skeleton",
        name: "aria-hidden",
        type: "boolean",
        defaultValue: "true",
        description: "장식 placeholder를 접근성 트리에서 숨깁니다.",
      },
    ],
    accessibility: [
      "Skeleton 자체는 aria-hidden이므로 별도의 sr-only 상태 문구나 role=status를 주변에 제공합니다.",
      "로딩 영역에는 필요에 따라 aria-busy=true를 설정하고 완료되면 제거합니다.",
      "pulse 애니메이션은 전역 prefers-reduced-motion 규칙에 따라 사실상 비활성화됩니다.",
    ],
  },
  {
    slug: "slider",
    title: "Slider",
    category: "forms-selection",
    summary: "하나 또는 여러 값을 가로·세로 track에서 조정하는 범위 컨트롤.",
    description:
      "Base UI Slider 기반으로 단일 값과 number[] range API를 제공합니다. 배열 항목 수만큼 thumb를 만들고 thumbLabels로 각 input의 이름을 지정하며, 가로·세로 방향과 controlled·uncontrolled 값을 지원합니다.",
    importCode: `import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"`,
    usageCode: `<div className="grid gap-3">
  <div className="flex justify-between">
    <Label id="depth-label">Depth intensity</Label>
    <output>64%</output>
  </div>
  <Slider
    defaultValue={[64]}
    min={0}
    max={100}
    step={1}
    aria-labelledby="depth-label"
    thumbLabels={["Depth intensity"]}
  />
</div>`,
    props: [
      {
        component: "Slider",
        name: "value / defaultValue",
        type: "number[]",
        defaultValue: "[min]",
        description: "thumb별 controlled 또는 초기 uncontrolled 값입니다.",
      },
      {
        component: "Slider",
        name: "min / max",
        type: "number",
        defaultValue: "0 / 100",
        description: "선택 가능한 숫자 범위입니다.",
      },
      {
        component: "Slider",
        name: "step",
        type: "number",
        defaultValue: "1",
        description: "키보드와 포인터 조정 단위입니다.",
      },
      {
        component: "Slider",
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "track 방향과 키보드 축을 설정합니다.",
      },
      {
        component: "Slider",
        name: "thumbLabels",
        type: "readonly string[]",
        description:
          "값 순서대로 실제 thumb input에 전달할 접근 가능한 이름입니다.",
      },
      {
        component: "Slider",
        name: "onValueChange / onValueCommitted",
        type: "(value: number | number[]) => void",
        description: "조정 중 또는 조정이 끝났을 때 배열 값을 전달합니다.",
      },
      {
        component: "Slider",
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "모든 thumb의 상호작용을 비활성화합니다.",
      },
    ],
    accessibility: [
      "Slider root는 aria-label 또는 aria-labelledby로 그룹의 이름을 제공하고, thumbLabels에는 각 조절점의 이름을 값 순서대로 제공합니다.",
      "Base UI가 각 thumb의 role=slider, 현재 값, 최소·최대 값과 Arrow/Page/Home/End 키 동작을 관리합니다.",
      "단일 값은 한 개, 범위 값은 최소·최대처럼 서로 구분되는 이름을 thumbLabels에 전달합니다.",
    ],
  },
  {
    slug: "switch",
    title: "Switch",
    category: "forms-selection",
    summary: "즉시 적용되는 켜짐·꺼짐 설정을 눌린 track으로 표현하는 control.",
    description:
      "native checkbox input에 role=switch를 적용해 폼과 브라우저 동작을 유지합니다. checked, defaultChecked, onCheckedChange를 모두 사용할 수 있습니다.",
    importCode: `import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"`,
    usageCode: `<div className="flex items-center justify-between gap-4">
  <Label htmlFor="system-theme">시스템 테마 따르기</Label>
  <Switch id="system-theme" name="systemTheme" defaultChecked />
</div>`,
    props: [
      {
        component: "Switch",
        name: "checked / defaultChecked",
        type: "boolean",
        description: "controlled 또는 초기 uncontrolled 켜짐 상태입니다.",
      },
      {
        component: "Switch",
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        description: "켜짐 상태가 바뀔 때 호출됩니다.",
      },
      {
        component: "Switch",
        name: "onChange",
        type: "React.ChangeEventHandler<HTMLInputElement>",
        description: "native checkbox change event를 받습니다.",
      },
      {
        component: "Switch",
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "입력과 포인터 동작을 비활성화합니다.",
      },
      {
        component: "Switch",
        name: "name / value / required",
        type: "native input props",
        description: "폼 제출에 사용하는 native checkbox 속성입니다.",
      },
    ],
    accessibility: [
      "실제 checkbox에 role=switch를 적용하므로 Space 키와 checked 상태를 보조기술에 전달합니다.",
      "Label의 htmlFor와 Switch의 id를 연결하거나 aria-label을 제공합니다.",
      "즉시 적용되지 않고 별도 저장이 필요한 boolean 선택에는 Checkbox가 더 자연스러울 수 있습니다.",
    ],
  },
  {
    slug: "table",
    title: "Table",
    category: "data-feedback",
    summary: "작은 화면에서 가로 스크롤되는 의미 있는 데이터 표.",
    description:
      "native table 요소와 caption, thead, tbody, tfoot, tr, th, td를 조합합니다. 외부 container가 overflow-x-auto와 뉴모피즘 raised 표면을 제공합니다.",
    importCode: `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"`,
    usageCode: `<Table>
  <TableCaption>최근 설치한 컴포넌트</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Component</TableHead>
      <TableHead scope="col">Category</TableHead>
      <TableHead scope="col">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Dialog</TableCell>
      <TableCell>Overlay</TableCell>
      <TableCell>Ready</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    props: [
      {
        component: "Table",
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "caption과 table section을 배치합니다.",
      },
      {
        component: "TableCaption",
        name: "children",
        type: "React.ReactNode",
        description: "표의 목적과 데이터 범위를 설명합니다.",
      },
      {
        component: "TableHead",
        name: "scope",
        type: '"col" | "row" | "colgroup" | "rowgroup"',
        description: "header가 설명하는 cell 방향을 명시합니다.",
      },
      {
        component: "TableRow",
        name: "data-state",
        type: '"selected" | string',
        description: "선택된 행의 inset 상태를 활성화합니다.",
      },
      {
        component: "TableCell",
        name: "colSpan / rowSpan",
        type: "number",
        description: "native table cell 병합 범위입니다.",
      },
    ],
    accessibility: [
      "표의 목적을 TableCaption으로 제공하고 시각적으로 숨기려면 sr-only class를 사용합니다.",
      "열과 행 header에는 의미에 맞는 scope를 지정합니다.",
      "레이아웃만 맞추기 위한 표에는 Table을 사용하지 말고 CSS grid나 flex를 사용합니다.",
    ],
  },
  {
    slug: "tabs",
    title: "Tabs",
    category: "navigation-disclosure",
    summary: "같은 맥락 안의 panel을 키보드로 전환하는 tab interface.",
    description:
      "Base UI Tabs 기반으로 active trigger를 raised 표면으로, list를 inset track으로 표현합니다. controlled와 uncontrolled 값, 자동·수동 활성화, 가로·세로 방향을 지원합니다.",
    importCode: `import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"`,
    usageCode: `<Tabs defaultValue="surface">
  <TabsList aria-label="디자인 토큰">
    <TabsTrigger value="surface">Surface</TabsTrigger>
    <TabsTrigger value="motion">Motion</TabsTrigger>
    <TabsTrigger value="access">Access</TabsTrigger>
  </TabsList>
  <TabsContent value="surface">Raised와 inset 표면 토큰입니다.</TabsContent>
  <TabsContent value="motion">짧고 일관된 전환 토큰입니다.</TabsContent>
  <TabsContent value="access">Focus와 대비 토큰입니다.</TabsContent>
</Tabs>`,
    props: [
      {
        component: "Tabs",
        name: "value / defaultValue",
        type: "string",
        description: "controlled 또는 초기 uncontrolled 활성 tab 값입니다.",
      },
      {
        component: "Tabs",
        name: "onValueChange",
        type: "(value: string) => void",
        description: "활성 tab이 바뀔 때 호출됩니다.",
      },
      {
        component: "Tabs",
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "list 방향과 Arrow 키 탐색 축을 설정합니다.",
      },
      {
        component: "TabsList",
        name: "activateOnFocus",
        type: "boolean",
        defaultValue: "false",
        description: "Arrow 키로 focus를 옮길 때 panel도 함께 활성화할지 결정합니다.",
      },
      {
        component: "TabsTrigger",
        name: "value",
        type: "string",
        required: true,
        description: "연결할 TabsContent와 공유하는 고유 값입니다.",
      },
      {
        component: "TabsContent",
        name: "value",
        type: "string",
        required: true,
        description: "해당 panel을 여는 trigger 값입니다.",
      },
    ],
    accessibility: [
      "TabsList에 aria-label 또는 aria-labelledby로 tab 묶음의 이름을 제공합니다.",
      "Base UI가 tab, tablist, tabpanel 역할과 aria-controls, aria-selected 연결을 관리합니다.",
      "panel 전환이 즉시 가능할 때만 TabsList의 activateOnFocus를 사용합니다.",
    ],
  },
  {
    slug: "textarea",
    title: "Textarea",
    category: "forms-selection",
    summary: "여러 줄 텍스트를 입력하는 resizable inset field.",
    description:
      "native textarea의 모든 속성을 전달하며 최소 높이, 세로 resize, focus와 aria-invalid 상태를 뉴모피즘 토큰으로 표현합니다.",
    importCode: `import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"`,
    usageCode: `<div className="grid gap-2">
  <Label htmlFor="note">메모</Label>
  <Textarea
    id="note"
    name="note"
    placeholder="팀에 남길 내용을 입력하세요."
    rows={5}
  />
</div>`,
    props: [
      {
        component: "Textarea",
        name: "value / defaultValue",
        type: "string",
        description: "controlled 또는 초기 uncontrolled 텍스트입니다.",
      },
      {
        component: "Textarea",
        name: "rows",
        type: "number",
        description: "초기 표시 행 수입니다.",
      },
      {
        component: "Textarea",
        name: "placeholder",
        type: "string",
        description: "입력 형식을 보조하는 짧은 예시입니다.",
      },
      {
        component: "Textarea",
        name: "disabled / required / readOnly",
        type: "boolean",
        defaultValue: "false",
        description: "native 입력 제약을 설정합니다.",
      },
      {
        component: "Textarea",
        name: "aria-invalid",
        type: "boolean | string",
        description: "오류 테두리와 focus ring을 활성화합니다.",
      },
    ],
    accessibility: [
      "Label의 htmlFor와 Textarea의 id를 연결하고 placeholder로 Label을 대체하지 않습니다.",
      "글자 수 제한이 있으면 maxLength와 현재 글자 수를 함께 제공하고 필요한 경우 aria-describedby로 연결합니다.",
      "오류 문구에는 id를 부여하고 aria-invalid, aria-describedby로 control과 연결합니다.",
    ],
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    category: "navigation-disclosure",
    summary: "hover와 keyboard focus에 짧은 보조 설명을 제공하는 popup.",
    description:
      "Base UI Tooltip 기반으로 Provider, Root, Trigger, Portal, Positioner와 Popup을 조합합니다. 기본 provider 지연은 250ms이며 popup은 trigger 주변 충돌을 자동으로 피합니다.",
    importCode: `import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"`,
    usageCode: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger
      render={<Button size="icon" aria-label="설정 열기" />}
    >
      ⚙
    </TooltipTrigger>
    <TooltipContent side="top">
      설정
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    props: [
      {
        component: "TooltipProvider",
        name: "delay",
        type: "number",
        defaultValue: "250",
        description: "pointer hover 후 tooltip을 열기까지의 지연 시간(ms)입니다.",
      },
      {
        component: "Tooltip",
        name: "open / defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "controlled 또는 초기 uncontrolled 열림 상태입니다.",
      },
      {
        component: "Tooltip",
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "열림 상태가 바뀔 때 호출됩니다.",
      },
      {
        component: "TooltipTrigger",
        name: "render",
        type: "ReactElement | (props, state) => ReactElement",
        description: "버튼이나 링크에 tooltip trigger 동작을 합성합니다.",
      },
      {
        component: "TooltipContent",
        name: "side / align",
        type: '"top" | "right" | "bottom" | "left" / "start" | "center" | "end"',
        defaultValue: '"top" / "center"',
        description: "trigger를 기준으로 popup 위치를 정합니다.",
      },
      {
        component: "TooltipContent",
        name: "sideOffset",
        type: "number",
        defaultValue: "8",
        description: "trigger와 popup 사이의 간격입니다.",
      },
    ],
    accessibility: [
      "Tooltip은 trigger의 접근 가능한 이름을 대신하지 않으므로 아이콘 버튼에는 별도 aria-label이 필요합니다.",
      "내용은 짧고 보조적이어야 하며 필수 지침이나 오류 메시지를 Tooltip에만 넣지 않습니다.",
      "Base UI가 hover뿐 아니라 keyboard focus에서 열고 Escape로 닫는 동작을 제공합니다.",
    ],
  },
{
  "slug": "alert-dialog",
  "title": "Alert Dialog",
  "category": "actions-overlays",
  "summary": "되돌릴 수 없는 작업을 명시적으로 확인하는 대화상자.",
  "description": "되돌릴 수 없는 작업을 명시적으로 확인하는 대화상자. Cancel을 먼저 배치하세요. 비동기 작업은 성공 후 controlled 상태를 닫으세요.",
  "importCode": "\"use client\";\n\nimport * as React from \"react\";\nimport { Button } from \"@/components/ui/button\";\nimport { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from \"@/components/ui/alert-dialog\";",
  "usageCode": "export default function Example() {\n  const [message, setMessage] = React.useState(\"\");\n  return (<div className=\"grid gap-3\"><AlertDialog><AlertDialogTrigger render={<Button variant=\"destructive\" />}>{\"초안 삭제\"}</AlertDialogTrigger><AlertDialogContent><AlertDialogTitle>{\"초안을 삭제할까요?\"}</AlertDialogTitle><AlertDialogDescription>{\"이 작업은 되돌릴 수 없습니다. 계속하려면 직접 확인하세요.\"}</AlertDialogDescription><AlertDialogFooter><AlertDialogCancel>{\"돌아가기\"}</AlertDialogCancel><AlertDialogAction onClick={() => setMessage(\"초안을 삭제했습니다.\")}>{\"초안 삭제\"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog><p role=\"status\" className=\"text-sm text-[var(--muted-foreground)]\">{message}</p></div>);\n}",
  "props": [
    {
      "component": "AlertDialog",
      "name": "open / defaultOpen",
      "type": "boolean",
      "description": "제어 상태 또는 최초 상태를 지정합니다."
    },
    {
      "component": "AlertDialogContent",
      "name": "initialFocus",
      "type": "boolean | React.RefObject | function",
      "description": "열릴 때 포커스를 받을 요소를 지정합니다."
    },
    {
      "component": "AlertDialogAction",
      "name": "onClick",
      "type": "React.MouseEventHandler",
      "description": "확인 버튼의 동기 동작입니다. 비동기 저장에는 controlled 상태를 사용하세요."
    }
  ],
  "accessibility": [
    "Cancel을 먼저 배치하세요. 비동기 작업은 성공 후 controlled 상태를 닫으세요.",
    "render나 className을 바꿀 때 라벨 연결과 포커스 표시를 유지하세요."
  ]
},
{
  "slug": "popover",
  "title": "Popover",
  "category": "actions-overlays",
  "summary": "버튼 옆에서 맥락을 유지하는 작은 설정 패널.",
  "description": "버튼 옆에서 맥락을 유지하는 작은 설정 패널. PopoverTitle과 설명을 제공하고 키보드로 닫기 동작을 확인하세요.",
  "importCode": "\"use client\";\n\nimport { Button } from \"@/components/ui/button\";\nimport { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, PopoverClose } from \"@/components/ui/popover\";",
  "usageCode": "export default function Example() {\n\n  return (<Popover><PopoverTrigger render={<Button />}>{\"알림 설정\"}</PopoverTrigger><PopoverContent><PopoverTitle>{\"알림을 조절하세요\"}</PopoverTitle><PopoverDescription>{\"중요한 업데이트만 받아 집중을 유지하세요.\"}</PopoverDescription><PopoverClose render={<Button variant=\"primary\" />}>{\"닫기\"}</PopoverClose></PopoverContent></Popover>);\n}",
  "props": [
    {
      "component": "Popover",
      "name": "open / defaultOpen",
      "type": "boolean",
      "description": "제어 상태 또는 최초 상태를 지정합니다."
    },
    {
      "component": "PopoverContent",
      "name": "side / align",
      "type": "Positioner.Props",
      "description": "화면 경계를 고려한 패널 위치와 간격입니다."
    },
    {
      "component": "PopoverTrigger",
      "name": "render",
      "type": "React.ReactElement | function",
      "description": "기존 요소와 이벤트·ref를 합성합니다."
    }
  ],
  "accessibility": [
    "PopoverTitle과 설명을 제공하고 키보드로 닫기 동작을 확인하세요.",
    "render나 className을 바꿀 때 라벨 연결과 포커스 표시를 유지하세요."
  ]
},
{
  "slug": "hover-card",
  "title": "Hover Card",
  "category": "actions-overlays",
  "summary": "링크의 목적지를 보조적으로 설명하는 미리보기 카드.",
  "description": "링크의 목적지를 보조적으로 설명하는 미리보기 카드. 필수 정보나 행동을 hover에만 두지 마세요. 원래 링크만으로도 목적지를 알 수 있어야 합니다.",
  "importCode": "\"use client\";\n\nimport * as React from \"react\";\nimport { HoverCard, HoverCardTrigger, HoverCardContent } from \"@/components/ui/hover-card\";",
  "usageCode": "export default function Example() {\n  const id = React.useId();\n  return (<HoverCard><HoverCardTrigger href=\"#profile-preview\" className=\"inline-flex items-center gap-3 rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] px-4 py-3 font-semibold text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]\">{\"프로필 미리보기\"} <span aria-hidden=\"true\">↗</span></HoverCardTrigger><HoverCardContent><strong id=\"profile-preview\">Alex Kim</strong><p>{\"제품 디자이너 · 서울\"}</p></HoverCardContent></HoverCard>);\n}",
  "props": [
    {
      "component": "HoverCard",
      "name": "open / defaultOpen",
      "type": "boolean",
      "description": "제어 상태 또는 최초 상태를 지정합니다."
    },
    {
      "component": "HoverCardTrigger",
      "name": "delay / closeDelay",
      "type": "number",
      "description": "열기와 닫기의 지연 시간(ms)입니다."
    },
    {
      "component": "HoverCardContent",
      "name": "sideOffset",
      "type": "number",
      "description": "화면 경계를 고려한 패널 위치와 간격입니다."
    }
  ],
  "accessibility": [
    "필수 정보나 행동을 hover에만 두지 마세요. 원래 링크만으로도 목적지를 알 수 있어야 합니다.",
    "render나 className을 바꿀 때 라벨 연결과 포커스 표시를 유지하세요."
  ]
},
{
  "slug": "sheet",
  "title": "Sheet",
  "category": "actions-overlays",
  "summary": "화면 가장자리에서 여는 스크롤 가능한 작업 패널.",
  "description": "화면 가장자리에서 여는 스크롤 가능한 작업 패널. SheetTitle과 설명을 포함하세요. 작은 화면에서도 닫기와 마지막 필드에 도달할 수 있어야 합니다.",
  "importCode": "\"use client\";\n\nimport * as React from \"react\";\nimport { Button } from \"@/components/ui/button\";\nimport { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from \"@/components/ui/sheet\";\nimport { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from \"@/components/ui/field\";",
  "usageCode": "export default function Example() {\n  const [name, setName] = React.useState(\"Alex\");\n  const nameField = <Field name=\"displayName\"><FieldLabel>{\"표시 이름\"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{\"프로필에 표시할 이름을 입력하세요.\"}</FieldDescription><FieldError match=\"valueMissing\">{\"이름을 입력하세요.\"}</FieldError></Field>;\n  return (<Sheet><SheetTrigger render={<Button />}>{\"프로필 설정\"}</SheetTrigger><SheetContent closeLabel={\"닫기\"}><SheetTitle>{\"프로필 설정\"}</SheetTitle><SheetDescription>{\"프로필에 표시할 이름을 입력하세요.\"}</SheetDescription>{nameField}<SheetClose render={<Button variant=\"primary\" />}>{\"닫기\"}</SheetClose></SheetContent></Sheet>);\n}",
  "props": [
    {
      "component": "SheetContent",
      "name": "side",
      "type": "\"left\" | \"right\" | \"top\" | \"bottom\"",
      "description": "화면 경계를 고려한 패널 위치와 간격입니다."
    },
    {
      "component": "SheetContent",
      "name": "closeLabel",
      "type": "string",
      "description": "닫기 버튼의 접근 가능한 이름입니다."
    },
    {
      "component": "Sheet",
      "name": "open / onOpenChange",
      "type": "Dialog.Root.Props",
      "description": "제어 상태 또는 최초 상태를 지정합니다."
    }
  ],
  "accessibility": [
    "SheetTitle과 설명을 포함하세요. 작은 화면에서도 닫기와 마지막 필드에 도달할 수 있어야 합니다.",
    "render나 className을 바꿀 때 라벨 연결과 포커스 표시를 유지하세요."
  ]
},
{
  "slug": "collapsible",
  "title": "Collapsible",
  "category": "navigation-disclosure",
  "summary": "추가 설정 한 묶음을 펼치거나 접는 컨테이너.",
  "description": "추가 설정 한 묶음을 펼치거나 접는 컨테이너. 트리거의 이름은 내용과 관계를 설명해야 합니다. Enter와 Space로 펼침을 확인하세요.",
  "importCode": "\"use client\";\n\nimport * as React from \"react\";\nimport { Collapsible, CollapsibleTrigger, CollapsibleContent } from \"@/components/ui/collapsible\";",
  "usageCode": "export default function Example() {\n  const [expanded, setExpanded] = React.useState(false);\n  return (<Collapsible open={expanded} onOpenChange={setExpanded}><CollapsibleTrigger>{\"세부 설정\"}<span aria-hidden=\"true\">{expanded ? \"−\" : \"+\"}</span></CollapsibleTrigger><CollapsibleContent><div>{\"기본 동작은 그대로 두고 추가 설정만 펼칩니다.\"}</div></CollapsibleContent></Collapsible>);\n}",
  "props": [
    {
      "component": "Collapsible",
      "name": "open / defaultOpen",
      "type": "boolean",
      "description": "제어 상태 또는 최초 상태를 지정합니다."
    },
    {
      "component": "CollapsibleTrigger",
      "name": "disabled",
      "type": "boolean",
      "description": "사용자 조작을 비활성화합니다."
    },
    {
      "component": "CollapsibleContent",
      "name": "keepMounted",
      "type": "boolean",
      "description": "접혀 있을 때도 패널을 DOM에 유지합니다."
    }
  ],
  "accessibility": [
    "트리거의 이름은 내용과 관계를 설명해야 합니다. Enter와 Space로 펼침을 확인하세요.",
    "render나 className을 바꿀 때 라벨 연결과 포커스 표시를 유지하세요."
  ]
},
{
  "slug": "toggle",
  "title": "Toggle",
  "category": "forms-selection",
  "summary": "눌린 선택 상태가 유지되는 독립 토글 버튼.",
  "description": "눌린 선택 상태가 유지되는 독립 토글 버튼. 아이콘만 쓰면 aria-label을 제공하세요. 색뿐 아니라 inset과 테두리로 선택 상태를 표시합니다.",
  "importCode": "\"use client\";\n\nimport { Toggle } from \"@/components/ui/toggle\";",
  "usageCode": "export default function Example() {\n\n  return (<div className=\"flex flex-wrap gap-3\"><Toggle aria-label={\"고정\"}><span aria-hidden=\"true\">◆</span>{\"고정\"}</Toggle><Toggle defaultPressed>{\"고정\"}</Toggle><Toggle disabled>{\"잠김\"}</Toggle></div>);\n}",
  "props": [
    {
      "component": "Toggle",
      "name": "pressed / defaultPressed",
      "type": "boolean",
      "description": "제어 상태 또는 최초 상태를 지정합니다."
    },
    {
      "component": "Toggle",
      "name": "size",
      "type": "\"sm\" | \"default\" | \"lg\"",
      "description": "컨트롤 크기를 선택합니다."
    },
    {
      "component": "Toggle",
      "name": "disabled",
      "type": "boolean",
      "description": "사용자 조작을 비활성화합니다."
    }
  ],
  "accessibility": [
    "아이콘만 쓰면 aria-label을 제공하세요. 색뿐 아니라 inset과 테두리로 선택 상태를 표시합니다.",
    "render나 className을 바꿀 때 라벨 연결과 포커스 표시를 유지하세요."
  ]
},
{
  "slug": "toggle-group",
  "title": "Toggle Group",
  "category": "forms-selection",
  "summary": "단일 또는 복수 선택을 묶는 키보드 탐색 토글 그룹.",
  "description": "단일 또는 복수 선택을 묶는 키보드 탐색 토글 그룹. 그룹의 aria-label과 각 항목 이름을 제공하세요. 방향키 이동과 선택 상태를 구분합니다.",
  "importCode": "\"use client\";\n\nimport * as React from \"react\";\nimport { ToggleGroup, ToggleGroupItem } from \"@/components/ui/toggle-group\";",
  "usageCode": "export default function Example() {\n  const text = {\"open\":\"알림 설정\",\"title\":\"알림을 조절하세요\",\"body\":\"중요한 업데이트만 받아 집중을 유지하세요.\",\"close\":\"닫기\",\"discard\":\"초안 삭제\",\"confirm\":\"초안을 삭제할까요?\",\"warning\":\"이 작업은 되돌릴 수 없습니다. 계속하려면 직접 확인하세요.\",\"cancel\":\"돌아가기\",\"done\":\"초안을 삭제했습니다.\",\"profile\":\"프로필 미리보기\",\"person\":\"제품 디자이너 · 서울\",\"details\":\"세부 설정\",\"detailBody\":\"기본 동작은 그대로 두고 추가 설정만 펼칩니다.\",\"pin\":\"고정\",\"locked\":\"잠김\",\"align\":\"정렬\",\"left\":\"왼쪽\",\"center\":\"가운데\",\"right\":\"오른쪽\",\"tools\":\"문서 도구\",\"undo\":\"실행 취소\",\"redo\":\"다시 실행\",\"save\":\"변경 저장\",\"saved\":\"로컬 예제를 저장했습니다.\",\"name\":\"표시 이름\",\"hint\":\"프로필에 표시할 이름을 입력하세요.\",\"required\":\"이름을 입력하세요.\",\"settings\":\"프로필 설정\",\"quantity\":\"좌석 수\",\"increase\":\"좌석 늘리기\",\"decrease\":\"좌석 줄이기\",\"storage\":\"저장 공간\",\"city\":\"도시 검색\",\"empty\":\"일치하는 도시가 없습니다.\",\"reset\":\"초기화\",\"editing\":\"저장 전 변경 사항\",\"quiet\":\"저장된 상태\"};\n  const [alignment, setAlignment] = React.useState<string[]>([\"left\"]);\n  return (<div className=\"grid gap-3\"><ToggleGroup aria-label={\"정렬\"} value={alignment} onValueChange={setAlignment}><ToggleGroupItem value=\"left\">{\"왼쪽\"}</ToggleGroupItem><ToggleGroupItem value=\"center\">{\"가운데\"}</ToggleGroupItem><ToggleGroupItem value=\"right\">{\"오른쪽\"}</ToggleGroupItem></ToggleGroup><output className=\"text-sm text-[var(--muted-foreground)]\">{alignment.map(value => text[value as \"left\" | \"center\" | \"right\"]).join(\", \")}</output></div>);\n}",
  "props": [
    {
      "component": "ToggleGroup",
      "name": "value / defaultValue",
      "type": "readonly string[]",
      "description": "제어 상태 또는 최초 상태를 지정합니다."
    },
    {
      "component": "ToggleGroup",
      "name": "multiple",
      "type": "boolean",
      "description": "복수 항목 선택을 허용합니다."
    },
    {
      "component": "ToggleGroup",
      "name": "orientation",
      "type": "\"horizontal\" | \"vertical\"",
      "description": "배치 방향과 키보드 이동 방향입니다."
    }
  ],
  "accessibility": [
    "그룹의 aria-label과 각 항목 이름을 제공하세요. 방향키 이동과 선택 상태를 구분합니다.",
    "render나 className을 바꿀 때 라벨 연결과 포커스 표시를 유지하세요."
  ]
},
{
  "slug": "toolbar",
  "title": "Toolbar",
  "category": "navigation-disclosure",
  "summary": "문서 작업을 한 곳에 묶는 방향키 탐색 도구 모음.",
  "description": "문서 작업을 한 곳에 묶는 방향키 탐색 도구 모음. Toolbar에 이름을 제공하세요. 비활성 항목도 기본적으로 방향키로 탐색되지만 실행되지 않습니다. 필요하면 focusableWhenDisabled={false}로 탐색에서 제외하세요.",
  "importCode": "\"use client\";\n\nimport * as React from \"react\";\nimport { Toolbar, ToolbarGroup, ToolbarButton, ToolbarSeparator } from \"@/components/ui/toolbar\";",
  "usageCode": "export default function Example() {\n  const [message, setMessage] = React.useState(\"\");\n  return (<div className=\"grid gap-3\"><Toolbar aria-label={\"문서 도구\"}><ToolbarGroup><ToolbarButton onClick={() => setMessage(\"실행 취소\")}>{\"실행 취소\"}</ToolbarButton><ToolbarButton disabled>{\"다시 실행\"}</ToolbarButton></ToolbarGroup><ToolbarSeparator /><ToolbarButton onClick={() => setMessage(\"로컬 예제를 저장했습니다.\")}>{\"변경 저장\"}</ToolbarButton></Toolbar><p role=\"status\" className=\"text-sm text-[var(--muted-foreground)]\">{message}</p></div>);\n}",
  "props": [
    {
      "component": "Toolbar",
      "name": "orientation",
      "type": "\"horizontal\" | \"vertical\"",
      "description": "배치 방향과 키보드 이동 방향입니다."
    },
    {
      "component": "Toolbar",
      "name": "loopFocus",
      "type": "boolean",
      "description": "끝에서 처음으로 키보드 포커스를 순환합니다."
    },
    {
      "component": "ToolbarButton",
      "name": "disabled",
      "type": "boolean",
      "description": "사용자 조작을 비활성화합니다."
    }
  ],
  "accessibility": [
    "Toolbar에 이름을 제공하세요. 비활성 항목도 기본적으로 방향키로 탐색되지만 실행되지 않습니다. 필요하면 focusableWhenDisabled={false}로 탐색에서 제외하세요.",
    "render나 className을 바꿀 때 라벨 연결과 포커스 표시를 유지하세요."
  ]
},
{
  "slug": "field",
  "title": "Field",
  "category": "forms-selection",
  "summary": "라벨·설명·오류를 입력과 연결하는 검증 단위.",
  "description": "라벨·설명·오류를 입력과 연결하는 검증 단위. FieldControl 또는 render로 연결한 입력을 사용하세요. 오류는 색 외에 FieldError 텍스트로 제공합니다.",
  "importCode": "\"use client\";\n\nimport * as React from \"react\";\nimport { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from \"@/components/ui/field\";",
  "usageCode": "export default function Example() {\n  const [name, setName] = React.useState(\"Alex\");\n  const nameField = <Field name=\"displayName\"><FieldLabel>{\"표시 이름\"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{\"프로필에 표시할 이름을 입력하세요.\"}</FieldDescription><FieldError match=\"valueMissing\">{\"이름을 입력하세요.\"}</FieldError></Field>;\n  return (<div className=\"grid w-full max-w-sm gap-5\">{nameField}<Field invalid><FieldLabel>{\"표시 이름\"}</FieldLabel><FieldControl defaultValue=\"\" /><FieldError match>{\"이름을 입력하세요.\"}</FieldError></Field></div>);\n}",
  "props": [
    {
      "component": "Field",
      "name": "name",
      "type": "string",
      "description": "폼 값과 서버 오류를 연결하는 필드 이름입니다."
    },
    {
      "component": "Field",
      "name": "validate",
      "type": "(value) => string | string[] | null | Promise",
      "description": "사용자 정의 검증 결과를 반환합니다."
    },
    {
      "component": "Field",
      "name": "validationMode",
      "type": "\"onSubmit\" | \"onBlur\" | \"onChange\"",
      "description": "검증을 실행할 시점을 선택합니다."
    }
  ],
  "accessibility": [
    "FieldControl 또는 render로 연결한 입력을 사용하세요. 오류는 색 외에 FieldError 텍스트로 제공합니다.",
    "render나 className을 바꿀 때 라벨 연결과 포커스 표시를 유지하세요."
  ]
},
{
  "slug": "fieldset",
  "title": "Fieldset",
  "category": "forms-selection",
  "summary": "관련 입력에 공통 제목과 비활성 상태를 제공하는 그룹.",
  "description": "관련 입력에 공통 제목과 비활성 상태를 제공하는 그룹. FieldsetLegend로 그룹의 목적을 설명하고 개별 입력에도 라벨을 남겨 두세요.",
  "importCode": "\"use client\";\n\nimport * as React from \"react\";\nimport { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from \"@/components/ui/field\";\nimport { Fieldset, FieldsetLegend } from \"@/components/ui/fieldset\";",
  "usageCode": "export default function Example() {\n  const [name, setName] = React.useState(\"Alex\");\n  const nameField = <Field name=\"displayName\"><FieldLabel>{\"표시 이름\"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{\"프로필에 표시할 이름을 입력하세요.\"}</FieldDescription><FieldError match=\"valueMissing\">{\"이름을 입력하세요.\"}</FieldError></Field>;\n  return (<Fieldset className=\"w-full max-w-sm\"><FieldsetLegend>{\"프로필 설정\"}</FieldsetLegend>{nameField}</Fieldset>);\n}",
  "props": [
    {
      "component": "Fieldset",
      "name": "disabled",
      "type": "boolean",
      "description": "사용자 조작을 비활성화합니다."
    },
    {
      "component": "FieldsetLegend",
      "name": "children",
      "type": "React.ReactNode",
      "description": "관련 필드 그룹의 제목입니다."
    },
    {
      "component": "Fieldset",
      "name": "className",
      "type": "string | function",
      "description": "기본 스타일을 확장하며 상태 함수도 지원합니다."
    }
  ],
  "accessibility": [
    "FieldsetLegend로 그룹의 목적을 설명하고 개별 입력에도 라벨을 남겨 두세요.",
    "render나 className을 바꿀 때 라벨 연결과 포커스 표시를 유지하세요."
  ]
},
{
  "slug": "form",
  "title": "Form",
  "category": "forms-selection",
  "summary": "필드 검증과 제출 오류를 함께 다루는 네이티브 폼.",
  "description": "필드 검증과 제출 오류를 함께 다루는 네이티브 폼. 저장과 초기화를 명확히 구분하세요. 예제는 로컬 상태만 갱신하며 서버 저장은 별도 구현입니다.",
  "importCode": "\"use client\";\n\nimport * as React from \"react\";\nimport { Button } from \"@/components/ui/button\";\nimport { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from \"@/components/ui/field\";\nimport { Form } from \"@/components/ui/form\";",
  "usageCode": "export default function Example() {\n  const [message, setMessage] = React.useState(\"\");\n  const [name, setName] = React.useState(\"Alex\");\n  const [savedName, setSavedName] = React.useState(\"Alex\");\n  const nameField = <Field name=\"displayName\"><FieldLabel>{\"표시 이름\"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{\"프로필에 표시할 이름을 입력하세요.\"}</FieldDescription><FieldError match=\"valueMissing\">{\"이름을 입력하세요.\"}</FieldError></Field>;\n  return (<Form className=\"w-full max-w-sm\" onFormSubmit={() => { setSavedName(name); setMessage(\"로컬 예제를 저장했습니다.\"); }} onReset={() => { setName(savedName); setMessage(\"\"); }}>\n      {nameField}<div className=\"flex flex-wrap gap-3\"><Button type=\"submit\" variant=\"primary\">{\"변경 저장\"}</Button><Button type=\"reset\">{\"초기화\"}</Button></div><p role=\"status\" className=\"text-sm text-[var(--muted-foreground)]\">{name !== savedName ? \"저장 전 변경 사항\" : message || \"저장된 상태\"}</p>\n    </Form>);\n}",
  "props": [
    {
      "component": "Form",
      "name": "onFormSubmit",
      "type": "(values, eventDetails) => void",
      "description": "검증된 폼 값을 받습니다. 네이티브 제출은 방지됩니다."
    },
    {
      "component": "Form",
      "name": "errors",
      "type": "Record<string, string | string[]>",
      "description": "필드 이름별 외부 오류를 연결합니다."
    },
    {
      "component": "Form",
      "name": "validationMode",
      "type": "\"onSubmit\" | \"onBlur\" | \"onChange\"",
      "description": "검증을 실행할 시점을 선택합니다."
    }
  ],
  "accessibility": [
    "저장과 초기화를 명확히 구분하세요. 예제는 로컬 상태만 갱신하며 서버 저장은 별도 구현입니다.",
    "render나 className을 바꿀 때 라벨 연결과 포커스 표시를 유지하세요."
  ]
},
{
  "slug": "number-field",
  "title": "Number Field",
  "category": "forms-selection",
  "summary": "범위·간격·지역별 표시를 지원하는 수량 입력.",
  "description": "범위·간격·지역별 표시를 지원하는 수량 입력. 증감 버튼마다 이름을 제공하세요. 최솟값·최댓값과 직접 입력을 함께 확인하세요.",
  "importCode": "\"use client\";\n\nimport * as React from \"react\";\nimport { NumberField, NumberFieldGroup, NumberFieldInput, NumberFieldIncrement, NumberFieldDecrement } from \"@/components/ui/number-field\";",
  "usageCode": "export default function Example() {\n  const id = React.useId();\n  return (<NumberField id={id} defaultValue={3} min={1} max={8}><label htmlFor={id} className=\"text-sm font-semibold\">{\"좌석 수\"}</label><NumberFieldGroup><NumberFieldDecrement aria-label={\"좌석 줄이기\"} /><NumberFieldInput /><NumberFieldIncrement aria-label={\"좌석 늘리기\"} /></NumberFieldGroup></NumberField>);\n}",
  "props": [
    {
      "component": "NumberField",
      "name": "min / max",
      "type": "number",
      "description": "허용하는 최솟값과 최댓값입니다."
    },
    {
      "component": "NumberField",
      "name": "step",
      "type": "number",
      "description": "버튼과 키보드의 증감 간격입니다."
    },
    {
      "component": "NumberField",
      "name": "locale / format",
      "type": "string | Intl.NumberFormatOptions",
      "description": "숫자의 지역별 표시 형식을 설정합니다."
    }
  ],
  "accessibility": [
    "증감 버튼마다 이름을 제공하세요. 최솟값·최댓값과 직접 입력을 함께 확인하세요.",
    "render나 className을 바꿀 때 라벨 연결과 포커스 표시를 유지하세요."
  ]
},
{
  "slug": "meter",
  "title": "Meter",
  "category": "data-feedback",
  "summary": "알려진 범위 안에서 사용량을 나타내는 측정 막대.",
  "description": "알려진 범위 안에서 사용량을 나타내는 측정 막대. 작업 진행률에는 Progress를 사용하세요. MeterLabel과 숫자 표시를 함께 제공하세요.",
  "importCode": "\"use client\";\n\nimport { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator } from \"@/components/ui/meter\";",
  "usageCode": "export default function Example() {\n\n  return (<Meter value={64} className=\"w-full max-w-sm\"><div className=\"flex justify-between gap-4\"><MeterLabel>{\"저장 공간\"}</MeterLabel><MeterValue /></div><MeterTrack><MeterIndicator /></MeterTrack><p className=\"text-xs text-[var(--muted-foreground)]\">64 GB / 100 GB</p></Meter>);\n}",
  "props": [
    {
      "component": "Meter",
      "name": "value",
      "type": "number",
      "description": "범위 안의 현재 측정값입니다."
    },
    {
      "component": "Meter",
      "name": "min / max",
      "type": "number",
      "description": "허용하는 최솟값과 최댓값입니다."
    },
    {
      "component": "Meter",
      "name": "format",
      "type": "Intl.NumberFormatOptions",
      "description": "숫자의 지역별 표시 형식을 설정합니다."
    }
  ],
  "accessibility": [
    "작업 진행률에는 Progress를 사용하세요. MeterLabel과 숫자 표시를 함께 제공하세요.",
    "render나 className을 바꿀 때 라벨 연결과 포커스 표시를 유지하세요."
  ]
},
{
  "slug": "combobox",
  "title": "Combobox",
  "category": "forms-selection",
  "summary": "필터링·빈 결과·키보드 선택을 지원하는 검색형 입력.",
  "description": "필터링·빈 결과·키보드 선택을 지원하는 검색형 입력. ComboboxLabel과 빈 결과 문구를 제공하세요. 방향키·Enter·Escape 및 실제 IME 입력을 확인하세요.",
  "importCode": "\"use client\";\n\nimport { Combobox, ComboboxLabel, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty } from \"@/components/ui/combobox\";",
  "usageCode": "export default function Example() {\n  const cities = [\"Busan\", \"London\", \"Seoul\", \"Tokyo\"];\n  return (<div className=\"w-full max-w-sm\"><Combobox items={cities}><ComboboxLabel>{\"도시 검색\"}</ComboboxLabel><ComboboxInput placeholder={\"도시 검색\"} /><ComboboxContent><ComboboxEmpty>{\"일치하는 도시가 없습니다.\"}</ComboboxEmpty><ComboboxList>{(city: string) => <ComboboxItem key={city} value={city}>{city}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox></div>);\n}",
  "props": [
    {
      "component": "Combobox",
      "name": "items",
      "type": "unknown[]",
      "description": "검색하고 선택할 원본 항목입니다."
    },
    {
      "component": "Combobox",
      "name": "value / onValueChange",
      "type": "Combobox.Root.Props",
      "description": "제어 상태 또는 최초 상태를 지정합니다."
    },
    {
      "component": "Combobox",
      "name": "multiple",
      "type": "boolean",
      "description": "복수 항목 선택을 허용합니다."
    }
  ],
  "accessibility": [
    "ComboboxLabel과 빈 결과 문구를 제공하세요. 방향키·Enter·Escape 및 실제 IME 입력을 확인하세요.",
    "render나 className을 바꿀 때 라벨 연결과 포커스 표시를 유지하세요."
  ]
},
{
  "slug": "calendar",
  "title": "Calendar",
  "category": "forms-selection",
  "summary": "단일 날짜와 기간을 선택하는 뉴모피즘 달력.",
  "description": "DayPicker v10의 날짜 계산과 키보드 탐색을 유지합니다. 선택한 날짜는 inset으로, 기간의 중간 날짜는 연결된 표면으로 구분합니다.",
  "importCode": "\"use client\";\n\nimport * as React from \"react\";\nimport type { DateRange } from \"@daypicker/react\";\nimport { enUS, ko, ja, zhCN } from \"@daypicker/react/locale\";\nimport { Calendar } from \"@/components/ui/calendar\";\nimport { Button } from \"@/components/ui/button\";",
  "usageCode": "const locales = { en: enUS, ko, ja, zh: zhCN };\nconst copy = {\n  en: { single: \"Single date\", range: \"Date range\", clear: \"Clear range\", empty: \"No date selected\" },\n  ko: { single: \"날짜 선택\", range: \"기간 선택\", clear: \"기간 초기화\", empty: \"선택한 날짜 없음\" },\n  ja: { single: \"日付選択\", range: \"期間選択\", clear: \"期間をクリア\", empty: \"日付未選択\" },\n  zh: { single: \"选择日期\", range: \"选择范围\", clear: \"清除范围\", empty: \"未选择日期\" },\n};\nfunction stamp(date: Date) {\n  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, \"0\")}-${String(date.getDate()).padStart(2, \"0\")}`;\n}\n\nexport default function CalendarExample({ locale = \"ko\" }: { locale?: keyof typeof copy }) {\n  const text = copy[locale];\n  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 15));\n  const [range, setRange] = React.useState<DateRange | undefined>({ from: new Date(2026, 8, 12), to: new Date(2026, 8, 17) });\n  return <div className=\"flex max-w-full flex-wrap items-start gap-6\">\n    <section data-calendar=\"single\" aria-label={text.single} className=\"grid max-w-full gap-3\"><h3 className=\"text-sm font-semibold\">{text.single}</h3><Calendar mode=\"single\" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 8)} today={new Date(2026, 8, 15)} disabled={new Date(2026, 8, 20)} locale={locales[locale]} /><output aria-live=\"polite\" data-testid=\"calendar-value\" className=\"text-sm text-[var(--muted-foreground)]\">{date ? stamp(date) : text.empty}</output></section>\n    <section data-calendar=\"range\" aria-label={text.range} className=\"grid max-w-full gap-3\"><h3 className=\"text-sm font-semibold\">{text.range}</h3><Calendar mode=\"range\" selected={range} onSelect={setRange} defaultMonth={new Date(2026, 8)} today={new Date(2026, 8, 15)} locale={locales[locale]} /><output aria-live=\"polite\" data-testid=\"calendar-range\" className=\"text-sm text-[var(--muted-foreground)]\">{range?.from ? `${stamp(range.from)} / ${range.to ? stamp(range.to) : \"…\"}` : text.empty}</output><Button size=\"sm\" onClick={() => setRange(undefined)}>{text.clear}</Button></section>\n  </div>;\n}",
  "props": [
    {
      "component": "Calendar",
      "name": "mode",
      "type": "\"single\" | \"multiple\" | \"range\"",
      "description": "날짜 선택 방식을 지정합니다."
    },
    {
      "component": "Calendar",
      "name": "selected / onSelect",
      "type": "Date | Date[] | DateRange / callback",
      "description": "선택 값과 변경 콜백을 연결합니다."
    },
    {
      "component": "Calendar",
      "name": "disabled / locale / startMonth / endMonth",
      "type": "DayPickerProps",
      "description": "비활성 날짜, 언어, 이동 가능한 월을 지정합니다."
    }
  ],
  "accessibility": [
    "방향키로 날짜를 이동하고 Enter 또는 Space로 선택합니다.",
    "기간의 시작·끝, 오늘, 비활성 날짜를 별도로 표시합니다. 라이브러리의 접근성 라벨을 유지하세요."
  ]
},
{
  "slug": "date-picker",
  "title": "Date Picker",
  "category": "forms-selection",
  "summary": "팝오버에서 날짜를 고르고 지우는 날짜 입력.",
  "description": "상위 컴포넌트가 선택 값을 관리합니다. name을 지정하면 숨겨진 입력에 현지 날짜를 YYYY-MM-DD 형식으로 기록하며 UTC 변환으로 날짜가 바뀌지 않습니다. 예제의 초기화도 상위 상태를 갱신합니다.",
  "importCode": "\"use client\";\n\nimport * as React from \"react\";\nimport { enUS, ko, ja, zhCN } from \"@daypicker/react/locale\";\nimport { DatePicker } from \"@/components/ui/date-picker\";\nimport { Button } from \"@/components/ui/button\";",
  "usageCode": "const locales = { en: enUS, ko, ja, zh: zhCN };\nconst copy = {\n  en: { label: \"Due date\", choose: \"Select date\", clear: \"Clear date\", locked: \"Locked date\", reset: \"Reset date\", hint: \"Dates are stored as local calendar dates, not UTC timestamps.\" },\n  ko: { label: \"마감일\", choose: \"날짜 선택\", clear: \"날짜 지우기\", locked: \"변경 불가 날짜\", reset: \"날짜 초기화\", hint: \"날짜는 UTC 시각이 아닌 현지 달력의 날짜로 저장됩니다.\" },\n  ja: { label: \"期限\", choose: \"日付を選択\", clear: \"日付をクリア\", locked: \"変更不可の日付\", reset: \"日付をリセット\", hint: \"UTC時刻ではなく、現地のカレンダー日付として保存します。\" },\n  zh: { label: \"截止日期\", choose: \"选择日期\", clear: \"清除日期\", locked: \"锁定日期\", reset: \"重置日期\", hint: \"日期按本地日历保存，而非 UTC 时间戳。\" },\n};\n\nexport default function DatePickerExample({ locale = \"ko\" }: { locale?: keyof typeof copy }) {\n  const text = copy[locale];\n  const id = React.useId();\n  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 15));\n  return <form className=\"grid w-full max-w-sm gap-4\" onSubmit={event => event.preventDefault()} onReset={() => setDate(new Date(2026, 8, 15))}>\n    <label htmlFor={id} className=\"text-sm font-semibold\">{text.label}</label>\n    <DatePicker id={id} name=\"dueDate\" label={text.label} value={date} onValueChange={setDate} locale={locales[locale]} placeholder={text.choose} clearLabel={text.clear} describedBy={`${id}-hint`} disabledDates={{ before: new Date(2026, 8, 10) }} startMonth={new Date(2026, 8)} endMonth={new Date(2027, 11)} />\n    <p id={`${id}-hint`} className=\"text-sm leading-relaxed text-[var(--muted-foreground)]\">{text.hint}</p>\n    <Button type=\"reset\" size=\"sm\" className=\"w-fit\">{text.reset}</Button>\n    <DatePicker label={text.locked} value={new Date(2026, 8, 15)} onValueChange={() => {}} disabled locale={locales[locale]} clearLabel={text.clear} />\n  </form>;\n}",
  "props": [
    {
      "component": "DatePicker",
      "name": "value / onValueChange",
      "type": "Date | undefined / callback",
      "description": "현재 날짜와 변경 콜백입니다. 빈 값은 undefined입니다."
    },
    {
      "component": "DatePicker",
      "name": "label / name / describedBy",
      "type": "string",
      "description": "버튼 이름, 폼 필드 이름, 설명 요소 ID입니다."
    },
    {
      "component": "DatePicker",
      "name": "disabledDates / startMonth / endMonth",
      "type": "Matcher | Matcher[] / Date",
      "description": "선택 불가 날짜와 달력 이동 범위를 지정합니다."
    }
  ],
  "accessibility": [
    "열리면 달력으로 포커스가 이동하고 닫히면 트리거로 돌아옵니다.",
    "폼의 필수값 검증은 상위 폼에서 처리하세요. invalid와 describedBy로 오류를 연결할 수 있습니다."
  ]
},
{
  "slug": "data-table",
  "title": "Data Table",
  "category": "data-feedback",
  "summary": "검색·필터·정렬·선택·페이지 이동을 조합하는 데이터 표.",
  "description": "데이터와 상태는 TanStack Table 인스턴스가 소유하며 UI는 표의 렌더링을 담당합니다. 예제는 고정된 행 ID로 페이지와 필터가 바뀌어도 선택을 유지합니다. 데이터는 예시입니다.",
  "importCode": "\"use client\";\n\nimport * as React from \"react\";\nimport { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, type ColumnDef } from \"@tanstack/react-table\";\nimport { DataTable, DataTableColumnHeader, DataTablePagination } from \"@/components/ui/data-table\";\nimport { Checkbox } from \"@/components/ui/checkbox\";\nimport { Input } from \"@/components/ui/input\";\nimport { Select, SelectItem } from \"@/components/ui/select\";\nimport { Button } from \"@/components/ui/button\";",
  "usageCode": "type Project = { id: string; name: string; status: \"active\" | \"paused\"; seats: number };\nconst data: Project[] = [\n  { id: \"p1\", name: \"Atlas\", status: \"active\", seats: 12 },\n  { id: \"p2\", name: \"Beacon\", status: \"paused\", seats: 4 },\n  { id: \"p3\", name: \"Cedar\", status: \"active\", seats: 8 },\n  { id: \"p4\", name: \"Delta\", status: \"active\", seats: 20 },\n  { id: \"p5\", name: \"Echo\", status: \"paused\", seats: 6 },\n  { id: \"p6\", name: \"Foxtrot\", status: \"active\", seats: 16 },\n  { id: \"p7\", name: \"Grove\", status: \"active\", seats: 3 },\n  { id: \"p8\", name: \"Harbor\", status: \"paused\", seats: 10 },\n];\nconst copy = {\n  en: { name: \"Project\", status: \"Status\", seats: \"Seats\", search: \"Search projects\", all: \"All statuses\", active: \"Active\", paused: \"Paused\", selectPage: \"Select current page\", select: \"Select\", selected: \"Selected across all pages\", clear: \"Clear selection\", empty: \"No matching projects.\", caption: \"Workspace projects — illustrative data\", previous: \"Previous\", next: \"Next\", rows: \"Rows per page\", page: \"Page\" },\n  ko: { name: \"프로젝트\", status: \"상태\", seats: \"좌석\", search: \"프로젝트 검색\", all: \"전체 상태\", active: \"활성\", paused: \"일시 중지\", selectPage: \"현재 페이지 전체 선택\", select: \"선택\", selected: \"전체 페이지에서 선택됨\", clear: \"선택 해제\", empty: \"일치하는 프로젝트가 없습니다.\", caption: \"워크스페이스 프로젝트 — 예시 데이터\", previous: \"이전\", next: \"다음\", rows: \"페이지당 행\", page: \"페이지\" },\n  ja: { name: \"プロジェクト\", status: \"状態\", seats: \"座席\", search: \"プロジェクトを検索\", all: \"すべての状態\", active: \"有効\", paused: \"一時停止\", selectPage: \"現在のページを選択\", select: \"選択\", selected: \"全ページの選択数\", clear: \"選択解除\", empty: \"一致するプロジェクトはありません。\", caption: \"ワークスペース — サンプルデータ\", previous: \"前へ\", next: \"次へ\", rows: \"ページあたりの行\", page: \"ページ\" },\n  zh: { name: \"项目\", status: \"状态\", seats: \"座位\", search: \"搜索项目\", all: \"全部状态\", active: \"活跃\", paused: \"暂停\", selectPage: \"选择当前页\", select: \"选择\", selected: \"所有页面已选\", clear: \"清除选择\", empty: \"没有匹配的项目。\", caption: \"工作区项目 — 示例数据\", previous: \"上一页\", next: \"下一页\", rows: \"每页行数\", page: \"页\" },\n};\n\nexport default function DataTableExample({ locale = \"ko\" }: { locale?: keyof typeof copy }) {\n  const text = copy[locale];\n  const columns = React.useMemo<ColumnDef<Project>[]>(() => [\n    { id: \"selection\", enableSorting: false, enableGlobalFilter: false,\n      header: ({ table }) => <Checkbox aria-label={text.selectPage} checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? \"indeterminate\" : false} onCheckedChange={checked => table.toggleAllPageRowsSelected(checked === true)} />,\n      cell: ({ row }) => <Checkbox aria-label={`${text.select} ${row.original.name}`} checked={row.getIsSelected()} onCheckedChange={checked => row.toggleSelected(checked === true)} /> },\n    { accessorKey: \"name\", header: ({ column }) => <DataTableColumnHeader column={column} title={text.name} /> },\n    { accessorKey: \"status\", header: text.status, enableSorting: false, filterFn: \"equalsString\", cell: ({ row }) => <span className=\"inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium\"><span aria-hidden=\"true\">{row.original.status === \"active\" ? \"●\" : \"Ⅱ\"}</span>{text[row.original.status]}</span> },\n    { accessorKey: \"seats\", header: ({ column }) => <DataTableColumnHeader column={column} title={text.seats} />, cell: ({ row }) => <span className=\"tabular-nums\">{row.original.seats}</span> },\n  ], [text]);\n  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(), getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageIndex: 0, pageSize: 5 } } });\n  return <div className=\"grid w-full min-w-0 gap-4\">\n    <DataTable table={table} caption={text.caption} emptyMessage={text.empty}>\n      <div className=\"flex flex-wrap items-center gap-3\"><Input aria-label={text.search} placeholder={text.search} className=\"min-w-0 flex-1 basis-44\" value={(table.getState().globalFilter as string) ?? \"\"} onChange={event => { table.setGlobalFilter(event.target.value); table.setPageIndex(0); }} /><div className=\"w-40 max-w-full\"><Select aria-label={text.status} value={(table.getColumn(\"status\")?.getFilterValue() as string) ?? \"\"} onChange={event => { table.getColumn(\"status\")?.setFilterValue(event.target.value || undefined); table.setPageIndex(0); }}><SelectItem value=\"\">{text.all}</SelectItem><SelectItem value=\"active\">{text.active}</SelectItem><SelectItem value=\"paused\">{text.paused}</SelectItem></Select></div></div>\n    </DataTable>\n    <div className=\"flex flex-wrap items-center justify-between gap-2\"><output data-testid=\"selected-rows\" className=\"text-sm text-[var(--muted-foreground)]\">{text.selected}: {table.getSelectedRowModel().rows.length}</output><Button variant=\"ghost\" size=\"sm\" disabled={!table.getSelectedRowModel().rows.length} onClick={() => table.resetRowSelection()}>{text.clear}</Button></div>\n    <DataTablePagination table={table} labels={{ previous: text.previous, next: text.next, rowsPerPage: text.rows, page: (current, total) => `${text.page} ${current} / ${total}` }} />\n  </div>;\n}",
  "props": [
    {
      "component": "DataTable",
      "name": "table",
      "type": "Table<TData>",
      "description": "행 모델과 상태를 가진 TanStack Table 인스턴스입니다."
    },
    {
      "component": "DataTable",
      "name": "caption / emptyMessage / children",
      "type": "string / ReactNode",
      "description": "표 제목, 빈 결과 문구, 검색·필터 도구를 전달합니다."
    },
    {
      "component": "DataTablePagination",
      "name": "labels / pageSizes",
      "type": "PaginationLabels / number[]",
      "description": "이전·다음 버튼, 페이지 문구와 페이지 크기를 지정합니다."
    }
  ],
  "accessibility": [
    "표 제목과 열의 aria-sort, 키보드로 접근할 수 있는 스크롤 영역을 제공합니다.",
    "현재 페이지 선택과 전체 선택 개수를 구분하세요. 서버 페이지 방식에서는 선택 상태를 별도로 관리해야 합니다."
  ]
},
{
  "slug": "toast",
  "title": "Toast",
  "category": "data-feedback",
  "summary": "결과 안내와 실행 취소를 제공하는 알림.",
  "description": "기존 Base UI Toast로 알림 수명과 접근성을 처리합니다. 예제는 성공·오류·실행 취소와 자동 닫힘을 보여주며 서버에 저장하지 않습니다. 알림 본문은 읽기 쉬운 전경색을 유지합니다.",
  "importCode": "\"use client\";\n\nimport * as React from \"react\";\nimport { Button } from \"@/components/ui/button\";\nimport { ToastProvider, Toaster, useToast } from \"@/components/ui/toast\";",
  "usageCode": "const copy = {\n  en: { save: \"Show success\", success: \"Changes saved\", body: \"This is a local demonstration. No server request was made.\", fail: \"Show error\", error: \"Could not save\", retry: \"Your changes are retained. Try again.\", archive: \"Archive draft\", archived: \"Draft archived\", undo: \"Undo\", undone: \"Archive undone\", idle: \"Draft available\", timed: \"Show timed toast\", quick: \"Quick update\", region: \"Notifications\", close: \"Dismiss notification\" },\n  ko: { save: \"성공 알림\", success: \"변경 사항 저장됨\", body: \"로컬 예제이며 서버 요청은 전송하지 않습니다.\", fail: \"오류 알림\", error: \"저장하지 못했습니다\", retry: \"변경 사항은 유지됩니다. 다시 시도하세요.\", archive: \"초안 보관\", archived: \"초안이 보관되었습니다\", undo: \"실행 취소\", undone: \"보관을 취소했습니다\", idle: \"초안 사용 가능\", timed: \"자동 닫힘 알림\", quick: \"업데이트 알림\", region: \"알림\", close: \"알림 닫기\" },\n  ja: { save: \"成功通知\", success: \"変更を保存しました\", body: \"ローカル例です。サーバーへの送信は行いません。\", fail: \"エラー通知\", error: \"保存できませんでした\", retry: \"変更は保持されています。再試行してください。\", archive: \"下書きを保管\", archived: \"下書きを保管しました\", undo: \"元に戻す\", undone: \"保管を取り消しました\", idle: \"下書き利用可能\", timed: \"自動で閉じる通知\", quick: \"更新通知\", region: \"通知\", close: \"通知を閉じる\" },\n  zh: { save: \"成功通知\", success: \"更改已保存\", body: \"这是本地示例，未发送服务器请求。\", fail: \"错误通知\", error: \"保存失败\", retry: \"更改仍然保留，请重试。\", archive: \"归档草稿\", archived: \"草稿已归档\", undo: \"撤销\", undone: \"已撤销归档\", idle: \"草稿可用\", timed: \"自动关闭通知\", quick: \"更新通知\", region: \"通知\", close: \"关闭通知\" },\n};\n\nfunction ToastActions({ locale }: { locale: keyof typeof copy }) {\n  const text = copy[locale];\n  const manager = useToast();\n  const [status, setStatus] = React.useState<string>(text.idle);\n  return <div className=\"grid gap-4\"><div className=\"flex flex-wrap gap-3\">\n    <Button onClick={() => manager.add({ title: text.success, description: text.body, type: \"success\" })}>{text.save}</Button>\n    <Button onClick={() => manager.add({ title: text.error, description: text.retry, type: \"error\" })}>{text.fail}</Button>\n    <Button onClick={() => { setStatus(text.archived); const id = manager.add({ title: text.archived, description: text.body, actionProps: { children: text.undo, onClick: () => { setStatus(text.undone); manager.close(id); } } }); }}>{text.archive}</Button>\n    <Button onClick={() => manager.add({ title: text.quick, timeout: 1200 })}>{text.timed}</Button>\n  </div><p role=\"status\" className=\"text-sm text-[var(--muted-foreground)]\">{status}</p></div>;\n}\n\nexport default function ToastExample({ locale = \"ko\" }: { locale?: keyof typeof copy }) {\n  // Keep examples available for inspection; the timed example overrides this.\n  return <ToastProvider timeout={0}><ToastActions locale={locale} /><Toaster label={copy[locale].region} closeLabel={copy[locale].close} /></ToastProvider>;\n}",
  "props": [
    {
      "component": "ToastProvider",
      "name": "timeout / limit / toastManager",
      "type": "number / ToastManager",
      "description": "표시 시간, 최대 표시 개수와 선택적 외부 매니저입니다. timeout 0은 자동 닫힘을 끕니다."
    },
    {
      "component": "useToast",
      "name": "add / close / update / promise",
      "type": "Base UI toast manager methods",
      "description": "알림 생성·닫기·갱신·비동기 상태를 제어합니다."
    },
    {
      "component": "Toaster",
      "name": "label / closeLabel",
      "type": "string",
      "description": "알림 영역과 닫기 버튼의 접근성 문구입니다."
    }
  ],
  "accessibility": [
    "F6로 알림 영역에 접근할 수 있습니다. 색상만이 아닌 제목과 설명으로 결과를 전달하세요.",
    "중요한 복구 동작은 알림에만 두지 말고 화면에도 제공하세요. 예제는 검토를 위해 수동 닫힘을 기본으로 사용합니다."
  ]
},
{
  "slug": "navigation-menu",
  "title": "Navigation Menu",
  "category": "navigation-disclosure",
  "summary": "링크와 팝업을 결합한 키보드 접근 가능한 사이트 탐색.",
  "description": "Base UI의 탐색 상태를 유지하고 열린 메뉴를 inset 표면으로 표현합니다. NavigationMenuViewport를 루트 안에 한 번 배치합니다.",
  "props": [
    {
      "component": "NavigationMenu",
      "name": "value / onValueChange",
      "type": "NavigationMenu.Root.Props",
      "description": "현재 열린 항목과 변경 콜백입니다."
    },
    {
      "component": "NavigationMenuLink",
      "name": "render",
      "type": "ReactElement",
      "description": "프레임워크 링크를 render로 연결합니다."
    },
    {
      "component": "NavigationMenuViewport",
      "name": "side / align / sideOffset",
      "type": "NavigationMenuViewportProps",
      "description": "팝업의 위치와 여백을 지정합니다."
    }
  ],
  "accessibility": [
    "사이트 이동에는 실제 href 링크를 사용하고 nav에 이름을 부여하세요.",
    "Tab·방향키·Escape로 조작하고, 포커스 표시를 제거하지 마세요."
  ],
  "importCode": "\"use client\";\nimport { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport } from \"@/components/ui/navigation-menu\";",
  "usageCode": "export default function Example() {\n  return <div><NavigationMenu aria-label=\"제품\"><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>제품</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href=\"#navigation-guide\">안내</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem></NavigationMenuList><NavigationMenuViewport /></NavigationMenu><p id=\"navigation-guide\">안내</p></div>;\n}"
},
{
  "slug": "menubar",
  "title": "Menubar",
  "category": "navigation-disclosure",
  "summary": "방향키로 이동하는 애플리케이션 명령 메뉴.",
  "description": "Menubar는 포커스 이동을, 기존 Dropdown Menu 부품은 팝업·선택 동작을 담당합니다.",
  "props": [
    {
      "component": "Menubar",
      "name": "orientation",
      "type": "\"horizontal\" | \"vertical\"",
      "description": "키보드 이동 방향을 지정합니다."
    },
    {
      "component": "MenubarTrigger",
      "name": "disabled",
      "type": "boolean",
      "description": "메뉴 트리거를 비활성화합니다."
    },
    {
      "component": "MenubarCheckboxItem",
      "name": "checked / onCheckedChange",
      "type": "boolean / (checked: boolean) => void",
      "description": "체크 항목의 제어 상태입니다."
    }
  ],
  "accessibility": [
    "페이지 이동이 아닌 명령에 사용하고 menubar에 이름을 부여하세요.",
    "방향키로 메뉴 사이를 이동합니다. 비활성 항목은 실행되지 않습니다."
  ],
  "importCode": "\"use client\";\nimport * as React from \"react\";\nimport { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarCheckboxItem } from \"@/components/ui/menubar\";",
  "usageCode": "export default function Example() {\n  const [visible, setVisible] = React.useState(true);\n  const [message, setMessage] = React.useState(\"준비됨\");\n  return <div><Menubar aria-label=\"파일\"><MenubarMenu><MenubarTrigger>파일</MenubarTrigger><MenubarContent><MenubarItem onClick={() => setMessage(\"문서를 만들었습니다\")}>새 문서</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>보기</MenubarTrigger><MenubarContent><MenubarCheckboxItem checked={visible} onCheckedChange={setVisible}>상태 표시</MenubarCheckboxItem></MenubarContent></MenubarMenu></Menubar>{visible && <p role=\"status\">{message}</p>}</div>;\n}"
},
] as const satisfies readonly ComponentDoc[];

const componentDocsBySlug = new Map<string, ComponentDoc>(
  componentDocs.map((component) => [component.slug, component] as const),
);

export const componentDocGroups = componentDocCategories.map((category) => ({
  category,
  items: componentDocs.filter((component) => component.category === category.id),
}));

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return componentDocsBySlug.get(slug);
}
