<script>
    import { onMount, afterUpdate } from 'svelte';
    import * as marked from 'marked';
    import DOMPurify from 'dompurify';

    let chatHistory = [];

    let userResponse = '';

    let loading;

    async function fetchChatHistory() {
        const response = await fetch('http://localhost:3000');
        const data = await response.json();
        chatHistory = [...chatHistory, ...data]
    }

    async function submitUserResponse() {
        loading = true;
        const content = {content: userResponse, role: 'user'}
        const response = await fetch('http://localhost:3000/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                history: chatHistory,
                content: content
             })
        });
        const responseData = await response.json()

        chatHistory = [...responseData];
        userResponse = '';
        loading = false;

    }

    onMount(fetchChatHistory);
</script>


<style>
    .container {
        display: flex;
        height: 100vh;
    }

    .textbox {
        flex: 1;
        padding: 10px;
    }

    .textbox textarea {
        width: 100%;
        height: 98%;
        resize: none;
    }

    .chat-container {
        flex: 2;
        padding: 10px;
        height: 98%;
        overflow-y: scroll;
    }

        .loading-spinner {
        display: inline-block;
        width: 50px;
        height: 50px;
        border: 3px solid rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        border-top-color: #000;
        animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>


<div class="container">
    <div class="textbox">
        <textarea placeholder="Type your response..." bind:value={userResponse} on:keydown={e => e.key === 'Enter' && 
        submitUserResponse()}></textarea>
    </div>
    <div class="chat-container">
        <h2>DM Assistant</h2>
        {#each chatHistory as message, i}
            {#if i !== 0}
                <p><b>{message.role}:</b></p> {@html DOMPurify.sanitize(marked.parse(message.content))}
            {/if}
        {/each}
        {#if loading}
            <div class="loading-spinner"></div>
        {/if}
    </div>
</div>
