from django.shortcuts import render_to_response


# Create your views here.
def get_index(request):
    if request.method == "GET":
        args = {"user": request.user}
        return render_to_response('index.html', args)
