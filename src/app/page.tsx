// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import Main from "@/components/Main";

// export default function Home() {
//   return (
//     <div className="w-full min-h-screen bg-white">
//       <header className="sticky top-0 z-50 bg-white">
//         <Header />
//       </header>
//       <div className="relative">
//         <section className="flex justify-center">
//           <Main />
//         </section>
//         <Footer />
//       </div>

//     </div>

//   )
// }

//Responsive

import Main from "@/components/Main";

export default function Home() {
  return (
    <div className=" flex justify-center w-full min-h-screen bg-white flex-col">   
          <Main />
    </div>
  );
}

