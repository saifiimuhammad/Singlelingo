import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";

import { Link } from "react-router-dom";

// const navLinks = [
//   {
//     title: "Home",
//     to: "/",
//   },
//   {
//     title: "Learn",
//     to: "/learn",
//   },
//   {
//     title: "Quiz",
//     to: "/quiz",
//   },
//   {
//     title: "Result",
//     to: "/result",
//   },
// ];

const Header = () => {
  return (
    <header className="header fixed top-0 left-0 w-full">
      <nav className="nav w-full px-4 md:px-8 bg-zinc-800 text-white h-[80px] flex items-center justify-between">
        <h1 className="text-2xl">
          <Link to="/">Singlelingo</Link>
        </h1>
        {/* <NavigationMenu className="bg-transparent">
          <NavigationMenuList>
            {navLinks.map(({ title, to }, key) => {
              return (
                <NavigationMenuItem key={key}>
                  <NavigationMenuLink className="text-lg px-6" asChild>
                    <Link to={to}>{title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu> */}
        <Button variant="outline" className="bg-zinc-800 text-lg">
          <Link to="/login">Login</Link>
        </Button>
      </nav>
    </header>
  );
};
export default Header;
