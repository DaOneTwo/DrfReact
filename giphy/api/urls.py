from django.urls import path

from giphy.api.views import giphy_search, GiphyFavoriteAPIView


urlpatterns = [
    path('giphy_search/', giphy_search),
    path('giphy_favorite/', GiphyFavoriteAPIView.as_view())
    # path('giphy_favorites/<id>', )
]