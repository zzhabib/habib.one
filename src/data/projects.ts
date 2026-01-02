export interface ProjectData {
  slug: string
  title: string
  thumbnail: string
  playcount: string
  alignment: 'left' | 'right'
  description: string
  technologies: string[]
  robloxLink: string
}

export const projectsData: ProjectData[] = [
  {
    slug: 'kart-wars',
    title: 'Kart Wars',
    thumbnail: 'https://tr.rbxcdn.com/180DAY-d754b15c1cfc286b489ad212b272fa8c/768/432/Image/Webp/noFilter',
    playcount: '30,000+ plays',
    alignment: 'left',
    description: 'A multiplayer kart racing game with exciting tracks and power-ups. Players can compete against each other in fast-paced races.',
    technologies: ['Roblox Studio', 'React', 'Game Design', 'Multiplayer'],
    robloxLink: 'https://www.roblox.com/games/116846107054100' // TODO: Update with actual link
  },
  {
    slug: 'project-trackday',
    title: 'Project Trackday',
    thumbnail: 'https://tr.rbxcdn.com/180DAY-bd94c3d521e2e599b18a124f80fbb126/768/432/Image/Webp/noFilter',
    playcount: '40,000,000+ plays',
    alignment: 'right',
    description: 'A realistic racing simulator featuring detailed car physics and authentic driving experiences on professional race tracks.',
    technologies: ['Roblox Studio', 'Lua', 'Multiplayer'],
    robloxLink: 'https://www.roblox.com/games/4864763388' // TODO: Update with actual link
  }
]

export function getProjectBySlug(slug: string): ProjectData | null {
  return projectsData.find(p => p.slug === slug) || null
}
