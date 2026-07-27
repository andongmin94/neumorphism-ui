import type { Locale } from "@/i18n/config";

const ko = {
  accordion: {
    items: [
      {
        question: "스타일 토큰도 함께 설치되나요?",
        answer:
          "첫 컴포넌트를 추가할 때 뉴모피즘 surface, shadow, radius 토큰이 프로젝트 CSS에 함께 연결됩니다.",
      },
      {
        question: "설치 후 소스를 수정할 수 있나요?",
        answer:
          "네. 패키지 안에 감추지 않고 실제 TSX 파일을 프로젝트로 복사합니다.",
      },
      {
        question: "키보드 조작을 지원하나요?",
        answer:
          "Tab으로 trigger에 접근하고 Enter 또는 Space로 내용을 열 수 있습니다.",
      },
    ],
  },
  alert: {
    newVersion: "새 Registry 버전",
    newVersionBody: "로컬 소스를 다시 설치하면 변경점을 확인할 수 있습니다.",
    synced: "동기화 완료",
    syncedBody: "26개 컴포넌트가 현재 프로젝트와 일치합니다.",
    missingTokens: "토큰을 찾을 수 없습니다",
    missingTokensBody: "globals.css에 base 항목을 먼저 설치해 주세요.",
  },
  avatar: {
    team: "팀",
  },
  breadcrumb: {
    label: "페이지 경로",
  },
  button: {
    delete: "삭제",
    small: "작게",
    large: "크게",
    addItem: "항목 추가",
    disabled: "비활성",
  },
  card: {
    marketOverview: "시장 요약",
    marketOverviewBody: "오늘 관심 종목의 흐름을 한눈에 확인하세요.",
    live: "실시간",
    details: "상세 보기",
    insetSurface: "함몰 표면",
    insetSurfaceBody: "보조 정보에는 눌린 깊이를 적용할 수 있습니다.",
    portfolioTarget: "포트폴리오 목표",
  },
  checkbox: {
    priceAlerts: "가격 알림 받기",
    partialWorkspace: "일부 워크스페이스에 적용됨",
    unavailable: "사용할 수 없는 옵션",
  },
  dialog: {
    editProfile: "프로필 편집",
    description: "공개 프로필에 표시될 이름과 핸들을 변경합니다.",
    name: "이름",
    username: "사용자 이름",
    cancel: "취소",
    save: "저장",
    hint: "열어서 focus trap과 Escape 닫기를 확인하세요.",
  },
  dropdown: {
    workspaceMenu: "워크스페이스 메뉴",
    workspace: "내 워크스페이스",
    newPage: "새 페이지",
    duplicate: "복제",
    showDepthGrid: "깊이 가이드 표시",
    theme: "테마",
    light: "라이트",
    dark: "다크",
    system: "시스템",
    deleteWorkspace: "워크스페이스 삭제",
  },
  input: {
    email: "이메일",
    invalid: "오류 상태",
    disabled: "비활성",
    readOnlyWorkspace: "읽기 전용 워크스페이스",
  },
  inputGroup: {
    search: "검색",
    searchPlaceholder: "컴포넌트 검색...",
    website: "웹사이트",
    message: "메시지",
    messagePlaceholder: "짧은 메모를 입력하세요...",
    send: "보내기",
  },
  label: {
    caption: "레이블을 클릭하면 연결된 입력으로 이동합니다.",
    email: "이메일 주소",
    weeklyReport: "주간 리포트 받기",
  },
  pagination: {
    label: "페이지 이동",
    previous: "이전",
    previousLabel: "이전 페이지로 이동",
    next: "다음",
    nextLabel: "다음 페이지로 이동",
  },
  progress: {
    registryBuild: "Registry 빌드",
    themeTokens: "테마 토큰",
    waiting: "데이터 대기 중",
  },
  radio: {
    label: "인터페이스 밀도",
    compact: "좁게",
    compactBody: "한 화면에 더 많은 정보를 표시합니다.",
    comfortable: "기본",
    comfortableBody: "기본 간격과 부드러운 깊이를 사용합니다.",
    spacious: "넓게",
    spaciousBody: "터치 환경에 넉넉한 간격을 제공합니다.",
  },
  scrollArea: {
    label: "컴포넌트 상태 목록",
    categories: {
      accessibility: "접근성",
      overlay: "오버레이",
      data: "데이터",
      input: "입력",
      composite: "복합",
    },
    statuses: {
      ready: "준비됨",
      review: "검토",
      planned: "예정",
    },
  },
  select: {
    region: "지역",
    asiaPacific: "아시아 태평양",
    seoul: "대한민국 서울",
    tokyo: "일본 도쿄",
    singapore: "싱가포르",
    northAmerica: "북아메리카",
    sanFrancisco: "미국 샌프란시스코",
    disabled: "비활성",
    selectedByAdmin: "관리자가 선택함",
  },
  separator: {
    tagline: "소스를 복사하고, 표면을 직접 만드세요.",
    preview: "미리보기",
    installation: "설치",
  },
  skeleton: {
    loading: "콘텐츠 로딩 중",
  },
  slider: {
    priceRange: "가격 범위",
    minimumPrice: "최저 가격",
    maximumPrice: "최고 가격",
    verticalVolume: "세로 음량",
    verticalOrientation: "세로 방향",
  },
  switch: {
    livePrices: "실시간 가격",
    livePricesBody: "시장 가격을 자동으로 갱신합니다.",
    emailAlerts: "이메일 알림",
    emailAlertsBody: "중요한 변동만 받아봅니다.",
    adminPolicy: "관리자 정책",
    adminPolicyBody: "현재 워크스페이스에서 잠겨 있습니다.",
  },
  table: {
    caption: "관심 종목 · 10분 지연 데이터",
    symbol: "종목",
    price: "가격",
    change: "변동",
    status: "상태",
    open: "장중",
    selected: "선택됨",
    watch: "관심",
  },
  tabs: {
    label: "포트폴리오 보기",
    overview: "개요",
    activity: "활동",
    settings: "설정",
    portfolioValue: "포트폴리오 가치",
    monthlyChange: "이번 달 +6.8%",
    activityBody: "최근 7일 동안 12개의 거래와 4개의 가격 알림이 있었습니다.",
    settingsBody: "계좌 동기화와 알림 설정을 이 영역에 구성할 수 있습니다.",
  },
  textarea: {
    investmentNote: "투자 메모",
    investmentNoteValue: "실적 발표 이후 거래량과 지지선을 다시 확인한다.",
    validationState: "오류 상태",
    invalidValue: "너무 짧은 메모",
    disabled: "비활성",
    disabledValue: "공유된 메모는 편집할 수 없습니다.",
  },
  tooltip: {
    addToWatchlist: "관심 종목에 추가",
    keyboardFocus: "키보드 포커스",
    keyboardFocusBody: "Tab으로 이동해도 같은 설명이 표시됩니다.",
    hint: "버튼에 hover하거나 focus하세요.",
  },
  fallback: {
    title: "미리보기를 찾을 수 없습니다",
    description: "{slug} 예제를 찾을 수 없습니다.",
  },
} as const;

