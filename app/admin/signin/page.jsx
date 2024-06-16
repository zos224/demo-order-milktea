"use client"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const SignIn = () => {
    const router = useRouter()
    const [admin, setAdmin] = useState({
        email: "",
        password: ""
    })
    const [errorAlert, setErrorAlert] = useState("")
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const response = await signIn('credentials', {
            redirect: false,
            email: admin.email,
            password: admin.password
        })
        if (response?.error === "CredentialsSignin") {
            setErrorAlert("Email hoặc mật khẩu không đúng")
        }
        else {
            router.push("/admin")
        }
    }
    return (
        <section class="bg-black">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-body rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Đăng nhập vào tài khoản
                        </h1>
                        <form onSubmit={handleSubmitLogin} class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-white">Email</label>
                                <input onChange={(e) => {setAdmin({...admin, email: e.target.value})}} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-black" placeholder="Input email" required=""/>
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-white">Mật khẩu</label>
                                <input onChange={(e) => {setAdmin({...admin, password: e.target.value})}}  type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-black" required=""/>
                            </div>
                            <button type="submit" class="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Đăng nhập</button>
                        </form>
                        {errorAlert != "" && <p class="text-rose-700 text-base font-semibold">{errorAlert}</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
