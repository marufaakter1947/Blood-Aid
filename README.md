BloodAid – Blood Donation Application

#Project Purpose
BloodAid is a full-stack blood donation management system designed to connect blood donors, volunteers, and admin on a single platform.
The application makes blood donation requests easy, transparent, and organized while ensuring proper role-based access and data security.
This platform helps people quickly find donors by blood group and location, manage donation requests, and support emergency blood needs efficiently.

#Live URL:
https://bloodaid-by-marufa.netlify.app/


#Key Features:
Authentication & Roles
Email & password authentication using Firebase
Role-based system:Admin, Volunteer, Donor

Donor Features
Create blood donation requests
View, edit, and delete own donation requests
Search donors by:Blood group, District, Upazila
Update personal profile information
Cannot create requests if blocked by admin

Volunteer Features
View all blood donation requests
Filter donation requests (same as admin view)
Can only update donation status
Restricted from deleting or editing donation details

Admin Features
Full control over the system
Manage all users:Change user role (Donor / Volunteer / Admin)
Block or unblock users
View, edit, and delete all donation requests
Update donation status
View platform statistics

Profile Management
View personal profile information:Name, Email (non-editable), Avatar, Blood group ,District , Upazila
Edit profile using an editable form
Save updates and return to view-only mode

Funding System
Secure donation funding using Stripe
Track funding history
Display total funds collected

NPM Packages Used:

react – Core library for building the user interface

react-dom – Rendering React components to the DOM

react-router – Client-side routing and protected routes

axios – HTTP client for API requests

@tanstack/react-query – Server state management and data fetching

@tanstack/react-query-devtools – Debugging React Query state

firebase – Authentication (login, register, token management)

jwt-decode – Decode JWT tokens on the client side

react-hot-toast – Toast notifications for success and error messages

sweetalert2 – Beautiful alert and confirmation modals

react-icons – Icon library for UI components

lucide-react – Modern and customizable SVG icons

framer-motion – Animations and smooth UI transitions

react-spinners – Loading spinners for better UX


Styling & UI

tailwindcss – Utility-first CSS framework

@tailwindcss/vite – Tailwind CSS integration with Vite

daisyui – Tailwind CSS component library


Development Tools (Frontend)

vite – Fast development server and build tool

@vitejs/plugin-react – React support for Vite

eslint – JavaScript and React linting

eslint-plugin-react-hooks – Linting rules for React hooks

eslint-plugin-react-refresh – Fast refresh support

globals – Global variable definitions for ESLint

@types/react – Type definitions for React

@types/react-dom – Type definitions for React DOM


Backend (Node.js + Express)

express – Backend server framework

cors – Enable Cross-Origin Resource Sharing

dotenv – Environment variable management

mongodb – MongoDB database client

firebase-admin – Server-side Firebase authentication & token verification

jsonwebtoken – JWT creation and verification

bcrypt – Password hashing and security

stripe – Payment processing for funding/donations