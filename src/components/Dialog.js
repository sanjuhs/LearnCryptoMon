import React from 'react'

function Dialog({dialogtext,closeDialogHandler}) {
  return (
    <div className='flex flex-col z-30 w-[80%] h-[500px] p-4 absolute top-[10%] left-[10%] bg-white border-black rounded-xl'>
        <div onClick={closeBattleHandler}
                className='flex flex-row justify-end text-2xl cursor-pointer mx-1 my-1'>x</div>
    </div>
  )
}

export default Dialog