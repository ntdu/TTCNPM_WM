from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone as tz

from customer.models import User

class Material(models.Model):
    code = models.CharField(max_length = 50)
    name = models.CharField(max_length = 200)
    description = models.CharField(max_length = 500)
    unit = models.CharField(max_length = 200)
    price = models.IntegerField(default=0)
    is_deleted = models.BooleanField(default=False)
    created_date = models.DateTimeField(default=tz.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Material_created_by")
    last_updated_date = models.DateTimeField(null=True, blank=True)
    last_updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name="Material_last_updated_by")

    def __str__(self):
        return self.name


class Inventory(models.Model):
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    amount = models.DecimalField(default=0, max_digits=8, decimal_places=2)
    price = models.DecimalField(default=0, max_digits=18, decimal_places=0)
    total_money = models.DecimalField(default=0, max_digits=18, decimal_places=0)
    is_deleted = models.BooleanField(default=False)
    created_date = models.DateTimeField(default=tz.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Inventory_created_by")
    last_updated_date = models.DateTimeField(null=True, blank=True)
    last_updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name="Inventory_last_updated_by")

    def __str__(self):
        return '{0} {1}'.format(self.material, self.created_date.strftime('%d/%m/%Y'))