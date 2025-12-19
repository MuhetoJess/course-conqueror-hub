import React from 'react';
import { calculateLevel } from '@/data/academicData';
import { Zap } from 'lucide-react';

interface LevelProgressProps {
  earnedCredits: number;
}

const LevelProgress: React.FC<LevelProgressProps> = ({ earnedCredits }) => {
  const { level, xpCurrent, xpRequired } = calculateLevel(earnedCredits);
  const progressPercent = (xpCurrent / xpRequired) * 100;

  return (
    <div className="glass-card p-6 glow-border animate-pulse-glow">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
            <span className="text-2xl font-bold font-display text-primary-foreground">{level}</span>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-warning rounded-full p-1">
            <Zap className="w-4 h-4 text-warning-foreground" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg glow-text">Level {level}</h3>
          <p className="text-sm text-muted-foreground">Scholar Rank</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress to Level {level + 1}</span>
          <span className="font-display text-primary">{xpCurrent}/{xpRequired} XP</span>
        </div>
        <div className="xp-bar">
          <div 
            className="xp-fill" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Earn {xpRequired - xpCurrent} more credits to level up!
        </p>
      </div>
    </div>
  );
};

export default LevelProgress;
