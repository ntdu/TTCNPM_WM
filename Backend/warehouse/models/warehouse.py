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