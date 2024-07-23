"use client"

import { Database } from "@/src/types/db/supabase"
import { createClient } from "@/src/utils/supabase/client"
import { useEffect, useState } from "react"
import { ProjectForm } from "./project-form"

interface Props {
  className?: string
}

export const AddProjectForm = ({
  className
}: Props) => {
  const [error, setError] = useState("")
  const [careers, setCareers] = useState<Database['public']['Tables']['Carrera']['Row'][]>([])
  const [career, setCareer] = useState<Database['public']['Tables']['Carrera']['Row'] | null>(null)
  const [seeders, setSeeders] = useState<Database['public']['Tables']['Semillero']['Row'][]>([])

  useEffect(() => {
    const fetchCareers = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('Carrera').select('*')

      if (error) return setCareers([])

      setCareers(data)
    }
    fetchCareers()
  }, [])

  useEffect(() => {
    if (!career) return

    const fetchSeeders = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('Semillero')
        .select('*')
        .eq('id_carrera', career.id)

      if (error || !data) return setSeeders([])

      setSeeders(data)
    }
    fetchSeeders()
  }, [career])

  return (
    <>
      <ProjectForm
        className={className}
        setCareer={setCareer}
        seeders={seeders}
        careers={careers}
        setError={setError}
      />
      {error && <p className="text-red-800">{error}</p>}
    </>
  )
}