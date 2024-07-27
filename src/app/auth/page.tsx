import { motion } from "framer-motion";
import { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import Header from "@/components/ui/Header";

export default function Page({searchParams}) {
    const isLogin = searchParams['isLogin'] !== undefined;

    return (<div className="flex flex-col min-h-[100dvh]">
			<main className="flex-1">
				<Header />
                <section>
                 </section>
            </main>
        </div>)
}

function Form({isLogin} : {isLogin: boolean}) {
    "use client";
    // @willzeng274 pls fix...
    // return <motion.div>
    //      {isLogin ? <Login /> : <Signup />}
    // </motion.div>
    return <div>
         {isLogin ? <Login /> : <Signup />}
    </div>
}