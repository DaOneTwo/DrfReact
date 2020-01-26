from typing import Dict, List

from django.http import JsonResponse
from rest_framework.request import Request
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from giphy.client import GiphyClient
from giphy.models import GiphyFavorite
from giphy.api.serializers import GiphyFavoriteSerializer, GiphyFavoriteCreateSerializer


def parse_giphy_response(data: List[Dict]) -> List[Dict]:
    """parse the giphy response down into a set of key/values that our application wil be utilizing.  This is very
    much tied to the react-grid-gallery component and our application needs."""
    def parse_dikt(dikt):
        preview_data = dikt.get('images', {}).get('preview_gif', {})
        try:
            height, width = int(preview_data.get('height')), int(preview_data.get('width'))
        except Exception:
            height, width = None, None
        return {
            'src': dikt.get('images', {}).get('original', {}).get('url'),
            'thumbnail': preview_data.get('url'),
            'thumbnailWidth': width,
            'thumbnailHeight': height,
            'giphyId': dikt.get('id'),
            'embed_url': dikt.get('embed_url')
        }

    return [parse_dikt(dikt) for dikt in data]

@api_view(['GET',])
def giphy_search(request: Request) -> JsonResponse:
    """Search the giphy API and parse down response into portions we will need

    Query String parameters allowed.

    /api/giphy_search/?search=<search string Required>&offset=<int Optional>
    """
    client = GiphyClient()
    search_text, offset = request.query_params.get('search'), request.query_params.get('offset', 0)
    if search_text:
        status, data = client.search(search_text, offset=offset)
        # transform the data for our API needs
        data['data'] = parse_giphy_response(data['data'])
        return JsonResponse(data=data, status=status)
    else:
        return JsonResponse(data={}, status=404, reason='must provide search parameter via query string')


class GiphyFavoriteAPIView(APIView):
    def get(self, request):
        favorites = GiphyFavorite.objects.filter(user_id=request.user.id)
        serializer = GiphyFavoriteSerializer(favorites, many=True)
        return Response(serializer.data)

    def post(self, request):
        request.data['user_id'] = request.user.id
        serializer = GiphyFavoriteCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


