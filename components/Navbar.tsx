"use client";

import React, { useState, useEffect } from 'react';
import { FaHome, FaHistory, FaTrophy } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type TabName = 'home' | 'history' | 'leaderboard';

export default function Navbar({ children }: { children?: React.ReactNode }) {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState<TabName>('home');

    useEffect(() => {
        if (pathname === '/') {
            setActiveTab('home');
        } else if (pathname === '/history') {
            setActiveTab('history');
        } else if (pathname === '/leaderboard') {
            setActiveTab('leaderboard');
        }
    }, [pathname]);

    return (
        <header>
            <div className="">
                <div className="nav">
                    <Link
                        href="/"
                        className={`link flex flex-col items-center ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-400`}
                        onClick={() => setActiveTab('home')}
                    >
                        <FaHome className="text-2xl mb-1" />
                        <span className="text-sm">Home</span>
                    </Link>

                    <Link
                        href="/history"
                        className={`link flex flex-col items-center ${activeTab === 'history' ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-400`}
                        onClick={() => setActiveTab('history')}
                    >
                        <FaHistory className="text-2xl mb-1" />
                        <span className="text-sm">History</span>
                    </Link>

                    <Link
                        href="/leaderboard"
                        className={`link flex flex-col items-center ${activeTab === 'leaderboard' ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-400`}
                        onClick={() => setActiveTab('leaderboard')}
                    >
                        <FaTrophy className="text-2xl mb-1" />
                        <span className="text-sm">Leader Board</span>
                    </Link>
                </div>
                {children}
            </div>
        </header>
    );
}
