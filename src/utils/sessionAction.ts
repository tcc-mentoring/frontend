import type { RequestEvent } from "@sveltejs/kit";
import { BACKEND } from "$env/static/private";

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