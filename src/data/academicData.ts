export interface Course {
  code: string;
  name: string;
  credits: number;
  year: number;
  semester?: number;
  grade?: number;
  status: 'passed' | 'failed' | 'ongoing' | 'pending';
  prerequisites?: string[];
}

export interface AcademicStats {
  studentName: string;
  regNumber: string;
  major: string;
  faculty: string;
  overallGPA: number;
  majorGPA: number;
  totalCredits: number;
  earnedCredits: number;
  transferCredits: number;
  currentYear: number;
  currentSemester: number;
}

export const studentStats: AcademicStats = {
  studentName: "Muheto Rutayisire Jess",
  regNumber: "26481",
  major: "Software Engineering",
  faculty: "Information Technology",
  overallGPA: 15.07,
  majorGPA: 15.58,
  totalCredits: 120,
  earnedCredits: 70,
  transferCredits: 5,
  currentYear: 4,
  currentSemester: 1,
};

export const courses: Course[] = [
  // Year 1
  { code: "AMAT 8111", name: "Applied Mathematics", credits: 3, year: 1, status: 'pending' },
  { code: "ACCT 8112", name: "Principles of Accounting I", credits: 3, year: 1, semester: 1, grade: 13.60, status: 'passed' },
  { code: "EDRM 8113", name: "Study and Research Methods", credits: 2, year: 1, status: 'pending' },
  { code: "ENGL 8115", name: "General English", credits: 3, year: 1, status: 'pending' },
  { code: "RELB 8116", name: "Introduction to Bible Study", credits: 2, year: 1, semester: 1, grade: 13.27, status: 'passed' },
  { code: "INSY 8117", name: "Introduction to Computer Applications", credits: 3, year: 1, grade: 15.70, status: 'passed' },
  { code: "INSY 8121", name: "Computer Maintenance", credits: 3, year: 1, semester: 3, grade: 18.40, status: 'passed' },
  { code: "INSY 8122", name: "Introduction to Computer Programming", credits: 4, year: 1, semester: 2, grade: 17.40, status: 'passed' },
  { code: "RELT 8123", name: "Bible Doctrines", credits: 3, year: 1, semester: 1, grade: 13.80, status: 'passed' },
  { code: "ENGL 8124", name: "Academic English Writing", credits: 3, year: 1, status: 'pending' },
  { code: "STAT 8122", name: "Descriptive Statistics", credits: 3, year: 1, semester: 3, grade: 13.20, status: 'passed' },
  { code: "MATH 8127", name: "Digital Computer Fundamentals", credits: 3, year: 1, semester: 2, grade: 15.70, status: 'passed' },
  
  // Year 2
  { code: "COSC 8211", name: "Computer Networks", credits: 4, year: 2, status: 'ongoing' },
  { code: "INSY 8212", name: "Programming with C", credits: 4, year: 2, semester: 1, grade: 16.60, status: 'passed' },
  { code: "MATH 8213", name: "Multivariable Calculus and ODE", credits: 4, year: 2, status: 'pending' },
  { code: "SENG 8214", name: "Theory of Computation", credits: 3, year: 2, status: 'pending' },
  { code: "SENG 8215", name: "Software Engineering", credits: 3, year: 2, status: 'ongoing' },
  { code: "HELT 8213", name: "Health Principles", credits: 2, year: 2, semester: 2, grade: 16.40, status: 'passed' },
  { code: "INSY 8221", name: "Object-Oriented Programming", credits: 4, year: 2, semester: 2, grade: 18.00, status: 'passed' },
  { code: "INSY 8213", name: "Database Management Systems", credits: 3, year: 2, semester: 2, grade: 14.75, status: 'passed' },
  { code: "INSY 8223", name: "Operating Systems", credits: 4, year: 2, status: 'pending' },
  { code: "SENG 8224", name: "Requirements Engineering", credits: 3, year: 2, status: 'pending' },
  { code: "STAT 8225", name: "Probability and Statistics", credits: 3, year: 2, semester: 3, grade: 11.10, status: 'passed' },
  
  // Year 3
  { code: "COSC 8312", name: "Introduction to Linux", credits: 3, year: 3, status: 'pending' },
  { code: "INSY 8311", name: "Database Development with PL/SQL", credits: 3, year: 3, status: 'ongoing' },
  { code: "INSY 8312", name: "Java Programming", credits: 4, year: 3, status: 'ongoing' },
  { code: "INSY 8313", name: "Management Information Systems", credits: 3, year: 3, semester: 3, grade: 16.80, status: 'passed' },
  { code: "INSY 8314", name: "Web Design", credits: 3, year: 3, semester: 2, grade: 14.56, status: 'passed' },
  { code: "SENG 8315", name: "Software Project Management", credits: 3, year: 3, semester: 3, grade: 14.00, status: 'passed' },
  { code: "INSY 8321", name: "Data Structures and Algorithms", credits: 4, year: 3, semester: 2, grade: 15.70, status: 'passed' },
  { code: "INSY 8322", name: "Web Technology and Internet", credits: 4, year: 3, status: 'pending' },
  { code: "SENG 8323", name: "Software Modeling & Design", credits: 3, year: 3, status: 'pending' },
  { code: "SENG 8324", name: "Software Quality Assurance", credits: 3, year: 3, status: 'pending' },
  { code: "SENG 8325", name: "Software Testing Techniques", credits: 3, year: 3, status: 'pending' },
  
  // Year 4
  { code: "RELT 8221", name: "Philosophy, Science and Religion", credits: 2, year: 4, semester: 1, grade: 14.00, status: 'passed' },
  { code: "INSY 8411", name: "Dot Net", credits: 4, year: 4, status: 'pending' },
  { code: "INSY 8413", name: "Introduction to Big Data", credits: 3, year: 4, status: 'ongoing' },
  { code: "INSY 8414", name: "Mobile Programming", credits: 4, year: 4, status: 'pending' },
  { code: "SENG 8414", name: "Software Security", credits: 3, year: 4, status: 'pending' },
  { code: "SENG 8415", name: "Best Programming Practice & Design Patterns", credits: 3, year: 4, status: 'pending' },
  { code: "BSAD 8225", name: "Entrepreneurship", credits: 3, year: 4, status: 'pending' },
  { code: "INSY 8421", name: "Internship", credits: 4, year: 4, status: 'pending' },
  { code: "INSY 8422", name: "Final Year Project", credits: 6, year: 4, status: 'pending' },
];

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export const achievements: Achievement[] = [
  { id: 'first-steps', title: 'First Steps', description: 'Complete your first course', icon: '🎯', unlocked: true, unlockedAt: '2022' },
  { id: 'dean-list', title: 'Honor Roll', description: 'Achieve GPA above 15.0', icon: '🏆', unlocked: true, unlockedAt: '2024' },
  { id: 'code-warrior', title: 'Code Warrior', description: 'Pass 5 programming courses', icon: '⚔️', unlocked: true, unlockedAt: '2024' },
  { id: 'halfway', title: 'Halfway There', description: 'Complete 50% of total credits', icon: '🎖️', unlocked: true, unlockedAt: '2025' },
  { id: 'perfect-score', title: 'Perfect Score', description: 'Get 18+ in any course', icon: '💎', unlocked: true, unlockedAt: '2024' },
  { id: 'database-master', title: 'Database Master', description: 'Complete all database courses', icon: '🗄️', unlocked: false },
  { id: 'full-stack', title: 'Full Stack Dev', description: 'Complete web & mobile courses', icon: '🌐', unlocked: false },
  { id: 'graduate', title: 'Graduate', description: 'Complete all required credits', icon: '🎓', unlocked: false },
];

export const gpaHistory = [
  { semester: 'S1 2022', gpa: 14.45 },
  { semester: 'S2 2023', gpa: 15.27 },
  { semester: 'S1 2024', gpa: 15.05 },
  { semester: 'S2 2024', gpa: 15.58 },
  { semester: 'S3 2024', gpa: 15.07 },
];

export const calculateLevel = (earnedCredits: number): { level: number; xpCurrent: number; xpRequired: number } => {
  const creditsPerLevel = 15;
  const level = Math.floor(earnedCredits / creditsPerLevel) + 1;
  const xpCurrent = earnedCredits % creditsPerLevel;
  const xpRequired = creditsPerLevel;
  return { level, xpCurrent, xpRequired };
};
