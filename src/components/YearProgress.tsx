import React from 'react';
import { courses } from '@/data/academicData';

const YearProgress: React.FC = () => {
  const years = [1, 2, 3, 4];

  const getYearStats = (year: number) => {
    const yearCourses = courses.filter(c => c.year === year);
    const completed = yearCourses.filter(c => c.status === 'passed').length;
    const total = yearCourses.length;
    const earnedCredits = yearCourses
      .filter(c => c.status === 'passed')
      .reduce((sum, c) => sum + c.credits, 0);
    const totalCredits = yearCourses.reduce((sum, c) => sum + c.credits, 0);
    
    return { completed, total, earnedCredits, totalCredits, progress: (completed / total) * 100 };
  };

  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-lg mb-6 glow-text">Year Progress</h3>
      <div className="space-y-4">
        {years.map((year) => {
          const stats = getYearStats(year);
          return (
            <div key={year} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-display text-sm">Year {year}</span>
                <span className="text-xs text-muted-foreground">
                  {stats.completed}/{stats.total} courses • {stats.earnedCredits}/{stats.totalCredits} cr
                </span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${stats.progress}%`,
                    background: `linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)`,
                    boxShadow: stats.progress > 0 ? '0 0 10px hsl(var(--primary) / 0.5)' : 'none',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YearProgress;
