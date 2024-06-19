"use client"
import { CardContext } from "@/components/client/CardProvider";
import ListProductOfTypes from "@/components/client/ListProductOfTypes";
import ModalSearch from "@/components/client/ModalSearch";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const HomePage = () => {
    const [storeData, setStoreData] = useState(null)
    const [types, setTypes] = useState(null)
    const [loading, setLoading] = useState(true)
    const {card, updateCard} = useContext(CardContext)
    const [search, setSearch] = useState('')
    const [showTypes, setShowTypes] = useState(null)
    const [curType, setCurType] = useState(-1)
    const [showSearch, setShowSearch] = useState(false)
    const [showAllTypes, setShowAllTypes] = useState(false)
    const handleScroll = (id) => {
       setCurType(id)
    };

    useEffect(() => {
        const fetchStoreData = async () => {
            const response = await fetch('/api/store')
            if (response.ok) {
                const data = await response.json()
                if (data) {
                    setStoreData(data)
                }
            }
        }
        const fetchTypes = async () => {
            const response = await fetch('/api/type-product/full')
            if (response.ok) {
                const data = await response.json()
                if (data) {
                    setTypes(data)
                }
            }
        }
        fetchStoreData()
        fetchTypes()
    }, [])

    useEffect(() => {
        if (storeData && types && card) {
            setLoading(false)
        }
    }, [storeData, types, card])

    useEffect(() => {
        if (types) {
            if (search == "") {
                setShowTypes(types)
            }
            else {
                const newTypes = types.map((type) => {
                    const newProducts = type.products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
                    if (newProducts.length > 0) {
                        return {
                            ...type,
                            products: newProducts
                        }
                    }
                    return null;
                }).filter((type) => type !== null);
                setShowTypes(newTypes)
            }
        }
    }, [search, types])

    const checkTime = (openTime, closeTime) => {
        const date = new Date()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const openTimeHour = openTime.split(":")[0]
        const openTimeMinute = openTime.split(":")[1]
        const closeTimeHour = closeTime.split(":")[0]
        const closeTimeMinute = closeTime.split(":")[1]
        const time = hour + minute / 60
        const openTimeCal = parseInt(openTimeHour) + parseInt(openTimeMinute) / 60
        const closeTimeCal = parseInt(closeTimeHour) + parseInt(closeTimeMinute) / 60  
    
        if (time >= openTimeCal && time <= closeTimeCal) {
            return true
        }
        return false
    }

    const scrollTo = (id) => {
        const element = document.getElementById(id)
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }


    const formatCurrencyVND = (amount) => {
        let reversedString = amount.toString().split('').reverse().join('');
        let formattedString = '';
        for (let i = 0; i < reversedString.length; i++) {
            formattedString += reversedString[i];
            if ((i + 1) % 3 === 0 && (i + 1) !== reversedString.length) {
                formattedString += '.';
            }
        }
        return formattedString.split('').reverse().join('') + ' đ';
    };

    // JavaScript
    useEffect(() => {
        const handleScrollMenu = () => {
            const stickyElement = document.querySelector('.menu');
            const childElement = stickyElement.querySelector('.visible-when-sticky');
            if (stickyElement.getBoundingClientRect().top <= 0.5) {
                // Div cha đang sticky
                if (childElement.classList.contains('hidden')) {
                    childElement.classList.remove('hidden');
                    childElement.classList.add('block');
                }
            } else {
                // Div cha không phải là sticky
                if (childElement.classList.contains('block')) {
                    childElement.classList.remove('block');
                    childElement.classList.add('hidden');
                }
            }
        }
        window.addEventListener('scroll', handleScrollMenu);

        return () => {
            window.removeEventListener('scroll', handleScrollMenu)
        }
    }, [])

    const generateTempId = (id) => {
        const time = new Date().getTime()
        return time.toString().slice(0, 6) + id
    }
    return (
        loading ? (
            <div class="flex items-center justify-center h-screen">
                <div class="relative">
                    <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                    </div>
                </div>
            </div>
        ) : (
            <div className="lg:w-2/3 w-full mx-auto">
                <div className="md:p-5 rounded-md flex md:flex-row flex-col md:gap-7 gap-2 bg-white relative">
                    <Image className="md:w-1/2 w-full md:aspect-21/9 aspect-video object-cover" src={storeData.image} width={800} height={600}/>
                    <div className="p-2 md:p-0">
                        <div className="font-bold md:text-3xl text-xl uppercase">{storeData.name}</div>
                        <div className="flex items-center gap-3 md:mt-3 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                            </svg>
                            <div className="md:text-lg text-base">{storeData.address}</div>
                        </div>
                        <div className="flex items-center gap-3 md:mt-3 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            {
                                checkTime(storeData.openTime, storeData.closeTime) ? (
                                    <div className="md:text-lg text-base text-green-500 ">Đang mở cửa: {storeData.openTime + " - " + storeData.closeTime }
                                    </div>
                                ) : (
                                    <div className="md:text-lg text-base text-red ">Đã đóng cửa: {storeData.openTime + " - " + storeData.closeTime }
                                    </div>
                                )
                            }
                            
                        </div>
                        <div className="flex items-center gap-3 md:mt-3 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                            <div className="md:text-lg text-base">Số điện thoại cửa hàng: {storeData.phone}</div>
                        </div>
                        <div className="flex p-1 gap-2 border-gray bg-gray rounded-md md:hidden mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <input value={search} onClick={() => setShowSearch(true)} type="text" className="w-full bg-gray text-black outline-none placeholder:text-body" placeholder="Bạn đang cần tìm món gì?"/>
                        </div>
                        <Link className="hidden md:flex absolute shadow-lg top-2 right-2 gap-2 bg-gray rounded-md px-2 py-3" href="/search-order">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#f59e0b" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>
                            Kiểm tra đơn hàng
                        </Link>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-4 md:mt-5">
                    <div className="menu md:bg-white bg-gray md:p-4 p-1 md:rounded-md md:w-2/12 w-full sticky top-0  md:top-5 h-max">
                        <div className="md:text-lg hidden md:block ">Thực đơn</div>
                        <div className="visible-when-sticky hidden text-center relative py-1 bg-white animate-left-to-right">
                            <div className="text-xl">{storeData.name}</div>
                            <div onClick={() => setShowSearch(true)} className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>     
                        </div>
                        <div className="flex items-stretch">
                            <div className="flex md:flex-col flex-row md:mt-2 overflow-x-hidden whitespace-nowrap border-t border-zinc-300 md:border-none w-full">
                                {
                                    showTypes.map((type) => (
                                        <button onClick={() => {scrollTo("type" + type.id); setCurType(type.id)}} key={type.id} className={`${curType === type.id ? "md:bg-gray text-amber-500 border-b-2 border-amber-500 md:text-black md:border-none" : "border-b border-zinc-300 md:border-none"} md:text-lg text-base font-bold md:font-normal md:animate-topbottom text-left w-full uppercase px-4 py-2 cursor-pointer hover:bg-gray md:rounded-md`}>{type.name}</button>
                                    ))
                                }
                            </div>
                            <div onClick={() => setShowAllTypes(true)} className="border-y border-zinc-300 flex items-center md:hidden cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className=" md:p-4 md:pb-0 pb-24  bg-white rounded-md md:w-6/12 w-full">
                        <div className="md:flex hidden p-1 gap-2 border-gray bg-gray rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="w-full bg-gray text-black outline-none placeholder:text-body" placeholder="Bạn đang cần tìm món gì?"/>
                        </div>
                        <div className="bg-gray md:bg-white p-2">
                            {showTypes.map((type) => (
                                <ListProductOfTypes onVisible={handleScroll} type={type}/>  
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:block bg-white p-4 rounded-md md:w-4/12 w-full h-max sticky top-5">
                        {
                            card.length > 0 ? (
                                <div>
                                    <div className="flex justify-between">
                                        <div className="font-semibold">Món bạn đã chọn</div>
                                        <svg onClick={() => updateCard([])} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer hover:text-red">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </div>
                                    <div className="mt-4">
                                        {card.map((product, index) => (
                                            <Link className="rounded-md shadow-md mt-2 cursor-pointer" href={"/product/" + generateTempId(product.idProduct) + "/" + index} key={index}>
                                                <div className="p-2">
                                                    <div className="flex justify-between">
                                                        <div className="font-semibold">
                                                            {product.quantity} x {product.name}
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-amber-500">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                        </svg>
                                                    </div>
                                                    <div className="text-body text-sm mt-1">
                                                        {product.size.name}
                                                        {product.topping.length > 0 && (
                                                            <span>
                                                                , {product.topping.map(topping => topping.name + " x" + topping.quantity).join(", ")}
                                                            </span>    
                                                        )}
                                                    </div>
                                                    {product.note && (
                                                        <div className="mt-1 flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                                            </svg>
                                                            <span className="ml-2 text-sm">{product.note}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-end">
                                                        {formatCurrencyVND(product.total)}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="border-t border-body mt-5">
                                        <div className="flex justify-between p-2 ">
                                            <div className="">
                                                Thành tiền {card.reduce((total, product) => total + product.quantity, 0)} phần
                                            </div>
                                            <div className="font-semibold">
                                                {formatCurrencyVND(card.reduce((total, product) => total + product.total, 0))}
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <Link href="/order">
                                                <button className="w-full bg-amber-500 text-white p-2 rounded-md font-semibold">Thanh toán</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Image src="/images/icon_cart_blank.svg" width={200} height={200} className="mx-auto w-2/3"/>
                                    <div className="mt-5 text-body">
                                        Không có món ăn nào trong giỏ hàng
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="fixed bottom-0 w-full flex justify-between bg-gray p-3 md:hidden">
                        <Link className="flex gap-2 bg-white rounded-md px-2 py-3" href="/search-order">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#f59e0b" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>
                            KT Đơn hàng
                        </Link>
                        <Link className="bg-amber-500 flex gap-2 rounded-md px-2 py-3 text-white" href="/order">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#f59e0b" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            Giỏ hàng ({card.reduce((total, product) => total + product.quantity, 0)})
                        </Link>
                    </div>
                </div>
                <ModalSearch openModal={showSearch} closeModal={() => setShowSearch(false)}  />
                {showAllTypes && <div tabindex="-1" aria-hidden="true" class=" md:hidden overflow-y-auto overflow-x-hidden fixed bottom-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-opacity-30 bg-black">
                    <div class="absolute w-full max-w-2xl max-h-full bottom-0 animate-bottomtop">
                        <div class="relative bg-white rounded-lg shadow pb-4">
                            <div class="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Thực đơn
                                </h3>
                                <button onClick={() => setShowAllTypes(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="px-4">
                                {showTypes.map((type) => (
                                    <div className="flex justify-between">
                                        <button onClick={() => {scrollTo("type" + type.id); setCurType(type.id); setShowAllTypes(false)}} key={type.id} className={`${curType === type.id ? " text-amber-500 " : ""} text-base text-left w-full uppercase py-2 cursor-pointer`}>{type.name}</button>
                                        {curType == type.id && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f59e0b" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        )} 
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    )
}

export default HomePage;
