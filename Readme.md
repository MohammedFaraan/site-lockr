# SiteLockr

SiteLockr is a simple, modern, and user-friendly password manager built with React. It allows users to securely store, manage, and retrieve their website credentials (site, username, password) directly in their browser using local storage. The application is styled with Tailwind CSS and provides a clean, responsive interface.

## Features

- **Add Credentials:** Add new website credentials (site, username, password) via a simple form.
- **Password Visibility Toggle:** Show/hide your password input for convenience and security.
- **Edit Credentials:** Edit existing credentials in-place.
- **Delete Credentials:** Remove credentials with a confirmation prompt.
- **Copy to Clipboard:** Quick copy buttons for site, username, and password fields.
- **Persistent Storage:** All data is stored in the browser’s local storage, ensuring privacy and persistence across sessions.
- **Responsive UI:** Works well on both desktop and mobile devices.
- **Feedback & Notifications:** Toast notifications for user feedback (e.g., successful copy, errors, deletions).
- **Modern Design:** Built with React, Tailwind CSS, and enhanced with icons and subtle gradients for a pleasant user experience.

## How It Works

- On load, the app fetches any saved credentials from local storage.
- Users can add new credentials, which are validated for minimum length before saving.
- Credentials are displayed in a table, with options to copy, edit, or delete each entry.
- Passwords are masked by default but can be revealed temporarily.
- All changes are immediately reflected in local storage.

---

Created with ❤️ by Mohammed Faraan
