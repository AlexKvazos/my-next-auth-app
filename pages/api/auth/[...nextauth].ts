import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
    user: any
  }
}

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token, user }) {
      if (token.user) session.user = token.user
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) token.user = user
      return token
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentails',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        return {
          id: Math.random(),
          username: credentials?.username,
        }
      },
    }),
  ],
})
