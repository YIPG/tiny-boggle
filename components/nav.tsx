import Link from "next/link"

const links = [{ href: "https://github.com/yipg/tiny-boggle", label: "GitHub" }]

export default function Nav() {
  return (
    <nav>
      <ul className="flex justify-between items-center p-8">
        <li>
          <Link href="/">
            <a className="btn-blue no-underline">Boggle</a>
          </Link>
        </li>
        <ul className="flex justify-between items-center">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`} className="ml-4">
              <a href={href} className="text-blue-500 no-underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  )
}
