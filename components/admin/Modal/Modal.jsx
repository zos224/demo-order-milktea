const Modal = ({isOpen, onClose, deleteLink, onDeleted}) => {
    const deleteHandle = async () => {
        try {
            const response = await fetch(deleteLink, {
                method: "DELETE"
            })
            if (response.ok) {
                onDeleted(true)
                onClose()
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    return ( isOpen && (
        <div tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative m-auto mt-20 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-md dark:bg-bodydark">
                    <button onClick={onClose} type="button" className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <h3 className="mb-5 text-lg font-normal text-black">Xác nhận?</h3>
                        <div className="flex justify-around">
                            <button onClick={deleteHandle} type="button" className="text-white bg-red hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Xóa
                            </button>
                            <button onClick={onClose} type="button" className=" dark:bg-bodydark1 text-black focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 ">Hủy</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
        

    )
}

export default Modal