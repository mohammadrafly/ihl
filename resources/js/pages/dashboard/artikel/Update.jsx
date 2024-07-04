import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';

const Update = () => {
    const { artikel } = usePage().props;

    const [title, setTitle] = useState(artikel.title);
    const [content, setContent] = useState(artikel.content);
    const [image, setImage] = useState(null);
    const [csrf, setCsrf] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const editorRef = useRef(null);

    useEffect(() => {
        const csrfToken = document.querySelector('meta[name="csrf"]').getAttribute('content');
        setCsrf(csrfToken);
    }, []);

    const validateForm = () => {
        const errors = {};
        if (!title) {
            errors.title = 'Title is required';
        }
        if (!content) {
            errors.content = 'Content is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`dashboard/artikel/update/${artikel.id}`, {
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
                    <Editor
                        id="content"
                        name="content"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        apiKey='4ipzyok5srwk2ajz0j04i2q6g2gallzv6q4nd5fa1e1g476g'
                        onInit={(_evt, editor) => editorRef.current = editor}
                        initialValue={content}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onChange={(event, editor) => setContent(editor.getContent())}
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
