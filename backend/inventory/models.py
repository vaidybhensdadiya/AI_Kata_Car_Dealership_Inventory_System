from decimal import Decimal
from django.db import models
from django.core.validators import MinValueValidator

class Vehicle(models.Model):
    """
    Vehicle model representing inventory items in the dealership.
    """
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(Decimal('0.00'))])
    quantity = models.IntegerField(validators=[MinValueValidator(0)])
    year = models.IntegerField(default=2024)
    image_url = models.URLField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.year} {self.make} {self.model} (${self.price})"
