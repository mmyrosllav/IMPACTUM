# 🎨 IMPACTUM AGENCY - FIGMA DESIGN SPECIFICATION

## 📐 ПРОЕКТ СТРУКТУРА

### Сторінки (Pages):
1. **Design System** - Барвники, типографія, компоненти
2. **Home** - Головна сторінка
3. **Services** - Каталог послуг
4. **About** - Про компанію
5. **Auth** - Login & Register
6. **Dashboard** - Користувацька панель
7. **Settings** - Налаштування
8. **Components** - Бібліотека компонентів
9. **Mobile** - Мобільні версії

---

## 🎯 DESIGN SYSTEM

### 1️⃣ КОЛОРИ

#### Основна палітра:
```
Primary: #3B82F6 (Синій)
Secondary: #8B5CF6 (Фіолетовий)
Success: #10B981 (Зелений)
Warning: #FBBF24 (Жовтий)
Danger: #EF4444 (Червоний)
```

#### Нейтральні:
```
Black: #0A0B10
Dark Gray: #1F2937
Medium Gray: #6B7280
Light Gray: #D1D5DB
White: #FFFFFF
```

#### Вторинні фони:
```
Glass BG: rgba(255, 255, 255, 0.03)
Glass Border: rgba(255, 255, 255, 0.08)
Card Shadow: rgba(59, 130, 246, 0.2)
```

#### Градієнти:
```
Button Gradient: linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)
Text Gradient: linear-gradient(135deg, #60A5FA 0%, #C084FC 100%)
Background Orb 1: radial-gradient(circle at 20%, rgba(59, 130, 246, 0.15), transparent)
Background Orb 2: radial-gradient(circle at 80%, rgba(139, 92, 246, 0.15), transparent)
```

### 2️⃣ ТИПОГРАФІЯ

#### Шрифти:
- **Display/Logo**: Orbitron (900 - для логотипу)
- **Body/UI**: Manrope (300, 400, 600, 800)

#### Розміри:
```
H1: 56px (3.5rem) | Weight: 800 | Line Height: 1.1 | Letter Spacing: -1px
H2: 40px (2.5rem) | Weight: 800 | Line Height: 1.2 | Letter Spacing: -0.5px
H3: 28px (1.75rem) | Weight: 600 | Line Height: 1.3
H4: 18px (1.125rem) | Weight: 600 | Line Height: 1.4
Body Large: 18px | Weight: 400 | Line Height: 1.6
Body: 16px | Weight: 400 | Line Height: 1.6
Body Small: 14px | Weight: 400 | Line Height: 1.5
Caption: 12px | Weight: 400 | Line Height: 1.4
```

### 3️⃣ SPACING

```
XS: 8px
S: 12px
M: 16px
L: 20px
XL: 24px
2XL: 32px
3XL: 40px
4XL: 48px
5XL: 64px
6XL: 80px
```

### 4️⃣ BORDER RADIUS

```
Pill (повна округлення): 9999px
Large: 20px (для карток)
Medium: 12px (для модалей)
Small: 8px (для кнопок, inputs)
Tiny: 4px (для бейджів)
```

### 5️⃣ SHADOWS

```
XS: 0 1px 2px rgba(0, 0, 0, 0.05)
S: 0 2px 4px rgba(0, 0, 0, 0.1)
M: 0 4px 8px rgba(0, 0, 0, 0.15)
L: 0 8px 16px rgba(0, 0, 0, 0.2)
XL: 0 20px 40px rgba(0, 0, 0, 0.3)
Glow: 0 0 30px rgba(59, 130, 246, 0.2)
Button Hover: 0 10px 30px rgba(59, 130, 246, 0.3)
```

### 6️⃣ КОМПОНЕНТИ

#### Button Component
- **States**: Default, Hover, Active, Disabled
- **Variants**:
  - Primary (Gradient, Glow)
  - Secondary (Outline)
  - Danger (Red)
  - Small/Medium/Large

#### Input Component
- **States**: Default, Focus, Error, Disabled
- **Border**: 1px solid rgba(255, 255, 255, 0.1)
- **Focus Border**: 1px solid #3B82F6
- **Background**: rgba(255, 255, 255, 0.02)
- **Padding**: 12px 16px

#### Card Component
- **Border**: 1px solid rgba(255, 255, 255, 0.08)
- **Background**: rgba(255, 255, 255, 0.03)
- **Padding**: 40px (2.5rem)
- **Border Radius**: 20px
- **Shadow**: 0 20px 40px rgba(0, 0, 0, 0.3)
- **Backdrop Filter**: blur(20px)

