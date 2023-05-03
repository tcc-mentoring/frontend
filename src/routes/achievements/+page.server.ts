import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { BACKEND } from "$env/static/private";

export const load: PageServerLoad = async ({fetch, depends}) => {
    const fetchAchievements = await fetch(`${BACKEND}achievements`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });

    
    depends('app:achievements')

    if (fetchAchievements.ok) {
        const achievements = await fetchAchievements.json();

        return {
            ...achievements
        }
    }
};
export const actions: Actions = {
    createAchievement: async ({fetch, request}) => {
        const formData = await request.formData();

        const achievedDate = formData.get("achievedDate");
        const description = formData.get("description");
        const mentorsParticipated = formData.get("mentorsParticipatedValue");
        
        try {

            await fetch(`${BACKEND}achievements/new`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    achievedDate,
                    description,
                    mentorsParticipated
                })   
            })
        } catch (err) {
            console.error(err);
        }

        return {
            success: true,
        }
    }
};