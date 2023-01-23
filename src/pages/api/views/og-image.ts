//TODO create OG Image generation which is frickin sick

import { withOGImage } from 'next-api-og-image';
import OGImage from 'src/components/OGImage/OGImage';
import { oGImageHeight, oGImageWidth } from 'src/utils/constants';
import { OGImageParams } from 'src/utils/url';


export default withOGImage<'query', keyof OGImageParams>({
  template: { react: OGImage },
  cacheControl: 'public, max-age=604800, immutable',
  dev: { inspectHtml: false },
  width: oGImageWidth,
  height: oGImageHeight,
});