// components/ImageDropdown.js
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ImageDropdown({options, selected, setSelected}) {
    const [currentSelected, setCurrentSelected] = useState(null);
    useEffect(() => {
        if (!selected) {
            setCurrentSelected(options[0])
        }
        else {
            setCurrentSelected(selected)
        }
    }, [selected])

    useEffect(() => {
        setSelected(currentSelected)
    }, [currentSelected])
    const [show, setShow] = useState(false);
    return (
        currentSelected && <div className="relative inline-block text-left">
            <div>
                <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={() => setShow(!show)}
                >
                <Image className='w-8 h-8' src={currentSelected.icon} alt="" width={30} height={30} />
                </button>
            </div>

            {show && (
                <div className="absolute mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 overflow-auto max-h-40">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {options.map((option) => (
                        <div
                        key={option.value}
                        className="block px-4 py-2 cursor-pointer"
                        role="menuitem"
                        onClick={(e) => {
                            e.preventDefault();
                            setSelected(option);
                            setCurrentSelected(option)
                            setShow(false);
                        }}
                        >
                        <div className="flex items-center">
                            <Image className='w-8 h-8' src={option.icon} alt="" width={30} height={30} />
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>
    );
}