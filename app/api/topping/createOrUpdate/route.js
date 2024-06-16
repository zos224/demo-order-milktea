import prisma from "@/db/prisma";

export const POST = async (req) => {
    let Topping = {
        name: '',
        price: '',
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    Topping.name = formData.get('name');
    Topping.price = parseInt(formData.get('price'));
    try {
        let newTopping;
        if (id && !isNaN(id)) {
            newTopping  = await prisma.Topping.update({ where: { id: id }, data: Topping});
        }
        else {
            newTopping = await prisma.Topping.create({ data: Topping });
        }
        return new Response(JSON.stringify(newTopping), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}