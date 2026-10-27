# Writing a blog post

Add a markdown file to this folder and deploy. That's it.

```
content/blog/2026-10-27-my-post.md   ->   /blog/my-post, dated 27 Oct 2026
```

```md
# My post

This first paragraph becomes the excerpt on the blog list and in search results.

## A section

Write normally. Code blocks, tables and links all work.
```

- **URL**: the filename without the date and `.md`.
- **Date**: the `YYYY-MM-DD-` at the start of the filename.
- **Title**: the first `# ` heading.
- **Excerpt**: the first paragraph of text.
- **Images**: put them in `public/images/blog/` and use `![Alt text](/images/blog/photo.png)`.

## Optional extras

A `---` block at the very top overrides any of the above:

```md
---
title: A different title for the page
date: 2026-11-01
excerpt: A hand-written summary instead of the first paragraph.
slug: custom-url
draft: true
---
```

**Drafts** (`draft: true`, or a filename starting with `_`) show up in `npm run dev` so you can preview them, but are left out of the live site.

Two files that end up with the same URL make the build fail, so nothing gets silently overwritten.
