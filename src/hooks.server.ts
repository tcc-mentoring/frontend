import { BACKEND } from '$env/static/private'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session')

  if (!session) {
    return await resolve(event)
  }

  const fetchAuth = await fetch(`${BACKEND}auth`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${session}`
    }
  });

  if (fetchAuth.ok) {
    const user = await fetchAuth.json();

    event.locals.user = {...user}
  }

  return await resolve(event)
}

