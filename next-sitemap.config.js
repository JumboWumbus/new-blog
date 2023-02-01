const siteUrl = 'https://bensden.xyz'

module.exports= {
   siteUrl,
   //Generate robots.txt
   generateRobotsTxt: true,

   robotsTxtOptions:{
      policies: [
         {
            userAgent: 'Twitterbot',
            disallow: ''
         }
      ]
   }


   /* Excluding specific pages or folder of pages from sitemap, google and other search engines will not index it.

   --- For sitemap.xml ---
    exclude: [/secret]
    exclude: [/secretFolder/*]
     
   --- For robots.txt ---

   robotsTxtOptions: {
      policies: [
         {userAgent: "*", disallow: "/secret"},
         {userAgent: "*", allow: "/"},
      ]
   }

   robotsTxtOptions: {
      policies: [
         {userAgent: "*", disallow: "/secret/*"},
         {userAgent: "*", allow: "/"},
      ]
   }
    */
   
}