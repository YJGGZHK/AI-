import { createRouter, createWebHashHistory } from 'vue-router'

import IndexPage from '@/components/page/IndexPage.vue'
import KnowledgeQuizPage from '../components/page/KnowledgeQuizPage'
import APIntroPage from '../components/page/APIntroPage.vue'
import APUpgradePage from '../components/page/APUpgradePage.vue'
import AIdevelopPage from '../components/page/AIdevelopPage.vue'
import PAPaintingPage from '../components/page/PAPaintingPage.vue'
import SDIntroPage from '../components/page/SDIntroPage.vue'
import SDUpgradePage from '../components/page/SDUpgradePage'
import SDInstallPage from '../components/page/SDInstallPage.vue'
import SDRealismPage from '../components/page/SDRealismPage.vue'

import IRModelPage from '../components/page/IRModelPage.vue'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'IndexPage',
      component: IndexPage,
    },
    {
      path: '/apintro',
      name: 'APIntroPage',
      component: APIntroPage,
    },
    {
      path: '/apupgrade',
      name: 'APUpgradePage',
      component: APUpgradePage,
    },
    {
      path: '/aidevelop',
      name: 'AIdevelopPage',
      component: AIdevelopPage,
    },
    {
      path: '/papainting',
      name: 'PAPaintingPage',
      component: PAPaintingPage,
    },
    {
      path: '/sdintro',
      name: 'SDIntroPage',
      component: SDIntroPage,
    },
    {
      path: '/sdupgrade',
      name: 'SDUpgradePage',
      component: SDUpgradePage,
    },
    {
      path: '/sdinstal',
      name: 'SDInstallPage',
      component: SDInstallPage,
    },
    {
      path: '/sdrealism',
      name: 'SDRealismPage',
      component: SDRealismPage,
    },
    {
      path: '/knowquiz',
      name: 'KnowledgeQuizPage',
      component: KnowledgeQuizPage,
    },
    {
      path: '/irmodel',
      name: 'IRModelPage',
      component: IRModelPage,
    },
  ],
})

export default router
