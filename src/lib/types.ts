export interface Lesson {
  slug: string;
  title: string;
  day: number;
  week: number;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  prerequisites: string[];
  duration: string;
  tags: string[];
  description: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  week: string;
  difficulty: string;
  skills: string[];
  description: string;
  content: string;
}

export interface Week {
  number: number;
  title: string;
  theme: string;
  description: string;
  difficulty: string;
  lessons: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NavLink {
  title: string;
  href: string;
  description?: string;
  items?: NavLink[];
}
