---
to: packages/ui/components/<%= name %>.tsx
---
import * as React from 'react';
import { cn } from '../lib/utils';

export interface <%= h.changeCase.pascalCase(name) %>Props
  extends React.HTMLAttributes<HTMLDivElement> {}

const <%= h.changeCase.pascalCase(name) %> = React.forwardRef<HTMLDivElement, <%= h.changeCase.pascalCase(name) %>Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('<%= className %>', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
<%= h.changeCase.pascalCase(name) %>.displayName = '<%= h.changeCase.pascalCase(name) %>';

export { <%= h.changeCase.pascalCase(name) %> };
