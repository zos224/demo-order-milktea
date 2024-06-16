import prisma from "@/db/prisma"
export const POST = async (request) => {
    const custom = await request.json()
    try {
        await prisma.OtherCustomization.deleteMany()
        const response = await prisma.OtherCustomization.create({data: custom})
        return new Response(JSON.stringify(response), {status: 200})
    }
    catch (error) {
        console.log(error)
        return new Response("Error", {status: 500})
    }
}

export const GET = async (request) => {
    try {
        const OtherCustomizations = await prisma.OtherCustomization.findFirst()
        return new Response(JSON.stringify(OtherCustomizations), {status: 200})
    }
    catch (error) {
        return new Response("Error", {status: 500})
    }
}
