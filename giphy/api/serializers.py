from rest_framework import serializers

from giphy.models import GiphyFavorite


class GiphyFavoriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = GiphyFavorite
        fields = '__all__'


class GiphyFavoriteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiphyFavorite
        fields = ['giphy_id', 'user_id']