import prisma from "@/db/prisma";

export const POST = async (req) => {
    let Type = {
        name: '',
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    Type.name = formData.get('name');
    try {
        let newType;
        if (id && !isNaN(id)) {
            newType  = await prisma.Type.update({ where: { id: id }, data: Type});
        }
        else {
            newType = await prisma.Type.create({ data: Type });
        }
        return new Response(JSON.stringify(newType), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}