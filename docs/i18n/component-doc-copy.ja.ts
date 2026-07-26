import { defineComponentDocCopy } from "@/i18n/component-doc-copy";

export const componentDocCopyJa = defineComponentDocCopy({
  accordion: {
    summary:
      "1つずつ、または複数のセクションを同時に展開できるディスクロージャーグループ。",
    description:
      "Base UI Accordion の状態管理とアクセシビリティ上の関連付けを維持しながら、展開中の項目を inset サーフェスとして表示します。multiple モードに加え、制御・非制御の両方の使い方に対応します。",
    props: [
      "複数の項目を同時に展開できるようにします。",
      "展開中の項目を表す制御値、または非制御時の初期値です。",
      "展開中の項目が変わったときに呼び出されます。",
      "項目を識別する一意の値です。",
      "項目の trigger を無効にします。",
      "閉じている間も panel を DOM に保持します。",
    ],
    accessibility: [
      "Base UI が各 trigger と panel の aria-expanded および aria-controls の関連付けを管理します。",
      "Tab で trigger にフォーカスを移し、Enter または Space で項目を開閉します。",
      "AccordionTrigger は実際の button をレンダリングするため、その見出し内に別の button を配置しないでください。",
    ],
  },
  alert: {
    summary:
      "重要な状態や結果を raised サーフェス上で伝えるメッセージ。",
    description:
      "アイコン、タイトル、説明を整列できる組み合わせ可能な Alert です。default、success、destructive の各 variant で、色だけでなく border とテキストのコントラストも組み合わせて意味を示します。",
    props: [
      "メッセージの意味と視覚的な表現を選択します。",
      "アイコン、AlertTitle、AlertDescription を配置します。",
      "既定のサーフェススタイルを拡張します。",
    ],
    accessibility: [
      "Alert は role=alert を使用し、動的に表示される重要なメッセージに適しています。",
      "初期表示時から存在する静的な案内では、role=alert による即時読み上げが不要な場合があります。必要に応じて role を上書きするか、別の container を使用してください。",
      "装飾用アイコンには aria-hidden=true を設定し、同じ意味をタイトルと説明のテキストでも伝えてください。",
    ],
  },
  avatar: {
    summary:
      "画像の読み込みに失敗しても fallback を維持するプロフィールサーフェス。",
    description:
      "Base UI Avatar を基盤に、画像の読み込み状態と fallback への切り替えを管理します。3つの size、ステータス badge、重なり合う group、残り人数の count を提供します。",
    props: [
      "Avatar と badge の size をまとめて変更します。",
      "表示する画像の URL です。",
      "画像が表す人物または対象を識別する代替テキストです。",
      "fallback を表示するまでの遅延時間です。",
      "ステータスの dot または小さなステータスアイコンを表示します。",
    ],
    accessibility: [
      "人物を識別する画像の alt にはその人の名前を使用します。同じ名前が隣に表示される場合は空の alt でも構いません。",
      "AvatarBadge がオンライン状態などの意味を伝える場合は、aria-label または視覚的に非表示のテキストを提供してください。",
      "AvatarGroupCount の +8 のような count には、その意味を説明する aria-label を追加してください。",
    ],
  },
  badge: {
    summary:
      "状態や分類を明確に示す、簡潔なインラインラベル。",
    description:
      "5つの variant を備えた軽量な span ベースのコンポーネントです。インタラクションや暗黙の ARIA role を追加せず、視覚的な強調を提供します。",
    props: [
      "状態の強調度と色を選択します。",
      "短い状態または分類ラベルです。",
      "size、余白、色のスタイルを拡張します。",
    ],
    accessibility: [
      "Badge は既定で span としてレンダリングされるため、状態が明確に伝わるテキストを指定してください。",
      "色だけに依存せず、Ready や Failed のような明確なラベルを使用してください。",
      "操作が必要な場合は Badge 自体に event を付けず、Button または link の中に配置してください。",
    ],
  },
  breadcrumb: {
    summary:
      "現在のページまでの経路を意味のある順序付きリストとして表示します。",
    description:
      "nav と ol の native semantics を維持しながら、link、現在のページ、separator、省略された経路を組み合わせます。現在のページには aria-current=page が自動的に設定されます。",
    props: [
      "経路ナビゲーション領域のアクセシブルな名前です。",
      "親階層を指す実際の URL です。",
      "aria-current=page が設定される現在のページ名です。",
      "支援技術から隠される視覚的な separator です。",
    ],
    accessibility: [
      "Breadcrumb は aria-label=breadcrumb が付いた nav で、経路は順序付きの ol として表現されます。",
      "最後の項目には link ではなく BreadcrumbPage を使用し、aria-current=page を公開してください。",
      "Separator と Ellipsis は装飾要素として支援技術から隠されます。",
    ],
  },
  button: {
    summary:
      "raised、pressed、primary の状態を備えた主要なアクションコントロール。",
    description:
      "native button を使用して form の動作とキーボード操作を維持します。5つの variant と4つの size を提供し、pressed 状態を inset shadow で表現します。",
    props: [
      "button の意味とサーフェス上の強調度を選択します。",
      "高さと左右の padding を選択します。",
      "native button の動作を決定します。",
      "ポインターとキーボードによる操作を無効にします。",
    ],
    accessibility: [
      "native button を使用するため、Space と Enter の動作、および disabled semantics が維持されます。",
      "icon size の button には、その操作内容を説明する aria-label を必ず指定してください。",
      "ナビゲーションには Button の click handler ではなく、semantic な anchor または Link を使用してください。",
    ],
  },
  card: {
    summary:
      "コンテンツを raised、soft、inset、flat の深度でまとめるサーフェス。",
    description:
      "Header、Title、Description、Action、Content、Footer から構成する layout コンポーネントです。root は既定で div のため、コンテンツの semantics に合った見出しやインタラクティブ要素を選択してください。",
    props: [
      "サーフェスの深度と border の表現を選択します。",
      "組み合わせ可能な Card のサブコンポーネントを配置します。",
      "Header の右側に配置する action または状態領域です。",
      "既定で h3 としてレンダリングされる Card の見出しです。",
    ],
    accessibility: [
      "Card は div であり、landmark や article role を自動的には追加しません。",
      "h3 がページの見出し階層に合わない場合は、CardTitle の代わりに適切な見出し要素を使用してください。",
      "Card 全体をクリック可能にする場合は、内部に別の button や link を入れ子にしないでください。",
    ],
  },
  checkbox: {
    summary:
      "boolean と indeterminate の状態に対応する native checkbox。",
    description:
      "透明な native input の上にニューモーフィックなサーフェスを重ね、form 送信とブラウザーのアクセシビリティを維持します。shadcn 形式の onCheckedChange callback とともに、制御・非制御・indeterminate の各状態に対応します。",
    props: [
      "制御された checked 状態または mixed 状態です。",
      "非制御時の初期 checked 状態です。",
      "checked 状態が変わったときに呼び出されます。",
      "input とポインターによる操作を無効にします。",
      "form 送信に使用する native checkbox 属性です。",
    ],
    accessibility: [
      "実際の input[type=checkbox] により、form 送信と Space キーによる操作が維持されます。",
      "Label の htmlFor と Checkbox の id を関連付けるか、Checkbox を label 内に配置してください。",
      "indeterminate 状態では aria-checked=mixed と DOM の indeterminate property の両方が設定されます。",
    ],
  },
  dialog: {
    summary:
      "フォーカスを安全に閉じ込め、元の trigger に戻すモーダルサーフェス。",
    description:
      "Base UI Dialog を基盤に Portal、Backdrop、Popup、title、description、close action を組み合わせます。primitive が Escape、外側の click、focus trap、focus restoration を処理します。",
    props: [
      "制御された open 状態、または非制御時の初期 open 状態です。",
      "open 状態が変わったときに呼び出されます。",
      "背景とのインタラクションと focus trap の動作を決定します。",
      "button または link に trigger／close の動作を合成します。",
      "右上に既定の close button を表示します。",
      "Backdrop の色、blur、transition を個別に拡張します。",
      "外側で pointer press しても Dialog が閉じないようにします。",
    ],
    accessibility: [
      "DialogContent 内に DialogTitle を配置し、補足説明を DialogDescription で関連付けてください。",
      "Base UI がモーダルの focus trap、Escape による終了、終了後の trigger への focus restoration を管理します。",
      "DialogFooter の cancel action を DialogClose で包み、明示的な close 動作を提供してください。",
    ],
  },
  "dropdown-menu": {
    summary:
      "action、selection、submenu をキーボードで移動できるコンテキストメニュー。",
    description:
      "Base UI Menu を基盤とした完全な組み合わせ可能 API です。通常項目、checkbox、radio group、label、separator、shortcut、入れ子の submenu を1つのサーフェス上にまとめます。",
    props: [
      "制御された open 状態、または非制御時の初期 open 状態です。",
      "menu の open 状態が変わったときに呼び出されます。",
      "button または link に trigger の動作を合成します。",
      "trigger を基準に popup を配置します。",
      "trigger と popup の間隔です。",
      "通常または destructive action のスタイルを選択します。",
      "indicator を持つ行とテキストの開始位置を揃えます。",
      "checkbox item の制御状態です。",
      "checkbox item の状態が変わったときに呼び出されます。",
    ],
    accessibility: [
      "Base UI が Arrow キー、Home、End、typeahead による移動、Escape による終了、focus restoration を処理します。",
      "各 DropdownMenuItem には明確な command label を付け、destructive action は variant だけでなく文言でも区別してください。",
      "CheckboxItem の状態は checked と onCheckedChange を使って明示的に管理してください。",
    ],
  },
  input: {
    summary:
      "focus と validation の状態が明確な inset の1行入力フィールド。",
    description:
      "すべての native input 属性を引き渡しながら、ニューモーフィックな inset サーフェス、file input、disabled 状態、aria-invalid 状態を一貫してスタイリングします。",
    props: [
      "email、password、file などの native input type です。",
      "制御された値、または非制御時の初期値です。",
      "期待する値の形式を伝えるための短い例です。",
      "native input の制約を設定します。",
      "エラー用の border と focus ring を有効にします。",
    ],
    accessibility: [
      "Label の htmlFor と Input の id を関連付けるか、aria-label を指定してください。",
      "placeholder は Label の代わりにはならず、期待する形式の例だけを示すために使用します。",
      "エラー時は aria-invalid を設定し、エラーメッセージの id を aria-describedby で関連付けてください。",
    ],
  },
  "input-group": {
    summary:
      "input、addon、action を1つの inset サーフェスにまとめる組み合わせ可能なフィールド。",
    description:
      "InputGroupInput または InputGroupTextarea に、前後の addon、補足テキスト、button を組み合わせます。root の focus-within 状態により、group 全体に一貫した focus 表現を適用します。",
    props: [
      "control、addon、text、button を順番に配置します。",
      "必要に応じて role=group 全体にアクセシブルな名前を指定します。",
      "id、name、type、value、onChange などの native 属性です。",
      "複数行 control の native 属性です。",
      "group action に使用する button type です。",
    ],
    accessibility: [
      "root の role=group は input 自体の名前にはならないため、control を Label と直接関連付けてください。",
      "装飾だけの addon は aria-hidden=true で隠し、意味のある単位や prefix は支援技術から利用できる状態にしてください。",
      "アイコンのみの InputGroupButton には aria-label を指定してください。",
    ],
  },
  label: {
    summary:
      "form control の名前とクリック領域を関連付ける native label。",
    description:
      "すべての標準属性を引き渡す、native label の薄い wrapper です。peer-disabled 状態に対応したテキスト色と cursor スタイルを提供します。",
    props: [
      "関連付ける form control の id です。",
      "control の目的を説明するテキストです。",
      "layout と状態のスタイルを拡張します。",
    ],
    accessibility: [
      "htmlFor は対象 control の id と完全に一致させてください。",
      "RadioGroup など control の group に名前を付ける場合は、単独の Label ではなく fieldset と legend、または aria-labelledby を使用してください。",
      "必須状態や補足説明は、視覚的な表示に加えて required と aria-describedby でも伝えてください。",
    ],
  },
  pagination: {
    summary:
      "現在のページと前後の移動先を明示する raised link の集合。",
    description:
      "nav、ul、li、anchor の semantics を維持する組み合わせ可能な pagination です。active page、previous／next link、省略範囲の indicator を提供します。",
    props: [
      "pagination navigation 領域のアクセシブルな名前です。",
      "移動先ページの実際の URL です。",
      "現在のページ用スタイルと aria-current=page を適用します。",
      "既定のナビゲーションラベルを置き換えます。",
    ],
    accessibility: [
      "ブラウザーのナビゲーションや新しい tab で開く動作を維持するため、各ページには実際の href を持つ link を使用してください。",
      "現在のページ1つだけに isActive を設定し、aria-current=page を適用してください。",
      "Previous と Next には既定の aria-label があります。ローカライズが必要な場合は上書きしてください。",
    ],
  },
  progress: {
    summary:
      "inset track 内の primary fill で進捗を示すステータス。",
    description:
      "Base UI Progress の progressbar semantics を使用します。有効な max と value を正規化し、value が未指定または無効な場合は indeterminate 状態を公開します。",
    props: [
      "0 から max の間に正規化される現在の進捗値です。",
      "0より大きい全体範囲です。無効な値の場合は100を使用します。",
      "進行中のタスクを表すアクセシブルな名前です。",
      "数値以外の説明が必要な場合に aria-valuetext を生成します。",
    ],
    accessibility: [
      "Progress には File upload のようにタスクを説明する aria-label または aria-labelledby が必要です。",
      "表示中の percentage は progressbar と自動的には関連付かないため、label を明示的に関連付けてください。",
      "null value は indeterminate 状態を表すため、完了 percentage のテキストを併記しないでください。",
    ],
  },
  "radio-group": {
    summary:
      "1つの値を選択する native radio input のグループ。",
    description:
      "各項目を実際の input[type=radio] としてレンダリングし、React context を通じて name と選択状態を共有します。制御・非制御の値、水平・垂直 layout、disabled、required に対応します。",
    props: [
      "制御された選択値、または非制御時の初期値です。",
      "選択値が変わったときに呼び出されます。",
      "layout の向きと aria-orientation を設定します。",
      "すべての項目で共有する native radio name です。",
      "すべての項目に input の制約を設定します。",
      "項目が選択されたときに group へ渡す値です。",
    ],
    accessibility: [
      "RadioGroup の root には aria-label または aria-labelledby でアクセシブルな group 名を指定してください。",
      "各 RadioGroupItem の id と Label の htmlFor を関連付けてください。",
      "実際の radio input により、native form 送信とキーボードによる選択動作が維持されます。",
    ],
  },
  "scroll-area": {
    summary:
      "ブラウザーの native scrolling を維持する、テーマ対応の overflow サーフェス。",
    description:
      "overflow-auto と native scrollbar を使用し、wheel、touch、keyboard、ブラウザー標準のアクセシビリティ動作を維持します。ScrollBar export は shadcn の組み合わせ互換性のための非表示 placeholder です。",
    props: [
      "高さまたは幅を制限して overflow 領域を作ります。",
      "focusable な子要素がない場合に、キーボードスクロールの入口を提供します。",
      "独立して移動できる領域である場合にコンテンツ名を指定します。",
      "互換用 placeholder の向きを示す data 属性です。",
    ],
    accessibility: [
      "native overflow は screen reader や touch によるスクロール動作を妨げません。",
      "領域内に link や button がない場合は、tabIndex=0 を指定してキーボード利用者が領域に入れるようにしてください。",
      "ScrollBar は視覚的に非表示の互換用 placeholder であり、実際のスクロールはブラウザーの scrollbar が担います。",
    ],
  },
  select: {
    summary:
      "ブラウザーのアクセシビリティを維持する native select サーフェス。",
    description:
      "native select、optgroup、option を inset field と装飾用 chevron とともに使用します。モバイルでは platform picker を維持し、native form 送信にも対応します。",
    props: [
      "制御された選択値、または非制御時の初期値です。",
      "native select の値が変わったときに呼び出されます。",
      "native select の制約と複数選択を設定します。",
      "option が送信する値です。",
      "optgroup の選択肢グループ名です。",
    ],
    accessibility: [
      "Label の htmlFor と Select の id を関連付けてください。",
      "最初の option を placeholder として使う場合は、空の value と disabled を組み合わせ、実際の Label も維持してください。",
      "native select を使用するため、OS のキーボード操作とモバイル picker の動作が維持されます。",
    ],
  },
  separator: {
    summary:
      "光と細い shadow で関連コンテンツ間の境界を表す divider。",
    description:
      "水平・垂直の orientation に対応し、既定では装飾要素として扱われます。意味のある section 境界には decorative=false を設定し、separator role と aria-orientation を公開できます。",
    props: [
      "divider の向きと size スタイルを設定します。",
      "true の場合は装飾要素として隠し、false の場合は role=separator を適用します。",
      "余白、長さ、minimum-height のスタイルを拡張します。",
    ],
    accessibility: [
      "純粋に視覚的な境界には、既定の decorative=true を維持してください。",
      "文書構造上の意味を持つ境界には decorative=false を使用し、role=separator を公開してください。",
      "垂直 separator には親要素からの高さ、または className による明示的な高さが必要です。",
    ],
  },
  skeleton: {
    summary:
      "読み込み中のコンテンツの大きさと位置を先に示す inset placeholder。",
    description:
      "単純な div ベースの pulse placeholder です。視覚的な読み込み形状だけを提供し、aria-hidden=true によって支援技術から隠されます。",
    props: [
      "placeholder の幅、高さ、radius を設定します。",
      "装飾用 placeholder をアクセシビリティツリーから隠します。",
    ],
    accessibility: [
      "Skeleton 自体は aria-hidden のため、周囲に別の sr-only 状態メッセージまたは role=status を提供してください。",
      "必要に応じて読み込み領域に aria-busy=true を設定し、完了後に削除してください。",
      "グローバルな prefers-reduced-motion 規則により、pulse animation は実質的に無効になります。",
    ],
  },
  slider: {
    summary:
      "水平または垂直の track 上で1つ以上の値を調整する range control。",
    description:
      "Base UI Slider を基盤に、単一値と number[] range の API を提供します。配列の各項目につき1つの thumb を作成し、thumbLabels で各 input に名前を付けます。水平・垂直 orientation、制御・非制御の値に対応します。",
    props: [
      "各 thumb の制御値、または非制御時の初期値です。",
      "選択可能な数値範囲です。",
      "キーボードとポインターで調整するときの増分です。",
      "track の向きとキーボード操作の軸を設定します。",
      "実際の thumb input に値の順序で渡すアクセシブルな名前です。",
      "調整中または調整完了時に値の配列を渡します。",
      "すべての thumb の操作を無効にします。",
    ],
    accessibility: [
      "Slider group には aria-label または aria-labelledby で名前を付け、各 control point の名前を値の順序で thumbLabels に渡してください。",
      "Base UI が各 thumb の role=slider、現在値、最小値、最大値、および Arrow、Page、Home、End キーの動作を管理します。",
      "単一値には1つの thumbLabels 項目を、range には最小値・最大値のように区別できる名前を指定してください。",
    ],
  },
  switch: {
    summary:
      "即時に適用されるオン・オフ設定を pressed track で示すコントロール。",
    description:
      "native checkbox input に role=switch を適用し、form とブラウザーの動作を維持します。checked、defaultChecked、onCheckedChange に対応します。",
    props: [
      "制御されたオン状態、または非制御時の初期状態です。",
      "オン状態が変わったときに呼び出されます。",
      "native checkbox の change event を受け取ります。",
      "input とポインターによる操作を無効にします。",
      "form 送信に使用する native checkbox 属性です。",
    ],
    accessibility: [
      "実際の checkbox に role=switch を適用することで、checked 状態を支援技術に伝え、Space キーの操作も維持します。",
      "Label の htmlFor と Switch の id を関連付けるか、aria-label を指定してください。",
      "即時適用されず、別途 save action が必要な boolean 選択には Checkbox の方が適している場合があります。",
    ],
  },
  table: {
    summary:
      "小さな画面では横方向にスクロールする semantic なデータテーブル。",
    description:
      "native table、caption、thead、tbody、tfoot、tr、th、td を組み合わせます。外側の container が overflow-x-auto とニューモーフィックな raised サーフェスを提供します。",
    props: [
      "caption と table section を配置します。",
      "table の目的とデータ範囲を説明します。",
      "header が説明する cell の方向を指定します。",
      "選択された行の inset 状態を有効にします。",
      "native table cell の span 範囲です。",
    ],
    accessibility: [
      "TableCaption で table の目的を説明し、視覚的に隠す場合は sr-only class を使用してください。",
      "列と行の header には、意味に応じた scope を設定してください。",
      "layout だけを目的として Table を使用せず、CSS grid または flex を使用してください。",
    ],
  },
  tabs: {
    summary:
      "同じ文脈内の panel をキーボードで切り替える tab interface。",
    description:
      "Base UI Tabs を基盤に、active trigger を raised サーフェス、list を inset track として表示します。制御・非制御の値、自動・手動 activation、水平・垂直 orientation に対応します。",
    props: [
      "制御された active tab の値、または非制御時の初期値です。",
      "active tab が変わったときに呼び出されます。",
      "list の向きと Arrow キーによる移動軸を設定します。",
      "Arrow キーで focus を移したときに panel も有効化するかを決定します。",
      "関連する TabsContent と共有する一意の値です。",
      "その panel を開く trigger の値です。",
    ],
    accessibility: [
      "TabsList には aria-label または aria-labelledby で tab group の名前を指定してください。",
      "Base UI が tab、tablist、tabpanel role と、aria-controls および aria-selected の関連付けを管理します。",
      "panel を即時に切り替えられる場合にのみ、TabsList の activateOnFocus を使用してください。",
    ],
  },
  textarea: {
    summary:
      "複数行のテキストを入力する、resize 可能な inset field。",
    description:
      "すべての native textarea 属性を引き渡しながら、最小高さ、垂直 resize、focus、aria-invalid の各状態をニューモーフィックな token でスタイリングします。",
    props: [
      "制御されたテキスト、または非制御時の初期テキストです。",
      "初期表示する行数です。",
      "期待する入力形式を伝えるための短い例です。",
      "native input の制約を設定します。",
      "エラー用の border と focus ring を有効にします。",
    ],
    accessibility: [
      "Label の htmlFor と Textarea の id を関連付け、placeholder で Label を置き換えないでください。",
      "文字数を制限する場合は maxLength と現在の文字数を提供し、必要に応じて aria-describedby で関連付けてください。",
      "エラーメッセージに id を付け、aria-invalid と aria-describedby で control に関連付けてください。",
    ],
  },
  tooltip: {
    summary:
      "hover とキーボード focus で短い補足説明を表示する popup。",
    description:
      "Base UI Tooltip を基盤に Provider、Root、Trigger、Portal、Positioner、Popup を組み合わせます。既定の provider delay は250msで、popup は trigger 周辺の衝突を自動的に回避します。",
    props: [
      "pointer hover 後に tooltip を開くまでの遅延時間（ms）です。",
      "制御された open 状態、または非制御時の初期 open 状態です。",
      "open 状態が変わったときに呼び出されます。",
      "button または link に tooltip trigger の動作を合成します。",
      "trigger を基準に popup を配置します。",
      "trigger と popup の間隔です。",
    ],
    accessibility: [
      "Tooltip は trigger のアクセシブルな名前を置き換えないため、icon button には引き続き aria-label が必要です。",
      "内容は短い補足にとどめ、必須の手順やエラーメッセージを Tooltip だけに配置しないでください。",
      "Base UI は hover だけでなくキーボード focus でも Tooltip を開き、Escape で閉じます。",
    ],
  },
});

export default componentDocCopyJa;
