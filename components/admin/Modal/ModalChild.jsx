"use client"

import { useEffect, useState } from "react"

const ModalChild = ({isOpen, onClose, childData, inputTypes}) => {
    const [errorAlert, setErrorAlert] = useState(null)
    const [types, settypes] = useState(inputTypes)
    useEffect(() => {
        settypes(inputTypes)
    }, [inputTypes])

    const [child, setChild] = useState({
        id: childData ? childData.id : "",
        name: childData ? childData.name : "",
        parentName: childData ? childData.parentName : "",
    })

    useEffect(() => {   
        setChild({
            id: childData ? childData.id : "",
            name: childData ? childData.name : "",
            parentName: childData ? childData.parentName : "",
        })
    }, [childData])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!child.name || !child.parentName) {
            setErrorAlert("Vui lòng điền đầy đủ thông tin!")
            return
        }
        setErrorAlert(null)
        onClose(child)
    }

    return ( isOpen && (
        <div tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative m-auto mt-20 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-md dark:bg-boxdark">
                    <button onClick={() => {onClose(null)}} type="button" className="absolute top-3 right-2.5 dark:text-white text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <div class="px-4 lg:px-10 py-10 w-full ">
                            <form onSubmit={handleSubmit}>
                                <div class="w-full px-4 mx-auto">
                                    <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                        Tên lựa chọn
                                    </label>
                                    <input value={child.name} type="text" placeholder={`Tên lựa chọn` } onChange={(e) => {setChild({...child, name: e.target.value})}}  className="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                </div>
                                <div class="w-full px-4 mx-auto">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                            Tùy chọn
                                        </label>
                                        <select value={child.parentName} required onChange={(e) => setChild({...child, parentName: e.target.value})} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                            {types.map((p, index) => (
                                                <option className="dark:text-black" key={index} value={p}>{p}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <input type="submit" role="button" className="mt-5 cursor-pointer bg-black text-white dark:bg-whiten dark:text-black px-3 py-2 rounded-xl" value={"Xác nhận"}/>
                                </div>
                            </form>
                            {errorAlert ? (
                                <div className="text-white mt-3 bg-red rounded-lg px-3 py-2">
                                    {errorAlert}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        

    )
}

export default ModalChild