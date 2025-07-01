# Virinchi Architects

A modern web application for Virinchi Architects, featuring a professional website with contact management system.

## Description

Virinchi Architects is a full-stack web application built with Node.js, Express, and MongoDB. The application provides a professional online presence for the architecture firm, including company information, services showcase, and a contact management system for client inquiries.

## Features

- **Professional Website**: Clean, responsive design showcasing architectural services
- **Contact Management**: Automated enquiry handling with unique reference IDs
- **Database Integration**: MongoDB Atlas for reliable data storage
- **Form Validation**: Both client-side and server-side validation
- **Auto-incrementing IDs**: Unique enquiry reference numbers
- **Mobile Responsive**: Optimized for all device sizes
- **SEO Ready**: Proper meta tags and semantic HTML structure

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Development**: Nodemon for hot reloading
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tusharsingh3/Virinchi.git
   cd Virinchi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file and add your MongoDB connection string:
   ```
   MONGO_URI=your_mongodb_connection_string_here
   PORT=3000
   ```

4. **Start the application**
   ```bash
   # Development mode (with nodemon)
   npm start
   
   # Production mode
   node server.js
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Usage

### For Visitors
- Browse the homepage to learn about Virinchi Architects
- View the About Us page for company information
- Use the Contact page to submit inquiries
- Receive unique reference IDs for tracking inquiries

### For Developers
- All enquiries are stored in MongoDB with auto-generated IDs
- API endpoint available at `/api/enquiry` for form submissions
- Rate limiting implemented to prevent spam
- Comprehensive error handling and logging

## API Endpoints

### POST /api/enquiry
Submit a new enquiry

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "I'm interested in your architectural services."
}
```

**Response:**
```json
{
  "success": true,
  "enquiryId": 1001
}
```

## Project Structure

```
Virinchi/
├── config/
│   └── db.js              # Database configuration
├── models/
│   ├── Counter.js         # Auto-increment counter schema
│   └── Enquiry.js         # Enquiry model and validation
├── routes/
│   ├── api/
│   │   └── enquiry.js     # API routes for enquiries
│   └── pages.js           # Static page routes
├── pages/                 # HTML templates
│   ├── home.html
│   ├── about.html
│   ├── contact.html
│   └── 404.html
├── public/                # Static assets
│   ├── style.css
│   └── images/
├── tests/                 # Test files
├── server.js              # Main application file
├── package.json
└── README.md
```

## Development

### Code Quality
The project uses ESLint and Prettier for code consistency:

```bash
# Lint code
npx eslint .

# Format code with Prettier
npx prettier --write .
```

### Testing
Run the test suite:

```bash
npm test
```

### Adding New Features
1. Create feature branch from main
2. Implement changes following existing patterns
3. Add tests for new functionality
4. Update documentation as needed
5. Submit pull request

## Contributing

We welcome contributions to improve Virinchi Architects! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Guidelines
- Follow the existing code style and conventions
- Add tests for new features
- Update documentation when necessary
- Keep commits atomic and well-described
- Ensure all tests pass before submitting

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help maintain a positive community environment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Author**: Tushar Singh
- **Repository**: [https://github.com/tusharsingh3/Virinchi](https://github.com/tusharsingh3/Virinchi)
- **Issues**: [https://github.com/tusharsingh3/Virinchi/issues](https://github.com/tusharsingh3/Virinchi/issues)

## Acknowledgments

- Thanks to all contributors who help improve this project
- Built with modern web technologies and best practices
- Designed for scalability and maintainability