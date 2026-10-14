# Categories API — Postman docs

Separate docs for each category endpoint. Import the collection JSON into Postman for one-click requests.

## Setup

1. Start app: `npm run dev` → `http://localhost:3000`
2. Create admin (Postman): `POST /api/admin/auth/create`
3. Login admin: `POST /api/admin/auth/login`
4. From login response copy `token` → Postman header:

```
Authorization: Bearer <token>
```

(Or use the `s2t_token` cookie — both work.)

## Documents

| # | File | Method | Path |
|---|------|--------|------|
| 1 | [01-upload-auth.md](./01-upload-auth.md) | `GET` | `/api/admin/uploads/auth` |
| 2 | [02-create-category.md](./02-create-category.md) | `POST` | `/api/admin/categories` |
| 3 | [03-get-all-categories.md](./03-get-all-categories.md) | `GET` | `/api/admin/categories` |
| 4 | [04-edit-category.md](./04-edit-category.md) | `PATCH` | `/api/admin/categories/:id` |
| 5 | [05-update-status.md](./05-update-status.md) | `PATCH` | `/api/admin/categories/:id/status` |
| 6 | [06-delete-category.md](./06-delete-category.md) | `DELETE` | `/api/admin/categories/:id` |

## Import into Postman

Import: [`Switch2Travel-Categories.postman_collection.json`](./Switch2Travel-Categories.postman_collection.json)

Collection variable: `baseUrl` = `http://localhost:3000`, `categoryId` = set after create.
