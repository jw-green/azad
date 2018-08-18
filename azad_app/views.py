import requests
from django import http
from django.conf import settings
from django.template import engines
from django.views.generic import TemplateView

def catchall_dev(request, upstream='http://localhost:3000'):
    upstream_url = upstream + request.path
    response = requests.get(upstream_url)
    content = engines['django'].from_string(response.text).render()
    return http.HttpResponse(content)

catchall_prod = TemplateView.as_view(template_name='index.html')

catchall = catchall_dev if settings.DEBUG else catchall_prod