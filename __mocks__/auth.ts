export const auth = jest.fn(async (credentials?: { email: string; password: string }) => {
  if (credentials?.email === "admin@test.com" && credentials?.password === "password") {
    return { id: "1", email: "admin@test.com", name: "Admin" }
  }
  return null
})
