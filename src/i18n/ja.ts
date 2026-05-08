import type { Strings } from './en'

export const ja: Strings = {
  hero: {
    greeting: 'はじめまして、',
    title: 'ソフトウェアエンジニア・ゲーム開発・日本語独学者',
  },
  sections: {
    about: '自己紹介',
    projects: 'プロジェクト',
    experience: '職歴',
    skills: 'スキル',
    contact: 'お問い合わせ',
  },
  about: {
    title: '継続的にレベルアップしてる。',
    p1: '楽しいゲームと速いシステムを作るソフトウェアエンジニアです。Robloxで400万回以上プレイされたカートレーシングゲーム「Kart Wars」の開発をリードしました。CMEグループではリアルタイムリスク管理システムを構築しています。日本語を4年以上独学で学び続け、自分の限界を広げる次の挑戦を常に探しています。',
    statN2: '日本語能力試験N2合格',
    stat40m: 'Robloxゲームの総プレイ数',
    statMCS: 'コンピュータサイエンス修士 — ASU 2025',
  },
  experience: {
    title: '職歴。',
    entries: [
      {
        company: 'CME Group',
        dateLabel: '現在',
        period: '2024年5月 → 現在',
        roles: [
          {
            role: 'ソフトウェアエンジニア II',
            period: '2024年9月 → 現在',
            description:
              'Java / KubernetesでGoogle Cloud上のポストトレードリスク管理システムを構築しています。',
            chips: ['Java', 'Spring Boot', 'Kubernetes', 'Kafka', 'GCP', 'Google ADK', 'Gemini'],
          },
          {
            role: 'ソフトウェアエンジニアインターン',
            period: '2024年5月 → 2024年8月',
            description:
              'Backstage/ReactでCI/CD・Kubernetes・セキュリティスキャンを統合した内部開発者ポータルを構築しました。',
            chips: ['React', 'Backstage', 'Kubernetes', 'Argo'],
          },
        ],
      },
      {
        company: 'Garmin',
        dateLabel: 'インターン',
        period: '2023年1月 → 2023年8月',
        roles: [
          {
            role: 'ソフトウェアエンジニアインターン',
            description:
              '100以上のコードベース間のテーブル参照を1.6秒以内にクエリできるデータベース依存関係検索エンジンを開発しました。',
            chips: ['C#', 'SQL', '.NET'],
          },
        ],
      },
    ],
  },
  projects: {
    title: '主なプロジェクト。',
    viewRoblox: 'Robloxでプレイ ↗',
    viewProject: 'GitHub ↗',
    entries: {
      'kart-wars': {
        title: 'Kart Wars',
        eyebrow: 'ゲーム · 2023年〜現在',
        description:
          'Roblox上の楽しいカートレーシングゲーム。モデラー・VFXアーティスト・レベルデザイナーのチームをリード。物理ベースの走行、パワーアップ、カスタマイズ、リアルタイムHUDをReactで実装。',
        chips: ['Lua', 'React', 'Roblox Studio'],
        playcount: '400万回以上プレイ',
      },
      trackday: {
        title: 'Project Trackday',
        eyebrow: 'ゲーム · 2022年〜2025年',
        description:
          'Robloxのリアルなサーキットレーシングゲーム。ゲーム内ショップ、レースモード、UIの刷新を実装。新コースとフォーミュラスタイルの車のリリースをリード。',
        chips: ['Lua', 'Roblox Studio'],
        playcount: '4,000万回以上プレイ',
      },
      kosma: {
        title: 'Kosma',
        eyebrow: 'サイドプロジェクト · 2026年',
        description:
          'Three.js・ECSアーキテクチャ・Anthropic API統合を組み合わせた実験的なAI駆動の3D物理演算サンドボックス。完全クライアントサイドでブラウザで動作。',
        chips: ['Three.js', 'TypeScript', 'ECS'],
        playcount: 'ブラウザ対応・AI + 物理演算',
      },
    },
  },
  skills: {
    title: '技術スタック。',
    groups: [
      { label: 'プログラミング言語', chips: ['TypeScript', 'Python', 'Java', 'Lua', 'C#', 'SQL'] },
      { label: 'フレームワーク', chips: ['React', 'Node.js', 'Spring Boot', 'Kafka', 'Google ADK', 'PyTorch'] },
      { label: 'クラウド・インフラ', chips: ['GCP', 'Kubernetes', 'Terraform', 'Docker', 'PostgreSQL'] },
      { label: '資格', chips: ['JLPT N2', 'GCP Pro Cloud Dev', 'GCP Gen AI Leader'] },
      { label: '言語', chips: ['English (Native)', '日本語 N2'] },
    ],
  },
  contact: {
    title: '一緒に働きましょう。',
    body: '常に新しい挑戦に取り組み、難しい技術的な問題を解決することを楽しみにしています。野心的なものを作っているなら、ぜひお話しましょう。',
    email: 'メールを送る',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
}
