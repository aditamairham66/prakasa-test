import React from 'react';
import {Head, usePage} from "@inertiajs/inertia-react";
import AdminLayout from '@/Layouts/AdminLayout';

const User: React.FC = () => {
    const { props } = usePage();
    const { title } = props;
    
    return (
        <AdminLayout>
            <Head title={`${title}`}/>

            <h1>User</h1>
        </AdminLayout>
    );
};

export default User;