#### Badge Component
- **Variants**: Primary, Success, Warning, Danger
- **Padding**: 4px 10px
- **Border Radius**: 4px
- **Font Size**: 0.65rem (10px)
- **Font Weight**: 800

#### Modal Component
- **Overlay**: rgba(0, 0, 0, 0.9) with backdrop-filter: blur(10px)
- **Content Width**: 500px (max)
- **Border Radius**: 20px
- **Padding**: 40px
- **Border**: 1px solid rgba(255, 255, 255, 0.1)

#### Header Component
- **Height**: 80px
- **Background**: rgba(10, 11, 16, 0.9) with blur(20px)
- **Border Bottom**: 1px solid rgba(255, 255, 255, 0.05)
- **Position**: Sticky
- **Z-Index**: 1000

#### Stats Bar
- **Height**: 100px
- **Background**: Linear gradient (blue to purple)
- **Display**: Grid with 4 columns
- **Stat Number**: 3rem, bold 900
- **Stat Label**: 0.85rem

---

## 📱 ЕКРАН 1: HOME PAGE

### Layout:
- Header (sticky)
- Main content
- Footer

### Sections:

#### 1. Hero Section
- **Min Height**: 80vh
- **Background**: Dark with animated orbs
- **Content**:
  - Badge: "Grantwriting & Strategy" (centered)
  - H1: "Professional Grantwriting **for Your Success**" (центр)
  - P: "Transforming your ideas into funded projects..." (18px, gray)
  - Buttons: "Get Started" + "Our Team" (спільно)

#### 2. Stats Bar
- 4 Stat Items:
  - 94% | Success
  - $3M+ | Attracted
  - 50+ | Projects
  - 24/7 | Support

#### 3. Our Process Section
- H2 centered: "Our Process"
- 3-column grid:
  - Card 1: "01" + "Analysis" + Description
  - Card 2: "02" + "Strategy" + Description
  - Card 3: "03" + "Submission" + Description
- Border-top: 2px solid primary

#### 4. Client Success Section
- H2: "Client Success"
- 2-column grid:
  - Testimonial Card 1: Quote + Avatar + Name + Title
  - Testimonial Card 2: Quote + Avatar + Name + Title

#### 5. FAQ Section
- H2: "Frequently Asked Questions"
- 3x Accordion Items:
  - Q: "What is your success rate?"
  - Q: "How long does it take..."
  - Q: "Do you work with startups?"
- Smooth height animation

#### 6. CTA Final Section
- Large Card:
  - H2: "Ready to get funded?"
  - P: "Join 50+ successful projects..."
  - Button: "Create Free Account"
- Background: Gradient (blue + purple with opacity)

---

## 📱 ЕКРАН 2: SERVICES PAGE

### Layout:
- Header
- Page Header Section
- Filter Tabs (All, Consulting, Monitoring, Turnkey)
- Services Grid (3 columns)
- Footer

### Service Card:
- Category Badge (small, colored)
- H3: Service Name
- P: Description (min-height: 60px)
- Price: "2,000 - 4,000 ₴" (1.6rem, bold)
- Button: "Order Now"

### Services:
```
Consulting:
- Expert Consultation
- Application Editing

Monitoring:
- SME Business Monitoring
- NGO / Micro Monitoring

Turnkey:
- Standard Package
- VIP Package
```

### Animations:
- On filter change: Card animations (opacity 0 → 1, scale 0.95 → 1)
- Duration: 0.3s
- Skeleton loaders while loading (1s delay)

---

## 📱 ЕКРАН 3: ABOUT PAGE

### Layout:
- Header
- Main container (padding: 120px 0)
- 2-column grid

### Section 1: Our Mission
- Left column:
  - H2: "Our Mission"
  - P: Description
- Right column:
  - Large card with:
    - "94%" (4rem, primary accent)
    - "Success Rate"

### Section 2: Management
- H2: "Management" (centered)
- 2-column grid:
  - Team Member 1:
    - Avatar Image: /myroslav.jpg (circular, 120px)
    - H3: Name
    - P: Role (primary accent, bold)
  - Team Member 2:
    - Avatar Image: /kateryna.jpg
    - H3: Name
    - P: Role (secondary accent, bold)

---

## 📱 ЕКРАН 4: LOGIN PAGE

### Layout:
- Header
- Centered card (max-width: 400px)
- Footer

### Card Content:
- H2: "Login"
- Form:
  - Input: Email
  - Input: Password
  - Button: "Sign In" (full width)

### Form States:
- Default: Border 1px solid rgba(255,255,255,0.1)
- Focus: Border 1px solid primary accent, background opacity increase
- Error: Border color red

