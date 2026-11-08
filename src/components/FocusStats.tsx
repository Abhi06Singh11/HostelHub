
"use client"

import { useMemo, useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SessionData {
  timestamp: number;
  duration: number;
  reason: string;
}

export function FocusStats() {
  const [data, setData] = useState<{ day: string; sessions: number }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("vibeFocusSessionHistory");
    if (saved) {
      const history: SessionData[] = JSON.parse(saved);
      
      // Group by last 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString('en-US', { weekday: 'short' });
      }).reverse();

      const counts = history.reduce((acc: Record<string, number>, session) => {
        const day = new Date(session.timestamp).toLocaleDateString('en-US', { weekday: 'short' });
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});

      const chartData = last7Days.map(day => ({
        day,
        sessions: counts[day] || 0
      }));

      setData(chartData);
    }
  }, []);

  if (data.length === 0 || data.every(d => d.sessions === 0)) {
    return null;
  }

  return (
    <Card className="w-full border-none shadow-sm bg-card/30 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Productivity Pulse</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[150px] w-full">
          <ChartContainer config={{
            sessions: {
              label: "Sessions",
              color: "hsl(var(--primary))",
            },
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis 
                  dataKey="day" 
                  stroke="#888888" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="sessions" 
                  fill="var(--color-sessions)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
