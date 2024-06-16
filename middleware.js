
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin/signin")) {
      if (req.nextauth.token && req.nextauth.token.role === "admin") {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      return NextResponse.next();
    }
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!req.nextauth.token || req.nextauth.token.role != "admin") {
        return NextResponse.redirect(new URL('/admin/signin', req.url))
      }
    }
    if (req.nextUrl.pathname.includes("/product/createOrUpdate") || req.nextUrl.pathname.includes("/type-product/createOrUpdate") || req.nextUrl.pathname.includes("/topping/createOrUpdate") ||
    req.nextUrl.pathname.includes("/store/createOrUpdate")) {
      if (req.nextauth.token.role != "admin") {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // dưới này là check có token không, có token thì chạy trong code,ko là bắt đăng nhập
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return true
        }
      } 
    },
  }
)

export const config = { matcher: ["/admin/:path*", "/api/product/createOrUpdate", "/api/type-product/createOrUpdate", "/api/topping/createOrUpdate", "/api/store"] }
