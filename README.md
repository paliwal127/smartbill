# SmartBill

SmartBill is a small Indian billing application for calculating membership discounts, saving completed bills, and reviewing bill history.

## Features

- Decimal-based Python billing logic in Django
- React billing form with client-side validation
- Membership options: Newbie, Silver, Gold, and Platinum
- Indian Rupee formatting with `en-IN` and `INR`
- PostgreSQL persistence through Django ORM
- Bill history with view and delete actions
- Django Admin support
- Responsive light business-software interface
- Friendly API connection and calculation errors

## Technology Stack

- Frontend: React, JavaScript, Vite, Tailwind CSS
- Backend: Python, Django, Django REST Framework
- Database: PostgreSQL
- CORS: `django-cors-headers`

## Project Structure

```text
backend/
  billing/
    migrations/
    admin.py
    models.py
    serializers.py
    services.py
    tests.py
    urls.py
    views.py
  config/
  manage.py
src/
  components/
  pages/
  services/billingService.js
```

## PostgreSQL Setup

Create a PostgreSQL database named `smartbill`, then copy `.env.example` to `.env` and update the database credentials.

The backend intentionally uses PostgreSQL only. It does not fall back to SQLite.

## Environment Variables

```env
DJANGO_SECRET_KEY=replace-this-with-a-long-random-secret
DB_NAME=smartbill
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
VITE_API_URL=http://127.0.0.1:8000/api
```

`.env` is ignored by Git. Never commit real credentials.

## Backend Setup

From the project root on Windows PowerShell:

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python backend\manage.py makemigrations
python backend\manage.py migrate
python backend\manage.py runserver
```

If the environment tool has already created `.venv`, activate it before running Django commands.

Optional admin user:

```powershell
python backend\manage.py createsuperuser
```

Admin is available at `http://127.0.0.1:8000/admin/`.

## Frontend Setup

In a second terminal:

```powershell
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173/`.

Production checks:

```powershell
npm run build
npm run lint
```

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/bills/` | Calculate and save a bill |
| GET | `/api/bills/` | Return saved bills |
| GET | `/api/bills/<id>/` | Return one bill |
| DELETE | `/api/bills/<id>/` | Delete one bill |

Example request:

```json
{
  "item_price": 1000,
  "quantity": 2,
  "membership": "gold"
}
```

The response includes the server-calculated `subtotal`, `discount`, and `final_amount`. The frontend never sends calculated money values to Django.

## Billing Rules

The calculation in `backend/billing/services.py` preserves the supplied Python program:

- Subtotals below `500` receive no discount.
- Newbie receives `5%` when item price is at least `10`.
- Silver receives `5% × 5%` for item price at least `10`, otherwise `5%`.
- Gold receives `10% × 5%` for item price at least `10`, otherwise `5%`.
- Platinum receives `20% × 5%` for item price at least `10`, otherwise `20%`.

All money calculations use Python `Decimal` and Django `DecimalField`.

## Tests

Run the Django test suite with PostgreSQL configured in `.env`:

```powershell
python backend\manage.py test
```

The tests cover valid calculations, invalid inputs, bill creation, retrieval, and deletion.
