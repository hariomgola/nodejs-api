Node.js API with Express & MongoDB 🚀

🗂️ Repository: https://github.com/hariomgola/nodejs-api

---

## 👁️ Overview

This project is a RESTful API built using Node.js, Express.js, and MongoDB.

It demonstrates both session-based and token-based authentication and follows the MVC architecture for clean code organization.

---

## 🛠️ Features

- 🔄 CRUD operations with Express and MongoDB
- 🔐 Session-based authentication
- 🏷️ JWT (token-based) authentication
- 🏗️ MVC architecture
- 🗄️ MongoDB integration via Mongoose
- 🔧 Environment-based configuration
- 🧩 Modular route handling

---

## 🗂️ Project Structure

nodejs-api/  
├── application_note/ # Notes or documentation  
├── src/ # Main source code  
│ ├── controllers/ # Request handlers  
│ ├── models/ # Mongoose schemas  
│ ├── routes/ # API routes  
│ ├── middleware/ # Auth and other middleware  
│ └── config/ # DB and app configuration  
├── .gitignore  
├── LICENSE  
├── README.md  
├── package.json  
└── package-lock.json

---

## ⚙️ Installation & Setup

1. 📥 Clone the repository:  
   git clone https://github.com/hariomgola/nodejs-api.git  
   cd nodejs-api

2. 📦 Install dependencies:  
   npm install

3. 🔧 Configure environment:

   - Ensure MongoDB is running locally or provide a remote URI.
   - Create a `.env` file at project root and set your variables (e.g., `MONGO_URI`, `JWT_SECRET`).

4. ▶️ Run the project:
   - For production:  
     npm start
   - For development (auto-reload):  
     npm run dev

---

## 📦 Dependencies

- express
- mongoose
- jsonwebtoken
- express-session
- dotenv
- bcryptjs

---

## ✍️ Author

Created by Hariom Gola

Website: https://hariomgola.github.io/  
Resume: https://hariomgola.github.io/resume/

---

## 📈 Status

Project is currently In Progress. Contributions and feedback are welcome!

---

## 📜 License

This project is licensed under the MIT License.
