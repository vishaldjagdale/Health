# HealthNodes - Smart Health Diagnosis Assistant

HealthNodes is a comprehensive healthcare platform that helps users track symptoms, get preliminary diagnoses, and connect with healthcare specialists in their area.

## 🌟 Features

- **Symptom Analysis**: Advanced symptom tracking and analysis for accurate predictions
- **Specialist Matching**: Connect with the right medical specialists for your condition
- **Location-Based Services**: Find healthcare providers in your area
- **Feedback System**: Contribute to improving diagnosis accuracy
- **WhatIf Scenarios**: Explore health outcomes based on lifestyle choices
- **Medication Reminders**: Get timely reminders for taking medications

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide Icons

### Backend

- Node.js
- Express
- MongoDB
- JWT Authentication

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/vishaldjagdale/Health.git
cd HealthNodes
```

2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

3. Install Backend Dependencies

```bash
cd backend
npm install
```

4. Set up environment variables
   Create `.env` files in both frontend and backend directories:

Frontend `.env`:

```
VITE_API_URL=http://localhost:3000 or Replace with Your Backend Url ( In frontend urlApi file)
```

Backend `.env`:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
```

5. Start the Development Servers

Frontend:

```bash
cd frontend
npm run dev
```

Backend:

```bash
cd backend
npm run dev
```

## 📁 Project Structure

```
HealthNodes/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── main.jsx
│   └── package.json
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── server.js
│   └── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Initial work - [Your Name]

## 🙏 Acknowledgments

- shadcn/ui for the beautiful UI components
- All contributors who have helped with features and bug fixes
