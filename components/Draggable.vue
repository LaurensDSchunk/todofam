<template>
  <div
    class="relative"
    draggable="true"
    @dragstart="dragStart"
    @drag="drag"
    @dragend="dragEnd"
  >
    <textarea
      ref="textarea"
      class="w-full h-32 p-2 border rounded resize-none absolute"
      placeholder="Drag or type..."
      @focus="editing = true"
      @blur="editing = false"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let dragging = false;
let mouseDown = false;
let editing = ref<boolean>(false);
const textarea = ref<HTMLElement | null>(null);

let initialPos = { x: 0, y: 0 };

function dragStart(e: MouseEvent) {
  initialPos = { x: e.clientX, y: e.clientY };
}

function drag(e: MouseEvent) {
  if (editing.value) {
    e.preventDefault();
    return;
  }
  if (!textarea.value) return;

  const currentPos = { x: e.clientX, y: e.clientY };
  const offset = {
    x: currentPos.x - initialPos.x,
    y: currentPos.y - initialPos.y,
  };

  textarea.value.style.top = `${offset.y}px`;
  textarea.value.style.left = `${offset.x}px`;

  textarea.value.style.left = textarea.value.style.position = "absolute";
}

function dragEnd() {
  dragging = false;
}
</script>
