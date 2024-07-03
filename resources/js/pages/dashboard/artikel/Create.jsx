import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { router } from '@inertiajs/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Image } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

const Create = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
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
            const response = await fetch('dashboard/artikel/create', {
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
            <h1 className="text-2xl font-bold mb-4">Create Artikel</h1>

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
                    <CKEditor
                        id="content"
                        name="content"
                        data={content}
                        onChange={(event, editor) => setContent(editor.getData())}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        editor={ ClassicEditor }
                        config={ {
                            toolbar: {
                                items: [ 'undo', 'redo', '|', 'bold', 'italic', 'paragraph', 'image' ],
                            },
                            plugins: [
                                Bold, Essentials, Italic, Mention, Paragraph, Undo
                            ]
                        } }
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
                    Create
                </button>
            </form>
        </DashboardLayout>
    );
};

export default Create;
