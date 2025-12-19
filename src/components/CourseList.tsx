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
import React, { useState } from 'react';
import { Trash2, Plus, Edit2 } from 'lucide-react'; // Standard Lovable icons

const CourseManager = () => {
  // 1. Initial State (Replace with your actual curriculum data)
  const [courses, setCourses] = useState([
    { code: 'AMAT 8111', name: 'Applied Mathematics', cr: 3, grade: 'A' },
    { code: 'ACCT 8112', name: 'Principles of Accounting I', cr: 3, grade: 'B' },
  ]);

  const [newCourse, setNewCourse] = useState({ code: '', name: '', cr: '', grade: '' });

  // 2. Add Course Function
  const addCourse = () => {
    if (!newCourse.code || !newCourse.name) return;
    setCourses([...courses, { ...newCourse, cr: Number(newCourse.cr) }]);
    setNewCourse({ code: '', name: '', cr: '', grade: '' }); // Reset form
  };

  // 3. Remove Course Function
  const removeCourse = (code) => {
    setCourses(courses.filter(course => course.code !== code));
  };

  // 4. Update Grade Function
  const updateGrade = (code, newGrade) => {
    setCourses(courses.map(course => 
      course.code === code ? { ...course, grade: newGrade } : course
    ));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Course Conqueror Hub</h1>

      {/* --- ADD COURSE FORM --- */}
      <div className="bg-slate-100 p-4 rounded-lg mb-8 grid grid-cols-1 md:grid-cols-5 gap-2">
        <input 
          placeholder="Code" 
          className="p-2 border rounded"
          value={newCourse.code} 
          onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
        />
        <input 
          placeholder="Course Name" 
          className="p-2 border rounded col-span-2"
          value={newCourse.name}
          onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
        />
        <input 
          placeholder="Credits" 
          type="number"
          className="p-2 border rounded"
          value={newCourse.cr}
          onChange={(e) => setNewCourse({...newCourse, cr: e.target.value})}
        />
        <button 
          onClick={addCourse}
          className="bg-blue-600 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* --- COURSE TABLE --- */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-3">Code</th>
              <th className="p-3">Course Name</th>
              <th className="p-3">Grade</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.code} className="border-b hover:bg-slate-50">
                <td className="p-3 font-mono">{course.code}</td>
                <td className="p-3">{course.name}</td>
                <td className="p-3">
                  {/* EDITABLE GRADE INPUT */}
                  <input 
                    type="text" 
                    value={course.grade}
                    className="w-12 border rounded text-center p-1 focus:border-blue-500 outline-none"
                    onChange={(e) => updateGrade(course.code, e.target.value)}
                  />
                </td>
                <td className="p-3 text-right">
                  <button 
                    onClick={() => removeCourse(course.code)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseManager;
