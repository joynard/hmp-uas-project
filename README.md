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

## 🚀 Installation & Demo

Good news! This project is connected to a **Live Cloud Backend**. You **DO NOT** need to set up XAMPP, MySQL, or configure any local server to run this application.

### Prerequisites
* Node.js & NPM installed.
* Ionic CLI installed globally:
  ```bash
  npm install -g @ionic/cli

### Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/joynard/hmp-uas-project.git

```


2. **Navigate to project folder:**
```bash
cd project-name

```


3. **Install dependencies:**
```bash
npm install

```


4. **Run the App:**
```bash
ionic serve

```

The app will automatically launch in your browser and connect to the live server.


## 📱 Screenshots
### All Pages Preview in Light Mode

<img src="https://github.com/user-attachments/assets/b1b44f0d-586e-4683-8af7-1fd5e59da07c" width="30%" height="auto" alt="Page 1" style="margin: 5px;">
<img src="https://github.com/user-attachments/assets/5d731600-56eb-45b0-974c-5cecaef0e74b" width="30%" height="auto" alt="Page 2" style="margin: 5px;">
<img src="https://github.com/user-attachments/assets/77e80886-5888-4fa5-b54a-e9bf17c13532" width="30%" height="auto" alt="Page 3" style="margin: 5px;">

<img src="https://github.com/user-attachments/assets/b09308b1-a2ba-4b4d-9c81-05eb3e9edc19" width="30%" height="auto" alt="Page 4" style="margin: 5px;">
<img src="https://github.com/user-attachments/assets/bea55ae9-b54d-487a-97cd-4fcb6de54875" width="30%" height="auto" alt="Page 5" style="margin: 5px;">
<img src="https://github.com/user-attachments/assets/3e95c936-e9b1-45ce-b471-32768264441b" width="30%" height="auto" alt="Page 6" style="margin: 5px;">

<img src="https://github.com/user-attachments/assets/d76b077c-2402-44db-a389-e461e5d95abf" width="30%" height="auto" alt="Page 7" style="margin: 5px;">
<img src="https://github.com/user-attachments/assets/2c64b0c4-baaa-440b-aaa9-fcb9d7dd66fa" width="30%" height="auto" alt="Page 8" style="margin: 5px;">
<img src="https://github.com/user-attachments/assets/05f1b61a-a088-4714-b928-f9ef69995498" width="30%" height="auto" alt="Page 9" style="margin: 5px;">

<img src="https://github.com/user-attachments/assets/682e23f4-cc00-4eaa-ba83-1da736f61418" width="30%" height="auto" alt="Page 10" style="margin: 5px;">
<img src="https://github.com/user-attachments/assets/78fb1aae-c2be-485c-84e7-bd1eb949c6dd" width="30%" height="auto" alt="Page 11 (Landscape)" style="margin: 5px;">

<img src="https://github.com/user-attachments/assets/43b571f4-9524-4a40-8b38-77800a432696" width="30%" height="auto" alt="Dark Mode Page" style="margin: 5px;">

## 📄 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors & Contributors

* **Alexander F. J. Lapod** - *Lead Fullstack Developer* - [GitHub](https://github.com/joynard)
    * *Responsible for system architecture, core features, frontend styling, and backend API.*
    
* **Kenny Varenne Tin Setyabudi** - *Quality Assurance (QA) & Co-Developer* - [GitHub](https://github.com/Noy-Varenne)
    * *Responsible for feature testing, debugging, and additional feature implementation.*

---
*Built as a final project for Hybrid Mobile Programming Course, Universitas Surabaya.*
