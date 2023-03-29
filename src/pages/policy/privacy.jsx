import Head from "next/head";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';
import {useRouter} from 'next/router';
import { IconContext } from "react-icons";
import { FcComboChart, FcDocument } from "react-icons/fc";
import { GrDocument } from "react-icons/gr";
import { HiClipboardDocumentList } from "react-icons/hi"
export default function NotFound404() {
  const router = useRouter();
  const routeBack = (e) => {
    e.preventDefault();
    router.back();
  };
  const METATEDS_HOME = '/'
  return (
    <>
      <Head>
        <title>Privacy | MetaTeds</title>
      </Head>
      <div className="bg-slate-900 h-screen">
        <div className="mx-auto min-h-full overflow-y-auto p-4 px-8 items-center lg:max-w-screen-xl">
          <nav className="flex items-center justify-between top-0 pointer-event-auto z-nav w-full">
            <div className="mt-4 w-full">
              <div className="flex items-center cursor-pointer pointer-events-auto inline-flex flex-row px-4">
                <div className="p-2 hover:bg-indigo-700 rounded-lg cursor-pointer">
                  <a href="#" onClick={routeBack} className="inline-flex items-center gap-x-2 flex">
                    <ArrowSmallLeftIcon className="text-white h-5 w-5 items-center" />
                    <p className="inline-block items-center">Back</p>
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <div className="p-4 mx-auto overflow-hidden items-center text-center text-slate-50 transform transition-all my-4 sm:my-8 sm:p-5 opacity-100 translate-y-0 sm:scale-100">
            <div className="mb-8 items-center flex justify-center">
              <IconContext.Provider value={{ size: "4em", className: "global-class-name" }} >
                <div>
                  <FcDocument />
                </div>
              </IconContext.Provider>
            </div>
            <div className="font-sans p-8 mt-6 sm:mt-8 items-center">
              <h1 className="text-sm lg:text-lg xl:text-xl mb-8 uppercase">Privacy Policy</h1>
              <div className="mt-10 text-left">
                <p className="mb-1 font-sans leading-5">
                  At MetaTeds, accessible from{" "}
                  <a
                    href={process.env.NEXT_PUBLIC_VERCEL_BASE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 cursor-pointer hover:underline visited:text-purple-800 dark:visited:text-purple-400"
                  >

                    {`${process.env.NEXT_PUBLIC_VERCEL_BASE_URL}`}
                  </a> {' '} and {' '}
                  <a
                    href={process.env.NEXT_PUBLIC_VERCEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 cursor-pointer hover:underline visited:text-purple-800 dark:visited:text-purple-400"
                  >

                    {`${process.env.NEXT_PUBLIC_VERCEL_URL}`}
                  </a>
                  ,{' '} one of our main priorities is the privacy of our
                  visitors. This Privacy Policy document contains types of
                  information that is collected and recorded by MetaTeds
                  and how we use it.
                </p>

                <p className="mb-1 font-sans leading-5">
                  If you have additional questions or require more
                  information about our Privacy Policy, do not hesitate to
                  contact us.
                </p>

                <p className="mb-1 font-sans leading-5">
                  This Privacy Policy applies only to our online
                  activities and is valid for visitors to our website with
                  regards to the information that they shared and/or
                  collect in MetaTeds. This policy is not applicable to
                  any information collected offline or via channels other
                  than this website. Our Privacy Policy was created with
                  the help of the{" "}
                  <a
                    href="https://www.privacypolicygenerator.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 cursor-pointer hover:underline visited:text-purple-800 dark:visited:text-purple-400"
                  >
                    Free Privacy Policy Generator
                  </a>
                  .
                </p>

                <h2 className="mt-6 mb-2 text-lg">Consent</h2>

                <p className="mb-1 font-sans leading-5">
                  By using our website, you hereby consent to our Privacy
                  Policy and agree to its terms.
                </p>

                <h2 className="mt-6 mb-2 text-lg">
                  Information we collect
                </h2>

                <p className="mb-1 font-sans leading-5">
                  The personal information that you are asked to provide,
                  and the reasons why you are asked to provide it, will be
                  made clear to you at the point we ask you to provide
                  your personal information.
                </p>
                <p className="mb-1 font-sans leading-5">
                  If you contact us directly, we may receive additional
                  information about you such as your name, email address,
                  phone number, the contents of the message and/or
                  attachments you may send us, and any other information
                  you may choose to provide.
                </p>
                <p className="mb-1 font-sans leading-5">
                  When you register for an Account, we may ask for your
                  contact information, including items such as name,
                  company name, address, email address, and telephone
                  number.
                </p>

                <h2 className="mt-6 mb-2 text-lg">
                  How we use your information
                </h2>

                <p className="mb-1 font-sans leading-5">
                  We use the information we collect in various ways,
                  including to:
                </p>

                <ul className="flex flex-col pl-8 mt-2 mb-6 list-disc">
                  <li className="font-sans list-item leading-5">
                    Provide, operate, and maintain our website
                  </li>
                  <li className="font-sans list-item leading-5">
                    Improve, personalize, and expand our website
                  </li>
                  <li className="font-sans list-item leading-5">
                    Understand and analyze how you use our website
                  </li>
                  <li className="font-sans list-item leading-5">
                    Develop new products, services, features, and
                    functionality
                  </li>
                  <li className="font-sans list-item leading-5">
                    Communicate with you, either directly or through one
                    of our partners, including for customer service, to
                    provide you with updates and other information
                    relating to the website, and for marketing and
                    promotional purposes
                  </li>
                  <li className="font-sans list-item leading-5">
                    Find and prevent fraud
                  </li>
                </ul>

                <h2 className="mt-6 mb-2 text-lg">Log Files</h2>

                <p className="mb-1 font-sans leading-5">
                  MetaTeds follows a standard procedure of using log
                  files. These files log visitors when they visit
                  websites. All hosting companies do this and a part of
                  hosting services&apos; analytics. The information
                  collected by log files include internet protocol (IP)
                  addresses, browser type, Internet Service Provider
                  (ISP), date and time stamp, referring/exit pages, and
                  possibly the number of clicks. These are not linked to
                  any information that is personally identifiable. The
                  purpose of the information is for analyzing trends,
                  administering the site, tracking users&apos; movement on
                  the website, and gathering demographic information.
                </p>

                <h2 className="mt-6 mb-2 text-lg">
                  Advertising Partners Privacy Policies
                </h2>

                <p className="mb-1 font-sans leading-5">
                  You may consult this list to find the Privacy Policy for
                  each of the advertising partners of MetaTeds.
                </p>

                <p className="mb-1 font-sans leading-5">
                  Third-party ad servers or ad networks uses technologies
                  like cookies, JavaScript, or Web Beacons that are used
                  in their respective advertisements and links that appear
                  on MetaTeds, which are sent directly to users&apos;
                  browser. They automatically receive your IP address when
                  this occurs. These technologies are used to measure the
                  effectiveness of their advertising campaigns and/or to
                  personalize the advertising content that you see on
                  websites that you visit.
                </p>

                <p className="mb-1 font-sans leading-5">
                  Note that MetaTeds has no access to or control over
                  these cookies that are used by third-party advertisers.
                </p>

                <h2 className="mt-6 mb-2 text-lg">
                  Third Party Privacy Policies
                </h2>

                <p className="mb-1 font-sans leading-5">
                  MetaTeds&apos;s Privacy Policy does not apply to other
                  advertisers or websites. Thus, we are advising you to
                  consult the respective Privacy Policies of these
                  third-party ad servers for more detailed information. It
                  may include their practices and instructions about how
                  to opt-out of certain options.{" "}
                </p>

                <p className="mb-1 font-sans leading-5">
                  You can choose to disable cookies through your
                  individual browser options. To know more detailed
                  information about cookie management with specific web
                  browsers, it can be found at the browsers&apos;
                  respective websites.
                </p>

                <h2 className="mt-6 mb-2 text-lg">
                  CCPA Privacy Rights (Do Not Sell My Personal
                  Information)
                </h2>

                <p className="mb-1 font-sans leading-5">
                  Under the CCPA, among other rights, California consumers
                  have the right to:
                </p>
                <p className="mb-1 font-sans leading-5">
                  Request that a business that collects a consumer&apos;s
                  personal data disclose the categories and specific
                  pieces of personal data that a business has collected
                  about consumers.
                </p>
                <p className="mb-1 font-sans leading-5">
                  Request that a business delete any personal data about
                  the consumer that a business has collected.
                </p>
                <p className="mb-1 font-sans leading-5">
                  Request that a business that sells a consumer&apos;s
                  personal data, not sell the consumer&apos;s personal
                  data.
                </p>
                <p className="mb-1 font-sans leading-5">
                  If you make a request, we have one month to respond to
                  you. If you would like to exercise any of these rights,
                  please contact us.
                </p>

                <h2 className="mt-6 mb-2 text-lg">
                  GDPR Data Protection Rights
                </h2>

                <p className="mb-1 font-sans leading-5">
                  We would like to make sure you are fully aware of all of
                  your data protection rights. Every user is entitled to
                  the following:
                </p>
                <p className="mb-1 font-sans leading-5">
                  The right to access – You have the right to request
                  copies of your personal data. We may charge you a small
                  fee for this service.
                </p>
                <p className="mb-1 font-sans leading-5">
                  The right to rectification – You have the right to
                  request that we correct any information you believe is
                  inaccurate. You also have the right to request that we
                  complete the information you believe is incomplete.
                </p>
                <p className="mb-1 font-sans leading-5">
                  The right to erasure – You have the right to request
                  that we erase your personal data, under certain
                  conditions.
                </p>
                <p className="mb-1 font-sans leading-5">
                  The right to restrict processing – You have the right to
                  request that we restrict the processing of your personal
                  data, under certain conditions.
                </p>
                <p className="mb-1 font-sans leading-5">
                  The right to object to processing – You have the right
                  to object to our processing of your personal data, under
                  certain conditions.
                </p>
                <p className="mb-1 font-sans leading-5">
                  The right to data portability – You have the right to
                  request that we transfer the data that we have collected
                  to another organization, or directly to you, under
                  certain conditions.
                </p>
                <p className="mb-1 font-sans leading-5">
                  If you make a request, we have one month to respond to
                  you. If you would like to exercise any of these rights,
                  please contact us.
                </p>

                <h2 className="mt-6 mb-2 text-lg">
                  Children&apos;s Information
                </h2>

                <p className="mb-1 font-sans leading-5">
                  Another part of our priority is adding protection for
                  children while using the internet. We encourage parents
                  and guardians to observe, participate in, and/or monitor
                  and guide their online activity.
                </p>

                <p className="mb-1 font-sans leading-5">
                  MetaTeds does not knowingly collect any Personal
                  Identifiable Information from children under the age of
                  13. If you think that your child provided this kind of
                  information on our website, we strongly encourage you to
                  contact us immediately and we will do our best efforts
                  to promptly remove such information from our records.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        
      </div>
      
    </>
  );
}