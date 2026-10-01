from decimal import Decimal

from django.test import TestCase
from rest_framework.test import APIClient

from .models import Bill
from .services import calculate_bill


class BillingServiceTests(TestCase):
    def test_valid_bill_uses_decimal_business_logic(self):
        result = calculate_bill(Decimal('100'), 2, 'gold')
        self.assertEqual(result['subtotal'], Decimal('200.00'))
        self.assertEqual(result['discount'], Decimal('0.00'))
        self.assertEqual(result['final_amount'], Decimal('200.00'))


class BillApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.payload = {'item_price': '1000', 'quantity': 2, 'membership': 'gold'}

    def test_invalid_item_price(self):
        response = self.client.post('/api/bills/', {**self.payload, 'item_price': 0}, format='json')
        self.assertEqual(response.status_code, 400)

    def test_invalid_quantity(self):
        response = self.client.post('/api/bills/', {**self.payload, 'quantity': 0}, format='json')
        self.assertEqual(response.status_code, 400)

    def test_invalid_membership(self):
        response = self.client.post('/api/bills/', {**self.payload, 'membership': 'diamond'}, format='json')
        self.assertEqual(response.status_code, 400)

    def test_bill_creation_retrieval_and_deletion(self):
        create_response = self.client.post('/api/bills/', self.payload, format='json')
        self.assertEqual(create_response.status_code, 201)
        bill_id = create_response.data['id']
        self.assertTrue(Bill.objects.filter(pk=bill_id).exists())
        self.assertEqual(create_response.data['membership_label'], 'Gold')
        self.assertEqual(create_response.data['final_amount'], Decimal('1990.00'))

        list_response = self.client.get('/api/bills/')
        self.assertEqual(list_response.status_code, 200)
        self.assertEqual(len(list_response.data), 1)

        detail_response = self.client.get(f'/api/bills/{bill_id}/')
        self.assertEqual(detail_response.status_code, 200)
        delete_response = self.client.delete(f'/api/bills/{bill_id}/')
        self.assertEqual(delete_response.status_code, 204)
        self.assertFalse(Bill.objects.filter(pk=bill_id).exists())
