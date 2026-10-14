# Create category

Admin-only. Creates a category with name, ImageKit image, and status.

## Request

- **Method:** `POST`
- **URL:** `http://localhost:3000/api/admin/categories`
- **Auth:** Cookie `s2t_token` (admin)

## Headers

```
Content-Type: application/json
```

## Body (raw JSON)

```json
{
  "name": "Best Sellers",
  "image": {
    "url": "https://ik.imagekit.io/q36ywbrzq/switch2travel/categories/best-sellers.jpg",
    "fileId": "REPLACE_IMAGEKIT_FILE_ID",
    "filePath": "/switch2travel/categories/best-sellers.jpg"
  },
  "status": "active"
}
```

`status` is optional (default `"active"`). Allowed: `"active"` | `"inactive"`.

## Success `201`

```json
{
  "category": {
    "id": "...",
    "name": "Best Sellers",
    "slug": "best-sellers",
    "image": {
      "url": "https://ik.imagekit.io/...",
      "fileId": "...",
      "filePath": "/switch2travel/categories/..."
    },
    "status": "active",
    "createdAt": "2026-10-15T00:00:00.000Z",
    "updatedAt": "2026-10-15T00:00:00.000Z"
  }
}
```

## Errors

| Status | Meaning |
|--------|---------|
| `400` | Validation failed (name/image) |
| `401` | Unauthorized |
| `403` | Forbidden |
| `409` | Duplicate name/slug |
| `500` | Server error |
