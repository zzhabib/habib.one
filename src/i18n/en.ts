export const en = {
  hero: {
    greeting: "Hi, I'm",
    title: 'Software Engineer',
    tagline1: '',
    tagline2: 'JLPT N2',
  },
  sections: {
    experience: 'Experience',
    projects: 'Projects',
    contact: 'Contact',
  },
  experience: {
    entries: [
      { company: 'CME Group', role: 'Software Engineer II', period: 'Sep 2024 - Present' },
      { company: 'CME Group', role: 'Software Engineer Intern', period: 'May 2024 - Aug 2024' },
      { company: 'Garmin', role: 'Software Engineer Intern', period: 'Jan 2023 - Aug 2023' },
      { company: 'Arizona State University', role: 'XR Developer', period: 'May 2021 - Apr 2022' },
    ],
  },
  projects: {
    viewRoblox: 'View on Roblox',
    viewProject: 'View Project',
    entries: {
      trackday: {
        title: 'Project Trackday',
        playcount: '40,000,000+ plays',
        description:
          'Lead developer on a realistic Roblox racing simulator. Continuously shipped updates — race modes, formula cars, revamped UI — growing the player base by 40%. Introduced a shop system that became the primary revenue driver, boosting income by 400%.',
      },
      'kart-wars': {
        title: 'Kart Wars',
        playcount: '2,000,000+ plays',
        description:
          'Built a multiplayer kart-racing game from scratch. Reached 2,000,000 plays within two months of release. Led a cross-functional team of artists, designers, and VFX/SFX artists. Built all in-game UIs — HUD, store, notifications — with React.',
      },
      kosma: {
        title: 'Kosma',
        playcount: 'Browser-based · AI + Physics',
        description:
          'A browser physics playground combining Three.js rendering, an Entity Component System (ECS) architecture, and Claude AI integration. Runs entirely client-side.',
      },
    },
  },
  contact: {
    header: "Let's connect",
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
}

export type Strings = typeof en
