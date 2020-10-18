from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Post(models.Model):
    author = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)
    body = models.TextField()
    creation_date = models.DateTimeField(auto_now_add = True, editable=False)

    class Meta:
       ordering = ('-creation_date',)

    def __str__(self):
        return f'{self.author}s Post'

class Profile(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    follower = models.ManyToManyField(
        User,  blank=True, related_name="follower_user")
    following = models.ManyToManyField(
        User,  blank=True, related_name="following_user")

    def __str__(self):
        return self.user.username


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")

    def __str__(self):
        return f'{self.user} likes {self.post}'
