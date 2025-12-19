import React from 'react';
import { Achievement } from '@/data/academicData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Lock } from 'lucide-react';

interface AchievementBadgeProps {
  achievement: Achievement;
  delay?: number;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement, delay = 0 }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`flex flex-col items-center p-3 rounded-lg border transition-all cursor-pointer ${
              achievement.unlocked 
                ? 'bg-primary/5 border-primary/20 hover:border-primary/40' 
                : 'bg-muted/50 border-border opacity-50'
            }`}
          >
            <div className="text-2xl mb-1">
              {achievement.unlocked ? achievement.icon : <Lock className="w-6 h-6 text-muted-foreground" />}
            </div>
            <span className="text-xs font-medium text-center text-foreground line-clamp-2">
              {achievement.title}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{achievement.title}</p>
          <p className="text-xs text-muted-foreground">{achievement.description}</p>
          {achievement.unlocked && achievement.unlockedAt && (
            <p className="text-xs text-success mt-1">Unlocked: {achievement.unlockedAt}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AchievementBadge;
