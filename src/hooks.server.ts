import { BACKEND } from '$env/static/private'
import type { Handle, HandleFetch } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session')

  if (!session) {
    return await resolve(event)
  }

  const fetchAuth = await event.fetch(`${BACKEND}auth`, {
    method: 'GET',
  });

  if (fetchAuth.ok) {
    const user = await fetchAuth.json();

    event.locals.user = {...user}
  }

  return await resolve(event)
}

export const handleFetch: HandleFetch = ({ request, event: { cookies } }) => {
  const session = cookies.get('session')

  if (session) {
    request.headers.set('Authorization', `Bearer ${session}`)
  }

  return fetch(request);
}