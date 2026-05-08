export const en = {
  hero: {
    greeting: "Hi, I'm",
    title: 'Software Engineer ・ Game Dev ・ Japanese Learner',
  },
  sections: {
    about: 'About',
    projects: 'Projects',
    experience: 'Experience',
    skills: 'Skills',
    contact: 'Contact',
  },
  about: {
    title: 'Engineered with intention.',
    p1: "I'm a Software Engineer driven to build high-impact experiences. I turn complex problems into elegant solutions, and I care deeply about the craft behind every decision. I thrive at the intersection of engineering, creativity, and curiosity.",
    statN2: 'Japanese Language Proficiency (JLPT)',
    stat40m: 'Plays across shipped Roblox games',
    statMCS: 'M.C.S. Computer Science — ASU 2025',
  },
  experience: {
    title: "Where I've worked.",
    entries: [
      {
        company: 'CME Group',
        dateLabel: 'Current',
        period: 'May 2024 → Present',
        roles: [
          {
            role: 'Software Engineer II',
            period: 'Sep 2024 → Present',
            description:
              'Leveraging Java / Kubernetes to build post-trade risk management systems hosted natively on Google Cloud.',
            chips: ['Java', 'Spring Boot', 'Kubernetes', 'Kafka', 'GCP', 'Google ADK', 'Gemini'],
          },
          {
            role: 'Software Engineer Intern',
            period: 'May → Aug 2024',
            description:
              'Built an Internal Developer Portal with Backstage/React integrating CI/CD, Kubernetes, and security scans into a unified view.',
            chips: ['React', 'Backstage', 'Kubernetes', 'Argo'],
          },
        ],
      },
      {
        company: 'Garmin',
        dateLabel: 'Intern',
        period: 'Jan → Aug 2023',
        roles: [
          {
            role: 'Software Engineer Intern',
            description:
              'Developed a database dependency search engine, capable of querying table references across 100+ codebases in under 1.6 seconds.',
            chips: ['C#', 'SQL', '.NET'],
          },
        ],
      },
    ],
  },
  projects: {
    title: 'Selected work.',
    viewRoblox: 'Play on Roblox ↗',
    viewProject: 'GitHub ↗',
    entries: {
      'kart-wars': {
        title: 'Kart Wars',
        eyebrow: 'Game · 2023 – Present',
        description:
          'A fun kart-racing game on Roblox. Led a team of modelers, VFX artists, and level designers. Built physics-based driving, power-up systems, kart customization, and a real-time HUD in React.',
        chips: ['Lua', 'React', 'Roblox Studio'],
        playcount: '4,000,000+ plays',
      },
      trackday: {
        title: 'Project Trackday',
        eyebrow: 'Game · 2022 – 2025',
        description:
          'A realistic track-racing game on Roblox. Implemented the in-game shop, race mode, and a UI overhaul. Led the release of new tracks and Formula-style cars.',
        chips: ['Lua', 'Roblox Studio',],
        playcount: '40,000,000+ plays',
      },
      kosma: {
        title: 'Kosma',
        eyebrow: 'Side project · 2026',
        description:
          'An experimental AI-driven 3D physics sandbox combining Three.js, an ECS architecture, and Anthropic API integration. Fully client-side and browser-based.',
        chips: ['Three.js', 'TypeScript', 'ECS'],
        playcount: 'Browser-based · AI + Physics',
      },
    },
  },
  skills: {
    title: 'Tech stack.',
    groups: [
      { label: 'Languages', chips: ['TypeScript', 'Python', 'Java', 'Lua', 'C#', 'SQL'] },
      { label: 'Frameworks', chips: ['React', 'Node.js', 'Spring Boot', 'Kafka', 'Google ADK', 'PyTorch'] },
      { label: 'Cloud & Infra', chips: ['GCP', 'Kubernetes', 'Terraform', 'Docker', 'PostgreSQL'] },
      { label: 'Certifications', chips: ['JLPT N2', 'GCP Pro Cloud Developer', 'GCP Gen AI Leader'] },
      { label: 'Human Languages', chips: ['English (Native)', '日本語 N2'] },
    ],
  },
  contact: {
    title: "Let's work together.",
    body: "I'm always looking forward to embarking on new challenges and solving hard technical problems. If you're building something ambitious, I'd love to hear from you.",
    email: 'Email me',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
}

export type Strings = typeof en
