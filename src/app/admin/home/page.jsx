'use client';
import React from 'react';
import { ChevronRightIcon, EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function Admin() {
  const show = true;
  const [openTab, setOpenTab] = useState('viewUsers');
  return (
    <div className="px-8 py-12 lg:px-14 xl:px-24">
      {/* Main section */}
      <div>
        {/* Welcome message */}
        <div>
          <p className="text-gray-400">ANIMAL ZONE</p>
          <p className="text-4xl py-2">Hello, Cesar!</p>
          <p className="text-gray-400">Have a nice management</p>
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
          <div className="">
            <div className={openTab === 'viewUsers' ? 'block' : 'hidden'}>
              {show ? (
                /* Table for list of users */
                <div id="employees-table" className="w-full">
                  <table className="block md:table py-8 mx-auto w-full max-w-full overflow-x-auto">
                    <tbody className="whitespace-nowrap">
                      <tr className="bg-gray-200">
                        <td className="px-10 py-5 text-center">
                          <div className="flex items-center justify-center gap-4">
                            <div className="w-8 h-8 bg-black rounded-full"></div>
                            <p>Miriam Rodriguez</p>
                          </div>
                        </td>
                        <td className="px-10 py-5 text-center">43 Assists</td>
                        <td className="px-10 py-5 text-center">
                          <button>
                            <span>
                              <EllipsisHorizontalCircleIcon className="w-10 h-10" />
                            </span>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-10 py-5 text-center">
                          <div className="flex items-center justify-center gap-4">
                            <div className="w-8 h-8 bg-black rounded-full"></div>
                            <p>Victor Carrillo</p>
                          </div>
                        </td>
                        <td className="px-10 py-5 text-center">22 Assists</td>
                        <td className="px-10 py-5 text-center">
                          <button>
                            <span>
                              <EllipsisHorizontalCircleIcon className="w-10 h-10" />
                            </span>
                          </button>
                        </td>
                      </tr>
                      <tr className="bg-gray-200">
                        <td className="px-10 py-5 text-center">
                          <div className="flex items-center justify-center gap-4">
                            <div className="w-8 h-8 bg-black rounded-full"></div>
                            <p>Jonathan Ocampo</p>
                          </div>
                        </td>
                        <td className="px-10 py-5 text-center">13 Assists</td>
                        <td className="px-10 py-5 text-center">
                          <button>
                            <span>
                              <EllipsisHorizontalCircleIcon className="w-10 h-10" />
                            </span>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-10 py-5 text-center">
                          <div className="flex items-center justify-center gap-4">
                            <div className="w-8 h-8 bg-black rounded-full"></div>
                            <p>Carlos Sanchez</p>
                          </div>
                        </td>
                        <td className="px-10 py-5 text-center">9 Assists</td>
                        <td className="px-10 py-5 text-center">
                          <button>
                            <span>
                              <EllipsisHorizontalCircleIcon className="w-10 h-10" />
                            </span>
                          </button>
                        </td>
                      </tr>
                      <tr className="bg-gray-200">
                        <td className="px-10 py-5 text-center">
                          <div className="flex items-center justify-center gap-4">
                            <div className="w-8 h-8 bg-black rounded-full"></div>
                            <p>David Aguirre</p>
                          </div>
                        </td>
                        <td className="px-10 py-5 text-center">3 Assists</td>
                        <td className="px-10 py-5 text-center">
                          <button>
                            <span>
                              <EllipsisHorizontalCircleIcon className="w-10 h-10" />
                            </span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Empty data holder */
                <div className="w-full">
                  <p className="text-center py-12 text-gray-400">No recent activity</p>
                </div>
              )}
            </div>
            <div className={openTab === 'viewOrganization' ? 'block' : 'hidden'}>
              {!show ? (
                /* Organization info */
                <div id="employees-table" className="w-full">
                  <h1>Animal Zone</h1>
                </div>
              ) : (
                /* Empty data holder */
                <div className="w-full">
                  <p className="text-center py-12 text-gray-400">No info to show</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
