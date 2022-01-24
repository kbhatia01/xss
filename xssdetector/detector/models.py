from django.db import models

# Create your models here.

class UrlMetaData(models.Model):
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    other_details = models.JSONField()

    def __str__(self):
        return self.url


class MarkUnsafe(models.Model):
    url = models.URLField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    count = models.IntegerField(default=1)

    def __str__(self):
        return self.url

    def save(self, *args, **kwargs):
        self.url = self.url.lower()
        super(MarkUnsafe, self).save(*args, **kwargs)