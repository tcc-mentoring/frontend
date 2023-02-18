import { BACKEND } from "$env/static/private";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { validateRegister } from "../../validators/registerValidator";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, '/')
  }
}

export const actions: Actions = {
    register: async ({cookies, request}) => { 
        const formData = await request.formData();
        
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;

        const errors = validateRegister({email, password, confirmPassword, firstName, lastName});

        if (Object.keys(errors).length > 0) {
            return fail(400, { errors });
        }

        try {
            const fetchCreateUser = await fetch(`${BACKEND}user`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName})
            })
            
            
            if (!fetchCreateUser.ok) {
                const createUserResponse = await fetchCreateUser.json();

                return fail(400, {serverErrors: createUserResponse.message})
            }
        } catch (err) {
            return fail(500, {serverErrors: ["serverError"]})
        }

        throw redirect(302, "/login")
    }
};