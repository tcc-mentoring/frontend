import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { BACKEND } from "$env/static/private";

interface Session {
    id: number;

    startDateTime: string;

    endDateTime: string;

    with: {
        firstName: string;
        lastName: string;
        email: string;
    };

    as: string;

    score: number;
    
    details: string;
}


export const load: PageServerLoad = async ({fetch, depends}) => {
    let pastSessions = {
        sessionsToReview: [] as Session[],
        finishedSessions: [] as Session[]
    };

    const fetchPastSessions = await fetch(`${BACKEND}schedule/mentee-past-sessions`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }); 

    depends("app:sessions")


    if (fetchPastSessions.ok) {
        pastSessions = await fetchPastSessions.json();
    }

    return {pastSessions};
};

export const actions: Actions = {
    reviewSession: async ({request, fetch}) => {
        const formData = await request.formData();

        const scheduleId = formData.get("scheduleId");
        const sessionReviewScore = formData.get("sessionReviewScore");
        const sessionReviewDetails = formData.get("sessionReviewDetails");

        await fetch(`${BACKEND}schedule/review/${scheduleId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
                score: sessionReviewScore,
                details: sessionReviewDetails
            })
        });

        return {
            success: true
        }
    }
};