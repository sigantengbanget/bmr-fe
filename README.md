# 📅 Booking Meeting Room (BMR-FE)

A modern web application for booking meeting rooms online. Built with **Next.js 14**, **TypeScript**, **React Hook Form**, and **Tailwind CSS**. This app connects to a backend API for authentication, room management, and booking operations.

## ✨ Features

- 📄 User Login & Registration
- 🔒 Authentication using **NextAuth** (JWT-based via backend API)
- 🏢 Admin-only Meeting Room Management
- 📆 Booking rooms with selectable date and time
- 📃 View personal booking history
- ✅ Form validation with **React Hook Form** & **Zod**
- 💬 Fully responsive UI
- 🎨 Clean, modern interface using **Shadcn UI** & **Lucide Icons**

## 📦 Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
- [NextAuth.js](https://next-auth.js.org/)
- [Axios](https://axios-http.com/)
- [Shadcn UI](https://ui.shadcn.dev/)
- [Lucide React](https://lucide.dev/)

## 📑 Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/sigantengbanget/bmr-fe.git
cd bmr-fe
```

### Install Dependencies
```bash
pnpm install
# or
npm install
# or
yarn install 
```
### Setup Environment Variables

NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

### Start the Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

🔐 Authentication Flow
Authentication is handled by NextAuth Credentials Provider, authenticating against the backend API. A JWT token is retrieved and stored in the NextAuth session for secure API requests.

