import React, { useState, useEffect } from 'react';
import { Head, usePage } from "@inertiajs/inertia-react";
import AdminLayout from '@/Layouts/AdminLayout';
import { Post } from '@/types';

interface PageProps {
    title: string;
    form: Post;
}

const PostForm: React.FC = () => {
    // @ts-ignore
    const { props, url } = usePage<PageProps>();
    const { title, form }: PageProps = props;

    return (
        <AdminLayout>
            <Head title={`${title}`} />

            <div className="card">
                sda
            </div>
        </AdminLayout>
    );
};

export default PostForm;
