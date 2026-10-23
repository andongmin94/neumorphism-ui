import type { Locale } from "./config";

export const referencePageSlugs = ["design-tokens","registry","resources","accessibility","verification","credits"] as const;

export const referenceSearchCopy = {
  "en": {
    "design-tokens": {
      "title": "Design tokens",
      "intro": "The shared semantic, surface and depth contract used by every installable component.",
      "keywords": "palette shadow radius transition preset styling",
      "sections": {
        "semantic": "Semantic tokens",
        "surfaces": "Neumorphic surface tokens",
        "settings": "Configuration axes",
        "presets": "Presets",
        "rules": "Usage rules"
      }
    },
    "registry": {
      "title": "Registry architecture",
      "intro": "How source ownership, generated endpoints, dependencies and installation boundaries fit together.",
      "keywords": "source ownership generated endpoints dependencies namespace catalog installation",
      "sections": {
        "ownership": "Source ownership",
        "generated": "Generated output",
        "install": "Installation flow",
        "directory": "Directory metadata",
        "boundaries": "Boundaries"
      }
    },
    "resources": {
      "title": "Resources",
      "intro": "Quick paths to components, templates, charts, themes and registry verification.",
      "keywords": "components templates charts theme source commands",
      "sections": {
        "product": "Explore the library",
        "engineering": "Development and verification",
        "source": "Inspect source"
      }
    },
    "accessibility": {
      "title": "Accessibility",
      "intro": "The interaction contract components aim to preserve, separated from what the project has actually verified.",
      "keywords": "keyboard focus semantics reduced motion screen reader contrast",
      "sections": {
        "keyboard": "Keyboard and focus",
        "semantics": "Semantics and state",
        "motion": "Motion and visible state",
        "evidence": "Current verification",
        "limits": "What is not certified"
      }
    },
    "verification": {
      "title": "Verification & release",
      "intro": "What default CI, full local/manual checks and deployed-site smoke checks each verify.",
      "keywords": "CI tests release installation browser generated security audit smoke comprehensive",
      "sections": {
        "source": "Source contracts",
        "generation": "Generated equality",
        "default": "Default CI",
        "comprehensive": "Full local and manual checks",
        "deployed": "Deployed-site smoke checks",
        "release": "Release boundaries"
      }
    },
    "credits": {
      "title": "Credits & dependencies",
      "intro": "The major open-source packages used by Neumorphism UI and the responsibility each one retains.",
      "keywords": "license attribution packages dependencies font copyright",
      "sections": {
        "packages": "Packages and roles",
        "licenses": "License and attribution"
      }
    }
  },
  "ko": {
    "design-tokens": {
      "title": "디자인 토큰",
      "intro": "설치 가능한 컴포넌트가 공유하는 의미·표면·깊이 토큰을 확인합니다.",
      "keywords": "팔레트 그림자 반경 전환 프리셋 스타일 테마",
      "sections": {
        "semantic": "의미 토큰",
        "surfaces": "뉴모피즘 표면 토큰",
        "settings": "설정 축",
        "presets": "프리셋",
        "rules": "사용 규칙"
      }
    },
    "registry": {
      "title": "Registry 구조",
      "intro": "소스 관리 위치, 생성된 엔드포인트, 의존 관계와 설치 범위를 설명합니다.",
      "keywords": "소스 생성 엔드포인트 의존성 네임스페이스 목록 설치 구조",
      "sections": {
        "ownership": "소스 관리 위치",
        "generated": "생성된 출력",
        "install": "설치 흐름",
        "directory": "디렉터리 메타데이터",
        "boundaries": "책임 범위"
      }
    },
    "resources": {
      "title": "리소스",
      "intro": "컴포넌트, 템플릿, 차트, 테마와 레지스트리 검증으로 빠르게 이동합니다.",
      "keywords": "컴포넌트 템플릿 차트 테마 소스 명령어",
      "sections": {
        "product": "라이브러리 둘러보기",
        "engineering": "개발과 검증",
        "source": "소스 확인"
      }
    },
    "accessibility": {
      "title": "접근성",
      "intro": "컴포넌트가 지키는 접근성 동작과 실제 검증한 범위를 구분해 설명합니다.",
      "keywords": "키보드 포커스 의미 상태 모션 줄이기 스크린 리더 대비",
      "sections": {
        "keyboard": "키보드와 포커스",
        "semantics": "의미와 상태",
        "motion": "모션과 시각 상태",
        "evidence": "현재 검증",
        "limits": "인증하지 않은 범위"
      }
    },
    "verification": {
      "title": "검증과 릴리스",
      "intro": "기본 CI, 전체 로컬·수동 검사와 배포 사이트 핵심 검사의 범위를 설명합니다.",
      "keywords": "CI 테스트 릴리스 설치 브라우저 생성 보안 감사 스모크 전체 검증",
      "sections": {
        "source": "소스 규칙",
        "generation": "생성 일치",
        "default": "기본 CI",
        "comprehensive": "전체 로컬·수동 검사",
        "deployed": "배포 사이트 핵심 검사",
        "release": "릴리스 범위"
      }
    },
    "credits": {
      "title": "출처와 의존성",
      "intro": "Neumorphism UI가 사용하는 주요 오픈소스 패키지와 각 역할을 정리합니다.",
      "keywords": "라이선스 출처 패키지 의존성 폰트 저작권",
      "sections": {
        "packages": "패키지와 역할",
        "licenses": "라이선스와 출처 표시"
      }
    }
  },
  "ja": {
    "design-tokens": {
      "title": "デザイントークン",
      "intro": "導入可能なコンポーネントが共有する意味・表面・奥行きのトークンを確認します。",
      "keywords": "配色 影 角丸 遷移 プリセット スタイル テーマ",
      "sections": {
        "semantic": "意味トークン",
        "surfaces": "ニューモーフィズムの表面トークン",
        "settings": "設定項目",
        "presets": "プリセット",
        "rules": "利用ルール"
      }
    },
    "registry": {
      "title": "Registryの構造",
      "intro": "ソースの管理場所、生成エンドポイント、依存関係とインストールの範囲を説明します。",
      "keywords": "ソース 生成 エンドポイント 依存関係 名前空間 一覧 インストール 構造",
      "sections": {
        "ownership": "ソースの管理場所",
        "generated": "生成物",
        "install": "インストールの流れ",
        "directory": "ディレクトリのメタデータ",
        "boundaries": "責任の範囲"
      }
    },
    "resources": {
      "title": "リソース",
      "intro": "コンポーネント、テンプレート、チャート、テーマとレジストリ検証に移動できます。",
      "keywords": "コンポーネント テンプレート チャート テーマ ソース コマンド",
      "sections": {
        "product": "ライブラリを探す",
        "engineering": "開発と検証",
        "source": "ソースを確認"
      }
    },
    "accessibility": {
      "title": "アクセシビリティ",
      "intro": "コンポーネントが維持する操作の約束と、実際に検証した範囲を分けて説明します。",
      "keywords": "キーボード フォーカス 意味 状態 動きを減らす スクリーンリーダー コントラスト",
      "sections": {
        "keyboard": "キーボードとフォーカス",
        "semantics": "意味と状態",
        "motion": "動きと視覚的な状態",
        "evidence": "現在の検証",
        "limits": "認証していない範囲"
      }
    },
    "verification": {
      "title": "検証とリリース",
      "intro": "通常のCI、全項目のローカル・手動検査、公開サイトの主要検査の範囲を説明します。",
      "keywords": "CI テスト リリース インストール ブラウザ 生成 セキュリティ 監査 スモーク 包括的",
      "sections": {
        "source": "ソースの規則",
        "generation": "生成一致",
        "default": "通常のCI",
        "comprehensive": "全項目のローカル・手動検査",
        "deployed": "公開サイトの主要検査",
        "release": "リリースの範囲"
      }
    },
    "credits": {
      "title": "出典と依存関係",
      "intro": "Neumorphism UIが使用する主要なオープンソースパッケージと各役割を説明します。",
      "keywords": "ライセンス 出典 パッケージ 依存関係 フォント 著作権",
      "sections": {
        "packages": "パッケージと役割",
        "licenses": "ライセンスと出典表示"
      }
    }
  },
  "zh": {
    "design-tokens": {
      "title": "设计令牌",
      "intro": "查看所有可安装组件共享的语义、表面与深度令牌。",
      "keywords": "配色 阴影 圆角 过渡 预设 样式 主题",
      "sections": {
        "semantic": "语义令牌",
        "surfaces": "新拟态表面令牌",
        "settings": "配置维度",
        "presets": "预设",
        "rules": "使用规则"
      }
    },
    "registry": {
      "title": "Registry架构",
      "intro": "说明源码管理位置、生成端点、依赖关系与安装边界。",
      "keywords": "源码 生成 端点 依赖 命名空间 目录 安装 架构",
      "sections": {
        "ownership": "源码管理位置",
        "generated": "生成产物",
        "install": "安装流程",
        "directory": "目录元数据",
        "boundaries": "责任边界"
      }
    },
    "resources": {
      "title": "资源",
      "intro": "快速访问组件、模板、图表、主题与注册表验证。",
      "keywords": "组件 模板 图表 主题 源码 命令",
      "sections": {
        "product": "浏览组件库",
        "engineering": "开发与验证",
        "source": "查看源码"
      }
    },
    "accessibility": {
      "title": "无障碍",
      "intro": "区分组件应保持的交互规则与项目实际验证的范围。",
      "keywords": "键盘 焦点 语义 状态 减少动态效果 屏幕阅读器 对比度",
      "sections": {
        "keyboard": "键盘与焦点",
        "semantics": "语义与状态",
        "motion": "动效与可见状态",
        "evidence": "当前验证",
        "limits": "尚未认证的范围"
      }
    },
    "verification": {
      "title": "验证与发布",
      "intro": "说明默认CI、完整本地与手动检查，以及已部署站点核心检查各自的范围。",
      "keywords": "CI 测试 发布 安装 浏览器 生成 安全 审计 冒烟 完整验证",
      "sections": {
        "source": "源码规则",
        "generation": "生成一致性",
        "default": "默认CI",
        "comprehensive": "完整本地与手动检查",
        "deployed": "已部署站点核心检查",
        "release": "发布边界"
      }
    },
    "credits": {
      "title": "来源与依赖",
      "intro": "列出Neumorphism UI使用的主要开源包及各自的职责。",
      "keywords": "许可证 来源 软件包 依赖 字体 版权",
      "sections": {
        "packages": "软件包与职责",
        "licenses": "许可证与来源标注"
      }
    }
  }
} as const;

export function getReferenceSearchEntries(locale: Locale) {
  const pages = referenceSearchCopy[locale];
  return referencePageSlugs.map((slug) => ({
    slug,
    title: pages[slug].title,
    summary: `${pages[slug].intro} ${pages[slug].keywords}`,
    sections: Object.entries(pages[slug].sections).map(([id, title]) => ({ id, title })),
  }));
}
