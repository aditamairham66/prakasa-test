import React from 'react';
import {Head, usePage} from "@inertiajs/inertia-react";
import AdminLayout from '@/Layouts/AdminLayout';

const Home: React.FC = () => {
    const { props } = usePage();
    const { title } = props;

    return (
        <AdminLayout>
            <Head title={`${title}`}/>
            
            <h1>Welcome to Inertia.js with React and TypeScript!</h1>
        </AdminLayout>
    );
};

export default Home;
