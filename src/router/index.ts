import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterScrollBehavior,
} from "vue-router";
import {
  NotFound,
  PublicContentList,
  AdminLogin,
  AdminContentList,
  AdminContent,
  AdminTagList,
  AdminTag,
  AdminUserList,
  AdminUser,
} from "@/pages";
import { Auth } from "@/utils/auth";
import { RouteName } from "@/utils/constant";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: RouteName.PublicContentList,
    component: PublicContentList,
    meta: { requiresAuth: false },
  },
  {
    path: "/admin/login",
    name: RouteName.AdminLogin,
    component: AdminLogin,
    meta: { requiresAuth: false },
  },
  {
    path: "/admin/contents",
    name: RouteName.AdminContentList,
    component: AdminContentList,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/contents/new",
    name: RouteName.AdminContentNew,
    component: AdminContent,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/contents/:contentId",
    name: RouteName.AdminContent,
    component: AdminContent,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/admin/tags",
    name: RouteName.AdminTagList,
    component: AdminTagList,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/tags/new",
    name: RouteName.AdminTagNew,
    component: AdminTag,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/tags/:tagId",
    name: RouteName.AdminTag,
    component: AdminTag,
    meta: { requiresAuth: true },
    props: true,
  },
  // {
  //   path: "/admin/users",
  //   name: RouteName.AdminUserList,
  //   component: AdminUserList,
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: "/admin/users/new",
  //   name: RouteName.AdminUser,
  //   component: AdminUser,
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: "/admin/users/:userId",
  //   name: RouteName.AdminUser,
  //   component: AdminUser,
  //   meta: { requiresAuth: true },
  //   props: true,
  // },
  {
    path: "/:pathMatch(.*)*",
    name: RouteName.NotFound,
    component: NotFound,
    meta: { requiresAuth: false },
  },
];
const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (to.hash) {
    return {
      el: to.hash,
      behavior: "smooth",
    };
  }
  if (savedPosition) return savedPosition;
  else return { top: 0 };
};

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
});
router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = await Auth.fetchLoginUser();
    if (!isAuthenticated) router.push({ name: RouteName.AdminLogin });
  }
});

export { router };
