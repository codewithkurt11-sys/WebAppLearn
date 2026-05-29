import { T } from "./theme";
import type { NavGroup } from "../types";

export const NAV: NavGroup[] = [
  { section: "Home", items: [
    { id: "dashboard",  label: "Dashboard",   icon: "▣",  color: T.accent },
    { id: "roadmap",    label: "Roadmap",      icon: "◎",  color: T.sky    },
    { id: "cheatsheet", label: "Cheatsheets",  icon: "#",  color: T.green  },
    { id: "components", label: "Components",   icon: "□",  color: T.sky    },
    { id: "feedback",   label: "Feedback",     icon: "✎",  color: T.rose   },
    { id: "settings",   label: "Settings",     icon: "⚙",  color: T.muted2 },
  ]},
  { section: "Python", items: [
    { id: "py-basics", label: "Basics",       icon: "py", color: T.accent, tag: "beginner"     },
    { id: "py-inter",  label: "Intermediate", icon: "py", color: T.accent, tag: "intermediate" },
    { id: "py-adv",    label: "Advanced",     icon: "py", color: T.accent, tag: "advanced"     },
  ]},
  { section: "Flask", items: [
    { id: "flask-basics", label: "Basics",       icon: "fl", color: T.green, tag: "beginner"     },
    { id: "flask-inter",  label: "Intermediate", icon: "fl", color: T.green, tag: "intermediate" },
    { id: "flask-expert", label: "Expert",        icon: "fl", color: T.green, tag: "advanced"     },
  ]},
  { section: "JavaScript", items: [
    { id: "js-basics", label: "Basics",       icon: "js", color: T.amber, tag: "beginner"     },
    { id: "js-inter",  label: "Intermediate", icon: "js", color: T.amber, tag: "intermediate" },
  ]},
  { section: "Web", items: [
    { id: "html-css", label: "HTML & CSS", icon: "⟨⟩", color: T.amber, tag: "beginner" },
  ]},
  { section: "GUI", items: [
    { id: "tkinter", label: "Tkinter", icon: "tk", color: T.sky  },
    { id: "kivy",    label: "Kivy",    icon: "kv", color: T.rose },
  ]},
  { section: "More", items: [
    { id: "scraping", label: "Web Scraping", icon: "{}", color: T.muted2 },
    { id: "sqlite",   label: "SQLite",        icon: "db", color: T.muted2 },
  ]},
];
