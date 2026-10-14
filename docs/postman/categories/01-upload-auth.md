# ImageKit upload auth

Admin-only. Get signed params, then upload the image to ImageKit from the client. Save `{ url, fileId, filePath }` on the category.

## Request

- **Method:** `GET`
- **URL:** `http://localhost:3000/api/admin/uploads/auth`
- **Auth:** Cookie `s2t_token` (admin session) — login first via `/api/admin/auth/login` or `/api/auth/login`

## Headers

None required beyond cookies.

## Body

None.

## Success `200`

```json
{
  "token": "...",
  "expire": 1710000000,
  "signature": "...",
  "publicKey": "public_...",
  "urlEndpoint": "https://ik.imagekit.io/q36ywbrzq",
  "folder": "/switch2travel/categories"
}
```

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Not logged in |
| `403` | Not admin |
| `500` | Missing ImageKit env keys |

## Postman tips

1. Login as admin and enable **Cookies**.
2. Call this endpoint.
3. Use returned values with ImageKit `upload()` (or ImageKit dashboard) into `folder`.
4. Copy `url`, `fileId`, `filePath` into create/edit category bodies.
