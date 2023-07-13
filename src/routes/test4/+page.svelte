<script lang="ts"> 
    let chat = [];
    let followings = [];
    let text = '';
    let receiverID = 2;

    const sendChat = async () => {
    const messageData = {
        text: text,
        receiverID: receiverID
    };

    try {
      const response = await fetch('https://linkup-api.de/api/messages', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(messageData)
      });

      if (response.ok) {
        console.log('Nachricht erfolgreich gesendet');
        console.log(response);
      } else {
        throw new Error('Fehler beim Senden der Nachricht');
      }
    } catch (error) {
      console.error(error);
    }
    await getChat(receiverID);
  };
  
    const sendMessage = async () => {
    const messageData = {
        receiverID: receiverID,
        text: text
    };

    try {
      const response = await fetch('https://linkup-api.de/api/users/updatePassword', {
        mode: 'cors',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(messageData)
      });

      if (response.ok) {
        console.log('Nachricht erfolgreich gesendet');
        console.log(response);
      } else {
        throw new Error('Fehler beim Senden der Nachricht');
      }
    } catch (error) {
      console.error(error);
    }
  };

    const getChat = async (receiverID: number) => {
    try {
      const response = await fetch(`https://linkup-api.de/api/messages/${receiverID}`, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const chatData = await response.json();
        chat = chatData.messages.reverse();
        console.log('Chat erfolgreich abgerufen');
      } else {
        throw new Error('Fehler beim Abrufen des Chats');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getFollowings = async (userId) => {
    try {
      const response = await fetch(`https://linkup-api.de/api/follows/${userId}/followings`, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const followingsData = await response.json();
        followings = followingsData;
      } else {
        throw new Error('Fehler beim Abrufen der Following');
      }
    } catch (error) {
      console.error(error);
 }
};

  import { onMount } from 'svelte/internal';
	import { Avatar, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

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
			timestamp: 'Gestern @ 12:30Uhr',
			message: 'Hallo',
			color: 'variant-soft-primary'
		},
		{
			id: 1,
			host: false,
			initials: 'Li',
			name: 'Lina',
			timestamp: 'Gestern @ 12:45Uhr',
			message: 'Hallo',
			color: 'variant-soft-primary'
		},
		{
			id: 2,
			host: true,
			initials: 'Kl',
			name: 'Klara',
			timestamp: 'Gestern @ 12:50Uhr',
			message: 'Hallo',
			color: 'variant-soft-primary'
		},
		{
			id: 3,
			host: false,
			initials: 'Li',
			name: 'Lina',
			timestamp: 'Gestern @ 12:52Uhr',
			message: 'Hallo',
			color: 'variant-soft-primary'
		}
	];
	let currentMessage = '';

	function scrollChatBottom(behavior?: ScrollBehavior): void {
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
	}

	function getCurrentTimestamp(): string {
    return new Date().toLocaleString('de-DE', { hour: 'numeric', minute: 'numeric', hour12: false });
}


	function addMessage(): void {
		const newMessage = {
			id: messageFeed.length,
			host: true,
			initials: 'Kl',
			name: 'Klara',
			timestamp: `Heute @ ${getCurrentTimestamp()}Uhr`,
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
        getChat(receiverID);
	});
  </script>
  
  {#each chat as message}
    <p>{message.text}</p>
  {/each}
  
  <section class="card">
    <div class="chat w-full h-full grid grid-cols-1 lg:grid-cols-[30%_1fr]" style="border: 1px solid #b4e2ff; border-radius: 10px; ">
        <!-- Navigation -->
        <div class="hidden lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30">
            <div class="p-4 space-y-4 overflow-y-auto">
                <div class="opacity-80"><strong>Kontakte</strong></div>
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
                        placeholder=" Write a message..."
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

<label class="label">
    <span>Nachricht schreiben</span>
    <input bind:value={text} class="input" title="Input (text)" type="text" placeholder="Schreibe eine Nachricht..." />
  </label>
<button type="button" on:click={sendChat}>Nachricht senden</button>

<style>
.input{
border: 1px solid #D8D8D8;
border-radius: 10px;
}
</style>