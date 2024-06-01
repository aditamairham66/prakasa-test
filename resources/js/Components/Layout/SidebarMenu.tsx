import React from 'react';
import HomeIcon from '../Icons/HomeIcon';
import { Link, usePage } from '@inertiajs/inertia-react';

const SidebarMenu: React.FC = () => {
  const { url } = usePage();

  // Fungsi untuk mengecek apakah link aktif berdasarkan URL saat ini
  const isActiveLink = (path: string) => {
    return url === path ? 'active' : '';
  };

  // Daftar tautan sidebar
  const sidebarLinks = [
    { path: '/', text: 'Dashboard' },
    { path: '/post', text: 'Posts' },
    { path: '/user', text: 'Users Management' },
    // Tambahkan tautan baru di sini jika diperlukan
  ];

  return (
    <ul className="menu menuSidebar" data-fc-type="accordion">
      {sidebarLinks.map((link, index) => (
        <li className="menu-item" key={index}>
          <Link
            href={link.path}
            className={`menu-link ${isActiveLink(link.path)}`}
          >
            <span className="menu-icon"><HomeIcon/></span>
            <span className="menu-text">{link.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarMenu;
