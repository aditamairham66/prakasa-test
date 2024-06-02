import React, { useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Post, User } from '@/types';
import Quill from 'quill';
import flatpickr from 'flatpickr';
import { Inertia } from '@inertiajs/inertia';

interface PageProps {
    title: string;
    form: User;
    errors: {
        name?: string;
        email?: string;
    };
}

const PostForm: React.FC = () => {
    // @ts-ignore
    const { props } = usePage<PageProps>();
    const { title, form, errors } = props;

    const { data, setData } = useForm({
        name: form.name || '',
        email: form.email || '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // @ts-ignore
        setData(name, value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.id) {
          Inertia.post('/user', data, { forceFormData: true });
        } else {
          Inertia.post(`/user/${form.id}?_method=PUT`, data, { forceFormData: true });
        }
    };

    return (
        <AdminLayout>
            <Head title={title} />

            <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                <div className="card p-6">
                    <div className="flex justify-between items-center mb-4">
                        <p className="card-title">{title}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                        <div>
                            <label className="self-stretch h-[18px] text-xs font-semibold font-['Poppins']">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-input mt-1"
                                placeholder="Enter Title"
                                aria-describedby="input-helper-text"
                                value={data.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && <div className="pristine-error text-help" role="alert">{errors.name}</div>}
                        </div>
                        <div>
                            <label className="self-stretch h-[18px] text-xs font-semibold font-['Poppins']">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-input datepicker mt-1"
                                placeholder="Enter Date"
                                aria-describedby="input-helper-text"
                                value={data.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <div className="pristine-error text-help" role="alert">{errors.email}</div>}
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="self-stretch h-[18px] text-xs font-semibold font-['Poppins']">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-input mt-1"
                            placeholder="Enter Title"
                            aria-describedby="input-helper-text"
                            onChange={handleInputChange}
                        />
                        {errors.password && <div className="pristine-error text-help" role="alert">{errors.password}</div>}
                    </div>

                    <div className="flex justify-start gap-3 mt-5">
                        <a href="#" onClick={e => history.back()} className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none">
                            Back
                        </a>
                        <button type="submit" className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
};

export default PostForm;
