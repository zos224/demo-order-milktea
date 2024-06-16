import prisma from "@/db/prisma";

export const GET = async(request, {params}) => {
    try {
        let products;
        if (params.id == "all") {
            products = await prisma.Product.findMany({include: {productSizes: true}})
        }
        else {
            products = await prisma.Product.findUnique({where: {id: parseInt(params.id)}, include: {productSizes: true}})
        }
        if (products) {
            return new Response(JSON.stringify(products), {status: 200})
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
        const product = await prisma.Product.findUnique({where: {id: parseInt(params.id)}})
        const fileName = product.image.split('/').pop()
        await fetch(process.env.UPLOAD_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fileName: fileName })
        })
        const response = await prisma.Product.delete({where: {id: parseInt(params.id)}})
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