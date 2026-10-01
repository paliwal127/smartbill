from rest_framework import serializers

from .models import Bill
from .services import calculate_bill


ALIASES = {'newbe': 'newbie', 'new': 'newbie', '0': 'newbie', '1': 'silver', '2': 'gold', 'platinium': 'platinum', '3': 'platinum'}


class BillSerializer(serializers.ModelSerializer):
    membership = serializers.CharField()
    membership_label = serializers.CharField(source='get_membership_display', read_only=True)

    class Meta:
        model = Bill
        fields = ['id', 'item_price', 'quantity', 'membership', 'membership_label', 'subtotal', 'discount', 'final_amount', 'created_at']
        read_only_fields = ['id', 'subtotal', 'discount', 'final_amount', 'created_at', 'membership_label']
        extra_kwargs = {
            'item_price': {'min_value': 0.01},
            'quantity': {'min_value': 1},
        }

    def validate_membership(self, value):
        normalized = ALIASES.get(value.strip().lower(), value.strip().lower())
        valid_memberships = {choice[0] for choice in Bill.MEMBERSHIP_CHOICES}
        if normalized not in valid_memberships:
            raise serializers.ValidationError('Select a valid membership.')
        return normalized

    def validate(self, attrs):
        try:
            attrs.update(calculate_bill(attrs['item_price'], attrs['quantity'], attrs['membership']))
        except (ValueError, TypeError):
            raise serializers.ValidationError('Unable to calculate the bill.')
        return attrs

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['membership'] = data['membership_label']
        return data
