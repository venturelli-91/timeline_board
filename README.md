# 🚀 Timeline Board - Advanced Task Management System

A modern, high-performance timeline board for managing tasks and projects with sophisticated architecture. Built with cutting-edge technologies and enterprise-grade patterns.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.8-orange)](https://github.com/pmndrs/zustand)

## ✨ Key Features

### 🎯 **Core Functionality**

- **Complete CRUD Operations** - Add, edit, update, and remove tasks with real-time feedback
- **Dual View System** - Switch between Grid and Timeline views seamlessly
- **Advanced Timeline Visualization** - Horizontal timeline with intelligent positioning
- **Drag & Drop Interface** - Intuitive task repositioning with visual feedback
- **Smart Collision Detection** - Automatic lane assignment prevents task overlapping

### 🎨 **User Experience**

- **Hover-based Tooltips** - Instant task information on mouse hover
- **Inline Editing System** - Click-to-edit with tooltip-based interface
- **Toast Notification System** - Contextual feedback for all user actions
- **Responsive Design** - Optimized for desktop and mobile devices
- **Smooth Animations** - Fluid transitions and micro-interactions

### 🏗️ **Architecture Highlights**

- **Modular Component Architecture** - Atomic Design principles with specialized components
- **Advanced State Management** - 7 specialized Zustand stores with zero prop drilling
- **Type-Safe Development** - 100% TypeScript coverage with organized type system
- **Performance Optimized** - Memoized calculations and efficient re-renders
- **Clean Code Patterns** - Single Responsibility and Separation of Concerns

## 🛠️ Technology Stack

### **Frontend Framework**

- **Next.js 15.5.3** - Latest App Router with React Server Components
- **React 19.1.0** - Latest React with Concurrent Features
- **TypeScript 5.0** - Full type safety and enhanced developer experience

### **Styling & UI**

- **Tailwind CSS 4.0** - Utility-first CSS framework with latest features
- **Custom Design System** - Consistent spacing, colors, and component patterns
- **Responsive Grid System** - Mobile-first responsive design approach

### **State Management**

- **Zustand 5.0.8** - Lightweight, performant state management
- **Specialized Store Architecture** - Domain-driven store separation
- **Reactive Updates** - Real-time UI updates with minimal re-renders

## 🏛️ Advanced Architecture

### **Component Architecture**

```
src/components/
├── dashboard/                  # High-level layout components
│   ├── BoardWrapper.tsx        # Global event handlers & layout
│   ├── TimelineBoard.tsx       # Grid view with tooltip integration
│   └── TimelineView.tsx        # Timeline view with positioning logic
├── ui/
│   ├── cards/                  # Specialized card components
│   │   ├── TimelineCard.tsx    # Smart wrapper component (49 lines)
│   │   ├── CompactTimelineCard.tsx  # Timeline view optimized
│   │   ├── ExpandedTimelineCard.tsx # Detailed view component
│   │   ├── CustomCard.tsx      # Grid view optimized
│   │   ├── EditTooltip.tsx     # Inline editing interface
│   │   └── ItemTooltip.tsx     # Information display tooltip
│   ├── timeLine/               # Timeline-specific components
│   │   ├── TimelineHeader.tsx
│   │   ├── TimelineControls.tsx
│   │   ├── TimelineGrid.tsx
│   │   ├── TimelineTasksContainer.tsx
│   │   ├── TimelineTooltip.tsx
│   │   └── DragPreview.tsx
│   └── buttons/                # Reusable button components
└── taskModal/                  # Modal system components
```

### **State Management Architecture**

```
src/store/
├── timelineStore.ts           # Core CRUD operations
├── timelineViewStore.ts       # Positioning algorithms & calculations
├── tooltipStore.ts            # Hover tooltip state
├── editTooltipStore.ts        # Inline editing state
├── dragStore.ts               # Drag & drop state with preview
├── taskInteractionStore.ts    # Task selection state
└── toastStore.ts              # Global notification system
```

### **Type System Organization**

```
src/types/
├── common/                    # Shared interfaces (TimelineItem, ToastState)
├── components/                # Component prop interfaces
│   ├── modal.ts              # Modal component types
│   ├── cards.ts              # Card component types
│   ├── timeline.ts           # Timeline component types
│   └── ui.ts                 # UI component types
├── stores/                    # Store interface definitions
│   ├── timeline.ts, toast.ts, tooltip.ts
│   ├── drag.ts, editTooltip.ts
│   └── taskInteraction.ts, timelineView.ts
└── index.ts                   # Centralized exports
```

## 🔥 Advanced Technical Features

### **Intelligent Positioning Algorithm**

- **Lane Assignment System** - Automatic conflict resolution with buffer zones
- **Uniform Task Sizing** - Consistent width with min/max constraints (150px - 7 days)
- **Overlap Prevention** - 0.5-day buffer system prevents visual collisions
- **Dynamic Height Calculation** - Container adapts to lane requirements

### **Smart Interaction System**

- **Dual Tooltip Architecture** - Separate hover and edit tooltip systems
- **Click-Outside Detection** - Intelligent event handling for modal closure
- **Keyboard Navigation** - ESC/Enter support for tooltip interactions
- **Drag & Drop with Preview** - Real-time visual feedback during dragging

### **Performance Optimizations**

- **Memoized Calculations** - `useMemo` for expensive timeline computations
- **Efficient Re-renders** - Zustand's selective subscription system
- **Optimized DOM Updates** - Minimal DOM manipulation with React
- **CSS Transitions** - Hardware-accelerated animations

### **Developer Experience**

- **100% TypeScript Coverage** - Full type safety across 126 files
- **Organized Type System** - 230 lines refactored into 12 focused files
- **Zero Prop Drilling** - Clean component interfaces with Zustand
- **ESLint Integration** - Consistent code quality and formatting

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+
- npm or yarn
- Modern web browser with ES2020+ support

### **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/venturelli-91/timeline_board.git
   cd timeline_board/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   npm start
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Code Quality Metrics

- **Components**: 20+ specialized, reusable components
- **Stores**: 7 domain-specific Zustand stores
- **Type Definitions**: 12 organized type files
- **Lines of Code**: ~2,500 lines of clean, documented TypeScript
- **Test Coverage**: Structured for easy testing implementation
- **Performance Score**: Optimized for 90+ Lighthouse scores

## 🎯 Architecture Patterns

### **Design Patterns Used**

- **Atomic Design** - Hierarchical component organization
- **Observer Pattern** - Zustand reactive state management
- **Command Pattern** - Action-based state mutations
- **Strategy Pattern** - Dual view system implementation
- **Factory Pattern** - Component creation and composition

### **Clean Code Principles**

- **Single Responsibility** - Each component has one clear purpose
- **Open/Closed Principle** - Components are extensible but stable
- **Dependency Inversion** - Components depend on abstractions (stores)
- **DRY Principle** - Reusable components and utilities
- **KISS Principle** - Simple, understandable implementations

## 🌟 Key Technical Achievements

- **Refactored 230-line type file** into organized, maintainable structure
- **Implemented sophisticated positioning algorithms** for timeline visualization
- **Created intelligent tooltip system** with dual-mode operation
- **Built performant drag & drop** with real-time visual feedback
- **Designed scalable state architecture** with specialized stores
- **Achieved zero prop drilling** while maintaining component clarity

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern React ecosystem best practices
- Inspired by enterprise-grade project management tools
- Optimized for developer experience and maintainability

---

**Made with ❤️ by [venturelli-91](https://github.com/venturelli-91)**
