# PurpleMerit

A modern React-based dashboard application for user management and admin control panel with authentication features.

## 📋 Demo admin Login
 gmail [purple@gmail.com]
 pass[4550]
 live link - https://purple.hirenray.rest/

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Environment Setup](#environment-setup)
- [Deployment](#deployment)

## ✨ Features

- User authentication with JWT tokens
- Admin dashboard for user management
- User profile management
- Pending user approval system
- Responsive design with SASS styling
- Protected routes for authenticated users
- Modern UI with React Icons

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

To verify installation, run:
```bash
node --version
npm --version
```

## 🚀 Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd purpleMerit
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
Create a `.env` file in the root directory and add your configuration:
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_API_TIMEOUT=5000
```

## 🏃 Getting Started

### Development Mode

Start the development server:
```bash
npm start
```

The application will open automatically at [http://localhost:3000](http://localhost:3000)

The page reloads when you make changes. Any lint errors will appear in the console.

### Build for Production

Create an optimized production build:
```bash
npm run build
```

The build files will be in the `build/` folder, ready for deployment.

### Run Tests

Execute the test suite:
```bash
npm test
```

Launches the test runner in interactive watch mode.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds the app for production |
| `npm test` | Runs the test suite |
| `npm run eject` | Ejects from Create React App (one-way operation) |

## 📁 Project Structure

```
src/
├── component/          # Reusable components
│   ├── dashboard/      # Dashboard components (Header, Tabbar)
│   ├── home/           # Home page components
│   └── Layout/         # Layout wrappers
├── context/            # React Context (Auth provider)
├── dashboard/          # Dashboard pages
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Overview.jsx    # Overview page
│   └── pages/          # Sub-pages (Users, Profile, etc.)
├── home/               # Home page files
├── pages/              # Main page routes
│   ├── auth/           # Authentication pages (Login, Signin)
│   └── others/         # Other pages
├── protectedComponents/ # Protected route components
├── utils/              # Utility functions
├── App.js              # Main App component
├── index.js            # Entry point
└── index.css           # Global styles
```

## 🛠 Technologies Used

- **React** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **SASS/SCSS** - CSS preprocessor
- **JWT Decode** - JWT token handling
- **Bcrypt** - Password hashing
- **React Icons** - Icon library
- **JS Cookie** - Cookie management
- **Create React App** - Build tooling

## ⚙️ Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_API_TIMEOUT=5000
```

### Optional Variables

```env
REACT_APP_DEBUG=false
REACT_APP_VERSION=0.1.0
```

## 📤 Deployment

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Deploy:
```bash
netlify deploy --prod --dir=build
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Other Hosting Options

The `build/` folder can be deployed to any static hosting service:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Heroku

## 🔐 Authentication

The application uses JWT for authentication. Tokens are stored in cookies for secure session management.

### Protected Routes

Routes are protected using `DashboardProtectedroute.jsx` component. Only authenticated users can access protected pages.

## 📝 License

This project is private and proprietary.

## 💬 Support

For issues or questions, please open an issue in the repository.

---

**Happy coding! 🎉**

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
