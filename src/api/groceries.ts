import { Grocery } from "../redux/types.appState";
import { supabase } from "./supabase";

export const groceriesApi = {
  getGroceries: async () => {
    return await supabase.from<Grocery>("groceries").select();
  },
  getGrocery: async (id: string) => {
    return await supabase
      .from<Grocery>("groceries")
      .select()
      .eq("id", id)
      .single();
  },
};
