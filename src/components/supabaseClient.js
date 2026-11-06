//supabaseClient urls / keys to allow for connection to the supabase database

import {createClient} from '@supabase/supabase-js';
//const supabaseUrl = 'https://your-supabase-url.supabase.co';
//const supabaseAnonKey = 'your-supabase-anon-key';
const supabaseUrl = 'https://gsdikywnoplgzwbqpofp.supabase.co';
const supabaseAnonKey = 'sb_publishable_bLqwP51ybMcdipss2Jzpwg_WVPDH-AG';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);