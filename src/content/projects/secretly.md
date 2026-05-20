# Secretly

Secretly is a full-stack anonymous messaging platform where users can create a public profile link and receive anonymous messages from anyone. The app focuses on privacy-first communication with a clean dashboard experience, secure auth flow, and AI-assisted message prompts for visitors.

## Overview

The platform has two primary user roles:

- **Registered user**: creates an account, verifies email via OTP, logs in, manages message settings, and reads/deletes incoming messages from a dashboard.
- **Visitor**: opens a user�s public URL and sends anonymous messages without creating an account.

Each registered user gets a unique public route (`/u/[username]`) that acts as their anonymous inbox entry point.

## Core features

- User sign-up with username/email/password
- Email OTP verification before account activation
- Credential-based sign-in
- JWT session-based authentication (NextAuth)
- Public profile link for anonymous message submission
- Dashboard controls:
  - copy public profile link
  - enable/disable receiving new messages
  - refresh inbox and view latest messages
  - delete messages with confirmation
  - share message cards (preview + image download + WhatsApp share)
- AI prompt suggestions on public message page
- Toast-driven feedback for user actions and API responses

## Application flow

1. User signs up (`/sign-up`)
2. Verification code is sent via email
3. User verifies account at `/verify/[username]`
4. User signs in at `/sign-in`
5. Authenticated user lands on `/dashboard`
6. User shares public URL (`/u/[username]`)
7. Visitors submit anonymous messages from that public page
8. Messages appear in dashboard inbox (newest first)

## API surface (high-level)

- `POST /api/sign-up`
- `POST /api/verify-code`
- `GET /api/check-username-unique`
- `GET/POST /api/accept-messages`
- `GET /api/get-messages`
- `DELETE /api/delete-message/[messageid]`
- `POST /api/send-message`
- `POST /api/suggest-messages`
- `GET/POST /api/auth/[...nextauth]`

## Tech stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **UI**: Tailwind CSS v4, shadcn/ui, Radix UI, Lucide icons
- **Auth**: NextAuth (credentials + JWT sessions)
- **Database**: MongoDB + Mongoose
- **Forms/validation**: React Hook Form + Zod
- **Networking**: Axios
- **Toasts**: Sonner
- **Email**: Resend + React Email
- **AI integration**: AI SDK (`useCompletion`) + server route for Gemini suggestions

## Project structure (important folders)

- `src/app` - routes, layouts, API handlers
- `src/components` - UI components and shared app components
- `src/schemas` - Zod validation schemas
- `src/model` - Mongoose models
- `src/lib` - shared server/client utilities
- `src/context` - providers (e.g., auth provider)
- `emails` - React Email templates
- `proxy.ts` - route protection and redirect rules

## Project workflow

| Content  | Link |
|----------|------|
| Workflow | [click here](https://excalidraw.com/#json=S0xQjqgSeSoqrxehATHfy,Y21z4yWodMEGurl2KgJ60g) |

## Local setup

1. Install dependencies

```bash
npm install
```

2. Configure environment variables in `.env`

Required values (project-dependent keys/names may vary):

- MongoDB connection string
- NextAuth secret
- Resend API key
- AI provider key(s) used by suggestion API route

3. Run development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run lint checks

## Notes

- This project uses App Router conventions and proxy-based access control.
- The public message experience is intentionally minimal to reduce sender friction.
- UI is built on reusable primitives to keep the design system consistent as features grow.
