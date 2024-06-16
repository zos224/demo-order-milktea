import prisma from "@/db/prisma";

export const PUT = async (req) => {
    let data = {
        paymentStatus: false,
        status: 0
    }
    const formData = await req.formData();
    const id = formData.get('id');
    data.paymentStatus = formData.get('paymentStatus') === 'true' ? true : false;
    data.status = parseInt(formData.get('status'))
    try {
        let order = await prisma.Order.update({ where: { id: parseInt(id) }, data: data });
        return new Response(JSON.stringify(order), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}