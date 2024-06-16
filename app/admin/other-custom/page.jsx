"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import ModalChild from '@/components/admin/Modal/ModalChild'

const OtherCustomPage = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/other-custom')
            const result = await response.json()
            if (result != null && JSON.stringify(result) !== "{}") {
                setData(result.data)
            }
            else {
                setData([])
            }
        }
        fetchData()
    }, [])

    const [alert, setAlert] = useState({
        status: false,
        message: ""
    })

    const handleSubmit = async () => {
        const res = await fetch('/api/other-custom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data})
        })
        if (res.ok) {
            setAlert({
                status: true,
                message: "Cập nhật thành công"
            })
        }
        else {
            setAlert({
                status: false,
                message: "Cập nhật thất bại"
            })
        }
    }

    const [showModalAddCustom, setShowModalAddCustom] = useState(false)
    const [inputCustom, setinputCustom] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [currentChild, setcurrentChild] = useState(null)
    const [action, setAction] = useState(null)
    useEffect(() => {
        if (currentChild) {
            setShowModal(true)
        }
        
    }, [currentChild])

    const addCustom = () => {
        if (inputCustom === "") {
            return
        }
        const newData = [
            ...data,
            {
                name: inputCustom,
                data: []
            }
        ]
        setData(newData)
        setShowModalAddCustom(false)
        setinputCustom("")
    }

    const generateTempId = () => {
        return new Date().getTime().toString(36) + Math.random().toString(36).substring(2);
    };
    

    const addChild = (child) => {
        if (action === "add") {
            const newData = data.map((custom) => {
                if (custom.name === child.parentName) {
                    return {
                        ...custom,
                        data: [
                            ...custom.data,
                            child
                        ]
                    }
                }
                return custom
            }
            )
            setData(newData)
        }
        else {
            const newData = data.map((custom) => {
                return {
                    ...custom,
                    data: custom.data.map((p) => {
                        if (p.id === child.id) {
                            return child
                        }
                        return p
                    })
                }
            })
            setData(newData)
        }
        setcurrentChild(null)
    }

    const removeChild = (id) => {
        const newData = data.map((custom) => {
            return {
                ...custom,
                data: custom.data.filter((p) => p.id !== id)
            }
        }
        )
        setData(newData)
    }
    return (
        data &&
        <div>
            {
                showModalAddCustom && (
                    <div tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full">
                    <div className="relative m-auto mt-20 w-full max-w-xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow-md dark:bg-boxdark">
                            <button onClick={() => {setShowModalAddCustom(false)}} type="button" className="absolute top-3 right-2.5 dark:text-white text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600" >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                                <div class="px-4 lg:px-10 py-10 w-full ">
                                    <div class="w-full px-4 mx-auto">
                                        <div class="relative w-full mb-3">
                                            <label className="font-medium">
                                                Tùy chọn
                                            </label>
                                            <input type="text" onChange={(e) => setinputCustom(e.target.value)} className="w-full text-black rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" />
                                        </div>
                                    </div>
                                    <div className="">
                                        <button onClick={addCustom} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md mx-auto">Thêm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
            <div className="flex justify-between items-center mt-5">
                <div>
                    <button onClick={() => setShowModalAddCustom(true)} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Thêm tùy chọn</button>
                </div>
                <div>
                    <button onClick={() => {setcurrentChild({id: generateTempId(),
                                                            name: '',
                                                            parentName: data[0] ? data[0].name : ""}); setAction("add")}}
                    className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Thêm lựa chọn</button>
                </div>
            </div>
            <div>
                {data.map((custom, index) => (
                    <div key={index} className={`my-5 pb-5 dark:border-white border-dark ${index == data.length - 1 ? "" : " border-b"}`}>
                        <div className="uppercase text-gray-200 font-bold mb-2">
                            Tùy chọn
                        </div>
                        <input type="text" value={custom.name} onChange={(e) => {
                            const newData = data.map((item, i) =>
                                i === index ? { ...item, name: e.target.value } : item
                            )
                            setData(newData)
                        }} className="w-full text-black border-2 border-gray-200 dark:border-gray-600 rounded-md p-2" />
                        <div className="uppercase text-gray-200 font-bold mt-3">
                            Các lựa chọn
                        </div>
                        <div className="flex lg:flex-row flex-col items-stretch gap-10 mt-4">                                        
                        {
                            custom.data.map((p, i) => (
                                <div key={i} className="flex gap-3 items-center flex-1 mx-auto  cursor-pointer flex-wrap" >
                                    <div onClick={() => {setcurrentChild(p), setAction("update")}}>
                                        {p.name}
                                    </div>
                                    <Image className="w-5 h-5 cursor-pointer" onClick={() => {removeChild(p.id)}} src={"/images/remove.svg"} width={35} height={35}></Image>
                                </div>
                            ))
                        }
                        </div> 
                    </div>
                ))}
            </div>
            <ModalChild onClose={(data) => {setShowModal(false); if (data) addChild(data) }} childData={currentChild} isOpen={showModal} inputTypes={data.map((custom) => custom.name)}/>
            <div className="text-center my-5">
                <button onClick={handleSubmit} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Xác nhận</button>
            </div>
            {alert.status && alert.message && <div className="text-center text-green-500 mt-4">{alert.message}</div>}
            {!alert.status && alert.message && <div className="text-center text-red mt-4">{alert.message}</div>}
        </div>
    );
}

export default OtherCustomPage;