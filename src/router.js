import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: import('@/pages/NotFound.vue')
        },
        {
            path: '/',
            name: 'Home',
            component: import('@/pages/Home.vue')
        },
        {
            path: '/about-me',
            name: 'AboutMe',
            component: import('@/pages/AboutMe.vue')
        },
        {
            path: '/projects',
            name: 'Projects',
            component: import('@/pages/Projects.vue')
        },
        {
            path: '/services',
            name: 'Services',
            component: import('@/pages/Services.vue')
        },
        {
            path: '/contact',
            name: 'Contact',
            component: import('@/pages/Contact.vue')
        }
    ],
})

export default router