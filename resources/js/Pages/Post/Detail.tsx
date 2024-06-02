import React from 'react';
import { Head, usePage } from "@inertiajs/inertia-react";
import AdminLayout from '@/Layouts/AdminLayout';
import { Post } from '@/types';

interface PageProps {
    title: string;
    form: Post;
}

const DetailPost: React.FC = () => {
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
                            <span className="font-medium my-3 text-gray-800">Title</span>
                            <div className="text-gray-500 mb-4 text-sm">{form.title}</div>
                        </div>
                        <div>
                            <span className="font-medium my-3 text-gray-800">Date</span>
                            <div className="text-gray-500 mb-4 text-sm">{form.date}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                        <div>
                            <span className="font-medium my-3 text-gray-800">Image</span>
                            <a className="image-popup" href={`/${form.image}`} data-gallery="gallery1">
                                <div className="relative block w-1/4 overflow-hidden rounded group transition-all duration-500">
                                    <img src={`/${form.image}`} className="rounded transition-all duration-500 group-hover:scale-105" alt="post" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DetailPost;
