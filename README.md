# Me-API Playground – Backend Assessment

A minimal full‑stack playground that stores and exposes my profile information through a REST API and a lightweight frontend UI.

---

## Live URLs

* **Backend API:** [https://infoproject.onrender.com](https://infoproject.onrender.com)
* **Frontend UI:** [https://willowy-moxie-78bca9.netlify.app](https://willowy-moxie-78bca9.netlify.app)
* **Repository:** [https://github.com/NimitAgrawal2003/Infoproject](https://github.com/NimitAgrawal2003/Infoproject)
* **Resume:** https://drive.google.com/drive/folders/1h5gL3MenweC5yIQih2Z9YgIA7FQOBF2V?usp=sharing

---

## Goal

Build and host a simple playground that:

* Stores candidate profile information in a database
* Exposes it via REST APIs
* Allows querying projects by skill and viewing top skills
* Provides a minimal frontend to interact with the API

---

## Architecture

```
Frontend (HTML + JS)  →  Netlify
            |
            v
Backend (Node.js + Express)  →  Render
            |
            v
Database (MongoDB Atlas)
```

---

## Tech Stack

* Node.js + Express
* MongoDB Atlas + Mongoose
* JWT Authentication (cookies)
* HTML + JavaScript frontend
* Render (backend hosting)
* Netlify (frontend hosting)

---

## Database Schema

### User

```js
{
  name: String,
  email: String,
  password: String,
  education: String,
  skills: [String],
  projects: [ObjectId],
  work: [{ company, role, duration }],
  links: { github, linkedin, portfolio },
  refreshToken: String
}
```

### Project

```js
{
  title: String,
  description: String,
  links: [String]
}
```

---

## 🔌 API Endpoints

### Health Check

```
GET /api/health
```

### Authentication

```
POST /api/users/register
POST /api/users/login
POST /api/users/logout
POST /api/users/refresh-token
```

### Profile

```
GET  /api/profile
PUT  /api/users/:id
DELETE /api/users/:id
```

### Projects

```
POST /api/projects/create
GET  /api/projects?skill=Node
```

### Skills

```
GET /api/skills/top
```

---

## 🧪 Sample API Requests

### Register User
powershell

Invoke-RestMethod `
  -Uri "https://infoproject.onrender.com/api/users/register" `
  -Method POST `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"name":"Test User","email":"test@test.com","password":"123456"}'


### Login
powershell

Invoke-RestMethod `
  -Uri "https://infoproject.onrender.com/api/users/login" `
  -Method POST `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"email":"test@test.com","password":"123456"}'


### Get Profile

```bash
curl https://infoproject.onrender.com/api/profile
```

### Search Projects

```bash
curl "https://infoproject.onrender.com/api/projects?skill=Node"
```

---

## Frontend Features

* Load profile
* Search projects by skill
* View top skills

Minimal UI built using HTML + JavaScript and deployed on Netlify.

---

## Local Setup

```bash
git clone https://github.com/NimitAgrawal2003/Infoproject
cd Infoproject
npm install
```

Create `.env` file:

```env
PORT=8000
MONGODB_URI=your_mongo_url
ACCESS_TOKEN_SECRET=secret
REFRESH_TOKEN_SECRET=secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d
```

Run:

```bash
npm run dev
```

---

## Production Setup

* Backend deployed to Render
* MongoDB Atlas configured with IP whitelist
* Frontend deployed to Netlify
* CORS configured to allow Netlify domain
* Cookies set with:

```js
secure: true
sameSite: "none"
```

---

## Known Limitations

* No pagination
* Basic authentication only
* No role‑based access
* Minimal UI styling
* No automated tests

---

## Acceptance Criteria Checklist

* [x] GET /health returns 200
* [x] Profile CRUD APIs
* [x] Search projects by skill
* [x] Top skills endpoint
* [x] MongoDB schema defined
* [x] Frontend hosted and working
* [x] Backend hosted and working
* [x] README with setup & architecture

---

## Author

**Nimit Agrawal**



