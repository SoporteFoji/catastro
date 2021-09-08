from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _


class User(get_user_model()):
    """
    Proxy for the main User class.
    """
    class Meta:
        proxy = True

        verbose_name = _('User')
        verbose_name_plural = _('Users')
    
    def is_administrator(self):
        """
        Returns True if the user is an administrator.
        """
        try:
            self.administrator
        except:
            return False

        return True

    def is_coordinator(self):
        """
        Returns True if the user is a coordinator.
        """
        try:
            self.coordinator
        except:
            return False

        return True
