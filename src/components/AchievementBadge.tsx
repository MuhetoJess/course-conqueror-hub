import React from 'react';
import { Achievement } from '@/data/academicData';
import { Lock } from 'lucide-react';

interface AchievementBadgeProps {
  achievement: Achievement;
  delay?: number;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement, delay = 0 }) => {
  return (
    <div
      className={`achievement-badge opacity-0 animate-scale-in ${achievement.unlocked ? 'unlocked' : 'locked'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{achievement.unlocked ? achievement.icon : <Lock className="w-6 h-6" />}</span>
        <div>
          <h4 className={`font-semibold text-sm ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
            {achievement.title}
          </h4>
          <p className="text-xs text-muted-foreground">{achievement.description}</p>
          {achievement.unlocked && achievement.unlockedAt && (
            <p className="text-xs text-primary mt-1">Unlocked {achievement.unlockedAt}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;
