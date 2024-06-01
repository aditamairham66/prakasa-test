import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appName = import.meta.env.VITE_APP_NAME; // Ensure this is defined in your environment variables

  return (
    <footer className="footer h-16 flex items-center px-6 bg-white shadow">
      <div className="flex justify-center w-full gap-4">
        <div>
          {currentYear} © {appName}
        </div>
      </div>
    </footer>
  );
}
