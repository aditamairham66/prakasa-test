import { Link, usePage } from '@inertiajs/inertia-react';
import React from 'react';

export interface PaginationLinkProps {
    label: string;
    url: string | null;
    active: boolean;
}

interface PaginationProps {
    data: {
        links: PaginationLinkProps[];
        from: number;
        to: number;
        total: number;
    };
}

function Pagination({ data: { links, from, to, total } }: PaginationProps) {
    const { url } = usePage();
    
    const addCurrentParamsToUrl = (url: string | null, currentPageUrl: string | null): string | null => {
        if (!url || !currentPageUrl) return null;
        const currentParams = new URLSearchParams(currentPageUrl.split('?')[1] || ''); // Get current URL params
        const newParams = new URLSearchParams(); // Create new URL params
        // Iterate over current params and add them to new params
        currentParams.forEach((value, key) => {
            newParams.append(key, value);
        });
        // If the URL already has a query string, append '&', otherwise append '?'
        const separator = url.includes('?') ? '&' : '?';
        // Append new params to the pagination URL
        return `${url}${separator}${newParams.toString()}`;
    };

    function getClassName(active: boolean) {
        if (active) {
            return "card w-10 h-10 bg-primary text-white p-4 inline-flex items-center text-sm font-medium rounded active";
        } else {
            return "card w-10 h-10 text-gray-400 hover:text-primary p-4 inline-flex items-center text-sm font-medium rounded";
        }
    }

    const sanitizedLinks = links.map(link => ({
        ...link,
        label: link.label.replace('Previous', '').replace('Next', ''),
        url: addCurrentParamsToUrl(link.url, url),
    }));

    return (
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between py-2 mt-3">
            <nav className="flex items-center space-x-2" aria-label="Pagination">
                {sanitizedLinks.map((link, key) => (
                    <React.Fragment key={key}>
                        {link.url ? (
                            <Link 
                                href={link.url} 
                                className={getClassName(link.active)} 
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                aria-current={link.active ? "page" : undefined}
                            />
                        ) : (
                            <a 
                                href="#" 
                                className={getClassName(link.active)} 
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                aria-disabled="true"
                                aria-current={link.active ? "page" : undefined}
                            />
                        )}
                    </React.Fragment>
                ))}
            </nav>
            <div>
                <p className="text-neutral-500 text-xs font-['Poppins']">
                    Showing <span className="font-bold">{from}</span> to <span className="font-bold">{to}</span> of <span className="font-bold">{total}</span> results
                </p>
            </div>
        </div>
    );
}

export default Pagination;
