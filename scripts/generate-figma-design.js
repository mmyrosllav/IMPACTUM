#!/usr/bin/env node

/**
 * Figma Design System Generator
 * Автоматично генерує дизайн-систему в Figma на основі специфікації
 */

const fs = require('fs');
const path = require('path');

// Конфігурація дизайн-системи
const designSystem = {
  colors: {
    primary: {
      name: 'Primary',
      hex: '#3B82F6',
      rgb: { r: 59, g: 130, b: 246 }
    },
    secondary: {
      name: 'Secondary',
      hex: '#8B5CF6',
      rgb: { r: 139, g: 92, b: 246 }
    },
    success: {
      name: 'Success',
      hex: '#10B981',
      rgb: { r: 16, g: 185, b: 129 }
    },
    warning: {
      name: 'Warning',
      hex: '#FBBF24',
      rgb: { r: 251, g: 191, b: 36 }
    },
    danger: {
      name: 'Danger',
      hex: '#EF4444',
      rgb: { r: 239, g: 68, b: 68 }
    },
    black: {
      name: 'Black',
      hex: '#0A0B10',
      rgb: { r: 10, g: 11, b: 16 }
    },
    darkGray: {
      name: 'Dark Gray',
      hex: '#1F2937',
      rgb: { r: 31, g: 41, b: 55 }
    },
    mediumGray: {
      name: 'Medium Gray',
      hex: '#6B7280',
      rgb: { r: 107, g: 114, b: 128 }
    },
    lightGray: {
      name: 'Light Gray',
      hex: '#D1D5DB',
      rgb: { r: 209, g: 213, b: 219 }
    },
    white: {
      name: 'White',
      hex: '#FFFFFF',
      rgb: { r: 255, g: 255, b: 255 }
    }
  },
  typography: {
    h1: { size: 56, weight: 800, lineHeight: 1.1, letterSpacing: -1 },
    h2: { size: 40, weight: 800, lineHeight: 1.2, letterSpacing: -0.5 },
    h3: { size: 28, weight: 600, lineHeight: 1.3 },
    h4: { size: 18, weight: 600, lineHeight: 1.4 },
    body: { size: 16, weight: 400, lineHeight: 1.6 },
    bodySmall: { size: 14, weight: 400, lineHeight: 1.5 },
    caption: { size: 12, weight: 400, lineHeight: 1.4 }
  },
  spacing: {
    xs: 8,
    s: 12,
    m: 16,
    l: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
    '5xl': 64,
    '6xl': 80
  },
  borderRadius: {
    pill: 9999,
    large: 20,
    medium: 12,
    small: 8,
    tiny: 4
  }
};

// Функції для роботи з Figma API
const FigmaDesignGenerator = {
  figmaFileId: 'v3YEu4bq9TLkTbQROznzRI',

  // Конвертує hex в RGB
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : null;
  },

  // Генерує API запит для Figma
  async makeRequest(method, endpoint, data = null) {
    const token = process.env.FIGMA_TOKEN;
    if (!token) {
      console.error('❌ FIGMA_TOKEN не знайдено. Будь ласка, встановіть FIGMA_TOKEN як змінну окруження.');
      process.exit(1);
    }

    const url = `https://api.figma.com/v1${endpoint}`;
    const options = {
      method,
      headers: {
        'X-FIGMA-TOKEN': token,
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('❌ Помилка при запиті до Figma API:', error.message);
      throw error;
    }
  },

  // Отримує інформацію про файл
  async getFile() {
    return this.makeRequest('GET', `/files/${this.figmaFileId}`);
  },

  // Генерує дизайн-систему
  async generateDesignSystem() {
    console.log('🚀 Початок генерування дизайн-системи...\n');

    try {
      const file = await this.getFile();
      console.log(`✅ Файл Figma завантажено: ${file.name}`);

      // Кроки генерування
      console.log('\n📋 План генерування:');
      console.log('  1. Кольорова палітра (10 кольорів)');
      console.log('  2. Типографія (7 стилів)');
      console.log('  3. Компоненти кнопок (3 типи)');
      console.log('  4. Компоненти інпутів (4 стани)');
      console.log('  5. Компоненти карток');
      console.log('  6. Компоненти бейджів');
      console.log('  7. Компоненти модалей');
      console.log('  8. Таблиці компонентів');

      console.log('\n⚠️  ПРИМІТКА: Повна автоматизація вимагає Figma Plugin API.');
      console.log('Альтернатива: використовуємо браузерну автоматизацію для прискорення ручного процесу.');

      return {
        fileId: this.figmaFileId,
        fileName: file.name,
        success: true
      };
    } catch (error) {
      console.error('❌ Помилка генерування:', error);
      return { success: false, error: error.message };
    }
  },

  // Генерує HTML код для импорту в Figma через консоль
  generateImportScript() {
    const script = `
// Figma Plugin - Import Design System
const page = figma.currentPage;
const colors = ${JSON.stringify(designSystem.colors, null, 2)};
const typography = ${JSON.stringify(designSystem.typography, null, 2)};

// Створює палітру кольорів
Object.entries(colors).forEach(([key, color]) => {
  const rect = figma.createRectangle();
  rect.fills = [{
    type: 'SOLID',
    color: {
      r: color.rgb.r / 255,
      g: color.rgb.g / 255,
      b: color.rgb.b / 255
    }
  }];
  rect.name = color.name;
  page.appendChild(rect);
});

console.log('✅ Дизайн-система импортована!');
    `;
    return script;
  }
};

// Запуск генератора
(async () => {
  const result = await FigmaDesignGenerator.generateDesignSystem();

  if (result.success) {
    console.log('\n✅ Дизайн-система готова до генерування!');
    console.log('\n📝 Наступні кроки:');
    console.log('  1. Встановіть FIGMA_TOKEN: export FIGMA_TOKEN="your-token-here"');
    console.log('  2. Запустіть: npm run figma:generate');
    console.log('  3. Або використовуйте браузерну автоматизацію для прискорення ручного процесу');
  } else {
    console.error('\n❌ Помилка:', result.error);
    process.exit(1);
  }
})();

module.exports = { FigmaDesignGenerator, designSystem };
