import { Nav } from "../components/common/nav"
import { FacultiesContainer } from "../components/faculties/faculties-container"

function FacultiesPage() {
  return (
    <>
      <Nav />
      <main className="px-4 max-w-4xl mx-auto">
        <h1
          className="text-3xl lg:text-4xl font-bold text-primary-100 text-center mt-2"
        >Facultades</h1>
        <FacultiesContainer className="my-10" />
      </main>
    </>
  )
}

export default FacultiesPage