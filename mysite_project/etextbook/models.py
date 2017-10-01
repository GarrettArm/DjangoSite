from django.db import models


class Document(models.Model):
    description = models.CharField(max_length=255, blank=True)
    document = models.FileField(upload_to='uploaded_spreadsheets')
    uploaded_at = models.DateTimeField(auto_now_add=True)
