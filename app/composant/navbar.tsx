import React from 'react'
import Link from "next/link";
//pour avoir notre url
import {usePathname} from "next/navigation";

type Navbar = {

  label?: string,
  href?: string
}

export default function navbar({}: Navbar) {

  //creons une variable de l'url
  const  pathName = usePathname()
  //maintenant en comparant exemple:    className = {pathName === ${link.href} ? " text-blue-50": ""} mais seulement dans mes composants clients



  const navItems = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Créer un stage",
      href: "/events/create"
    }
  ]

  return (
    <div className="navbar bg-base-100">
      <div>
        <Link href="/">
            {/* <a className="btn btn-ghost normal-case text-xl"> */}
              <img src="/images/logo_ibv.png" alt="logo" className="h-10" />
            {/* </a> */}
          </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
        {navItems.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>
              <button className="btn btn-ghost text-xl">{link.label}</button>
            </Link>
          </li>
          ))}
        </ul>
     </div>
    </div>
  )
}
