from django.db import models
from django.conf import settings

# Create your models here.


class GiphyFavorite(models.Model):
    favorite_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    giphy_id = models.CharField(max_length=50)
    create_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (('user_id', 'giphy_id',), )



class GiphyCategory(models.Model):
    CHOICES = [
        ('SILLY', 'SILLY'),
        ('SERIOUS', 'SERIOUS'),
        ('DUMB', 'DUMB'),
        ('HAPPY', 'HAPPY'),
        ('ANIMAL', 'ANIMAL'),
        ('PERSON', 'PERSON'),
        ('SCARY', 'SCARY'),
    ]
    category_name = models.CharField(null=False, max_length=12, choices=CHOICES)

class GiphyFavoriteCategory(models.Model):
    user_id = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    favorite_id = models.ForeignKey(to='GiphyFavorite', on_delete=models.CASCADE)
