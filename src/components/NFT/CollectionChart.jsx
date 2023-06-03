import React, {useState, useEffect} from 'react'

export default function CollectionChart ({type}){
  //states

  //effects
  return (
    <div className="shadow rounded-md p-4 min-w-fit w-full mx-auto">
      <div className="animate-pulse flex space-x-4 lg:space-x-8">
        {/*<div className="rounded-full bg-slate-700 h-10 w-10 lg:h-20 lg:w-20"></div>*/}
        <span className="font-heebo">coming soon</span>
        <div className="flex-1 space-y-6  lg:space-y-8 py-1">
          {/*<div className="h-2 lg:h-4 bg-slate-700 rounded"></div>*/}
          <div className="space-y-3 lg:space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 lg:h-4 bg-slate-700 rounded col-span-2"></div>
              <div className="lg:h-4 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 lg:h-4 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}