<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ env('APP_NAME') }}</title>
    <link rel="icon" href="{{ asset('assets/images/favicon.png') }}" type="image/x-icon">
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@2"></script>
    @vite('resources/css/app.css')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>

<body x-data="{ language: localStorage.getItem('language') || 'en', isAnimating: false }" class="bg-green-400 min-h-screen flex flex-col items-center justify-center transition-colors duration-500">
    <div class="w-full md:w-auto fixed top-0 p-5 flex justify-between items-center animate-slide-left-to-right">
        <button @click="language = (language === 'id' ? 'en' : 'id'); localStorage.setItem('language', language); isAnimating = true; setTimeout(() => { isAnimating = false; }, 500)" class="px-4 py-2 bg-white text-gray-800 font-bold rounded transition-transform duration-300 hover:scale-105 animate-pulse shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
            </svg>  
        </button>
    </div>
    <div class="gap-8 px-4 md:px-16 lg:px-32 text-center animate-slide-bottom-to-top relative" :class="{ 'opacity-0': isAnimating }">
        <div class="my-5 flex justify-center items-center">
            <img src="{{ asset('assets/images/favicon.png')}}" alt="" class="size-32 shadow-lg rounded-full">
        </div>
        <div class="text-3xl md:text-5xl font-bold text-gray-700 transition-opacity duration-500 text-pretty" x-text="language === 'en' ? 'Page Under Construction' : 'Halaman Sedang Dalam Pengerjaan'"></div>
        <div class="mt-2 text-lg md:text-3xl font-bold text-gray-700 transition-opacity duration-500 text-pretty" x-text="language === 'en' ? 'This website is currently undergoing brief maintenance' : 'Website ini sedang menjalani pemeliharaan singkat'"></div>
        <div class="mt-8 flex justify-center items-center space-x-4 relative">
            <a href="mailto:indonesiakuhijaulestari@gmail.com" class="text-gray-700 hover:text-blue-500 transition-colors duration-300"><i class="fa-solid fa-envelope"></i></a>
            <a href="https://www.instagram.com/indonesiakuhijaulestari/" class="text-gray-700 hover:text-pink-500 transition-colors duration-300" target="_blank"><i class="fa-brands fa-instagram"></i></a>
        </div>
    </div>
    
    <footer class="text-gray-700 fixed bottom-0 text-center py-4 animate-slide-bottom-to-top" :class="{ 'opacity-0': isAnimating }">
        <p class="font-thin text-sm">&copy; {{ date('Y')}} {{ env('APP_NAME')}}. <span x-text="language === 'en' ? 'All rights reserved.' : 'Hak cipta dilindungi.'"></span></p>
    </footer>
</body>

</html>
