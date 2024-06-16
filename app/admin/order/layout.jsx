import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";

export const metadata = {
    title: "Quản lý đơn hàng",
  };

  const ProductsLayout = ({children}) => {
    return (
      <DefaultLayout>
        {children}
      </DefaultLayout>
    );
  };

  export default ProductsLayout;