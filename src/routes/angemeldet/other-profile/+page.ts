import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const [nutzerResponse, postsResponse] = await Promise.all([
    fetch('https://linkup-api.de/api/users/{userID}', {
      method: 'GET',
    }),
    fetch('https://linkup-api.de/api/posts', {
      method: 'GET',
    }),
  ]);

  if (!nutzerResponse.ok) {
    throw new Error('Failed to fetch user data');
  }

  if (!postsResponse.ok) {
    throw new Error('Failed to fetch posts data');
  }

  const nutzerBody = await nutzerResponse.json();
  const postsBody = await postsResponse.json();
  console.log(nutzerBody);
  console.log(postsBody);

  const firstUser = nutzerBody.shift();
  return {
    nutzer: nutzerBody,
    posts: postsBody,
  };
};
