import prisma from "@/db/prisma";

export const PUT = async (req) => {
    let data = {
        paymentStatus: false,
        status: false
    }
    const formData = await req.formData();
    const id = formData.get('id');
    data.paymentStatus = formData.get('paymentStatus') === 'true' ? true : false;
    data.status = formData.get('status') === 'true' ? true : false;
    try {
        let order = await prisma.Order.update({ where: { id: parseInt(id) }, data: data });
        return new Response(JSON.stringify(order), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}