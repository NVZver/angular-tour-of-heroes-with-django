from django.db import models


class Hero(models.Model):
    name = models.CharField(max_length='50', default='', verbose_name='Name')

    def __str__(self):
        return self.name