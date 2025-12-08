🎧 EchoHub — Anonymous Social Platform

EchoHub is a full-stack social platform where users interact anonymously through emoji-based identities. Users can create posts, upload images, comment, react, and receive notifications — all while staying anonymous.

📁 Project Structure
/EchoHub-app
│
├── Backend/        → Node.js + Express + MySQL API
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── db/
│   │   ├── utils/
│   │   ├── uploads/
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
│
└── Frontend/       → React + TypeScript + Vite client
    ├── src/
    ├── public/
    └── package.json

🚀 Tech Stack
Frontend

React

TypeScript

Vite

Chakra UI

Axios

Backend

Node.js + Express

TypeScript

MySQL (connection pool)

express-session (persistent login)

session-file-store

Multer (image uploads)

dotenv

🔐 Authentication (Sessions)

EchoHub uses express-session so users remain logged in via a session ID stored in a cookie.
The server maintains the actual session, which makes authentication secure and persistent across tabs and reloads.

📝 Features
✔️ Anonymous Accounts

System-generated usernames (emoji + number)

Avatar color + emoji identity

✔️ Posts

Text content

Optional image upload (Multer)

Public feed

✔️ Comments

Comment on any post

Triggers a notification

✔️ Reactions

Users can react (like/emoji toggle)

Sends a notification to the post owner

✔️ Notifications

New reactions

New comments

Seen/unseen states

🔌 API Endpoints
Auth
Method	Route	Description
POST	/auth/signup	Create user
POST	/auth/login	Login
POST	/auth/logout	Logout
Posts
Method	Route	Description
GET	/posts	List all posts
POST	/posts	Create post (with image)
GET	/posts/:id	Get post by ID
Comments
Method	Route	Description
GET	/comments/:postId	Get comments for a post
POST	/comments/:postId	Create a new comment
Reactions
Method	Route	Description
POST	/reactions/:postId	Toggle reaction to a post
Notifications
Method	Route	Description
GET	/notifications	Get notifications for current user
▶️ How to Run the Project
Backend
cd Backend
npm install
npm run dev


Backend will run at:
http://localhost:3000

Frontend
cd Frontend
npm install
npm run dev


Frontend will run at:
http://localhost:5173

🗄 Database Schema (Simplified)
users(id, username, password_hash, avatar_color, avatar_emoji)
posts(id, user_id, text, image, created_at)
comments(id, post_id, user_id, text, created_at)
reactions(id, post_id, user_id, type)
notifications(id, user_id, actor_id, type, post_id, created_at)

📜 License

MIT
