# How to Run This Project?

Hey! In this guide, I'll show you how to run our project step by step. Don't worry, it's really simple!

---

## What You Need First

1. **Docker Desktop** - We need this to run our backend services
   - Download here: https://www.docker.com/products/docker-desktop

2. **Node.js** - We need this for the frontend
   - Download here: https://nodejs.org

---

## Let's Start!

### Step 1: Open Docker

Open Docker Desktop on your computer. Wait until you see "Running" in green at the bottom left. This might take 1-2 minutes.

### Step 2: Open Terminal

On Windows, open PowerShell or CMD.

### Step 3: Go to Project Folder

Type this in the terminal:
```
cd "C:\Users\Akatron\Desktop\software architecture\proje"
```

### Step 4: Start the Services

This command starts all backend services. It takes a while the first time (5-10 minutes), so be patient:
```
docker-compose up -d --build
```

After it's done, check with:
```
docker-compose ps
```
You should see all services showing "Up".

### Step 5: Add Products to Database

Run these commands so products show up on the website:
```
docker-compose exec -T product-service python seed_products.py
docker-compose exec -T product-service python update_images.py
```

### Step 6: Start the Frontend

First, go to the frontend folder:
```
cd e-commerce-frontend
```

Install the packages (takes a bit the first time):
```
npm install
```

Then run it:
```
npm run dev
```

### Step 7: Open in Browser

Open your browser and go to:
```
http://localhost:5173
```

Congrats! The project is running! 🎉

---

## To Stop the Project

1. Press **Ctrl+C** in the terminal where frontend is running
2. Then run:
```
docker-compose down
```

---

## If Something Doesn't Work

| Problem | What to Do |
|---------|-----------|
| Products not showing | Run seed_products.py again |
| Port error | Run `docker-compose down`, then `up` again |
| Docker not working | Restart Docker Desktop |
| npm error | Run `npm install` again |

---

If you have any questions, feel free to ask!

---

## VS Code Extensions (Recommended)

To make coding easier, install these extensions in VS Code:

### Must Have

| Extension | What It Does |
|-----------|-------------|
| **ES7+ React/Redux/React-Native snippets** | Quick shortcuts for React |
| **Prettier - Code formatter** | Auto-formats your code |
| **ESLint** | Shows code errors |
| **Docker** | Manage Docker files |
| **Python** | For Python code |
| **Spring Boot Extension Pack** | For Java Spring Boot |

### Nice to Have

| Extension | What It Does |
|-----------|-------------|
| **GitLens** | See Git history |
| **Thunder Client** | Test APIs (like Postman) |
| **MongoDB for VS Code** | View MongoDB visually |
| **Tailwind CSS IntelliSense** | Tailwind class suggestions |
| **Auto Rename Tag** | Auto-rename HTML tags |
| **Path Intellisense** | Auto-complete file paths |

### How to Install?

1. Open VS Code
2. Click on **Extensions** icon on the left (or press Ctrl+Shift+X)
3. Search for the extension name
4. Click **Install**

That's it!
