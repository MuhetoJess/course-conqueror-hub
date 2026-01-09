import React, { useState, useMemo } from 'react';
import { GraduationCap, BookOpen, Target, TrendingUp, Calendar, Award, Plus } from 'lucide-react';
import { studentStats, courses as initialCourses, Course } from '@/data/academicData';
import ProgressRing from '@/components/ProgressRing';
import StatsCard from '@/components/StatsCard';
import CourseList from '@/components/CourseList';
import GPAChart from '@/components/GPAChart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const TOTAL_CREDITS_REQUIRED = 120; // Changed from 137 to 120

const Index: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const handleStatusChange = (code: string, newStatus: 'passed' | 'ongoing' | 'pending') => {
    setCourses(prev => prev.map(course => 
      course.code === code ? { ...course, status: newStatus } : course
    ));
  };

  const handleGradeChange = (code: string, newGrade: number | undefined) => {
    setCourses(prev => prev.map(course => 
      course.code === code ? { ...course, grade: newGrade } : course
    ));
  };

  const handleDeleteCourse = (code: string) => {
    setCourses(prev => prev.filter(c => c.code !== code));
  };

  const handleAddCourse = () => {
    const newCourse: Course = {
      code: `NEW-${Math.floor(Math.random() * 1000)}`,
      name: "New Course",
      credits: 3,
      year: selectedYear === 'all' ? 1 : selectedYear,
      semester: 1,
      status: 'pending',
      type: 'major'
    };
    setCourses(prev => [newCourse, ...prev]);
  };

  const stats = useMemo(() => {
    const earnedCredits = courses
      .filter(c => c.status === 'passed')
      .reduce((sum, c) => sum + c.credits, 0) + studentStats.transferCredits;
    const ongoingCredits = courses
      .filter(c => c.status === 'ongoing')
      .reduce((sum, c) => sum + c.credits, 0);
    const remainingCredits = TOTAL_CREDITS_REQUIRED - earnedCredits;
    const passedCourses = courses.filter(c => c.status === 'passed').length;
    const ongoingCourses = courses.filter(c => c.status === 'ongoing').length;

    // Calculate dynamic GPA based on current course list
    const coursesWithGrades = courses.filter(c => c.grade !== undefined && c.status === 'passed');
    const calculatedGPA = coursesWithGrades.length > 0
      ? coursesWithGrades.reduce((sum, c) => sum + (c.grade || 0), 0) / coursesWithGrades.length
      : 0;

    return {
      earnedCredits,
      ongoingCredits,
      remainingCredits,
      passedCourses,
      ongoingCourses,
      overallGPA: calculatedGPA,
      progressPercent: Math.min((earnedCredits / TOTAL_CREDITS_REQUIRED) * 100, 100)
    };
  }, [courses]);

  const filteredCourses = selectedYear === 'all' 
    ? courses 
    : courses.filter(c => c.year === selectedYear);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Course Conqueror Hub</h1>
              <p className="text-sm text-muted-foreground">{studentStats.studentName} • {studentStats.regNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Program:</span>
              <span className="ml-2 font-medium text-foreground">{studentStats.major}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <StatsCard
            title="Overall GPA"
            value={stats.overallGPA.toFixed(2)}
            subtitle="Calculated from passed"
            icon={TrendingUp}
          />
          <StatsCard
            title="Credits Earned"
            value={stats.earnedCredits}
            subtitle={`of ${TOTAL_CREDITS_REQUIRED} total`}
            icon={Award}
          />
          <StatsCard
            title="Credits Remaining"
            value={Math.max(0, stats.remainingCredits)}
            subtitle="to graduate"
            icon={Calendar}
          />
          <StatsCard
            title="Courses Done"
            value={stats.passedCourses}
            subtitle={`${stats.ongoingCourses} in progress`}
            icon={BookOpen}
          />
          <StatsCard
            title="Degree Progress"
            value={`${Math.round(stats.progressPercent)}%`}
            subtitle="Complete"
            icon={Target}
          />
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Degree Progress</h3>
            <div className="flex items-center gap-6">
              <ProgressRing progress={stats.progressPercent} size={120} strokeWidth={10} label={`${Math.round(stats.progressPercent)}%`} />
              <div className="space-y-3 flex-1">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium text-success">{stats.earnedCredits} cr</span>
                  </div>
                  <Progress value={stats.progressPercent} className="h-2" />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <GPAChart />
          </div>
        </div>

        {/* Courses Section */}
        <div className="bg-card border border-border rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-border">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Course Catalog</h2>
              <p className="text-sm text-muted-foreground">Update grades and status manually</p>
            </div>
            <div className="flex items-center gap-4">
              <Tabs value={String(selectedYear)} onValueChange={(v) => setSelectedYear(v === 'all' ? 'all' : Number(v))}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="1">Y1</TabsTrigger>
                  <TabsTrigger value="2">Y2</TabsTrigger>
                  <TabsTrigger value="3">Y3</TabsTrigger>
                  <TabsTrigger value="4">Y4</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button onClick={handleAddCourse} size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> Add Course
              </Button>
            </div>
          </div>
          
          <CourseList 
            courses={filteredCourses} 
            onStatusChange={handleStatusChange} 
            onGradeChange={handleGradeChange}
            onDeleteCourse={handleDeleteCourse}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
