# Timeline Board

A modern, responsive timeline board for managing tasks and projects. Built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **Zustand** for state management.

## 🚀 Features

- **Complete CRUD operations**: Add, edit, and remove tasks easily
- **Timeline visualization**: Cards organized by start and end dates
- **Task creation modal**: Intuitive and validated form
- **Inline editing**: Edit task names directly on the card
- **Feedback toasts**: Success and error notifications
- **Tooltips**: See full task name on hover
- **Responsive design**: Works on desktop and mobile
- **Clean architecture**: Reusable components, centralized typing, and Zustand stores

## 🛠️ Stack

- **Next.js 15.5.3**
- **React 19.1.0**
- **TypeScript**
- **Tailwind CSS 4**
- **Zustand 5.0.8**

## 📦 Project Structure

```
app/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable components (cards, buttons, toast)
│   │   ├── dashboard/       # Main board components
│   │   └── taskModal/       # Task modal components
│   ├── store/               # Zustand stores (timeline, toast)
│   ├── types/               # Centralized TypeScript types
│   ├── data/                # Initial mock data
│   └── pages/               # (If applicable)
├── page.tsx                 # Main page
└── globals.css              # Global styles
```

## ▶️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/venturelli-91/timeline_board.git
   cd timeline_board/frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the project:**
   ```bash
   npm run dev
   ```
4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ✨ Demo

- Add, edit, and remove tasks in real-time
- Clear visualization of project progress
- Modern and responsive user experience

## 📄 License

MIT
