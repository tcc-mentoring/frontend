import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { BACKEND } from "$env/static/private";
import { reviewSessionAction } from "../../utils/sessionAction";

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
    let sessions = {
        sessionsToReview: [] as Session[],
        finishedSessions: [] as Session[],
        upcomingSessions: [] as Session[],
    };

    const fetchPastSessions = await fetch(`${BACKEND}schedule/sessions`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }); 

    depends("app:sessions")


    if (fetchPastSessions.ok) {
        sessions = await fetchPastSessions.json();
    }

    return {sessions};
};

export const actions: Actions = {
    reviewSession: reviewSessionAction
};