from django.urls import path

from giphy.api.views import giphy_search, GiphyFavoriteAPIView, GiphyFavoriteCategoryCreateAPIView


urlpatterns = [
    path('giphy/search/', giphy_search),
    path('giphy/favorite/', GiphyFavoriteAPIView.as_view()),
    path('giphy/category/', GiphyFavoriteCategoryCreateAPIView.as_view())

]