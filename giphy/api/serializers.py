from rest_framework import serializers

from giphy.models import GiphyFavorite, GiphyFavoriteCategory


class GiphyFavoriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = GiphyFavorite
        fields = '__all__'


class GiphyFavoriteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiphyFavorite
        fields = ['giphy_id', 'user_id', 'favorite_id']


class GiphyFavoriteCategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiphyFavoriteCategory
        fields = ['fav_cat_id', 'category']


class GiphyFavoriteCategoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiphyFavoriteCategory
        fields = ['category', 'favorite_id']
