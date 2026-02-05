import { Footer } from '@/components/Layout/Footer';
import { Navbar } from '@/components/Layout/Navbar';
import React from 'react';

const CommonLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='h-screen'>
            <Navbar/>
            <div className='h-[calc(100vh-70px)]'>
                {children}
            </div>
        </div>
    );
};

export default CommonLayout;