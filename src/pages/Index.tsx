import React, { useState, useMemo } from 'react';
import { GraduationCap, BookOpen, Trophy, Target, TrendingUp, Calendar, Award } from 'lucide-react';
import { studentStats, courses as initialCourses, achievements, Course } from '@/data/academicData';
import ProgressRing from '@/components/ProgressRing';
import StatsCard from '@/components/StatsCard';
import AchievementBadge from '@/components/AchievementBadge';
import CourseList from '@/components/CourseList';
import GPAChart from '@/components/GPAChart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const Index: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const handleStatusChange = (code: string, newStatus: 'passed' | 'ongoing' | 'pending') => {
    setCourses(prev => prev.map(course => 
      course.code === code ? { ...course, status: newStatus } : course
    ));
  };

  const stats = useMemo(() => {
    const earnedCredits = courses
      .filter(c => c.status === 'passed')
      .reduce((sum, c) => sum + c.credits, 0) + studentStats.transferCredits;
    const ongoingCredits = courses
      .filter(c => c.status === 'ongoing')
      .reduce((sum, c) => sum + c.credits, 0);
    const remainingCredits = studentStats.totalCredits - earnedCredits;
    const passedCourses = courses.filter(c => c.status === 'passed').length;
    const ongoingCourses = courses.filter(c => c.status === 'ongoing').length;
    const pendingCourses = courses.filter(c => c.status === 'pending').length;

    return {
      earnedCredits,
      ongoingCredits,
      remainingCredits,
      passedCourses,
      ongoingCourses,
      pendingCourses,
      progressPercent: (earnedCredits / studentStats.totalCredits) * 100
    };
  }, [courses]);

  const filteredCourses = selectedYear === 'all' 
    ? courses 
    : courses.filter(c => c.year === selectedYear);

  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

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
              <h1 className="text-xl font-semibold text-foreground">
                Academic Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                {studentStats.studentName} • {studentStats.regNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Program:</span>
              <span className="ml-2 font-medium text-foreground">{studentStats.major}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Year:</span>
              <span className="ml-2 font-medium text-foreground">{studentStats.currentYear}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <StatsCard
            title="Overall GPA"
            value={studentStats.overallGPA.toFixed(2)}
            subtitle="Out of 20"
            icon={TrendingUp}
          />
          <StatsCard
            title="Major GPA"
            value={studentStats.majorGPA.toFixed(2)}
            subtitle="Core courses"
            icon={Target}
          />
          <StatsCard
            title="Credits Earned"
            value={stats.earnedCredits}
            subtitle={`of ${studentStats.totalCredits} total`}
            icon={Award}
          />
          <StatsCard
            title="Credits Remaining"
            value={stats.remainingCredits}
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
            title="Achievements"
            value={`${unlockedAchievements}/${achievements.length}`}
            subtitle="Unlocked"
            icon={Trophy}
          />
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Degree Progress */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Degree Progress</h3>
            <div className="flex items-center gap-6">
              <ProgressRing
                progress={stats.progressPercent}
                size={120}
                strokeWidth={10}
                label={`${Math.round(stats.progressPercent)}%`}
                sublabel="Complete"
              />
              <div className="space-y-3 flex-1">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium text-success">{stats.earnedCredits} cr</span>
                  </div>
                  <Progress value={(stats.earnedCredits / studentStats.totalCredits) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">In Progress</span>
                    <span className="font-medium text-warning">{stats.ongoingCredits} cr</span>
                  </div>
                  <Progress value={(stats.ongoingCredits / studentStats.totalCredits) * 100} className="h-2 [&>div]:bg-warning" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className="font-medium text-muted-foreground">{stats.remainingCredits} cr</span>
                  </div>
                  <Progress value={(stats.remainingCredits / studentStats.totalCredits) * 100} className="h-2 [&>div]:bg-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* GPA Chart */}
          <div className="lg:col-span-2">
            <GPAChart />
          </div>
        </div>

        {/* Courses Section */}
        <div className="bg-card border border-border rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-border">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Course Catalog</h2>
              <p className="text-sm text-muted-foreground">
                Toggle status to track your progress • {filteredCourses.length} courses
              </p>
            </div>
            <Tabs value={String(selectedYear)} onValueChange={(v) => setSelectedYear(v === 'all' ? 'all' : Number(v))}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="1">Year 1</TabsTrigger>
                <TabsTrigger value="2">Year 2</TabsTrigger>
                <TabsTrigger value="3">Year 3</TabsTrigger>
                <TabsTrigger value="4">Year 4</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <CourseList courses={filteredCourses} onStatusChange={handleStatusChange} />
        </div>

        {/* Achievements */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
            <span className="text-sm text-muted-foreground">{unlockedAchievements} of {achievements.length} unlocked</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {achievements.map((achievement, index) => (
              <AchievementBadge key={achievement.id} achievement={achievement} delay={index * 50} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8 py-4 text-center text-sm text-muted-foreground">
        <p>Adventist University of Central Africa • Software Engineering Program</p>
      </footer>
    </div>
  );
};

export default Index;
