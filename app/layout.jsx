
import { CardProvider } from "@/components/client/CardProvider"
import "@/styles/globals.css"

export const metadata  = {
    title: "Kính chào quý khách",
}

const RootLayout = async ({ children }) => {
    return (
        <html lang="en">
            <body className="bg-gray">
                <CardProvider>
                {children}
                </CardProvider>
            </body>
        </html>
    )
}

export default RootLayout