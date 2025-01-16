import { Authenticated, ErrorComponent, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { authProvider } from "./providers/authProvider";
import { Layout } from "./components/layout";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { axiosInstance } from "./lib/axiosInstance";
import { UserList } from "./pages/user";
import { UserShow } from "./pages/user/show";
import { customDataProvider } from "./providers/customDataProvider";
import { notificationProvider } from "./providers/notificationProvider";
import { ToastContainer } from "react-toastify";
import { TokenProvider } from "./contexts/TokenContext";
import { i18nProvider } from "./providers/i18nProvider";
import { ComplaintList } from "./pages/complaints";

function App() {
  return (
    <TokenProvider>
      <BrowserRouter>
        <RefineKbarProvider>
          <DevtoolsProvider>
            <Refine
              i18nProvider={i18nProvider}
              dataProvider={{
                refineProvider: dataProvider(
                  import.meta.env.VITE_API_URL,
                  axiosInstance
                ),
                default: customDataProvider(
                  import.meta.env.VITE_API_URL,
                  axiosInstance
                ),
              }}
              routerProvider={routerBindings}
              authProvider={authProvider}
              notificationProvider={notificationProvider}
              resources={[
                {
                  name: "users",
                  list: "/users",
                  show: "/users/show/:id",
                  meta: {
                    label: "users",
                    syncWithLocation: true,
                    canDelete: false,
                  },
                },
                {
                  name: "complaints",
                  list: "/complaints",
                  show: "/complaints/show/:id",
                  meta: {
                    label: "complaints",
                    syncWithLocation: true,
                    canDelete: false,
                  },
                },

                //- Aşağıdakiler child item verebildiğimizi görmek için duruyor...
                // {
                //   name: "users index",
                //   parentName: "users",
                //   list: "/users/all",
                //   create: "/users/create",
                //   meta: {
                //     icon: "/icons/stockIcon.svg",
                //   },
                // },
                // {
                //   name: "users permissions",
                //   parentName: "users",
                //   list: "/users/permissions",
                //   create: "/users/permissions/create",
                // },
                // {
                //   name: "deneme",
                //   parentName: "users",
                //   list: "/posts",
                //   create: "/posts/create",
                // },
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                    label: "blog_posts",
                    canDelete: true,
                  },
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    label: "categories",
                    canDelete: true,
                  },
                },
              ]}
              options={{
                reactQuery: {
                  clientConfig: {
                    defaultOptions: {
                      queries: {
                        retry: 1,
                      },
                    },
                  },
                },
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "dqbkLW-GIxVXe-EUhewL",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="users" />}
                  />

                  <Route path="users">
                    <Route index element={<UserList />} />
                    <Route path="show/:id" element={<UserShow />} />
                  </Route>

                  <Route path="complaints">
                    <Route index element={<ComplaintList />} />
                  </Route>

                  <Route path="/blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>

              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
              />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </RefineKbarProvider>
      </BrowserRouter>
    </TokenProvider>
  );
}

export default App;