type WidenStrings<T> = T extends string
  ? string
  : T extends readonly unknown[]
    ? { readonly [K in keyof T]: WidenStrings<T[K]> }
    : T extends Record<string, unknown>
      ? { readonly [K in keyof T]: WidenStrings<T[K]> }
      : T;

export type ComponentPreviewMessages = WidenStrings<typeof ko>;

const en: ComponentPreviewMessages = {
  accordion: {
    items: [
      {
        question: "Are the style tokens installed too?",
        answer:
          "Adding the first component also connects the neumorphic surface, shadow, and radius tokens to your project CSS.",
      },
      {
        question: "Can I edit the source after installation?",
        answer:
          "Yes. The actual TSX files are copied into your project instead of being hidden inside a package.",
      },
      {
        question: "Does it support keyboard controls?",
        answer:
          "Use Tab to reach a trigger, then press Enter or Space to open its content.",
      },
    ],
  },
  alert: {
    newVersion: "New Registry version",
    newVersionBody: "Reinstall the local source to review the changes.",
    synced: "Sync complete",
    syncedBody: "All 26 components match the current project.",
    missingTokens: "Tokens not found",
    missingTokensBody: "Install the base item in globals.css first.",
  },
  avatar: {
    team: "Team",
  },
  breadcrumb: {
    label: "Breadcrumb",
  },
  button: {
    delete: "Delete",
    small: "Small",
    large: "Large",
    addItem: "Add item",
    disabled: "Disabled",
  },
  card: {
    marketOverview: "Market overview",
    marketOverviewBody: "See today's watchlist movement at a glance.",
    live: "Live",
    details: "View details",
    insetSurface: "Inset surface",
    insetSurfaceBody: "Use recessed depth for supporting information.",
    portfolioTarget: "Portfolio target",
  },
  checkbox: {
    priceAlerts: "Receive price alerts",
    partialWorkspace: "Applied to some workspaces",
    unavailable: "Unavailable option",
  },
  dialog: {
    editProfile: "Edit profile",
    description: "Change the name and handle shown on your public profile.",
    name: "Name",
    username: "Username",
    cancel: "Cancel",
    save: "Save",
    hint: "Open it to test the focus trap and Escape-to-close behavior.",
  },
  dropdown: {
    workspaceMenu: "Workspace menu",
    workspace: "My workspace",
    newPage: "New page",
    duplicate: "Duplicate",
    showDepthGrid: "Show depth guides",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    deleteWorkspace: "Delete workspace",
  },
  input: {
    email: "Email",
    invalid: "Invalid",
    disabled: "Disabled",
    readOnlyWorkspace: "Read-only workspace",
  },
  inputGroup: {
    search: "Search",
    searchPlaceholder: "Search components...",
    website: "Website",
    message: "Message",
    messagePlaceholder: "Write a short note...",
    send: "Send",
  },
  label: {
    caption: "Clicking a label moves focus to its control.",
    email: "Email address",
    weeklyReport: "Receive the weekly report",
  },
  pagination: {
    label: "Pagination",
    previous: "Previous",
    previousLabel: "Go to previous page",
    next: "Next",
    nextLabel: "Go to next page",
  },
  progress: {
    registryBuild: "Registry build",
    themeTokens: "Theme tokens",
    waiting: "Waiting for data",
  },
  radio: {
    label: "Interface density",
    compact: "Compact",
    compactBody: "Show more information on each screen.",
    comfortable: "Comfortable",
    comfortableBody: "Use the default spacing and gentle depth.",
    spacious: "Spacious",
    spaciousBody: "Provide generous spacing for touch interfaces.",
  },
  scrollArea: {
    label: "Component status list",
    categories: {
      accessibility: "Accessibility",
      overlay: "Overlay",
      data: "Data",
      input: "Input",
      composite: "Composite",
    },
    statuses: {
      ready: "Ready",
      review: "Review",
      planned: "Planned",
    },
  },
  select: {
    region: "Region",
    asiaPacific: "Asia Pacific",
    seoul: "Seoul, Korea",
    tokyo: "Tokyo, Japan",
    singapore: "Singapore",
    northAmerica: "North America",
    sanFrancisco: "San Francisco, USA",
    disabled: "Disabled",
    selectedByAdmin: "Selected by an administrator",
  },
  separator: {
    tagline: "Copy the source. Own the surface.",
    preview: "Preview",
    installation: "Installation",
  },
  skeleton: {
    loading: "Loading content",
  },
  slider: {
    priceRange: "Price range",
    minimumPrice: "Minimum price",
    maximumPrice: "Maximum price",
    verticalVolume: "Vertical volume",
    verticalOrientation: "Vertical orientation",
  },
  switch: {
    livePrices: "Live prices",
    livePricesBody: "Refresh market prices automatically.",
    emailAlerts: "Email alerts",
    emailAlertsBody: "Receive only important changes.",
    adminPolicy: "Administrator policy",
    adminPolicyBody: "This setting is locked for the current workspace.",
  },
  table: {
    caption: "Watchlist · Data delayed by 10 minutes",
    symbol: "Symbol",
    price: "Price",
    change: "Change",
    status: "Status",
    open: "Open",
    selected: "Selected",
    watch: "Watch",
  },
  tabs: {
    label: "Portfolio views",
    overview: "Overview",
    activity: "Activity",
    settings: "Settings",
    portfolioValue: "Portfolio value",
    monthlyChange: "+6.8% this month",
    activityBody: "There were 12 trades and 4 price alerts in the last 7 days.",
    settingsBody: "Configure account sync and alert settings in this panel.",
  },
  textarea: {
    investmentNote: "Investment note",
    investmentNoteValue:
      "Review trading volume and support levels after the earnings report.",
    validationState: "Validation state",
    invalidValue: "This note is too short",
    disabled: "Disabled",
    disabledValue: "Shared notes cannot be edited.",
  },
  tooltip: {
    addToWatchlist: "Add to watchlist",
    keyboardFocus: "Keyboard focus",
    keyboardFocusBody: "The same description appears when you reach it with Tab.",
    hint: "Hover the button or move focus to it.",
  },
  fallback: {
    title: "Preview not found",
    description: "No preview is available for {slug}.",
  },
};

