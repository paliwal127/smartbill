from decimal import Decimal, ROUND_HALF_UP


MONEY = Decimal('0.01')


def money(value):
    return Decimal(value).quantize(MONEY, rounding=ROUND_HALF_UP)


def calculate_bill(item_price, quantity, membership):
    item_price = money(item_price)
    quantity = int(quantity)
    membership = membership.lower()
    subtotal = money(item_price * quantity)

    if subtotal < Decimal('500'):
        discount_rate = Decimal('0')
    elif membership == 'newbie':
        discount_rate = Decimal('0.05') if item_price >= Decimal('10') else Decimal('0')
    elif membership == 'silver':
        discount_rate = Decimal('0.05') * Decimal('0.05') if item_price >= Decimal('10') else Decimal('0.05')
    elif membership == 'gold':
        discount_rate = Decimal('0.10') * Decimal('0.05') if item_price >= Decimal('10') else Decimal('0.05')
    elif membership == 'platinum':
        discount_rate = Decimal('0.20') * Decimal('0.05') if item_price >= Decimal('10') else Decimal('0.20')
    else:
        raise ValueError('Invalid membership.')

    discount = money(subtotal * discount_rate)
    return {
        'subtotal': subtotal,
        'discount': discount,
        'final_amount': money(subtotal - discount),
    }
