from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item_price', models.DecimalField(decimal_places=2, max_digits=12)),
                ('quantity', models.PositiveIntegerField()),
                ('membership', models.CharField(choices=[('newbie', 'Newbie'), ('silver', 'Silver'), ('gold', 'Gold'), ('platinum', 'Platinum')], max_length=20)),
                ('subtotal', models.DecimalField(decimal_places=2, max_digits=14)),
                ('discount', models.DecimalField(decimal_places=2, max_digits=14)),
                ('final_amount', models.DecimalField(decimal_places=2, max_digits=14)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={'ordering': ['-created_at']},
        ),
    ]
