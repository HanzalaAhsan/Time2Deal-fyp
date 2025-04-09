# from django.db import models

# # Create your models here.

from django.db import models

class Inventory(models.Model):
    name = models.CharField(max_length=255)  # Item name
    description = models.TextField(blank=True, null=True)  # Optional description
    quantity = models.IntegerField(default=0)  # Stock quantity
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price per unit
    expiry_date = models.DateField(blank=True, null=True)  # Expiry date (if applicable)
    created_at = models.DateTimeField(auto_now_add=True)  # Auto timestamp on creation
    updated_at = models.DateTimeField(auto_now=True)  # Auto update timestamp

    def __str__(self):
        return f"{self.name} ({self.quantity} in stock)"
