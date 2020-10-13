from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    header = models.CharField(max_length=400)
    body = models.TextField()
    creation_date = models.DateTimeField(auto_now_add = True, editable=False)

    class Meta:
       ordering = ('-creation_date',)

    def __str__(self):
        return '%s - %s' % (self.author, self.header)

