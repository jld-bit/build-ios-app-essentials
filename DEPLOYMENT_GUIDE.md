
# App Store Deployment Guide

## 1. Install EAS CLI (if not already installed)
```bash
npm install -g eas-cli
```

## 2. Login to Expo
```bash
eas login
```

## 3. Configure Your App Identity

Update `app.json` with your unique bundle identifiers:

**For iOS:**
- Change `"bundleIdentifier": "com.anonymous.Natively"` to `"com.yourcompany.budgetapp"`

**For Android:**
- Change `"package": "com.anonymous.Natively"` to `"com.yourcompany.budgetapp"`

## 4. Build for iOS (App Store)

```bash
# First build
eas build --platform ios --profile production

# This will:
# - Ask you to create an Apple App Store Connect app
# - Generate certificates and provisioning profiles
# - Build your app in the cloud
# - Provide a download link
```

**After build completes:**
```bash
# Submit to App Store
eas submit --platform ios --latest
```

You'll need:
- Apple ID
- App-specific password (generate at appleid.apple.com)
- App Store Connect app created

## 5. Build for Android (Google Play)

```bash
# First build
eas build --platform android --profile production

# This will:
# - Generate a signing key
# - Build your AAB file
# - Provide a download link
```

**After build completes:**
```bash
# Submit to Google Play
eas submit --platform android --latest
```

You'll need:
- Google Play Console account
- Service account JSON key (from Play Console)

## 6. App Store Requirements

### iOS App Store:
1. **App Store Connect Setup:**
   - Create app listing
   - Add screenshots (6.7", 6.5", 5.5" sizes)
   - Write app description
   - Add privacy policy URL
   - Set pricing

2. **Required Assets:**
   - App icon (1024x1024px)
   - Screenshots for all device sizes
   - Privacy policy

### Google Play Store:
1. **Play Console Setup:**
   - Create app listing
   - Add screenshots (phone & tablet)
   - Write app description
   - Add privacy policy
   - Complete content rating questionnaire
   - Set pricing & distribution

2. **Required Assets:**
   - App icon (512x512px)
   - Feature graphic (1024x500px)
   - Screenshots (min 2, max 8)
   - Privacy policy

## 7. Update App Icon & Name

Your current app name is "Natively" - consider changing to something like:
- "Budget Runway"
- "Survival Budget"
- "Runway Tracker"

Update in `app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

## 8. Privacy Policy

You MUST have a privacy policy. Since you're using AsyncStorage (local data only), your policy can be simple:

**Key points to include:**
- Data is stored locally on device
- No data is collected or shared
- No third-party analytics or tracking

## 9. Testing Before Submission

```bash
# Test on real devices
eas build --platform ios --profile preview
eas build --platform android --profile preview
```

## 10. Common Issues & Solutions

**Issue: Build fails**
- Check your bundle identifier is unique
- Ensure all dependencies are compatible
- Review build logs in EAS dashboard

**Issue: Submission rejected**
- Add privacy policy
- Ensure app icon meets requirements
- Complete all required metadata

## 11. Monitoring & Updates

After approval:
```bash
# For updates, increment version in app.json
"version": "1.0.1"

# Then rebuild and resubmit
eas build --platform all --profile production
eas submit --platform all --latest
```

## Quick Commands Reference

```bash
# Build both platforms
eas build --platform all --profile production

# Submit both platforms
eas submit --platform all --latest

# Check build status
eas build:list

# View build logs
eas build:view [BUILD_ID]
```

## Estimated Timeline

- **iOS Review:** 1-3 days (sometimes 24 hours)
- **Android Review:** Few hours to 1 day
- **First Build Time:** 15-30 minutes per platform

## Cost Summary

- Apple Developer: $99/year
- Google Play: $25 one-time
- EAS Build: Free tier includes limited builds, paid plans start at $29/month

## Support

- EAS Documentation: https://docs.expo.dev/eas/
- App Store Connect: https://appstoreconnect.apple.com
- Google Play Console: https://play.google.com/console
