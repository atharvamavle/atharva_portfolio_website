# Atharva Portfolio Website

A modern, responsive portfolio website built with React and styled with custom CSS. Features a dark/light theme toggle, AI-powered chat assistant, and smooth navigation across multiple pages showcasing projects, achievements, and professional experience.

## Features

### 🎨 **Theme Support**
- **Dark/Light Mode Toggle**: Animated sun/moon icon button in the navbar
- **Theme Persistence**: Selected theme is saved to localStorage and restored on page reload
- **Smooth Transitions**: All theme changes animate smoothly with CSS transitions

### 💬 **AI Chat Widget**
- **Floating Robot Button**: Glass-style circular button with animated robot emoji
- **Chat Panel**: Full-featured chat interface with message streaming animation
- **Smart Responses**: AI assistant provides context-aware answers about portfolio sections
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 📱 **Navigation**
- **Fixed Navbar**: Sticky navigation with responsive hamburger menu on mobile
- **Active Page Highlighting**: Current page link is highlighted in the navbar
- **Multi-page Layout**: React Router for seamless client-side navigation

### 📄 **Portfolio Pages**

1. **Home Page (Bento Grid Layout)**
   - Hero section with photo and bio
   - Featured competition blog post
   - YouTube channel showcase
   - Resume download button
   - Credentials and profile links
   - Collaboration section

2. **About Page**
   - Professional bio with photo
   - Experience timeline (Capstone + Robotics roles)
   - Education history
   - Technical skills with proficiency bars
   - Contact information and social links

3. **Projects Page**
   - Grid layout with project cards
   - Project thumbnails with emoji placeholders
   - Project descriptions and technology tags
   - Quick action links (GitHub, Live, etc.)

4. **Achievements Page**
   - Featured achievement section with gradient background
   - Achievements stats and highlights
   - Video gallery with play button overlays
   - Photo gallery with hover effects

5. **Contact Page**
   - Contact information display
   - Links to social profiles
   - Email and phone contact options

### 🎯 **Design Features**
- **Responsive Grid System**: Adapts from 3-column on desktop to 1-column on mobile
- **Card-Based Layout**: Consistent use of elevated cards with hover effects
- **Gradient Accents**: Pink/magenta theme with subtle glow effects
- **Marquee Animation**: Scrolling skill tags with pause-on-hover
- **Page Transitions**: Smooth fade-up animations when navigating between pages
- **Custom Scrollbar**: Styled scrollbar matching the theme

## Technologies Used

### **Frontend Framework**
- **React 18**: Component-based UI architecture
- **React Router DOM**: Client-side routing and navigation

### **Styling**
- **CSS3**: Custom stylesheets with CSS variables for theming
- **CSS Grid & Flexbox**: Responsive layout system
- **Backdrop Filter**: Glass-morphism effects for modern UI
- **CSS Animations**: Smooth transitions and keyframe animations

### **Build & Deployment**
- **Create React App**: Development environment and build tooling
- **Netlify**: Static site hosting and deployment

### **Development Tools**
- **Node.js & npm**: Package management and development server
- **Git & GitHub**: Version control and repository hosting

## Project Structure

```
src/
├── App.js                 # Main app component with theme state management
├── index.js              # React DOM entry point
├── index.css             # Global styles with theme variables
├── components/
│   ├── Navbar.js         # Navigation with theme toggle
│   └── ChatWidget.js     # AI chat interface component
├── pages/
│   ├── HomePage.js       # Bento grid portfolio showcase
│   ├── AboutPage.js      # Professional bio and skills
│   ├── ProjectsPage.js   # Projects showcase
│   ├── AchievementsPage.js # Achievements and gallery
│   └── ContactPage.js    # Contact information
├── assets/               # Images and static files
└── public/               # Static HTML template
```

## CSS Architecture

### **Color Variables (Dark Theme)**
```css
--bg: #0b0b0b          /* Dark background */
--card: #141414        /* Card background */
--border: rgba(255,255,255,0.07)
--text: #f0f0f0        /* Light text */
--muted: #777          /* Secondary text */
--pink: #e91e8c        /* Accent color */
```

### **Light Theme Overrides**
```css
--bg: #f7f7f8
--card: #ffffff
--border: rgba(15,15,15,0.08)
--text: #101112
--muted: #585f63
```

## Key Components

### **Navbar Component**
- Logo with portfolio name
- Navigation links with active state
- Hamburger menu for mobile
- Theme toggle button with sun/moon icons

### **ChatWidget Component**
- Floating glass-style button
- Full-featured chat panel
- Message streaming animation
- Context-aware AI responses

### **Theme System**
- Centralized state management in App.js
- CSS variables for dynamic theming
- LocalStorage persistence
- Body class toggling for selector-based overrides

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Deploy to Netlify
netlify deploy --prod
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- CSS variables for efficient theme switching
- Lazy-loaded images
- Optimized animations with GPU acceleration
- Minimal re-renders with React hooks
- Responsive design prevents unnecessary resource loading

## Future Enhancements

- Add backend for contact form submissions
- Implement real AI chat using LLM APIs
- Add project filters and search
- Blog section with markdown support
- Dark mode auto-detection based on system preferences
- Page transitions with route animations

## License

This project is open source and available for personal and commercial use.

## Contact

**Atharva Santosh Mavale**
- 📧 Email: atharvamavale26@gmail.com
- 💼 LinkedIn: [linkedin.com/in/atharva-mavale-70147a1b4](https://www.linkedin.com/in/atharva-mavale-70147a1b4)
- 🐙 GitHub: [github.com/atharvamavale](https://github.com/atharvamavale)
- 📱 Phone: 0403-912-780

---

**Built with ❤️ using React, CSS3, and modern web technologies**
