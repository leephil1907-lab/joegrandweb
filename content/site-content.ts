/*
 * Editorial content source
 * ------------------------
 * Update these objects to change the public catalog without hunting through
 * page components. This is deliberately framework-neutral so it can be
 * replaced by a CMS fetcher later without changing page layouts.
 */

export const socialLinks = {
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
    tags: ["Fault injection", "STM32", "Research"], accent: "yellow",
  },
  {
    id: "wallet-security", type: "Device security / media", title: "Cryptocurrency Wallet Security",
    text: "Hardware-wallet research and demonstrations that explore how real devices are designed, attacked, and understood.",
    tags: ["Wallets", "Reverse engineering", "Security"], accent: "pink",
  },
  {
    id: "jtagulator", type: "Open hardware / tool", title: "JTAGulator",
    text: "An open-source hardware tool designed to help identify JTAG and UART pinouts on target devices—one practical way into a hardware-security investigation.",
    tags: ["JTAG", "UART", "Open hardware"], accent: "lime",
  },
  {
    id: "def-con-badges", type: "Badgelife / hacker culture", title: "DEF CON Electronic Badges",
    text: "Interactive electronic badges that helped define a playful, inventive part of hacker culture and continue to inspire makers and collectors.",
    tags: ["DEF CON", "Badgelife", "Electronics"], accent: "purple",
  },
  {
    id: "prototype-this", type: "Engineering / television", title: "Prototype This!",
    text: "A Discovery Channel series that followed the real process of imagining, testing, and building ambitious technical prototypes.",
    tags: ["Prototyping", "Engineering", "Media"], accent: "yellow",
  },
  {
    id: "offspec", type: "Hardware security / community", title: "Hardware Security Community",
    text: "A practical route into the questions, techniques, and shared learning that help people look beyond the surface of electronic systems.",
    tags: ["Training", "Hardware security", "Community"], accent: "pink",
  },
] as const;

export const trainingCatalog = [
  {
    code: "COURSE_01", slug: "hardware-hacking-basics", title: "Joe Grand’s Hardware Hacking Basics",
    text: "A two-day comprehensive course covering fundamental hardware-hacking concepts and techniques for reverse engineering and assessing electronic-device security. It combines lecture and hands-on exercises, ending with a custom-target challenge.",
  },
  {
    code: "COURSE_02", slug: "firmware-extraction", title: "Firmware Extraction and Manipulation",
    text: "A one-day hands-on workshop focused on firmware extraction and system manipulation through on-chip debug interfaces, using techniques for both bare-metal and Linux-based devices.",
  },
  {
    code: "COURSE_03", slug: "code-protection", title: "Defeating Microcontroller Code Protection",
    text: "A one-day advanced workshop on assessing and defeating microcontroller security features designed to protect against unauthorized access, with practical hardware tools and real-world targets.",
  },
  {
    code: "COURSE_04", slug: "hardware-espionage", title: "Hardware Implants and Espionage",
    text: "A one-day workshop about the risks and realities of hardware espionage and supply-chain compromise, including ways to detect and analyze surreptitious hardware.",
  },
  {
    code: "COURSE_05", slug: "wallet-exploitation", title: "Cryptocurrency Wallet Exploitation",
    text: "A two-day course on advanced hardware-hacking tools and techniques for assessing common cryptocurrency hardware wallets, including recovery and device-security workflows.",
  },
  {
    code: "COURSE_06", slug: "hands-off-hardware-hacking", title: "Hands-off Hardware Hacking",
    text: "A two-day comprehensive course that combines Joe Grand’s hardware-hacking training material and security research in a lecture-focused format for a wider audience.",
  },
] as const;
