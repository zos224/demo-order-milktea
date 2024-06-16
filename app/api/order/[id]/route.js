import prisma from "@/db/prisma";

export const GET = async(request, {params}) => {
    try {
        let Orders;
        if (params.id == "all") {
            Orders = await prisma.Order.findMany({include: {orderItems: {include: {orderTopping: true}}}, orderBy: {status: "asc"}})
        }
        else {
            Orders = await prisma.Order.findUnique({where: {id: parseInt(params.id)}, include: {orderItems: {include: {orderTopping: {include: {topping: true}}, productSize: {include: {product: true}}}}}})
        }
        if (Orders) {
            return new Response(JSON.stringify(Orders), {status: 200})
        }
        else {
            return new Response("Error", {status: 500})
        }
    }
    catch (error) {
        console.log(error)
        return new Response(error, {status: 500})
    }
}

export const DELETE = async(request, {params}) => {
    try {
        await prisma.Order.findUnique({where: {id: parseInt(params.id)}})
        if (response) {
            return new Response("Deleted", {status: 200})
        }
        else {
            return new Response("Error", {status: 500})
        }

    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}