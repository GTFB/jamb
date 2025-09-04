import * as React from 'react';
import { cn } from '../lib/utils';

export interface NavigationProps
  extends React.HTMLAttributes<HTMLElement> {
  items?: Array<{ label: string; url: string }>;
}

const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <nav
        className={cn('flex items-center justify-between', className)}
        ref={ref}
        {...props}
      >
        {items && (
          <div className="flex space-x-6">
            {items.map((item) => (
              <a
                key={item.url}
                href={item.url}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    );
  }
);
Navigation.displayName = 'Navigation';

export { Navigation };
