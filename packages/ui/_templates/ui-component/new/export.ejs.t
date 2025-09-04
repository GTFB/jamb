---
to: packages/ui/index.ts
inject: true
after: export { Input } from './components/input';
---
export { <%= h.changeCase.pascalCase(name) %> } from './components/<%= name %>';
