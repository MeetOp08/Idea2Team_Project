# Idea2Team Project Documentation

This document provides a comprehensive overview of the Idea2Team platform. The project is a web-based portal connecting Founders (who post projects/ideas) with Freelancers (who apply for them), along with a dedicated Admin portal for platform management.

## 1. System Overview
Idea2Team consists of three main parts:
- **Client Application:** Allows Users (Founders and Freelancers) to register, log in, post projects, browse projects, and manage applications.
- **Admin Application:** A dedicated portal for Administrators to manage users, monitor projects, and view reports.
- **Backend API (Server):** An Express.js server providing RESTful APIs that connect the frontends to a MySQL database.

> **Note:** The **Overview** pages (Dashboard functionality) and **Reports** module remain to be fully built and are designated as upcoming features to be developed.

## 2. Tech Stack
- **Frontend (Client & Admin):** React.js, React Router DOM, Vanilla CSS, Lucide React (for icons)
- **Backend:** Node.js, Express.js (Multer for file uploads)
- **Database:** MySQL
- **Authentication:** Custom implementation against DB records

## 3. Directory Structure
```
idea2team/
│
├── admin/                 # Admin React Application
│   ├── src/
│   │   ├── components/    # Reusable UI components for Admin
│   │   ├── pages/         # Admin pages (Login, Dashboard, ManageUsers, etc.)
│   │   └── styles/        # CSS files for styling admin panel
│   └── package.json
│
├── client/                # User (Founder/Freelancer) React Application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # User pages organized by role (public, founder, freelancer)
│   │   └── styles/        # Variables, workspace, and core CSS
│   └── package.json
│
└── server/                # Node.js Express API
    ├── public/            # Directory to store uploaded files via Multer
    ├── server.js          # Core backend server file containing all API routes
    └── package.json
```

## 4. Database Schema
The MySQL database `idea2team` tracks core operational data. Known tables and columns:

- **admin**
  - `admin_id`, `email`, `password`
- **users**
  - `user_id`, `full_name`, `email`, `password`, `phone`, `role` (founder/freelancer), `status` (active/blocked)
- **projects**
  - `project_id`, `founder_id`, `title`, `description`, `category`, `required_skills`, `project_stage`, `collaboration_type`, `experience_level`, `budget_min`, `budget_max`, `duration_weeks`, `team_members_required`, `upload_file`, `status`
- **applications**
  - `application_id`, `project_id`, `freelancer_id`, `proposal_message`, `expected_salary`, `status` (pending/accepted/rejected)

## 5. API Endpoints (`server.js`)

### Authentication & Users
- `POST /api/register` - Registers a new user (founder/freelancer)
- `POST /api/login` - Authenticates user and returns details
- `POST /api/forgot-password` - Simulates sending a password reset link
- `POST /api/admin-login` - Authenticates the platform administrator
- `GET /api/userinfo/:id` - Fetches specific user's details
- `GET /api/admininfo/:id` - Fetches specific admin's details
- `GET /api/Manage-Users` - Fetches all users (for Admin panel)
- `PUT /api/block-user/:id` - Toggles user account block/active status

### Projects
- `POST /api/post-project` - Creates a project with file upload
- `GET /api/projects` - Fetches all active projects along with the founder's name
- `GET /api/manage-project` - Fetches all projects regardless of status (for Admin)
- `GET /api/myProject/:id` - Fetches all projects specific to a founder
- `GET /api/info-projects/:id` - Fetches specific project data dynamically
- `GET /api/editproject/:id` - Fetches data of a project formatted to be edited
- `PUT /api/founder/edit-project/:id` - Updates specific project's data
- `PUT /api/status-project/:id` - Toggles project status (active/closed)
- `DELETE /api/project/:id` - Deletes a project by ID

### Applications
- `POST /api/apply-project` - Submits a freelancer's application to a project
- `GET /api/info-application/:id` - Fetches applications for a founder’s projects
- `GET /api/freelancer/myapplication/:id` - Fetches a list of applications sent out by a freelancer
- `PUT /api/application/accept/:id` - Updates an application to 'accepted'
- `PUT /api/application/reject/:id` - Updates an application to 'rejected'

## 6. Frontend App Routes Mapping

### Client Portal (`client/src/App.js`)
- **Public:** `/` (Home), `/login`, `/register`
- **Founder:** 
  - Overview: `/founder/dashboard` *(To Be Built)*
  - Projects: `/founder/projects`, `/founder/post-project`, `/founder/edit-project/:id`
  - Applications: `/founder/applications`
  - Misc: `/founder/workspace`, `/founder/profile`
- **Freelancer:**
  - Overview: `/freelancer/dashboard` *(To Be Built)*
  - Projects: `/freelancer/browse`, `/apply-project/:id`
  - Applications: `/freelancer/applications`
  - Misc: `/freelancer/workspace`, `/freelancer/profile`

### Admin Portal (`admin/src/App.js`)
- **Auth:** `/`, `/login`
- **Dashboards:** 
  - Analytics/Overview: `/dashboard` *(To Be Built)*
  - Reports: `/reports` *(To Be Built)*
- **Data Management:** `/users`, `/projects`

## 7. Completed Work
- **Core User App:**
  - Complete Authentication (Login, Register).
  - Founder module fully implemented (Post/Edit Projects, Manage Applications, Smart Matching).
  - Freelancer module fully implemented (Browse Projects, Apply to Projects, Smart Suggestions, Invitations).
  - Profile Management (Founder & Freelancer) including fixing JSON data parsing rules.
- **Core Admin Application:**
  - Dedicated Admin Login and Routing.
  - Platform Control Center (`AdminOverview.js`) built with real-time stats (Total Users, Active Projects, Role Distribution).
  - Data Management (`ManageUsers.js`, `AdminManageProjects.js`).
  - Reports module including Product/Project PDF Generator Export capabilities.
- **UI/UX & Architecture:**
  - Modern, vibrant, decoupled CSS architecture mapping individual components/styles.
  - Resolved major React warnings (keys, hrefs).
- **Backend API (`server.js`):**
  - Fully established REST API with logic handling project creations, applications (including anti-duplicate rules), and analytical fetching.

## 8. Remaining Development Tasks
As per the current project status:
- **Team Workspace Components:** `FounderWorkspace.js` and `FreelancerWorkspace.js` are currently UI skeletons. They require the integration of real-time messaging, file sharing, and task board modules.
- **Real-Time Features:** Implementation of Socket.io or WebSockets for real-time chat functionality and push notifications.
- **Email Services:** Moving 'Forgot Password' from backend simulation to a working service (e.g., NodeMailer/SendGrid).
- **Payment & Milestones:** TBD functionality to track deliverables and mediate financial transactions securely.
- **Production Polish:** Securing APIs, resolving strict CORS configurations, and staging for final deployment.
