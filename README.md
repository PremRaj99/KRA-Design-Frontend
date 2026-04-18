<div align="center">

# 🛋️ KRA Design — Home Essentials

_An elegant, scalable, and premium online marketplace frontend for modern home appliances and decor._

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?logo=tailwind-css&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

<br />

## 🎯 Project Overview

**KRA Design** is a modern e-commerce frontend focused on high-end home essentials. Built with a strict focus on performance, scalability, SEO, and clean UI/UX, this application provides a seamless "quiet luxury" shopping experience.

### ✨ Core Features

- **🛍️ Category Browsing:** Explore curated sections (Living, Office, Furniture, etc.).
- **🔍 Advanced Search & Filter:** Instantly find what you need.
- **📱 Mobile-First Design:** Fully responsive layouts for all viewports.
- **🌙 Native Dark Mode:** Powered flawlessly by OKLCH CSS variables.
- **⚡ Blazing Fast:** Built on Vite with highly optimized components.
- **📈 SEO Optimized:** Dynamic page-level metadata via Helmet integration.
- **🎨 Minimalist Animations:** Purposeful micro-interactions using Framer Motion.

---

## 🚀 Tech Stack

| Category       | Technology                  |
| :------------- | :-------------------------- |
| **Framework**  | React (TypeScript)          |
| **Build Tool** | Vite                        |
| **Styling**    | Tailwind CSS v4 + Shadcn UI |
| **Animations** | Framer Motion               |
| **SEO**        | `react-helmet-async`        |
| **Icons**      | Lucide React                |

---

## 📦 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/PremRaj99/kra-design-frontend.git
cd kra-design-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Tailwind CSS v4

Ensure your Tailwind is configured with the new `@theme inline` architecture. Verify your `tailwind.config.ts` and `index.css` are correctly linked.

### 4. Install Required UI Components

We use Shadcn UI for accessible, customizable components. Install the core requirements:

```bash
npx shadcn-ui@latest add button card input dialog dropdown-menu
# Add more as needed per project requirements
```

### 5. Start Development Server

```bash
npm run dev
```

The app will be running at `http://localhost:5173`

### 6. Build for Production

```bash
npm run build
```

<hr/>

## 📁 Project Structure

Clean, modular separation of concerns ensuring code maintainability (DRY principles).

```bash
src/
├── assets/            # Static media, images, and global icons
├── components/        # Reusable UI building blocks
│   ├── ui/            # Shadcn atomic components
│   └── common/        # Custom shared components (ProductCards, etc.)
├── hooks/             # Extracted business logic and custom React hooks
├── layouts/           # Structural wrappers (Navbar, Footer, Sidebars)
├── lib/               # Global utilities and helper functions
├── pages/             # Route-level page components
├── styles/            # Global stylesheets and CSS variables
└── main.tsx           # Application entry point
```

<hr/>

## 🎨 Design System & Theming

We enforce a strict, semantic design system using OKLCH CSS variables. Hardcoded hex values or default Tailwind colors (e.g., `bg-blue-500`) are prohibited to ensure 100% accurate Dark Mode switching and effortless global theming.

| Element     | CSS Variable                                   | Description                          |
| ----------- | ---------------------------------------------- | ------------------------------------ |
| Backgrounds | "bg-background, bg-card, bg-muted"             | Primary surfaces and elevated cards. |
| Text        | "text-foreground, text-muted-foreground"       | Standard and secondary typography.   |
| Actions     | "bg-primary, bg-secondary, bg-accent","Buttons | highlights, and interactive states." |
| Borders     | "border-border, ring-ring"                     | Dividers and focus rings.            |

<hr />

## 📈 SEO Strategy

Search Engine Optimization is treated as a first-class citizen. Every page dynamically updates its head metadata:

```bash
<Helmet>
  <title>Living Room Essentials | KRA Design</title>
  <meta name="description" content="Elevate your gathering spaces with our curated selection of modern sofas." />
</Helmet>
```

<hr/>

## 🧩 Future Improvements & Roadmap
- 🛒 Cart & Checkout system integration
- 🔐 Authentication (User/Admin portals)
- 📦 Order Management interface
- ⭐ Reviews & Ratings system for products
- 📊 Admin Dashboard for listing management
- ⚡ Performance Optimization (lazy loading, aggressive caching)

<hr/>

## ⚙️ Best Practices Enforced

- ✅ Strict TypeScript for type safety and fewer runtime errors.
- ✅ Modular Architecture keeping files small and focused.

- ✅ Mobile-First Responsive Design across all viewports.

- ✅ Minimal & Meaningful Animations to guide the user's eye without overwhelming them.

<hr/>

## 🤝 Contributing

Contributions are welcome! If you'd like to improve KRA Design:

1) Fork the repository
2) reate a new feature branch (git checkout -b feature/AmazingFeature)
3) Commit your changes (git commit -m 'Add some AmazingFeature')
4) Push to the branch (git push origin feature/AmazingFeature)
5) Open a Pull Request

<hr/>

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

<div align="center">
<b>Built with a focus on real-world scalability and production standards.</b>


<i>Consistency is key — avoid adding random components or breaking the design system.</i>
</div>

<br />

<div align="center">
Created by <b>Prem Raj</b>


<i>Frontend Developer | Full Stack Engineer</i>
</div>