# Vinnu Events Nalgonda

Public website and media admin for **Vinnu Events**, Nalgonda, Telangana.

## Public website
- Demo Highlights video carousel loaded from Supabase
- Category-specific photo/video galleries
- Mobile responsive layout
- WhatsApp, Instagram and call CTAs
- SEO metadata for Vinnu Events Nalgonda

## Admin
Open `/admin/` on the deployed site.

Admin uploads are stored in Supabase. Choose **Demo Highlights** to publish videos to the homepage carousel. Other categories publish only inside their matching event gallery.

## Backend
Supabase Edge Function: `vinnu-admin-api`
Storage bucket: `event-gallery`
Metadata table: `event_media`
