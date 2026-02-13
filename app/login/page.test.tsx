import { render, screen, fireEvent } from "@testing-library/react"
import LoginPage from "./page"
import { auth } from "@/auth"

jest.mock("@/auth") 

describe("LoginPage", () => {
  test("renders login inputs", () => {
    render(<LoginPage />)
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
  })

  test("calls auth when logging in", async () => {
    render(<LoginPage />)
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "admin@test.com" }
    })
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" }
    })
    fireEvent.submit(screen.getByRole("button"))

    // Check that mocked auth function was called
    expect(auth).toHaveBeenCalled()
  })
})