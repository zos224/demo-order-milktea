import prisma from "@/db/prisma"


function reverseDate(dateString) {
    const dateParts = dateString.split('-');
    
    const reversedDateParts = [dateParts[2], dateParts[1], dateParts[0]];
    
    const reversedDateString = reversedDateParts.join('-');
    
    return reversedDateString;
}

export const POST = async (request) => {


    const data = await request.json()
    try {
        const date = new Date()
    
        if (data.orderTime.includes("Hôm nay")) {
            data.orderTime.replace("Hôm nay", reverseDate(date.toISOString().split('T')[0]))
        }
        else if (data.orderTime.includes("Ngày mai")) {
            const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
            const splitDate = tomorrow.orderTime.split(",")
            splitDate[0] = reverseDate(date.toISOString().split('T')[0])
            data.orderTime = splitDate.join(",")
        }
        else if (data.orderTime.includes("Ngày kia")) {
            const threeDays = new Date(date.getTime() + 48 * 60 * 60 * 1000);
            const splitDate = threeDays.orderTime.split(",")
            splitDate[0] = reverseDate(date.toISOString().split('T')[0])
            data.orderTime = splitDate.join(",")
        }
        else if (data.orderTime == "asap") {
            data.orderTime = reverseDate(date.toISOString().split('T')[0]) + " Sớm nhất có thể"
        }
        const dataOrder = {
            name: data.name,
            phone: data.phone,
            address: data.address,
            timeReceive: data.orderTime,
            type: data.type,
            paymentMethod: data.paymentMethod === "tienmat" ? "Tiền mặt" : "Chuyển khoản",
            paymentStatus: false,
            note: data.note,
            total: data.total,
            status: 0
        }
        const order = await prisma.Order.create({data: dataOrder})
        data.listProduct.forEach(async (item) => {
            const dataOrderItem = {
                idOrder: order.id,
                idProductSize: item.size.id,
                quantity: item.quantity,
                note: item.note
            }
            const orderItem = await prisma.OrderItem.create({data: dataOrderItem})
            item.topping.forEach(async (topping) => {
                const dataTopping = {
                    idOrderItem: orderItem.id,
                    idTopping: topping.id,
                    quantity: topping.quantity,
                }
                await prisma.OrderTopping.create({data: dataTopping})
            })
        })

        return new Response("OK", {status: 200})
    }
    catch (error) {
        console.log(error)
        return new Response("Error", {status: 500})
    }
}