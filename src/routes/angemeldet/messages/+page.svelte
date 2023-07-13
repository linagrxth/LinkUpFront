<script lang="ts"> 
    let chat = [];
    let followings = [];
    let text = '';
    let receiverID = null;
    let currentUser = {};
    let chatPartner  = {};

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
  setTimeout(() => {
            scrollChatBottom('smooth');
        }, 0);
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
      chat = Array.isArray(chatData.messages) ? chatData.messages.reverse() : [];
      currentUser = chatData.currentUser;
      chatPartner = chatData.chatPartner;
      console.log('Chat erfolgreich abgerufen');
    } else {
      throw new Error('Fehler beim Abrufen des Chats');
    }
  } catch (error) {
    console.error(error);
    chat = []; // Set chat to an empty array on error
  }
};



    const getCurrentUser = async () => {
        try {
            const response = await fetch('https://linkup-api.de/api/users/current', {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                currentUser = await response.json();
            } else {
                throw new Error('Fehler beim Abrufen des aktuellen Benutzers');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getFollowings = async (userId: number) => {
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
      followings = Array.isArray(followingsData) ? followingsData : [];
    } else {
      throw new Error('Fehler beim Abrufen der Following');
    }
  } catch (error) {
    console.error(error);
    followings = []; // Set followings to an empty array on error
  }
};


    function updateReceiverID(person: Following): void {
        receiverID = person.id;
        getChat(receiverID);
    }

    import { onMount } from 'svelte/internal';
    import { Avatar, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

    interface Following {
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

    let currentPerson: Following = followings[0];
    let messageFeed: MessageFeed[] = [];
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
            sendChat();
            text = ''; // Leeren Sie den Text nach dem Senden der Nachricht
        }
    }

    function formatiereDatum(apiDatum) {
    const datumUhrzeit = new Date(apiDatum);
    const tag = datumUhrzeit.getDate();
    const monat = datumUhrzeit.getMonth() + 1;
    const jahr = datumUhrzeit.getFullYear();
    const stunde = datumUhrzeit.getHours();
    const minute = datumUhrzeit.getMinutes();

    return `${tag}.${monat}.${jahr} - ${stunde}:${minute < 10 ? '0' + minute : minute} Uhr`;
  }

    onMount(async () => {
        await getCurrentUser();
        await getFollowings(currentUser.id);
       
        scrollChatBottom();
        await getChat(receiverID);
    });
</script>
  
  <section class="card">
    <div class="chat w-full h-full grid grid-cols-1 lg:grid-cols-[30%_1fr]" style="border: 1px solid #b4e2ff; border-radius: 10px; ">
        <!-- Navigation -->
        <div class="hidden lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30">
            <div class="p-4 space-y-4 overflow-y-auto">
                <div class="opacity-80"><strong>Kontakte</strong></div>
                <ListBox active="variant-filled-primary">
                    {#each followings as person}
                        <ListBoxItem bind:group={currentPerson} name="people" value={person} on:click={() => updateReceiverID(person)}>
                            <svelte:fragment slot="lead">
                                <Avatar width="w-8" initials={person.username}/>
                            </svelte:fragment>
                            {person.name}
                        </ListBoxItem>
                    {/each}
                </ListBox>
            </div>
        </div>
        <div class="grid grid-row-[1fr_auto]">
            <section bind:this={elemChat} class="max-h-[450px] p-4 overflow-y-auto space-y-4">
              {#if chatPartner}
              {#if currentUser}
                {#each chat as bubble}
                    {#if bubble.isSender}
                        <div class="grid grid-cols-[auto_1fr] gap-2">
                            <Avatar initials={currentUser.username} width="w-12" />
                            <div class="card p-4 rounded-tl-none space-y-2">
                                <header class="flex justify-between items-center">
                                    <p class="font-bold">{currentUser.username}</p>
                                    <small>{formatiereDatum(bubble.createdAt)}</small>
                                </header>
                                <p>{bubble.text}</p>
                            </div>
                        </div>
                    {:else}
                        <div class="grid grid-cols-[1fr_auto] gap-2">
                            <div class="card p-4 rounded-tr-none space-y-2">
                                <header class="flex justify-between items-center">
                                    <p class="font-bold">{chatPartner.username}</p>
                                    <small>{formatiereDatum(bubble.createdAt)}</small>
                                </header>
                                <p>{bubble.text}</p>
                            </div>
                            <Avatar initials={chatPartner.username} width="w-12" />
                        </div>
                    {/if}
                {/each}
              {/if}
              {/if}
            </section>
            <section class="border-t border-surface-500/30 p-4">
                    <input
						class="input" type="text"
                        bind:value={text}
                        placeholder=" Sende eine Nachricht..."
                        on:keydown={onPromptKeydown}
                    />
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
