import React from 'react';
import { Course } from '@/data/academicData';
import { CheckCircle2, XCircle, Clock, Circle } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  delay?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, delay = 0 }) => {
  const getStatusIcon = () => {
    switch (course.status) {
      case 'passed':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-destructive" />;
      case 'ongoing':
        return <Clock className="w-5 h-5 text-warning" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusText = () => {
    switch (course.status) {
      case 'passed':
        return 'status-passed';
      case 'failed':
        return 'status-failed';
      case 'ongoing':
        return 'status-ongoing';
      default:
        return 'text-muted-foreground';
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'text-success';
    if (grade >= 14) return 'text-primary';
    if (grade >= 10) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div
      className="glass-card p-4 opacity-0 animate-fade-in hover:border-primary/30 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-primary">{course.code}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
              {course.credits} cr
            </span>
          </div>
          <h4 className="font-medium text-sm text-foreground truncate">{course.name}</h4>
          <div className="flex items-center gap-2 mt-2">
            {getStatusIcon()}
            <span className={`text-xs font-medium capitalize ${getStatusText()}`}>
              {course.status}
            </span>
          </div>
        </div>
        <div className="text-right">
          {course.grade !== undefined ? (
            <div className={`text-2xl font-bold font-display ${getGradeColor(course.grade)}`}>
              {course.grade.toFixed(2)}
            </div>
          ) : (
            <div className="text-lg font-display text-muted-foreground">—</div>
          )}
          <span className="text-xs text-muted-foreground">/20</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
