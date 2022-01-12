import React from "react";
import nookies from "nookies";
import Router from "next/router";

// export async function getServerSideProps(ctx) {
//   //access cookies
//   const cookies = nookies.get(ctx);
//   if (!cookies.token) {
//     //redirect to dashboard page
//     return {
//       redirect: {
//         destination: "/login",
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// }

export default function DashboardPage() {
  function logout() {
    nookies.destroy(null, "token");
    Router.replace("/login");
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center text-4xl flex-col">
      <h1>DashboardPage</h1>

      <button
        onClick={logout}
        className="bg-red-500 rounded py-2 px-3 text-white"
      >
        Logout
      </button>
    </div>
  );
}
