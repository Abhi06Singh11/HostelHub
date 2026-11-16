'use client';
/**
 * @fileOverview Shared UI patterns for all roles following standardized enterprise typography.
 */
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon, ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  title?: string;
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
  label,
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
        "enterprise-card border transition-all duration-300",
        onClick ? "cursor-pointer active:scale-[0.98] hover:border-primary/40 hover:shadow-md" : "cursor-default"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-5">
          <div className={cn("p-2.5 rounded-xl border border-transparent group-hover:border-primary/20", bg)}>
            <Icon className={cn("h-5 w-5", color)} />
          </div>
          {trend ? (
            <div className={cn(
              "flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border shadow-sm",
              trend.isUp ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-500/20" : "bg-red-50 text-red-600 border-red-100 dark:bg-red-950/30 dark:border-red-500/20"
            )}>
              {trend.value}
            </div>
          ) : (
            <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-all duration-300" />
          )}
        </div>
        <div className="space-y-1">
          <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-widest">{label || title}</p>
          <p className={cn("text-2xl font-bold tracking-tight tabular-nums", color)}>{value}</p>
          {sub && <p className="text-[11px] md:text-[13px] font-medium text-muted-foreground/80 mt-1.5 leading-tight">{sub}</p>}
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
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-10">
      <div className="space-y-1.5">
        {subtitle && <p className="text-[12px] md:text-[13px] font-semibold text-primary uppercase tracking-[0.2em]">{subtitle}</p>}
        <h2 className="text-xl md:text-3xl font-bold text-foreground tracking-tight leading-tight uppercase">{title}</h2>
      </div>
      {action && (
        <Button 
          onClick={action.onClick} 
          variant={action.variant || "default"}
          className="h-10 md:h-11 px-4 md:px-6 font-semibold text-[11px] md:text-[13px] uppercase tracking-wider shadow-lg rounded-xl w-full md:w-auto"
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
      <div className="overflow-x-auto w-full scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[800px]">
          {children}
        </table>
      </div>
    </div>
  );
}
