/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function ProfilePage() {
  const router = useRouter();
  const logout = async ()=>{  
      try {

        await axios.get('api/users/logout')
        toast.success('Logout successful')
        router.push('/login');

      }catch (error: any){
        console.log(error.message);

        toast.error(error.message);
      }
  }
    return (
  <div className="flex flex-col mt-10 justify-center item-center">
    <h1 className="font-bold p-2 m-2 text-black">Profile</h1>
    <hr/>
    <p>Profile Page</p>
    <hr />
    <button
    onClick={logout}
    className="items-center bg-red-500 hover:bg-red-800 font-bold p-2 m-2"
    >
      Logout
    </button>
    </div>
    )
  
}