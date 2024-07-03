import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import DashboardLayout from '../../layouts/DashboardLayout';

const Index = () => {
    const { member } = usePage().props;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [csrf, setCsrf] = useState('');
    const [flashMessage, setFlashMessage] = useState('');
    const [members, setMembers] = useState(member);

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
        const confirmDelete = window.confirm("Are you sure you want to delete this member?");
        if (!confirmDelete) {
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`artikel/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf
                },
            });

            const data = await response.json();
            setLoading(false);

            if (data.success === true) {
                setFlashMessage("Member deleted successfully!");
                setMembers(members.filter(member => member.id !== id));
            } else {
                setError("Failed to delete member");
            }
        } catch (error) {
            setError("Failed to delete member");
            setLoading(false);
        }
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
            <Link href="member/create" className="text-blue-500 hover:underline">Create New Member</Link>
            <table ref={tableRef} className="display dataTable">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">No</th>
                        <th className="py-2 px-4 border">Nama</th>
                        <th className="py-2 px-4 border">Jabatan</th>
                        <th className="py-2 px-4 border">KTA</th>
                        <th className="py-2 px-4 border">Wilayah</th>
                        <th className="py-2 px-4 border">Status</th>
                        <th className="py-2 px-4 border">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <tr key={member.id}>
                            <td className="py-2 px-4 border">{index + 1}</td>
                            <td className="py-2 px-4 border">{member.nama}</td>
                            <td className="py-2 px-4 border">{member.jabatan}</td>
                            <td className="py-2 px-4 border">{member.kta}</td>
                            <td className="py-2 px-4 border">{member.wilayah}</td>
                            <td className="py-2 px-4 border">{member.status ? 'Active' : 'Inactive'}</td>
                            <td className="py-2 px-4 border">
                                <Link href={`artikel/update/${member.id}`} className="mr-2">View</Link>
                                <button
                                    onClick={() => handleDelete(member.id)}
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
