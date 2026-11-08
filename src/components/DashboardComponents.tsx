'use client';
/**
 * @fileOverview Shared UI patterns for all roles to ensure visual and functional consistency.
 */
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon, ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  color?: string;
  bg?: string;
  onClick?: () => void;
  trend?: {
    value: string;
    isUp: boolean;
  };
}

export function StatCard({ 
  title, 
  value, 
  sub, 
  icon: Icon, 
  color = "text-primary", 
  bg = "bg-primary/5",
  onClick,
  trend
}: StatCardProps) {
  return (
    <Card 
      className={cn(
        "enterprise-card border hover:border-primary/40 transition-all cursor-default group",
        onClick && "cursor-pointer active:scale-[0.98]"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className={cn("p-3 rounded-xl border transition-colors", bg)}>
            <Icon className={cn("h-6 w-6", color)} />
          </div>
          {trend ? (
            <div className={cn(
              "flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full border",
              trend.isUp ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
            )}>
              {trend.value}
            </div>
          ) : (
            <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-all" />
          )}
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{title}</p>
          <p className={cn("text-3xl font-black tracking-tighter tabular-nums", color)}>{value}</p>
          {sub && <p className="text-[11px] font-medium text-muted-foreground mt-2">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
    variant?: "default" | "outline" | "ghost";
  };
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div className="space-y-1">
        {subtitle && <p className="text-xs font-bold text-primary uppercase tracking-[0.2em]">{subtitle}</p>}
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter uppercase leading-none">{title}</h2>
      </div>
      {action && (
        <Button 
          onClick={action.onClick} 
          variant={action.variant || "default"}
          className="h-11 px-8 font-black text-[11px] uppercase tracking-[0.2em] shadow-xl rounded-xl"
        >
          {action.icon && <action.icon className="h-4 w-4 mr-2" />}
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function DataTable({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("enterprise-card border bg-card overflow-hidden", className)}>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[800px]">
          {children}
        </table>
      </div>
    </div>
  );
}
