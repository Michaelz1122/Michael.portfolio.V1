# Email Setup Instructions

To enable the contact form functionality, you need to configure Gmail credentials. Follow these steps:

## 1. Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security"
3. Enable "2-Step Verification"

## 2. Generate App Password
1. After enabling 2-Step Verification, go to: https://myaccount.google.com/apppasswords
2. Select "Mail" for the app
3. Select "Other (Custom name)" and enter "Michael Zahy Portfolio"
4. Click "Generate"
5. Copy the 16-character password (this is your `GMAIL_APP_PASSWORD`)

## 3. Update Environment Variables
Update the `.env` file with your actual credentials:

```env
DATABASE_URL=file:/home/z/my-project/test7000/db/custom.db
GMAIL_EMAIL=your-actual-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

## 4. Restart the Server
After updating the environment variables, restart the development server:

```bash
npm run dev
```

## Important Notes
- Never commit your actual email credentials to version control
- The app password is different from your regular Gmail password
- Make sure to use a Gmail account that has less secure app access enabled or use app passwords
- If you encounter issues, check that:
  - 2-Step Verification is enabled
  - App password is correctly generated
  - Environment variables are properly set
  - Server is restarted after changes

## Testing the Contact Form
1. Fill out the contact form on the website
2. Check the browser console for any errors
3. Check the server logs for email sending status
4. Verify that both the admin notification and user confirmation emails are sent

## Troubleshooting
If emails are not being sent, check the server logs for error messages. Common issues include:
- Incorrect Gmail credentials
- Gmail security settings blocking the app
- Network connectivity issues
- Missing or incorrect environment variables