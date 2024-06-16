import prisma from "@/db/prisma"
export const POST = async (request) => {
    const Store = await request.json()
    try {
        await prisma.Store.deleteMany()
        const response = await prisma.Store.create({data: Store})
        return new Response(JSON.stringify(response), {status: 200})
    }
    catch (error) {
        console.log(error)
        return new Response("Error", {status: 500})
    }
}

export const GET = async (request) => {
    try {
        const Stores = await prisma.Store.findFirst()
        return new Response(JSON.stringify(Stores), {status: 200})
    }
    catch (error) {
        return new Response("Error", {status: 500})
    }
}
