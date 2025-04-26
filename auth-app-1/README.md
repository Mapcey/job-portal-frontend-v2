# Auth App

This project is a simple authentication application that includes login and signup functionalities. Users can sign in using their Google account or through an email and password combination.

## Project Structure

```
auth-app
├── public
│   ├── index.html          # Main HTML file for the application
│   └── favicon.ico         # Favicon for the application
├── src
│   ├── components
│   │   ├── Auth
│   │   │   ├── GoogleSignInButton.tsx  # Component for Google sign-in button
│   │   │   ├── EmailPasswordSignInForm.tsx  # Component for email/password sign-in form
│   │   │   └── EmailPasswordSignUpForm.tsx  # Component for email/password sign-up form
│   │   └── common
│   │       └── Header.tsx  # Header component for the application
│   ├── pages
│   │   ├── Login.tsx        # Login page component
│   │   └── Signup.tsx       # Signup page component
│   ├── App.tsx              # Main application component with routing
│   ├── index.tsx            # Entry point for the React application
│   └── styles
│       └── global.css       # Global styles for the application
├── package.json              # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Features

- **Google Sign-In**: Users can authenticate using their Google account.
- **Email/Password Authentication**: Users can sign in or sign up using their email and password.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd auth-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.