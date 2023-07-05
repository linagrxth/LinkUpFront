<script>
    export let data;
</script>

<h2>My cool user list</h2>
<ul>
    {#each data.users as user}
        <li>
            {user.id} - {`${user.username}`}
        </li>
    {/each}
</ul>

