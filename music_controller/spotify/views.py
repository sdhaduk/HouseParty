from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .util import update_or_create_user_tokens
from requests import Request, post

from dotenv import load_dotenv
import os
load_dotenv()

class AuthURL(APIView):
    def get(self, request, format=None):
         scope = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

         url = Request('GET', 'https://accounts.spotify.com/authorize', params={
              'scope': scope,
              'response_type': 'code',
              'redirect_uri': os.environ.get('REDIRECT_URI'),
              'client_id': os.environ.get('CLIENT_ID')
         }).prepare().url

         return Response({'url': url}, status=status.HTTP_200_OK)
    

def spotify_callback(request, format=None):
     code = request.GET.get('code')
     error = request.GET.get('error')

     response = post('https://accounts.spotify.com/api/token', data={
          'grant_type': 'authorization_code',
          'code': code,
          'redirect_uri': os.environ.get('REDIRECT_URI'),
          'client_id': os.environ.get('CLIENT_ID'),
          'client_secret': os.environ.get('CLIENT_SECRET')
     }).json() 

     access_token = response.get('access_token')
     token_type = response.get('token_type')
     refresh_token = response.get('refresh_token')
     expires_in = response.get('expires_in')
     error = response.get('error')

     if not request.session.exists(request.session.session_key):
          request.session.create()
    
     update_or_create_user_tokens(session_id=request.session.session_key, access_token=access_token, token_type=token_type, refresh_token=refresh_token, expires_in=expires_in)

     return redirect('frontend:')