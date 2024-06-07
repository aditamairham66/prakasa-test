import React, { useEffect } from 'react';
import { PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import BtnToTop from '@/Components/Layout/BtnToTop';
import Footer from '@/Components/Layout/Footer';
import NavbarTop from '@/Components/Layout/NavbarTop';
import Sidebar from '@/Components/Layout/Sidebar';
import AlertMessage from '@/Components/AlertMessage';
import { addScrollToTopListener, addUploadInputListener, addButtonDeleteListener, initializeLightbox, buttonToggleMenuListener } from '@/Helpers/utils';

const LoadScripts = () => {
  const { url } = usePage();

  useEffect(() => {
    if (url !== '') {
      const scriptUrls = [
        "/assets/libs/simplebar/simplebar.min.js",
        "/assets/libs/feather-icons/feather.min.js",
        "/assets/libs/@frostui/tailwindcss/frostui.js",
        "/assets/libs/sweetalert2/sweetalert2.min.js",
        // "/assets/libs/glightbox/js/glightbox.min.js",
        // "/assets/libs/quill/quill.min.js",
        // "/assets/js/app.js",
        // "/assets/libs/flatpickr/flatpickr.min.js",
      ];

      scriptUrls.forEach(scriptUrl => {
        const script = document.createElement("script");
        script.src = scriptUrl;
        script.async = true;
        document.body.appendChild(script);
      });
    }
  }, [url]);

  return null; // Component ini tidak mengembalikan elemen HTML karena hanya berfungsi untuk memuat script.
}

interface PageProps {
  session: {
    message: string;
    message_type: string;
  };
}

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  // @ts-ignore
  const { props } = usePage<PageProps>();
  const { session }: PageProps = props;

  useEffect(() => {
    addScrollToTopListener();
    addUploadInputListener();
    addButtonDeleteListener();
    initializeLightbox();
    buttonToggleMenuListener();
  }, []);
  
  return (
    <>
     <LoadScripts />

      <div className="flex wrapper">
        <div className="app-menu">
          <a href={`/`} className="logo-box bg-red-600 z-10">
            <div className="logo-light">
              <div className="logo-lg h-6">
                telin-logo-white
              </div>
              <div className="logo-sm">
                telin-logo-dark
              </div>
            </div>
            <div className="logo-dark">
              <div className="logo-lg h-6">
                telin-logo-white
              </div>
              <div className="logo-sm">
                telin-logo-dark
              </div>
            </div>
          </a>
          <button id="button-hover-toggle" className="absolute top-5 end-2 rounded-full p-1.5">
            <span className="sr-only">Menu Toggle Button</span>
            <i className="mgc_round_line text-xl"></i>
          </button>
          
          <Sidebar/>
        </div>
        <div className="page-content">
          <NavbarTop/>

          <main className="flex-grow p-6">
            {session.message && (
              // @ts-ignore
              <AlertMessage message={session.message} type={session.message_type}/>
            )}

            {children}
          </main>

          <Footer/>
        </div>
      </div>

      <BtnToTop/>
    </>
  );
}

export default AdminLayout;
