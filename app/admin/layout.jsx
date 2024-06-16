"use client";
import "@/styles/globals.css"
import { useState, useEffect, useRef } from "react";
import Loader from "@/components/admin/Loader.jsx";
import io from "socket.io-client";
import Provider from "@/components/admin/Provider";
export default function RootLayout({children}) {
  const [loading, setLoading] = useState(true);
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
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? <Loader /> : children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
