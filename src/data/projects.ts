export interface ProjectData {
  slug: string
  thumbnail: string
  link: string
  linkType: 'roblox' | 'external'
}

export const projectsData: ProjectData[] = [
  {
    slug: 'trackday',
    thumbnail: 'https://tr.rbxcdn.com/180DAY-bd94c3d521e2e599b18a124f80fbb126/768/432/Image/Webp/noFilter',
    link: 'https://www.roblox.com/games/4864763388',
    linkType: 'roblox',
  },
  {
    slug: 'kart-wars',
    thumbnail: 'https://tr.rbxcdn.com/180DAY-d754b15c1cfc286b489ad212b272fa8c/768/432/Image/Webp/noFilter',
    link: 'https://www.roblox.com/games/116846107054100',
    linkType: 'roblox',
  },
  {
    slug: 'kosma',
    thumbnail: '',
    link: 'https://habib.one/kosma',
    linkType: 'external',
  },
]
