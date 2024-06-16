import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";

export const metadata = {
    title: "Quản lý sản phẩm",
  };

  const ProductsLayout = ({children}) => {
    return (
      <DefaultLayout>
        {children}
      </DefaultLayout>
    );
  };

  export default ProductsLayout;