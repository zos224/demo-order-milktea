"use client";
import "@/styles/globals.css"
import { useState, useEffect, useRef } from "react";
import Loader from "@/components/admin/Loader.jsx";
import io from "socket.io-client";
import Provider from "@/components/admin/Provider";
export default function RootLayout({children}) {
  const [loading, setLoading] = useState(true);
  const [firstTime, setFirstTime] = useState(false);
  const [enableSound, setEnableSound] = useState(false);
  const time = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
  time();

  const [socket, setSocket] = useState(null);
  const [order, setOrder] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    const socketInitialize = async () => {  
      const socket = io({
          path: '/api/socket',
          addTrailingSlash: false,
      })
      setSocket(socket)
  }

  socketInitialize()

  const handleBeforeUnload = (event) => {
      if (socket) {
          socket.disconnect();
      }
  };

  // Đăng ký trình xử lý sự kiện
  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
      // Hủy đăng ký trình xử lý sự kiện
      window.removeEventListener('beforeunload', handleBeforeUnload);

      if (socket) {
          socket.disconnect();
      }
  };
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("new order", () => {
        setOrder(true);
      });
    }
    return () => {
      if (socket) {
        socket.off("new order");
      }
    };
  }, [socket]);

  useEffect(() => {
    if (order) {
      if (enableSound) {
        const audio = new Audio("/assets/sound.mp3");
        audio.play();
      }
      setTimeout(() => setOrder(false), 5000);
    }
  }, [order]);
 

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider> 
          {order && (
            <div className="absolute z-9999 px-10 py-5 top-5 left-1/2 -translate-x-1/2 dark:bg-white dark:text-black bg-bodydark text-white ">
                Đơn hàng mới!!!
            </div>
          )}
          {
            !firstTime && !loading && (
              <div tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative m-auto mt-20 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-md dark:bg-bodydark">
                        <div className="p-6 text-center">
                            <h3 className="mb-5 text-lg font-normal text-black">Xác nhận bật âm thanh thông báo?</h3>
                            <div className="flex justify-around">
                                <button onClick={() => {setFirstTime(true), setEnableSound(true)}} type="button" className="text-white bg-green-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Bật
                                </button>
                                <button onClick={() => {setFirstTime(true), setEnableSound(false)}} type="button" className=" dark:bg-bodydark1 text-black focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 ">Tắt</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
              </div>
            )
          }
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? <Loader /> : children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
