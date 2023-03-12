import { BACKEND } from "$env/static/private";
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
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