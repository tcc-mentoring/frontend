import { BACKEND } from "$env/static/private";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { validateLogin } from "../../validators/loginValidator";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
      throw redirect(302, '/')
    }
}  

export const actions: Actions = {
    login: async ({cookies, request}) => { 
        const formData = await request.formData();

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
    
        const errors = validateLogin({email, password})
        
        if (Object.keys(errors).length > 0) {
            return fail(400, { errors });
        }
        
        try {
            const fetchLogin = await fetch(`${BACKEND}auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            
            const loginResponse = await fetchLogin.json();

            if (fetchLogin.ok) {
                cookies.set('session', loginResponse.access_token, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7,
                  });
            }
            if (loginResponse.statusCode === 401) {
                return fail(401, {serverErrors: loginResponse.message})
            }
        } catch (err) {
            console.log({ err})
            return fail(500, {serverErrors: ["serverError"]})
        }

        throw redirect(302, "/")
    }
};