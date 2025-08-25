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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      game_progress: {
        Row: {
          choices_history: Json | null
          created_at: string
          current_step: number
          has_jaeger_nft: boolean | null
          id: string
          inventory: Json | null
          updated_at: string
          wallet_address: string
        }
        Insert: {
          choices_history?: Json | null
          created_at?: string
          current_step?: number
          has_jaeger_nft?: boolean | null
          id?: string
          inventory?: Json | null
          updated_at?: string
          wallet_address: string
        }
        Update: {
          choices_history?: Json | null
          created_at?: string
          current_step?: number
          has_jaeger_nft?: boolean | null
          id?: string
          inventory?: Json | null
          updated_at?: string
          wallet_address?: string
        }
        Relationships: []
      }
      live_chat_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          user_address: string
          username: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          user_address: string
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          user_address?: string
          username?: string | null
        }
        Relationships: []
      }
      match_actions: {
        Row: {
          action_type: Database["public"]["Enums"]["action_type"]
          created_at: string
          id: string
          match_id: string
          payload: Json
          processed: boolean
          turn_number: number
          wallet_address: string
        }
        Insert: {
          action_type: Database["public"]["Enums"]["action_type"]
          created_at?: string
          id?: string
          match_id: string
          payload?: Json
          processed?: boolean
          turn_number: number
          wallet_address: string
        }
        Update: {
          action_type?: Database["public"]["Enums"]["action_type"]
          created_at?: string
          id?: string
          match_id?: string
          payload?: Json
          processed?: boolean
          turn_number?: number
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "match_actions_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      match_players: {
        Row: {
          created_at: string
          deck: Json
          id: string
          is_current_turn: boolean
          match_id: string
          ready: boolean
          team: Database["public"]["Enums"]["team_type"]
          wallet_address: string
        }
        Insert: {
          created_at?: string
          deck?: Json
          id?: string
          is_current_turn?: boolean
          match_id: string
          ready?: boolean
          team: Database["public"]["Enums"]["team_type"]
          wallet_address: string
        }
        Update: {
          created_at?: string
          deck?: Json
          id?: string
          is_current_turn?: boolean
          match_id?: string
          ready?: boolean
          team?: Database["public"]["Enums"]["team_type"]
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "match_players_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          board_state: Json
          created_at: string
          current_turn: number
          game_log: Json
          id: string
          jaeger_position: string
          murat_position: string
          murat_visible: boolean
          murat_visible_turns: number
          status: Database["public"]["Enums"]["match_status"]
          turn_timer_start: string | null
          updated_at: string
          winner_wallet: string | null
        }
        Insert: {
          board_state?: Json
          created_at?: string
          current_turn?: number
          game_log?: Json
          id?: string
          jaeger_position?: string
          murat_position?: string
          murat_visible?: boolean
          murat_visible_turns?: number
          status?: Database["public"]["Enums"]["match_status"]
          turn_timer_start?: string | null
          updated_at?: string
          winner_wallet?: string | null
        }
        Update: {
          board_state?: Json
          created_at?: string
          current_turn?: number
          game_log?: Json
          id?: string
          jaeger_position?: string
          murat_position?: string
          murat_visible?: boolean
          murat_visible_turns?: number
          status?: Database["public"]["Enums"]["match_status"]
          turn_timer_start?: string | null
          updated_at?: string
          winner_wallet?: string | null
        }
        Relationships: []
      }
      memes: {
        Row: {
          created_at: string
          id: string
          image_data: string
          top_text: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_data: string
          top_text: string
        }
        Update: {
          created_at?: string
          id?: string
          image_data?: string
          top_text?: string
        }
        Relationships: []
      }
      nft_claims: {
        Row: {
          claimed: boolean
          created_at: string
          id: string
          tx_hash: string | null
          updated_at: string
          wallet_address: string
        }
        Insert: {
          claimed?: boolean
          created_at?: string
          id?: string
          tx_hash?: string | null
          updated_at?: string
          wallet_address: string
        }
        Update: {
          claimed?: boolean
          created_at?: string
          id?: string
          tx_hash?: string | null
          updated_at?: string
          wallet_address?: string
        }
        Relationships: []
      }
      sidequest_progress: {
        Row: {
          created_at: string
          id: string
          quest_ids: Json
          updated_at: string
          wallet_address: string
        }
        Insert: {
          created_at?: string
          id?: string
          quest_ids?: Json
          updated_at?: string
          wallet_address: string
        }
        Update: {
          created_at?: string
          id?: string
          quest_ids?: Json
          updated_at?: string
          wallet_address?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string
          id: string
          meme_id: string
          voter_ip: string
        }
        Insert: {
          created_at?: string
          id?: string
          meme_id: string
          voter_ip: string
        }
        Update: {
          created_at?: string
          id?: string
          meme_id?: string
          voter_ip?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_meme_id_fkey"
            columns: ["meme_id"]
            isOneToOne: false
            referencedRelation: "memes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      vote_counts: {
        Row: {
          meme_id: string | null
          vote_count: number | null
          vote_date: string | null
        }
        Relationships: [
          {
            foreignKeyName: "votes_meme_id_fkey"
            columns: ["meme_id"]
            isOneToOne: false
            referencedRelation: "memes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      action_type:
        | "move"
        | "use_character_ability"
        | "use_action_card"
        | "verstecken"
        | "polizei_rufen"
        | "falle_stellen"
        | "bitcoin_transaktion"
        | "crowdsourcing"
        | "live_spender"
      match_status: "waiting" | "active" | "finished" | "cancelled"
      team_type: "murat" | "jaeger"
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
    Enums: {
      action_type: [
        "move",
        "use_character_ability",
        "use_action_card",
        "verstecken",
        "polizei_rufen",
        "falle_stellen",
        "bitcoin_transaktion",
        "crowdsourcing",
        "live_spender",
      ],
      match_status: ["waiting", "active", "finished", "cancelled"],
      team_type: ["murat", "jaeger"],
    },
  },
} as const
