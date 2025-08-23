# SuperBook 📚

SuperBook is an open-source Chrome extension that enhances your reading experience by providing instant word definitions and improved text interaction on any webpage.

## ✨ Features

- **Instant Definitions**: Select any word on a webpage to get instant dictionary definitions
- **Beautiful UI**: Modern, clean interface built with React and Tailwind CSS
- **Fast & Lightweight**: Optimized for performance with minimal resource usage
- **Privacy-Focused**: No data collection, works entirely offline after initial setup
- **Universal Compatibility**: Works on all websites

## 🚀 Installation

### From Chrome Web Store
*Coming soon - extension will be published to the Chrome Web Store*

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `public` folder from this project
5. The SuperBook extension should now appear in your extensions list

## 🛠️ Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/your-username/SuperBook.git

# Navigate to project directory
cd SuperBook

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure
```
SuperBook/
├── public/           # Extension files (manifest, icons, scripts)
├── src/             # React components and UI
│   ├── components/  # Reusable UI components
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utility functions
│   └── pages/       # Main application pages
├── manifest.json    # Chrome extension manifest
└── package.json     # Project dependencies
```

## 🔧 Technologies Used

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Build Tool**: Vite
- **Extension API**: Chrome Extension Manifest V3
- **Dictionary API**: Free Dictionary API

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/your-username/SuperBook/issues) page to report bugs or request new features.

## 📞 Support

If you need help or have questions:
- Check the [Issues](https://github.com/your-username/SuperBook/issues) page
- Create a new issue if your question isn't already addressed

---

Made with ❤️ by the SuperBook team
