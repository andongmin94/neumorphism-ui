import type { BlogArticle } from "@neumorphism-ui/registry/blocks/blog-post";
import type { Locale } from "@/i18n/config";

export const demoBlogArticles = {
  "en": [
    {
      "slug": "draft-after-failed-save",
      "title": "Recover a draft after a failed save",
      "summary": "Retain the edited title and body, report the error, and retry the save.",
      "topic": "Product",
      "publishedAt": "2026-09-18",
      "readTimeMinutes": 4,
      "publishedLabel": "Sep 18, 2026",
      "readTime": "4 min read",
      "intro": "A failed save should not erase the title, summary or body that someone just edited. Keep the draft in the form and show the error next to the save action.",
      "sections": [
        {
          "heading": "Separate the draft from the saved copy",
          "paragraphs": [
            "When the editor opens, start with the saved post and keep a separate draft for changes. Typing updates the draft; it does not mark the post as saved.",
            "Only replace the saved copy after the save callback resolves. When it rejects, leave both the draft and the previous saved copy intact."
          ]
        },
        {
          "heading": "Retry without re-entering the post",
          "paragraphs": [
            "After a failed request, the author should be able to correct a field or retry with the same draft."
          ],
          "points": [
            "Show a save error without clearing the inputs.",
            "Keep Save available after the request finishes.",
            "Ask before discarding a draft with unsaved changes."
          ]
        }
      ]
    },
    {
      "slug": "dialog-keyboard-focus",
      "title": "Return keyboard focus after closing a dialog",
      "summary": "Check Escape, the close action and focus returning to the button that opened the dialog.",
      "topic": "Engineering",
      "publishedAt": "2026-09-10",
      "readTimeMinutes": 6,
      "publishedLabel": "Sep 10, 2026",
      "readTime": "6 min read",
      "intro": "Closing a dialog should leave the keyboard user at a useful place. Check that focus returns to the button that opened it, so the next action is easy to reach.",
      "sections": [
        {
          "heading": "Check every close action",
          "paragraphs": [
            "Use the dialog primitive’s focus handling. Test the close button and Escape, then continue with Tab to check the order of the surrounding controls."
          ],
          "points": [
            "Open the dialog with the keyboard.",
            "Close with Escape and check that the opening button receives focus.",
            "Reopen it, use the close button, and check the same return path."
          ]
        }
      ]
    },
    {
      "slug": "compact-control-icons",
      "title": "Align icons in compact controls",
      "summary": "Use the same icon box for small buttons, menu indicators and disclosure controls.",
      "topic": "Design",
      "publishedAt": "2026-08-29",
      "readTimeMinutes": 5,
      "publishedLabel": "Aug 29, 2026",
      "readTime": "5 min read",
      "intro": "Small controls are easier to scan when their icons use a consistent size and alignment. A shared icon box keeps buttons, menus and disclosure controls visually related.",
      "sections": [
        {
          "heading": "Align the icon box",
          "paragraphs": [
            "Give each icon the same width and height, keep it from shrinking, and center it beside the text. Check the result with both short and wrapping labels."
          ],
          "points": [
            "Use one icon size for controls with the same visual weight.",
            "Keep the gap between the icon and label consistent.",
            "Give icon-only buttons an accessible name; hide decorative icons from assistive technology."
          ]
        }
      ]
    }
  ],
  "ko": [
    {
      "slug": "draft-after-failed-save",
      "title": "저장 실패 후 초안 복구하기",
      "summary": "수정한 제목과 본문을 유지하고 오류를 표시한 뒤 저장을 다시 시도합니다.",
      "topic": "제품",
      "publishedAt": "2026-09-18",
      "readTimeMinutes": 4,
      "publishedLabel": "2026년 9월 18일",
      "readTime": "4분 읽기",
      "intro": "저장에 실패했다고 방금 고친 제목, 요약, 본문까지 사라져서는 안 됩니다. 입력한 초안은 폼에 남기고 저장 버튼 근처에 오류를 표시합니다.",
      "sections": [
        {
          "heading": "초안과 저장된 사본 구분하기",
          "paragraphs": [
            "편집기를 열면 저장된 글을 불러오고, 수정할 초안을 별도로 둡니다. 입력은 초안만 바꾸며 글을 저장된 상태로 표시하지 않습니다.",
            "저장 콜백이 성공한 뒤에만 저장된 사본을 교체합니다. 요청이 실패하면 초안과 이전 사본을 모두 유지합니다."
          ]
        },
        {
          "heading": "다시 입력하지 않고 재시도하기",
          "paragraphs": [
            "요청이 실패한 뒤에도 작성자는 항목을 고치거나 같은 초안으로 저장을 다시 시도할 수 있어야 합니다."
          ],
          "points": [
            "입력란을 비우지 않고 저장 오류를 표시합니다.",
            "요청이 끝나면 저장 버튼을 다시 사용할 수 있게 합니다.",
            "저장하지 않은 초안을 버리기 전에 확인을 받습니다."
          ]
        }
      ]
    },
    {
      "slug": "dialog-keyboard-focus",
      "title": "대화상자를 닫은 뒤 키보드 포커스 돌려주기",
      "summary": "Escape와 닫기 동작을 확인하고 대화상자를 연 버튼으로 포커스를 돌려줍니다.",
      "topic": "개발",
      "publishedAt": "2026-09-10",
      "readTimeMinutes": 6,
      "publishedLabel": "2026년 9월 10일",
      "readTime": "6분 읽기",
      "intro": "대화상자를 닫은 뒤에도 키보드 사용자가 다음 동작을 이어 갈 수 있어야 합니다. 대화상자를 연 버튼으로 포커스가 돌아오는지 확인합니다.",
      "sections": [
        {
          "heading": "닫기 동작마다 확인하기",
          "paragraphs": [
            "대화상자 기본 요소의 포커스 처리를 사용합니다. 닫기 버튼과 Escape를 각각 시험한 뒤 Tab을 눌러 주변 컨트롤의 이동 순서도 확인합니다."
          ],
          "points": [
            "키보드로 대화상자를 엽니다.",
            "Escape로 닫고 대화상자를 연 버튼에 포커스가 돌아오는지 확인합니다.",
            "다시 연 뒤 닫기 버튼을 눌러 같은 위치로 돌아오는지 확인합니다."
          ]
        }
      ]
    },
    {
      "slug": "compact-control-icons",
      "title": "작은 컨트롤의 아이콘 정렬하기",
      "summary": "작은 버튼, 메뉴 표시, 펼침 컨트롤에 같은 크기의 아이콘 영역을 사용합니다.",
      "topic": "디자인",
      "publishedAt": "2026-08-29",
      "readTimeMinutes": 5,
      "publishedLabel": "2026년 8월 29일",
      "readTime": "5분 읽기",
      "intro": "작은 컨트롤은 아이콘의 크기와 정렬이 일정할 때 더 쉽게 훑어볼 수 있습니다. 공통 아이콘 영역을 사용하면 버튼, 메뉴, 펼침 컨트롤의 모습이 자연스럽게 이어집니다.",
      "sections": [
        {
          "heading": "아이콘 영역 맞추기",
          "paragraphs": [
            "각 아이콘에 같은 너비와 높이를 지정하고 줄어들지 않게 하며 텍스트 옆의 가운데에 배치합니다. 짧은 레이블과 줄바꿈되는 레이블에서 모두 확인합니다."
          ],
          "points": [
            "시각적 비중이 같은 컨트롤에는 같은 아이콘 크기를 사용합니다.",
            "아이콘과 레이블 사이의 간격을 일정하게 유지합니다.",
            "아이콘만 있는 버튼에는 접근 가능한 이름을 제공하고 장식용 아이콘은 보조 기술에서 숨깁니다."
          ]
        }
      ]
    }
  ],
  "ja": [
    {
      "slug": "draft-after-failed-save",
      "title": "保存失敗後の下書きを復元する",
      "summary": "編集したタイトルと本文を保持し、エラーを表示して保存を再試行します。",
      "topic": "プロダクト",
      "publishedAt": "2026-09-18",
      "readTimeMinutes": 4,
      "publishedLabel": "2026年9月18日",
      "readTime": "4分で読めます",
      "intro": "保存に失敗しても、編集したタイトル、概要、本文を消してはいけません。下書きをフォームに残し、保存ボタンの近くにエラーを表示します。",
      "sections": [
        {
          "heading": "下書きと保存済みの内容を分ける",
          "paragraphs": [
            "編集画面を開いたら、保存済みの記事とは別に編集用の下書きを用意します。入力は下書きだけを変更し、記事を保存済みにはしません。",
            "保存コールバックが成功してから、保存済みの内容を更新します。失敗した場合は、下書きと前回の保存内容をどちらも保持します。"
          ]
        },
        {
          "heading": "再入力せずにやり直す",
          "paragraphs": [
            "リクエストが失敗した後も、項目を修正したり、同じ下書きのまま保存を再試行したりできるようにします。"
          ],
          "points": [
            "入力欄を空にせず、保存エラーを表示します。",
            "リクエストが終わったら、保存ボタンを再び使えるようにします。",
            "未保存の下書きを破棄する前に確認します。"
          ]
        }
      ]
    },
    {
      "slug": "dialog-keyboard-focus",
      "title": "ダイアログを閉じた後にフォーカスを戻す",
      "summary": "Escape、閉じる操作、開いたボタンへのフォーカス復帰を確認します。",
      "topic": "開発",
      "publishedAt": "2026-09-10",
      "readTimeMinutes": 6,
      "publishedLabel": "2026年9月10日",
      "readTime": "6分で読めます",
      "intro": "ダイアログを閉じた後も、キーボードで次の操作を続けられるようにします。開いたボタンにフォーカスが戻ることを確認します。",
      "sections": [
        {
          "heading": "すべての閉じ方を確認する",
          "paragraphs": [
            "ダイアログのプリミティブが提供するフォーカス処理を使います。閉じるボタンとEscapeをそれぞれ試し、続けてTabで周囲のコントロールの移動順序を確認します。"
          ],
          "points": [
            "キーボードでダイアログを開きます。",
            "Escapeで閉じ、開いたボタンにフォーカスが戻ることを確認します。",
            "もう一度開いて閉じるボタンを使い、同じ場所へ戻ることを確認します。"
          ]
        }
      ]
    },
    {
      "slug": "compact-control-icons",
      "title": "小さなコントロールのアイコンを揃える",
      "summary": "小さなボタン、メニューの印、開閉コントロールで同じアイコン領域を使います。",
      "topic": "デザイン",
      "publishedAt": "2026-08-29",
      "readTimeMinutes": 5,
      "publishedLabel": "2026年8月29日",
      "readTime": "5分で読めます",
      "intro": "小さなコントロールは、アイコンのサイズと位置が揃っていると見渡しやすくなります。共通のアイコン領域でボタン、メニュー、開閉コントロールに統一感を持たせます。",
      "sections": [
        {
          "heading": "アイコンの領域を揃える",
          "paragraphs": [
            "各アイコンの幅と高さを揃え、縮まないようにして、テキストの横で中央に配置します。短いラベルと折り返すラベルの両方を確認します。"
          ],
          "points": [
            "同じ視覚的な重みのコントロールには同じアイコンサイズを使います。",
            "アイコンとラベルの間隔を一定にします。",
            "アイコンだけのボタンにはアクセシブルな名前を付け、装飾用アイコンは支援技術から隠します。"
          ]
        }
      ]
    }
  ],
  "zh": [
    {
      "slug": "draft-after-failed-save",
      "title": "保存失败后恢复草稿",
      "summary": "保留编辑过的标题和正文，显示错误，然后重新保存。",
      "topic": "产品",
      "publishedAt": "2026-09-18",
      "readTimeMinutes": 4,
      "publishedLabel": "2026年9月18日",
      "readTime": "阅读约4分钟",
      "intro": "保存失败不应清除刚刚编辑的标题、摘要和正文。将草稿保留在表单中，并在保存按钮附近显示错误。",
      "sections": [
        {
          "heading": "区分草稿与已保存的副本",
          "paragraphs": [
            "打开编辑器时，读取已保存的文章，同时建立单独的编辑草稿。输入只更新草稿，不会将文章标记为已保存。",
            "仅在保存回调成功后更新已保存的副本。如果请求失败，保留草稿和上一次保存的内容。"
          ]
        },
        {
          "heading": "无需重新输入即可重试",
          "paragraphs": [
            "请求失败后，作者仍应能够修改字段，或使用同一份草稿重新保存。"
          ],
          "points": [
            "显示保存错误，不清空输入内容。",
            "请求结束后，让保存按钮可以再次使用。",
            "丢弃未保存的草稿之前请求确认。"
          ]
        }
      ]
    },
    {
      "slug": "dialog-keyboard-focus",
      "title": "关闭对话框后恢复键盘焦点",
      "summary": "检查 Escape、关闭操作以及焦点是否返回打开对话框的按钮。",
      "topic": "开发",
      "publishedAt": "2026-09-10",
      "readTimeMinutes": 6,
      "publishedLabel": "2026年9月10日",
      "readTime": "阅读约6分钟",
      "intro": "关闭对话框后，键盘用户应当能够继续下一步操作。确认焦点返回打开对话框的按钮，让接下来的操作容易找到。",
      "sections": [
        {
          "heading": "检查每一种关闭方式",
          "paragraphs": [
            "使用对话框基础组件提供的焦点管理。分别测试关闭按钮和Escape，再按Tab检查周围控件的移动顺序。"
          ],
          "points": [
            "使用键盘打开对话框。",
            "按Escape关闭，确认焦点回到打开对话框的按钮。",
            "重新打开后使用关闭按钮，确认焦点回到同一位置。"
          ]
        }
      ]
    },
    {
      "slug": "compact-control-icons",
      "title": "对齐小型控件中的图标",
      "summary": "为小按钮、菜单标记和展开控件使用相同尺寸的图标区域。",
      "topic": "设计",
      "publishedAt": "2026-08-29",
      "readTimeMinutes": 5,
      "publishedLabel": "2026年8月29日",
      "readTime": "阅读约5分钟",
      "intro": "小型控件中的图标具有统一的尺寸和对齐方式时，更容易快速浏览。共用图标区域可以让按钮、菜单和展开控件保持一致。",
      "sections": [
        {
          "heading": "对齐图标区域",
          "paragraphs": [
            "为各个图标设置相同的宽度和高度，防止其收缩，并在文字旁居中放置。检查短标签和换行标签下的效果。"
          ],
          "points": [
            "视觉权重相同的控件使用相同的图标尺寸。",
            "保持图标与标签之间的间距一致。",
            "为纯图标按钮提供可访问名称，并向辅助技术隐藏装饰性图标。"
          ]
        }
      ]
    }
  ]
} satisfies Record<Locale, readonly (BlogArticle & { readTimeMinutes: number })[]>;
