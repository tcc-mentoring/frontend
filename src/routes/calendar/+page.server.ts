import { BACKEND } from "$env/static/private"
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, fetch}) => {
    if (!locals.user) {
      throw redirect(302, '/')
    }

    const fetchMenteeSessions = await fetch(`${BACKEND}schedule/mentee-sessions`);

    if (fetchMenteeSessions.ok) {
      return {
        menteeSessions: await fetchMenteeSessions.json()
      }
    }

}  
