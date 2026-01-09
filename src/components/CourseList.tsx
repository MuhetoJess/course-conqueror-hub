import React from 'react';
import { Course } from '@/data/academicData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Clock, Circle, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CourseListProps {
  courses: Course[];
  onStatusChange: (code: string, status: 'passed' | 'ongoing' | 'pending') => void;
  onGradeChange: (code: string, grade: number | undefined) => void;
  onDeleteCourse: (code: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onStatusChange, onGradeChange, onDeleteCourse }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'ongoing': return <Clock className="w-4 h-4 text-warning" />;
      default: return <Circle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-muted/50 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <div className="col-span-2">Code</div>
        <div className="col-span-4">Course Name</div>
        <div className="col-span-1 text-center">Cr</div>
        <div className="col-span-2 text-center">Grade (0-20)</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1 text-right"></div>
      </div>
      
      <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
        {courses.map((course) => (
          <div key={course.code} className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-muted/30 transition-colors">
            <div className="col-span-2 font-mono text-xs text-primary">{course.code}</div>
            <div className="col-span-4 text-sm font-medium">{course.name}</div>
            <div className="col-span-1 text-center text-sm">{course.credits}</div>
            
            <div className="col-span-2 px-4">
              <Input
                type="number"
                min="0"
                max="20"
                step="0.5"
                placeholder="—"
                className="h-8 text-center"
                value={course.grade !== undefined ? course.grade : ''}
                onChange={(e) => onGradeChange(course.code, e.target.value ? parseFloat(e.target.value) : undefined)}
              />
            </div>

            <div className="col-span-2">
              <Select 
                value={course.status === 'passed' ? 'done' : course.status === 'ongoing' ? 'doing' : 'not-done'} 
                onValueChange={(v) => onStatusChange(course.code, v === 'done' ? 'passed' : v === 'doing' ? 'ongoing' : 'pending')}
              >
                <SelectTrigger className="h-8 text-xs">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(course.status)}
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="doing">Doing</SelectItem>
                  <SelectItem value="not-done">Not Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-1 text-right">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                onClick={() => onDeleteCourse(course.code)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
