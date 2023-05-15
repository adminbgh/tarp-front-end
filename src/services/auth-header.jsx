export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"))

  if (user && user?.token) {
    // For Spring Boot back-end
    return `Bearer ${user?.token}`
  }
  return ``
}
