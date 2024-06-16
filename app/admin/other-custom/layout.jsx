import DefaultLayout from "@/components/admin/Layouts/DefaultLayout"

export const metadata = {
    title: "Quản lý các tùy chọn khác",
  };

const OtherCustomLayout = ({children}) => {
    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    )
}

export default OtherCustomLayout