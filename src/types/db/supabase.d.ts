export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Archivo: {
        Row: {
          id: string
          id_avance: string
          nombre: string
          ruta: string
        }
        Insert: {
          id?: string
          id_avance?: string
          nombre: string
          ruta: string
        }
        Update: {
          id?: string
          id_avance?: string
          nombre?: string
          ruta?: string
        }
        Relationships: [
          {
            foreignKeyName: "Archivo_id_avance_fkey"
            columns: ["id_avance"]
            isOneToOne: false
            referencedRelation: "Avance"
            referencedColumns: ["id"]
          },
        ]
      }
      Avance: {
        Row: {
          contenido: string
          fecha: string
          id: string
          id_proyecto: string
          nombre: string
        }
        Insert: {
          contenido: string
          fecha: string
          id?: string
          id_proyecto?: string
          nombre: string
        }
        Update: {
          contenido?: string
          fecha?: string
          id?: string
          id_proyecto?: string
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "Avance_id_proyecto_fkey"
            columns: ["id_proyecto"]
            isOneToOne: false
            referencedRelation: "Proyecto"
            referencedColumns: ["id"]
          },
        ]
      }
      Carrera: {
        Row: {
          id: string
          id_facultad: string
          nombre: string
        }
        Insert: {
          id?: string
          id_facultad?: string
          nombre: string
        }
        Update: {
          id?: string
          id_facultad?: string
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "Carrera_id_facultad_fkey"
            columns: ["id_facultad"]
            isOneToOne: false
            referencedRelation: "Facultad"
            referencedColumns: ["id"]
          },
        ]
      }
      Estudiante_proyecto: {
        Row: {
          id_estudiante: string
          id_proyecto: string
        }
        Insert: {
          id_estudiante?: string
          id_proyecto?: string
        }
        Update: {
          id_estudiante?: string
          id_proyecto?: string
        }
        Relationships: [
          {
            foreignKeyName: "estudiante_proyecto_id_estudiante_fkey"
            columns: ["id_estudiante"]
            isOneToOne: false
            referencedRelation: "Usuario"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estudiante_proyecto_id_proyecto_fkey"
            columns: ["id_proyecto"]
            isOneToOne: false
            referencedRelation: "Proyecto"
            referencedColumns: ["id"]
          },
        ]
      }
      Facultad: {
        Row: {
          id: string
          nombre: string
        }
        Insert: {
          id?: string
          nombre: string
        }
        Update: {
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      Proyecto: {
        Row: {
          descripcion: string
          estado: Database["public"]["Enums"]["estado"]
          id: string
          id_semillero: string | null
          id_tutor: string | null
          nombre: string
        }
        Insert: {
          descripcion: string
          estado: Database["public"]["Enums"]["estado"]
          id?: string
          id_semillero?: string | null
          id_tutor?: string | null
          nombre: string
        }
        Update: {
          descripcion?: string
          estado?: Database["public"]["Enums"]["estado"]
          id?: string
          id_semillero?: string | null
          id_tutor?: string | null
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "Proyecto_id_semillero_fkey"
            columns: ["id_semillero"]
            isOneToOne: false
            referencedRelation: "Semillero"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Proyecto_id_tutor_fkey"
            columns: ["id_tutor"]
            isOneToOne: false
            referencedRelation: "Usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      Semillero: {
        Row: {
          descripcion: string
          id: string
          id_carrera: string | null
          id_coordinador: string | null
          nombre: string
        }
        Insert: {
          descripcion: string
          id?: string
          id_carrera?: string | null
          id_coordinador?: string | null
          nombre: string
        }
        Update: {
          descripcion?: string
          id?: string
          id_carrera?: string | null
          id_coordinador?: string | null
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "Semillero_id_carrera_fkey"
            columns: ["id_carrera"]
            isOneToOne: false
            referencedRelation: "Carrera"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Semillero_id_coordinador_fkey"
            columns: ["id_coordinador"]
            isOneToOne: false
            referencedRelation: "Usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      Usuario: {
        Row: {
          correo: string
          id: string
          id_carrera: string | null
          nombre: string
          rol: Database["public"]["Enums"]["rol"]
        }
        Insert: {
          correo: string
          id?: string
          id_carrera?: string | null
          nombre: string
          rol: Database["public"]["Enums"]["rol"]
        }
        Update: {
          correo?: string
          id?: string
          id_carrera?: string | null
          nombre?: string
          rol?: Database["public"]["Enums"]["rol"]
        }
        Relationships: [
          {
            foreignKeyName: "Usuarios_id_carrera_fkey"
            columns: ["id_carrera"]
            isOneToOne: false
            referencedRelation: "Carrera"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      estado: "nuevo" | "continuacion" | "finalizado"
      rol: "estudiante" | "tutor" | "coordinador"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
