import React, { useState, useEffect } from 'react';
import HomeLayout from '../layouts/HomeLayout';

export default function Contact() {
    const [formData, setFormData] = useState({
        nama: '',
        nomor_whatsapp: '',
        email: '',
        subject: '',
        message: ''
    });
    const [csrf, setCsrf] = useState('');
    const [flashMessage, setFlashMessage] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const csrfToken = document.querySelector('meta[name="csrf"]').getAttribute('content');
        setCsrf(csrfToken);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success === true) {
                setFlashMessage({ message: result.message, type: 'success' });
            } else {
                setFlashMessage({ message: result.message, type: 'error' });
            }

            setFormData({
                nama: '',
                nomor_whatsapp: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            setFlashMessage({ message: 'There was a problem with the fetch operation: ' + error.message, type: 'error' });
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <HomeLayout>
            <div className='lg:px-32 lg:py-10 grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='max-w-3xl p-5 bg-white shadow-md rounded-lg'>
                    <h1 className='text-2xl font-bold mb-4 text-gray-800'>Contact Us</h1>
                    {flashMessage.message && (
                        <div className={`mb-4 p-4 rounded ${flashMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {flashMessage.message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'>
                            <div>
                                <label htmlFor='nama' className='block text-sm font-medium text-gray-700'>Nama</label>
                                <input
                                    type='text'
                                    id='nama'
                                    name='nama'
                                    value={formData.nama}
                                    onChange={handleChange}
                                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='nomor_whatsapp' className='block text-sm font-medium text-gray-700'>Nomor WhatsApp</label>
                                <input
                                    type='number'
                                    id='nomor_whatsapp'
                                    name='nomor_whatsapp'
                                    value={formData.nomor_whatsapp}
                                    onChange={handleChange}
                                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='subject' className='block text-sm font-medium text-gray-700'>Subject</label>
                                <input
                                    type='text'
                                    id='subject'
                                    name='subject'
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='message' className='block text-sm font-medium text-gray-700'>Message</label>
                            <textarea
                                id='message'
                                name='message'
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                required
                            ></textarea>
                        </div>
                        <div className='text-right'>
                            <button
                                type='submit'
                                className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className='max-w-3xl p-5 bg-white shadow-md rounded-lg flex flex-col justify-center items-center text-center space-y-4'>
                    <p className='text-gray-800 text-lg'>
                        <strong>Email:</strong> <a href="mailto:indonesiakuhijaulestari@gmail.com" className='text-blue-500'>indonesiakuhijaulestari@gmail.com</a>
                    </p>
                    <p className='text-gray-800 text-lg'>
                        <strong>IG:</strong> <a href="https://www.instagram.com/indonesiakuhijaulestari/" className='text-blue-500'>@indonesiakuhijaulestari</a>
                    </p>
                    <p className='text-gray-800 text-lg'>
                        <strong>DONASI:</strong><br />
                        a/n. Indonesiaku Hijau Lestari<br />
                        Bank Mandiri cabang Batu<br />
                        144-xxx-xxx-xxxx-xx
                    </p>
                </div>
            </div>
            <div className='mt-8 text-gray-100 lg:px-96 md:px-64 bg-red-500 p-10'>
                <p className='font-semibold text-center'>PERHATIAN:</p>
                <p className='font-semibold text-center'>
                    "Setiap tindakan yang mengatasnamakan IHL untuk melakukan kegiatan illegal akan diproses melalui hukum yang berlaku, dan segala bentuk donasi harus melalui rekening Lembaga dan TIDAK melalui rekening pribadi masing-masing anggota"
                </p>
            </div>
        </HomeLayout>
    );
}
