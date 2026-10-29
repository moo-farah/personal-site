import type { ReactNode } from 'react';

interface FunCardProps {
  title: string;
  hint: string;
  action?: ReactNode;
  children: ReactNode;
  clip?: boolean;
}

export const FunCard = ({
  title,
  hint,
  action,
  children,
  clip = true,
}: FunCardProps) => {
  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-700 ${
        clip ? 'overflow-hidden' : 'overflow-visible'
      }`}
    >
      <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-4">
        <div>
          <h2 className="text-lg font-medium">{title}</h2>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
        </div>
        {action}
      </div>
      <div
        className={`h-56 border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-[#111] sm:h-64 ${
          clip ? 'overflow-hidden' : 'overflow-visible'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
