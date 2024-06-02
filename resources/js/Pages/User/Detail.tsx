import React from 'react';
import { Head, usePage } from "@inertiajs/inertia-react";
import AdminLayout from '@/Layouts/AdminLayout';
import { Post } from '@/types';

interface PageProps {
    title: string;
    form: Post;
}

const DetailUser: React.FC = () => {
    // @ts-ignore
    const { props } = usePage<PageProps>();
    const { title, form } = props;

    return (
        <AdminLayout>
            <Head title={title} />

            <div className="card">
                <div className="card-header flex justify-between items-center">
                    <p className="card-title">{title}</p>

                    <div>
                        <div className="flex justify-end gap-3">
                            <a href="#" onClick={e => window.history.back()} className="inline-flex items-center rounded-md border border-transparent bg-success px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none">
                                Back
                            </a>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                        <div>
                            <span className="font-medium my-3 text-gray-800">Name</span>
                            <div className="text-gray-500 mb-4 text-sm">{form.name}</div>
                        </div>
                        <div>
                            <span className="font-medium my-3 text-gray-800">Email</span>
                            <div className="text-gray-500 mb-4 text-sm">{form.email}</div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DetailUser;
