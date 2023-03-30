import React from 'react'

export default function CookiePolicy() {
  //Security measure to validate external site urls
  function valURL(url) {
    const parsed = url
    return ['https:', 'http:'].includes(parsed.protocol)
  }
  return (
    <>
      <div className="font-sans p-8 mt-6 sm:mt-8 items-center">
        <h1 className="text-sm lg:text-lg xl:text-xl mb-8 uppercase">Cookies Policy</h1>
        <div className="mt-10 text-left">
          <h2 className="my-5 text-lg font-bold uppercase">1. What is a cookie? </h2>
          <p className="mb-10 leading-5">
            When browsing our website metatedstudio.com (hereafter referred to as the “Website”), 
            cookies, pixels, tags and other trackers (hereafter referred to as the “Cookies”) 
            are installed on your terminal. 
          </p>
          <h2 className="my-5 text-lg font-bold uppercase">2. Cookies Identification</h2>
          <p className="mb-5 leading-5">
            We may use advertising Cookies, social network Cookies or Audience Analysis Cookies. 
            You will be informed of this on your first visit to the Website/Application using these cookies. 
            You will then be invited to accept or refuse them in accordance with the terms described below.
          </p>
          
          <h2 className="my-5 text-lg uppercase font-bold">3. Your Cookies Preferences</h2>
          <p className="mb-10 leading-5">
            All the materials on MetaTed Labs LLC<span>&#39;</span>s Websites are provided <span>&#8220;</span>as is<span>&#8221;</span>. 
            MetaTed Labs LLC makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, MetaTed Labs LLC does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
          </p>
          <h2 className="my-5 text-lg font-bold">4. Limitations</h2>
          <p className="mb-10 leading-5">
            MetaTed Labs LLC or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on MetaTed Labs LLC<span>&#39;</span>s Website, 
            even if MetaTed Labs LLC or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. 
            Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
          </p>
          <h2 className="mt-6 mb-2 text-lg">5. Revisions and Errata</h2>
          <p className="mb-1 leading-5">
            The materials appearing on MetaTed Labs LLC<span>&#39;</span>s Website may include technical, typographical, or photographic errors. 
            MetaTed Labs LLC will not promise that any of the materials in this Website are accurate, complete, or current. 
            MetaTed Labs LLC may change the materials contained on its Website at any time without notice. 
            MetaTed Labs LLC does not make any commitment to update the materials.
          </p>
          <h2 className="mt-6 mb-2 text-lg">6. Links</h2>
          <p className="mb-1 leading-5">
            MetaTed Labs LLC has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. 
            The presence of any link does not imply endorsement by MetaTed Labs LLC of the site. 
            The use of any linked website is at the user<span>&#39;</span>s own risk.
          </p>
          <h2 className="mt-6 mb-2 text-lg">7. Site Terms of Use Modifications</h2>
          <p className="mb-1 leading-5">
            MetaTed Labs LLC may revise these Terms of Use for its Website at any time without prior notice.
            By using this Website, 
            you are agreeing to be bound by the current version of these Terms and Conditions of Use.
          </p>
          <h2 className="mt-6 mb-2 text-lg ">8. Your Privacy</h2>
          <p className="mb-1 leading-5">
            Please read our <button className="hover:underline font-bold visited:text-amber-500 text-base cursor-pointer text-violet-800" onClick={()=> alert("Privacy Policy coming soon")}>Privacy Policy</button>
          </p>
          <h2 className="mt-6 mb-2 text-lg ">9. Governing Law</h2>
          <p className="mb-1 leading-5">
            Any claim related to MetaTed Labs LLC<span>&#39;</span>s Website shall be governed 
            by the laws of us without regards to its conflict of law provisions.
          </p>
        </div>
      </div>
    </>
  )
}
