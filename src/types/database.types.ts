export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      Artist: {
        Row: {
          artistImgURL: string
          artistInfo: string
          artistName: string
          genres: string
          id: number
          instarURL: string
          otherURL: string
          soundURL: string
          userId: number
          youtubeURL: string
        }
        Insert: {
          artistImgURL: string
          artistInfo: string
          artistName: string
          genres: string
          id?: number
          instarURL: string
          otherURL: string
          soundURL: string
          userId: number
          youtubeURL: string
        }
        Update: {
          artistImgURL?: string
          artistInfo?: string
          artistName?: string
          genres?: string
          id?: number
          instarURL?: string
          otherURL?: string
          soundURL?: string
          userId?: number
          youtubeURL?: string
        }
        Relationships: [
          {
            foreignKeyName: "Artist_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      ArtistBlockUser: {
        Row: {
          artistId: number
          userId: number
        }
        Insert: {
          artistId: number
          userId: number
        }
        Update: {
          artistId?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "ArtistBlockUser_artistId_fkey"
            columns: ["artistId"]
            isOneToOne: false
            referencedRelation: "Artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ArtistBlockUser_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      ArtistMember: {
        Row: {
          artistId: number
          userId: number
        }
        Insert: {
          artistId: number
          userId: number
        }
        Update: {
          artistId?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "ArtistMember_artistId_fkey"
            columns: ["artistId"]
            isOneToOne: false
            referencedRelation: "Artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ArtistMember_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Auth: {
        Row: {
          acToken: string
          id: number
          provider: string
          reToken: string
          uid: number
        }
        Insert: {
          acToken: string
          id?: number
          provider: string
          reToken: string
          uid: number
        }
        Update: {
          acToken?: string
          id?: number
          provider?: string
          reToken?: string
          uid?: number
        }
        Relationships: []
      }
      Busking: {
        Row: {
          artistId: number
          buskingInfo: string
          buskingName: string
          endTime: string
          id: number
          latitude: number
          longitude: number
          startTime: string
        }
        Insert: {
          artistId: number
          buskingInfo: string
          buskingName: string
          endTime: string
          id?: number
          latitude: number
          longitude: number
          startTime: string
        }
        Update: {
          artistId?: number
          buskingInfo?: string
          buskingName?: string
          endTime?: string
          id?: number
          latitude?: number
          longitude?: number
          startTime?: string
        }
        Relationships: [
          {
            foreignKeyName: "Busking_artistId_fkey"
            columns: ["artistId"]
            isOneToOne: false
            referencedRelation: "Artist"
            referencedColumns: ["id"]
          },
        ]
      }
      Report: {
        Row: {
          artistId: number
          id: number
          report: string
          reportType: number
          userId: number
        }
        Insert: {
          artistId: number
          id?: number
          report: string
          reportType: number
          userId: number
        }
        Update: {
          artistId?: number
          id?: number
          report?: string
          reportType?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Report_artistId_fkey"
            columns: ["artistId"]
            isOneToOne: false
            referencedRelation: "Artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Report_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          createdAt: string
          email: string
          id: number
          info: string
          name: string
          password: string | null
          userImgURL: string
        }
        Insert: {
          createdAt?: string
          email: string
          id?: number
          info: string
          name: string
          password?: string | null
          userImgURL: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: number
          info?: string
          name?: string
          password?: string | null
          userImgURL?: string
        }
        Relationships: []
      }
      UserBlockArtist: {
        Row: {
          artistId: number
          userId: number
        }
        Insert: {
          artistId: number
          userId: number
        }
        Update: {
          artistId?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "UserBlockArtist_artistId_fkey"
            columns: ["artistId"]
            isOneToOne: false
            referencedRelation: "Artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserBlockArtist_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      UserFollowArtist: {
        Row: {
          artistId: number
          userId: number
        }
        Insert: {
          artistId: number
          userId: number
        }
        Update: {
          artistId?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "UserFollowArtist_artistId_fkey"
            columns: ["artistId"]
            isOneToOne: false
            referencedRelation: "Artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserFollowArtist_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const