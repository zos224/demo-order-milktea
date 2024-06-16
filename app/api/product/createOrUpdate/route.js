import prisma from "@/db/prisma";

export const POST = async (req) => {
    let product = {
        name: '',
        idType: 0,
        image: '',
        status: false,
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    product.name = formData.get('name');
    product.image = formData.get('image');
    product.status = formData.get('status') === '1';
    product.idType = parseInt(formData.get('idType'));
    const productSizes = formData.get('productSizes');
    const productSizesArray = productSizes ? JSON.parse(productSizes) : [];
    try {
        let newProduct;
        if (id && !isNaN(id)) {
            newProduct = await prisma.Product.update({ where: { id: id }, data: product });
        }
        else {
            newProduct = await prisma.Product.create({ data: product });
        }
        if (productSizesArray.length > 0) {
            await prisma.ProductSize.deleteMany({ where: { idProduct: parseInt(newProduct.id) } });
            for (let i = 0; i < productSizesArray.length; i++) {
                await prisma.ProductSize.create({ data: {name: productSizesArray[i].name, price: parseInt(productSizesArray[i].price), idProduct: parseInt(newProduct.id)} });
            }
        }
        return new Response(JSON.stringify(newProduct), { status: 200 })
    }
    catch (error) {
        return new Response(error, { status: 500 })
    }

}