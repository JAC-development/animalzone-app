'use client';
import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function Admin() {
  const [openTab, setOpenTab] = useState('viewUsers');
  return (
    <div className="px-8 py-12 lg:px-14 xl:px-24">
      {/* Main section */}
      <div>
        {/* Welcome message */}
        <div>
          <p className="text-gray-400">ANIMAL ZONE</p>
          <p className="text-4xl py-2">Hello, Cesar!</p>
          <p className="text-gray-400">Have a nice management!</p>
        </div>

        {/* Report quick action block */}
        <div className="py-8">
          <button className="col-span-1 md:col-start-8 bg-yellow-400 py-3 px-8 rounded-full flex items-center justify-center font-semibold">
            Generate report
            <span className="pl-2">
              <ChevronRightIcon className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>

      {/* Quick view on list (Users and Organization details) */}
      <div>
        <div>
          <ul className="flex items-center justify-start">
            <li>
              <button
                onClick={() => setOpenTab('viewUsers')}
                className={`inline-block p-2 text-gray-600 ${openTab === 'viewUsers' ? 'font-bold border-b-2 border-black' : 'font-regular text-gray-400'}`}
              >
                Employees
              </button>
            </li>
            <li>
              <button
                onClick={() => setOpenTab('viewOrganization')}
                className={`inline-block p-2 text-gray-600 ${openTab === 'viewOrganization' ? 'font-bold border-b-2 border-black' : 'font-regular text-gray-400'}`}
              >
                My Organization
              </button>
            </li>
          </ul>
          <div className="p-3 mt-6 bg-white border">
            <div className={openTab === 'viewUsers' ? 'block' : 'hidden'}> React JS with Tailwind CSS Tab 1 Content show</div>
            <div className={openTab === 'viewOrganization' ? 'block' : 'hidden'}>React JS with Tailwind CSS Tab 2 Content show</div>
          </div>
        </div>
      </div>
    </div>
  );
}
