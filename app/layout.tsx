'use client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Provider} from "react-redux";
import "./globals.css";
import { store} from "@/app/redux/store";
import React from "react";
import Navbar from "@/app/components/navbar";

const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-gray-100"
      >
      <Provider store={store}>
          <QueryClientProvider client={queryClient}>
              <Navbar />
              <main className={"p-8"}>{children}</main>
          </QueryClientProvider>
      </Provider>
      </body>
    </html>
  );
}
