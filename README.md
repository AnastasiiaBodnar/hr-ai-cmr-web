# HR Management CRM

A modern, high-performance Human Resources CRM built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. Designed for efficiency, clarity, and seamless candidate management.

---

## Features

- **Dashboard**: Analytics with KPI cards and candidate funnel visualization.
- **Vacancy Management**: Streamlined workflow for creating, editing, and tracking job openings.
- **Candidate Tracking**: Manage the full candidate lifecycle from application to hire.
- **Secure Authentication**: Integrated login and session management.

---

## Tech Stack

- **Frontend**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Logic**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **API Handling**: Custom fetch wrapper with robust error handling.

---

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd hr-crm
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your backend API URL:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

---

## Project Structure

```text
├── app/              # Next.js App Router (Pages, Layouts)
│   ├── (auth)/       # Authentication routes
│   ├── dashboard/    # Analytics & KPI dashboard
│   ├── vacancy/      # Vacancy management pages
│   └── components/   # Shared UI components
├── lib/              # Core logic, API wrappers, and utilities
├── public/           # Static assets (images, icons)
└── styles/           # Global styles and Tailwind configurations
```

---

## Scripts

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Runs the built application in production mode.
- `npm run lint`: Checks for linting errors using ESLint.

---

## License

This project is private and intended for internal use.

---

*Built with by the HR CRM Team*
