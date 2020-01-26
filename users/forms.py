from allauth.account.forms import SignupForm
from users.models import CustomUser


class CustomUserForm(SignupForm):
    pass
    # class Meta(SignupForm.Meta):
    #     model = CustomUser