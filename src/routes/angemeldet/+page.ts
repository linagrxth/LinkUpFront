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