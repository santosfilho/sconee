import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard/Dashboard'

Vue.use(Router)

const Evento = () => import(/* webpackChunkName: "eventos" */ './views/Eventos/Evento.vue')
const EventosList = () => import(/* webpackChunkName: "eventos" */ './views/Eventos/EventosList.vue')
const EventosCadastro = () => import(/* webpackChunkName: "eventos" */ './views/Eventos/EventosCadastro.vue')

const Equipamento = () => import(/* webpackChunkName: "equipamentos" */ './views/Equipamentos/Equipamento.vue')
const EquipamentosList = () => import(/* webpackChunkName: "equipamentos" */ './views/Equipamentos/EquipamentosList.vue')
const EquipamentosCadastro = () => import(/* webpackChunkName: "equipamentos" */ './views/Equipamentos/EquipamentosCadastro.vue')

const Local = () => import(/* webpackChunkName: "locais" */ './views/Locais/Local.vue')
const LocaisList = () => import(/* webpackChunkName: "locais" */ './views/Locais/LocaisList.vue')
const LocalCadastro = () => import(/* webpackChunkName: "locais" */ './views/Locais/LocalCadastro.vue')

const Categoria = () => import(/* webpackChunkName: "Categorias" */ './views/Categorias/Categoria.vue')
const CategoriasList = () => import(/* webpackChunkName: "Categorias" */ './views/Categorias/CategoriasList.vue')
const CategoriaCadastro = () => import(/* webpackChunkName: "Categorias" */ './views/Categorias/CategoriaCadastro.vue')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Home// () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },{
      path: '/eventos',
      name: 'eventos',
      components:{ 
        default: Evento
      },
      props: true,
      children: [
        {path: '', component: EventosList},
        {path: 'cadastro', component: EventosCadastro}
      ]
    },{
      path: '/equipamentos',
      components:{
        default: Equipamento
      },
      props: true,
      children: [
        {path: '', component: EquipamentosList},
        {path:'cadastro', component: EquipamentosCadastro}
      ]
    },{
      path: '/locais',
      components:{ default: Local },
      children: [
        {path: '', component: LocaisList},
        {path: 'cadastro', component: LocalCadastro}
      ]
    },{
      path: '/categorias',
      components:{ default: Categoria },
      children: [
        {path: '', component: CategoriasList},
        {path: 'cadastro', component: CategoriaCadastro}
      ]
    }
  ]
})
