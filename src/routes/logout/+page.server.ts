import { BACKEND } from '$env/static/private'
import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  throw redirect(302, '/')
}

export const actions: Actions = {
  async default({ cookies, locals, fetch }) {
    const currentUUID = cookies.get('session');

    cookies.set('session', '', {
      path: '/',
      expires: new Date(0),
    })

    await fetch(`${BACKEND}user/logout/${currentUUID}`);

    delete locals.user

    throw redirect(302, '/login')
  },
}