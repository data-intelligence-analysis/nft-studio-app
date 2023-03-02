import React, {useState, useEffect, useRouter} from 'react'

const AWSRpg = ({props}) => {
  return(
    <>
      <div className="flex mt-3 mb-2 w-full relative gap-x-6 webkitutil-center text-center items-start">
        {props.period.map((elem, i) => (
          <div key={i}>
            <button
              onClick={() => alert("coming soon")}
              type="button"
              key={props.id} 
              className={`hover:transition transition-all bg-slate-800 px-4 lg:px-6 hover:bg-indigo-500 hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-sky-900 inline-flex webkitutil-center webkit-box-pack items-center align-middle rounded-md font-semibold justify-center relative border-0 h-14 min-w-[3rem] select-none`}>
              <h3 className="font-sans text-sm sm:text-base">
                {elem.time}
              </h3>
            </button>
          </div>
        ))}
      </div>
    </>
  )

}

export default AWSRpg