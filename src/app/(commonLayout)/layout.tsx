import { Footer } from '@/components/Layout/Footer';
import { Navbar } from '@/components/Layout/Navbar';
import React from 'react';

const CommonLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <Navbar/>
            <div className='h-[calc(100vh-70px)]'>
                {children}
            </div>
            {/* <Footer/> */}
        </div>
    );
};

export default CommonLayout;