const zh: ComponentPreviewMessages = {
  accordion: {
    items: [
      {
        question: "样式 token 也会一起安装吗？",
        answer:
          "添加第一个组件时，也会将新拟态的 surface、shadow 和 radius token 接入项目 CSS。",
      },
      {
        question: "安装后可以修改源码吗？",
        answer: "可以。实际 TSX 文件会直接复制到项目中，而不是隐藏在 package 内。",
      },
      {
        question: "支持键盘操作吗？",
        answer: "使用 Tab 聚焦 trigger，再按 Enter 或 Space 展开内容。",
      },
    ],
  },
  alert: {
    newVersion: "Registry 新版本",
    newVersionBody: "重新安装本地源码即可查看变更。",
    synced: "同步完成",
    syncedBody: "26 个组件均与当前项目一致。",
    missingTokens: "找不到 token",
    missingTokensBody: "请先在 globals.css 中安装 base item。",
  },
  avatar: {
    team: "团队",
  },
  breadcrumb: {
    label: "面包屑导航",
  },
  button: {
    delete: "删除",
    small: "小",
    large: "大",
    addItem: "添加项目",
    disabled: "已禁用",
  },
  card: {
    marketOverview: "市场概览",
    marketOverviewBody: "快速查看今日自选股走势。",
    live: "实时",
    details: "查看详情",
    insetSurface: "内嵌表面",
    insetSurfaceBody: "辅助信息可以使用下沉层次。",
    portfolioTarget: "投资组合目标",
  },
  checkbox: {
    priceAlerts: "接收价格提醒",
    partialWorkspace: "已应用到部分工作区",
    unavailable: "不可用选项",
  },
  dialog: {
    editProfile: "编辑个人资料",
    description: "修改公开资料中显示的姓名和用户名。",
    name: "姓名",
    username: "用户名",
    cancel: "取消",
    save: "保存",
    hint: "打开后可测试焦点约束和按 Escape 关闭。",
  },
  dropdown: {
    workspaceMenu: "工作区菜单",
    workspace: "我的工作区",
    newPage: "新建页面",
    duplicate: "创建副本",
    showDepthGrid: "显示深度参考线",
    theme: "主题",
    light: "浅色",
    dark: "深色",
    system: "跟随系统",
    deleteWorkspace: "删除工作区",
  },
  input: {
    email: "电子邮箱",
    invalid: "错误状态",
    disabled: "已禁用",
    readOnlyWorkspace: "只读工作区",
  },
  inputGroup: {
    search: "搜索",
    searchPlaceholder: "搜索组件...",
    website: "网站",
    message: "消息",
    messagePlaceholder: "输入简短备注...",
    send: "发送",
  },
  label: {
    caption: "点击标签会将焦点移到关联的输入控件。",
    email: "电子邮箱地址",
    weeklyReport: "接收每周报告",
  },
  pagination: {
    label: "分页导航",
    previous: "上一页",
    previousLabel: "前往上一页",
    next: "下一页",
    nextLabel: "前往下一页",
  },
  progress: {
    registryBuild: "Registry 构建",
    themeTokens: "主题 token",
    waiting: "等待数据",
  },
  radio: {
    label: "界面密度",
    compact: "紧凑",
    compactBody: "在同一屏幕显示更多信息。",
    comfortable: "舒适",
    comfortableBody: "使用默认间距和柔和层次。",
    spacious: "宽松",
    spaciousBody: "为触控界面提供更充足的间距。",
  },
  scrollArea: {
    label: "组件状态列表",
    categories: {
      accessibility: "无障碍",
      overlay: "浮层",
      data: "数据",
      input: "输入",
      composite: "复合",
    },
    statuses: {
      ready: "就绪",
      review: "待审核",
      planned: "计划中",
    },
  },
  select: {
    region: "地区",
    asiaPacific: "亚太地区",
    seoul: "韩国首尔",
    tokyo: "日本东京",
    singapore: "新加坡",
    northAmerica: "北美",
    sanFrancisco: "美国旧金山",
    disabled: "已禁用",
    selectedByAdmin: "由管理员选择",
  },
  separator: {
    tagline: "复制源码，掌控表面。",
    preview: "预览",
    installation: "安装",
  },
  skeleton: {
    loading: "正在加载内容",
  },
  slider: {
    priceRange: "价格范围",
    minimumPrice: "最低价格",
    maximumPrice: "最高价格",
    verticalVolume: "纵向音量",
    verticalOrientation: "纵向排列",
  },
  switch: {
    livePrices: "实时价格",
    livePricesBody: "自动刷新市场价格。",
    emailAlerts: "邮件提醒",
    emailAlertsBody: "仅接收重要变动。",
    adminPolicy: "管理员策略",
    adminPolicyBody: "当前工作区已锁定此设置。",
  },
  table: {
    caption: "自选股 · 数据延迟 10 分钟",
    symbol: "代码",
    price: "价格",
    change: "涨跌",
    status: "状态",
    open: "交易中",
    selected: "已选择",
    watch: "关注",
  },
  tabs: {
    label: "投资组合视图",
    overview: "概览",
    activity: "动态",
    settings: "设置",
    portfolioValue: "投资组合价值",
    monthlyChange: "本月 +6.8%",
    activityBody: "最近 7 天共有 12 笔交易和 4 条价格提醒。",
    settingsBody: "可在此面板中配置账户同步和提醒设置。",
  },
  textarea: {
    investmentNote: "投资笔记",
    investmentNoteValue: "财报发布后重新确认成交量和支撑位。",
    validationState: "错误状态",
    invalidValue: "笔记内容太短",
    disabled: "已禁用",
    disabledValue: "无法编辑共享笔记。",
  },
  tooltip: {
    addToWatchlist: "添加到自选股",
    keyboardFocus: "键盘焦点",
    keyboardFocusBody: "使用 Tab 移动到此处时也会显示相同说明。",
    hint: "将鼠标悬停在按钮上，或把焦点移到按钮。",
  },
  fallback: {
    title: "找不到预览",
    description: "找不到 {slug} 的示例。",
  },
};

