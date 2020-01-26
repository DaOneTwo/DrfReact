from django.db import models
from django.conf import settings


class GiphyFavorite(models.Model):
    """a gif that has been favorited by a particular user.   Storing only giphyId for each gif."""
    favorite_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, db_column='user_id')
    giphy_id = models.CharField(max_length=50)
    create_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (('user_id', 'giphy_id',), )


class GiphyFavoriteCategory(models.Model):
    CATEGORY_CHOICES = [
        ('Silly', 'Silly'),
        ('Serious', 'Serious'),
        ('Dumb', 'Dumb'),
        ('Happy', 'Happy'),
        ('Animal', 'Animal'),
        ('Person', 'Person'),
        ('Scary', 'Scary'),
    ]
    fav_cat_id = models.AutoField(primary_key=True)
    favorite_id = models.ForeignKey(to='GiphyFavorite', on_delete=models.CASCADE, null=False, db_column='favorite_id')
    category = models.CharField(null=False, max_length=12, choices=CATEGORY_CHOICES)
