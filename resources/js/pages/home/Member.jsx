import React, { useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import HomeLayout from '../layouts/HomeLayout';

export default function Member() {
    const tableRef = useRef(null);
    const { member } = usePage().props;

    useEffect(() => {
        if (tableRef.current) {
            $(tableRef.current).DataTable();
        }

        return () => {
            $(tableRef.current).DataTable().destroy(true);
        };
    }, []);

    return (
        <HomeLayout>
            <div className='lg:px-32 lg:py-10'>
                <div className='overflow-x-auto py-5'>
                    <table ref={tableRef} className='table-auto min-w-full divide-y divide-gray-200'>
                        <thead>
                            <tr>
                                <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>No</th>
                                <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Nama</th>
                                <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Jabatan</th>
                                <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>KTA</th>
                                <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Wilayah</th>
                                <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {member.map((member) => (
                                <tr key={member.id}>
                                    <td className='px-6 py-4 whitespace-nowrap'>{member.id}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{member.nama}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{member.jabatan}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{member.kta}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{member.wilayah}</td>
                                    <td className={`px-6 py-4 whitespace-nowrap ${member.status === 'active' ? 'bg-green-600' : 'bg-red-600'}`}>
                                        <span className='text-white'>{member.status === 'active' ? 'Active' : 'Inactive'}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </HomeLayout>
    );
}
