import { sanity } from '../../lib/sanity'
import Image from 'next/image'

type Experience = {
  company: string
  role: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
}

type Person = {
  name: string
  title: string
  bio: string
  profileImage?: {
    asset: {
      url: string
    }
  }
  experiences?: Experience[]
}

const query = `
  *[_type == "person"][0]{
    name,
    title,
    bio,
    profileImage {
      asset->{
        url
      }
    },
    experiences[]->{
      company,
      role,
      startDate,
      endDate,
      isCurrent
    }
  }
`

export default async function HomePage() {
  const person: Person = await sanity.fetch(query)

  return (
    <main className="p-6 max-w-4xl mx-auto font-sans grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
      {/* Venstreside: Profil */}
      <aside className="bg-pink-100 p-6 rounded-xl flex flex-col items-center text-center md:items-start md:text-left">
        {person.profileImage?.asset?.url && (
        <div className="w-40 h-40 relative rounded-full overflow-hidden mb-8">
  <Image
    src={person.profileImage.asset.url}
    alt={person.name}
    fill
    className="object-cover"
  />
</div>
        )}
        <h1 className="text-2xl font-bold">{person.name}</h1>
        <h2 className="text-lg text-gray-700">{person.title}</h2>
        <p className="mt-4 text-sm text-gray-800">{person.bio}</p>
      </aside>

      {/* Høyreside: Erfaring */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">Erfaring</h3>
        <ul className="space-y-4">
          {person.experiences?.map((exp, i) => (
            <li key={i} className="border-b pb-2">
              <strong>{exp.role}</strong> @ {exp.company}
              <br />
              ({exp.startDate} – {exp.isCurrent ? 'nå' : exp.endDate})
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
