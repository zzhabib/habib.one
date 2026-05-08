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
    title: '意図を込めて、作る。',
    p1: '大きなインパクトを生む体験を作ることに情熱を注ぐソフトウェアエンジニアです。複雑な問題をエレガントな解決策へと変え、すべての意思決定の背後にあるクラフトを大切にしています。エンジニアリング、クリエイティビティ、そして好奇心が交わる場所で、私は最も力を発揮します。',
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
    title: '一緒に作りましょう。',
    body: '技術的な深みとクリエイティブなビジョンの両方を求めるものを作っているなら、ぜひ一緒に取り組みたいです。',
    email: 'メールを送る',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
}
