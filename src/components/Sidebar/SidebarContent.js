import React, { useContext } from 'react'
import routes from '../../routes/sidebar'
import { NavLink, Route, Routes } from 'react-router-dom'
import * as Icons from '../../icons'
import SidebarSubmenu from './SidebarSubmenu'
import { Button, WindmillContext } from '@windmill/react-ui'

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContent() {
  const { mode } = useContext(WindmillContext)
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <div className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
        <div className='mr-5 mt-5'>
          <div className='flex justify-center'>
              { mode === 'dark' ? (
                <img src={require("./../../assets/img/LogoWhite.png")} width={100} />
              ) : (
                <img src={require("./../../assets/img/LogoBlack.png")} width={100} />
              )}
          </div>
          <div className='mt-5 text-center'>Creators Dashboard</div>
        </div>
      </div>
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
            <NavLink
              to={route.path}
              className={({isActive, isPending})=>
              isActive ? "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 text-gray-800 dark:text-gray-100" : "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            }
            >
              <Routes>
              <Route path={route.path} exact={route.exact} />
              </Routes>
              <Icon className="w-5 h-5 dark:fill-current text-black dark:text-white" aria-hidden="true" icon={route.icon} />
              <span className="ml-4">{route.name}</span>
            </NavLink>
          </li>
          )
        )}

            <li className="px-6 py-3 fixed inset-x-0 bottom-0">
              <NavLink
                to={"https://neza.money/#faq"}
                target='_blank'
                className={({isActive, isPending})=>
                isActive ? "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 text-gray-800 dark:text-gray-100" : "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              }
              >
                <Routes>
                <Route path={"/"} exact={"/"} />
                </Routes>
                <Icon className="w-5 h-5 dark:fill-current text-black dark:text-white" aria-hidden="true" icon={"HelpIcon"} />
                <span className="ml-4">Help</span>
              </NavLink>
            </li>
      </ul>
      {/* <div className="px-6 my-6">
        <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white">
          Create account
          <span  className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div> */}
    </div>
  )
}

export default SidebarContent
