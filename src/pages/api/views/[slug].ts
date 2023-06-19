// import { NextApiRequest, NextApiResponse } from "next";
// import { SupabaseAdmin } from "src/lib/supabase-admin";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
// 	try {
// 		if (req.method === "POST") {
// 			// Call our stored procedure with the page_slug set by the request params slug
// 			await SupabaseAdmin.rpc("increment_page_view", {
// 				page_slug: req.query.slug,
// 			});
// 			return res.status(200).json({
// 				message: `Successfully incremented page: ${req.query.slug}`,
// 			});
// 		}

// 		if (req.method === "GET") {
// 			// Query the pages table in the database where slug equals the request params slug.
// 			const { data, error } = await SupabaseAdmin.from("pages")
// 				.select("id, view_count")
// 				.eq("slug", req.query.slug);
// 			// console.log(data)

// 			if (data && data.length > 0) {
// 				const { id, view_count } = data[0];
// 				const updatedViewCount = view_count + 1;

// 				return res.status(200).json({
// 					total: updatedViewCount,
// 				});
// 			} else {
// 				return res.status(404).json({
// 					error: "Page not found",
// 				});
// 			}
// 		}

// 		return res.status(400).json({
// 			error: "Unsupported Request",
// 		});
// 	} catch (error) {
// 		console.error("Error:", error);
// 		return res.status(500).json({
// 			error: "Internal Server Error",
// 		});
// 	}
// };

import { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseAdmin } from 'src/lib/supabase-admin';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Call our stored procedure with the page_slug set by the request params slug
    await SupabaseAdmin.rpc('increment_page_view', { page_slug: req.query.slug });
    return res.status(200).json({
      message: `Successfully incremented page: ${req.query.slug}`
    });
  }

  if (req.method === 'GET') {
    // Query the pages table in the database where slug equals the request params slug.
    const { data } = await SupabaseAdmin.from('pages').select('view_count').filter('slug', 'eq', req.query.slug);

    if (data) {
      return res.status(200).json({
        total: data[0]?.view_count || null
      });
    }
  }

  return res.status(400).json({
    message: 'Unsupported Request'
  });
};
