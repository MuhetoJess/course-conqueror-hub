import React from 'react';
import { Course } from '@/data/academicData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Clock, Circle } from 'lucide-react';

interface CourseListProps {
  courses: Course[];
  onStatusChange: (code: string, status: 'passed' | 'ongoing' | 'pending') => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onStatusChange }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'ongoing':
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <Circle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'passed':
        return 'Done';
      case 'ongoing':
        return 'Doing';
      default:
        return 'Not Done';
    }
  };

  const mapToStatus = (value: string): 'passed' | 'ongoing' | 'pending' => {
    switch (value) {
      case 'done':
        return 'passed';
      case 'doing':
        return 'ongoing';
      default:
        return 'pending';
    }
  };

  const mapFromStatus = (status: string): string => {
    switch (status) {
      case 'passed':
        return 'done';
      case 'ongoing':
        return 'doing';
      default:
        return 'not-done';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-muted/50 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <div className="col-span-2">Code</div>
        <div className="col-span-4">Course Name</div>
        <div className="col-span-1 text-center">Credits</div>
        <div className="col-span-1 text-center">Year</div>
        <div className="col-span-1 text-center">Grade</div>
        <div className="col-span-3">Status</div>
      </div>
      
      {/* Table Body */}
      <div className="divide-y divide-border max-h-[600px] overflow-y-auto scrollbar-thin">
        {courses.map((course) => (
          <div 
            key={course.code} 
            className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-muted/30 transition-colors"
          >
            <div className="col-span-2">
              <span className="font-mono text-sm text-primary font-medium">{course.code}</span>
            </div>
            <div className="col-span-4">
              <span className="text-sm font-medium text-foreground">{course.name}</span>
            </div>
            <div className="col-span-1 text-center">
              <span className="text-sm text-muted-foreground">{course.credits}</span>
            </div>
            <div className="col-span-1 text-center">
              <span className="text-sm text-muted-foreground">Y{course.year}</span>
            </div>
            <div className="col-span-1 text-center">
              {course.grade !== undefined ? (
                <span className={`text-sm font-semibold ${
                  course.grade >= 16 ? 'text-success' : 
                  course.grade >= 14 ? 'text-primary' : 
                  course.grade >= 10 ? 'text-warning' : 'text-destructive'
                }`}>
                  {course.grade.toFixed(1)}
                </span>
              ) : (
                <span className="text-sm text-muted-foreground">—</span>
              )}
            </div>
            <div className="col-span-3">
              <Select 
                value={mapFromStatus(course.status)} 
                onValueChange={(value) => onStatusChange(course.code, mapToStatus(value))}
              >
                <SelectTrigger className="h-8 text-xs w-32">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(course.status)}
                    <SelectValue>{getStatusLabel(course.status)}</SelectValue>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="done">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Done
                    </div>
                  </SelectItem>
                  <SelectItem value="doing">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-warning" />
                      Doing
                    </div>
                  </SelectItem>
                  <SelectItem value="not-done">
                    <div className="flex items-center gap-2">
                      <Circle className="w-4 h-4 text-muted-foreground" />
                      Not Done
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
