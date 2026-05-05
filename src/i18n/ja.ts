import type { Strings } from './en'

export const ja: Strings = {
  hero: {
    greeting: 'はじめまして、',
    title: 'ソフトウェアエンジニア',
    tagline1: '',
    tagline2: 'JLPT N2取得',
  },
  sections: {
    experience: '職歴',
    projects: 'プロジェクト',
    contact: 'お問い合わせ',
  },
  experience: {
    entries: [
      { company: 'CME Group', role: 'ソフトウェアエンジニア II', period: '2024年9月 - 現在' },
      { company: 'CME Group', role: 'ソフトウェアエンジニア インターン', period: '2024年5月 - 2024年8月' },
      { company: 'Garmin', role: 'ソフトウェアエンジニア インターン', period: '2023年1月 - 2023年8月' },
      { company: 'Arizona State University', role: 'XRデベロッパー', period: '2021年5月 - 2022年4月' },
    ],
  },
  projects: {
    viewRoblox: 'Robloxで見る',
    viewProject: 'プロジェクトを見る',
    entries: {
      trackday: {
        title: 'Project Trackday',
        playcount: '4,000万回以上のプレイ',
        description:
          'Robloxのリアルなレーシングシミュレーターのリード開発者。レースモード・フォーミュラカー・UI刷新など継続的にアップデートを提供し、プレイヤー数を40%増加。ショップシステムを導入し収益を400%向上させた。',
      },
      'kart-wars': {
        title: 'Kart Wars',
        playcount: '200万回以上のプレイ',
        description:
          'マルチプレイヤーカートレーシングゲームをゼロから制作。リリース後2ヶ月で200万回プレイを達成。モデラー・レベルデザイナー・VFX/SFXアーティストのチームをリード。ゲーム内UI（HUD・ストア・通知）はReactで実装。',
      },
      kosma: {
        title: 'Kosma',
        playcount: 'ブラウザ対応・AI + 物理演算',
        description:
          'Three.jsレンダリング・ECS（エンティティコンポーネントシステム）アーキテクチャ・Claude AI統合を組み合わせた、ブラウザ上で動作するフィジックスプレイグラウンド。',
      },
    },
  },
  contact: {
    header: 'ご連絡はこちら',
    email: 'メール',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
}
