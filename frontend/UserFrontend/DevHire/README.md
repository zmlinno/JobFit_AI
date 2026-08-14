# DevHire - Developer Job Board

<div align="center">
  <img src="https://devhiree.netlify.app/favicon.svg" alt="DevHire Logo" width="80" height="80">
  
  **Find Your Dream Developer Job with AI Precision**
  
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/lisan-5/devhire)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
</div>


## 🚀 Overview

DevHire is a modern, AI-powered job board specifically designed for developers. It revolutionizes the job search experience by providing intelligent matching, eliminating whiteboard interviews, ensuring salary transparency, and connecting developers with companies that truly value engineering excellence.

### ✨ Key Features

- **🚫 No Whiteboard Interviews** - Focus on real technical assessments that matter
- **💰 Salary Transparency** - See salary ranges upfront, no surprises
- **🌍 Remote-First** - Extensive remote job opportunities
- **🎯 Quality Over Quantity** - Curated opportunities from top companies
- **⚡ Real-Time Search** - Instant job discovery with advanced filtering
- **📱 Responsive Design** - Perfect experience on all devices
- **🌙 Dark/Light Mode** - Comfortable viewing in any environment

**🌐 [Visit DevHire](https://devhiree.netlify.app)**

Experience the platform live with:
- 60+ real job listings from multiple APIs
- Interactive AI-powered search
- Beautiful animations and micro-interactions
- Comprehensive filtering system
- Mobile-optimized interface

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion** - Smooth animations and micro-interactions
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing

### APIs & Data Sources
- **JSearch API (RapidAPI)** - Primary job source with global coverage
- **Reed API** - UK-focused jobs with excellent tech opportunities
- **RemoteOK API** - Free remote job listings
- **Enhanced Mock Data** - 60+ fallback jobs for reliable experience

### Build & Deployment
- **Vite** - Fast build tool and dev server
- **Netlify** - Automated deployment and hosting
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization


## 🏗️ Architecture

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication forms
│   ├── contact/         # Contact form and button
│   ├── home/            # Homepage sections
│   ├── jobs/            # Job-related components
│   └── layout/          # Layout components
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # API services and data fetching
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
└── data/                # Mock data and constants
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lisan-5/devhire.git
   cd devhire
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys (optional - app works with mock data):
   ```env
   # JSearch API (RapidAPI) - Primary source
   VITE_RAPIDAPI_KEY=your_rapidapi_key_here
   VITE_RAPIDAPI_HOST=jsearch.p.rapidapi.com
   
   # Reed API - UK jobs
   VITE_REED_API_KEY=your_reed_api_key_here
   
   # RemoteOK API (no auth required)
   VITE_REMOTEOK_API_URL=https://remoteok.io/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

### API Configuration (Optional)

The app works perfectly with mock data, but you can enhance it with real APIs:

#### JSearch API (Recommended)
1. Sign up at [RapidAPI](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
2. Subscribe to JSearch API
3. Add your API key to `.env`

#### Reed API (UK Jobs)
1. Register at [Reed Developer](https://www.reed.co.uk/developers)
2. Get your API key
3. Add to `.env`


#### RemoteOK API
- No configuration needed - works out of the box!

## 📱 Features in Detail

### 🤖 AI-Powered Matching
- Intelligent job recommendations based on skills
- Dynamic scoring algorithm
- Personalized job ranking
- Smart filtering based on preferences

### 🎨 Modern UI/UX
- Glass morphism design
- Smooth animations with Framer Motion
- Responsive design for all devices
- Dark/Light theme toggle
- Micro-interactions and hover effects


### 🔍 Advanced Search & Filtering
- Real-time search across multiple job sources
- Filter by location, remote work, tech stack
- Salary range filtering
- Job type and experience level filters
- Special filters (no whiteboard, diversity-friendly)


### 📊 Comprehensive Job Data
- Detailed job descriptions
- Company information and logos
- Tech stack requirements
- Salary transparency
- Benefits and perks
- Application tracking

### 🌐 Multi-Source Job Aggregation
- Combines jobs from multiple APIs
- Deduplication and quality scoring
- Fallback to comprehensive mock data
- Real-time job count and statistics

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#4361ee to #7209b7)
- **Secondary**: Purple to pink gradient
- **Accent**: Cyan highlights
- **Neutral**: Carefully crafted grays for optimal contrast

### Typography
- **Headings**: Space Grotesk (modern, geometric)
- **Body**: Inter (readable, professional)
- **Responsive**: Fluid typography scaling

### Components
- Glass morphism cards
- Gradient backgrounds
- Smooth animations
- Consistent spacing (8px grid)
- Accessible color contrasts

## 🚀 Deployment

### Netlify (Recommended)
The project is configured for automatic Netlify deployment:

1. **Connect your repository** to Netlify
2. **Build settings** are automatically detected
3. **Environment variables** can be set in Netlify dashboard
4. **Automatic deployments** on every push to main

### Manual Build
```bash
npm run build
npm run preview
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

7. 
### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Add proper error handling
- Write meaningful commit messages
- Test on multiple devices/browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Lisanegebriel Abay Kebedew**
- 📧 Email: [lisan5abay@gmail.com](mailto:lisan5abay@gmail.com)
- 💼 GitHub: [@lisan-5](https://github.com/lisan-5)
- 📱 Telegram: [@ligator](https://t.me/ligator)

## 🙏 Acknowledgments

- **Job APIs**: JSearch, Reed, RemoteOK for providing job data
- **Design Inspiration**: Modern job boards and developer tools
- **Community**: React, TypeScript, and Tailwind CSS communities
- **Icons**: Lucide React for beautiful, consistent icons
- **Images**: Pexels for high-quality stock photos


## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Job application tracking
- [ ] Company profiles and reviews
- [ ] Advanced AI recommendations
- [ ] Email job alerts
- [ ] Resume builder integration
- [ ] Interview scheduling
- [ ] Salary negotiation tools

---

<div align="center">
  <p>Made  by <a href="https://github.com/lisan-5">Lisanegebriel Abay Kebedew</a></p>
  <p>
    <a href="https://devhiree.netlify.app">🌐 Live Demo</a> •
    <a href="mailto:lisan5abay@gmail.com">📧 Contact</a> •
    <a href="https://t.me/ligator">💬 Telegram</a>
  </p>
</div>
