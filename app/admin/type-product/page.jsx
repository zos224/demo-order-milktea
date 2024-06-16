"use client";
import Modal from "@/components/admin/Modal/Modal";
import ModalParent from "@/components/admin/Modal/ModalParent";
import { useEffect, useState } from "react";
const EventPage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [deleteLink, setDeleteLink] = useState('')
    const [typeProduct, settypeProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [openModalTopic, setOpenModalTopic] = useState(false)
    const [action, setAction] = useState('')
    const [currentTopic, setCurrentTopic] = useState({
        id: 0,
        name: '',
    })
    useEffect(() => {
        const fetchtypeProduct = async () => {
            const res = await fetch('/api/type-product/get')
            if (res.ok) {
                const data = await res.json()
                settypeProduct(data)
                setLoading(false)
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        }

        fetchtypeProduct()
    }, [])

    const onDeleted = (deleted) => {
        if (deleted) {
            const lastSlash = deleteLink.lastIndexOf('/')
            const id = deleteLink.substring(lastSlash+1)
            const newtypeProduct = typeProduct.filter((e) => e.id != id)
            settypeProduct(newtypeProduct)
        }
    }

    const updateOrInsert = (topic) => {
        if (action == "create") {
            settypeProduct([...typeProduct, topic])
        }
        else {
            const newtypeProduct = typeProduct.map((t) => {
                if (t.id == topic.id) {
                    return topic
                }
                return t
            })
            settypeProduct(newtypeProduct)
        }
    }

    return (
        <div className="w-full">
            <div className="flex justify-between mx-4">
                <h3 className="font-bold text-md">Quản lý danh mục sản phẩm</h3>
                <button className="dark:bg-bodydark dark:text-black-2 text-black bg-white rounded-md px-3 py-2 shadow-md" onClick={() => {setCurrentTopic({id: null, name: ''}); setAction("create"); setOpenModalTopic(true)}}>Thêm danh mục</button>
            </div>
            {!loading ? (
                <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                <table className="w-full text-sm text-center text-gray-500 dark:text-white">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">#</th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Tên
                            </th>
                            <th scope="col" colSpan={2} className="px-6 py-3 font-medium">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {typeProduct.map((topic, index) => (
                            <tr key={topic.id} className={`bg-white ${index == typeProduct.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                                <td className="px-6 py-4">
                                    {index + 1}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {topic.name}
                                </th>
                                <td className="px-6 py-4">
                                    <button onClick={() => {setCurrentTopic({id: topic.id, name: topic.name}), setAction("update"), setOpenModalTopic(true)}} className="hover:text-boxdark-2 hover:font-bold">Cập nhật</button>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => {setOpenModal(!openModal); setDeleteLink("/api/topic/" + topic.id)}} className="hover:text-boxdark-2 hover:font-bold">Xóa</button>
                                </td>
                            </tr>
                                                    
                        ))}
                    </tbody>
                </table>
                <Modal onDeleted={onDeleted} deleteLink={deleteLink} isOpen={openModal} onClose={() => setOpenModal(false)}></Modal>
                <ModalParent action={action} data={currentTopic} isOpen={openModalTopic} name={"type-product"} onClose={(topic) => {setOpenModalTopic(false); if (topic) updateOrInsert(topic)}} vie={"Danh mục sản phẩm"}></ModalParent>
            </div>
            ) : (
                <div className="flex-center mt-2" role="status">
                    <svg aria-hidden="true" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            )}
        </div>
        
        
    )
}

export default EventPage


