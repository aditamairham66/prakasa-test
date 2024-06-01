import React from 'react';
import {Head, usePage} from "@inertiajs/inertia-react";
import AdminLayout from '@/Layouts/AdminLayout';

const Post: React.FC = () => {
    const { props } = usePage();
    const { title } = props;

    return (
        <AdminLayout>
            <Head title={`${title}`}/>

            <div className="card">
                <div className="flex flex-wrap justify-between items-center gap-2 p-6">
                    {title}
                    
                    <div className="flex flex-wrap gap-2"></div>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full divide-y divide-gray-300">
                        <thead className="border-t bg-gray-100">
                            <tr>
                                <th scope="col" className="py-3.5 ps-4 pe-3 text-left text-sm font-semibold dark:text-gray-900 text-gray-200">No</th>
                                <th scope="col" className="py-3.5 text-left text-sm font-semibold dark:text-gray-900 text-gray-200">Name</th>
                                <th scope="col" className="py-3.5 text-left text-sm font-semibold dark:text-gray-900 text-gray-200">Name</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr>
                                <td className="whitespace-nowrap py-4 ps-4 pe-3 text-sm font-medium text-gray-900">
                                    <b>#123</b>
                                </td>
                                <td className="whitespace-nowrap py-4 pe-3 text-sm text-gray-800">Name</td>
                                <td className="whitespace-nowrap py-4 pe-3 text-sm text-gray-800">Name</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Post;
