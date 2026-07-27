import type { Locale } from "@/i18n/config";

export type ShowcaseMessages = {
  ariaLabel: string;
  form: {
    title: string;
    description: string;
    workspace: string;
    search: string;
    role: string;
    designer: string;
    developer: string;
    founder: string;
    density: string;
    compact: string;
    comfortable: string;
    depthIntensity: string;
    productUpdates: string;
    followSystemTheme: string;
    note: string;
    noteValue: string;
  };
  navigation: {
    title: string;
    description: string;
    breadcrumb: string;
    registry: string;
    components: string;
    tabs: string;
    surface: string;
    motion: string;
    access: string;
    surfaceDescription: string;
    motionDescription: string;
    accessDescription: string;
    pagination: string;
    previousPage: string;
    previous: string;
    nextPage: string;
    next: string;
  };
  feedback: {
    title: string;
    description: string;
    registryConnected: string;
    registryDescription: string;
    themeSetup: string;
    themeSetupProgress: string;
    designSystems: string;
    sharedSurfaceTokens: string;
    additionalMembers: string;
  };
  actions: {
    title: string;
    description: string;
    openDialog: string;
    dialogTitle: string;
    dialogDescription: string;
    cancel: string;
    create: string;
    openMenu: string;
    workspace: string;
    duplicate: string;
    showDepthGrid: string;
    delete: string;
    component: string;
    category: string;
    status: string;
    overlay: string;
    data: string;
    navigation: string;
    ready: string;
    accordionQuestion: string;
    accordionAnswer: string;
  };
};

