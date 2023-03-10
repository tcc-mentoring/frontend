import { invalidate } from "$app/navigation"
import { BACKEND } from "$env/static/private"
import { fail, redirect, type Actions } from "@sveltejs/kit"
import { validateAcademyEntry, validateOcupation } from "../../validators/profileValidator"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, depends, fetch }) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }

    const fetchProfile = await fetch(`${BACKEND}profile/user`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });

    depends('app:profile')

    if (fetchProfile.ok) {
        const userProfile = await fetchProfile.json();

        return {
            userProfile
        }
    }
}  

export const actions: Actions = {
    ocupation: async ({request, fetch}) => {
        const formData = await request.formData();

        const description = formData.get('description') as string;
        const company = formData.get('company') as string;
        const startDate = formData.get('startDate') as string;
        const endDate = formData.get('endDate') as string;

        const errors = validateOcupation({description, startDate, endDate, company});

        if (Object.keys(errors).length > 0) {
            return fail(400, { errors });
        }

        try {

            const fetchCreateOcupation = await fetch(`${BACKEND}profile/ocupation`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description,
                    company,
                    startDate,
                    endDate
                })
            })
            
            if (fetchCreateOcupation.ok) {
                invalidate('app:profile')
            }
        } catch (err) {
            console.log({ err})
        }
    },
    
    academyEntry: async ({request, fetch}) => {
        const formData = await request.formData();

        const course = formData.get('course') as string;
        const institution = formData.get('institution') as string;
        const startDate = formData.get('startDate') as string;
        const endDate = formData.get('endDate') as string;

        const errors = validateAcademyEntry({course, startDate, endDate, institution});

        if (Object.keys(errors).length > 0) {
            return fail(400, { errors });
        }

        try {

            const fetchCreateAcademyEntry = await fetch(`${BACKEND}profile/academy-entry`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    course,
                    institution,
                    startDate,
                    endDate
                })
            })
            
            if (fetchCreateAcademyEntry.ok) {
                invalidate('app:profile')
            }
        } catch (err) {
            console.log({ err})
        }
    }
}