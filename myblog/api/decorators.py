from django.core.exceptions import PermissionDenied
from django.shortcuts import redirect
from accounts.models import User


def log_required(function):
    def wrap(request, args=None, **kwargs):
        try:
            u = User.objects.get(id = request.session['user_id'])
            if u:
                return function(request, **kwargs)

        except:
            return redirect('/app')

    return wrap

def staff_required(function):
    def wrap(request, args=None, **kwargs):
        try:
            u = User.objects.get(id = request.session['user_id'])
            if u.is_staff:
                return function(request, **kwargs)
            else:
                return redirect('/app')

        except:
            return redirect('/app')

    return wrap

def admin_required(function):
    def wrap(request, args=None, **kwargs):
        try:
            u = User.objects.get(id = request.session['user_id'])
            if u.is_admin:
                return function(request, **kwargs)
            else:
                return redirect('/app')

        except:
            return redirect('/app')

    return wrap