export const showcaseMessages = {
  ko: {
    ariaLabel: "컴포넌트 실시간 미리보기",
    form: {
      title: "입력과 선택",
      description: "폼 컨트롤도 같은 광원과 눌림 깊이를 공유합니다.",
      workspace: "워크스페이스",
      search: "검색",
      role: "역할",
      designer: "디자이너",
      developer: "개발자",
      founder: "창업자",
      density: "밀도",
      compact: "컴팩트",
      comfortable: "편안함",
      depthIntensity: "깊이 강도",
      productUpdates: "제품 업데이트",
      followSystemTheme: "시스템 테마 따르기",
      note: "메모",
      noteValue: "부드러운 표면도 명확하고 빠르며 접근 가능해야 합니다.",
    },
    navigation: {
      title: "계층과 이동",
      description: "현재 위치와 다음 행동을 깊이 차이로 구분합니다.",
      breadcrumb: "경로 탐색",
      registry: "Registry",
      components: "Components",
      tabs: "Tabs",
      surface: "표면",
      motion: "모션",
      access: "접근성",
      surfaceDescription:
        "raised, inset, flat 세 단계로 정보 계층을 만듭니다.",
      motionDescription: "짧은 전환으로 표면의 물성을 보존합니다.",
      accessDescription:
        "키보드 포커스와 명시적인 테두리를 유지합니다.",
      pagination: "페이지 이동",
      previousPage: "이전 페이지로 이동",
      previous: "이전",
      nextPage: "다음 페이지로 이동",
      next: "다음",
    },
    feedback: {
      title: "상태와 진행",
      description: "색상뿐 아니라 테두리와 깊이로 상태를 전달합니다.",
      registryConnected: "Registry 연결됨",
      registryDescription: "26개 컴포넌트 중 필요한 항목만 설치할 수 있습니다.",
      themeSetup: "테마 설정",
      themeSetupProgress: "테마 설정 진행률",
      designSystems: "디자인 시스템",
      sharedSurfaceTokens: "공유 표면 토큰",
      additionalMembers: "추가 멤버 8명",
    },
    actions: {
      title: "행동과 데이터",
      description:
        "오버레이는 접근 가능한 포커스 동작을, 표는 선명한 구조를 제공합니다.",
      openDialog: "Dialog 열기",
      dialogTitle: "부드러운 표면 만들기",
      dialogDescription:
        "Registry 소스를 설치한 뒤 프로젝트 안에서 직접 수정할 수 있습니다.",
      cancel: "취소",
      create: "생성",
      openMenu: "메뉴 열기",
      workspace: "워크스페이스",
      duplicate: "복제",
      showDepthGrid: "깊이 그리드 표시",
      delete: "삭제",
      component: "컴포넌트",
      category: "카테고리",
      status: "상태",
      overlay: "오버레이",
      data: "데이터",
      navigation: "탐색",
      ready: "준비됨",
      accordionQuestion: "각 컴포넌트는 따로 설치되나요?",
      accordionAnswer:
        "네. 필요한 항목만 CLI로 가져오며 소스는 프로젝트 안에 남습니다.",
    },
  },
  en: {
    ariaLabel: "Live component preview",
    form: {
      title: "Input and selection",
      description:
        "Form controls share the same light source and pressed depth.",
      workspace: "Workspace",
      search: "Search",
      role: "Role",
      designer: "Designer",
      developer: "Developer",
      founder: "Founder",
      density: "Density",
      compact: "Compact",
      comfortable: "Comfort",
      depthIntensity: "Depth intensity",
      productUpdates: "Product updates",
      followSystemTheme: "Follow system theme",
      note: "Note",
      noteValue:
        "Soft surfaces should still feel clear, fast, and accessible.",
    },
    navigation: {
      title: "Hierarchy and navigation",
      description:
        "Depth differences distinguish the current location from the next action.",
      breadcrumb: "Breadcrumb",
      registry: "Registry",
      components: "Components",
      tabs: "Tabs",
      surface: "Surface",
      motion: "Motion",
      access: "Access",
      surfaceDescription:
        "Raised, inset, and flat create three levels of information hierarchy.",
      motionDescription:
        "Short transitions preserve the physical feel of each surface.",
      accessDescription:
        "Keyboard focus and explicit borders remain clearly visible.",
      pagination: "Pagination",
      previousPage: "Go to previous page",
      previous: "Previous",
      nextPage: "Go to next page",
      next: "Next",
    },
    feedback: {
      title: "Status and progress",
      description:
        "Borders and depth communicate status alongside color.",
      registryConnected: "Registry connected",
      registryDescription:
        "Install only the components you need from the set of 26.",
      themeSetup: "Theme setup",
      themeSetupProgress: "Theme setup progress",
      designSystems: "Design systems",
      sharedSurfaceTokens: "Shared surface tokens",
      additionalMembers: "8 additional members",
    },
    actions: {
      title: "Actions and data",
      description:
        "Overlays provide accessible focus behavior while tables provide a clear structure.",
      openDialog: "Open dialog",
      dialogTitle: "Create a soft surface",
      dialogDescription:
        "Install the Registry source, then edit it directly inside your project.",
      cancel: "Cancel",
      create: "Create",
      openMenu: "Open menu",
      workspace: "Workspace",
      duplicate: "Duplicate",
      showDepthGrid: "Show depth grid",
      delete: "Delete",
      component: "Component",
      category: "Category",
      status: "Status",
      overlay: "Overlay",
      data: "Data",
      navigation: "Navigation",
      ready: "Ready",
      accordionQuestion: "Is each component installed separately?",
      accordionAnswer:
        "Yes. The CLI adds only the items you need, and their source remains in your project.",
    },
  },
  zh: {
    ariaLabel: "组件实时预览",
    form: {
      title: "输入与选择",
      description: "表单控件共享同一光源和按压深度。",
      workspace: "工作区",
      search: "搜索",
      role: "角色",
      designer: "设计师",
      developer: "开发者",
      founder: "创始人",
      density: "密度",
      compact: "紧凑",
      comfortable: "舒适",
      depthIntensity: "深度强度",
      productUpdates: "产品更新",
      followSystemTheme: "跟随系统主题",
      note: "备注",
      noteValue: "柔和的表面也应保持清晰、高效且易于访问。",
    },
    navigation: {
      title: "层级与导航",
      description: "通过深度差异区分当前位置与下一步操作。",
      breadcrumb: "路径导航",
      registry: "Registry",
      components: "Components",
      tabs: "Tabs",
      surface: "表面",
      motion: "动效",
      access: "无障碍",
      surfaceDescription:
        "通过 raised、inset、flat 三个层级构建信息层次。",
      motionDescription: "使用简短过渡保留表面的实体质感。",
      accessDescription: "保留清晰的键盘焦点和明确边框。",
      pagination: "分页导航",
      previousPage: "前往上一页",
      previous: "上一页",
      nextPage: "前往下一页",
      next: "下一页",
    },
    feedback: {
      title: "状态与进度",
      description: "除颜色外，还通过边框和深度传达状态。",
      registryConnected: "Registry 已连接",
      registryDescription: "可从 26 个组件中按需选择安装。",
      themeSetup: "主题设置",
      themeSetupProgress: "主题设置进度",
      designSystems: "设计系统",
      sharedSurfaceTokens: "共享表面 token",
      additionalMembers: "另外 8 名成员",
    },
    actions: {
      title: "操作与数据",
      description: "浮层提供无障碍焦点行为，表格提供清晰的数据结构。",
      openDialog: "打开 Dialog",
      dialogTitle: "创建柔和表面",
      dialogDescription:
        "安装 Registry 源码后，即可在项目内直接修改。",
      cancel: "取消",
      create: "创建",
      openMenu: "打开菜单",
      workspace: "工作区",
      duplicate: "复制",
      showDepthGrid: "显示深度网格",
      delete: "删除",
      component: "组件",
      category: "类别",
      status: "状态",
      overlay: "浮层",
      data: "数据",
      navigation: "导航",
      ready: "就绪",
      accordionQuestion: "每个组件都可以单独安装吗？",
      accordionAnswer:
        "可以。CLI 只会添加所需项目，源码会保留在你的项目中。",
    },
  },
  ja: {
    ariaLabel: "コンポーネントのライブプレビュー",
    form: {
      title: "入力と選択",
      description:
        "フォームコントロールも同じ光源と押下時の深度を共有します。",
      workspace: "ワークスペース",
      search: "検索",
      role: "役割",
      designer: "デザイナー",
      developer: "開発者",
      founder: "創業者",
      density: "密度",
      compact: "コンパクト",
      comfortable: "ゆったり",
      depthIntensity: "深度の強さ",
      productUpdates: "製品アップデート",
      followSystemTheme: "システムテーマに合わせる",
      note: "メモ",
      noteValue:
        "柔らかなサーフェスでも、明確さ、速さ、アクセシビリティを保つ必要があります。",
    },
    navigation: {
      title: "階層とナビゲーション",
      description: "現在地と次の操作を深度の違いで区別します。",
      breadcrumb: "パンくずリスト",
      registry: "Registry",
      components: "Components",
      tabs: "Tabs",
      surface: "サーフェス",
      motion: "モーション",
      access: "アクセシビリティ",
      surfaceDescription:
        "raised、inset、flat の3段階で情報の階層を作ります。",
      motionDescription:
        "短いトランジションでサーフェスの質感を保ちます。",
      accessDescription:
        "キーボードフォーカスと明示的なボーダーを維持します。",
      pagination: "ページ移動",
      previousPage: "前のページへ移動",
      previous: "前へ",
      nextPage: "次のページへ移動",
      next: "次へ",
    },
    feedback: {
      title: "状態と進捗",
      description: "色だけでなく、ボーダーと深度でも状態を伝えます。",
      registryConnected: "Registry に接続済み",
      registryDescription:
        "26個のコンポーネントから必要なものだけを選んでインストールできます。",
      themeSetup: "テーマ設定",
      themeSetupProgress: "テーマ設定の進捗",
      designSystems: "デザインシステム",
      sharedSurfaceTokens: "共有サーフェス token",
      additionalMembers: "ほか8人のメンバー",
    },
    actions: {
      title: "操作とデータ",
      description:
        "オーバーレイはアクセシブルなフォーカス動作を、テーブルは明確な構造を提供します。",
      openDialog: "Dialog を開く",
      dialogTitle: "柔らかなサーフェスを作成",
      dialogDescription:
        "Registry のソースをインストールした後、プロジェクト内で直接編集できます。",
      cancel: "キャンセル",
      create: "作成",
      openMenu: "メニューを開く",
      workspace: "ワークスペース",
      duplicate: "複製",
      showDepthGrid: "深度グリッドを表示",
      delete: "削除",
      component: "コンポーネント",
      category: "カテゴリー",
      status: "状態",
      overlay: "オーバーレイ",
      data: "データ",
      navigation: "ナビゲーション",
      ready: "準備完了",
      accordionQuestion:
        "各コンポーネントは個別にインストールできますか？",
      accordionAnswer:
        "はい。CLI は必要な項目だけを追加し、ソースはプロジェクト内に残ります。",
    },
  },
} satisfies Record<Locale, ShowcaseMessages>;
