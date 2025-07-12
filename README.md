# 🔄 Skill Swap Platform

A responsive web application where users can list their skills, request others in return, manage swap requests, and leave feedback. The platform also includes an admin interface for moderation, reporting, and platform-wide announcements.

---

## 🚀 Features

### 👤 User Features
- Create a profile with:
  - Name, optional location, optional profile photo
  - Skills Offered & Skills Wanted
  - Availability (e.g., weekends, evenings)
  - Profile privacy (Public/Private)
- Browse or search for other users by skill (e.g., “Photoshop”, “Excel”)
- Send, accept, reject, or cancel swap requests
- View current and pending swap requests
- Leave ratings and feedback after a completed swap

### 🛠 Admin Features
- Approve or reject inappropriate skill descriptions
- Ban or unban users who violate policies
- Monitor all swap activity (pending, accepted, cancelled)
- Send platform-wide broadcast messages (feature updates, alerts)
- Download reports:
  - User activity logs
  - Swap statistics
  - Feedback and rating logs

---

## 🧱 Tech Stack

| Layer       | Tech Used                     |
|-------------|-------------------------------|
| Frontend    | React, Tailwind CSS, Vite     |
| Backend     | Node.js + Express *or* Supabase |
| Database    | MongoDB (MERN) *or* PostgreSQL (Supabase) |
| Auth        | JWT (custom) or Supabase Auth |
| Storage     | Cloudinary or Supabase Storage |
| Admin Panel | Custom React or Supabase Dash |

