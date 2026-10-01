from django.contrib import admin

from .models import Bill


@admin.register(Bill)
class BillAdmin(admin.ModelAdmin):
    list_display = ('id', 'membership', 'subtotal', 'discount', 'final_amount', 'created_at')
    list_filter = ('membership', 'created_at')
    ordering = ('-created_at',)
