import type { PageLoad } from './$types';

interface User {
    bio: string;
    birthDate: string;
    id: number;
    image: string;
    name: string;
    username: string;
}

export const load: PageLoad = async ({ fetch }) => {

    const userResponse = await fetch('https://linkup-api.de/api/users', {
        method: "GET",
    });

    if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
    }

    const userBody = await userResponse.json();
    console.log(userBody);

    return {
        users: userBody as User[]
    }
};

interface Posts {
    content: string,
    createdAt: string,
    id: 0,
    numberOfComments: 0,
    numberOfLikes: 0,
    user: {
      bio: string,
      birthDate: string,
      id: 0,
      image: string,
      name: string,
      numberFollowers: 0,
      numberFollowing: 0,
      username: string  
    }
}

export const lol: PageLoad = async ({ fetch }) => {

    const userResponse = await fetch('https://linkup-api.de/api/posts', {
        method: "GET",
    });

    if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
    }

    const postBody = await userResponse.json();
    console.log(postBody);

    return {
        posts: postBody as Posts[]
    }
};