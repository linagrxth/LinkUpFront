import type { PageLoad } from './$types';


export const load: PageLoad = async ({ fetch }) => {

    const userResponse = await fetch('https://linkup-api.de/api/users', {
        method: "GET",
    });

    if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
    }

    const userBody = await userResponse.json();
    console.log(userBody);

    const firstUser = userBody.shift();
    return {
        users: userBody
    }
};