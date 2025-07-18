import { FONTS } from "../../constants/uiConstants"

const PasswordSettings = () => {
  return (
    <div className="p-5 pb-52" style={{}}>
    <div className="grid grid-cols-2 gap-4">
     
<div className="">
  <label style={{...FONTS.paragraph}} className="block mb-2 text-sm font-medium !text-gray-900 dark:text-white">Old Password</label>
  <div className="relative">
    <input id="hs-toggle-password" type="password" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-3/4" placeholder="Enter your old password" />
    <button type="button" data-hs-toggle-password='{
        "target": "#hs-toggle-password"
      }' className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500">
      <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
        <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
        <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
        <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
        <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
      </svg>
    </button>
  </div>
</div>


<div className="">
  <label style={{...FONTS.paragraph}} className="block mb-2 text-sm font-medium !text-gray-900 dark:text-white">New Password</label>
  <div className="relative">
    <input id="hs-toggle-password" type="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-3/4" placeholder="Enter your new password" />
    <button type="button" data-hs-toggle-password='{
        "target": "#hs-toggle-password"
      }' className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500">
      <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
        <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
        <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
        <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
        <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
      </svg>
    </button>
  </div>
</div>
 </div>
    <div className="mt-8">
  <label style={{...FONTS.paragraph}} className="block mb-2 text-sm font-medium !text-gray-900 dark:text-white">Confirm Password</label>
  <div className="relative">
    <input id="hs-toggle-password" type="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-3/4" placeholder="Enter your confirm password" />
    <button type="button" data-hs-toggle-password='{
        "target": "#hs-toggle-password"
      }' className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500 ">
      <svg className="shrink-0 size-3.5 " width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
        <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
        <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
        <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
        <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
      </svg>
    </button>
  </div>
</div>
<div className="mt-10 flex">
    <button className=" rounded-3xl p-3 text-[12px] !text-white"style={{ backgroundColor: "#9b111e", ...FONTS.subParagraph }}>Confirm Password</button>
    <a href="#" style={{...FONTS.paragraph}} className="text-red-700 ml-auto">Forgot Password ?</a>
</div>
</div>
  )
}

export default PasswordSettings