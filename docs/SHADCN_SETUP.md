# 🎨 Jamb UI - Shadcn/ui & Hygen Setup

## ✅ Что настроено:

### 1. **Shadcn/ui Components** 
- ✅ Button (с вариантами: default, outline, ghost, etc.)
- ✅ Input (поля ввода)
- ✅ Label (лейблы для форм)
- ✅ Textarea (многострочные поля)
- ✅ Select (выпадающие списки с Radix UI)
- ✅ Card (карточки с подкомпонентами)

### 2. **Hygen Generators**
- ✅ UI Component Generator
- ✅ Page Generator  
- ✅ Form Generator
- ✅ DnD Component Generator

### 3. **PowerShell Script**
- ✅ `bun run generate` - быстрый способ создания компонентов

## 🚀 Как использовать:

### Создание UI компонента:
```bash
bun run generate ui badge "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
```

### Создание страницы:
```bash
bun run generate page settings "admin/settings" "Application settings"
```

### Создание формы:
```bash
bun run generate form product "Create or edit product"
```

### Создание DnD компонента:
```bash
bun run generate dnd text-block
```

## 📋 Примеры использования в коде:

### Страница с Shadcn/ui:
```tsx
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@jamb/ui';

export default function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Заголовок</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Введите текст" />
        <Button>Кнопка</Button>
      </CardContent>
    </Card>
  );
}
```

### Форма с валидацией:
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Label, Card } from '@jamb/ui';

// Автоматически генерируется с bun run generate form
```

### Drag & Drop компонент:
```tsx
import { useSortable } from '@dnd-kit/sortable';
import { Card, Button } from '@jamb/ui';

// Автоматически генерируется с bun run generate dnd
```

## 🎯 Стандарты:

### 1. **Импорты**
```tsx
// ✅ Правильно
import { Button, Input, Card } from '@jamb/ui';

// ❌ Неправильно  
import { Button } from './components/Button';
```

### 2. **Стили**
```tsx
// ✅ Используйте Shadcn/ui переменные
className="bg-card text-card-foreground border border-input"

// ❌ Избегайте хардкода цветов
className="bg-white text-black border border-gray-300"
```

### 3. **Типизация**
```tsx
interface MyComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
}
```

## 🔧 Разработка:

### Добавление нового компонента:
1. `bun run generate ui my-component`
2. Редактируйте `packages/ui/components/my-component.tsx`
3. Обновите `packages/ui/index.ts`
4. Протестируйте

### Добавление нового генератора:
1. `bunx hygen generator new my-generator`
2. Создайте шаблоны в `_templates/my-generator/new/`
3. Добавьте логику в шаблоны
4. Протестируйте

## 📚 Документация:

- [Shadcn/ui](https://ui.shadcn.com/)
- [Hygen](https://www.hygen.io/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🎉 Результат:

Теперь у вас есть:
- ✅ Единый стандарт UI компонентов
- ✅ Быстрая генерация кода через Hygen
- ✅ TypeScript типизация
- ✅ Доступность (ARIA)
- ✅ Консистентный дизайн
- ✅ Простота использования

**Все готово для продуктивной разработки!** 🚀
