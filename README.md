# AI Agriculture Advisory System

![AI Agriculture Advisory System Banner](https://images.unsplash.com/photo-1625246333195-58197bd47d26?q=80&w=2071&auto=format&fit=crop)

The **AI Agriculture Advisory System** is a comprehensive platform designed to empower farmers with intelligent, data-driven insights. By leveraging modern web technologies and AI, it provides real-time advice on crop management, disease detection, market prices, and government schemes, helping farmers make informed decisions to maximize their yield and profitability.

## 🚀 Key Features

*   **🔐 Secure Authentication**: Robust user management powered by **Clerk**, ensuring secure access to personalized data.
*   **📊 Interactive Dashboard**: A centralized hub for viewing farm activities, weather updates, and quick actions.
*   **🌾 Smart Crop Advisory**: AI-driven recommendations for the best crops to grow based on soil, weather, and location data.
*   **🍂 Disease Detection**: Image-based disease identification with severity assessment and treatment recommendations.
*   **📈 Market Intelligence**: Real-time updates on market prices and trends to help farmers sell at the right time.
*   **✅ Task Management**: Organized to-do lists for farming activities (sowing, irrigation, fertilizers) with tracking.
*   **🤖 AI Chatbot**: A 24/7 intelligent assistant (powered by Gemini) to answer agricultural queries in natural language.
*   **🏛️ Government Schemes**: Easy access to information about relevant government schemes and eligibility criteria.

## 🛠️ Technology Stack

### Frontend
*   **Framework**: [React](https://react.dev/) (v19) with [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Authentication**: [Clerk](https://clerk.com/)
*   **Routing**: [React Router DOM](https://reactrouter.com/)

### Backend
*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [PostgreSQL](https://www.postgresql.org/)
*   **ORM**: [Prisma](https://www.prisma.io/)
*   **AI Integration**: Google Gemini API

## 🏁 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
*   **Node.js** (v18 or higher)
*   **npm** or **yarn**
*   **PostgreSQL** installed and running

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/SagarBhadra01/Ai-Agriculture-Advisory-System.git
    cd Ai-Agriculture-Advisory-System
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    npm install
    ```
    *   Create a `.env` file in the `backend` directory and configure your environment variables (Database URL, API Keys, etc.).
    *   Run database migrations:
        ```bash
        npx prisma migrate dev
        ```
    *   Start the backend server:
        ```bash
        npm run dev
        ```

3.  **Setup Frontend**
    ```bash
    cd ../frontend
    npm install
    ```
    *   Create a `.env` file in the `frontend` directory and add your Clerk Publishable Key and other necessary variables.
    *   Start the development server:
        ```bash
        npm run dev
        ```

4.  **Access the Application**
    Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

```
Ai-Agriculture-Advisory-System/
├── backend/                # Node.js/Express backend
│   ├── prisma/             # Database schema and migrations
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   └── index.ts        # Entry point
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── layouts/        # Page layouts
│   │   └── App.tsx         # Main component
│   └── package.json
└── README.md               # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
