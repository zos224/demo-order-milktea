import prisma from "@/db/prisma"
export const POST = async (request) => {
    const {phone} = await request.json()
    const orders = await prisma.Order.findMany({
        where: {
            phone: phone
        },include: {orderItems: {include: {orderTopping: {include: {topping: true}}, productSize: {include: {product: true}}}}}})
    return new Response(JSON.stringify(orders), {status: 200})
} 