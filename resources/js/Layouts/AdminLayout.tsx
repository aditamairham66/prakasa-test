import BtnToTop from '@/Components/Layout/BtnToTop';
import Footer from '@/Components/Layout/Footer';
import NavbarTop from '@/Components/Layout/NavbarTop';
import React, { useEffect } from 'react';
import { PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Sidebar from '@/Components/Layout/Sidebar';
import GLightbox from 'glightbox';
import AlertMessage from '@/Components/AlertMessage';

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
        "/assets/js/app.js",
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
    const uploadInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[upload='file']");
    const btnTableDelete: NodeListOf<HTMLElement> = document.querySelectorAll('.btn-delete-table');    

    uploadInputs.forEach(function(input: HTMLInputElement) {
      input.addEventListener("change", function(event) {
        const image = document.getElementById('preview-image') as HTMLImageElement;
        
        if (input.files && input.files[0]) {
          const reader = new FileReader();
          
          reader.onload = function(e) {
            if (image) {
              image.src = e.target?.result as string;
            }
          };
          
          reader.readAsDataURL(input.files[0]);
        }
      });
    });    

    btnTableDelete.forEach((button) => {
      button.addEventListener('click', function(e) {
        const url = this.dataset.url || ''; // Ambil URL dari tombol
        
        // @ts-ignore
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Delete",
          cancelButtonText: "No, cancel!",
          customClass: {
            confirmButton: "btn bg-primary text-white w-xs me-2 mt-2",
            cancelButton: "btn bg-danger text-white w-xs mt-2"
          },
          buttonsStyling: false,
          showCloseButton: false,
          // @ts-ignore
        }).then(function(t) {
          if (t.isConfirmed) {
            // Kirim permintaan DELETE menggunakan fetch
            Inertia.delete(`${url}`, {
              onSuccess: page => {
                console.log(page)
                button.classList.remove('hidden');
              },
              onError: errors => {
                console.log(errors)
                button.classList.remove('hidden');
              },
              onFinish: visit => {
                console.log(visit)
                button.classList.remove('hidden');
              },
            });
          }
        });
      });
    });

    const lightbox = GLightbox({
      selector: ".image-popup"
    });

    // Cleanup listeners on unmount
    return () => {
      uploadInputs.forEach((input) => {
        input.removeEventListener("change", () => {});
      });
      btnTableDelete.forEach((button) => {
        button.removeEventListener('click', () => {});
      });
    };
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
