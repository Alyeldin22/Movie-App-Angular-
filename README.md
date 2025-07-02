# 🎬 Movie App

A modern Angular application for browsing movies and TV shows with a beautiful UI and comprehensive features.

## ✨ Features

### 🎥 Movies
- **Now Playing Movies**: Browse the latest movies in theaters
- **Movie Details**: View comprehensive movie information including:
  - Movie poster and backdrop
  - Rating, release date, runtime
  - Overview and genres
  - Recommendations
  - User reviews
- **Search Movies**: Search for movies by title
- **Pagination**: Navigate through multiple pages of movies

### 📺 TV Shows
- **Popular TV Shows**: Discover trending TV series
- **TV Show Details**: View detailed information including:
  - Show poster and backdrop
  - Rating, first air date, number of seasons
  - Overview and genres
  - Show status (ongoing/ended)
  - Recommendations
  - User reviews
- **Pagination**: Navigate through multiple pages of TV shows

### ❤️ Wishlist
- **Add to Wishlist**: Add movies and TV shows to your personal wishlist
- **Toggle Functionality**: Add/remove items with heart icon
- **Wishlist Counter**: Real-time counter in the navbar
- **Separate Sections**: Clear distinction between movies and TV shows
- **Remove Items**: Remove items from wishlist page

### 🌍 Internationalization
- **Multi-language Support**: English, Arabic, French, Chinese
- **RTL Support**: Automatic right-to-left layout for Arabic
- **Language Persistence**: Language selection persists across sessions

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful Gradients**: Modern gradient backgrounds and buttons
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: Spinner animations during data loading
- **Error Handling**: Graceful error handling and empty states

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Angular CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Movie-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   
   You need to get an API key from [The Movie Database (TMDb)](https://www.themoviedb.org/login):
   
   1. Create an account at [TMDb](https://www.themoviedb.org/login)
   2. Go to your account settings
   3. Request an API key
   4. Replace `YOUR_API_KEY` in the following files:
      - `src/app/services/movie.ts` (line 9)
      - `src/app/services/tv.ts` (line 9)

   ```typescript
   private apiKey = 'YOUR_ACTUAL_API_KEY_HERE';
   ```

4. **Run the application**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:4200`

## 🛠️ Build

### Development
```bash
npm start
```

### Production
```bash
npm run build
```

### Testing
```bash
npm test
```

## 📱 Pages & Routes

- `/` - Redirects to `/movies`
- `/movies` - Movies list page (main page)
- `/movie/:id` - Movie details page
- `/tv` - TV shows list page
- `/tv/:id` - TV show details page
- `/wishlist` - Wishlist page
- `/search` - Search results page

## 🔧 Technologies Used

- **Angular 20** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **Angular Router** - Client-side routing
- **Angular Forms** - Form handling
- **CSS3** - Modern styling with gradients and animations
- **TMDb API** - Movie and TV show data

## 🎯 API Endpoints Used

### Movies
- `GET /movie/now_playing` - Get now playing movies
- `GET /movie/{id}` - Get movie details
- `GET /movie/{id}/recommendations` - Get movie recommendations
- `GET /movie/{id}/reviews` - Get movie reviews
- `GET /search/movie` - Search movies

### TV Shows
- `GET /tv/popular` - Get popular TV shows
- `GET /tv/{id}` - Get TV show details
- `GET /tv/{id}/recommendations` - Get TV show recommendations
- `GET /tv/{id}/reviews` - Get TV show reviews

## 🌐 Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

### GitHub Pages
1. Add to `angular.json`:
   ```json
   "baseHref": "/your-repo-name/"
   ```
2. Build: `npm run build`
3. Deploy the `dist` folder to GitHub Pages

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── movie-details/     # Movie details page
│   │   ├── movies-list/       # Movies list page
│   │   ├── navbar/           # Navigation bar
│   │   ├── search-results/   # Search results page
│   │   ├── tv-show-details/  # TV show details page
│   │   ├── tv-shows/         # TV shows list page
│   │   └── wishlist/         # Wishlist page
│   ├── services/
│   │   ├── language.ts       # Language service
│   │   ├── movie.ts          # Movie API service
│   │   ├── tv.ts             # TV API service
│   │   └── wishlist.ts       # Wishlist service
│   ├── app.component.ts      # Main app component
│   ├── app.routes.ts         # Application routes
│   └── app.config.ts         # App configuration
├── main.ts                   # Application entry point
└── styles.scss              # Global styles
```

## 🎨 Design Features

- **Modern Gradient Backgrounds**: Beautiful purple-blue gradients
- **Card-based Layout**: Clean, organized content presentation
- **Hover Effects**: Smooth animations and transitions
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Loading Animations**: Professional loading spinners
- **Color-coded Ratings**: Visual rating indicators
- **Type Badges**: Clear distinction between movies and TV shows

## 🔒 Environment Variables

For production, consider using environment variables for the API key:

1. Create `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiKey: 'YOUR_API_KEY'
   };
   ```

2. Create `src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiKey: process.env['TMDB_API_KEY']
   };
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the API
- [Angular](https://angular.io/) team for the amazing framework
- [Figma](https://www.figma.com/) for the design inspiration

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy coding! 🎬✨**
