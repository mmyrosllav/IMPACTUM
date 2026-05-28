/**
 * Impactum Design System Generator
 * Figma Plugin для автоматичного створення дизайн-системи
 */

// Дизайн-система конфігурація
const DESIGN_SYSTEM = {
  colors: [
    { name: 'Primary', hex: '#3B82F6' },
    { name: 'Secondary', hex: '#8B5CF6' },
    { name: 'Success', hex: '#10B981' },
    { name: 'Warning', hex: '#FBBF24' },
    { name: 'Danger', hex: '#EF4444' },
    { name: 'Black', hex: '#0A0B10' },
    { name: 'Dark Gray', hex: '#1F2937' },
    { name: 'Medium Gray', hex: '#6B7280' },
    { name: 'Light Gray', hex: '#D1D5DB' },
    { name: 'White', hex: '#FFFFFF' }
  ],
  typography: [
    { name: 'H1', size: 56, weight: 800 },
    { name: 'H2', size: 40, weight: 800 },
    { name: 'H3', size: 28, weight: 600 },
    { name: 'Body Large', size: 18, weight: 400 },
    { name: 'Body', size: 16, weight: 400 },
    { name: 'Body Small', size: 14, weight: 400 },
    { name: 'Caption', size: 12, weight: 400 }
  ]
};

// Утиліти для роботи з кольорами
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 1, g: 1, b: 1 };
}

function createColorSwatch(name, hex, x, y) {
  const rect = figma.createRectangle();
  rect.resize(160, 100);
  rect.x = x;
  rect.y = y;
  rect.fills = [{
    type: 'SOLID',
    color: hexToRgb(hex),
    opacity: 1
  }];
  rect.cornerRadius = 8;

  // Текст з назвою кольору
  const text = figma.createText();
  text.characters = name;
  text.fontSize = 14;
  text.fontName = { family: 'Manrope', style: 'Regular' };
  text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 1 }];
  text.x = x + 12;
  text.y = y + 12;

  // Текст з hex кодом
  const hexText = figma.createText();
  hexText.characters = hex;
  hexText.fontSize = 11;
  hexText.fontName = { family: 'Manrope', style: 'Regular' };
  hexText.fills = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 }, opacity: 1 }];
  hexText.x = x + 12;
  hexText.y = y + 50;

  // Групує елементи
  const group = figma.group([rect, text, hexText], figma.currentPage);
  group.name = `Color/${name}`;

  return group;
}

function createTypographyExample(name, size, weight, x, y) {
  const text = figma.createText();
  text.characters = `${name}: The quick brown fox`;
  text.fontSize = size;
  text.fontName = { family: 'Manrope', style: weight === 800 ? 'Bold' : 'Regular' };
  text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 1 }];
  text.x = x;
  text.y = y;
  text.name = `Typography/${name}`;

  return text;
}

function createButton(type, label, x, y) {
  const colorMap = {
    'Primary': { bg: '#3B82F6', text: '#FFFFFF' },
    'Secondary': { bg: 'transparent', text: '#3B82F6', border: '#3B82F6' },
    'Danger': { bg: '#EF4444', text: '#FFFFFF' }
  };

  const config = colorMap[type];

  // Основний прямокутник кнопки
  const rect = figma.createRectangle();
  rect.resize(160, 48);
  rect.x = x;
  rect.y = y;
  rect.cornerRadius = 8;

  if (config.bg !== 'transparent') {
    rect.fills = [{
      type: 'SOLID',
      color: hexToRgb(config.bg),
      opacity: 1
    }];
  } else {
    rect.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0 }];
    rect.strokes = [{
      type: 'SOLID',
      color: hexToRgb(config.border),
      opacity: 1
    }];
    rect.strokeWeight = 2;
  }

  // Текст кнопки
  const text = figma.createText();
  text.characters = label;
  text.fontSize = 14;
  text.fontName = { family: 'Manrope', style: 'Bold' };
  text.fills = [{ type: 'SOLID', color: hexToRgb(config.text), opacity: 1 }];
  text.x = x + 32;
  text.y = y + 14;

  const group = figma.group([rect, text], figma.currentPage);
  group.name = `Button/${type}`;

  return group;
}

// Основна функція для генерування дизайн-системи
function generateDesignSystem() {
  const page = figma.currentPage;

  // Заголовок
  const title = figma.createText();
  title.characters = 'DESIGN SYSTEM';
  title.fontSize = 32;
  title.fontName = { family: 'Manrope', style: 'Bold' };
  title.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 1 }];
  title.x = 40;
  title.y = 40;
  page.appendChild(title);

  // Секція кольорів
  let colorY = 100;
  const colorTitle = figma.createText();
  colorTitle.characters = 'Colors';
  colorTitle.fontSize = 20;
  colorTitle.fontName = { family: 'Manrope', style: 'Bold' };
  colorTitle.fills = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.6 }, opacity: 1 }];
  colorTitle.x = 40;
  colorTitle.y = colorY;
  page.appendChild(colorTitle);

  colorY += 50;
  let colorX = 40;
  let colorsPerRow = 4;

  DESIGN_SYSTEM.colors.forEach((color, index) => {
    createColorSwatch(color.name, color.hex, colorX, colorY);
    colorX += 200;

    if ((index + 1) % colorsPerRow === 0) {
      colorX = 40;
      colorY += 130;
    }
  });

  // Секція типографії
  colorY += 50;
  const typographyTitle = figma.createText();
  typographyTitle.characters = 'Typography';
  typographyTitle.fontSize = 20;
  typographyTitle.fontName = { family: 'Manrope', style: 'Bold' };
  typographyTitle.fills = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.6 }, opacity: 1 }];
  typographyTitle.x = 40;
  typographyTitle.y = colorY;
  page.appendChild(typographyTitle);

  let typographyY = colorY + 50;
  DESIGN_SYSTEM.typography.forEach((typo) => {
    createTypographyExample(typo.name, typo.size, typo.weight, 40, typographyY);
    typographyY += typo.size + 20;
  });

  // Секція кнопок
  typographyY += 50;
  const buttonsTitle = figma.createText();
  buttonsTitle.characters = 'Buttons';
  buttonsTitle.fontSize = 20;
  buttonsTitle.fontName = { family: 'Manrope', style: 'Bold' };
  buttonsTitle.fills = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.6 }, opacity: 1 }];
  buttonsTitle.x = 40;
  buttonsTitle.y = typographyY;
  page.appendChild(buttonsTitle);

  let buttonY = typographyY + 50;
  createButton('Primary', 'Get Started', 40, buttonY);
  createButton('Secondary', 'Learn More', 220, buttonY);
  createButton('Danger', 'Delete', 400, buttonY);
}

// Обробник команди від UI
figma.ui.onmessage = msg => {
  if (msg.type === 'generate') {
    try {
      generateDesignSystem();
      figma.ui.postMessage({ type: 'success', message: 'Design System створена успішно!' });
    } catch (error) {
      figma.ui.postMessage({ type: 'error', message: error.message });
    }
  }
};

// Сповіщення про готовність
figma.ui.postMessage({ type: 'ready' });
