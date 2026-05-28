#!/usr/bin/env node

/**
 * Figma Design System Auto-Builder
 * Використовує браузерну автоматизацію для швидкого створення дизайн-системи
 *
 * Використання:
 * npm run figma:auto-build -- --token YOUR_FIGMA_TOKEN --file-id FILE_ID
 */

const fs = require('fs');
const path = require('path');

// Дизайн-система конфігурація
const designSystem = {
  colors: [
    { name: 'Primary', hex: '#3B82F6', description: 'Main brand color' },
    { name: 'Secondary', hex: '#8B5CF6', description: 'Secondary brand color' },
    { name: 'Success', hex: '#10B981', description: 'Success state' },
    { name: 'Warning', hex: '#FBBF24', description: 'Warning state' },
    { name: 'Danger', hex: '#EF4444', description: 'Error/Danger state' },
    { name: 'Black', hex: '#0A0B10', description: 'Primary black' },
    { name: 'Dark Gray', hex: '#1F2937', description: 'Dark gray' },
    { name: 'Medium Gray', hex: '#6B7280', description: 'Medium gray' },
    { name: 'Light Gray', hex: '#D1D5DB', description: 'Light gray' },
    { name: 'White', hex: '#FFFFFF', description: 'Pure white' }
  ],

  components: {
    buttons: [
      { type: 'Primary', bg: '#3B82F6', color: '#FFFFFF', label: 'Get Started' },
      { type: 'Secondary', bg: 'transparent', border: '#3B82F6', color: '#3B82F6', label: 'Learn More' },
      { type: 'Danger', bg: '#EF4444', color: '#FFFFFF', label: 'Delete' }
    ],
    inputs: [
      { state: 'Default', border: 'rgba(255,255,255,0.1)' },
      { state: 'Focus', border: '#3B82F6' },
      { state: 'Error', border: '#EF4444' },
      { state: 'Disabled', opacity: 0.5 }
    ]
  },

  typography: [
    { name: 'H1', size: 56, weight: 800 },
    { name: 'H2', size: 40, weight: 800 },
    { name: 'H3', size: 28, weight: 600 },
    { name: 'Body', size: 16, weight: 400 },
    { name: 'Small', size: 14, weight: 400 }
  ]
};

console.log('🎨 Figma Design System Auto-Builder');
console.log('===================================\n');

console.log('📊 Дизайн-система до генерування:');
console.log(`  • Кольорів: ${designSystem.colors.length}`);
console.log(`  • Типів кнопок: ${designSystem.components.buttons.length}`);
console.log(`  • Станів інпутів: ${designSystem.components.inputs.length}`);
console.log(`  • Типів типографії: ${designSystem.typography.length}`);

console.log('\n💡 Варіанти використання:\n');

console.log('Варіант 1: Figma REST API');
console.log('  ✅ Швидко, але обмежено для запису');
console.log('  📌 Потребує FIGMA_TOKEN\n');

console.log('Варіант 2: Figma Plugin API');
console.log('  ✅ Повна функціональність');
console.log('  📌 Запускається всередині Figma\n');

console.log('Варіант 3: Браузерна автоматизація (рекомендується)');
console.log('  ✅ Найбільш практичний,易контролюємий');
console.log('  📌 Використовує браузерну автоматизацію\n');

console.log('🚀 Рекомендація:');
console.log('   Використовуйте Variant 3 (браузерна автоматизація)');
console.log('   для швидкого і надійного створення дизайн-системи.\n');

// Генерує JSON конфіг для браузерної автоматизації
const buildConfig = {
  fileId: 'v3YEu4bq9TLkTbQROznzRI',
  fileUrl: 'https://www.figma.com/design/v3YEu4bq9TLkTbQROznzRI/Impactum',
  designSystem,
  instructions: {
    colorPalette: 'Створити прямокутники для кожного кольору з назвою та hex кодом',
    typography: 'Додати текстові стилі для всіх розмірів',
    buttons: 'Створити варіанти кнопок (Primary, Secondary, Danger)',
    inputs: 'Додати компоненти інпутів зі станами',
    cards: 'Створити шаблони карток',
    modals: 'Додати модальні вікна',
    tables: 'Додати таблиці',
    responsiveFrames: 'Створити frames для Desktop, Tablet, Mobile'
  }
};

// Зберігає конфіг
const configPath = path.join(__dirname, 'figma-build-config.json');
fs.writeFileSync(configPath, JSON.stringify(buildConfig, null, 2));

console.log(`✅ Конфіг збережено: ${configPath}`);

// Генерує інструкції для браузерної автоматизації
const instructions = `
# Figma Design System Build Instructions

## Файл проекту
- URL: ${buildConfig.fileUrl}
- File ID: ${buildConfig.fileId}

## План роботи (по порядку)

### 1️⃣ Design System Page - Color Palette
Створити сітку кольорів:
${designSystem.colors.map((c, i) => `
- Позиція ${i + 1}: Прямокутник 200x100px, колір ${c.hex}
  - Текст внизу: ${c.name}
  - Під ним: ${c.hex}`).join('\n')}

### 2️⃣ Typography Examples
${designSystem.typography.map(t => `
- ${t.name}: текст "The quick brown fox", розмір ${t.size}px, вага ${t.weight}`).join('\n')}

### 3️⃣ Button Components
${designSystem.components.buttons.map(b => `
- ${b.type} Button: "${b.label}"`).join('\n')}

### 4️⃣ Input States
${designSystem.components.inputs.map(i => `
- Input ${i.state}`).join('\n')}

## Інструменти
- Figma Rectangle tool для форм
- Text tool для написання назв
- Color picker для установки точних кольорів
- Align tools для вирівнювання елементів

## Порядок дій
1. Клацніть на Design System page
2. Для кожного кольору:
   - Малюйте прямокутник (200x100)
   - Встановіть точний колір (hex)
   - Додайте текст-лейбл
3. Повторіть для типографії, кнопок, інпутів
4. Використовуйте Grid або компонентні фрейми для організації
`;

const instructionsPath = path.join(__dirname, 'FIGMA_BUILD_INSTRUCTIONS.md');
fs.writeFileSync(instructionsPath, instructions);

console.log(`✅ Інструкції збережено: ${instructionsPath}\n`);

console.log('📋 Наступні кроки:');
console.log('1. Відкрийте файл Figma в браузері');
console.log('2. Перейдіть на Design System page');
console.log('3. Запустіть браузерну автоматизацію:');
console.log(`   npm run figma:build\n`);

module.exports = { designSystem, buildConfig };
