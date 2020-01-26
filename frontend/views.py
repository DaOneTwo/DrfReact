from django.shortcuts import render, redirect

# Create your views here.

from django.shortcuts import render
def index(request):
    if request.user.is_authenticated:
        return render(request, 'frontend/index.html')
    else:
        return redirect('accounts/login')
