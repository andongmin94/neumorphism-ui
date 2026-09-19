import { defineComponentDocCopy } from "@/i18n/component-doc-copy";

export const componentDocCopyZh = defineComponentDocCopy({
  accordion: {
    summary: "可单独或同时展开多个区块的折叠内容组。",
    description:
      "保留 Base UI Accordion 的状态管理与无障碍关联，并以 inset 表面呈现已展开的项目。支持 multiple 模式以及受控、非受控用法。",
    props: [
      "允许同时展开多个项目。",
      "当前展开项目的受控值或非受控初始值。",
      "展开项目发生变化时调用。",
      "用于标识项目的唯一值。",
      "禁用该项目的触发器。",
      "关闭后仍将面板保留在 DOM 中。",
    ],
    accessibility: [
      "Base UI 负责维护触发器与面板之间的 aria-expanded、aria-controls 关联。",
      "使用 Tab 聚焦触发器，再用 Enter 或 Space 展开和收起项目。",
      "AccordionTrigger 本身就是按钮，不要在标题中嵌套其他按钮。",
    ],
  },
  alert: {
    summary: "通过 raised 表面传达重要状态和操作结果的消息。",
    description:
      "用于排列图标、标题和说明的组合式 Alert。提供 default、success、destructive 三种变体，所有变体都同时使用边框和文字对比度，而不只依赖颜色。",
    props: [
      "选择消息的语义和视觉状态。",
      "排列图标、AlertTitle 和 AlertDescription。",
      "扩展默认表面样式。",
    ],
    accessibility: [
      "Alert 使用 role=alert，适合动态出现的重要消息。",
      "页面加载时已经存在的普通提示通常不需要 role=alert 的即时朗读，可覆盖 role 或改用其他容器。",
      "装饰性图标应设置 aria-hidden=true，同时用标题和说明文本传达其含义。",
    ],
  },
  avatar: {
    summary: "图片加载失败时仍能显示 fallback 的头像表面。",
    description:
      "基于 Base UI Avatar 处理图片加载和 fallback 切换。提供三种尺寸、状态 Badge、重叠的头像组以及剩余人数计数。",
    props: [
      "同时调整 Avatar 与 Badge 的尺寸。",
      "要显示的图片 URL。",
      "说明图片中人物或对象的替代文本。",
      "显示 fallback 前的等待时间。",
      "显示状态点或小型状态图标。",
    ],
    accessibility: [
      "用于识别人物的图片应以姓名作为 alt；如果相邻文本已显示同一姓名，可以使用空 alt。",
      "当 AvatarBadge 表示在线状态等含义时，应提供 aria-label 或视觉隐藏文本。",
      "为 AvatarGroupCount 添加 aria-label，说明“+8”所代表的含义。",
    ],
  },
  badge: {
    summary: "以简短醒目的行内标签显示状态或分类。",
    description:
      "一个轻量的 span 组件，提供五种变体。它只提供视觉强调，不附加交互行为或隐式 ARIA role。",
    props: [
      "选择状态的强调程度和颜色。",
      "简短的状态或分类文本。",
      "扩展尺寸、间距和颜色。",
    ],
    accessibility: [
      "Badge 默认渲染为 span，因此必须直接提供能够说明状态的文本。",
      "不要只用颜色区分状态，应使用 Ready、Failed 等明确文案。",
      "如需点击操作，不要直接给 Badge 绑定事件，而应将其放在 Button 或链接中。",
    ],
  },
  breadcrumb: {
    summary: "以有序且有语义的列表显示当前页面的路径。",
    description:
      "保留 nav 和 ol 的原生语义，并可组合链接、当前页面、分隔符和省略项。当前页面会自动设置 aria-current=page。",
    props: [
      "为路径导航区域提供无障碍名称。",
      "上级路径的实际 URL。",
      "当前页面名称，并自动应用 aria-current=page。",
      "对辅助技术隐藏的视觉分隔符。",
    ],
    accessibility: [
      "Breadcrumb 是带有 aria-label=breadcrumb 的 nav，路径列表使用有序列表 ol。",
      "最后一项使用 BreadcrumbPage 而不是链接，以传达 aria-current=page。",
      "Separator 和 Ellipsis 都是装饰元素，会对辅助技术隐藏。",
    ],
  },
  button: {
    summary: "具有 raised、pressed 和 primary 状态的基础操作控件。",
    description:
      "使用原生 button，保留表单与键盘行为。提供五种 variant 和四种 size，active 状态通过 inset shadow 表现按下效果。",
    props: [
      "选择按钮的语义和表面强调方式。",
      "选择按钮高度和水平内边距。",
      "决定原生按钮的行为。",
      "禁用点击和键盘操作。",
    ],
    accessibility: [
      "由于使用原生 button，会保留 Space、Enter 键行为以及 disabled 语义。",
      "icon 尺寸的按钮必须提供描述操作的 aria-label。",
      "页面跳转应使用语义正确的 anchor 或 Link，不要用 Button 的点击处理器代替。",
    ],
  },
  card: {
    summary: "以 raised、soft、inset 或 flat 层次组织内容的表面。",
    description:
      "由 Header、Title、Description、Action、Content 和 Footer 组合而成的布局组件。根元素默认为 div，应根据内容语义安排标题和交互元素。",
    props: [
      "选择表面的层次和边框表现。",
      "排列 Card 的组合式子组件。",
      "Header 右侧的操作或状态区域。",
      "Card 标题，默认渲染为 h3。",
    ],
    accessibility: [
      "Card 本身是 div，不会自动添加 landmark 或 article role。",
      "如果 CardTitle 不符合页面的标题层级，应改用合适的标题元素。",
      "让整张 Card 可点击时，应避免其中出现嵌套的按钮或链接。",
    ],
  },
  checkbox: {
    summary: "支持 boolean 与 indeterminate 状态的原生复选框。",
    description:
      "在透明的原生 input 上叠加拟物表面，同时保留表单提交和浏览器无障碍能力。支持受控、非受控、indeterminate 状态以及 shadcn 风格的 onCheckedChange。",
    props: [
      "受控的选中或混合状态。",
      "非受控模式下的初始选中状态。",
      "选中状态变化时调用。",
      "禁用输入和指针操作。",
      "用于表单提交的原生 checkbox 属性。",
    ],
    accessibility: [
      "使用真实的 input[type=checkbox]，因此会保留表单提交和 Space 键操作。",
      "将 Label 的 htmlFor 与 Checkbox 的 id 关联，或将 Checkbox 放在 label 内。",
      "在 indeterminate 状态下，会同时设置 aria-checked=mixed 和 DOM indeterminate 属性。",
    ],
  },
  dialog: {
    summary: "安全约束焦点并在关闭后将其还给原触发器的模态表面。",
    description:
      "基于 Base UI Dialog 组合 Portal、Backdrop、Popup、标题、说明和关闭操作。Escape、点击外部、焦点约束及焦点返回均由 primitive 处理。",
    props: [
      "受控的打开状态或非受控初始状态。",
      "打开状态变化时调用。",
      "决定是否阻止背景交互并约束焦点。",
      "将触发或关闭行为组合到按钮或链接上。",
      "显示右上角的默认关闭按钮。",
      "单独扩展 Backdrop 的颜色、模糊和过渡效果。",
      "禁止通过外部 pointer press 关闭 Dialog。",
    ],
    accessibility: [
      "在 DialogContent 中提供 DialogTitle，并使用 DialogDescription 关联辅助说明。",
      "Base UI 负责模态焦点约束、Escape 关闭，以及关闭后将焦点返回触发器。",
      "使用 DialogClose 包裹 DialogFooter 中的取消按钮，提供明确的关闭操作。",
    ],
  },
  "dropdown-menu": {
    summary: "支持通过键盘浏览操作、选项和 submenu 的上下文菜单。",
    description:
      "基于 Base UI Menu 的完整组合式 API。可在同一表面中组织普通 item、checkbox、radio group、label、separator、shortcut 和嵌套 submenu。",
    props: [
      "受控的菜单打开状态或非受控初始状态。",
      "菜单打开状态变化时调用。",
      "将 trigger 行为组合到按钮或链接上。",
      "相对于 trigger 设置 popup 的位置。",
      "设置 trigger 与 popup 之间的间距。",
      "选择普通操作或危险操作样式。",
      "对齐带 indicator 的行与文本起始位置。",
      "checkbox item 的受控选中状态。",
      "checkbox item 状态变化时调用。",
    ],
    accessibility: [
      "Base UI 负责 Arrow 键导航、Home、End、键入搜索、Escape 关闭和焦点返回。",
      "DropdownMenuItem 应使用清晰文字描述命令；危险操作除了 variant 外，也要通过文案明确区分。",
      "CheckboxItem 应同时使用 checked 和 onCheckedChange 维护状态。",
    ],
  },
  input: {
    summary: "focus 与 validation 状态清晰的 inset 单行输入框。",
    description:
      "透传原生 input 的全部属性，并统一呈现拟物 inset 表面、file input、disabled 和 aria-invalid 状态。",
    props: [
      "email、password、file 等原生 input 类型。",
      "受控值或非受控初始值。",
      "用于提示输入格式的简短示例。",
      "设置原生输入限制。",
      "启用错误状态边框和 focus ring。",
    ],
    accessibility: [
      "将 Label 的 htmlFor 与 Input 的 id 关联，或提供 aria-label。",
      "placeholder 不能替代 Label，只应用作输入格式示例。",
      "出现错误时，应设置 aria-invalid，并通过 aria-describedby 关联错误文案的 id。",
    ],
  },
  "input-group": {
    summary: "将输入框、addon 和操作组合在同一 inset 表面中的复合字段。",
    description:
      "可在 InputGroupInput 或 InputGroupTextarea 前后组合 addon、辅助文本和 button。根元素的 focus-within 状态为整个组合提供统一的焦点表现。",
    props: [
      "按顺序排列 control、addon、text 和 button。",
      "在需要时为 role=group 提供整个组合的名称。",
      "id、name、type、value、onChange 等原生属性。",
      "多行 control 的原生属性。",
      "设置组合内操作按钮的类型。",
    ],
    accessibility: [
      "根元素的 role=group 不会为 input 命名，因此仍需将 control 本身与 Label 关联。",
      "纯装饰 addon 应设置 aria-hidden=true；单位、前缀等必要文本则应保留朗读。",
      "仅含图标的 InputGroupButton 必须提供 aria-label。",
    ],
  },
  label: {
    summary: "连接表单 control 名称与点击区域的原生 label。",
    description:
      "对原生 label 的轻量封装，透传所有标准属性，并提供与 peer-disabled 状态一致的文字颜色和 cursor。",
    props: [
      "要关联的 form control id。",
      "说明 control 用途的文本。",
      "扩展布局和状态样式。",
    ],
    accessibility: [
      "htmlFor 必须与目标 control 的 id 完全一致。",
      "为 RadioGroup 等多个 control 命名时，应使用 fieldset/legend 或 aria-labelledby，而不是单独的 Label。",
      "必填状态和辅助说明不仅要有视觉标识，还应通过 required、aria-describedby 传达。",
    ],
  },
  pagination: {
    summary: "明确显示当前页及上一页、下一页入口的 raised 链接组。",
    description:
      "保留 nav、ul、li、anchor 语义的组合式分页导航。支持当前页、上一页和下一页链接，以及省略项。",
    props: [
      "为 pagination navigation 区域提供无障碍名称。",
      "目标页面的实际 URL。",
      "设置当前页样式和 aria-current=page。",
      "替换默认的翻页文案。",
    ],
    accessibility: [
      "每个页面都应使用带有真实 href 的链接，以保留浏览器导航和在新标签页中打开的能力。",
      "只为一个当前页设置 isActive，从而应用 aria-current=page。",
      "Previous 和 Next 带有默认 aria-label；如需本地化，应显式覆盖。",
    ],
  },
  progress: {
    summary: "以 inset 轨道和 primary 填充显示完成进度。",
    description:
      "使用 Base UI Progress 的 progressbar 语义。会规范化有效的 max 和 value；当 value 缺失或无效时，以 indeterminate 状态呈现。",
    props: [
      "当前进度值，会被限制在 0 与 max 之间。",
      "大于 0 的总范围；无效时使用 100。",
      "为进行中的任务提供无障碍名称。",
      "在数值之外需要额外说明时生成 aria-valuetext。",
    ],
    accessibility: [
      "Progress 需要 aria-label 或 aria-labelledby，例如“文件上传”，以说明正在进行的任务。",
      "即使页面显示了百分比，也不会自动与 progressbar 关联，必须显式连接标签。",
      "将 value 设为 null 表示 indeterminate 状态，此时不要同时显示完成百分比。",
    ],
  },
  "radio-group": {
    summary: "用于选择单一值的原生 radio input 组。",
    description:
      "通过 React context 共享 name 和选中状态，同时每个项目都渲染为真实的 input[type=radio]。支持受控与非受控值、横向和纵向排列、disabled 及 required。",
    props: [
      "受控的选中值或非受控初始值。",
      "选中值变化时调用。",
      "设置排列方向和 aria-orientation。",
      "各项目共享的原生 radio name。",
      "设置所有项目的输入限制。",
      "项目被选中时传给组合的值。",
    ],
    accessibility: [
      "在 RadioGroup 根元素上通过 aria-label 或 aria-labelledby 提供整个组合的名称。",
      "将每个 RadioGroupItem 的 id 与 Label 的 htmlFor 关联。",
      "由于使用真实的 radio input，会保留浏览器表单提交和键盘选择行为。",
    ],
  },
  "scroll-area": {
    summary: "保留浏览器原生 scrolling 的主题化 overflow 表面。",
    description:
      "使用 overflow-auto 和原生 scrollbar，完整保留滚轮、触控、键盘以及浏览器无障碍行为。ScrollBar export 是为兼容 shadcn 组合方式而保留的隐藏 placeholder。",
    props: [
      "限制高度或宽度以形成 overflow 区域。",
      "当内部没有 focusable 元素时，提供键盘滚动入口。",
      "当该区域可独立浏览时，为其内容提供名称。",
      "兼容性 placeholder 的方向数据属性。",
    ],
    accessibility: [
      "使用原生 overflow，不会拦截屏幕阅读器和触控滚动。",
      "如果内部完全没有链接或按钮，可设置 tabIndex=0，让键盘用户进入该区域。",
      "ScrollBar 是视觉隐藏的兼容性 placeholder，实际滚动由浏览器 scrollbar 负责。",
    ],
  },
  select: {
    summary: "保留浏览器无障碍能力的原生 select 表面。",
    description:
      "直接使用原生 select、optgroup 和 option，并应用 inset field 与装饰性 chevron。保留移动平台的系统 picker 和表单提交行为。",
    props: [
      "受控的选中值或非受控初始值。",
      "原生 select 值变化时调用。",
      "设置原生 select 的输入限制及多选模式。",
      "option 在表单中提交的值。",
      "optgroup 的选项组名称。",
    ],
    accessibility: [
      "将 Label 的 htmlFor 与 Select 的 id 关联。",
      "将第一个 option 用作 placeholder 时，应组合空 value 与 disabled，同时保留真实 Label。",
      "由于使用原生 select，会完整保留操作系统的键盘和移动 picker 行为。",
    ],
  },
  separator: {
    summary: "以高光和细微阴影表现相关内容之间边界的分隔线。",
    description:
      "支持横向与纵向，默认作为装饰元素。需要表达有语义的区块边界时，可设置 decorative=false 以启用 separator role 和 aria-orientation。",
    props: [
      "设置分隔线方向和尺寸样式。",
      "true 时作为装饰元素隐藏，false 时使用 role=separator。",
      "扩展间距、长度和最小高度。",
    ],
    accessibility: [
      "仅用于视觉分隔时，保持默认的 decorative=true。",
      "如果在文档结构中代表有意义的边界，应设置 decorative=false 以暴露 role=separator。",
      "纵向 separator 需要父元素提供高度，或通过 className 设置明确高度。",
    ],
  },
  skeleton: {
    summary: "预先展示待加载内容尺寸和位置的 inset placeholder。",
    description:
      "一个基于 div 的简单 pulse placeholder。它只提供视觉加载轮廓，并通过 aria-hidden=true 对辅助技术隐藏。",
    props: [
      "设置 placeholder 的宽度、高度和 radius。",
      "将装饰性 placeholder 从无障碍树中隐藏。",
    ],
    accessibility: [
      "Skeleton 本身设置了 aria-hidden，因此应在周围另行提供 sr-only 状态文案或 role=status。",
      "加载区域可按需设置 aria-busy=true，并在加载完成后移除。",
      "pulse 动画会依据全局 prefers-reduced-motion 规则基本停用。",
    ],
  },
  slider: {
    summary: "在横向或纵向 track 上调节一个或多个值的范围控件。",
    description:
      "基于 Base UI Slider，提供单值与 number[] 范围 API。根据数组项数量创建 thumb，并通过 thumbLabels 为每个 input 命名；同时支持横向、纵向以及受控、非受控值。",
    props: [
      "每个 thumb 的受控值或非受控初始值。",
      "可选择的数值范围。",
      "键盘和指针调整的步长。",
      "设置 track 方向和键盘操作轴。",
      "按值的顺序传给每个真实 thumb input 的无障碍名称。",
      "在调整过程中或调整结束时传递值数组。",
      "禁用所有 thumb 的交互。",
    ],
    accessibility: [
      "Slider 根元素通过 aria-label 或 aria-labelledby 提供组合名称，thumbLabels 则按值的顺序为各调节点命名。",
      "Base UI 负责每个 thumb 的 role=slider、当前值、最小值与最大值，以及 Arrow、Page、Home、End 键行为。",
      "单值提供一个名称；范围值应在 thumbLabels 中使用“最小值”“最大值”等可区分的名称。",
    ],
  },
  switch: {
    summary: "以按下的 track 呈现立即生效的开关设置。",
    description:
      "在原生 checkbox input 上应用 role=switch，保留表单和浏览器行为。支持 checked、defaultChecked 和 onCheckedChange。",
    props: [
      "受控的开启状态或非受控初始状态。",
      "开启状态变化时调用。",
      "接收原生 checkbox change event。",
      "禁用输入和指针操作。",
      "用于表单提交的原生 checkbox 属性。",
    ],
    accessibility: [
      "由于在真实 checkbox 上使用 role=switch，会向辅助技术传达 Space 键行为和 checked 状态。",
      "将 Label 的 htmlFor 与 Switch 的 id 关联，或提供 aria-label。",
      "对于不会立即生效、还需另行保存的 boolean 选择，Checkbox 通常更自然。",
    ],
  },
  table: {
    summary: "在小屏幕上可横向滚动的语义化数据表格。",
    description:
      "组合原生 table、caption、thead、tbody、tfoot、tr、th 和 td 元素。外层 container 提供 overflow-x-auto 与拟物 raised 表面。",
    props: [
      "排列 caption 和各个 table section。",
      "说明表格用途和数据范围。",
      "明确 header 所描述的 cell 方向。",
      "启用选中行的 inset 状态。",
      "设置原生 table cell 的合并范围。",
    ],
    accessibility: [
      "使用 TableCaption 说明表格用途；需要视觉隐藏时可应用 sr-only class。",
      "列 header 和行 header 应设置符合语义的 scope。",
      "不要使用 Table 仅为对齐布局，应改用 CSS grid 或 flex。",
    ],
  },
  tabs: {
    summary: "在同一上下文中通过键盘切换 panel 的 tab interface。",
    description:
      "基于 Base UI Tabs，将 active trigger 呈现为 raised 表面，将 list 呈现为 inset track。支持受控与非受控值、自动或手动激活，以及横向和纵向排列。",
    props: [
      "受控的 active tab 值或非受控初始值。",
      "active tab 变化时调用。",
      "设置 list 方向和 Arrow 键导航轴。",
      "决定用 Arrow 键移动 focus 时是否同时激活 panel。",
      "与所关联 TabsContent 共享的唯一值。",
      "用于打开该 panel 的 trigger 值。",
    ],
    accessibility: [
      "通过 aria-label 或 aria-labelledby 为 TabsList 提供 tab 组合名称。",
      "Base UI 负责 tab、tablist、tabpanel role 以及 aria-controls、aria-selected 关联。",
      "仅当 panel 可以立即切换时，才使用 TabsList 的 activateOnFocus。",
    ],
  },
  textarea: {
    summary: "用于输入多行文本、可调整尺寸的 inset field。",
    description:
      "透传原生 textarea 的全部属性，并通过拟物 token 呈现最小高度、纵向 resize、focus 和 aria-invalid 状态。",
    props: [
      "受控文本或非受控初始文本。",
      "初始显示行数。",
      "用于提示输入格式的简短示例。",
      "设置原生输入限制。",
      "启用错误边框和 focus ring。",
    ],
    accessibility: [
      "将 Label 的 htmlFor 与 Textarea 的 id 关联，不要用 placeholder 代替 Label。",
      "存在字符数限制时，应同时提供 maxLength 和当前字符数，并在需要时通过 aria-describedby 关联。",
      "为错误文案设置 id，再通过 aria-invalid、aria-describedby 将其与 control 关联。",
    ],
  },
  tooltip: {
    summary: "在 hover 和 keyboard focus 时提供简短辅助说明的 popup。",
    description:
      "基于 Base UI Tooltip，组合 Provider、Root、Trigger、Portal、Positioner 和 Popup。默认 provider 延迟为 250ms，popup 会自动避开 trigger 周围的碰撞边界。",
    props: [
      "pointer hover 后打开 tooltip 的延迟时间（ms）。",
      "受控的打开状态或非受控初始状态。",
      "打开状态变化时调用。",
      "将 tooltip trigger 行为组合到按钮或链接上。",
      "相对于 trigger 设置 popup 的位置。",
      "设置 trigger 与 popup 之间的间距。",
    ],
    accessibility: [
      "Tooltip 不能替代 trigger 的无障碍名称，因此图标按钮仍需单独提供 aria-label。",
      "内容应简短且仅作辅助，不要把必要说明或错误消息只放在 Tooltip 中。",
      "Base UI 会让 Tooltip 在 hover 和 keyboard focus 时打开，并支持用 Escape 关闭。",
    ],
  },
"alert-dialog": {"summary":"对不可撤销操作进行明确确认的对话框。","description":"对不可撤销操作进行明确确认的对话框。 先放置取消按钮。异步操作成功后再关闭受控对话框。","props":["设置受控状态或初始状态。","选择打开时的焦点目标。","处理同步确认，异步操作应控制打开状态。"],"accessibility":["先放置取消按钮。异步操作成功后再关闭受控对话框。","修改 render 或 className 时保留标签关联和可见焦点。"]},
"popover": {"summary":"依附按钮、保留上下文的设置面板。","description":"依附按钮、保留上下文的设置面板。 提供 PopoverTitle 和说明，并检查键盘关闭操作。","props":["设置受控状态或初始状态。","设置考虑视口边界的面板位置或间距。","组合现有元素、事件和 ref。"],"accessibility":["提供 PopoverTitle 和说明，并检查键盘关闭操作。","修改 render 或 className 时保留标签关联和可见焦点。"]},
"hover-card": {"summary":"补充说明链接目标的预览卡片。","description":"补充说明链接目标的预览卡片。 不要把必要信息或操作只放在悬停内容中。原始链接仍应含义明确。","props":["设置受控状态或初始状态。","打开与关闭的延迟，单位为毫秒。","设置考虑视口边界的面板位置或间距。"],"accessibility":["不要把必要信息或操作只放在悬停内容中。原始链接仍应含义明确。","修改 render 或 className 时保留标签关联和可见焦点。"]},
"sheet": {"summary":"从视口边缘打开的可滚动操作面板。","description":"从视口边缘打开的可滚动操作面板。 包含 SheetTitle 和说明。小屏幕上也应能到达关闭按钮及最后一个字段。","props":["设置考虑视口边界的面板位置或间距。","关闭按钮的可访问名称。","设置受控状态或初始状态。"],"accessibility":["包含 SheetTitle 和说明。小屏幕上也应能到达关闭按钮及最后一个字段。","修改 render 或 className 时保留标签关联和可见焦点。"]},
"collapsible": {"summary":"展开或折叠一组可选设置的容器。","description":"展开或折叠一组可选设置的容器。 触发按钮名称应说明内容。检查 Enter 和 Space 展开操作。","props":["设置受控状态或初始状态。","禁用用户操作。","关闭时仍将面板保留在 DOM 中。"],"accessibility":["触发按钮名称应说明内容。检查 Enter 和 Space 展开操作。","修改 render 或 className 时保留标签关联和可见焦点。"]},
"toggle": {"summary":"保持按下选择状态的独立切换按钮。","description":"保持按下选择状态的独立切换按钮。 为纯图标按钮提供标签。通过内凹表面和边框辅助表示选择，而非只用颜色。","props":["设置受控状态或初始状态。","选择控件尺寸。","禁用用户操作。"],"accessibility":["为纯图标按钮提供标签。通过内凹表面和边框辅助表示选择，而非只用颜色。","修改 render 或 className 时保留标签关联和可见焦点。"]},
"toggle-group": {"summary":"可通过键盘导航的单选或多选切换组。","description":"可通过键盘导航的单选或多选切换组。 标记组和每个选项。区分方向键焦点移动与选择状态。","props":["设置受控状态或初始状态。","允许多项选择。","设置布局和键盘导航方向。"],"accessibility":["标记组和每个选项。区分方向键焦点移动与选择状态。","修改 render 或 className 时保留标签关联和可见焦点。"]},
"toolbar": {"summary":"集中呈现文档操作、支持方向键导航的工具栏。","description":"集中呈现文档操作、支持方向键导航的工具栏。 为 Toolbar 命名。禁用项默认可通过方向键聚焦，但不能执行。设置 focusableWhenDisabled={false} 可将其排除在导航之外。","props":["设置布局和键盘导航方向。","在两端循环键盘焦点。","禁用用户操作。"],"accessibility":["为 Toolbar 命名。禁用项默认可通过方向键聚焦，但不能执行。设置 focusableWhenDisabled={false} 可将其排除在导航之外。","修改 render 或 className 时保留标签关联和可见焦点。"]},
"field": {"summary":"把控件与标签、说明和验证错误关联起来。","description":"把控件与标签、说明和验证错误关联起来。 使用 FieldControl 或通过 render 组合输入。除了错误颜色，还应提供 FieldError 文本。","props":["关联表单值与外部错误的字段名称。","返回自定义验证结果。","选择执行验证的时机。"],"accessibility":["使用 FieldControl 或通过 render 组合输入。除了错误颜色，还应提供 FieldError 文本。","修改 render 或 className 时保留标签关联和可见焦点。"]},
"fieldset": {"summary":"为相关控件提供共用标题和禁用状态的组。","description":"为相关控件提供共用标题和禁用状态的组。 用 FieldsetLegend 说明组的用途，同时保留各控件的标签。","props":["禁用用户操作。","为相关字段组命名。","扩展样式，也可使用状态回调。"],"accessibility":["用 FieldsetLegend 说明组的用途，同时保留各控件的标签。","修改 render 或 className 时保留标签关联和可见焦点。"]},
"form": {"summary":"协调字段验证和提交错误的原生表单。","description":"协调字段验证和提交错误的原生表单。 区分保存与重置。示例只更新本地状态，不包含服务器持久化。","props":["接收验证后的值，并阻止原生提交。","按字段名称关联外部错误。","选择执行验证的时机。"],"accessibility":["区分保存与重置。示例只更新本地状态，不包含服务器持久化。","修改 render 或 className 时保留标签关联和可见焦点。"]},
"number-field": {"summary":"支持范围、步长和本地化格式的数字输入。","description":"支持范围、步长和本地化格式的数字输入。 为增加和减少按钮分别命名。检查边界值以及直接输入。","props":["设置最小值与最大值。","按钮和键盘操作的增减步长。","配置本地化数字格式。"],"accessibility":["为增加和减少按钮分别命名。检查边界值以及直接输入。","修改 render 或 className 时保留标签关联和可见焦点。"]},
"meter": {"summary":"在已知范围内表示测量值的计量条。","description":"在已知范围内表示测量值的计量条。 任务完成进度请用 Progress。配合 MeterLabel 显示可见数值。","props":["范围内的当前测量值。","设置最小值与最大值。","配置本地化数字格式。"],"accessibility":["任务完成进度请用 Progress。配合 MeterLabel 显示可见数值。","修改 render 或 className 时保留标签关联和可见焦点。"]},
"combobox": {"summary":"支持过滤、空结果及键盘选择的搜索输入。","description":"支持过滤、空结果及键盘选择的搜索输入。 提供 ComboboxLabel 和空结果提示。检查方向键、Enter、Escape 及真实 IME 输入。","props":["用于过滤与选择的原始选项。","设置受控状态或初始状态。","允许多项选择。"],"accessibility":["提供 ComboboxLabel 和空结果提示。检查方向键、Enter、Escape 及真实 IME 输入。","修改 render 或 className 时保留标签关联和可见焦点。"]},
});

export default componentDocCopyZh;
