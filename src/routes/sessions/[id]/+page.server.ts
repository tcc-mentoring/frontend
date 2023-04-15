import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { BACKEND } from "$env/static/private";

export const load: PageServerLoad = async ({params, fetch, locals, depends}) => {
    if (!locals.user) {
        throw redirect(302, '/login')
    }

      const fetchSession = await fetch(`${BACKEND}schedule/${params.id}`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
          }
      });
  
      depends('app:session')
  
      if (fetchSession.ok) {
          const session = await fetchSession.json();
          return {
              session
          }
      }  
};

export const actions: Actions = {
    updateMentorNotes: async ({request, fetch}) => {
        const formData = await request.formData();
        const updatedMentorNotes = formData.get("updatedMentorNotes");
        const scheduleId = formData.get("scheduleId");

        await fetch(`${BACKEND}schedule/update-mentor-notes/${scheduleId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                updatedMentorNotes
            })
        });

        return {
            success: true
        }
    }
};