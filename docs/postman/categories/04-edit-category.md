# Edit category (name / image)

Admin-only. Update name and/or ImageKit image. Slug regenerates when name changes.

## Request

- **Method:** `PATCH`
- **URL:** `http://localhost:3000/api/admin/categories/{{categoryId}}`
- **Auth:** Cookie `s2t_token` (admin)

Replace `{{categoryId}}` with the category `id` from create/list.

## Headers

```
Content-Type: application/json
```

## Body (raw JSON) — name only

```json
{
  "name": "Best Sellers Updated"
}
```

## Body — image only

```json
{
  "image": {
    "url": "https://ik.imagekit.io/q36ywbrzq/switch2travel/categories/new.jpg",
    "fileId": "REPLACE_IMAGEKIT_FILE_ID",
    "filePath": "/switch2travel/categories/new.jpg"
  }
}
```

## Body — name + image

```json
{
  "name": "Best Sellers Updated",
  "image": {
    "url": "https://ik.imagekit.io/q36ywbrzq/switch2travel/categories/new.jpg",
    "fileId": "REPLACE_IMAGEKIT_FILE_ID",
    "filePath": "/switch2travel/categories/new.jpg"
  }
}
```

## Success `200`

```json
{
  "category": {
    "id": "...",
    "name": "Best Sellers Updated",
    "slug": "best-sellers-updated",
    "image": { "url": "...", "fileId": "...", "filePath": "..." },
    "status": "active",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## Errors

| Status | Meaning |
|--------|---------|
| `400` | Empty body / validation error |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Category not found |
| `409` | Duplicate slug |
| `500` | Server error |
