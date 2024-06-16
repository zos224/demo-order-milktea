import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { CardContext } from './CardProvider';
const ModalOrder = ({ idProduct, openModal, onClose, indexInCard }) => {
    const [currentProduct, setCurrentProduct] = useState(null)
    const [topping, settopping] = useState(null)
    const [index, setIndex] = useState(indexInCard)
    useEffect(() => {
        setIndex(indexInCard)
    }, [indexInCard])
    const [loading, setLoading] = useState(false)
    const [orderProduct, setOrderProduct] = useState({
        idProduct: idProduct,
        size: null,
        name: "",
        topping: [],
        quantity: 0,
        total: 0
    })
    const [animation, setAnimation] = useState("animate-zoom-in")
    useEffect(() => {
        if (openModal) {
            setAnimation("animate-zoom-in")
        }
        else {
            setAnimation("animate-zoom-out")
        }
    }, [openModal])
    const {card, updateCard} = useContext(CardContext)
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            const res = await fetch('/api/product/' + idProduct)
            if (res.ok) {
                const data = await res.json()
                setCurrentProduct(data)
                if (index != -1) {
                    const product = card[index]
                    setOrderProduct({...orderProduct, quantity: product.quantity, total: product.total, size: product.size, topping: product.topping, note: product.note})
                }
                else {
                    setOrderProduct({...orderProduct, idProduct: idProduct, total: data.price, quantity: 1, name: data.name, image: data.image, size: data.productSizes[0], topping: [], note: ""})
                } 
            }
        }
        const fetchTopping = async () => {
            const res = await fetch('/api/topping/all')
            if (res.ok) {
                const data = await res.json()
                settopping(data)
            }
        }
        if (idProduct != 0) {
            fetchProduct()
            fetchTopping()
        }
    
    }, [idProduct])

    useEffect(() => {
        if (currentProduct != null && orderProduct.quantity != 0 && topping != null) {
            setLoading(false)
        }
    }, [orderProduct.quantity, currentProduct, topping])


    const closeModal = () => {
        onClose()
    }

    useEffect(() => {
        if (orderProduct.size) {
            const total = (orderProduct.size.price + orderProduct.topping.reduce((acc, topping) => acc + topping.price * topping.quantity, 0)) * orderProduct.quantity
            setOrderProduct({...orderProduct, total: total})
        }
    }, [orderProduct.size, orderProduct.topping, orderProduct.quantity])
    
    const addProductToCard = () => {
        if (index != -1) {
            const newCard = card.map((item, i) => {
                if (i === index) {
                    return orderProduct
                }
                return item
            })
            updateCard(newCard)
        }
        else {
            updateCard([...card, orderProduct])
        }
        closeModal()
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
            openModal && !loading && (
                <div tabindex="-1" className={`fixed bg-white top-0 left-0 right-0 z-99 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full transition-opacity duration-300 ${animation} `}>
                    <div className="relative w-full">
                        <button onClick={closeModal} type="button" className="absolute z-30 bg-bodydark top-2 p-1 left-2 text-white rounded-full w-8 h-8 ml-auto inline-flex justify-center items-center" >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className='mx-auto w-full flex md:flex-row flex-col md:mt-6 gap-5'>
                            <div className='w-full md:rounded-xl flex justify-end '>
                                <Image className='md:w-125 w-full aspect-4/3 object-cover md:h-[95vh] md:rounded-xl' src={currentProduct.image} width={400} height={800}></Image>
                            </div>
                            <div className='w-full md:h-[95vh] relative px-5 md:px-0'>
                                <div className='xl:w-3/5 lg:w-4/5 w-full'>
                                    <div className='uppercase md:text-2xl text-xl font-semibold'>
                                        {currentProduct.name}
                                    </div>
                                    <div className='mt-4'><span className='font-semibold uppercase text-lg'>Size </span><span>- Chọn 1</span></div>
                                    <div className='grid md:grid-cols-2 grid-cols-1 mt-5 gap-4'>
                                        {currentProduct.productSizes.map((size, index) => (
                                            <div className='w-full' key={index}>
                                                <label className="cursor-pointer w-full ">
                                                    <input defaultChecked={index == 0} type="radio" className="peer sr-only" name="size" onChange={(e) => setOrderProduct({...orderProduct, size: size})}/>
                                                    <div className="select-none rounded-md bg-white px-3 py-2 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-amber-500 peer-checked:ring-amber-500 peer-checked:ring-2">
                                                        <div className="flex gap-3 w-full">
                                                            <div className="flex items-center">
                                                                <div>
                                                                    <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                                                                </div>
                                                            </div>
                                                            <div className="flex md:flex-col flex-row justify-between w-full items-center md:items-start">
                                                                <p className="text-sm font-semibold uppercase text-gray-500">{size.name}</p>
                                                                <p className="text-sm font-bold">{formatCurrencyVND(size.price)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='mt-5 xl:w-3/5 lg:w-4/5 w-full'>
                                    <div className=''><span className='font-semibold uppercase text-lg'>Topping</span></div>
                                    <div className='grid md:grid-cols-2 grid-cols-1 mt-5 md:gap-4'>
                                        {topping.map((tp, index) => (
                                            <div className={`flex items-center justify-around select-none ${index != topping.length - 1 ? "border-b border-bodydark md:border-none" : ""}  py-3 md:py-0`} key={index}>
                                                <div onClick={() => {
                                                        const exist = orderProduct.topping.find(top => top.id == tp.id)
                                                        if (exist) {
                                                            const newTopping = orderProduct.topping.filter((top) => {
                                                                if (top.id == tp.id) {
                                                                    top.quantity += 1
                                                                }
                                                                return top
                                                            })

                                                            setOrderProduct({...orderProduct, topping: newTopping})
                                                        }
                                                        else {
                                                            setOrderProduct({...orderProduct, topping: [...orderProduct.topping, {id: tp.id, quantity: 1, name: tp.name, price: tp.price}]})
                                                        } 
                                                    }} className='cursor-pointer w-full flex gap-3 items-center'>
                                                    <div className={`size-6 border-2 text-white flex justify-center items-center font-semibold border-bodydark rounded-md ${orderProduct.topping.find(top => top.id == tp.id) ? "bg-amber-500 border-amber-500" : "" }`}>
                                                        <div>
                                                            {orderProduct.topping.find(top => top.id === tp.id)?.quantity}
                                                        </div>
                                                    </div>
                                                    <div className="flex md:flex-col flex-row gap-5 md:gap-0 justify-between w-full md:w-fit">
                                                        <p className=" text-gray-500">{tp.name}</p>
                                                        <p className=" ">{formatCurrencyVND(tp.price)}</p>
                                                    </div>
                                                </div>
                                                {
                                                    orderProduct.topping.find(top => top.id == tp.id) && (
                                                        <div className='cursor-pointer mx-4 hover:text-red' onClick={() => {
                                                            setOrderProduct({...orderProduct, topping: orderProduct.topping.filter((top) => top.id != tp.id)})
                                                        }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                        </div>                                          
                                                    )
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='mt-10 xl:w-3/5 lg:w-4/5 w-full relative'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute left-1 top-1/2 -translate-y-1/2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                    <input type="text" value={orderProduct.note} onChange={(e) => setOrderProduct({...orderProduct, note: e.target.value})} placeholder='Ghi chú sản phẩm' className='ps-7 w-full border border-bodydark rounded-md p-3 outline-none' />
                                </div>
                                <div className='flex items-center w-full xl:w-3/5 lg:w-4/5 justify-between md:absolute fixed bottom-0 left-0 bg-white p-5 border-t border-bodydark1'>
                                    <div className='flex items-center gap-5'>
                                        <div className='flex gap-4 items-center'>
                                            <div className='bg-bodydark rounded-full p-1 text-white cursor-pointer'>
                                                <svg onClick={() => {orderProduct.quantity == 1 ? setOrderProduct({...orderProduct, quantity: 1}) : setOrderProduct({...orderProduct, quantity: orderProduct.quantity -= 1})}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                                </svg>
                                            </div>
                                            <span className='text-xl text-black'>{orderProduct.quantity}</span>
                                            <div className='bg-bodydark rounded-full p-1 text-white cursor-pointer '>
                                                <svg onClick={() => {setOrderProduct({...orderProduct, quantity: orderProduct.quantity += 1})}}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={addProductToCard} className='w-fit rounded-md bg-amber-500 text-white py-2 px-5 font-semibold'>Thêm vào giỏ {orderProduct.total ? formatCurrencyVND(orderProduct.total) : "0 đ"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            )
    );
}
export default ModalOrder;
