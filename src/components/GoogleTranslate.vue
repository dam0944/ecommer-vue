<template>
  <div id="google_translate_element" style="display: none;"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Add global type declarations for window.google, if not present
declare global {
  interface Window {
    google?: any
    googleTranslateElementInit?: () => void
  }
}

onMounted(() => {
  if (!window.googleTranslateElementInit) {
    window.googleTranslateElementInit = () => {
      // The following types are loosely typed because Google Translate does not provide TypeScript types
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,km,zh-CN',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      }, 'google_translate_element')
    }
    const script = document.createElement('script')
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    document.body.appendChild(script)
  }
})
</script>