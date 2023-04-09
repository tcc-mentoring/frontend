import { BACKEND } from "$env/static/private"
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, fetch}) => {
    if (!locals.user) {
      throw redirect(302, '/')
    }

    const fetchUserSessions = await fetch(`${BACKEND}schedule/user-sessions`);
    
    if (fetchUserSessions.ok) {
      const userSessions = await fetchUserSessions.json();
      return {userSessions};
    }

}  
