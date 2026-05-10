# Traveloop - Personalized Travel Planning Made Easy

**Traveloop** is a modern, intelligent, responsive travel planning platform. Users can create personalized multi-city travel itineraries, manage trip budgets, discover activities, organize packing lists, and share trips publicly.

## Features
- **Authentication**: Secure JWT-based login, signup, and profile management.
- **Dashboard**: Overview of upcoming trips, recommended destinations, and budget tracking.
- **Create Trip**: Multi-city itinerary builder with start/end dates.
- **Itinerary Builder**: Drag-and-drop support, day-wise timeline planning, and activities management.
- **City & Activity Search**: Search and filter cities and activities.
- **Budgeting**: Breakdown of costs with visual charts (transport, hotel, activities, food).
- **Packing Checklist**: Interactive checklist categorized by essentials.
- **Shared Itinerary**: Public read-only trip URLs for easy sharing.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, React Router, Axios, Zustand/Redux Toolkit.
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL with Prisma ORM.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running

### Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/traveloop?schema=public"
JWT_SECRET="your_super_secret_key"
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### Installation

1. **Clone the repository** (if applicable)
2. **Install dependencies for Backend:**
   ```bash
   cd server
   npm install
   npx prisma generate
   npx prisma db push
   ```
3. **Install dependencies for Frontend:**
   ```bash
   cd client
   npm install
   ```

### Running the App
1. **Start Backend Server:**
   ```bash
   cd server
   npm run dev
   ```
2. **Start Frontend Client:**
   ```bash
   cd client
   npm run dev
   ```

## Database Schema Overview
The database uses a relational schema defined via Prisma, ensuring data integrity. Core models:
- `User`: Stores user credentials and profile.
- `Trip`: Represents a travel plan.
- `TripStop`: Represents a destination/city within a trip.
- `Activity`: Global activities that can be added to trips.
- `TripActivity`: Specific instance of an activity on a trip day.
- `Budget`: Associated with a trip to track expenses.
- `PackingItem`: User checklist per trip.
- `Note`: User journal entries per trip/stop.
- `SharedTrip`: Public links for trips.

## UI/UX
Features modern glassmorphism UI, smooth Framer Motion transitions, responsive flexbox/grid layouts, and a curated purple/blue gradient color palette.
