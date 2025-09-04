# Jamb UI - Shadcn/ui Components & Hygen Generators

## 🎨 Shadcn/ui Components

Все компоненты следуют стандартам Shadcn/ui и доступны через `@jamb/ui`.

### Доступные компоненты:

- **Button** - Кнопки с различными вариантами (default, outline, ghost, etc.)
- **Input** - Поля ввода
- **Label** - Лейблы для форм
- **Textarea** - Многострочные поля ввода
- **Select** - Выпадающие списки с полной поддержкой Radix UI
- **Card** - Карточки с подкомпонентами (Header, Content, Footer, etc.)

### Использование:

```tsx
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@jamb/ui';

export default function MyComponent() {
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

## 🚀 Hygen Generators

### 1. UI Component Generator

Создает новый Shadcn/ui компонент:

```bash
bunx hygen ui-component new <component-name> --className "base-classes"
```

**Пример:**
```bash
bunx hygen ui-component new badge --className "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
```

### 2. Page Generator

Создает новую страницу с Shadcn/ui компонентами:

```bash
bunx hygen page new <page-name> --path "admin/settings" --description "Settings page description"
```

**Пример:**
```bash
bunx hygen page new settings --path "admin/settings" --description "Manage application settings"
```

### 3. Form Generator

Создает форму с React Hook Form и Zod валидацией:

```bash
bunx hygen form new <form-name> --description "Form description"
```

**Пример:**
```bash
bunx hygen form new product --description "Create or edit product information"
```

### 4. DnD Component Generator

Создает drag & drop компонент с dnd-kit:

```bash
bunx hygen dnd-component new <component-name>
```

**Пример:**
```bash
bunx hygen dnd-component new block-item
```

## 📋 Примеры использования

### Создание страницы настроек:

```bash
bunx hygen page new settings --path "admin/settings" --description "Application settings and configuration"
```

### Создание формы продукта:

```bash
bunx hygen form new product --description "Create and edit product information"
```

### Создание drag & drop блока:

```bash
bunx hygen dnd-component new text-block
```

## 🎯 Стандарты

### 1. Импорты
Всегда используйте импорты из `@jamb/ui`:
```tsx
import { Button, Input, Card } from '@jamb/ui';
```

### 2. Стили
Используйте Tailwind CSS классы и Shadcn/ui переменные:
```tsx
className="bg-card text-card-foreground border border-input"
```

### 3. Типизация
Все компоненты имеют полную TypeScript типизацию:
```tsx
interface MyComponentProps {
  title: string;
  description?: string;
}
```

### 4. Доступность
Все компоненты следуют стандартам доступности (ARIA, keyboard navigation).

## 🔧 Разработка

### Добавление нового компонента:

1. Создайте компонент через Hygen:
```bash
bunx hygen ui-component new my-component
```

2. Редактируйте сгенерированный файл
3. Обновите экспорты в `packages/ui/index.ts`
4. Протестируйте компонент

### Добавление нового генератора:

1. Создайте генератор:
```bash
bunx hygen generator new my-generator
```

2. Создайте шаблоны в `_templates/my-generator/new/`
3. Добавьте переменные и логику в шаблоны
4. Протестируйте генератор

## 📚 Документация

- [Shadcn/ui Documentation](https://ui.shadcn.com/)
- [Hygen Documentation](https://www.hygen.io/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
