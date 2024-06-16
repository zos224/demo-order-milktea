    import { useRef, useState, useEffect } from 'react';

export default function ScrollPicker({ items, returnValue }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const pickerRef = useRef(null);

    const handleScroll = () => {
        const element = pickerRef.current;
        const scrollCenter = element.scrollTop + element.offsetHeight / 2;
        const newIndex = Math.round(scrollCenter / element.scrollHeight * items.length);
        if (newIndex !== selectedIndex) {
        setSelectedIndex(newIndex);
        }
    };

    useEffect(() => {
        returnValue(items[selectedIndex]);
    }, [selectedIndex]);


    return (
        <div
        ref={pickerRef}
        className="overflow-auto h-40 w-full"
        onScroll={handleScroll}

        >
        <div className="flex flex-col items-center justify-center py-10">
            {items.map((item, index) => (
            <div
                key={index}
                className={`w-full font-bold cursor-pointer text-2xl text-center py-1 ${selectedIndex === index ? '' : 'text-bodydark'}`}
                onClick={() => {
                    setSelectedIndex(index)
                }}
            >
                {item}
            </div>
            ))}
        </div>
        </div>
    );
}