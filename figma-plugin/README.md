# 🎨 Impactum Design System Generator - Figma Plugin

Автоматичне створення повної дизайн-системи в Figma за один клік!

## 📋 Що генерується

✅ **10 кольорів** з hex кодами:
- Primary (#3B82F6), Secondary (#8B5CF6), Success (#10B981)
- Warning (#FBBF24), Danger (#EF4444)
- Black, Dark Gray, Medium Gray, Light Gray, White

✅ **7 типів типографії**:
- H1 (56px), H2 (40px), H3 (28px), H4 (18px)
- Body Large (18px), Body (16px), Body Small (14px), Caption (12px)

✅ **3 варіанти кнопок**:
- Primary (градієнт синього-фіолетового)
- Secondary (контур)
- Danger (червоний)

## 🚀 Як використовувати

### Варіант 1: Развантажити як плагін Figma (рекомендується)

1. **Відкрийте Figma**
2. **Main Menu → Plugins → Development → Import plugin from manifest**
3. **Виберіть файл**: `/Users/myroslavnemytyi/impactum-react/figma-plugin/manifest.json`
4. **Клацніть на плагін** → натисніть кнопку "Генерувати Design System"
5. **Готово!** Дизайн-система буде створена на поточній сторінці

### Варіант 2: Використовувати код у консолі

Якщо не хочете встановлювати плагін:

1. Відкрийте Figma DevTools (Cmd+Option+I / Ctrl+Shift+I)
2. Перейдіть на вкладку Console
3. Скопіюйте вміст `code.js` та вставте в консоль
4. Запустіть функцію: `generateDesignSystem()`

## 📁 Структура плагіну

```
figma-plugin/
├── manifest.json      # Конфігурація плагіну
├── code.js           # Основна логіка (JavaScript, запускається в Figma)
├── ui.html           # Інтерфейс плагіну (кнопки, статус)
└── README.md         # Цей файл
```

## 🎯 Як це працює

1. **code.js** - Основний скрипт Figma Plugin API
   - Генерує прямокутники для кольорів
   - Створює текстові елементи для типографії
   - Складає компоненти кнопок

2. **ui.html** - Інтерфейс користувача
   - Показує список того, що буде створено
   - Кнопка для запуску генерування
   - Індикатор прогресу та повідомлення про успіх/помилку

3. **manifest.json** - Метаданні плагіну
   - Назва, ID, версія API
   - Посилання на основні файли

## 🔧 Що далі?

Після генерування дизайн-системи:

1. **Організуйте елементи** в окремі фрейми
2. **Перетворіть у компоненти** (Figma Components)
3. **Додайте варіації** кнопок (hover, active, disabled)
4. **Синхронізуйте з React** через Code Connect
5. **Додайте решту екранів**: Home, Services, About, Auth, Dashboard, Settings, 404

## 💡 Наступні кроки

- [ ] Генерування дизайн-системи (ЦЕ РОБИМО ЗАРАЗ!)
- [ ] Додавання варіацій компонентів (hover, active, disabled)
- [ ] Створення всіх экранів (Home, Services, About, тощо)
- [ ] Синхронізація з React кодом
- [ ] Експорт спецификацій для розробників

## 📚 Посилання

- [Figma Plugin API Docs](https://www.figma.com/plugin-docs/intro/)
- [Design Specification](/FIGMA_DESIGN_SPECIFICATION.md)
- [React Project Structure](/src)

## ✨ Успіх!

Просто клацніть кнопку, і дизайн-система буде створена за кілька секунд!

---

**Статус**: ✅ Готово до використання
**Версія**: 1.0.0
**Дата**: 2026-03-20
