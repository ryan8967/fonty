import { ref } from 'vue'


export default defineNuxtPlugin(() => {
    const cookieSecure = useRuntimeConfig().public.cookieSecure
    useCookie('isSideMenuOpen', { maxAge: 60 * 60, secure: cookieSecure, watch: true, default: () => ref(false) })
})