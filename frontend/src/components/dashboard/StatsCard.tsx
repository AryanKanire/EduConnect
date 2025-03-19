
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/lib/animations";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon,
  className,
}: StatsCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={cn(
        "flex flex-col space-y-2 rounded-xl border border-border bg-card p-5",
        "card-shadow h-full",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold">{value}</span>
        {change && (
          <span
            className={cn(
              "text-xs font-medium",
              change.isPositive ? "text-emerald-500" : "text-rose-500"
            )}
          >
            {change.isPositive ? "+" : "-"}
            {Math.abs(change.value)}%
          </span>
        )}
      </div>
    </motion.div>
  );
}
