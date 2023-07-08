<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	let inputDemo = '';
  
	const userList: User[] = [
	  {
		initials: "LI",
		background: "bg-primary-500",
		name: "Lina Groth",
		buttonVariant: "success",
		buttonClicked: false,
	  },
	  {
		initials: "MA",
		background: "bg-primary-500",
		name: "Marc Buddemeier",
		buttonVariant: "success",
		buttonClicked: false,
	  },
	  {
		initials: "JE",
		background: "bg-primary-500",
		name: "Jenny",
		buttonVariant: "success",
		buttonClicked: false,
	  },
	];
	let filteredUsers: any[] = [];
  
	function initializeFilteredUsers() {
	  filteredUsers = userList.filter(user =>
		user.name.toLowerCase().includes(inputDemo.toLowerCase())
	  );
	}
  
	initializeFilteredUsers();
  
	interface User {
	  initials: string;
	  background: string;
	  name: string;
	  buttonVariant: string;
	  buttonClicked: boolean;
	}
  
	function handleInputChange() {
	  filteredUsers = userList.filter(user =>
		user.name.toLowerCase().includes(inputDemo.toLowerCase())
	  );
	}
  </script>
  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="search">
	<input class="input" type="search" name="demo" bind:value={inputDemo} placeholder=" Suchen nach einem User..." on:input={handleInputChange}/>
  </div>
  <nav class="list-nav">
	{#each filteredUsers as user}
	<ul>
	  <li>
		<a href="/angemeldet/other-profile">
		<span><Avatar initials={user.initials} background={user.background} width="w-10"/></span>
		<span class="flex-auto">{user.name}</span>
		</a>
	  </li>
	</ul>
		{/each}
	</nav>
  

  <style>
	.search {
	  margin-bottom: 2vh;
	}
  </style>
  