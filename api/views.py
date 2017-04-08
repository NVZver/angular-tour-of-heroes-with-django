from django.core.serializers.json import DjangoJSONEncoder
from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
import json

from django.views.decorators.csrf import csrf_exempt

from api.models import Hero


def get_apis(request):
    apis = []
    return JsonResponse({"apis": apis})


def get_heroes(request):
    args = {}
    if request.method == 'GET':
        q_heroes = Hero.objects.all().values()
        args["heroes"] = json.dumps(list(q_heroes), cls=DjangoJSONEncoder)
    return JsonResponse(args)


@csrf_exempt
def hero(request, id):
    if request.method == 'GET':
        hero = Hero.objects.get(id=id)
        return JsonResponse({"id": hero.id, "name": hero.name})

    if request.method == 'PUT':
        params = json.loads(request.body.decode("utf-8"))
        hero = Hero.objects.get(id=id)
        hero.name = params['name']
        hero.save()
        return JsonResponse({"id": hero.id, "name": hero.name})

    if request.method == 'DELETE':
        Hero.objects.get(id=id).delete()
        return JsonResponse({"status": 200, "deleted": id})
    return JsonResponse({"status": "403"})


@csrf_exempt
def hero_create(request):
    args = {}
    if request.method == 'POST':
        params = json.loads(request.body.decode("utf-8"))
        hero = Hero.objects.create(name=params['name'])
        args = {
            'id': int(hero.id),
            'name': hero.name
        }
    return JsonResponse(args)
