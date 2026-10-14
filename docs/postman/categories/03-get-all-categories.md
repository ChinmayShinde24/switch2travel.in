# Get all categories

Admin-only. Lists categories, newest first.

## Request

- **Method:** `GET`
- **URL:** `http://localhost:3000/api/admin/categories`
- **Auth:** Cookie `s2t_token` (admin)

## Query params (optional)

| Param | Values | Description |
|-------|--------|-------------|
| `status` | `active` \| `inactive` | Filter by status |

### Examples

- All: `GET http://localhost:3000/api/admin/categories`
- Active only: `GET http://localhost:3000/api/admin/categories?status=active`
- Inactive only: `GET http://localhost:3000/api/admin/categories?status=inactive`

## Body

None.

## Success `200`

```json
{
  "categories": [
    {
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
  ]
}
```

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Unauthorized |
| `403` | Forbidden |
| `500` | Server error |
