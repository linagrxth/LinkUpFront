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