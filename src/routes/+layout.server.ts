import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, route }) => {
  if (!locals.user && !loggedOutRoutes.includes(route.id ?? "")) {
    throw redirect(302, "/login");
  }

  return {
    user: locals.user,
  }
}

const loggedOutRoutes = [
  "/login",
  "/register"
]