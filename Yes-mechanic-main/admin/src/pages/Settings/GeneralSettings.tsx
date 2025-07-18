import { useState } from "react"
import PasswordSettings from "./PasswordSettings"
import ProfileEditSettings from "./ProfileEditSettings"

const GeneralSettings = () => {
const [tab, setTab] = useState<string>("Account Settings")
// const [buttonColor,setbuttonColor] = useState<string>("transparent")


const handleRenderComponent = (tabText: string) => {
  setTab(tabText)
}
 
  return (
    <>
    
    <div className="p-5">
      <div className="border-b-2 border-orange-700 pb-8">
        <h1 className="text-3xl top-0 text-[#9b111e] font-bold">Settings</h1>
      </div>
      <div className="mt-10">
      <button onClick={()=>handleRenderComponent("Account Settings")} className={`border-[#9b111e] font-semibold py-2 px-4 ml-4 border rounded-full ${tab === "Account Settings" ? "bg-[#9b111e] text-white" : "bg-transparent text-orange-800"}`}>
      Account Settings
      </button>
      <button onClick={()=>handleRenderComponent("Change Password")} className={`border-[#9b111e] font-semibold py-2 px-4 ml-4 border rounded-full ${tab === "Change Password" ? "bg-[#9b111e] text-white" : "bg-transparent text-[#9b111e]"}`}>
      Change Password
      </button>
      
    </div>
    </div>
    {tab === "Account Settings" && <div><ProfileEditSettings /></div> }
    {tab === "Change Password" && <div><PasswordSettings /></div> }      
     <div></div>
     <div></div>
     <div></div>
    </>
  )
}

export default GeneralSettings