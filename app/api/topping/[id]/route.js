import prisma from "@/db/prisma"

export const GET = async(request, {params}) => {
    try {
        let Toppings
        if (params.id == "all") {
            Toppings = await prisma.Topping.findMany({})
        }
        else {
            Toppings = await prisma.Topping.findUnique({where: {id: parseInt(params.id)}})
        }
        
        if (Toppings) {
            return new Response(JSON.stringify(Toppings), {status: 200})
        }
        else {
            return new Response("Error", {status: 500})
        }
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}

export const DELETE = async(request, {params}) => {
    try {
        const response = await prisma.Topping.delete({where: {id: parseInt(params.id)}})
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