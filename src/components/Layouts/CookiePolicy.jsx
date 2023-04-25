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
          <p className="mb-10 leading-5">
            We may use advertising Cookies, social network Cookies or Audience Analysis Cookies. 
            You will be informed of this on your first visit to the Website/Application using these cookies. 
            You will then be invited to accept or refuse them in accordance with the terms described below.
          </p>
          <h2 className="mb-4 text-base uppercase font-bold">2.1 TECHNICAL AND FUNCTIONAL COOKIES</h2>
          <p className="mb-4 leading-5">
            Technical and functional Cookies are necessary for the proper functioning of the Website and to provide you with our services. They are used throughout your navigation, in order to facilitate it and to carry out certain functions.
          </p>
          <p className="mb-4 leading-5">
            For example, a technical Cookie may be used to store your responses to a form or your preferences regarding the language or layout of the Website, where such options are available.
          </p>
          <p className="mb-4 leading-5">
            We use the following technical and functional Cookies:
          </p>
          <h2 className="mb-4 text-base uppercase font-bold">2.1.A</h2>
          <p className="mb-4 leading-5">
            Cookie’s name: CookiesAlertBoxClosed
          </p>
          <p className="mb-4 leading-5">
            Cookie’s function: date on which the user has set up his consent
          </p>
          <p className="mb-4 leading-5">
            Data retention period: infinite
          </p>
          <p className="mb-4 leading-5">
            Link to the Privacy Policy: {' '}
            <a
              href='https://metatedstudio.com/policy/private'
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 cursor-pointer underline underline-offset-2 visited:text-purple-800 dark:visited:text-purple-400"
            >
              Privacy Policy
            </a> 
          </p>
          <h2 className="mb-4 text-base uppercase font-bold">2.1.B</h2>
          <p className="mb-4 leading-5">
            Cookie’s name: CookiesConsent
          </p>
          <p className="mb-4 leading-5">
            Cookie’s function: cookies consent data
          </p>
          <p className="mb-4 leading-5">
            Data retention period: infinite
          </p>
          <p className="mb-5 leading-5">
            Link to the Privacy Policy: {' '}
            <a
              href='https://metatedstudio.com/policy/private'
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 cursor-pointer underline underline-offset-2 visited:text-purple-800 dark:visited:text-purple-400"
            >
              Privacy Policy
            </a> 
          </p>
          <h2 className="mb-5 text-base uppercase font-bold">2.2 Advertising Cookies</h2>

          <h2 className="mb-5 text-base uppercase font-bold">2.3 Social Networks Cookies</h2>
          <h2 className="mb-5 text-base uppercase font-bold">2.4 AUDIENCE ANALYSIS COOKIES</h2>
          <h2 className="my-5 text-lg uppercase font-bold">3. Your Cookies Preferences</h2>
          <h2 className="mb-5 text-base uppercase font-bold"> COOKIES THAT CAN BE INSTALLED WITHOUT CONSENT</h2>
          <p className="mb-4 leading-5">
            Some cookies do not require your consent, such as:
          </p>
          <ol className="flex flex-col mt-4 mb-4 pl-9 list-decimal">
            <li className="list-item text-white leading-5">
              Technical or functional Cookies that are necessary for the operation of the Website.
            </li>
            <li className="list-item text-white leading-5">
              Certain Cookies for audience measurement or Cookies that enable to test different versions of the Website for the purpose of optimising editorial choices.
            </li>
          </ol>
          <h2 className="mb-5 text-base uppercase font-bold">ACCEPTANCE OR REFUSAL OF COOKIES SUBJECT TO YOUR EXPRESS CONSENT</h2>
          <p className="mb-4 leading-5">
            All other Cookies require your consent. These include Advertising Cookies, Social Networking Cookies and some Audience Analysis Cookies. You may freely choose to accept or decline the use of these Cookies.
          </p>
          <p className="mb-4 leading-5">
            You can accept or refuse these Cookies the first time you browse the Website.
          </p>
          <p className="mb-4 leading-5">
            You are free to withdraw your consent and more generally to change your preferences at any time {' '} <a className="inline-block inline-flex underline underline-offset-2 font-bold visited:text-amber-500 text-base cursor-pointer text-violet-800">via this following link</a>
          </p>
          <h2 className="mb-5 text-base uppercase font-bold">YOUR BROWSER SETTINGS</h2>
          <p className="mb-4 leading-5">
            It is also possible to set your browser to accept or reject certain Cookies.
          </p>
          <p className="mb-4 leading-5">
            Each browser offers different settings.
          </p>
          <h2 className="mb-5 text-base uppercase font-bold">ADVERTISING IDS</h2>
          <p className="mb-4 leading-5">
            Personal data about you may be collected in connection with your advertising ID.
          </p>
          <p className="mb-4 leading-5">
            Each mobile phone has its own unique advertising ID that allows advertisers to deliver targeted advertising.
          </p>
          <p className="mb-4 leading-5">
            Android and Apple allow mobile users to control their privacy in the settings, making it impossible to link their advertising history to future browsing.
          </p>
          <p className="mb-4 leading-5">
            You can deactivate and reset your ad ID at any time if you no longer wish to receive targeted ads:
          </p>
          <p className="mb-4 leading-5">
            You will likely receive the same number of ads but they will be less relevant.
          </p>
          <p className="mb-4 leading-5">
            Instructions for limiting ad tracking on iOS: {' '}
            
            <a
              href='https://support.apple.com/fr-fr/HT205223'
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 cursor-pointer hover:underline visited:text-purple-800 dark:visited:text-purple-400"
            >
              {`https://support.apple.com/fr-fr/HT205223`}
            </a> 
          </p>
          <p className="mb-4 leading-5">
            Instructions for disabling ad targeting on Android: {' '}
            
            <a
              href='https://support.google.com/ads/answer/2662922?hl=fr'
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 cursor-pointer hover:underline visited:text-purple-800 dark:visited:text-purple-400"
            >
              {`https://support.google.com/ads/answer/2662922?hl=fr`}
            </a> 
          </p>
          
        </div>
      </div>
    </>
  )
}
