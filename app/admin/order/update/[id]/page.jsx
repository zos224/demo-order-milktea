"use client"
import { useParams, useRouter } from "next/navigation"
import {useEffect, useState } from "react"
const CreateUpdateEvent = () => {
    const [order, setOrder] = useState(null)
    const route = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false)
    useEffect( () => {
        const getOrder = async () => {
            setLoading(true)
            const response = await fetch('/api/order/' + params.id)
            if (response.ok) {
                const existOrder = await response.json();
                setOrder(existOrder)
                setLoading(false)
            }
        }

        if (params.id) {
            getOrder()
        }
    }, [params.id])
    
    const [errorAlert, setErrorAlert] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        const formData = new FormData();
        formData.append("id", order.id);
        formData.append("paymentStatus", order.paymentStatus);
        formData.append("status", order.status);
        
        const response = await fetch('/api/order/update', {
            method: "PUT",
            body: formData
        })
        if (response.ok) {
            setErrorAlert(null)
            route.push("/admin/order")
        }
        else {
            response.text().then(text => {
                setErrorAlert(text)
            })
        }
        setSubmitting(false)
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
        <section class="py-1">
            <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                    <div class="rounded-t dark:bg-bodydark bg-white dark:text-black mb-0 px-6 py-3">
                        <div class="text-center flex justify-between">
                            <h6 class="text-xl font-bold">
                            Xem đơn hàng
                            </h6>
                        </div>
                    </div>
                    {!loading && order ? (
                        <div class="px-4 lg:px-10 py-10 w-full ">
                        <form onSubmit={handleSubmit}>
                            <div class="w-full px-4 mx-auto flex">
                                <div class="flex gap-3 w-full mb-3">
                                    <div>Tên người nhận: </div>
                                    <div>{order.name}</div>
                                </div>
                                <div class="flex gap-3 w-full mb-3">
                                    <div>Số điện thoại: </div>
                                    <div>{order.phone}</div>
                                </div>
                            </div>
                            {order.type == "giaohang" && (
                                <div class="w-full px-4 mx-auto flex">
                                    <div class="flex gap-3 w-full mb-3">
                                        <div>Địa chỉ: </div>
                                        <div>{order.address}</div>
                                    </div>
                                </div>
                            )}
                            <div class="w-full px-4 mx-auto flex">
                                <div class="flex gap-3 w-full mb-3">
                                    <div>Loại đơn hàng: </div>
                                    <div>{order.type == "giaohang" ? "Giao hàng" : "Tự đến lấy"}</div>
                                </div>
                                <div class="flex gap-3 w-full mb-3">
                                    <div>Thời gian muốn giao: </div>
                                    <div>{order.timeReceive}</div>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto flex">
                                <div class="flex gap-3 w-full mb-3">
                                    <div>Phương thức thanh toán: </div>
                                    <div>{order.paymentMethod}</div>
                                </div>
                                <div class="flex gap-3 w-full mb-3">
                                    <div>Tình trạng thanh toán: </div>
                                    <div>
                                        <select className="text-black px-3 py-1" value={order.paymentStatus} onChange={(e) => setOrder({...order, paymentStatus: e.target.value})}>
                                            <option className="text-black" value="false">Chưa thanh toán</option>
                                            <option className="text-black" value="true">Đã thanh toán</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto flex">
                                <div class="flex gap-3 w-full mb-3">
                                    <div>Tổng bill: {formatCurrencyVND(order.total)}</div>
                                </div>
                            </div>
                            <div>
                                <div class="w-full px-4 mx-auto flex">
                                    <div class="gap-3 w-full mb-3">
                                        <div className="font-bold">Sản phẩm: </div>
                                        <div className="mx-5 mt-2">
                                            {order.orderItems.map((item, index) => (
                                                <div key={index} class="flex gap-3 w-full mb-3">
                                                    <div className="w-full">{item.productSize.product.name + " - " + item.productSize.name}</div>
                                                    <div className="w-full">Số lượng: {item.quantity}</div>
                                                    <div className="w-full">Topping: 
                                                        {item.orderTopping.map((topping, index) => (
                                                            <div key={index}>{topping.topping.name + " x" + topping.quantity}</div>
                                                        ))}
                                                    </div>
                                                    <div className="w-full">Ghi chú: {item.note}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="w-full px-4 mx-auto mb-3">
                                    Ghi chú: {order.note}
                                </div>
                            </div>
                            <div class="w-full px-4 text-center">
                                <div class="gap-3 w-full mb-3">
                                    <div className="font-bold">Trạng thái: </div>
                                    <div className="mx-5 mt-2">
                                        <select className="text-black px-3 py-1" value={order.status} onChange={(e) => setOrder({...order, status: e.target.value})}>
                                            <option className="text-black" value={false}>Chưa hoàn thành</option>
                                            <option className="text-black" value={true}>Đã hoàn thành</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {!submitting ? (
                                <div className="text-center">
                                    <input type="submit" role="button" className="mt-10 cursor-pointer bg-black text-white dark:bg-whiten dark:text-black px-3 py-2 rounded-xl" value={'Cập nhật'}/>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <button className="mt-10 cursor-pointer bg-black text-white px-7 py-2 rounded-xl">
                                        <div role="status">
                                            <svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                            
                        </form>
                        {errorAlert ? (
                            <div className="text-white mt-3 bg-red rounded-lg px-3 py-2">
                                {errorAlert}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    ) : (
                        <div className="flex-center mt-2 mx-auto" role="status">
                            <svg aria-hidden="true" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CreateUpdateEvent