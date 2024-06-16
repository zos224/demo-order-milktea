import prisma from "@/db/prisma"

export const GET = async(request, {params}) => {
    try {
        let Types
        if (params.id == "full") {
            Types = await prisma.Type.findMany({include: {products: true}})
        }
        else {
            Types = await prisma.Type.findMany({})
        }
        
        if (Types) {
            return new Response(JSON.stringify(Types), {status: 200})
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
        const response = await prisma.Type.delete({where: {id: parseInt(params.id)}})
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