# 🚀 Quick Setup Checklist for Miss Malawi Voting

## ✅ **Immediate Action Items**

### 1. **PayChangu Dashboard Configuration**
- [ ] Login to [PayChangu Dashboard](https://dashboard.paychangu.com/)
- [ ] Navigate to **Settings** > **Webhooks**
- [ ] Set webhook URL: `http://localhost:3000/api/vote/webhook`
- [ ] Generate and copy webhook secret
- [ ] Navigate to **Settings** > **API Keys** 
- [ ] Copy your secret key (starts with `sk_`)

### 2. **Environment Variables Update**
- [ ] Open your `.env.local` file
- [ ] Verify these are set:
  ```env
  PAYCHANGU_SECRET_KEY=sk_your_actual_key
  PAYCHANGU_WEBHOOK_SECRET=your_actual_webhook_secret
  NEXT_PUBLIC_BASE_URL=http://localhost:3000
  ```

### 3. **Update Firestore Security Rules** 🔒
- [ ] Go to [Firebase Console](https://console.firebase.google.com/)
- [ ] Navigate to **Firestore Database** > **Rules**
- [ ] Copy rules from `firestore.rules` file in project
- [ ] Paste into Firebase Console and click **Publish**
- [ ] ✨ **No Firebase Admin SDK needed!** - Works with regular Firebase setup

### 4. **Test the Setup**
- [ ] Start development server: `npm run dev`
- [ ] Visit: `http://localhost:3000/api/vote/webhook` (should show active status)
- [ ] Go to any contestant page: `http://localhost:3000/contestants/cont1`
- [ ] Click "Vote" button and test the flow

---

## 🔧 **What I've Updated**

1. **Enhanced Webhook with Better Logging**
   - ✅ Added emoji-based logging for easy debugging
   - ✅ Added GET endpoint for webhook verification
   - ✅ Improved error handling and status reporting

2. **Created Comprehensive Setup Guides**
   - ✅ `PAYCHANGU_SETUP.md` - Detailed PayChangu configuration
   - ✅ `scripts/test-webhook.js` - Webhook testing script
   - ✅ Enhanced error messages in voting components

3. **Added Production Readiness**
   - ✅ Environment validation
   - ✅ Signature verification security
   - ✅ Comprehensive logging for debugging

---

## 🧪 **Testing Commands**

```bash
# Start development server
npm run dev

# Test webhook endpoint
curl http://localhost:3000/api/vote/webhook

# Test webhook processing (after updating script)
node scripts/test-webhook.js
```

---

## 📞 **Next Steps After Setup**

1. **Complete PayChangu configuration** (webhook URL + secret)
2. **Test a real vote** on contestant page
3. **Monitor console logs** for webhook activity
4. **Verify votes are added** to contestants after payment

Your voting system will be fully functional once PayChangu is configured! 🎉