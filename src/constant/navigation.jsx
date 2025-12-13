import{IoMdHome} from "react-icons/io";
import { BiSolidMoviePlay } from "react-icons/bi";
import { PiTelevision } from "react-icons/pi";
import { IoIosSearch} from "react-icons/io";

export const navigation = [
    {
      label: "Tv shows",
      href: '/tv',
      icon:PiTelevision
    },
    {
      label: "Movies",
      href: '/movie',
      icon:BiSolidMoviePlay  }
  ]

  export const mobileNavigation=[
    {
      label: "Home",
      href: '/',
      icon:IoMdHome
    },
    ...navigation,
    {
       label: "Search",
      href: '/search',
      icon: IoIosSearch
    }
  ]