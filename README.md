# Digital Kiosk

A modern digital kiosk system built with Next.js and Prisma, featuring content management, user roles, analytics, and interactive features.

## Features

- 🔐 User Authentication & Role-based Access Control
  - Admin, Manager, and Viewer roles
  - Secure user management
- 📱 Content Management
  - Support for multiple media types (Image, Video, PDF, Webpage)
  - Rich content creation and editing
  - Content categorization
- 📊 Analytics
  - View tracking
  - User interaction metrics
  - Performance insights
- 💬 Interactive Features
  - User reactions (Thumbs up/down, Love, Sad)
  - Content engagement tracking
- 🗂️ Category Management
  - Organized content structure
  - Custom icons for categories

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager



## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd digital-kiosk
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   npm install --legacy-peer-deps


5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following main models:

- **User**: Manages user accounts and roles
- **Content**: Stores all content items with metadata
- **Category**: Organizes content into categories
- **Analytics**: Tracks content performance metrics
- **Reaction**: Manages user interactions with content

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