---

## 📱 ЕКРАН 5: REGISTER PAGE

### Layout:
- Header
- Centered card (max-width: 400px)
- Footer

### Card Content:
- H2: "Create Account"
- Form:
  - Input: Full Name
  - Input: Email
  - Input: Password (min 6 chars)
  - Button: "Register" (full width)
  - P: "Already have account? Login" (link)

---

## 📱 ЕКРАН 6: DASHBOARD PAGE

### Layout:
- Header
- Main container (padding-top: 120px)
- Footer

### Section 1: Welcome & Stats
- Flex row (space-between):
  - Left:
    - H1: "Welcome, {name}! (edit)" - edit link in small gray
    - P: user email (muted)
  - Right:
    - Card: "{count} Orders"

### Section 2: Orders Table
- H3: "Your Orders (Click for details)"
- If empty: "No orders found"
- If has orders: Table
  - Columns: SERVICE | DATE | STATUS | ACTION
  - Row hover effect: background rgba(255,255,255,0.03)
  - Status badge with color (Pending, Active, etc)
  - Delete button (red, small)

### Modal: Order Details
- Header:
  - "ORDER DETAILS" (small cap)
  - H2: Service Name
- 2-column grid:
  - Order ID: #xxxxx
  - Date: xx/xx/xxxx
  - Status: PENDING
- Card with next steps (info box)
- Button: "Close Window"

---

## 📱 ЕКРАН 7: SETTINGS PAGE

### Layout:
- Header
- Main container (padding-top: 120px)
- Footer

### 2-column Grid:

#### Column 1: Account Info Card
- H3: "Account Info"
- Info items:
  - Name: label + value
  - Email: label + value

#### Column 2: Danger Zone Card
- H3: "Danger Zone" (red text)
- P: "Once you delete... Please be certain"
- Button: "Delete My Account" (red background)

---

## 📱 ЕКРАН 8: 404 NOT FOUND

### Layout:
- Header
- Centered container (min-height: 80vh)
- Footer

### Content:
- H1: "404" (10rem, gradient text, opacity 0.8)
- H2: "Page Not Found"
- P: "The page you are looking for..."
- Button: "Return to Homepage"
- Background orb (300px, 0.1 opacity, centered behind)

---

## 📱 КОМПОНЕНТИ - БІБЛІОТЕКА

### 1. BUTTONS

**Primary Button**
- Padding: 12px 32px
- Background: Gradient (blue to purple)
- Color: White
- Border Radius: 8px
- Font Size: 16px, Weight: 600
- Box Shadow: Glow
- Hover: translateY(-3px), enhance shadow
- Active: translateY(0), reduce shadow

**Secondary Button (Outline)**
- Padding: 12px 32px
- Background: Transparent
- Border: 2px solid primary
- Color: Primary
- Border Radius: 8px
- Hover: background: rgba(59, 130, 246, 0.1)

**Danger Button**
- Background: #EF4444
- Same padding/sizing as primary
- Hover: darker red

**Disabled State**
- Opacity: 0.5
- Cursor: not-allowed

### 2. INPUTS

**Text Input**
- Width: 100%
- Padding: 12px 16px
- Font Size: 16px
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border Radius: 8px
- Background: rgba(255, 255, 255, 0.02)
- Color: White
- Placeholder: rgba(255, 255, 255, 0.5)
- Focus: border-color: primary, outline: none
- Error: border-color: danger

**Textarea**
- Same as input
- Min Height: 100px
- Resize: none

### 3. CARDS

**Standard Card**
- Border: 1px solid rgba(255, 255, 255, 0.08)
- Background: rgba(255, 255, 255, 0.03)
- Padding: 40px
- Border Radius: 20px
- Backdrop Filter: blur(20px)
- Hover: border-color increases to 0.12

**Compact Card**
- Padding: 20px
- Border Radius: 12px

### 4. BADGES

**Primary Badge**
- Background: rgba(59, 130, 246, 0.2)
- Color: #60A5FA
- Padding: 4px 10px
- Border Radius: 4px
- Font Size: 10px (0.65rem)
- Weight: 800
- Letter Spacing: 1px
- Text Transform: uppercase

**Status Badges**
- Pending: Yellow bg/text
- Active: Blue bg/text
- Completed: Green bg/text

### 5. MODALS

**Modal Overlay**
- Position: fixed, inset 0
- Background: rgba(0, 0, 0, 0.9)
- Backdrop Filter: blur(10px)
- Display: flex, center items
- Z-Index: 1000

**Modal Content**
- Width: 95%, max-width: 500px
- Background: #0A0B10
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border Radius: 20px
- Padding: 40px
- Position: relative

