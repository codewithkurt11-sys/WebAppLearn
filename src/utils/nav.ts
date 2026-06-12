import { T } from "./theme";

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  color: string;
  tag?: string;
}

export interface NavGroup {
  /** Section header text. Empty string means no header (always-visible group). */
  section: string;
  /** Whether the section can be collapsed by the user. Default: true for groups with a header. */
  collapsible?: boolean;
  /** Open by default when collapsible. */
  defaultOpen?: boolean;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  // Top: Home + Dashboard + Roadmap + Cheatsheets, always visible
  { section: "", collapsible: false, items: [
    { id: "home",       label: "Home",        icon: "⌂", color: T.accent },
    { id: "dashboard",  label: "Dashboard",   icon: "▣", color: T.accent },
    { id: "roadmap",    label: "Roadmap",     icon: "◈", color: T.accent },
    { id: "cheatsheet", label: "Cheatsheets", icon: "☰", color: T.accent },
  ]},

  // PYTHON
  { section: "Python", collapsible: true, defaultOpen: true, items: [
    { id: "py-basics", label: "Basics",       icon: "py", color: T.accent, tag: "beginner"     },
    { id: "py-inter",  label: "Intermediate", icon: "py", color: T.accent, tag: "intermediate" },
    { id: "py-adv",    label: "Advanced",     icon: "py", color: T.accent, tag: "advanced"     },
  ]},

  // PYTHON MODULES
  { section: "Python Modules", collapsible: true, defaultOpen: false, items: [
    { id: "flask-basics", label: "Flask Basics",  icon: "fl", color: T.green, tag: "beginner"     },
    { id: "flask-inter",  label: "Flask Inter.",   icon: "fl", color: T.green, tag: "intermediate" },
    { id: "flask-expert", label: "Flask Expert",   icon: "fl", color: T.green, tag: "advanced"     },
    { id: "tkinter",      label: "Tkinter",        icon: "tk", color: T.sky   },
    { id: "kivy",         label: "Kivy",           icon: "kv", color: T.rose  },
  ]},

  // JAVASCRIPT
  { section: "JavaScript", collapsible: true, defaultOpen: true, items: [
    { id: "js-basics", label: "Basics",       icon: "js", color: T.amber, tag: "beginner"     },
    { id: "js-inter",  label: "Intermediate", icon: "js", color: T.amber, tag: "intermediate" },
    { id: "js-adv",    label: "Advanced",     icon: "js", color: T.amber, tag: "advanced"     },
  ]},

  // WEB & DATA
  { section: "Web & Data", collapsible: true, defaultOpen: false, items: [
    { id: "html-css", label: "HTML & CSS",       icon: "⟨⟩", color: T.amber },
    { id: "sqlite",   label: "SQL & Databases",  icon: "db", color: T.sky   },
    { id: "scraping", label: "Web Scraping",     icon: "{}", color: T.muted2 },
  ]},

  // C++
  { section: "C++", collapsible: true, defaultOpen: false, items: [
    { id: "cpp-basics", label: "Basics",       icon: "c+", color: T.sky, tag: "beginner"     },
    { id: "cpp-inter",  label: "Intermediate", icon: "c+", color: T.sky, tag: "intermediate" },
    { id: "cpp-adv",    label: "Advanced",     icon: "c+", color: T.sky, tag: "advanced"     },
  ]},

  // C#
  { section: "C#", collapsible: true, defaultOpen: false, items: [
    { id: "cs-basics", label: "Basics",       icon: "c#", color: T.rose, tag: "beginner"     },
    { id: "cs-inter",  label: "Intermediate", icon: "c#", color: T.rose, tag: "intermediate" },
    { id: "cs-adv",    label: "Advanced",     icon: "c#", color: T.rose, tag: "advanced"     },
  ]},

  // Bottom: Profile / Settings / Feedback, always visible
  { section: "", collapsible: false, items: [
    { id: "profile",  label: "Profile",  icon: "◉", color: T.accent },
    { id: "settings", label: "Settings", icon: "⚙", color: T.muted2 },
    { id: "feedback", label: "Feedback", icon: "✎", color: T.rose   },
  ]},
];

export const ALL_ITEMS: NavItem[] = NAV.flatMap(g => g.items);
