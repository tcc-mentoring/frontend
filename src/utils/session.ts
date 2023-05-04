import type { RequestEvent } from "@sveltejs/kit";
import type { SessionDTO } from "../validators/sessionValidator";
import { BACKEND } from "$env/static/private";

export function sessionMapToCalendar(session: SessionDTO, role: string, title: string) {
    return {
        end: session.endDateTime, 
        start: session.startDateTime, 
        title: `${title} ${session.with.firstName}`, 
        backgroundColor: role === "mentor" ? "#5F7470" : "#B8BDB5",
        id: session.id,
        extendedProps: session
    }
}
    
export async function reviewSessionAction({request, fetch}: RequestEvent<Partial<Record<string, string>>, string | null>) {
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