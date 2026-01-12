# News Feed

A modern React-based news aggregator application built with TypeScript, Redux, and SASS. Browse the latest news articles from around the world with support for multiple countries and themes.

## ✨ Features

- 📰 Real-time news feed from NewsAPI
- 🌍 Multi-country support (US, UK)
- 🎨 Light/Dark theme support
- 🌐 Internationalization (i18next)
- 📱 Responsive design
- ⚡ Built with TypeScript for type safety
- 🧪 Component testing with Jest & React Testing Library
- 📚 Component documentation with Storybook
- 💾 Redis caching for improved performance (30-minute TTL)

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript
- **State Management**: Redux with Redux Thunk
- **Routing**: React Router v6
- **Styling**: SASS with theme system
- **HTTP Client**: Axios
- **Testing**: Jest, React Testing Library
- **Build Tool**: Create React App
- **Documentation**: Storybook
- **Backend**: Express.js proxy server
- **Caching**: Redis with 30-minute TTL

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn
- NewsAPI key from [newsapi.org](https://newsapi.org/register)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd news-feed
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
   > Note: Use `--legacy-peer-deps` to resolve TypeScript version conflicts

3. **Environment setup**

   Create a `.env` file in the project root:
   ```env
   SASS_PATH=./node_modules;./src
   HTTPS=true
   PORT=8443
   REACT_APP_API_KEY=your_newsapi_key_here
   ```

4. **Start development server**
   ```bash
   npm start
   ```

   Open [https://localhost:8443](https://localhost:8443) in your browser.

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on port 8443 with HTTPS |
| `npm run build` | Create production build |
| `npm test` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |
| `npm run lint` | Run ESLint with caching |
| `npm run lint-fix` | Auto-fix linting issues |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build-storybook` | Build Storybook for deployment |

## 🎨 Theme Configuration

The application supports both light and dark themes. Currently, theme switching is manual:

1. Open `public/index.html`
2. Change the body class:
   - Light theme: `<body class="theme-light">`
   - Dark theme: `<body class="theme-dark">`

> 🔧 **TODO**: Implement dynamic theme switching in the UI

## 🌐 API Configuration

### NewsAPI Integration

The app fetches news from [NewsAPI.org](https://newsapi.org). Due to CORS restrictions in development:

- **Development**: Uses CORS proxy (`cors-anywhere.citadel.red`)
- **Production**: Direct API calls
- **Authentication**: API key automatically added to requests
- **Country Support**: Automatically filters news by selected country

### Supported Countries

- 🇺🇸 United States (`US`)
- 🇬🇧 United Kingdom (`GB`)

## 💾 Caching System

The application includes a Redis-based caching system to improve performance and reduce API calls:

- **Cache Duration**: 30 minutes TTL
- **Cache Strategy**: GET requests are cached based on endpoint and parameters
- **Performance**: Cache hits are 10-50x faster than API calls
- **Fallback**: Graceful degradation if Redis is unavailable

### Cache Management

```bash
# View cache statistics
curl http://localhost:3001/cache/stats

# Clear cache
curl -X DELETE http://localhost:3001/cache/clear

# Test caching functionality
npm run proxy:test-cache
```

For detailed caching documentation, see [CACHING.md](./CACHING.md).

## 🏗 Architecture

### State Management
- **Redux Store**: Centralized state management
- **Reducers**:
  - `newsPreviewReducer`: Article data and loading states
  - `newsCountrySourceReducer`: Country selection and localization

### Component Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Route-level components
├── services/           # API, actions, reducers
├── style/              # SASS themes and variables
└── i18n/              # Internationalization files
```

## 🧪 Testing

Run the full test suite:
```bash
npm test
```

Generate coverage report:
```bash
npm run test:coverage
```

Run specific test:
```bash
npm test -- --testNamePattern="ComponentName"
```

## 📚 Component Documentation

Start Storybook to view component documentation:
```bash
npm run storybook
```

Build Storybook for deployment:
```bash
npm run build-storybook
```

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your hosting service

3. **Environment variables**: Ensure `REACT_APP_API_KEY` is set in production

## 🛠 Development Notes

### Known Issues
- Development server may fail due to ajv dependency conflicts
- Use `npm install --legacy-peer-deps` when installing packages
- SASS deprecation warnings are expected (legacy API usage)

### TypeScript Configuration
- Non-strict mode for easier migration
- Supports both `.ts` and `.tsx` files
- Type definitions included for all major dependencies

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ using React and TypeScript