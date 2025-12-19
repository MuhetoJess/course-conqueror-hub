import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { gpaHistory } from '@/data/academicData';

const GPAChart: React.FC = () => {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-lg mb-4 glow-text">GPA Trend</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={gpaHistory}>
            <defs>
              <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(175, 80%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(175, 80%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="semester" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }}
            />
            <YAxis 
              domain={[12, 18]} 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(220, 18%, 10%)',
                border: '1px solid hsl(175, 80%, 50%, 0.3)',
                borderRadius: '8px',
                color: 'hsl(210, 40%, 98%)',
              }}
              labelStyle={{ color: 'hsl(175, 80%, 50%)' }}
            />
            <Area
              type="monotone"
              dataKey="gpa"
              stroke="hsl(175, 80%, 50%)"
              strokeWidth={3}
              fill="url(#gpaGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GPAChart;
