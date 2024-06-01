import React, { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import HomeIcon from '@/Components/Icons/HomeIcon';
import SidebarMenu from './SidebarMenu';

const Sidebar: React.FC = () => {

  useEffect(() => {
    const btnLogout = document.getElementById("btnLogout") as HTMLElement;

    const handleLogout = () => {
      // @ts-ignore
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Logout",
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
          Inertia.get('/logout');
        }
      });
    };

    if (btnLogout) {
      btnLogout.addEventListener("click", handleLogout);
    }

    // Clean up event listeners on component unmount
    return () => {
      if (btnLogout) {
        btnLogout.removeEventListener("click", handleLogout);
      }
    };
  }, []);

  return (
    <div className="srcollbar relative" data-simplebar>
      <SidebarMenu/>

      <ul className="menu">
        <li className="menu-item">
          <a href="#" id="btnLogout" className="menu-link">
            <span className="menu-icon">
              <HomeIcon/>
            </span>
            <span className="menu-text">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
