import React, { useState } from 'react';
import { GraduationCap, BookOpen, Trophy, Target, TrendingUp, Calendar } from 'lucide-react';
import { studentStats, courses, achievements } from '@/data/academicData';
import ProgressRing from '@/components/ProgressRing';
import StatsCard from '@/components/StatsCard';
import AchievementBadge from '@/components/AchievementBadge';
import CourseCard from '@/components/CourseCard';
import LevelProgress from '@/components/LevelProgress';
import GPAChart from '@/components/GPAChart';
import YearProgress from '@/components/YearProgress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

  const creditProgress = (studentStats.earnedCredits / studentStats.totalCredits) * 100;
  const passedCourses = courses.filter(c => c.status === 'passed').length;
  const ongoingCourses = courses.filter(c => c.status === 'ongoing').length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  const filteredCourses = selectedYear === 'all' 
    ? courses 
    : courses.filter(c => c.year === selectedYear);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <header className="mb-8 opacity-0 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-display gradient-text glow-text mb-2">
              Academic Quest
            </h1>
            <p className="text-muted-foreground">
              Welcome back, <span className="text-foreground font-medium">{studentStats.studentName}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {studentStats.major} • {studentStats.faculty} • Reg: {studentStats.regNumber}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Current Semester</p>
              <p className="font-display text-primary">Year {studentStats.currentYear} • Sem {studentStats.currentSemester}</p>
            </div>
            <Calendar className="w-8 h-8 text-primary" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              title="Overall GPA"
              value={studentStats.overallGPA.toFixed(2)}
              subtitle="Out of 20"
              icon={TrendingUp}
              delay={100}
            />
            <StatsCard
              title="Major GPA"
              value={studentStats.majorGPA.toFixed(2)}
              subtitle="Core courses"
              icon={Target}
              delay={200}
            />
            <StatsCard
              title="Courses Passed"
              value={passedCourses}
              subtitle={`${ongoingCourses} in progress`}
              icon={BookOpen}
              delay={300}
            />
            <StatsCard
              title="Achievements"
              value={`${unlockedAchievements}/${achievements.length}`}
              subtitle="Unlocked"
              icon={Trophy}
              delay={400}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GPAChart />
            <YearProgress />
          </div>

          {/* Courses Section */}
          <div className="glass-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="font-display text-xl glow-text">Course Catalog</h2>
              <Tabs value={String(selectedYear)} onValueChange={(v) => setSelectedYear(v === 'all' ? 'all' : Number(v))}>
                <TabsList className="bg-secondary/50">
                  <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                  <TabsTrigger value="1" className="text-xs">Y1</TabsTrigger>
                  <TabsTrigger value="2" className="text-xs">Y2</TabsTrigger>
                  <TabsTrigger value="3" className="text-xs">Y3</TabsTrigger>
                  <TabsTrigger value="4" className="text-xs">Y4</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto scrollbar-thin pr-2">
              {filteredCourses.map((course, index) => (
                <CourseCard key={course.code} course={course} delay={index * 50} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Level Progress */}
          <LevelProgress earnedCredits={studentStats.earnedCredits} />

          {/* Credit Progress Ring */}
          <div className="glass-card p-6 flex flex-col items-center">
            <h3 className="font-display text-lg mb-4 glow-text">Degree Progress</h3>
            <ProgressRing
              progress={creditProgress}
              size={160}
              strokeWidth={12}
              label={`${Math.round(creditProgress)}%`}
              sublabel="Complete"
            />
            <div className="mt-4 text-center">
              <p className="text-2xl font-display gradient-text">
                {studentStats.earnedCredits}/{studentStats.totalCredits}
              </p>
              <p className="text-sm text-muted-foreground">Credits Earned</p>
              {studentStats.transferCredits > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  +{studentStats.transferCredits} transfer credits
                </p>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg glow-text">Achievements</h3>
              <span className="text-sm text-primary font-display">{unlockedAchievements}/{achievements.length}</span>
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin pr-2">
              {achievements.map((achievement, index) => (
                <AchievementBadge key={achievement.id} achievement={achievement} delay={index * 100} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: '1000ms' }}>
        <p>Adventist University of Central Africa • Software Engineering Program</p>
      </footer>
    </div>
  );
};

export default Index;
