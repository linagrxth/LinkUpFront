import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {

  const [nutzerResponse, postsResponse, commentResponse] = await Promise.all([
    fetch('https://linkup-api.de/api/users', {
      method: 'GET',
    }),
    fetch('https://linkup-api.de/api/posts', {
      method: 'GET',
    }),
    fetch('https://linkup-api.de/api/comments/posts/7',  {
      method: 'GET',
    }),
  ]);

  if (!nutzerResponse.ok) {
    throw new Error('Failed to fetch user data');
  }

  if (!postsResponse.ok) {
    throw new Error('Failed to fetch posts data');
  }

  if (!commentResponse.ok) {
    throw new Error('Failed to fetch comments data');
  }


  const nutzerBody = await nutzerResponse.json();
  const postsBody = await postsResponse.json();
  const commentBody = await commentResponse.json();
  console.log(nutzerBody);
  console.log(postsBody);
  console.log(commentBody);

  return {
    nutzer: nutzerBody,
    posts: postsBody,
    comments: commentBody
  };
};