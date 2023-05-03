<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import { Editor } from '@tiptap/core'
    import StarterKit from '@tiptap/starter-kit'
  
    let element: HTMLDivElement
    let editor: Editor

    export let startContent: string = "";
    export let editable: boolean = false;
  
    onMount(() => {
      editor = new Editor({
        editable,
        element: element,
        extensions: [
          StarterKit,
        ],
        content: startContent,
        onTransaction: () => {
          // force re-render so `editor.isActive` works as expected
          editor = editor
        },
        onUpdate: ((props: {editor: Editor}) => {
            console.log({props})
            startContent = props.editor.getHTML() ?? "";
        })
      })
    })
  
    onDestroy(() => {
      if (editor) {
        editor.destroy()
      }
    })
  </script>
  
  {#if editor && editable}
    <div class="tiptap-toolbar">
      <div class="headings">
        <button
            type="button"
            on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
            class:active={editor.isActive('heading', { level: 1 })}
        >
            H1
        </button>
        <button
            type="button"
            on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            class:active={editor.isActive('heading', { level: 2 })}
        >
            H2
        </button>
        <button 
            type="button" 
            on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}>
            P
        </button>
      </div>
      <div class="modifiers">
        <button 
            type="button"
            on:click={() => editor.chain().focus().toggleBold().run()} class:active={editor.isActive('bold')}>
            B
        </button>
        <button 
            type="button"
            on:click={() => editor.chain().focus().toggleItalic().run()} class:active={editor.isActive('italic')}>
            I
        </button>
        <button 
            type="button"
            on:click={() => editor.chain().focus().toggleCodeBlock().run()} class:active={editor.isActive('codeBlock')}>
            Code
        </button>
        <button 
            type="button"
            on:click={() => editor.chain().focus().toggleBulletList().run()} class:active={editor.isActive('bulletList')}>
            List
        </button>
      </div>
    </div>

  {/if}
  
  <div class="tiptap-editor" bind:this={element} />
  
  <style>
    button.active {
      background: black;
      color: white;
    }
    .tiptap-editor {
        padding: 10px 20px;
        border: 1px solid var(--primary);
        border-radius: 10px;
        margin: 20px 0;
    }
    .tiptap-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: last baseline;
    }
    .tiptap-toolbar > .modifiers {
        display: flex;
    }
    .tiptap-toolbar > .headings {
        display: flex;
    }
    .tiptap-toolbar > * > button {
        margin-right: 20px;
    }
  </style>