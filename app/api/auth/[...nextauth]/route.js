import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        if (credentials.email === "admin123@gmail.com" && credentials.password === "Admin@123") {
          return {
            email: "admin123@gmail.com",
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }
      if (user) {
        return {
          ...token,
          email: user.email,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
