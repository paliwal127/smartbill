from django.db import models


class Bill(models.Model):
    MEMBERSHIP_CHOICES = [
        ('newbie', 'Newbie'),
        ('silver', 'Silver'),
        ('gold', 'Gold'),
        ('platinum', 'Platinum'),
    ]

    item_price = models.DecimalField(max_digits=12, decimal_places=2)
    quantity = models.PositiveIntegerField()
    membership = models.CharField(max_length=20, choices=MEMBERSHIP_CHOICES)
    subtotal = models.DecimalField(max_digits=14, decimal_places=2)
    discount = models.DecimalField(max_digits=14, decimal_places=2)
    final_amount = models.DecimalField(max_digits=14, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Bill #{self.pk} - {self.get_membership_display()}'
