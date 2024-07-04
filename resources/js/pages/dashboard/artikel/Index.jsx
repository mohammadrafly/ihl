import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import DashboardLayout from '../../layouts/DashboardLayout';

const Index = () => {
    const { artikel } = usePage().props;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [csrf, setCsrf] = useState('');
    const [flashMessage, setFlashMessage] = useState('');
    const [articles, setArticles] = useState(artikel);

    const tableRef = useRef(null);

    useEffect(() => {
        const csrfToken = document.querySelector('meta[name="csrf"]').getAttribute('content');
        setCsrf(csrfToken);

        if (tableRef.current) {
            $(tableRef.current).DataTable();
        }

        return () => {
            $(tableRef.current).DataTable().destroy(true);
        };
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this article?");
        if (!confirmDelete) {
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`dashboard/artikel/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf
                },
            });

            const data = await response.json();
            setLoading(false);

            if (data.success === true) {
                setFlashMessage("Article deleted successfully!");
                setArticles(articles.filter(article => article.id !== id));
            } else {
                setError("Failed to delete article");
            }
        } catch (error) {
            setError("Failed to delete article");
            setLoading(false);
        }
    };

    const truncateContent = (content, maxLength = 100) => {
        return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
    };

    return (
        <DashboardLayout>
            {flashMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
                    {flashMessage}
                </div>
            )}
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
                    {error}
                </div>
            )}
            <Link href="artikel/create" className="text-blue-500 hover:underline">Create New Article</Link>
            <table ref={tableRef} className="display dataTable">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">No</th>
                        <th className="py-2 px-4 border">Title</th>
                        <th className="py-2 px-4 border">Content</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article, index) => (
                        <tr key={article.id}>
                            <td className="py-2 px-4 border">{index + 1}</td>
                            <td className="py-2 px-4 border">{article.title}</td>
                            <td className="py-2 px-4 border">{truncateContent(article.content)}</td>
                            <td className="py-2 px-4 border">
                                <Link href={`artikel/update/${article.id}`} className="mr-2">View</Link>
                                <button
                                    onClick={() => handleDelete(article.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {loading && <div className="mt-4 text-gray-600">Loading...</div>}
        </DashboardLayout>
    );
};

export default Index;
