<div id="top">

<div align="center">

# ONLINE-SHOP

<em>Empowering Your Shopping Experience, Effortlessly Simplified</em>

<!-- BADGES -->
<img src="https://img.shields.io/github/last-commit/Przemak19/Online-Shop?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/Przemak19/Online-Shop?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/Przemak19/Online-Shop?style=flat&color=0080ff" alt="repo-language-count">

</div>
<br>

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
    - [Tech Stack](#tech-stack)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Application View](#application-view)

---

## Overview

Online-Shop is a powerful e-commerce platform designed to streamline the shopping experience for users and simplify management for developers.

**Why Online-Shop?**

This project aims to provide a comprehensive solution for online retail, combining essential features with modern technology. The core features include:

- 🛒 **Comprehensive E-commerce Platform:** Seamlessly browse, filter, and purchase products.
- 🔐 **User Registration and Authentication:** Securely manage user accounts and sessions.
- 🛠️ **Admin Panel for Product Management:** Easily add, edit, and delete products and categories.
- 📱 **Responsive Design:** Ensure a smooth experience across all devices.
- 🔗 **Robust API Integration:** Facilitate clear communication between frontend and backend services.

---

## Getting Started

### Tech stack

This project requires the following dependencies:

- **Java:** 21+
- **Node.js:** v20.x 
- **Package Manager:** Npm, Maven
- **AWS:** S3 Bucket
- **Database:** e.g. PostgreSQL

### Installation

Build Online-Shop from the source and intsall dependencies:

1. **Clone the repository:**

```sh
❯ git clone https://github.com/Przemak19/Online-Shop
```

2. **Navigate to the project directory:**

```sh
❯ cd Online-Shop
```

3. **Install the dependencies:**

**Using [npm](https://www.npmjs.com/):**

```sh
❯ npm install
```
**Using [maven](https://maven.apache.org/):**

```sh
❯ mvn install
```

<details>
<summary>Configuration of properties</b>.</summary>
<b>Configuration</b>, to run it is enough to configure application.properties (database access: url, username, password) and add secretJwtString (must contain at least 32 characters), aws.s3.accessKey (AWS S3 access key), aws.s3.secretKey (AWS S3 secret key). Finally, in the AwsS3Service.java file, you must provide your own name "bucketName".
</details>

### Usage

Run the project with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm start
```
**Using [maven](https://maven.apache.org/):**

```sh
mvn exec:java
```

## Application View

<h4><strong>Login and registration panel</strong></h4>
<img src="https://github.com/user-attachments/assets/f405b9f7-a024-448f-822d-48cbedb240a4" width="500px" height="250px"></img>
<img src="https://github.com/user-attachments/assets/cd306006-2bd3-49e0-9a47-9efa87264e8e" width="500px" height="250px"></img>

<h4><strong>Main panel</strong></h4>
<img src="https://github.com/user-attachments/assets/13a66019-6063-4d73-b3e6-bb319ed490ff" width="500px" height="250px"></img>
<img src="https://github.com/user-attachments/assets/da526cc8-00e1-47b5-9b33-428117a4d228" width="500px" height="250px"></img>

<h4><strong>Product details</strong></h4>
<img src="https://github.com/user-attachments/assets/72488989-f286-4be6-b8d1-26919fc0aeb2" width="500px" height="250px"></img>

<h4><strong>Currently available categories</strong></h4>
<img src="https://github.com/user-attachments/assets/e765b1d6-737b-4397-907e-589b4a2b451e" width="500px" height="250px"></img>

<h4><strong>Shopping basket</strong></h4>
<img src="https://github.com/user-attachments/assets/e8035739-8b35-4a8d-be24-1edeca8d23e9" width="500px" height="250px"></img>

<h4><strong>User Profile and Order History</strong></h4>
<img src="https://github.com/user-attachments/assets/bdccc6e0-289f-4b04-a862-a3d5d7df7e1a" width="500px" height="250px"></img>

<h4><strong>User Address Edit Panel</strong></h4>
<img src="https://github.com/user-attachments/assets/b4acf82d-6d6d-4ebb-a9ec-bb2af1c693c4" width="500px" height="250px"></img>

<h4><strong>Admin panel for management</strong></h4>
<img src="https://github.com/user-attachments/assets/67f38dbe-b344-4ac9-988f-226a54520242" width="500px" height="250px"></img>

<h4><strong>Admin panel for category management</strong></h4>
<img src="https://github.com/user-attachments/assets/aae9308e-4a51-49d2-b119-9b561fe8cac4" width="500px" height="250px"></img>

<h4><strong>Adding and editing categories</strong></h4>
<img src="https://github.com/user-attachments/assets/ebad5e84-9690-47a7-87fd-f8673e05ea61" width="500px" height="200px"></img>
<img src="https://github.com/user-attachments/assets/4a57eb60-f506-4a96-a55f-52f38e5a6472" width="500px" height="200px"></img>

<h4><strong>Admin panel for product management</strong></h4>
<img src="https://github.com/user-attachments/assets/ab571f1c-db12-4fda-937a-dc2807fa37aa" width="500px" height="250px"></img>

<h4><strong>Adding and editing products</strong></h4>
<img src="https://github.com/user-attachments/assets/207ecf87-0ab1-4c8c-a516-0f340314bc77" width="500px" height="250px"></img>
<img src="https://github.com/user-attachments/assets/4054a850-1c4b-47d8-a682-3731eed86b4e" width="500px" height="250px"></img>

<h4><strong>Admin panel for filtering and managing orders</strong></h4>
<img src="https://github.com/user-attachments/assets/db08df6f-0865-43e5-8717-c313b851a8d8" width="500px" height="250px"></img>
<img src="https://github.com/user-attachments/assets/0136d775-a0ff-420e-be53-fb5c4983238a" width="500px" height="150px"></img>

<h4><strong>Order Panel to Edit Status</strong></h4>
<img src="https://github.com/user-attachments/assets/f092153a-181f-40d2-8e1f-34c9408802c7" width="500px" height="250px"></img>

---

<div align="left"><a href="#top">⬆ Return</a></div>

---
