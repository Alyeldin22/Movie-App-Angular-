# 🚀 Deployment Guide

This guide will help you deploy your Movie App to various platforms.

## 📋 Prerequisites

1. **API Key Setup**: Make sure you have configured your TMDb API key in the services
2. **Build Success**: Ensure `npm run build` completes successfully
3. **Git Repository**: Have your code pushed to a Git repository

## 🌐 Deployment Options

### 1. Vercel (Recommended)

Vercel provides the easiest deployment experience with automatic builds and deployments.

#### Steps:
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set project name
   - Confirm deployment

5. **For production deployment**:
   ```bash
   vercel --prod
   ```

#### Environment Variables (Optional):
- Go to your Vercel dashboard
- Navigate to Settings → Environment Variables
- Add `TMDB_API_KEY` with your API key value

### 2. Netlify

Netlify is another excellent option with great performance and features.

#### Steps:
1. **Build your project**:
   ```bash
   npm run build
   ```

2. **Deploy options**:
   
   **Option A: Drag & Drop**
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist` folder to the deploy area
   
   **Option B: Git Integration**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   
   **Option C: Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

#### Environment Variables:
- Go to Site Settings → Environment Variables
- Add `TMDB_API_KEY` with your API key

### 3. GitHub Pages

GitHub Pages is free and integrates well with GitHub repositories.

#### Steps:
1. **Update angular.json**:
   ```json
   {
     "projects": {
       "movie-app": {
         "architect": {
           "build": {
             "configurations": {
               "production": {
                 "baseHref": "/your-repo-name/"
               }
             }
           }
         }
       }
     }
   }
   ```

2. **Build for production**:
   ```bash
   npm run build:prod
   ```

3. **Deploy**:
   - Go to your repository settings
   - Navigate to Pages section
   - Select source: Deploy from a branch
   - Select branch: `main` or `master`
   - Select folder: `/docs` or `/dist`
   - Save

4. **Alternative: GitHub Actions**:
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
       - uses: actions/checkout@v2
       - uses: actions/setup-node@v2
         with:
           node-version: '18'
       - run: npm install
       - run: npm run build:prod
       - uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./dist
   ```

### 4. Firebase Hosting

Firebase provides fast hosting with CDN distribution.

#### Steps:
1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase**:
   ```bash
   firebase init hosting
   ```

4. **Configure**:
   - Select your project
   - Set public directory: `dist`
   - Configure as single-page app: `Yes`
   - Don't overwrite index.html: `No`

5. **Build and deploy**:
   ```bash
   npm run build:prod
   firebase deploy
   ```

## 🔧 Environment Variables

For production deployments, it's recommended to use environment variables for the API key:

### Create Environment Files:

1. **src/environments/environment.ts**:
   ```typescript
   export const environment = {
     production: false,
     apiKey: 'YOUR_API_KEY'
   };
   ```

2. **src/environments/environment.prod.ts**:
   ```typescript
   export const environment = {
     production: true,
     apiKey: process.env['TMDB_API_KEY'] || 'YOUR_API_KEY'
   };
   ```

3. **Update services**:
   ```typescript
   import { environment } from '../environments/environment';
   
   private apiKey = environment.apiKey;
   ```

## 🚨 Common Issues & Solutions

### 1. Build Errors
- **Issue**: CSS budget exceeded
- **Solution**: The warning is harmless, but you can increase the budget in `angular.json`

### 2. API Key Issues
- **Issue**: 401 Unauthorized errors
- **Solution**: Verify your API key is correct and has proper permissions

### 3. Routing Issues
- **Issue**: 404 errors on refresh
- **Solution**: Configure your hosting provider for SPA routing (redirect all to index.html)

### 4. CORS Issues
- **Issue**: API requests blocked
- **Solution**: TMDb API supports CORS, but ensure your domain is properly configured

## 📊 Performance Optimization

### 1. Enable Compression
Most hosting providers automatically enable gzip compression.

### 2. Optimize Images
- Use appropriate image sizes from TMDb API
- Consider lazy loading for images

### 3. Bundle Analysis
```bash
npm install -g webpack-bundle-analyzer
ng build --stats-json
webpack-bundle-analyzer dist/stats.json
```

## 🔍 Post-Deployment Checklist

- [ ] ✅ Application loads without errors
- [ ] ✅ All pages are accessible
- [ ] ✅ Search functionality works
- [ ] ✅ Wishlist functionality works
- [ ] ✅ Language switching works
- [ ] ✅ Responsive design works on mobile
- [ ] ✅ API calls are successful
- [ ] ✅ Loading states display correctly
- [ ] ✅ Error handling works

## 📞 Support

If you encounter deployment issues:

1. Check the build logs for errors
2. Verify environment variables are set correctly
3. Ensure your API key is valid
4. Check hosting provider documentation
5. Open an issue on GitHub with detailed error information

---

**Happy deploying! 🚀** 