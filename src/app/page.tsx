import { sanity } from '../../lib/sanity'

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
  const person = await sanity.fetch(query)

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">{person.name}</h1>
      <h2 className="text-xl text-gray-600 mb-4">{person.title}</h2>
      <p className="mb-6">{person.bio}</p>

      {person.profileImage?.asset?.url && (
        <img
          src={person.profileImage.asset.url}
          alt={person.name}
          className="rounded-full w-40 h-40 object-cover mb-8"
        />
      )}

      <h3 className="text-2xl font-semibold mb-2">Erfaring</h3>
      <ul className="space-y-2">
        {person.experiences?.map((exp: any, i: number) => (
          <li key={i} className="border-b pb-2">
            <strong>{exp.role}</strong> @ {exp.company}  
            <br />
            ({exp.startDate} – {exp.isCurrent ? 'nå' : exp.endDate})
          </li>
        ))}
      </ul>
    </main>
  )
}