const ja: ComponentPreviewMessages = {
  accordion: {
    items: [
      {
        question: "スタイルトークンも一緒にインストールされますか？",
        answer:
          "最初のコンポーネントを追加すると、ニューモーフィズムの surface、shadow、radius トークンもプロジェクトの CSS に接続されます。",
      },
      {
        question: "インストール後にソースを編集できますか？",
        answer:
          "はい。package 内に隠さず、実際の TSX ファイルをプロジェクトへコピーします。",
      },
      {
        question: "キーボード操作に対応していますか？",
        answer:
          "Tab で trigger に移動し、Enter または Space で内容を開けます。",
      },
    ],
  },
  alert: {
    newVersion: "新しい Registry バージョン",
    newVersionBody: "ローカルソースを再インストールすると変更点を確認できます。",
    synced: "同期が完了しました",
    syncedBody: "26 個のコンポーネントが現在のプロジェクトと一致しています。",
    missingTokens: "トークンが見つかりません",
    missingTokensBody: "先に globals.css へ base item をインストールしてください。",
  },
  avatar: {
    team: "チーム",
  },
  breadcrumb: {
    label: "パンくずリスト",
  },
  button: {
    delete: "削除",
    small: "小",
    large: "大",
    addItem: "項目を追加",
    disabled: "無効",
  },
  card: {
    marketOverview: "マーケット概要",
    marketOverviewBody: "本日のウォッチリストの動きをひと目で確認できます。",
    live: "リアルタイム",
    details: "詳細を見る",
    insetSurface: "くぼんだサーフェス",
    insetSurfaceBody: "補足情報には、くぼんだ深度を使用できます。",
    portfolioTarget: "ポートフォリオ目標",
  },
  checkbox: {
    priceAlerts: "価格アラートを受け取る",
    partialWorkspace: "一部のワークスペースに適用済み",
    unavailable: "利用できないオプション",
  },
  dialog: {
    editProfile: "プロフィールを編集",
    description: "公開プロフィールに表示する名前とハンドルを変更します。",
    name: "名前",
    username: "ユーザー名",
    cancel: "キャンセル",
    save: "保存",
    hint: "開いて focus trap と Escape で閉じる動作を確認できます。",
  },
  dropdown: {
    workspaceMenu: "ワークスペースメニュー",
    workspace: "マイワークスペース",
    newPage: "新しいページ",
    duplicate: "複製",
    showDepthGrid: "深度ガイドを表示",
    theme: "テーマ",
    light: "ライト",
    dark: "ダーク",
    system: "システム",
    deleteWorkspace: "ワークスペースを削除",
  },
  input: {
    email: "メール",
    invalid: "エラー状態",
    disabled: "無効",
    readOnlyWorkspace: "読み取り専用ワークスペース",
  },
  inputGroup: {
    search: "検索",
    searchPlaceholder: "コンポーネントを検索...",
    website: "ウェブサイト",
    message: "メッセージ",
    messagePlaceholder: "短いメモを入力...",
    send: "送信",
  },
  label: {
    caption: "ラベルをクリックすると、関連する入力欄へ移動します。",
    email: "メールアドレス",
    weeklyReport: "週次レポートを受け取る",
  },
  pagination: {
    label: "ページ移動",
    previous: "前へ",
    previousLabel: "前のページへ移動",
    next: "次へ",
    nextLabel: "次のページへ移動",
  },
  progress: {
    registryBuild: "Registry ビルド",
    themeTokens: "テーマトークン",
    waiting: "データを待機中",
  },
  radio: {
    label: "インターフェース密度",
    compact: "コンパクト",
    compactBody: "1 画面により多くの情報を表示します。",
    comfortable: "標準",
    comfortableBody: "標準の間隔と穏やかな深度を使用します。",
    spacious: "ゆったり",
    spaciousBody: "タッチ操作に十分な間隔を確保します。",
  },
  scrollArea: {
    label: "コンポーネントの状態一覧",
    categories: {
      accessibility: "アクセシビリティ",
      overlay: "オーバーレイ",
      data: "データ",
      input: "入力",
      composite: "複合",
    },
    statuses: {
      ready: "準備完了",
      review: "レビュー",
      planned: "予定",
    },
  },
  select: {
    region: "地域",
    asiaPacific: "アジア太平洋",
    seoul: "韓国・ソウル",
    tokyo: "日本・東京",
    singapore: "シンガポール",
    northAmerica: "北米",
    sanFrancisco: "米国・サンフランシスコ",
    disabled: "無効",
    selectedByAdmin: "管理者が選択",
  },
  separator: {
    tagline: "ソースをコピーし、サーフェスを自分のものに。",
    preview: "プレビュー",
    installation: "インストール",
  },
  skeleton: {
    loading: "コンテンツを読み込み中",
  },
  slider: {
    priceRange: "価格帯",
    minimumPrice: "最低価格",
    maximumPrice: "最高価格",
    verticalVolume: "縦方向の音量",
    verticalOrientation: "縦方向",
  },
  switch: {
    livePrices: "リアルタイム価格",
    livePricesBody: "市場価格を自動で更新します。",
    emailAlerts: "メール通知",
    emailAlertsBody: "重要な変動だけを受け取ります。",
    adminPolicy: "管理者ポリシー",
    adminPolicyBody: "現在のワークスペースではロックされています。",
  },
  table: {
    caption: "ウォッチリスト · 10 分遅延データ",
    symbol: "銘柄",
    price: "価格",
    change: "騰落",
    status: "状態",
    open: "取引中",
    selected: "選択中",
    watch: "監視",
  },
  tabs: {
    label: "ポートフォリオ表示",
    overview: "概要",
    activity: "アクティビティ",
    settings: "設定",
    portfolioValue: "ポートフォリオ評価額",
    monthlyChange: "今月 +6.8%",
    activityBody: "過去 7 日間に 12 件の取引と 4 件の価格通知がありました。",
    settingsBody: "このパネルで口座同期と通知設定を構成できます。",
  },
  textarea: {
    investmentNote: "投資メモ",
    investmentNoteValue: "決算発表後に出来高と支持線を再確認する。",
    validationState: "エラー状態",
    invalidValue: "メモが短すぎます",
    disabled: "無効",
    disabledValue: "共有メモは編集できません。",
  },
  tooltip: {
    addToWatchlist: "ウォッチリストに追加",
    keyboardFocus: "キーボードフォーカス",
    keyboardFocusBody: "Tab で移動した場合も同じ説明が表示されます。",
    hint: "ボタンに hover するか focus を移してください。",
  },
  fallback: {
    title: "プレビューが見つかりません",
    description: "{slug} の例が見つかりません。",
  },
};

export const componentPreviewMessages: Record<
  Locale,
  ComponentPreviewMessages
> = {
  ko,
  en,
  zh,
  ja,
};

export function formatComponentPreviewMessage(
  value: string,
  replacements: Record<string, string>,
): string {
  return value.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(replacements, key)
      ? replacements[key]
      : match,
  );
}
