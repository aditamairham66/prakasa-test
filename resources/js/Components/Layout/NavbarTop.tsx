import React from 'react';
import NavbarTitle from './NavbarTitle';
import { usePage } from '@inertiajs/inertia-react';

interface ProfileDropdownProps {
    isAuthenticated: boolean;
}

interface ConditionalMenuItemProps {
    condition: boolean;
    iconClass: string;
    text: string;
    link: string;
}

const NavbarTop: React.FC = () => {
    const isAuthenticated: boolean = true; // Example, replace with actual authentication status
    const { props } = usePage();
    const { title } = props;

    return (
        <header className="app-header flex items-center px-4 gap-2">
            {/* Sidenav Menu Toggle Button */}
            <button id="button-toggle-menu" className="nav-link p-2">
                <span className="sr-only hidden">Menu Toggle Button</span>
                <span className="flex items-center justify-center h-6 w-6">
                    <i className="mgc_menu_line text-xl"></i>
                </span>
            </button>

            {/* Page Title Start */}
            <NavbarTitle pageTitle={`${title}`} pageSubtitle={``} />
            {/* Page Title End */}

            {/* Notification Bell Button */}
            {/* <div className="relative md:flex hidden">
                {isAuthenticated && (
                    <button
                        data-fc-type="dropdown"
                        data-fc-placement="bottom-end"
                        type="button"
                        className="nav-link p-2 relative"
                    >
                        <span className="sr-only hidden">View notifications</span>
                        <span className="flex items-center justify-center h-6 w-6">
                            <i className="mgc_notification_line text-2xl"></i>
                            <span className="badge-notif bg-primary animate-ping"></span>
                        </span>
                    </button>
                )}
                {isAuthenticated && (
                    <div className="fc-dropdown fc-dropdown-open:opacity-100 hidden opacity-0 w-80 z-50 mt-2 transition-[margin,opacity] duration-300 bg-white shadow-lg border border-gray-20 rounded-lg">
                        <div className="p-2 border-b border-dashed border-gray-20">
                            <div className="flex items-center justify-between">
                                <h6 className="text-sm"> Notification</h6>
                            </div>
                        </div>
                        <div className="p-4 h-80" id="notificationNavbar" data-simplebar></div>
                        <a
                            href="{{ route('cms-notification.index') }}"
                            className="p-2 border-t border-dashed border-gray-20 block text-center text-primary underline font-semibold"
                        >
                            View All
                        </a>
                    </div>
                )}
            </div> */}

            {/* Profile Dropdown Button */}
            {/* <div className="relative">
                <button data-fc-type="dropdown" data-fc-placement="bottom-end" type="button" className="nav-link">
                    {isAuthenticated ? (
                        <img src="{{ asset(auth('admins').user().image) }}" alt="user-image" className="rounded-full h-10" />
                    ) : (
                        <img src="{{ asset('assets/images/users/user-6.jpg') }}" alt="user-image" className="rounded-full h-10" />
                    )}
                </button>
                {isAuthenticated && (
                    <div className="fc-dropdown fc-dropdown-open:opacity-100 hidden opacity-0 w-44 z-50 transition-[margin,opacity] duration-300 mt-2 bg-white shadow-lg border rounded-lg p-2 border-gray-20 dark:bg-gray-800">
                        <ProfileDropdownItems />
                    </div>
                )}
            </div> */}
        </header>
    );
};


// Separate component for profile dropdown items
const ProfileDropdownItems: React.FC = () => {
    return (
        <>
            <ConditionalMenuItem condition={true} iconClass="mgc_task_2_line" text="Profile" link="#" />
            <ConditionalMenuItem condition={true} iconClass="mgc_lock_line" text="Lock Screen" link="#" />
        </>
    );
};

// Component for conditional rendering of menu items
const ConditionalMenuItem: React.FC<ConditionalMenuItemProps> = ({ condition, iconClass, text, link }) => {
    return condition ? (
        <a className="flex items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href={link}>
            <i className={iconClass + " me-2"}></i>
            <span>{text}</span>
        </a>
    ) : null;
};

export default NavbarTop;
