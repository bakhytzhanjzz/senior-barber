export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed" | "no_show";

export type Database = {
  public: {
    Tables: {
      locations: {
        Row: {
          id: string;
          slug: string;
          district: string;
          address: string;
          whatsapp: string | null;
          is_active: boolean;
          sort_order: number;
        };
        Insert: Partial<Database["public"]["Tables"]["locations"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["locations"]["Row"]>;
      };
      services: {
        Row: {
          id: string;
          name_ru: string;
          name_kk: string;
          duration_min: number;
          price: number;
          is_active: boolean;
          sort_order: number;
        };
        Insert: Partial<Database["public"]["Tables"]["services"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>;
      };
      barbers: {
        Row: {
          id: string;
          location_id: string;
          full_name: string;
          role: string | null;
          is_active: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["barbers"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["barbers"]["Row"]>;
      };
      working_hours: {
        Row: {
          id: string;
          location_id: string;
          weekday: number;
          opens_at: string;
          closes_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["working_hours"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["working_hours"]["Row"]>;
      };
      bookings: {
        Row: {
          id: string;
          location_id: string;
          service_id: string;
          barber_id: string | null;
          customer_name: string;
          customer_phone: string;
          note: string | null;
          starts_at: string;
          ends_at: string;
          status: BookingStatus;
          locale: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["bookings"]["Row"]> & {
          location_id: string;
          service_id: string;
          customer_name: string;
          customer_phone: string;
          starts_at: string;
          ends_at: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Row"]>;
      };
      staff: {
        Row: {
          user_id: string;
          location_id: string | null;
          full_name: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["staff"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["staff"]["Row"]>;
      };
    };
  };
};
