import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Link, router, usePage } from '@inertiajs/react';

const Update = () => {
    const { artikel } = usePage().props;

    const [title, setTitle] = useState(artikel.title);
    const [content, setContent] = useState(artikel.content);
    const [image, setImage] = useState(artikel.image);
    const [csrf, setCsrf] = useState('');
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const csrfToken = document.querySelector('meta[name="csrf"]').getAttribute('content');
        setCsrf(csrfToken);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(artikel.id, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrf
                },
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                router.visit(data.redirect);
            } else {
                setFormErrors(data.errors || {});
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-4">Update Artikel</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    {formErrors.title && (
                        <div className="text-red-500 text-sm mt-1">{formErrors.title}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    {formErrors.content && (
                        <div className="text-red-500 text-sm mt-1">{formErrors.content}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    {formErrors.image && (
                        <div className="text-red-500 text-sm mt-1">{formErrors.image}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Update
                </button>
            </form>
        </DashboardLayout>
    );
};

export default Update;
