/*
 * Editorial content source
 * ------------------------
 * Update these objects to change the public catalog without hunting through
 * page components. This is deliberately framework-neutral so it can be
 * replaced by a CMS fetcher later without changing page layouts.
 */

export const officialLinks = {
  website: "https://joegrand.com/",
  studio: "https://grandideastudio.com/",
  studioAbout: "https://grandideastudio.com/about/",
  studioTraining: "https://grandideastudio.com/training/",
  youtube: "https://www.youtube.com/@JoeGrand",
  github: "https://github.com/joegrand",
  discord: "https://discord.com/invite/wud8KnF2Gm",
};

export const featuredVideos = [
  { id: "MhJoJRqJ0Wc", category: "Hardware security", title: "$75,000,000 Crypto Wallet Bulk Hack", description: "A public exploration of cryptocurrency-wallet security and the kinds of details worth investigating." },
  { id: "dT9y-KQbqi4", category: "Wallet security", title: "How I Hacked a Hardware Crypto Wallet", description: "A look at hardware-wallet research, recovery, and real-world device security questions." },
  { id: "AQpv_6Se6VM", category: "Talk / workshop", title: "Hardware Hacking with Joe Grand", description: "A talk about the mindset, tools, and curiosity behind practical hardware hacking." },
  { id: "WNpW52x-EWY", category: "Reverse engineering", title: "Reverse Engineering a Ledger Nano X Hardware Implant", description: "Following physical evidence, circuitry, and design decisions to understand a hardware implant." },
  { id: "4LahQG09NzI", category: "Fault injection", title: "Failure Is Not an Option", description: "A reliable-process discussion focused on exploiting STM32F2 and STM32F4 microcontrollers." },
] as const;

export const projectCatalog = [
  {
    id: "fault-injection", type: "Hardware security / research", title: "STM32 Fault Injection",
    text: "Research and learning material focused on voltage glitching, microcontroller code protection, and repeatable fault-injection techniques.",
    tags: ["Fault injection", "STM32", "Research"], href: "https://github.com/joegrand/stm32-fault-injection", action: "Open GitHub project", accent: "yellow",
  },
  {
    id: "wallet-security", type: "Device security / media", title: "Cryptocurrency Wallet Security",
    text: "Hardware-wallet research and demonstrations that explore how real devices are designed, attacked, and understood.",
    tags: ["Wallets", "Reverse engineering", "Security"], href: officialLinks.studio, action: "Visit Grand Idea Studio", accent: "pink",
  },
  {
    id: "jtagulator", type: "Open hardware / tool", title: "JTAGulator",
    text: "An open-source hardware tool designed to help identify JTAG and UART pinouts on target devices—one practical way into a hardware-security investigation.",
    tags: ["JTAG", "UART", "Open hardware"], href: "https://grandideastudio.com/portfolio/security/", action: "Explore security tools", accent: "lime",
  },
  {
    id: "def-con-badges", type: "Badgelife / hacker culture", title: "DEF CON Electronic Badges",
    text: "Interactive electronic badges that helped define a playful, inventive part of hacker culture and continue to inspire makers and collectors.",
    tags: ["DEF CON", "Badgelife", "Electronics"], href: "https://grandideastudio.com/search/?q=defcon%20badge", action: "Browse badge work", accent: "purple",
  },
  {
    id: "prototype-this", type: "Engineering / television", title: "Prototype This!",
    text: "A Discovery Channel series that followed the real process of imagining, testing, and building ambitious technical prototypes.",
    tags: ["Prototyping", "Engineering", "Media"], href: "https://www.imdb.com/title/tt1285035/", action: "View series information", accent: "yellow",
  },
  {
    id: "offspec", type: "Hardware security / community", title: "Offspec.io",
    text: "A hardware-security community and training resource for people who want to move beyond the surface of electronic systems.",
    tags: ["Training", "Hardware security", "Community"], href: "https://offspec.io/", action: "Visit Offspec", accent: "pink",
  },
] as const;

export const trainingCatalog = [
  { code: "COURSE_01", title: "Hardware Hacking Basics", text: "An introduction to reverse engineering, product teardown, board analysis, signal monitoring, and common hardware attack vectors." },
  { code: "COURSE_02", title: "Firmware Extraction & Manipulation", text: "Hands-on exploration of firmware extraction and system manipulation through on-chip debug interfaces." },
  { code: "COURSE_03", title: "Defeating Microcontroller Code Protection", text: "Advanced techniques for assessing protections designed to prevent unauthorized access to a microcontroller." },
  { code: "COURSE_04", title: "Hardware Implants & Espionage", text: "A practical look at hardware espionage, supply-chain compromise, and identifying surreptitious hardware." },
  { code: "COURSE_05", title: "Cryptocurrency Wallet Exploitation", text: "Hardware-security methods for assessing common cryptocurrency hardware wallets." },
] as const;
