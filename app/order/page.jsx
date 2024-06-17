"use client"

import { CardContext } from "@/components/client/CardProvider"
import ScrollSelect from "@/components/client/ScrollSelect"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useContext } from "react"

const OrderPage = () => {
    const router = useRouter()
    const [storeData, setStoreData] = useState(null)
    const {card, updateCard, infoUser, updateInfoUser} = useContext(CardContext)
    const [showModalInfo, setShowModalInfo] = useState(false)
    const [addAddress, setAddAddress] = useState(false)
    const [showModalTime, setShowModalTime] = useState(false)
    const [loading, setLoading] = useState(true)

    const [order, setOrder] = useState({
        listProduct: [],
        total: 0,
        name: "",
        address: "",
        phone: "",
        type: "giaohang",
        note: "",
        orderTime: "asap",
        paymentMethod: "tienmat"
    })

    useEffect(() => {
        if (card.length > 0 && infoUser.length > 0) {
            setOrder({...order, listProduct: card, total: card.reduce((acc, cur) => acc + cur.total, 0), name: infoUser[0].name, address: infoUser[0].address, phone: infoUser[0].phone})
        }
    }, [card, infoUser])

    const [newAddressData, setNewAddressData] = useState({
        name: "",
        phone: "",
        address: ""
    })

    const [orderTime, setOrderTime] = useState({
        day: "Hôm nay",
        hour: "0",
        minute: "0"
    })

    const [showModalPayment, setShowModalPayment] = useState(false)

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
        fetchStoreData()
    }, [])

    useEffect(() => {
        if (storeData) {
            setLoading(false)
        }
    }, [storeData])

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

    const getThreeDays = () => {
        const today = new Date();
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        const threeDays = new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000);
        const listDays = ["Hôm nay", "Ngày mai " + tomorrow.toLocaleDateString().split("/").splice(0, 2).join("/"), "Ngày kia " + threeDays.toLocaleDateString().split("/").splice(0, 2).join("/")];
        return listDays;
    }

    const showDate = () => {
        const hour = parseInt(orderTime.hour) < 10 ? "0" + orderTime.hour : orderTime.hour;
        const minute = parseInt(orderTime.minute) < 10 ? "0" + orderTime.minute : orderTime.minute;
        return orderTime.day + ", " + hour + ":" + minute
    }

    const processOrder = async () => {
        const response = await fetch('/api/order/create', {
            method: 'POST',
            body: JSON.stringify(order)
        })
        if (response.ok) {
            router.push("/order/success")
        }
    }

    useEffect(() => {
        if (order.orderTime != "asap") {
            setOrder({...order, orderTime: showDate()})
        }
    }, [order.orderTime, orderTime])

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
        <div className="bg-white w-full h-screen">
            <div className="xl:w-2/3 md:w-full md:px-2 mx-auto ">
                <div className="flex pt-5 gap-3 items-center">
                    <svg onClick={() => router.push("/")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <span className="text-2xl font-semibold">Thông tin giỏ hàng</span>
                </div>
                <div className="flex md:flex-row flex-col md:gap-10 mt-5">
                    <div className="w-full">
                        <div className="flex">
                            <button onClick={() => setOrder({...order, type: "giaohang"})} className={`w-full py-2 rounded-md ${order.type === "giaohang" ? "bg-graydark text-white" : "bg-gray"}`}>
                                Giao hàng
                            </button>
                            <button onClick={() => setOrder({...order, type: "tudenlay"})} className={`w-full py-2 rounded-md ${order.type === "tudenlay" ? "bg-graydark text-white" : "bg-gray"}`}>
                                Tự đến lấy
                            </button>
                        </div>
                        <div className="bg-gray md:mt-5 mt-2 rounded-md p-3">
                            <div className="flex items-center relative gap-4">
                                <div className="rounded-full size-4 bg-red after:top-7.5 after:bottom-0 after:left-[8px] after:absolute after:w-[1px] after:content-[' '] after:bg-bodydark"> </div>
                                {order.type === "giaohang" ? ( 
                                    <div>
                                        <div className="">{storeData.name}</div>
                                        <div className="text-sm">{storeData.address}</div>
                                    </div>
                                ) : (
                                    <div className="flex justify-between w-full items-center">
                                        <div>
                                            <div className="">{order.name + " - " + order.phone}</div>
                                            <div className="text-sm">Địa chỉ của bạn</div>
                                        </div>
                                        <div onClick={() => setShowModalInfo(true)} className="text-amber-500 cursor-pointer flex justify-end">Sửa</div>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center relative pt-5 gap-4">
                                <div className="w-[18px] rounded-full size-4 bg-green-500 before:top-0 before:bottom-7 before:left-[8px] before:absolute before:w-[1px] before:content-[' '] before:bg-bodydark"> </div>
                                {
                                    order.type == "giaohang" ? (
                                        <div className="flex justify-between w-full items-center">
                                            <div>
                                                <div className="">{order.name + " - " + order.phone}</div>
                                                <div className="text-sm">{order.address}</div>
                                            </div>
                                            <div onClick={() => setShowModalInfo(true)} className="text-amber-500 cursor-pointer flex justify-end">Sửa</div>
                                        </div>
                                    ) : (
                                        <div className="w-full">
                                            <div className="">{storeData.name}</div>
                                            <div className="text-sm">{storeData.address}</div>
                                        </div>
                                    )
                                }
                               
                            </div>
                            <div className="flex items-center gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <div className="w-full mt-3">
                                    <div className="">Thời gian muốn nhận</div>
                                    <div className="text-sm">{order.orderTime == "asap" ? "Càng sớm càng tốt" : showDate()}</div>
                                </div>
                                <div onClick={() => setShowModalTime(true)} className="text-amber-500 cursor-pointer">Sửa</div>
                            </div>
                        </div>
                        <div className="md:mt-5 mt-2 rounded-md bg-gray p-3 flex justify-between">
                            <div>
                                <div className="font-semibold">Phương thức thanh toán</div>
                                <div className="">{order.paymentMethod == "tienmat" ? "Thanh toán tiền mặt khi nhận hàng" : "Chuyển khoản ngân hàng"}</div>
                            </div>
                            <div onClick={() => setShowModalPayment(true)} className="text-amber-500 cursor-pointer">Sửa</div>
                        </div>
                        <div className="md:mt-5 mt-2 rounded-md bg-gray p-3">
                            <div className="font-semibold">Món đã chọn</div>
                            {card.map((product, index) => (
                                <Link href={"/product/" + generateTempId(product.idProduct) + "/" + index} className={`mt-2 cursor-pointer ${index != card.length - 1 ? "border-b border-bodydark" : ""} `} key={index}>
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
                        <div className="md:mt-5 mt-2 rounded-md bg-gray p-3">
                            <div className='w-full relative'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute left-1 top-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                                <textarea type="text" value={order.note} onChange={(e) => setOrder({...order, note: e.target.value})} rows={3} placeholder='Ghi chú cho đơn hàng' className='ps-7 w-full border border-bodydark rounded-md p-3 outline-none' />
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-gray p-3 rounded-md">
                        <div className="flex justify-between border-b border-bodydark py-2">
                            <div>Tổng cộng {card.reduce((total, product) => total + product.quantity, 0)} phần</div>
                            <div>{formatCurrencyVND(card.reduce((total, product) => total + product.total, 0))}</div>
                        </div>
                        <div className="border-b border-bodydark py-4 ">
                            {storeData.fee}
                        </div>
                        <div className="flex justify-between font-bold mt-4 text-lg pb-20 md:pb-0">
                            <div>Tiền phải thanh toán</div>
                            <div>{formatCurrencyVND(card.reduce((total, product) => total + product.total, 0))}</div>
                        </div>
                        <button onClick={() => processOrder()} className="mt-4 w-full py-3 bg-amber-500 font-semibold rounded-md text-white fixed md:static bottom-0 left-0 right-0">Đặt hàng</button>
                    </div>
                </div>
            </div>
            {showModalInfo && (
                <div tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-opacity-30 bg-black">
                    <div class="absolute w-full max-w-xl max-h-full top-48 left-1/2 -translate-x-1/2">
                        <div class="relative bg-white rounded-lg shadow pb-4">
                            <div class="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    {addAddress ? "Thêm thông tin giao hàng" : "Chọn địa chỉ giao hàng"}
                                </h3>
                                <button onClick={() => {setShowModalInfo(false), setAddAddress(false)}} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            {addAddress ? ( 
                                <div className="px-4 py-2 text-center">
                                    <div className="flex md:flex-row flex-col gap-3">
                                        <input type="text" placeholder="Tên người nhận" value={newAddressData.name} onChange={(e) => setNewAddressData({...newAddressData, name: e.target.value})} className="w-full border border-bodydark rounded-md p-2 outline-none" />
                                        <input type="text" placeholder="Số điện thoại" value={newAddressData.phone} onChange={(e) => setNewAddressData({...newAddressData, phone: e.target.value})} className="w-full border border-bodydark rounded-md p-2 outline-none" />
                                    </div>
                                    <input type="text" placeholder="Địa chỉ" value={newAddressData.address} onChange={(e) => setNewAddressData({...newAddressData, address: e.target.value})} className="w-full border border-bodydark rounded-md p-2 outline-none mt-4"></input>
                                    <button className="px-4 py-2 bg-amber-500 rounded-md text-white mt-4" onClick={() => {
                                        if (newAddressData.name && newAddressData.phone && newAddressData.address) {
                                            updateInfoUser([...infoUser, newAddressData])
                                            setOrder({...order, address: newAddressData.address, name: newAddressData.name, phone: newAddressData.phone})
                                            setAddAddress(false)
                                        }
                                    }}>Xác nhận</button>
                                </div>
                            ) : (
                                <div className="px-4 py-2">
                                    {order.type === "giaohang" ? (
                                        <div>
                                            {
                                                infoUser.map((info, index) => (
                                                    <div onClick={() => setOrder({...order, address: info.address, name: info.name, phone: info.phone}) } key={index} className={`mt-4 rounded-md cursor-pointer border ${order.address === info.address ? "border-amber-500 bg-amber-100" : "border-bodydark"} p-2`}>
                                                        <div className="font-semibold">{info.address}</div>
                                                        <div>{info.name} - {info.phone}</div>
                                                    </div>
                                                ))
                                            }
                                            <div onClick={() => setAddAddress(true)} className="mt-4 text-amber-500 text-center flex items-center justify-center gap-1 cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                Thêm địa chỉ
                                            </div> 
                                        </div>   
                                    ) : (
                                        <div className="text-center">
                                            <div className="flex md:flex-row flex-col gap-3">
                                                <input type="text" placeholder="Tên người nhận" value={order.name} onChange={(e) => setOrder({...order, name: e.target.value})} className="w-full border border-bodydark rounded-md p-2 outline-none" />
                                                <input type="text" placeholder="Số điện thoại" value={order.phone} onChange={(e) => setOrder({...order, phone: e.target.value})} className="w-full border border-bodydark rounded-md p-2 outline-none" />
                                            </div>
                                            <button className="px-4 py-2 bg-amber-500 rounded-md text-white mt-4" onClick={() => setShowModalInfo(false)}>Xác nhận</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )} 
            {showModalTime && (
                <div tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-opacity-30 bg-black">
                    <div class="absolute w-full max-w-xl max-h-full top-48 left-1/2 -translate-x-1/2">
                        <div class="relative bg-white rounded-lg shadow pb-4">
                            <div class="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Thời gian muốn nhận
                                    <div className="font-normal text-base">{showDate()}</div>
                                </h3>
                                <button onClick={() => {setShowModalTime(false)}} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="px-4 py-2 text-center">
                                <div className="flex gap-2">
                                    <ScrollSelect items={order.orderTime != "asap" ? getThreeDays() : ["Hôm nay"]} returnValue={(value) => setOrderTime({...orderTime, day: value})}/>
                                    <ScrollSelect items={order.orderTime != "asap" ?  Array.from({length: 24}, (_, i) => i) : [0]} returnValue={(value) => setOrderTime({...orderTime, hour: value})} />
                                    <ScrollSelect items={order.orderTime != "asap" ?  Array.from({length: 12}, (_, i) => i * 5) : [0]} returnValue={(value) => setOrderTime({...orderTime, minute: value})} />
                                </div>
                                <div className="flex items-center gap-2 justify-center mt-5">
                                    <input 
                                        onChange={(e) => setOrder(prev => ({...prev, orderTime: e.target.checked ? "asap" : ""}))}
                                        type="checkbox" 
                                        checked={order.orderTime === "asap"}
                                        className="peer relative appearance-none w-5 h-5 border-2 border-bodydark checked:border-amber-500 checked:bg-amber-500"
                                    ></input>
                                    <span>Càng sớm càng tốt</span>
                                </div>
                                <button className="px-4 py-2 bg-amber-500 rounded-md text-white mt-4" onClick={() => setShowModalTime(false)}>Xác nhận</button>
                            </div>
                        </div>
                    </div>
                </div>
            )} 
            {showModalPayment && (
                <div tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-opacity-30 bg-black">
                    <div class="absolute w-full max-w-xl max-h-full top-48 left-1/2 -translate-x-1/2">
                        <div class="relative bg-white rounded-lg shadow pb-4">
                            <div class="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Hình thức thanh toán
                                </h3>
                                <button onClick={() => {setShowModalPayment(false)}} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="px-4 py-2 text-center">
                                <select className="w-full px-4 py-2 rounded-md border-2 border-body" value={order.paymentMethod} onChange={(e) => setOrder({...order, paymentMethod: e.target.value})}>
                                    <option value={"tienmat"}>Thanh toán tiền mặt</option>
                                    <option value={"chuyenkhoan"}>Chuyển khoản ngân hàng</option>
                                </select>
                                {
                                    order.paymentMethod === "chuyenkhoan" && (
                                        <Image className="max-w-50 aspect-square mx-auto my-4" src="/images/bank.jpg" width={200} height={200} />
                                    )
                                }
                                <button className="px-4 py-2 bg-amber-500 rounded-md text-white mt-4" onClick={() => setShowModalPayment(false)}>Xác nhận</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ))
}

export default OrderPage