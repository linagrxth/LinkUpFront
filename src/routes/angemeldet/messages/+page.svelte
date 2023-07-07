<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { Avatar, CodeBlock, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	interface Person {
		id: number;
		initials: string;
		name: string;
	}
	interface MessageFeed {
		id: number;
		host: boolean;
		initials: string,
		name: string;
		timestamp: string;
		message: string;
		color: string;
	}
	let elemChat: HTMLElement;

	const people: Person[] = [
		{ id: 0, initials: 'Li', name: 'Lina' },
		{ id: 1, initials: 'Ma', name: 'Marc' },
		{ id: 2, initials: 'Je', name: 'Jenny' }
	];
	let currentPerson: Person = people[0];
	let messageFeed: MessageFeed[] = [
		{
			id: 0,
			host: true,
			initials: 'Kl',
			name: 'Klara',
			timestamp: 'Gestern @ 2:30pm',
			message: 'Hallo',
			color: 'variant-soft-primary'
		},
		{
			id: 1,
			host: false,
			initials: 'Li',
			name: 'Lina',
			timestamp: 'Gestern @ 2:45pm',
			message: 'Hallo',
			color: 'variant-soft-primary'
		},
		{
			id: 2,
			host: true,
			initials: 'Kl',
			name: 'Klara',
			timestamp: 'Gestern @ 2:50pm',
			message: 'Hallo',
			color: 'variant-soft-primary'
		},
		{
			id: 3,
			host: false,
			initials: 'Li',
			name: 'Lina',
			timestamp: 'Gestern @ 2:52pm',
			message: 'Hallo',
			color: 'variant-soft-primary'
		}
	];
	let currentMessage = '';

	function scrollChatBottom(behavior?: ScrollBehavior): void {
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
	}

	function getCurrentTimestamp(): string {
		return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
	}

	function addMessage(): void {
		const newMessage = {
			id: messageFeed.length,
			host: true,
			initials: 'Kl',
			name: 'Klara',
			timestamp: `Heute @ ${getCurrentTimestamp()}`,
			message: currentMessage,
			color: 'variant-soft-primary'
		};
		messageFeed = [...messageFeed, newMessage];
		currentMessage = '';
		setTimeout(() => {
			scrollChatBottom('smooth');
		}, 0);
	}

	function onPromptKeydown(event: KeyboardEvent): void {
		if (['Enter'].includes(event.code)) {
			event.preventDefault();
			addMessage();
		}
	}

	onMount(() => {
		scrollChatBottom();
	});


</script>
		<section class="card">
			<div class="chat w-full h-full grid grid-cols-1 lg:grid-cols-[30%_1fr]" style="border: 1px solid #b4e2ff; border-radius: 10px; ">
				<!-- Navigation -->
				<div class="hidden lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30">
					<div class="p-4 space-y-4 overflow-y-auto">
						<div class="opacity-50">Kontakte</div>
						<ListBox active="variant-filled-primary">
							{#each people as person}
								<ListBoxItem bind:group={currentPerson} name="people" value={person}>
									<svelte:fragment slot="lead">
										<Avatar width="w-8" initials={person.initials}/>
									</svelte:fragment>
									{person.name}
								</ListBoxItem>
							{/each}
						</ListBox>
					</div>
				</div>
				<div class="grid grid-row-[1fr_auto]">
					<section bind:this={elemChat} class="max-h-[450px] p-4 overflow-y-auto space-y-4">
						{#each messageFeed as bubble}
							{#if bubble.host === true}
								<div class="grid grid-cols-[auto_1fr] gap-2">
									<Avatar initials={bubble.initials} width="w-12" />
									<div class="card p-4 rounded-tl-none space-y-2">
										<header class="flex justify-between items-center">
											<p class="font-bold">{bubble.name}</p>
											<small>{bubble.timestamp}</small>
										</header>
										<p>{bubble.message}</p>
									</div>
								</div>
							{:else}
								<div class="grid grid-cols-[1fr_auto] gap-2">
									<div class="card p-4 rounded-tr-none space-y-2 {bubble.color}">
										<header class="flex justify-between items-center">
											<p class="font-bold">{bubble.name}</p>
											<small>{bubble.timestamp}</small>
										</header>
										<p>{bubble.message}</p>
									</div>
									<Avatar initials={bubble.initials} width="w-12" />
								</div>
							{/if}
						{/each}
					</section>
					<section class="border-t border-surface-500/30 p-4">
						<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token" style="border: 1px solid #D8D8D8; ">
							<button class="input-group-shim">+</button>
							<textarea
								bind:value={currentMessage}
								class="bg-transparent border-0 ring-0"
								name="prompt"
								id="prompt"
								placeholder="Write a message..."
								rows="1"
								on:keydown={onPromptKeydown}
							/>
							<button class={currentMessage ? 'variant-filled-primary' : 'input-group-shim'} on:click={addMessage}>
								<i class="fa-solid fa-paper-plane" />
							</button>
						</div>
					</section>
				</div>
			</div>
		</section>

<style>
    .input{
        border: 1px solid #D8D8D8;
		border-radius: 10px;
    }
</style>