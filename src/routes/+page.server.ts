import { BACKEND } from "$env/static/private";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({fetch}) => {
    let mentorProfiles = [];

    const fetchMentorProfiles = await fetch(`${BACKEND}mentor-profile`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });


    if (fetchMentorProfiles.ok) {
        mentorProfiles = await fetchMentorProfiles.json();
    }

    return {mentorProfiles};
};

export const actions: Actions = {
    scheduleSession: async({request, fetch, }) => {
        const formData = await request.formData();

        const startDateTime = formData.get("startDatetime") as string;
        const startDateTimeWithTimezone = `${startDateTime}+0000`;
        const menthorEmail = formData.get("menthorEmail") as string;

        await fetch(`${BACKEND}schedule`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startDateTime: startDateTimeWithTimezone,
                menthorEmail
            })
        }) 

        throw redirect(302, "/calendar")

    }
};