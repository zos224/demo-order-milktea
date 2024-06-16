import Image from 'next/image'
import { useState, useEffect } from 'react'
const ModalSearch = ({openModal, closeModal, setProduct}) => {
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState([])
    const [productShow, setProductShow] = useState([])
    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch('/api/product/all')
            const data = await res.json()
            setProducts(data)
        }
        fetchProduct()
    }, [])

    useEffect(() => {
        setProductShow(products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())))
    }, [search, products])

    const [animation, setAnimation] = useState("animate-zoom-in")
    useEffect(() => {
        if (openModal) {
            setAnimation("animate-zoom-in")
        }
        else {
            setAnimation("animate-zoom-out")
        }
    }, [openModal])

    const close = () => {
        closeModal()
        setSearch("")
    }
    return (
        openModal && (
            <div tabindex="-1" className={`fixed bg-white top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-full transition-opacity duration-300 ${animation} `}>
                <div className="relative w-full">
                    <div className='flex fixed top-0 w-full bg-gray'>
                        <button onClick={close} type="button" className="text-black bg-gray p-2 ml-auto inline-flex justify-center items-center" >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className="flex p-1 gap-2 border-2 border-black bg-gray rounded-md w-full m-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="w-full bg-gray text-black outline-none placeholder:text-body" placeholder="Bạn đang cần tìm món gì?"/>
                        </div>
                    </div>
                    <div className='my-5 grid grid-cols-2'>
                        {productShow.map((product, index) => (
                            <div onClick={() => setProduct(product.id)} className='border p-2 border-gray' key={index}>
                                <Image className='rounded-md w-full aspect-4/3 object-cover' src={product.image} alt={product.name} width={300} height={300} />
                                <div className='text-center font-semibold mt-2'>
                                    {product.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>  
        )
    )
}

export default ModalSearch
