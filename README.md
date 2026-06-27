# NotePilot
# NotePilot AI ✨

An AI-powered study platform that transforms how students learn by generating structured notes, quizzes, flashcards, diagrams, and mind maps from any study material in seconds.

## 🌟 Live Demo

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://notepilotislivenow.vercel.app/)
[![GitHub](https://img.shields.io/badge/github-repo-blue)](https://github.com/tanishxdev/NotePilot)

**🔗 Live URL:** [https://notepilotislivenow.vercel.app/](https://notepilotislivenow.vercel.app/)

---

## 📋 Overview

NotePilot AI solves the problem of time-consuming manual note preparation by leveraging Google's Gemini AI to instantly generate comprehensive study materials. What used to take 20-30 minutes now happens in under 20 seconds.

### 🎯 Key Features

- **AI-Powered Content Generation**: Generate notes, quizzes, flashcards, diagrams, revision sheets, and mind maps
- **PDF Export**: Download generated content as PDFs for offline study
- **Secure Authentication**: Firebase Authentication with JWT session management
- **Credit-Based System**: Stripe-powered credit purchase workflow for monetization
- **History Tracking**: Save and access all previously generated content
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Visuals**: Mermaid.js diagrams and Recharts visualizations

---

## 🏗️ Project Structure

```
📁 NotePilot/
├── 📁 client/                     # React Frontend
│   ├── 📁 public/
│   │   └── logo.png
│   ├── 📁 src/
│   │   ├── 📁 assets/            # Static assets (images, logos)
│   │   ├── 📁 components/        # Reusable React components
│   │   │   ├── FinalResult.jsx   # Display generated content
│   │   │   ├── Footer.jsx        # Footer component
│   │   │   ├── MermaidSetup.jsx  # Mermaid diagram renderer
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── RechartSetUp.jsx  # Chart visualizations
│   │   │   ├── Sidebar.jsx       # Side navigation
│   │   │   └── TopicForm.jsx     # Input form for study topics
│   │   ├── 📁 pages/             # Page components
│   │   │   ├── Auth.jsx          # Authentication page
│   │   │   ├── History.jsx       # Generation history
│   │   │   ├── Home.jsx          # Dashboard/homepage
│   │   │   ├── Notes.jsx         # Notes generation page
│   │   │   ├── PaymentFailed.jsx # Failed payment page
│   │   │   ├── PaymentSuccess.jsx# Success payment page
│   │   │   └── Pricing.jsx       # Pricing plans
│   │   ├── 📁 redux/             # State management
│   │   │   ├── store.js          # Redux store configuration
│   │   │   └── userSlice.js      # User state slice
│   │   ├── 📁 services/          # API service layer
│   │   │   └── api.js            # API client configuration
│   │   ├── 📁 utils/             # Utility functions
│   │   │   └── firebase.js       # Firebase configuration
│   │   ├── App.css               # Global styles
│   │   ├── App.jsx               # Root component
│   │   ├── config.js             # App configuration
│   │   ├── index.css             # Tailwind entry
│   │   └── main.jsx              # Application entry point
│   ├── .env                      # Environment variables
│   ├── index.html                # HTML template
│   ├── package.json              # Dependencies
│   ├── vercel.json               # Vercel deployment config
│   └── vite.config.js            # Vite configuration
│
├── 📁 server/                     # Node.js Backend
│   ├── 📁 controllers/           # Route controllers
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── credits.controller.js # Credit management
│   │   ├── generate.controller.js# AI content generation
│   │   ├── notes.controller.js   # CRUD for notes
│   │   ├── pdf.controller.js     # PDF generation
│   │   └── user.controller.js    # User management
│   ├── 📁 middleware/            # Middleware functions
│   │   └── isAuth.js             # Authentication middleware
│   ├── 📁 models/                # Database schemas
│   │   ├── notes.model.js        # Notes schema
│   │   └── user.model.js         # User schema
│   ├── 📁 routes/                # API routes
│   │   ├── auth.route.js         # Authentication routes
│   │   ├── credits.route.js      # Credit routes
│   │   ├── genrate.route.js      # Generation routes
│   │   ├── pdf.route.js          # PDF routes
│   │   └── user.route.js         # User routes
│   ├── 📁 services/              # Business logic
│   │   └── gemini.services.js    # Gemini AI integration
│   ├── 📁 utils/                 # Utilities
│   │   ├── connectDB.js          # MongoDB connection
│   │   ├── promptBuilder.js      # AI prompt construction
│   │   └── token.js              # JWT token utilities
│   ├── .env                      # Environment variables
│   ├── index.js                  # Server entry point
│   ├── package.json              # Dependencies
│   └── README.md                 # Backend documentation
│
└── README.md                     # Main documentation
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB (or MongoDB Atlas)
- Firebase account (for authentication)
- Stripe account (for payments)
- Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/tanishxdev/NotePilot.git
cd NotePilot
```

### 2. Backend Setup

```bash
cd server
npm install
```

**Create `.env` file in `/server`:**

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/notepilot
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

**Start the backend server:**

```bash
npm run dev  # Development with auto-reload
# OR
npm start    # Production
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

**Create `.env` file in `/client`:**

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

**Start the frontend development server:**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite | Build tool |
| Tailwind CSS 4 | Styling |
| Redux Toolkit | State management |
| Firebase | Authentication |
| React Router DOM | Routing |
| Axios | HTTP client |
| Mermaid.js | Diagram rendering |
| Recharts | Data visualization |
| React Markdown | Markdown rendering |
| Framer Motion | Animations |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| Stripe | Payment processing |
| Gemini API | AI content generation |
| PDFKit | PDF generation |
| Cookie-parser | Cookie handling |
| CORS | Cross-origin requests |

---

## 📊 Database Models

### User Model
```javascript
{
  _id: ObjectId,
  uid: String,              // Firebase UID
  email: String,
  displayName: String,
  photoURL: String,
  credits: Number,          // Available credits
  createdAt: Date,
  updatedAt: Date
}
```

### Notes Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,         // Reference to User
  topic: String,            // User's topic/query
  contentType: String,      // notes, quiz, flashcards, etc.
  content: String,          // Generated content (Markdown)
  type: String,             // 'saved' or 'generated'
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/logout` | Logout user |
| GET | `/auth/me` | Get current user |
| POST | `/auth/verify-token` | Verify JWT token |

### Generation Routes (`/api/generate`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/generate/notes` | Generate study notes |
| POST | `/generate/quiz` | Generate quiz questions |
| POST | `/generate/flashcards` | Generate flashcards |
| POST | `/generate/mindmap` | Generate mind map |
| POST | `/generate/diagram` | Generate diagram |
| POST | `/generate/revision` | Generate revision sheet |

### Credit Routes (`/api/credits`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/credits/balance` | Get user credit balance |
| POST | `/credits/purchase` | Purchase credits via Stripe |
| POST | `/credits/webhook` | Stripe webhook handler |

### Notes Routes (`/api/notes`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notes` | Get user's notes |
| POST | `/notes` | Save generated note |
| GET | `/notes/:id` | Get specific note |
| DELETE | `/notes/:id` | Delete note |

### PDF Routes (`/api/pdf`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/pdf/generate` | Generate PDF from content |

### User Routes (`/api/user`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/profile` | Get user profile |
| PUT | `/user/profile` | Update user profile |
| GET | `/user/history` | Get generation history |

---

## 💳 Monetization System

### Credit Structure
- **1 Credit** = 1 AI generation request
- Pricing tiers:
  - Starter: 50 credits - $5
  - Pro: 150 credits - $12
  - Premium: 500 credits - $35

### Payment Flow
1. User selects pricing plan
2. Redirected to Stripe checkout
3. Payment confirmation (webhook)
4. Credits added to user account
5. User can generate content

---

## 🔐 Authentication Flow

1. **User Signup/Login** via Firebase Auth
2. **Firebase** returns ID token
3. Token sent to backend `/auth/register` or `/auth/login`
4. **Backend** validates token and creates/updates user
5. **JWT** generated and sent to client
6. **JWT** used for all authenticated requests
7. **Middleware** (`isAuth.js`) validates JWT on protected routes

---

## 🎨 Key Features in Detail

### AI Content Generation
- **Prompt Engineering**: Custom prompts for each content type
- **Gemini API Integration**: Leverages Gemini 1.5 Pro
- **Markdown Output**: Consistent formatting across all content
- **Diagrams**: Mermaid.js for visual diagrams
- **Charts**: Recharts for data visualization

### User Experience
- **Real-time Feedback**: Loading states and progress indicators
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Eye-friendly dark theme
- **Animations**: Smooth transitions with Framer Motion
- **Error Handling**: Graceful error states and recovery

### History Management
- **Auto-save**: All generated content automatically saved
- **Search & Filter**: Find previous generations
- **Export**: Download as PDF or share

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- **Frontend**: ESLint + Prettier
- **Backend**: ESLint (Standard config)

---

## 🚀 Deployment

### Backend (Render/Heroku)
```bash
cd server
npm install
npm start
```

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Environment Variables for Production
Make sure to set all environment variables in your deployment platform:

**Frontend (Vercel):**
- All `VITE_*` variables

**Backend (Render/Heroku):**
- All server environment variables

---

## 📈 Future Enhancements

- [ ] AI-powered question answering
- [ ] Collaborative study rooms
- [ ] Mobile app (React Native)
- [ ] Chrome extension for quick capture
- [ ] User-generated templates
- [ ] Integration with Google Drive/Notion
- [ ] Study analytics dashboard
- [ ] Voice-to-text input
- [ ] Multi-language support
- [ ] Community sharing feature

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini** for AI capabilities
- **Stripe** for payment processing
- **Firebase** for authentication
- **MongoDB** for database services
- **Vercel** for hosting
- All open-source libraries and their maintainers

---

## 📞 Support

For support, questions, or feedback:

- [GitHub Issues](https://github.com/tanishxdev/NotePilot/issues)
- [Email](mailto:tanish.kumar.works@gmail.com)
- [Portfolio](https://thisistanishcodelab.vercel.app/)

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

**Made with ❤️ by [Tanish Kumar](https://github.com/tanishxdev)**