import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Link, router } from '@inertiajs/react';

const Create = () => {
    const [nama, setNama] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [kta, setKta] = useState('');
    const [wilayah, setWilayah] = useState('');
    const [status, setStatus] = useState('');
    const [csrf, setCsrf] = useState('');
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const csrfToken = document.querySelector('meta[name="csrf"]').getAttribute('content');
        setCsrf(csrfToken);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('jabatan', jabatan);
        formData.append('wilayah', wilayah);
        formData.append('status', status);
        formData.append('kta', kta);

        try {
            const response = await fetch('dashboard/member/create', {
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
            <h1 className="text-2xl font-bold mb-4">Create Member</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                        Nama
                    </label>
                    <input
                        type="text"
                        id="nama"
                        name="nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    {formErrors.nama && (
                        <div className="text-red-500 text-sm mt-1">{formErrors.nama}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="jabatan" className="block text-sm font-medium text-gray-700">
                        Jabatan
                    </label>
                    <input
                        id="jabatan"
                        name="jabatan"
                        value={jabatan}
                        onChange={(e) => setJabatan(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    {formErrors.jabatan && (
                        <div className="text-red-500 text-sm mt-1">{formErrors.jabatan}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="kta" className="block text-sm font-medium text-gray-700">
                        Kta
                    </label>
                    <input
                        id="kta"
                        name="kta"
                        value={kta}
                        onChange={(e) => setKta(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    {formErrors.kta && (
                        <div className="text-red-500 text-sm mt-1">{formErrors.kta}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="wilayah" className="block text-sm font-medium text-gray-700">
                        Wilayah
                    </label>
                    <input
                        id="wilayah"
                        name="wilayah"
                        value={wilayah}
                        onChange={(e) => setWilayah(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    {formErrors.wilayah && (
                        <div className="text-red-500 text-sm mt-1">{formErrors.wilayah}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                        <option value="" selected>Pilih Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    {formErrors.status && (
                        <div className="text-red-500 text-sm mt-1">{formErrors.status}</div>
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
