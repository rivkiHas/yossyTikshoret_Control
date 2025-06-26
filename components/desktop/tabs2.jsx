import React from 'react'
import StepOne from './step1'
import StepTwo from './step2'
import StepThree from './step3'

const Tabs2 = () => {
  return (
    <div>
       <div id='step-one'> <StepOne /></div>
       <div id='step-two'> <StepTwo /></div>
      <div id='step-three'>  <StepThree /></div>
      <div className="fixed top-[80vh] right-4 z-50 flex items-center bg-yellow-400 rounded-full px-4 py-2 shadow-md w-fit">
 
   <a href="#step-three" className="bg-black text-white rounded-full flex items-center px-3 py-1 mx-1">
    <img src="/images/homeIcon.png" alt="אייקון 3" className="w-5 h-5 ml-2" />
    <div className="text-right">
      <div className="text-sm font-bold">שלב ראשון</div>
      <div className="text-xs">פרטים על העסק</div>
    </div>
  </a>
  <a href="#step-one" className="bg-white rounded-full w-10 h-10 flex items-center justify-center mx-1">
    <img src="/images/homeIcon.png" alt="אייקון 1" className="w-5 h-5" />
  </a>

  {/* כפתור שני - עיגול לבן עם אייקון */}
  <a href="#step-two" className="bg-white rounded-full w-10 h-10 flex items-center justify-center mx-1">
    <img src="/images/homeIcon.png" alt="אייקון 2" className="w-5 h-5" />
  </a>
 
</div>
 

    </div>
  )
}

export default Tabs2