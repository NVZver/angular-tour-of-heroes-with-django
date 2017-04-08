from django.conf.urls import url
from api import views

urlpatterns = [
    url(r'^heroes/$', views.get_heroes),
    url(r'^hero/(?P<id>\d+)/$', views.hero),
    url(r'^hero/create/$', views.hero_create),
    url(r'^', views.get_apis),
]
