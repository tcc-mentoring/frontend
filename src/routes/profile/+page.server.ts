import { BACKEND } from "$env/static/private"
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, cookies }) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const session = cookies.get('session');
    const fetchProfile = await fetch(`${BACKEND}profile/user`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session}`
        }
    });

    if (fetchProfile.ok) {
        const userProfile = await fetchProfile.json();

        return {
            userProfile
        }
    }
}  