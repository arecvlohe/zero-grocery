import { supabase } from "./supabase";
import { definitions } from "../types/supabase";

export const groceriesApi = {
  getGroceries: async () => {
    return await supabase.from<definitions["groceries"]>("groceries").select();
  },
  getGrocery: async (id: string) => {
    return await supabase
      .from<definitions["groceries"]>("groceries")
      .select()
      .eq("id", id)
      .single();
  },
};
