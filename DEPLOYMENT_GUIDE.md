# Deployment Guide

This guide will help you deploy your Abdul Raffay Portfolio to various platforms.

## Prerequisites

Before deploying, make sure you have:
- Node.js installed (v14 or higher)
- npm or yarn package manager
- A GitHub account (for most deployment options)

## Option 1: Deploy to Vercel (Recommended)

Vercel is perfect for React applications and offers free hosting.

### Steps:

1. **Install Vercel CLI**
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. **Login to Vercel**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy**
   \`\`\`bash
   cd abdul-raffay-portfolio
   vercel
   \`\`\`

4. Follow the prompts. Your site will be live in minutes!

### Or Deploy via Vercel Dashboard:

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect React and deploy

## Option 2: Deploy to Netlify

Another excellent free hosting option for React apps.

### Steps:

1. **Install Netlify CLI**
   \`\`\`bash
   npm install -g netlify-cli
   \`\`\`

2. **Build your project**
   \`\`\`bash
   npm run build
   \`\`\`

3. **Deploy**
   \`\`\`bash
   netlify deploy
   \`\`\`

4. For production:
   \`\`\`bash
   netlify deploy --prod
   \`\`\`

### Or Deploy via Netlify Dashboard:

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build command: \`npm run build\`
6. Publish directory: \`build\`
7. Click "Deploy"

## Option 3: Deploy to GitHub Pages

Free hosting directly from your GitHub repository.

### Steps:

1. **Install gh-pages**
   \`\`\`bash
   npm install --save-dev gh-pages
   \`\`\`

2. **Update package.json**
   Add these lines to your package.json:
   \`\`\`json
   {
     "homepage": "https://yourusername.github.io/abdul-raffay-portfolio",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   \`\`\`

3. **Deploy**
   \`\`\`bash
   npm run deploy
   \`\`\`

4. Enable GitHub Pages in your repository settings

## Option 4: Deploy to Firebase Hosting

Google's hosting solution with global CDN.

### Steps:

1. **Install Firebase CLI**
   \`\`\`bash
   npm install -g firebase-tools
   \`\`\`

2. **Login to Firebase**
   \`\`\`bash
   firebase login
   \`\`\`

3. **Initialize Firebase**
   \`\`\`bash
   firebase init hosting
   \`\`\`
   - Select "Use an existing project" or create new
   - Public directory: \`build\`
   - Single-page app: \`Yes\`

4. **Build and Deploy**
   \`\`\`bash
   npm run build
   firebase deploy
   \`\`\`

## Post-Deployment Checklist

After deploying, verify:

- ✅ All pages load correctly
- ✅ Navigation works between pages
- ✅ 3D animations are working
- ✅ Images load properly
- ✅ Contact form displays correctly
- ✅ Mobile responsiveness
- ✅ Projects page functionality
- ✅ Button particle effects work

## Custom Domain Setup

### For Vercel:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### For Netlify:
1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow DNS configuration steps

### For GitHub Pages:
1. Add a \`CNAME\` file to the public folder with your domain
2. Update DNS with your domain provider

## Environment Variables

If you add backend functionality later:

1. Create a \`.env\` file (never commit this!)
2. Add your variables:
   \`\`\`
   REACT_APP_API_URL=your_api_url
   REACT_APP_EMAIL_SERVICE=your_service
   \`\`\`

3. For Vercel/Netlify, add these in dashboard under "Environment Variables"

## Troubleshooting

### Build Fails
- Check Node.js version (\`node --version\`)
- Clear cache: \`npm cache clean --force\`
- Delete node_modules and reinstall: \`rm -rf node_modules && npm install\`

### Images Not Loading
- Ensure images are in \`src/assets\` folder
- Check import paths are correct
- Verify image files were copied during build

### 3D Animations Not Working
- Check browser console for WebGL errors
- Ensure Three.js dependencies are installed
- Test in different browsers

### Routing Issues (404 on refresh)
- For Netlify: Create \`public/_redirects\` with:
  \`\`\`
  /*    /index.html   200
  \`\`\`
- For Vercel: Create \`vercel.json\`:
  \`\`\`json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/" }]
  }
  \`\`\`

## Continuous Deployment

For automatic deployments on every push:

1. Connect your GitHub repository to Vercel/Netlify
2. Enable automatic deployments
3. Every push to main branch will trigger a new deployment

## Performance Optimization

After deployment, consider:

1. **Enable Gzip Compression** (usually automatic on hosting platforms)
2. **Add Service Worker** for offline functionality
3. **Optimize Images** - compress before uploading
4. **Lazy Load Components** for faster initial load
5. **Use CDN** for static assets (automatic on most platforms)

## Monitoring

Set up monitoring to track:
- Page load times
- Error rates
- User analytics

Recommended tools:
- Google Analytics
- Vercel Analytics (built-in)
- Sentry for error tracking

## Support

If you encounter issues:
1. Check the hosting platform's documentation
2. Review build logs for errors
3. Test locally first: \`npm run build && serve -s build\`

---

Good luck with your deployment! 🚀
