export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      ChatAdmins: {
        Row: {
          chat_id: string | null;
          created_at: string;
          id: string;
          user_id: string | null;
        };
        Insert: {
          chat_id?: string | null;
          created_at?: string;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          chat_id?: string | null;
          created_at?: string;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ChatAdmins_chat_id_fkey";
            columns: ["chat_id"];
            referencedRelation: "Chats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ChatAdmins_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "UserProfiles";
            referencedColumns: ["id"];
          },
        ];
      };
      ChatMembers: {
        Row: {
          chat_id: string | null;
          created_at: string;
          id: string;
          user_id: string | null;
        };
        Insert: {
          chat_id?: string | null;
          created_at?: string;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          chat_id?: string | null;
          created_at?: string;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ChatMembers_chat_id_fkey";
            columns: ["chat_id"];
            referencedRelation: "Chats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ChatMembers_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "UserProfiles";
            referencedColumns: ["id"];
          },
        ];
      };
      ChatMessages: {
        Row: {
          chat_id: string | null;
          created_at: string;
          id: string;
          message: string | null;
          sender_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          chat_id?: string | null;
          created_at?: string;
          id?: string;
          message?: string | null;
          sender_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          chat_id?: string | null;
          created_at?: string;
          id?: string;
          message?: string | null;
          sender_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ChatMessages_chat_id_fkey";
            columns: ["chat_id"];
            referencedRelation: "Chats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ChatMessages_sender_id_fkey";
            columns: ["sender_id"];
            referencedRelation: "UserProfiles";
            referencedColumns: ["id"];
          },
        ];
      };
      Chats: {
        Row: {
          created_at: string;
          id: string;
          name: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      UserChatKeys: {
        Row: {
          chat_id: string | null;
          created_at: string;
          id: string;
          key: string | null;
          user_id: string | null;
        };
        Insert: {
          chat_id?: string | null;
          created_at?: string;
          id?: string;
          key?: string | null;
          user_id?: string | null;
        };
        Update: {
          chat_id?: string | null;
          created_at?: string;
          id?: string;
          key?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "UserChatKeys_chat_id_fkey";
            columns: ["chat_id"];
            referencedRelation: "Chats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "UserChatKeys_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "UserProfiles";
            referencedColumns: ["id"];
          },
        ];
      };
      UserProfiles: {
        Row: {
          created_at: string;
          email: string | null;
          firstname: string | null;
          id: string;
          lastname: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          firstname?: string | null;
          id: string;
          lastname?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          firstname?: string | null;
          id?: string;
          lastname?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "UserProfiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      UserPublicKeys: {
        Row: {
          created_at: string;
          id: string;
          public_key: Json | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          public_key?: Json | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          public_key?: Json | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "UserPublicKeys_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "UserProfiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey";
            columns: ["owner"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
