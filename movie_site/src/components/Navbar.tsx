import { NavLink } from "react-router-dom"

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/movies/popular", label: "인기 영화" },
  { to: "/movies/now_playing", label: "상영 중" },
  { to: "/movies/top_rated", label: "평점 높은" },
  { to: "/movies/upcoming", label: "개봉 예정" },
]

export const Navbar = () => {
  return (
    <div className='flex gap-3 p-4'>
      {LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? 'text-lg text-gray-900 font-bold' : 'text-lg text-gray-600 hover:text-gray-900'
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  )
}
