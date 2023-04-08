import { BACKEND } from "$env/static/private";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, fetch, depends }) => {

    if (!locals.user) {
      throw redirect(302, '/login')
    }

    const fetchMentorProfile = await fetch(`${BACKEND}mentor-profile/user`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });

    depends('app:mentor-profile')

    if (!fetchMentorProfile.ok) {
        return {
            mentorNotRegistered: true
        }
    } 

    const mentorProfile = await fetchMentorProfile.json();

    return {
        mentorProfile,
        mentorNotRegistered: false
    }
}  

export const actions: Actions = {
    mentorRegister: async ({request, fetch }) => {
        const formData = await request.formData();

        const selfDescription = formData.get('selfDescription');
        const knowledgeArea = formData.get('knowledgeArea');

        const specialties = formData.get('specialties-value');

        await fetch(`${BACKEND}mentor-profile/user`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                selfDescription,
                knowledgeArea,
                specialties
            })
        }) 

        return {
            success: true
        }
    }
};