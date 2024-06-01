import { Link, usePage } from '@inertiajs/inertia-react';
import React from 'react';

interface PageTitleProps {
    pageTitle?: string;
    pageSubtitle?: string;
}

const NavbarTitle: React.FC<PageTitleProps> = ({ pageTitle, pageSubtitle }) => {
  const appName = import.meta.env.VITE_APP_NAME;
  const { url } = usePage();
  
  return (
      <div className="me-auto">
          <div className="flex flex-col">
              {pageTitle ? (
                  <h3 className="text-black text-2xl font-semibold font-Poppins">{pageTitle}</h3>
              ) : (
                  <h3 className="text-black text-2xl font-semibold font-Poppins">Dashboard</h3>
              )}

              <div className="flex flex-col sm:flex-row">
                  {pageTitle && (
                      <>
                          <Link href="/" className="text-neutral-500 text-xs font-medium font-Poppins hidden sm:block">{appName}</Link>
                          <div className="text-neutral-500 text-xs font-medium font-Poppins mx-1 hidden sm:block">/</div>
                          <Link href={url} className="text-neutral-500 text-xs font-medium font-Poppins hidden sm:block">{pageTitle}</Link>
                      </>
                  )}
                  {pageSubtitle && (
                      <>
                          <div className="text-neutral-500 text-xs font-medium font-Poppins mx-1 hidden sm:block">/</div>
                          <div className="text-neutral-500 text-xs font-medium font-Poppins">{pageSubtitle}</div>
                      </>
                  )}
              </div>
          </div>
      </div>
  );
};

export default NavbarTitle;
