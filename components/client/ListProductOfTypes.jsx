import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const ListProductOfTypes = ({ onVisible, type }) => {
  const divRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onVisible(type.id);
          }
        });
      },
      {
        threshold: 0.05, // Adjust this value as needed
      }
    );

    const currentDiv = divRef.current;
    if (currentDiv) {
      observer.observe(currentDiv);
    }

    return () => {
      if (currentDiv) {
        observer.unobserve(currentDiv);
      }
    };
  }, [type.id, onVisible]);

  
  const generateTempId = (id) => {
    const time = new Date().getTime()
    return time.toString().slice(0, 6) + id
  }
  return (
    <div ref={divRef} className="md:mt-10 mt-3" key={type.id} id={"type" + type.id}>
        <div className="md:text-lg text-base uppercase font-semibold">
            {type.name}
        </div>
        <div>
            {type.products.map((product) => (
                <Link href={"/product/" + generateTempId(product.id)} key={product.id} className="flex p-2 gap-3 items-center mt-3 animate-right-to-left shadow-md md:shadow-none bg-white rounded-md">
                    <div className="flex gap-3 w-full">
                        <Image className="w-15 h-15 rounded-md aspect-1/1 object-cover" src={product.image} width={100} height={100}/>
                        <div className="font-semibold">{product.name}</div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f89523" className="size-8 cursor-pointer">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                    </svg>
                </Link>
            ))}
        </div>
    </div>  
  );
};

export default ListProductOfTypes;
