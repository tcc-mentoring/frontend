import { BACKEND } from "$env/static/private";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    login: async ({cookies, request}) => { 
        const formData = await request.formData();
        
        const email = formData.get("email");
        const password = formData.get("password");

        const errors: Record<string, string> = {}

        if (!password || typeof password !== "string") {
            errors.password = "required";
        }

        if (!email || typeof email !== "string") {
            errors.email = "required";
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, { errors });
        }
        
        try {
            const fetchLogin = await fetch(`${BACKEND}user/login`, {
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
            
            if (fetchLogin.status === 201 ) {
                cookies.set('session', loginResponse.userAuthUUID, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7,
                  });
            }
    
            if (loginResponse.statusCode === 400) {
                return fail(400, {serverErrors: loginResponse.message})
            } else if (loginResponse.statusCode === 404) {
                return fail(400, {serverErrors: ["resourceNotFound"]})
            }
        } catch (err) {
            return fail(500, {serverErrors: ["serverError"]})
        }

        throw redirect(302, "/")
    }
};