**Close Button**
- Position: absolute, top: 20px, right: 20px
- Background: none
- Border: none
- Font Size: 24px
- Color: white
- Cursor: pointer
- Hover: color: primary

### 6. TABLE

**Table Headers**
- Font Size: 12px
- Weight: 700
- Border Bottom: 1px solid var(--glass-border)
- Padding: 15px
- Text Align: left

**Table Rows**
- Padding: 15px
- Border Bottom: 1px solid rgba(255, 255, 255, 0.05)
- Hover: background rgba(255, 255, 255, 0.03)
- Transition: 0.2s

---

## 🎬 ANIMATIONS & TRANSITIONS

### Page Transitions
```
Initial: opacity 0, y: 20
Animate: opacity 1, y: 0
Exit: opacity 0, y: -20
Duration: 0.4s
```

### Card Hover
```
Scale: 1 → 1.02
Transition: 0.3s ease
```

### Button Hover
```
translateY: 0 → -3px
Box Shadow: increase
Transition: 0.3s ease
```

### FAQ Accordion
```
Initial: height 0, opacity 0
Animate: height auto, opacity 1
Exit: height 0, opacity 0
Duration: 0.3s
```

### Skeleton Loading
```
Shimmer animation: 1.5s infinite
Background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))
```

### Floating Orbs (Background)
```
Animation: floatOrb 20s infinite ease-in-out
Transform: translateY(-20px to 20px)
```

---

## 📐 RESPONSIVE BREAKPOINTS

### Desktop (1280px)
- Full layouts as designed
- 3-column grids
- Full spacing

### Tablet (768px - 1279px)
- 2-column grids (where applicable)
- Adjusted padding: 24px instead of 40px
- Smaller font sizes: H1 2.5rem, H2 2rem

### Mobile (< 768px)
- 1-column layouts
- Hamburger menu
- Padding: 16px
- Font sizes: H1 1.8rem, H2 1.5rem
- Full-width inputs and buttons
- Vertical stacking of flex items
- Modal max-width: 90%

---

## 🔗 HEADER COMPONENT

### Desktop Layout
- Logo (left, 100px width)
- Nav menu (center-right):
  - About
  - Services
  - Login / (Dashboard, Settings, Exit)
  - Contact button
- Sticky position, backdrop blur

### Mobile Layout
- Logo (left)
- Hamburger menu (right)
- On click: Slide-in nav from right (70% width)
- Nav items: vertical, 30px gap
- Background: dark with border

---

## 📋 FOOTER COMPONENT

- Background: Dark
- Padding: 40px 0
- Center: "© 2025 Impactum Agency. All rights reserved."
- Font Size: 14px
- Color: Muted

---

## 💡 IMPLEMENTATION NOTES

1. **Color System**: Use Figma variables for all colors (easier updates)
2. **Typography**: Create text styles for all sizes
3. **Components**: Group related elements, use component sets for variants
4. **Spacing**: Use layout grids (8px/16px base)
5. **Icons**: If needed, use simple geometric shapes or Feather icons
6. **Responsive**: Create separate frames for desktop/tablet/mobile
7. **Auto Layout**: Use for flexible components (buttons, cards)
8. **Shadows**: Create shadow styles in Figma
9. **Plugins**: Consider using "Stark" for accessibility checks
10. **Documentation**: Add detailed descriptions in each component

---

## ✅ IMPLEMENTATION CHECKLIST

### Design System
- [ ] Color palette
- [ ] Typography styles
- [ ] Spacing scale
- [ ] Border radius components
- [ ] Shadow styles
- [ ] Animation specifications

### Components
- [ ] Button (all variants)
- [ ] Input (all states)
- [ ] Card (all variants)
- [ ] Badge (all types)
- [ ] Modal
- [ ] Table
- [ ] Header
- [ ] Footer
- [ ] Stats Bar
- [ ] FAQItem

### Pages
- [ ] Home (all sections)
- [ ] Services
- [ ] About
- [ ] Login
- [ ] Register
- [ ] Dashboard
- [ ] Settings
- [ ] 404 Not Found

### Responsive
- [ ] Desktop versions (all pages)
- [ ] Tablet versions (all pages)
- [ ] Mobile versions (all pages)

### Polish
- [ ] Add annotations
- [ ] Component documentation
- [ ] Link Code Connect to React components
- [ ] Export specs for developers
- [ ] Create design tokens library

---

**Created**: 2026-03-20
**Project**: Impactum Agency
**Designer Notes**: Full specifications for complete Figma build-out based on React implementation
