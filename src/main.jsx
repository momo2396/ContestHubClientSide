import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router.jsx";
import AuthProviders from "./providers/AuthProviders.jsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <div className="max-w-[1750px] mx-auto px-5">
          <RouterProvider router={router} />
        </div>
      </AuthProviders>
    </QueryClientProvider>
  </React.StrictMode>
);
