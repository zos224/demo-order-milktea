"use client"
import UploadImage from "@/components/admin/UploadImage";
import { useEffect, useState } from "react";

const StoreDataPage = () => {
    const [StoreData, setStoreData] = useState({
        name: '',
        address: '',
        openTime: '',
        closeTime: "",
        phone: '',
        image: '',
        thanks: ''
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchStoreData = async () => {
            const response = await fetch('/api/store')
            if (response.ok) {
                const data = await response.json()
                if (data) {
                    setStoreData(data)
                }
                else {
                    setStoreData({
                        name: '',
                        address: '',
                        openTime: '',
                        phone: '',
                        image: '',
                        thanks: ''
                    })
                }
                setLoading(false)
            }
        }
        fetchStoreData()
    }, [])

    const [errorAlert, setErrorAlert] = useState(null)
    const handleSubmit = async () => {
        const response = await fetch('/api/store', {
            method: "POST",
            body: JSON.stringify(StoreData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            setStoreData(data)
            setErrorAlert(null)
        }
        else {
            response.text().then(text => {
                setErrorAlert(text)
            })
        }
    }
    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Cài đặt thông tin cửa hàng</h2>
            </div>
            {!loading ? (
                <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <div class="w-full px-4 mx-auto">
                        <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                            Tên cửa hàng
                        </label>
                        <input value={StoreData.name} type="text" placeholder="Tên cửa hàng" onChange={(e) => setStoreData({...StoreData, name: e.target.value})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                        </div>
                    </div>
                    <div class="w-full px-4 mx-auto">
                        <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                            Địa chỉ
                        </label>
                        <input value={StoreData.address} type="text" placeholder="Địa chỉ cửa hàng" onChange={(e) => setStoreData({...StoreData, address: e.target.value})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                        </div>
                    </div>
                    <div class="w-full px-4 mx-auto">
                        <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                            Số điện thoại
                        </label>
                        <input value={StoreData.phone} type="text" placeholder="Số điện thoại" onChange={(e) => setStoreData({...StoreData, phone: e.target.value})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                        </div>
                    </div>
                    <div class="w-full px-4 mx-auto">
                        <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                            Giờ mở cửa
                        </label>
                        <input value={StoreData.openTime} type="time" placeholder="Giờ mở cửa" onChange={(e) => setStoreData({...StoreData, openTime: e.target.value})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                        </div>
                    </div>
                    <div class="w-full px-4 mx-auto">
                        <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                            Giờ đóng cửa
                        </label>
                        <input value={StoreData.closeTime} type="time" placeholder="Giờ đóng cửa" onChange={(e) => setStoreData({...StoreData, closeTime: e.target.value})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                        </div>
                    </div>
                    <div class="w-full px-4 mx-auto">
                        <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                            Lời cảm ơn
                        </label>
                        <input value={StoreData.thanks} type="text" placeholder="Lời cảm ơn" onChange={(e) => setStoreData({...StoreData, thanks: e.target.value})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                        </div>
                    </div>
                    <UploadImage label={"Ảnh bìa"} returnValue={(value) => setStoreData({...StoreData, image: value})} thumb={StoreData.image}/>
                    <div className="text-center my-5">
                        <button onClick={handleSubmit} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Xác nhận</button>
                    </div>
                    {errorAlert ? (
                        <div className="text-white mt-3 bg-red rounded-lg px-3 py-2">
                            {errorAlert}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <div className="flex justify-center mt-4" role="status">
                    <svg aria-hidden="true" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            )}
        </div>
    );
}

export default StoreDataPage;