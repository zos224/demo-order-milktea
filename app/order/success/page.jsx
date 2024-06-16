"use client"
import { CardContext } from "@/components/client/CardProvider"
import Link from "next/link"
import { useContext, useState, useEffect } from "react"
import io from "socket.io-client"
const OrderSuccess = () => {
    const {card, updateCard} = useContext(CardContext)
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        const socketInitialize = async () => {  
            const socket = io(undefined, {
                path: '/api/socket',
            })
            setSocket(socket)
        }

        socketInitialize()

        const handleBeforeUnload = (event) => {
            if (socket) {
                socket.disconnect();
            }
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
        updateCard([])
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            if (socket) {
                socket.disconnect();
            }
        };
    }, [])
    useEffect(() => {
        if (socket) {
            socket.emit('new order', null)
        }
    }, [socket])

    return (
        <div className="text-center md:mt-50 mt-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f59e0b" className="size-20 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

            <h1 className="md:text-3xl text-xl font-semibold mt-4">Đặt hàng thành công</h1>
            <p className="md:text-lg text-base mt-3 mb-10">Cảm ơn bạn đã lựa chọn sản phẩm của chúng mình!</p>
            <Link href={"/"} className="mt-10 px-6 py-3 bg-amber-500 rounded-md text-white">Trang chủ</Link>
        </div>
    )
}

export default OrderSuccess