# Content workflow

Public catalog copy and canonical outbound links are maintained in `content/site-content.ts`.

## Update a video

1. Add the public YouTube video ID, official title, category, and short description to `featuredVideos`.
2. The `/videos` library will render the card and thumbnail automatically.
3. Optionally add a selected item to the homepage sequence.

## Update a project or course

- Add a `projectCatalog` record with a stable `id`, current external destination, short description, tags, and one of the existing accent names.
- Add or edit `trainingCatalog` records to change the public course catalog.

## Moving to a full CMS

The page components are written against a small framework-neutral content layer. To move to Sanity, Contentful, Notion, or another CMS, replace this module with server-side fetch functions that return the same object shapes. Keep authoritative links and image approval status with each record.

Do not add API tokens to client-side components. Store any CMS, email, or analytics secrets in deployment environment variables.
