
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/lib/animations";

interface DashboardCardProps {
  title: string;
  icon?: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function DashboardCard({
  title,
  icon,
  badge,
  children,
  className,
  onClick,
}: DashboardCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap={onClick ? "tap" : undefined}
      className={cn(
        "rounded-xl border border-border bg-card p-5",
        "card-shadow transition-all duration-300 h-full",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              {icon}
            </div>
          )}
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        {badge && (
          <div className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-accent text-accent-foreground">
            {badge}
          </div>
        )}
      </div>
      <div>{children}</div>
    </motion.div>
  );
}
