import nasaImg from '../assets/nasa.jpeg'
import nasa1Img from '../assets/nasa1.jpeg'
import nasa2Img from '../assets/nasa2.jpeg'
import talaverdeArt from '../assets/card-talaverde.jpg'

export interface HackathonChapter {
  number: string
  title: string
  timing: string
  image?: string
  imageCaption?: string
  paragraphs: string[]
  keyHighlight?: string
}

export interface HackathonBlogPost {
  id: string
  title: string
  subtitle: string
  date: string
  displayDate: string
  timeBadge: string
  readTime: string
  location: string
  author: {
    name: string
    role: string
    affiliation: string
  }
  heroImage: string
  heroCaption: string
  excerpt: string
  stats: { label: string; value: string }[]
  tags: string[]
  chapters: HackathonChapter[]
  keyTakeaway: string
  quote: {
    text: string
    attribution: string
  }
}

export const singleHackathonBlog: HackathonBlogPost = {
  id: 'tala-verde-hackathon',
  title: 'NASA Space Apps Challenge: Building Tala Verde in 48 Hours',
  subtitle:
    'From raw satellite telemetry to a live environmental intelligence platform — the complete, unfiltered 48-hour journey of Team Tala Verde at Ateneo de Davao.',
  date: 'October 4–6, 2025',
  displayDate: 'Oct 2025',
  timeBadge: 'Official Hackathon Chronicle',
  readTime: '7 min read',
  location: 'Ateneo de Davao University · Davao City, Philippines',
  author: {
    name: 'Ivan Louie Malicsi',
    role: 'Full-Stack Developer & Telemetry Lead',
    affiliation: 'Team Tala Verde · Ateneo de Davao University',
  },
  heroImage: nasa2Img,
  heroCaption:
    'Team Tala Verde on the main presentation stage delivering our live defense at the NASA Space Apps Challenge Davao pitch session.',
  excerpt:
    'When the 48-hour countdown commenced, 30+ engineering squads were tasked with building software from NASA open Earth observation data. This is the story of how our team built Tala Verde, survived a 2:30 AM architecture pivot, and delivered under high pressure.',
  stats: [
    { label: 'Sprint Duration', value: '48 Hours' },
    { label: 'Team Size', value: '6 Engineers' },
    { label: 'Milestone', value: 'Live Working Demo' },
    { label: 'Git Hygiene', value: '0 Merge Conflicts' },
  ],
  tags: [
    'NASA Space Apps',
    'Tala Verde',
    'Space Apps Davao',
    'FastAPI',
    'React',
    'Earth Observation',
    'NDVI Telemetry',
    'Ateneo de Davao',
  ],
  chapters: [
    {
      number: '01',
      title: 'Ignition & The 6-Person Squad',
      timing: 'Friday · 06:00 PM — Opening Ceremony',
      image: nasa1Img,
      imageCaption:
        'Early sprint alignment: mapping user stories, telemetry APIs, and component wireframes.',
      paragraphs: [
        'Six university peers assembled under the moniker "Team Tala Verde" (Green Star). Entering the hackathon floor at Ateneo de Davao, the air was electric with thirty competing engineering squads, stacks of energy drinks, and the challenge rubric laid down by NASA coordinators: scientific accuracy, technical feasibility, impact, and user experience.',
        'We evaluated NASA’s open challenges and zeroed in on Earth Observation. In Mindanao and across the Philippines, agricultural communities and environmental planners frequently suffer from microclimate anomalies, vegetative stress, and unchecked land degradation, yet access to actionable satellite data remains locked behind specialized GIS tooling and multi-gigabyte files. Our mission became clear: democratize satellite intelligence so any local farmer or planner can monitor vegetation health in three taps.',
      ],
      keyHighlight:
        'The objective was never just to display pretty satellite maps. It was to translate complex multispectral band mathematics into actionable warnings.',
    },
    {
      number: '02',
      title: 'The System Architecture & Midnight Pivot',
      timing: 'Saturday · 02:30 AM — The Deep Space Build',
      image: nasaImg,
      imageCaption:
        'The 02:30 AM sprint: mechanical keyboards clicking in rhythm, hunting memory leaks and rewriting the ingestion pipeline.',
      paragraphs: [
        'Our initial design attempted to download raw Landsat-8 and Sentinel-2 GeoTIFF tiles and parse raster matrices directly on the client with browser JavaScript. At 01:45 AM, reality struck: Chrome tabs were consuming over 1.6GB of memory, and mobile viewports were completely freezing.',
        'With 28 hours remaining, we made the high-stakes call to halt frontend work and execute a radical architecture pivot. We split the codebase into a dedicated Python/FastAPI microservice utilizing rasterio and numpy on the server. The microservice ingests NASA EarthData bounding boxes, computes Normalized Difference Vegetation Index (NDVI) matrices in memory, and serializes lightweight vector contours and cached GeoJSON tiles.',
        'By 03:15 AM, the pipeline was operational. Map load times plummeted from 8.2 seconds to under 340 milliseconds, delivering silky 60 FPS pan-and-zoom rendering across all test devices.',
      ],
      keyHighlight:
        'Recognizing an architectural dead-end at 2:00 AM and pivoting decisively made the difference between a crash on stage and a high-velocity demo.',
    },
    {
      number: '03',
      title: 'The Mentor Gauntlet — Defending Scientific Rigor',
      timing: 'Saturday · 02:00 PM — Technical Audit',
      paragraphs: [
        'Saturday afternoon brought the mentor review gauntlet. A panel of academic researchers, GIS specialists, and software mentors audited our working prototype. They drilled down on real-world edge cases: "How do you handle cloud shadows over Mount Apo? If cloud cover skews NDVI reflectance, won\'t you show false drought alerts?"',
        'Because tropical satellite imagery over the Philippines is notoriously cloud-dense, this was a vital critique. We integrated NASA QA (Quality Assessment) bitmasks into our ingestion worker, filtering out cloud-contaminated pixels and interpolating with rolling 14-day median baselines. When a mentor tested our platform against a cloudy typhoon corridor, the system gracefully displayed confidence intervals rather than misleading scores.',
      ],
      keyHighlight:
        '"Software handling planetary data requires humility: communicating uncertainty and confidence intervals is far more trustworthy than pretending data is flawless."',
    },
    {
      number: '04',
      title: '300 Seconds on the Clock — The Stage Defense',
      timing: 'Sunday · 03:00 PM — Live Pitch & Demonstration',
      image: nasa2Img,
      imageCaption:
        'Delivering our live product defense and technical architecture presentation to the judging panel.',
      paragraphs: [
        'Every seasoned hackathon builder warns against doing live software demonstrations on congested venue Wi-Fi. We chose to do it anyway.',
        'Stepping onto the stage before the judging panel with 300 seconds on the clock, we opened with the human narrative: a local agricultural cooperative trying to anticipate vegetative distress before harvest season. With hands steady, we navigated to the live Tala Verde platform, selected a polygon across the Davao watershed, and triggered live satellite telemetry calculation.',
        'The vector contours rendered in 380 milliseconds. The judges leaned forward, probing our API rate-limiting strategy, data privacy boundaries, and offline caching feasibility for rural areas without stable 4G connectivity.',
      ],
      keyHighlight:
        'A working live product speaks louder than forty slides. The judges remembered how the software felt in real time.',
    },
    {
      number: '05',
      title: 'Constellation & What 48 Hours Taught Us',
      timing: 'Sunday · 08:00 PM — Final Pitch & Reflections',
      image: talaverdeArt,
      imageCaption:
        'Tala Verde ("Green Star") — telemetry intelligence for planetary resilience.',
      paragraphs: [
        'Win or not, our team walked away with something no scoreboard can capture: an intense shared experience, battle-tested technical skills, and proof that six passionate students from Davao can tackle a complex engineering challenge built for planetary scale.',
        'Beyond any accolades, the true triumph was the engineering velocity. Across 48 continuous hours, six teammates produced over 100 Git commits across separate branches with zero merge conflicts, supported one another through exhaustion, and transformed raw research ideas into an intuitive, production-grade application.',
        'Tala Verde demonstrated that a dedicated group of undergraduate developers from Davao can collaborate under extreme pressure and build technology meant for real-world impact.',
      ],
    },
  ],
  keyTakeaway:
    'Great engineering under pressure is fundamentally an exercise in collective trust, decisive architectural pivots, and relentless user empathy. We built fast, adapted without ego, and looked up.',
  quote: {
    text: 'We did not wait for certainty. We built, shared, and looked up.',
    attribution: 'Team Tala Verde · NASA Space Apps Challenge Davao',
  },
}

export const hackathonBlogPosts: HackathonBlogPost[] = [singleHackathonBlog]
