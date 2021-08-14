from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.db import transaction
from .models import User
from django.contrib.auth.forms import ReadOnlyPasswordHashField


class UserAdminCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)
    username = forms.CharField(max_length = 40)
    class Meta:
        model = User
        fields = ('email',)

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super(UserAdminCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
            user.staff = True
            user.admin=True
            user.is_active = True
        return user
class UserAdminChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ('email', 'password', 'is_active', 'admin', 'username')

    def clean_password(self):
        return self.initial["password"]




"""class ProfileForm(forms.ModelForm, FieldDesign):
    # TODO: Define other fields here
    username = forms.CharField(max_length = 30)
    class Meta:
        model = Profile
        fields = ['dob']

    def __init__(self, *args, **kwargs):
        super(ProfileForm, self).__init__(*args, **kwargs)
        self.addclass({''})

    def clean(self):
        cleaned_data = super(ProfileForm, self).clean()
        return cleaned_data
        """
