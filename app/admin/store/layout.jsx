import DefaultLayout from "@/components/admin/Layouts/DefaultLayout"

export const metadata = {
    title: "Cài đặt thông tin cửa hàng",
  };

const SettingLayout = ({children}) => {
    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    )
}

export default SettingLayout