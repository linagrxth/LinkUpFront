<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	
	let inputDemo = '';
	
	const userList: User[] = [
	  {
		initials: "LI",
		background: "bg-primary-500",
		name: "Lina Groth",
		buttonVariant: "success",
		buttonClicked: false, // Neue Eigenschaft, um den Zustand des Buttons zu verfolgen
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
	let filteredUsers = userList;
	
	interface User {
	  initials: string;
	  background: string;
	  name: string;
	  buttonVariant: string;
	  buttonClicked: boolean; // Neue Eigenschaft für den Button-Zustand
	}
	
	function handleInputChange() {
	  filteredUsers = userList.filter(user =>
		user.name.toLowerCase().includes(inputDemo.toLowerCase())
	  );
	}
	
	function handleButtonClick(user: User) {
	  user.buttonClicked = true;
	}
  </script>
  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  
  <div class="search">
	<input class="input" type="search" name="demo" bind:value={inputDemo} placeholder="Suchen..." on:input={handleInputChange}/>
  </div>
  
  <nav class="list-nav">
	<ul>
	  {#each filteredUsers as user}
		<li>
		  <a href="/?">
			<Avatar initials={user.initials} background={user.background} width="w-10"/>
			<span class="flex-auto">{user.name}</span>
			{#if !user.buttonClicked} 
			  <button type="button" class={`btn-icon variant-ghost-success`} on:click={() => handleButtonClick(user)}>
				<i class="fa fa-plus" aria-hidden="true"></i>
			  </button>
			{/if}
		  </a>
		</li>
	  {/each}
	</ul>
  </nav>
  
  <style>
	.search {
	  margin-bottom: 2vh;
	}
  </style>
  