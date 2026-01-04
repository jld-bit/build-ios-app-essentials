
# 📱 Complete Guide: Publishing Your App to App Store & Google Play

## What You Need Before Starting

### 1. Developer Accounts (Required)
- **Apple Developer Account**: $99/year - Sign up at https://developer.apple.com/programs/
- **Google Play Developer Account**: $25 one-time fee - Sign up at https://play.google.com/console/signup

### 2. Computer Requirements
- Mac computer (required for iOS builds)
- Internet connection
- Your app project folder

---

## Part 1: Install Required Tools

### Step 1: Install EAS CLI
This is the tool that will build your app for the stores.

**On Mac:**
1. Open Terminal (find it in Applications → Utilities → Terminal)
2. Copy and paste this command, then press Enter:
```bash
npm install -g eas-cli
```
3. Wait for it to finish (you'll see the command prompt return)

### Step 2: Login to Expo
1. In Terminal, type:
```bash
eas login
```
2. Enter your Expo account email and password
3. If you don't have an Expo account, create one at https://expo.dev/signup

---

## Part 2: Prepare Your App Information

Before building, decide on these details:

### App Identity
- **App Name**: "Essential Only" (already set)
- **Bundle ID (iOS)**: com.essentialonly.app (already set)
- **Package Name (Android)**: com.essentialonly.app (already set)

### App Store Listing Information
Write these down - you'll need them later:

1. **Short Description** (80 characters max)
   Example: "Track your budget runway and focus on essential expenses only"

2. **Full Description** (4000 characters max)
   Example: "Essential Only helps you understand how long your savings will last. Track your monthly income, expenses, and see your financial runway at a glance. Focus on what matters by identifying essential vs. non-essential expenses."

3. **Keywords** (100 characters, comma-separated)
   Example: "budget,finance,savings,expenses,money,tracker,runway"

4. **Privacy Policy URL** (required)
   - You MUST have a privacy policy
   - Since your app stores data locally only, you can use a simple policy
   - Host it on a website or use a free service like https://www.privacypolicygenerator.info/

5. **Support URL** (required)
   - Your website or email where users can get help
   - Example: mailto:support@essentialonly.com

---

## Part 3: Build Your App

### For iOS (iPhone/iPad)

**Step 1: Start the iOS Build**
1. Open Terminal
2. Navigate to your app folder:
```bash
cd /path/to/your/app/folder
```
3. Run the build command:
```bash
eas build --platform ios --profile production
```

**Step 2: Answer the Questions**
EAS will ask you several questions:
- "Generate a new Apple Distribution Certificate?" → Press **Y** (Yes)
- "Generate a new Apple Provisioning Profile?" → Press **Y** (Yes)
- It will open a browser to log in to your Apple account → Log in
- "What would you like your iOS bundle identifier to be?" → Press Enter (it's already set)

**Step 3: Wait for Build**
- The build happens in the cloud (takes 15-30 minutes)
- You'll get a link to watch progress
- When done, you'll get a download link for the .ipa file

### For Android (Google Play)

**Step 1: Start the Android Build**
1. In Terminal, run:
```bash
eas build --platform android --profile production
```

**Step 2: Answer the Questions**
- "Generate a new Android Keystore?" → Press **Y** (Yes)
- EAS will automatically create and manage your signing key

**Step 3: Wait for Build**
- Takes 15-30 minutes
- You'll get a download link for the .aab file when done

### Build Both at Once (Optional)
```bash
eas build --platform all --profile production
```

---

## Part 4: Submit to Apple App Store

### Step 1: Create App in App Store Connect
1. Go to https://appstoreconnect.apple.com
2. Click the **+** button → "New App"
3. Fill in:
   - **Platform**: iOS
   - **Name**: Essential Only
   - **Primary Language**: English
   - **Bundle ID**: Select "com.essentialonly.app"
   - **SKU**: essentialonly (or any unique identifier)
   - **User Access**: Full Access

### Step 2: Prepare App Store Assets

You need these images (create them using design tools or hire a designer):

**Required Screenshots:**
- iPhone 6.7" (1290 x 2796 pixels) - at least 3 screenshots
- iPhone 6.5" (1242 x 2688 pixels) - at least 3 screenshots
- iPhone 5.5" (1242 x 2208 pixels) - at least 3 screenshots

**App Icon:**
- 1024 x 1024 pixels
- No transparency
- No rounded corners (Apple adds them)

### Step 3: Fill Out App Information
In App Store Connect:

1. **App Information Tab:**
   - Privacy Policy URL (required)
   - Category: Finance
   - Content Rights: Check if you own all rights

2. **Pricing and Availability:**
   - Price: Free (or set your price)
   - Availability: All countries (or select specific ones)

3. **App Privacy:**
   - Click "Get Started"
   - Since you only use local storage:
     - "Do you collect data from this app?" → No
   - Complete the questionnaire

### Step 4: Submit the Build
1. In Terminal, run:
```bash
eas submit --platform ios --latest
```

2. You'll be asked for:
   - **Apple ID**: Your Apple Developer account email
   - **App-specific password**: 
     - Go to https://appleid.apple.com
     - Sign in → Security → App-Specific Passwords
     - Click "Generate password"
     - Copy and paste it into Terminal

3. EAS will upload your app to App Store Connect

### Step 5: Complete Submission in App Store Connect
1. Go back to App Store Connect
2. Your build will appear under "Build" (may take 5-10 minutes)
3. Select the build
4. Fill in:
   - What's New in This Version
   - Promotional Text (optional)
   - Description
   - Keywords
   - Support URL
   - Marketing URL (optional)
5. Upload screenshots
6. Click "Submit for Review"

**Review Time:** Usually 1-3 days

---

## Part 5: Submit to Google Play Store

### Step 1: Create App in Google Play Console
1. Go to https://play.google.com/console
2. Click "Create app"
3. Fill in:
   - **App name**: Essential Only
   - **Default language**: English (United States)
   - **App or game**: App
   - **Free or paid**: Free
4. Accept declarations and click "Create app"

### Step 2: Complete Store Listing
In the left sidebar, go to "Store presence" → "Main store listing":

1. **App details:**
   - Short description (80 characters)
   - Full description (4000 characters)

2. **Graphics:**
   - **App icon**: 512 x 512 pixels (PNG)
   - **Feature graphic**: 1024 x 500 pixels (JPG or PNG)
   - **Phone screenshots**: At least 2 (1080 x 1920 pixels recommended)
   - **7-inch tablet screenshots**: At least 2 (optional but recommended)

3. **Categorization:**
   - App category: Finance
   - Tags: Add relevant tags

4. **Contact details:**
   - Email address
   - Phone number (optional)
   - Website (optional)

5. **Privacy Policy:**
   - Add your privacy policy URL

### Step 3: Set Up Content Rating
1. Go to "Policy" → "App content"
2. Click "Start questionnaire" under "Content rating"
3. Answer questions honestly:
   - Your app is a budget tracker
   - No violence, sexual content, etc.
4. Submit and get your rating

### Step 4: Set Up Target Audience
1. In "Policy" → "App content"
2. Click "Start" under "Target audience and content"
3. Select age groups (likely 18+)
4. Complete the questionnaire

### Step 5: Create a Release
1. Go to "Release" → "Production"
2. Click "Create new release"
3. Upload your .aab file:
```bash
eas submit --platform android --latest
```
4. Or manually upload the .aab file you downloaded earlier

### Step 6: Complete Release Details
1. **Release name**: 1.0.0 (or your version)
2. **Release notes**: Describe what's in this version
   Example: "Initial release - Track your budget runway and essential expenses"
3. Click "Review release"
4. Click "Start rollout to Production"

**Review Time:** Usually a few hours to 1 day

---

## Part 6: After Submission

### Monitor Your Submissions

**Apple App Store:**
- Check status at https://appstoreconnect.apple.com
- You'll get emails about status changes
- Possible statuses:
  - "Waiting for Review" → Your app is in the queue
  - "In Review" → Apple is reviewing
  - "Pending Developer Release" → Approved! You can release it
  - "Ready for Sale" → Live in the App Store!

**Google Play Store:**
- Check status at https://play.google.com/console
- Usually approved within hours
- Once approved, it's automatically live

### If Your App is Rejected

**Common rejection reasons:**
1. **Missing privacy policy** → Add one and resubmit
2. **Crashes during review** → Test thoroughly and fix bugs
3. **Misleading screenshots** → Make sure screenshots match app functionality
4. **Missing app functionality** → Ensure all features work

**How to fix and resubmit:**
1. Read the rejection reason carefully
2. Fix the issues in your code
3. Rebuild: `eas build --platform ios --profile production`
4. Resubmit: `eas submit --platform ios --latest`

---

## Part 7: Updating Your App

When you want to release an update:

### Step 1: Update Version Number
Edit `app.json`:
```json
{
  "expo": {
    "version": "1.0.1",  // Increment this
    "ios": {
      "buildNumber": "2"  // Add this and increment
    },
    "android": {
      "versionCode": 2  // Add this and increment
    }
  }
}
```

### Step 2: Rebuild and Resubmit
```bash
# Build new version
eas build --platform all --profile production

# Submit to stores
eas submit --platform all --latest
```

### Step 3: Update Store Listings
- Add "What's New" notes describing changes
- Update screenshots if UI changed
- Submit for review

---

## Quick Reference Commands

```bash
# Login to EAS
eas login

# Build for iOS only
eas build --platform ios --profile production

# Build for Android only
eas build --platform android --profile production

# Build for both platforms
eas build --platform all --profile production

# Submit to App Store
eas submit --platform ios --latest

# Submit to Google Play
eas submit --platform android --latest

# Submit to both stores
eas submit --platform all --latest

# Check build status
eas build:list

# View specific build details
eas build:view [BUILD_ID]
```

---

## Cost Summary

| Item | Cost | Frequency |
|------|------|-----------|
| Apple Developer Account | $99 | Per year |
| Google Play Developer Account | $25 | One-time |
| EAS Build (Free tier) | $0 | Includes limited builds/month |
| EAS Build (Production tier) | $29 | Per month (unlimited builds) |

**Note:** You can start with the free EAS tier and upgrade if needed.

---

## Timeline Expectations

| Task | Time Required |
|------|---------------|
| Setting up developer accounts | 30 minutes - 1 hour |
| Preparing app assets (screenshots, icons) | 2-4 hours |
| First build (iOS) | 15-30 minutes |
| First build (Android) | 15-30 minutes |
| Submitting to stores | 30 minutes |
| **Apple review time** | **1-3 days** |
| **Google review time** | **Few hours to 1 day** |

---

## Troubleshooting

### Build Fails
**Error: "Bundle identifier is already in use"**
- Solution: Change bundle ID in app.json to something unique
- Example: com.yourname.essentialonly

**Error: "Apple Developer account not found"**
- Solution: Make sure you've enrolled in Apple Developer Program
- Check at https://developer.apple.com/account

### Submission Fails
**Error: "Missing compliance information"**
- Solution: In app.json, we already have:
  ```json
  "ITSAppUsesNonExemptEncryption": false
  ```
- This tells Apple your app doesn't use encryption

**Error: "Invalid provisioning profile"**
- Solution: Run `eas build:configure` and rebuild

---

## Getting Help

- **EAS Documentation**: https://docs.expo.dev/eas/
- **App Store Connect Help**: https://developer.apple.com/support/app-store-connect/
- **Google Play Console Help**: https://support.google.com/googleplay/android-developer
- **Expo Forums**: https://forums.expo.dev/
- **Expo Discord**: https://chat.expo.dev/

---

## Privacy Policy Template

Since your app only stores data locally, here's a simple privacy policy template:

```
Privacy Policy for Essential Only

Last updated: [DATE]

Essential Only ("we", "our", or "us") operates the Essential Only mobile application.

Data Storage
All data entered into Essential Only is stored locally on your device only. We do not collect, transmit, or store any of your personal information or financial data on our servers.

Data We Don't Collect
- We do not collect personal information
- We do not track your usage
- We do not use analytics or advertising
- We do not share data with third parties

Your Data
- All budget data stays on your device
- You can delete all data at any time through the app settings
- Uninstalling the app will permanently delete all data

Changes to This Policy
We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy in the app.

Contact Us
If you have questions about this privacy policy, contact us at:
[YOUR EMAIL]
```

Host this on a simple website or use a free service like GitHub Pages.

---

## Checklist Before Submitting

### iOS App Store
- [ ] Apple Developer account active ($99/year)
- [ ] App created in App Store Connect
- [ ] App icon (1024x1024) ready
- [ ] Screenshots for all required sizes ready
- [ ] Privacy policy URL ready
- [ ] Support URL ready
- [ ] App description written
- [ ] Keywords selected
- [ ] Content rating completed
- [ ] Build uploaded via EAS
- [ ] All app information filled out
- [ ] Submitted for review

### Google Play Store
- [ ] Google Play Developer account active ($25 one-time)
- [ ] App created in Play Console
- [ ] App icon (512x512) ready
- [ ] Feature graphic (1024x500) ready
- [ ] Screenshots ready (at least 2)
- [ ] Privacy policy URL ready
- [ ] App description written
- [ ] Content rating completed
- [ ] Target audience selected
- [ ] Build uploaded via EAS
- [ ] All store listing information filled out
- [ ] Released to production

---

## Success! What's Next?

Once your app is live:

1. **Monitor Reviews**: Respond to user feedback
2. **Track Downloads**: Check analytics in store consoles
3. **Plan Updates**: Fix bugs and add features based on feedback
4. **Marketing**: Share your app on social media, with friends, etc.

Congratulations on publishing your app! 🎉
