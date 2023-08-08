import { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseAdmin } from 'src/lib/supabase-admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      // Call the dummy stored procedure that doesn't modify the database
      const { data, error } = await SupabaseAdmin.rpc('ping_db');

      if (error) {
        return res.status(500).json({
          message: 'Error pinging the database'
        });
      }

      return res.status(200).json({
        message: 'Database ping successful'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error pinging the database'
      });
    }
  }

  return res.status(400).json({
    message: 'Unsupported Request'
  });
};
