import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const metadata = {
    title: "Quản lý danh mục sản phẩm",
  };

const LinkMagagerLayout = ({children}) => {
    return (
            <DefaultLayout>
                {children}
            </DefaultLayout>
        );
    };

export default LinkMagagerLayout;