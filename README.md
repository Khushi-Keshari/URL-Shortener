# 🔗 URL Shortener

A simple URL shortener built with Node.js, HTML, and JavaScript. It allows users to create custom or auto-generated short links that redirect to full URLs.

---

## 🚀 Features

- Create custom or auto-generated short links
- Store shortened URLs persistently using JSON
- Redirect to original URL via short code
- Basic frontend UI with real-time updates

---

## 🛠️ Tech Stack

- Node.js (HTTP Server)
- HTML, CSS, JavaScript (Frontend)
- File-based storage (JSON)

---

## 📁 Project Structure
```
url-shortener/
├── index.html
├── index.css
├── data/
│ └── links.json # Stores short links
├── server.js # Node.js backend
└── README.md

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener

2. Install Node.js dependencies:
This project uses native modules only (no npm install required).
Just ensure you're using Node.js v18+ (for fs/promises and import support).

3. Create the data/ directory (if not present):
mkdir data
echo "{}" > data/links.json


▶️ Running the Project

Start the server:
node app.js

Visit in your browser:
http://localhost:5000

