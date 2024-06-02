import React, { useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Post } from '@/types';
import Quill from 'quill';
import flatpickr from 'flatpickr';
import { Inertia } from '@inertiajs/inertia';

interface PageProps {
    title: string;
    form: Post;
    errors: {
        title?: string;
        date?: string;
        image?: string;
        desc?: string;
    };
}

const PostForm: React.FC = () => {
    // @ts-ignore
    const { props } = usePage<PageProps>();
    const { title, form, errors } = props;

    const { data, setData } = useForm({
        title: form.title || '',
        date: form.date || '',
        image: form.image || '',
        desc: form.desc || '',
    });

    useEffect(() => {
        const descContainer = document.querySelector('#descContent') as HTMLElement;
        const descInput = document.querySelector('#desc') as HTMLTextAreaElement;
        if (descContainer) {
            descContainer.style.height = '200px';
            const quillDesc = new Quill('#descContent', {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ font: [] }, { size: [] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ color: [] }, { background: [] }],
                        [{ script: 'super' }, { script: 'sub' }],
                        [{ header: [false, 1, 2, 3, 4, 5, 6] }, 'blockquote', 'code-block'],
                        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                        ['direction', { align: [] }],
                        ['link', 'image', 'video'],
                        ['clean'],
                    ],
                },
            });

            quillDesc.on('text-change', () => {
                const newValue = quillDesc.root.innerHTML;
                if (descInput) {
                    descInput.value = newValue;
                    setData(prevData => ({ ...prevData, desc: newValue }));
                }
            });
        }
    }, []);

    useEffect(() => {
        const datepickerElement = document.querySelector(".datepicker") as HTMLInputElement;
        if (datepickerElement) {
            flatpickr(datepickerElement, {
                dateFormat: "Y-m-d",
                onChange: function(selectedDates, dateStr, instance) {
                    setData(prevData => ({ ...prevData, date: dateStr }));
                },
            });
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files) {
            setData(name, files[0]);
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.id) {
          Inertia.post('/post', data, { forceFormData: true });
        } else {
          Inertia.post(`/post/${form.id}?_method=PUT`, data, { forceFormData: true });
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
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="form-input mt-1"
                                placeholder="Enter Title"
                                aria-describedby="input-helper-text"
                                value={data.title}
                                onChange={handleInputChange}
                            />
                            {errors.title && <div className="pristine-error text-help" role="alert">{errors.title}</div>}
                        </div>
                        <div>
                            <label className="self-stretch h-[18px] text-xs font-semibold font-['Poppins']">
                                Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="date"
                                id="date"
                                className="form-input datepicker mt-1"
                                placeholder="Enter Date"
                                aria-describedby="input-helper-text"
                                value={data.date}
                                onChange={handleInputChange}
                            />
                            {errors.date && <div className="pristine-error text-help" role="alert">{errors.date}</div>}
                        </div>
                    </div>

                    <div className="mt-3">
                        <label className="self-stretch h-[18px] text-xs font-semibold font-['Poppins']">Image</label>
                        <div className="mt-1">
                            {form.image ? (
                                <>
                                    <div className="grid grid-cols-5">
                                        <img alt="gallery" className="object-cover object-center rounded" src={`/${form.image}`} />
                                    </div>
                                    <Link
                                        href={`/post/delete-image/${form.id}?field=image`}
                                        className="delete-button-img inline-flex items-center gap-2 rounded-md border border-transparent bg-red-500 px-4 py-1 mt-2 text-sm font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none"
                                    >
                                        <i className="mgc_home_3_line"></i> Delete
                                    </Link>
                                </>
                            ) : (
                                <div className="w-36 h-[209px] flex-col justify-start items-start gap-6 inline-flex">
                                    <img
                                        className="w-36 h-36 rounded-full"
                                        id="preview-image"
                                        src="https://via.placeholder.com/144x144"
                                        alt="Preview"
                                    />
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        className="hidden"
                                        accept="image/*"
                                        aria-describedby="input-helper-text"
                                        upload="file"
                                        onChange={handleInputChange}
                                    />
                                    <label
                                        htmlFor="image"
                                        className="self-stretch px-6 py-2.5 rounded-lg border border-rose-200 justify-center items-center gap-2.5 inline-flex cursor-pointer"
                                    >
                                        <div className="text-red-600 text-sm font-medium font-['Poppins']">Browse</div>
                                    </label>
                                </div>
                            )}
                        </div>
                        {errors.image && <div className="pristine-error text-help" role="alert">{errors.image}</div>}
                    </div>

                    <div className="mt-3">
                        <label className="self-stretch h-[18px] text-xs font-semibold font-['Poppins']">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <div id="descContent" className="form-input mt-1" dangerouslySetInnerHTML={{ __html: form.desc }}></div>
                        <textarea
                            name="desc"
                            id="desc"
                            className="form-input hidden"
                            placeholder="Enter Description"
                            value={form.desc}
                            onChange={handleInputChange}
                        ></textarea>
                        {errors.desc && <div className="pristine-error text-help" role="alert">{errors.desc}</div>}
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
