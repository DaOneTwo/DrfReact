import os
from typing import Tuple

import giphy_client
from giphy_client.models.pagination import Pagination


class GiphyClient:
    _client = giphy_client.DefaultApi()
    def __init__(self, api_key=os.environ.get('GIPHY_API_KEY'), page_limit=50, rating='g', language='en', format='json'):
        self._api_key = api_key
        self._call_configs = {
            'limit': page_limit,
            'rating': rating,
            'lang': language,
            'fmt': format}

    def search(self, query, offset) -> Tuple[int, dict]:
        if query:
            resp = self._client.gifs_search_get(self._api_key, query, offset=int(offset), **self._call_configs)
            resp_data = {
                'pagination': self._make_pagination(resp._pagination),
                # data is a Gif object we need to flatten to dict
                'data': [x.to_dict() for x in resp._data]
            }

            return resp.meta.status, resp_data

    def _make_pagination(self, pagination: Pagination) -> dict:
        """this will dump the pagination object to dict and add key(s) to the response to make our users lives a
        little simpler.

        Keys Added:
            - next_page_offset
        """
        dikt = pagination.to_dict()
        next_offset = dikt['offset'] + self._call_configs['limit']
        if next_offset < dikt['total_count']:
            dikt['next_page_offset'] = next_offset
        else:
            dikt['next_page_offset'] = None

        return dikt


if __name__ == '__main__':
    from json import dumps
    gc = GiphyClient(api_key='Biu2IeP8xyBWRbMYFMZ7omHFH8aqRtso')

    status, data = gc.search('clown', 0)

    print(dumps(data['data'][0], indent=4))