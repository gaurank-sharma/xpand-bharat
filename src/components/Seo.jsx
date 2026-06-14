import { Helmet } from 'react-helmet';

/**
 * Central SEO component — renders title, description, canonical, Open Graph,
 * Twitter card and optional JSON-LD structured data for a page.
 *
 * Production metadata copy comes from the SEO Master Reference (Section 05)
 * and must be used verbatim.
 */

export const SITE_URL = 'https://xpandbharat.com';
export const SITE_NAME = 'XPAND Bharat';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

export default function Seo({
  title,
  description,
  path = '/',
  keywords,
  image = DEFAULT_IMAGE,
  type = 'website',
  schema,
  noindex = false,
}) {
  const canonical = `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`;
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}
