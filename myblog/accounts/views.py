from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from .models import *

from datetime import date, timedelta
from django.contrib.auth import authenticate, login, logout
from urllib.parse import parse_qs
import bleach
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.views import View
from django.core.validators import  EmailValidator
from django.utils.decorators import method_decorator


# Create your views here.
def logout(request):
    try:
        del request.session['user_id']
    except KeyError:
        pass
    return redirect('/app')
class CreateUser(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({})
    def post(self, *args, **kwargs):
        email = self.request.POST.get('email')
        password = self.request.POST.get('password')
        username = self.request.POST.get('username')
        try:
            user = User.objects.get(email = email)
            print('ues')
        except:
            user = User.objects.create_user(email,username, password = password)
            user.staff = True
            user.save()
        
        print(user)
        print(password)
        
        if user.check_password(password):
            login(self.request, user)
            print(self.request.session.keys())
            self.request.session['user_id'] = user.id
            self.request.user = user
            print(self.request.session['user_id'])
            user = {'email': user.email, 'staff': user.staff, 'admin': user.admin, 'username': user.username}
            print(user)
            return JsonResponse({'user':user})
        else:
            return JsonResponse({'user':''})



        
"""
class UserCreate(CreateView):
    model = User
    form_class = UserRegisterForm

def login_view(request):

    template_name = 'accounts/login.html'
    form = LoginForm()
    if request.method== 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            try:
                print(form.cleaned_data.get('email'))
                print(form.cleaned_data.get('password'))
                user = authenticate(request, email=form.cleaned_data.get('email'),
                                    password=form.cleaned_data.get('password'))
                print(user)
                if user is not None:
                    login(request, user)

                    return redirect('home:home')
                else:
                    messages.error(request, "Credentials are either wrong or not registered.")
                    print('see try statemetn')
                    return redirect('accounts:login')


            except:
                print('see except statement')
                messages.error(request, "Credentials are either wrong or not registered.")
                return redirect('accounts:login')

        else:
            messages.error(request, 'invalid form, kindly enter email id')

            return redirect('accounts:login')

    return render(request, template_name, {'form':form})


def password_reset_view(request):
    pass

def user_signout(request):
    user = request.user
    logout(request)
    return redirect('accounts:login')


class MyProfile(TemplateView):
    template_name = 'accounts/profile.html'

class ChangeUser(View):
    def get_context_data(self, **kwargs):
        context = {}
        return context
    def get(self, request, *args, **kwargs):
        return redirect('home:home')
    def post(self, *args, **kwargs):
        if self.request.POST.get('username'):
            username = bleach.clean(self.request.POST.get('username'), strip = True)
            user = self.request.user
            user.username = username
            user.save()

        return redirect(reverse('profiles:myprofile', args = (self.request.user.username,)))

class ProfileCreateView(CreateView):
    model = Profile
    fields = ('dob',)
    success_url = '/'
    template_name = 'accounts/profile_form.html'

class ProfileDetailCreateView(CreateView):
    model = ProfileDetail
    success_url = 'accounts/profile'
    template_name = 'accounts/profile_form.html'
    fields = ('heading',)


 class SignupView(WorkFormMixin,DegreeFormMixin,ValidateTextMixin,TemplateView):
    template_name = 'accounts/commonsignup.html'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.regular = 'False'
        self.google = 'False'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = StaffRegisterForm()

        return context
    def get(self, request, *args, **kwargs):

        if request.GET.get('email') and request.GET.get('username'):
            email = request.GET.get('email')
            try:
                User.objects.get(email=email)
                messages.error(self.request, 'user with above email already exists!!, Kindly go to log in page')
                return redirect('accounts:staff')
            except:
                pass

            username = request.GET.get('username')
            context = {'email': email, 'username': username}
            return render(request, 'accounts/commonsignup.html', context)

        else:

            return render(request, 'accounts/signup.html', self.get_context_data())


    def post(self,*args,**kwargs):


        if self.request.POST.get('profileformbtn'):
            print(self.request.POST)
            user = {}
            email = self.request.POST.get('email')
            username = self.request.POST.get('username')
            password = self.request.POST.get('password')

            try:

                if email and username and password:
                    validate_email = EmailValidator()

                    try:
                        email = bleach.clean(email, strip=True)
                        validate_email(email)
                        username = bleach.clean(username, strip=True)
                        password = bleach.clean(password, strip=True)
                    except:
                        messages.error(self.request, 'Enter email, username or password correctly.')
                        return render(self.request, 'accounts/commonsignup.html',
                                      {'email': email, 'username': username})

                    user['email'] = email
                    user['username'] = username
                    user['password'] = password
                else:
                    messages.error(self.request, 'Enter username, email, password correctly.')
                    return render(self.request, 'accounts/commonsignup.html',
                                  {'email': email, 'username': username})
            except:
                messages.error(self.request, 'Enter username, email, password correctly.')
                return render(self.request, 'accounts/commonsignup.html', {'email': email, 'username': username})
            try:
                degreelist = self.save_degree_form()
                if not degreelist:
                    return render(self.request, 'accounts/commonsignup.html',
                                  {'email': email, 'username': username})
                user['degree'] = degreelist
            except:
                messages.error(self.request, 'unable to save qualifications')
                return render(self.request, 'accounts/commonsignup.html', {'email': email, 'username': username})

            try:
                workobj = self.save_work_form()
                if workobj:
                    user['work'] = workobj
                else:
                    user['work'] = ''

            except:
                user['work'] = ''
            if user['email'] and user['password'] and user['username']:
                usr = User.objects.create_staff(user['email'], user['username'],
                                                user['password'])
                usr.staff = False
                usr.username = user['username']
                usr.save()
                profile = usr.save_profile
                for i in user['degree']:
                    if i:
                        profile.degree.add(i)
                if user['work']:
                    profile.work.add(user['work'])

                profile.save()
                return redirect('accounts:login')
            else:
                messages.error(self.request, 'Invalid user details')
                return redirect('accounts:staff')

class ChangeUser(View):
    def get(self, request, *args, **kwargs):
        if request.user.is_admin and request.user.email == 'vijay.adabala96@gmail.com' or request.user.email == 'suryaveda@hotmail.com':
            return redirect('home:manage')
        else:
            return redirect('home:home')

    def post(self, *args, **kwargs):
        if self.request.user.is_admin and self.request.user.email == 'vijay.adabala96@gmail.com' or self.request.user.email == 'suryaveda@hotmail.com':
            if self.request.POST.get('promoteadmin'):
                try:
                    x = User.objects.get(pk = kwargs.get('pk'))
                    x.admin = True
                    x.staff = True
                    x.save()
                    print(x.is_admin)
                except:
                    messages.error(self.request, 'User doesnot exist', extra_tags='{0}'.format(self.request.user.email))
                    return redirect('home:manage')
            if self.request.POST.get('promotestaff'):
                try:
                    x = User.objects.get(pk=kwargs.get('pk'))
                    x.staff = True
                    x.admin = False
                    x.save()
                    print(x.is_staff)
                except:
                    messages.error(self.request, 'User doesnot exist', extra_tags='{0}'.format(self.request.user.email))
                    return redirect('home:manage')
            if self.request.POST.get('demotestaff'):
                try:
                    x = User.objects.get(pk=kwargs.get('pk'))
                    x.admin = False
                    x.staff = True
                    x.save()
                    print(x.is_admin)
                except:
                    messages.error(self.request, 'User doesnot exist', extra_tags='{0}'.format(self.request.user.email))
                    return redirect('home:manage')
            if self.request.POST.get('deleteuser'):
                try:
                    x = User.objects.get(pk=kwargs.get('pk'))
                    x.delete()
                except:
                    messages.error(self.request, 'User doesnot exist', extra_tags='{0}'.format(self.request.user.email))
                    return redirect('home:manage')
            return redirect('home:manage')
        else:
            return redirect('home:home')

class MyProfile(DetailFormMixin, WorkFormMixin, DegreeFormMixin,PersonalFormMixin, ContactFormMixin, TemplateView):
    template_name = 'accounts/profile.html'
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated :
            return render(request, self.template_name, self.get_context_data())
        else:
            return redirect('accounts:login')
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['profile'] = Profile.objects.get(user=self.request.user)
        context['tag_speciality'] = Tag.objects.filter(is_degree = True)

        context['degree_tags']=Tag.objects.filter(is_degree=True)
        return context

    def post(self, *args, **kwargs):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            if self.request.method == 'POST':
                print(self.request.POST)
                self.myprofile= Profile.objects.get(user=self.request.user)
                if self.request.POST.get('contact_form_button'):
                    self.save_contact_form()
                    return redirect('accounts:myprofile')
                if self.request.POST.get('personalformbtn'):
                    self.save_personal_form()
                    return redirect('accounts:myprofile')

                if self.request.POST.get('degreeformbtn'):
                    self.save_degree_form()
                    return redirect('accounts:myprofile')
                if self.request.POST.get('workformbtn'):
                    self.save_work_form()
                    return redirect('accounts:myprofile')
                if self.request.POST.get('profdetailsform'):
                    a = self.save_detail_prof_form()
                    return redirect('accounts:myprofile')

            else:
                print('not a post request')
                return redirect('accounts:myprofile')
        else:
            pass


            """
