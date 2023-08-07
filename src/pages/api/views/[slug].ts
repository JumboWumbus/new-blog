import { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseAdmin } from 'src/lib/supabase-admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Call our stored procedure with the page_slug set by the request params slug
    await SupabaseAdmin.rpc('increment_page_view', {
      page_slug: req.query.slug
    });
    return res.status(200).json({
      message: `Successfully incremented page: ${req.query.slug}`
    });
  }

  if (req.method === 'GET') {
    // Query the pages table in the database where slug equals the request params slug.
    const { data, error } = await SupabaseAdmin.from('pages')
      .select('view_count')
      .filter('slug', 'eq', req.query.slug);

    // Log the requested slug and the result of the query
    console.log('Requested slug:', req.query.slug);
    console.log('Data:', data);
    console.log('Error:', error);

    if (data && data.length > 0) {
      return res.status(200).json({
        total: data[0].view_count
      });
    } else {
      return res.status(404).json({ message: 'Page not found' });
    }
  }

  return res.status(400).json({
    message: 'Unsupported Request'
  });
};
