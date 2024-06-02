import React from 'react';

interface ThProps {
    className?: string;
    sortUrl?: string;
    children?: React.ReactNode;
}

const Th: React.FC<ThProps> = ({
    className = '',
    sortUrl,
    children,
    ...props
}) => {
    return (
        <th scope="col" className={`py-3.5 text-left text-sm font-semibold dark:text-gray-900 text-gray-200 ${className}`} {...props}>
            { sortUrl ? (
                <a href={sortUrl} title={`Click to sort ${sortUrl}`} className="flex items-center gap-5">
                    {children}
                    <div>
                        <i className="mgc_sort_ascending_line"></i>
                    </div>
                </a>
            ) : (
                <>{children}</>
            )}
        </th>
    );
};

export default Th;
