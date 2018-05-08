import uuid
from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser
from django.utils.encoding import python_2_unicode_compatible
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from ..threads.models import Thread


@python_2_unicode_compatible
class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.CharField(max_length=500)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parent_thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id) + ' ' + str(self.author) + ' ' + str(self.parent_thread)
