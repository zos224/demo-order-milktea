import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const metadata = {
    title: "Quản lý liên kết hữu ích | Klarda",
  };

  const LinkLayout = ({children}) => {
    return (
      <DefaultLayout>
        {children}
      </DefaultLayout>
    );
  };

  export default LinkLayout;