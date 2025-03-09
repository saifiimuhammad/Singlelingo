import { Button } from "@/components/ui/button";
import { supabase } from "@/db/db";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";

import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem("user");
    navigate("/login");
    if (error) {
      alert(error);
    }
  };

  return (
    <header className="header fixed top-0 left-0 w-full">
      <nav className="nav w-full px-4 md:px-8 bg-zinc-800 text-white h-[80px] flex items-center justify-between">
        <h1 className="text-xl lg:text-2xl">
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
        <div className="flex items-center justify-center gap-x-2 lg:gap-x-4">
          <Button
            variant="outline"
            className="bg-zinc-800 text-md lg:text-lg"
            disabled={localStorage.getItem("user") ? true : false}
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button
            variant="outline"
            className="bg-zinc-800 text-md lg:text-lg"
            onClick={handleLogout}
            disabled={localStorage.getItem("user") ? false : true}
          >
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
};
export default Header;
