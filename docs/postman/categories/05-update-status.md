# Update category status

Admin-only. Set status to `active` or `inactive`.

## Request

- **Method:** `PATCH`
- **URL:** `http://localhost:3000/api/admin/categories/{{categoryId}}/status`
- **Auth:** Cookie `s2t_token` (admin)

## Headers

```
Content-Type: application/json
```

## Body — activate

```json
{
  "status": "active"
}
```

## Body — deactivate

```json
{
  "status": "inactive"
}
```

## Success `200`

```json
{
  "category": {
    "id": "...",
    "name": "Best Sellers",
    "slug": "best-sellers",
    "image": { "url": "...", "fileId": "...", "filePath": "..." },
    "status": "inactive",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## Errors

| Status | Meaning |
|--------|---------|
| `400` | Invalid status (must be `active` \| `inactive`) |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Category not found |
| `500` | Server error |
