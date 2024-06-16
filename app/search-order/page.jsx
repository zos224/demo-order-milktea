"use client"

import Link from "next/link"

const { useState } = require("react")

const SearchOrder = () => {
    const [searchKeyWord, setSearchKeyWord] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchSearch = () => {
        const fetchData = async () => {
            const res = await fetch('/api/order/search/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: searchKeyWord
                })
            })
            if (res.ok) {
                const data = await res.json()
                setSearchResult(data)
                setLoading(false)
            }
        }
        
        if (searchKeyWord != "") {
            setLoading(true)
            fetchData()
        }
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

    return (
        <div className="bg-white w-full min-h-screen">
            <div className="xl:w-2/3 md:w-full md:px-2 mx-auto pt-10">
                <div className="flex justify-between">
                    <Link href={"/"} type="button" className="md:absolute text-black bg-gray p-2 ml-auto inline-flex justify-center items-center" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <div className="flex p-2 gap-2 border border-body bg-gray rounded-md w-full max-w-xl mx-auto">
                        <input value={searchKeyWord} onChange={(e) => setSearchKeyWord(e.target.value)} type="text" className="w-full bg-gray text-black outline-none placeholder:text-body" placeholder="Nhập số điện thoại của bạn"/>
                        <svg onClick={() => fetchSearch()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-2 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </div>
                
                <div className="pt-10">
                    {loading ? (
                        <div class="flex items-center justify-center h-screen">
                            <div class="relative">
                                <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                                <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="">
                            {searchResult.map((item, index) => (
                                <div key={index} className="mt-5 rounded-md bg-gray shadow-md p-2"> 
                                    <div class="w-full px-4 mx-auto flex">
                                            <div class="flex gap-3 w-full mb-1">
                                                <div>Tên người nhận: </div>
                                                <div>{item.name}</div>
                                            </div>
                                            <div class="flex gap-3 w-full mb-1">
                                                <div>Số điện thoại: </div>
                                                <div>{item.phone}</div>
                                            </div>
                                        </div>
                                        {item.type == "giaohang" && (
                                            <div class="w-full px-4 mx-auto flex">
                                                <div class="flex gap-3 w-full mb-1">
                                                    <div>Địa chỉ: </div>
                                                    <div>{item.address}</div>
                                                </div>
                                            </div>
                                        )}
                                        <div class="w-full px-4 mx-auto flex">
                                            <div class="flex gap-3 w-full mb-1">
                                                <div>Loại đơn hàng: </div>
                                                <div>{item.type == "giaohang" ? "Giao hàng" : "Tự đến lấy"}</div>
                                            </div>
                                            <div class="flex gap-3 w-full mb-1">
                                                <div>Thời gian muốn giao: </div>
                                                <div>{item.timeReceive}</div>
                                            </div>
                                        </div>
                                        <div class="w-full px-4 mx-auto flex">
                                            <div class="flex gap-3 w-full mb-1">
                                                <div>Phương thức thanh toán: </div>
                                                <div>{item.paymentMethod}</div>
                                            </div>
                                            <div class="flex gap-3 w-full mb-1">
                                                <div>Tình trạng thanh toán: </div>
                                                <div>{item.paymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}</div>
                                            </div>
                                        </div>
                                        <div class="w-full px-4 mx-auto flex">
                                            <div class="flex gap-3 w-full mb-1">
                                                <div>Tổng bill: {formatCurrencyVND(item.total)}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="w-full px-4 mx-auto flex">
                                                <div class="gap-3 w-full mb-1">
                                                    <div className="font-bold">Sản phẩm: </div>
                                                    <div className="mx-5 mt-2">
                                                        {item.orderItems.map((i, index) => (
                                                            <div key={index} class="flex gap-3 w-full mb-1">
                                                                <div className="w-full">{i.productSize.product.name + " - " + i.productSize.name}</div>
                                                                <div className="w-full">Số lượng: {i.quantity}</div>
                                                                <div className="w-full">Topping: 
                                                                    {i.orderTopping.map((topping, index) => (
                                                                        <div key={index}>{topping.topping.name + " x" + topping.quantity}</div>
                                                                    ))}
                                                                </div>
                                                                <div className="w-full text-wrap">Ghi chú: {i.note}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-full px-4 mx-auto flex">
                                            <div class="flex gap-3 w-full mb-1">
                                                <div>Ghi chú: {item.note}</div>
                                            </div>
                                        </div>
                                        <div class="w-full px-4 ">
                                            <div class=" flex gap-3 w-full mb-1">
                                                <div className="font-bold">Trạng thái: </div>
                                                <div className="">{item.status ? "Đã hoàn thành" : "Chưa hoàn thành"}</div>
                                            </div>
                                        </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchOrder