# 📰 Portal Berita App (Ionic + Native PHP)

A modern hybrid mobile application for a news portal, developed using **Ionic 7 (Angular Standalone)** for the frontend and **Native PHP** for the backend.

This project was built to fulfill the **Hybrid Mobile Programming** course requirements at **Universitas Surabaya (UBAYA)**.

![Ionic](https://img.shields.io/badge/Ionic-v7-3880ff?style=flat&logo=ionic)
![Angular](https://img.shields.io/badge/Angular-Standalone-dd0031?style=flat&logo=angular)
![PHP](https://img.shields.io/badge/Backend-Native%20PHP-777bb4?style=flat&logo=php)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479a1?style=flat&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Key Features

### 🔐 Authentication
* **Secure Login & Register**: User authentication system connected to MySQL database.
* **Session Management**: Uses LocalStorage for persisting user sessions.

### 🎨 UI/UX & Theming
* **Dynamic Global Theming**: Users can switch between 5 accent colors (Blue, Purple, Orange, Red, Green).
* **Dark Mode Support**: Fully integrated dark mode that respects user preferences.
* **Smart UI Components**:
    * **Image Scroller**: Horizontal scrolling for news images with aspect-ratio protection (anti-stretch).
    * **Floating Action Button (FAB)**: Custom-styled buttons for quick actions.
    * **Rounded & Floating Elements**: Modern card and toast notifications design.

### 👤 Profile Management
* **Avatar Handling**: Smart profile picture updates with **Cache Busting** (timestamp logic) to ensure immediate visual updates without app reload.
* **Real-time Feedback**: "In-Button" loading spinners and interactive toast notifications.

### 📰 News Management
* **Browse News**: List of latest news with categories.
* **Search Feature**: Real-time search functionality.
* **News Detail**: Detailed view with image galleries and author info.

## 🛠️ Tech Stack

* **Frontend**: Ionic Framework, Angular (Standalone Components), SCSS (Global Variables).
* **Backend**: Native PHP (REST API style).
* **Database**: MySQL / MariaDB.
* **Tools**: Visual Studio Code, Postman, XAMPP.

## 🚀 Installation Guide

### Prerequisites
* Node.js & NPM installed.
* Ionic CLI installed (`npm install -g @ionic/cli`).
* Web Server (XAMPP/MAMP) for PHP & MySQL.

### 1. Backend Setup
1.  Start **Apache** and **MySQL** in XAMPP.
2.  Create a new database named `db_news` in phpMyAdmin.
3.  Import the provided SQL file located in `backend/database.sql`.
4.  Move the PHP API folder to your `htdocs` directory.

### 2. Frontend Setup
1.  Clone this repository:
    ```bash
    git clone [https://github.com/username/project-name.git](https://github.com/username/project-name.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd project-name
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  **Configure API Endpoint**:
    Open `src/environments/environment.ts` and update the `apiKey` to match your local IP or domain:
    ```typescript
    export const environment = {
      production: false,
      // Replace with your machine's IP address if testing on real device
      apiKey: 'http://localhost/your-api-folder/' 
    };
    ```
5.  Run the app in the browser:
    ```bash
    ionic serve
    ```

## 📱 Screenshots
*(Add your screenshots here later)*

## 📄 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author
**Alexander Fabiano Joynard Lapod**
* Informatics Student at Universitas Surabaya
* [GitHub Profile](https://github.com/joynard)
