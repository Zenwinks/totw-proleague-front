import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Auth/Login";
import Profile from "../views/Profile";
import AdminHome from "../views/Admin/AdminHome";
import AdminTeams from "../views/Admin/AdminTeams";
import AdminCountries from "../views/Admin/AdminCountries";
import AdminPlayers from "../views/Admin/AdminPlayers";
import AdminPositions from "../views/Admin/AdminPositions";
import AdminRouter from "../views/Admin/AdminRouter";
// import Register from "../views/Auth/Register";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: Register,
  //   meta: {
  //     guest: true
  //   }
  // },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'AdminRouter',
    component: AdminRouter,
    meta: {
      requiresAuth: true,
      isAdmin: true
    },
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: AdminHome,
      },
      {
        path: 'teams',
        name: 'AdminTeams',
        component: AdminTeams,
      },
      {
        path: 'countries',
        name: 'AdminCountries',
        component: AdminCountries,
      },
      {
        path: 'players',
        name: 'AdminPlayers',
        component: AdminPlayers,
      },
      {
        path: 'positions',
        name: 'AdminPositions',
        component: AdminPositions,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('data') === null) {
      next({
        path: '/login',
        params: {nextUrl: to.fullPath}
      })
    } else {
      let data = JSON.parse(localStorage.getItem('data'))
      if (to.matched.some(record => record.meta.isAdmin)) {
        if (data.user.isAdmin) {
          next()
        } else {
          next({name: 'Home'})
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('data') == null) {
      next()
    } else {
      next({name: 'Login'})
    }
  } else {
    next()
  }
})

export default router
