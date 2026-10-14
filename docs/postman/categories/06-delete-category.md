# Delete category

Admin-only. Permanently deletes the category document.

## Request

- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/admin/categories/{{categoryId}}`
- **Auth:** Cookie `s2t_token` (admin)

## Headers

None required beyond cookies.

## Body

None.

## Success `200`

```json
{
  "ok": true,
  "id": "REPLACE_CATEGORY_ID"
}
```

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Category not found |
| `500` | Server error |

## Note

This does **not** delete the file from ImageKit automatically. Clean up ImageKit separately if needed.
